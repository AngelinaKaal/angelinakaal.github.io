# Power BI Project Page

The Power BI page is controlled by two files:

- `PowerBI.html` contains the project buttons and the showcase layout.
- `script.js` contains the displayed project text and image lists.

## Change Project Text

Open `script.js` and find `projectData`. Each project has a `title` and a `text` value:

```js
'art-sales': {
  title: 'Art Sales',
  text: 'Write the description for this project here.',
  images: [
    'Images/art-sales-1.png',
    'Images/art-sales-2.png'
  ]
}
```

Change the text between the quotes. The `title` appears as the heading, and the `text` appears in the left panel below it.

## Change Project Images

1. Put the image files in the `Images/` folder.
2. Add their paths to the matching project's `images` array in `script.js`.
3. Use paths relative to the project root, such as `Images/art-sales-1.png`.

Example:

```js
'finals-duo': {
  title: 'Finals - DUO',
  text: 'Description of the DUO project.',
  images: [
    'Images/duo-dashboard.png',
    'Images/duo-model.png',
    'Images/duo-report.png'
  ]
}
```

The left and right arrow buttons automatically cycle through the images. The counter updates automatically, so you do not need to change it in the HTML.

For the best screen-like result, use screenshots with a similar landscape aspect ratio, preferably around 16:10 or 16:9.

## Add A New Project

1. Add a new entry to `projectData` in `script.js`:

```js
'new-project': {
  title: 'New Project',
  text: 'Description of the new project.',
  images: ['Images/new-project-1.png']
}
```

2. Add a button to the project list in `PowerBI.html` using the exact same key in `data-project`:

```html
<button class="btn btn-BI" type="button" data-project="new-project" aria-pressed="false">
    New Project
</button>
```

The value in `data-project` must exactly match the key in `projectData`. For example, `data-project="new-project"` connects to `'new-project': { ... }`.

## Important Details

- Keep at least one image in every project's `images` array.
- Use forward slashes in paths: `Images/file.png`.
- File names and extensions must match exactly.
- Supported browser image formats include `.png`, `.jpg`, `.jpeg`, `.gif`, and `.webp`.
- The first project listed in `PowerBI.html` is selected when the page opens.
