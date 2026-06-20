# Barco de Jorge — Website

A simple, fast, no-backend website for Barco de Jorge. Plain HTML/CSS/JS —
no build step, no database, no login. Works straight on GitHub Pages.

## File structure

```
BarcodeJorge/
├── index.html          Homepage
├── menu.html            Menu page
├── gallery.html         Photo gallery page
├── location.html        Location, hours, contact, map
├── css/
│   └── style.css        All styling (colors, fonts, layout)
├── js/
│   ├── site-data.js      ⭐ EVERYTHING you'll want to edit lives here
│   └── main.js           Code that reads site-data.js and builds the pages
└── images/
    ├── logo.jpg           Your logo (already in place)
    └── placeholder.svg    Generic gray "add photo" placeholder
```

## The only file you need for everyday edits: `js/site-data.js`

Open `js/site-data.js` in any text editor. It's one big, commented list of
all your editable content:

| What you want to change            | Where in site-data.js          |
|-------------------------------------|---------------------------------|
| Peddlr link                         | `links.peddlr`                 |
| Messenger link                      | `links.messenger`               |
| Facebook / Instagram links          | `links.facebook` / `links.instagram` |
| Email address                       | `business.email`                |
| Address, phone                      | `business.address` / `business.phone` |
| Hours                                | `business.hours`                |
| Homepage hero text/image            | `hero`                          |
| Homepage "known for" cards          | `featuredHighlights`            |
| Menu items, categories, prices      | `menu.categories`               |
| Gallery photos                      | `gallery`                       |

Every page (Home, Menu, Gallery, Location) reads from this one file, so
updating something once updates it everywhere it appears.

**Important:** keep the quotes, commas, and curly braces `{ }` /square
brackets `[ ]` exactly as they are — only change the text *inside* the
quotes. After saving, refresh the page in your browser to see the change.

### Adding your Peddlr and Messenger links (when ready)

In `js/site-data.js`, near the top:

```js
links: {
  peddlr: "",       // paste your Peddlr store link here
  messenger: "",    // paste your Messenger link here, e.g. https://m.me/yourpage
  facebook: "",     // optional — leave blank to hide
  instagram: "",    // optional — leave blank to hide
},
```

Until you fill these in, the "Order Online" and "Chat Us" buttons stay
visible on the site but are dimmed and not clickable — that's intentional,
so the site looks finished while reminding you (in the browser console)
that two links are still pending.

### Adding your email

```js
business: {
  ...
  email: "",   // e.g. "hello@barcodedejorge.com"
```

Until filled in, the site shows "Email coming soon" instead of a broken link.

## Adding real photos

Right now every photo spot uses `images/placeholder.svg` (a plain gray
"add photo" box) so the layout looks right even with no real images yet.

To add a real photo:

1. Put your image file inside the `images/` folder (e.g. `images/chicken.jpg`).
2. In `js/site-data.js`, find the matching entry and change the `image`
   path, for example:
   ```js
   { name: "Buttered Fried Chicken", ..., image: "images/chicken.jpg" }
   ```
3. Save and refresh.

This works for the hero image, the "known for" cards, every menu item,
and every gallery photo — they all follow the same pattern.

## Editing the menu

Each dish is one block like this inside `js/site-data.js`:

```js
{
  name: "Inihaw na Liempo",
  description: "Grilled pork belly, marinated and chargrilled to order.",
  price: "₱000",
  image: "images/placeholder.svg",
},
```

- Edit the text between the quotes to change the name, description, or price.
- Copy/paste a whole block (including the `{ }`) to add a new item.
- Delete a whole block to remove an item.
- "Drinks" is split into two smaller groups (Sodas, Milk Tea) — the same
  rules apply inside each group.

The category tabs at the top of the Menu page are generated automatically
from these categories, so you never have to update them separately.

## Editing hours, address, and the map

Hours, address, and phone are all in `business` near the top of
`js/site-data.js`. The map on the Location page uses your address
automatically (via a free Google Maps embed — no API key needed), and the
"Get Directions" button uses the Google Maps link you provided. If your
address ever changes, update `business.address` and both the map and any
written address on the site update together.

## Things you generally won't need to touch

- **`css/style.css`** — controls colors, fonts, spacing. The color palette
  (navy + gold, taken from your logo) is defined at the very top of the
  file under `:root` if you ever want to adjust shades.
- **`js/main.js`** — the code that builds the header, footer, menu,
  gallery, and hours table from `site-data.js`. You shouldn't need to
  edit this for normal content updates.

## Previewing locally

Just double-click `index.html` to open it in your browser — no install
needed. (The Google Maps embed on the Location page only loads with an
internet connection, same as the live site.)

## Deploying to GitHub Pages

1. Create a new GitHub repository named **BarcodeJorge**.
2. Upload all the files in this folder to the repository (keeping the
   same folder structure — `css/`, `js/`, and `images/` folders included).
3. On GitHub, go to **Settings → Pages**.
4. Under "Build and deployment," set **Source** to "Deploy from a branch,"
   branch **main**, folder **/(root)**. Save.
5. After a minute or two, your site will be live at:
   `https://<your-github-username>.github.io/BarcodeJorge/`

No build step, no server, nothing else to configure.
