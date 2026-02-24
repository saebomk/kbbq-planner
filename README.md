# Korean BBQ Shopping List

A one-page React web app that builds a grocery shopping list for Korean BBQ via a short wizard.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown (e.g. http://localhost:5173).

## Build

```bash
npm run build
```

Output is in `dist/`.

## Features

- **Wizard**: Number of people → protein (pork/beef/duck) → sauce (spicy/savory, context-aware) → vegetarian option
- **Generated list**: Proteins, vegetables, kimchi, sauces, staples (and vegetarian add-ons if selected), with quantities scaled by guest count
- **Share**: As plain text (clipboard or Web Share API) or as an image (download or share)
- **Save**: Save the current list with a timestamp; open "Saved lists" from the start screen to view or reopen
- **Restart**: "New list" from the list screen starts the wizard again

## Stack

- Vite, React 18, TypeScript
- Tailwind CSS
- html-to-image (for image export)
- localStorage (for saved lists)
