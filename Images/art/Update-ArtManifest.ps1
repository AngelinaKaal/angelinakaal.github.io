$artFolder = Split-Path -Parent $MyInvocation.MyCommand.Path
$metadataPath = Join-Path $artFolder 'art-metadata.json'
$outputPath = Join-Path $artFolder 'art-data.js'

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
        $metadataProperty = $metadata.PSObject.Properties[$fileName]
        $details = if ($metadataProperty) { $metadataProperty.Value } else { [PSCustomObject]@{} }
        $nlDetails = if ($details.nl) { $details.nl } else { [PSCustomObject]@{} }
        $defaultTitle = [System.IO.Path]::GetFileNameWithoutExtension($fileName) -replace '[-_]+', ' '

        [ordered]@{
            title = if ($details.title) { $details.title } else { $defaultTitle }
            image = "Images/art/$fileName"
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
