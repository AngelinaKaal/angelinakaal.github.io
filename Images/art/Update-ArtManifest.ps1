try {
    Add-Type -AssemblyName System.Drawing -ErrorAction Stop
}
catch {
    Write-Warning 'System.Drawing is unavailable; using original images as previews.'
}

$artFolder = Split-Path -Parent $MyInvocation.MyCommand.Path
$metadataPath = Join-Path $artFolder 'art-metadata.json'
$outputPath = Join-Path $artFolder 'art-data.js'
$previewFolder = Join-Path $artFolder 'previews'

if (-not (Test-Path $previewFolder)) {
    New-Item -Path $previewFolder -ItemType Directory -Force | Out-Null
}

function Resize-PreviewImage($sourcePath, $destinationPath) {
    $lowerSource = $sourcePath.ToLowerInvariant()
    $lowerDestination = $destinationPath.ToLowerInvariant()

    if ($lowerSource.EndsWith('.webp') -or $lowerDestination.EndsWith('.webp')) {
        Copy-Item -Path $sourcePath -Destination $destinationPath -Force
        return
    }

    try {
        $sourceImage = [System.Drawing.Image]::FromFile($sourcePath)
    }
    catch {
        Copy-Item -Path $sourcePath -Destination $destinationPath -Force
        return
    }

    try {
        $maxWidth = 900
        $maxHeight = 900
        $scale = [Math]::Min([double]$maxWidth / $sourceImage.Width, [double]$maxHeight / $sourceImage.Height)

        if ($scale -ge 1) {
            Copy-Item -Path $sourcePath -Destination $destinationPath -Force
            return
        }

        $newWidth = [Math]::Max(1, [int]([Math]::Round($sourceImage.Width * $scale)))
        $newHeight = [Math]::Max(1, [int]([Math]::Round($sourceImage.Height * $scale)))

        $resizedImage = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $graphics = [System.Drawing.Graphics]::FromImage($resizedImage)
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.DrawImage($sourceImage, 0, 0, $newWidth, $newHeight)

        $codecInfo = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatDescription -eq 'JPEG' }
        $encoderParameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]80)

        if ($lowerDestination.EndsWith('.png')) {
            $resizedImage.Save($destinationPath, [System.Drawing.Imaging.ImageFormat]::Png)
        }
        elseif ($lowerDestination.EndsWith('.gif')) {
            Copy-Item -Path $sourcePath -Destination $destinationPath -Force
        }
        else {
            $resizedImage.Save($destinationPath, $codecInfo, $encoderParameters)
        }

        $graphics.Dispose()
        $resizedImage.Dispose()
    }
    finally {
        $sourceImage.Dispose()
    }
}

$metadata = @{}
if (Test-Path $metadataPath) {
    $metadataContent = Get-Content $metadataPath -Raw
    if ($metadataContent.Trim()) {
        $metadata = $metadataContent | ConvertFrom-Json
    }
}

$items = @(Get-ChildItem $artFolder -File |
    Where-Object { $_.Extension.ToLowerInvariant() -in @('.jpg', '.jpeg', '.png', '.webp', '.gif') } |
    Sort-Object Name |
    ForEach-Object {
        $fileName = $_.Name
        $previewPath = Join-Path $previewFolder $fileName
        if (-not (Test-Path $previewPath) -or ((Get-Item $previewPath).LastWriteTime -lt $_.LastWriteTime)) {
            try {
                Resize-PreviewImage -sourcePath $_.FullName -destinationPath $previewPath
            }
            catch {
                Write-Warning "Could not create preview for $fileName; using the original image instead. $($_.Exception.Message)"
            }
        }

        $metadataProperty = $metadata.PSObject.Properties[$fileName]
        $details = if ($metadataProperty) { $metadataProperty.Value } else { [PSCustomObject]@{} }
        $nlDetails = if ($details.nl) { $details.nl } else { [PSCustomObject]@{} }
        $defaultTitle = [System.IO.Path]::GetFileNameWithoutExtension($fileName) -replace '[-_]+', ' '
        $imagePath = "Images/art/$fileName"
        $previewUrl = if (Test-Path $previewPath) { "Images/art/previews/$fileName" } else { $imagePath }

        [ordered]@{
            title = if ($details.title) { $details.title } else { $defaultTitle }
            image = $imagePath
            preview = $previewUrl
            artist = if ($details.artist) { $details.artist } else { 'Angelina Kaal' }
            collection = if ($details.collection) { $details.collection } else { 'Other' }
            dateDrawn = if ($details.dateDrawn) { $details.dateDrawn } else { '' }
            timeSpent = if ($details.timeSpent) { $details.timeSpent } else { '' }
            description = if ($details.description) { $details.description } else { '' }
            nl = [ordered]@{
                title = if ($nlDetails.title) { $nlDetails.title } else { '' }
                artist = if ($nlDetails.artist) { $nlDetails.artist } else { '' }
                collection = if ($nlDetails.collection) { $nlDetails.collection } else { '' }
                dateDrawn = if ($nlDetails.dateDrawn) { $nlDetails.dateDrawn } else { '' }
                timeSpent = if ($nlDetails.timeSpent) { $nlDetails.timeSpent } else { '' }
                description = if ($nlDetails.description) { $nlDetails.description } else { '' }
            }
        }
    })

$json = if ($items.Count -eq 0) { '[]' } else { ConvertTo-Json -InputObject $items -Depth 4 -Compress }
Set-Content -Path $outputPath -Value "window.artItems = $json;" -Encoding UTF8
Write-Host "Updated $($items.Count) artwork card(s) in art-data.js."
