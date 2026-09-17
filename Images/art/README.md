# Art Gallery Images

This folder contains the images shown on `Art.html`. The page creates one card for every image in this folder.

## Add An Image

1. Copy an image into this folder.
2. Add its information to `art-metadata.json`.
3. Run `Update-ArtManifest.ps1` from the project folder.
4. Refresh `Art.html` in the browser.

For example, after adding `sunset.jpg`, update `art-metadata.json` like this:

```json
{
	"sunset.jpg": {
		"title": "Sunset",
		"artist": "Angelina Kaal",
		"collection": "Personal work",
		"dateDrawn": "17 September 2026",
		"timeSpent": "4 hours",
		"description": "A short description of the artwork.",
		"nl": {
			"title": "Zonsondergang",
			"artist": "Angelina Kaal",
			"collection": "Persoonlijk werk",
			"dateDrawn": "17 september 2026",
			"timeSpent": "4 uur",
			"description": "Een korte beschrijving van het kunstwerk."
		}
	}
}
```

If `art-metadata.json` already contains other images, keep them and add the new entry separated by a comma:

```json
{
	"sunset.jpg": {
		"title": "Sunset",
		"artist": "Angelina Kaal",
		"collection": "Personal work"
	},
	"portrait.png": {
		"title": "Portrait",
		"artist": "Angelina Kaal",
		"collection": "Sketches"
	}
}
```

## Update The Gallery Locally

From the portfolio project folder, run:

```powershell
.\Images\art\Update-ArtManifest.ps1
```

The script scans this folder and regenerates `art-data.js`. The gallery then gets the correct number of cards automatically.

Do not edit `art-data.js` directly; it is generated again every time the update script runs.

## If The Site Is On GitHub Pages

You do not need to run PowerShell on the GitHub website. The repository includes a GitHub Actions workflow at `.github/workflows/update-art-manifest.yml` that runs automatically after you push an image or update `art-metadata.json`.

Your GitHub Pages workflow is:

1. Add the image to `Images/art`.
2. Add its matching entry to `Images/art/art-metadata.json`.
3. Commit and push both changes to GitHub.
4. Open the repository's **Actions** tab and wait for **Update art manifest** to finish.
5. Wait for GitHub Pages to deploy, then refresh the website.

The action regenerates and commits `art-data.js`. The first run may require Actions to be enabled and the workflow's repository permission to allow it to write contents.

## Metadata Fields

- `title`: text shown on the card and in the image details modal.
- `artist`: artist shown in the details modal.
- `collection`: collection shown in the details modal and used by the filter.
- `dateDrawn`: date the artwork was drawn or created.
- `timeSpent`: approximate time spent making the artwork.
- `description`: description shown below the artwork details.
- `nl`: optional Dutch translations for any of the fields above. Missing translations fall back to the English value.

The filename in `art-metadata.json` must match the image filename exactly, including capitalization and extension. Supported formats are JPG, JPEG, PNG, WebP, and GIF.

If an image has no metadata entry, the script still creates a card. It uses the filename as the title, `Angelina Kaal` as the artist, and `Other` as the collection.
