/* ============================================================================
   BARCO DE JORGE — SITE DATA
   ============================================================================
   This is the ONLY file you should need to edit to update the website's
   text, links, menu, hours, and image spots.

   HOW TO EDIT
   - Text: change anything between quotes, e.g. "Tara na sa Barco de Jorge"
   - Links: paste your real URL between the quotes, e.g. "https://peddlr.co/..."
   - Images: change the file path to point at your own photo, e.g.
     "images/chicken.jpg" — then add that photo file inside the /images folder.
   - Don't delete commas, quotes, or curly braces { } / square brackets [ ] —
     just change the text INSIDE the quotes.
   - After saving, refresh the website in your browser to see the change.

   Every page (index.html, menu.html, gallery.html, location.html) reads
   from this same file, so you only ever update information in ONE place.
   ========================================================================= */

const SITE_DATA = {

  /* --------------------------------------------------------------------
     1. IMPORTANT LINKS — fill these in as soon as you have them.
     Until filled in, the related buttons on the site will still show
     but will be visually marked as "link pending" so you remember.
     -------------------------------------------------------------------- */
  links: {
    // Paste your Peddlr store link between the quotes below.
    peddlr: "https://v5.peddlr.io/store/barco-de-jorge-1590952",

    // Paste your Messenger link (e.g. https://m.me/yourpagename) below.
    messenger: "",

    // Optional. Leave blank ("") to hide these icons in the footer.
    facebook: "",
    instagram: "",
  },

  /* --------------------------------------------------------------------
     2. BUSINESS INFO — name, tagline, address, contact, hours.
     -------------------------------------------------------------------- */
  business: {
    name: "Barco de Jorge",
    tagline: "Tara na sa Barco de Jorge",
    shortDescription:
      "A family-owned grill house serving up smoky grills, our famous fried chicken, golden fries, and ice-cold drinks. Good food, good company, every single day.",

    address: "Sangat, San Fernando, Cebu, 6018, Philippines",
    phone: "+63 977 782 1034",

    // Add your email between the quotes when you have one.
    email: "",

    // This is the Google Maps link you shared — used by the
    // "Get Directions" buttons across the site.
    mapsLink: "https://maps.app.goo.gl/VaZBbLmFnmsZoK8N7",

    // Hours: same time every day. If a day ever changes, just edit
    // that one line — each day is listed separately on purpose.
    hours: [
      { day: "Monday", time: "11:30 AM – 9:00 PM" },
      { day: "Tuesday", time: "11:30 AM – 9:00 PM" },
      { day: "Wednesday", time: "11:30 AM – 9:00 PM" },
      { day: "Thursday", time: "11:30 AM – 9:00 PM" },
      { day: "Friday", time: "11:30 AM – 9:00 PM" },
      { day: "Saturday", time: "11:30 AM – 10:00 PM" },
      { day: "Sunday", time: "11:30 AM – 10:00 PM" },
    ],
  },

  /* --------------------------------------------------------------------
     3. HOMEPAGE HERO — the big banner at the top of index.html.
     -------------------------------------------------------------------- */
  hero: {
    eyebrow: "Welcome Aboard",
    heading: "Tara na sa Barco de Jorge",
    subheading:
      "Grills straight off the coals, our famous fried chicken, golden fries, and ice-cold drinks. Family-style Filipino comfort food, made to share.",
    // Swap this for a real photo of your storefront, grill, or food
    // once you have one, e.g. "images/hero.jpg"
    image: "images/FirstImage.jpg",
  },

  /* --------------------------------------------------------------------
     4. HOMEPAGE "WHAT WE'RE KNOWN FOR" — short quick-scan highlights.
     Each links to a category on the Menu page. Add, remove, or edit
     as many as you like.
     -------------------------------------------------------------------- */
  featuredHighlights: [
    {
      title: "Off the Grill",
      blurb: "Smoky barbecue and grilled favorites, cooked fresh to order.",
      image: "images/GrillHome.jpg",
      link: "menu.html#grills",
    },
    {
      title: "The Main Event",
      blurb: "Our famous fried chicken — the dish people come back for.",
      image: "images/ChickenHome.jpg",
      link: "menu.html#chicken",
    },
    {
      title: "Drinks & Refreshers",
      blurb: "Cold sodas and milk tea to wash it all down.",
      image: "images/DrinksHome.jpg",
      link: "menu.html#drinks",
    },
  ],

  /* --------------------------------------------------------------------
     5. MENU — organized into categories. Edit names, descriptions,
     and prices freely. Duplicate an item block { ... } to add a new
     item, or delete one to remove it. Prices are plain text so you
     can write them however you like (₱150, 150.00, Php 150, etc.)

     NOTE: every item below is a PLACEHOLDER — please replace the
     names, descriptions, prices, and images with your real menu.
     -------------------------------------------------------------------- */
  menu: {
    categories: [
      {
        id: "grills",
        name: "Grills",
        items: [
          {
            name: "Inihaw na Liempo",
            description: "Grilled pork belly, marinated and chargrilled to order.",
            price: "₱000",
            image: "images/placeholder.svg",
          },
          {
            name: "Pork BBQ Skewers",
            description: "Sweet and smoky skewered pork barbecue, grilled fresh.",
            price: "₱000",
            image: "images/placeholder.svg",
          },
          {
            name: "Grilled Bangus",
            description: "Whole milkfish, grilled and stuffed with tomato and onion.",
            price: "₱000",
            image: "images/placeholder.svg",
          },
          {
            name: "Grilled Pork Belly Skewers",
            description: "Add a short, tasty description here.",
            price: "₱000",
            image: "images/placeholder.svg",
          },
        ],
      },
      {
        id: "chicken",
        name: "The Main Event — Chicken",
        items: [
          {
            name: "Buttered Fried Chicken",
            description: "Our signature fried chicken, finished with a buttery glaze.",
            price: "₱000",
            image: "images/placeholder.svg",
          },
          {
            name: "Spicy Fried Chicken",
            description: "The same crowd favorite, with a spicy kick.",
            price: "₱000",
            image: "images/placeholder.svg",
          },
          {
            name: "Chicken Wings",
            description: "Crispy wings, great on their own or with rice.",
            price: "₱000",
            image: "images/placeholder.svg",
          },
        ],
      },
      {
        id: "fries",
        name: "Fries",
        items: [
          {
            name: "Classic Fries",
            description: "Golden, crispy, and salted just right.",
            price: "₱000",
            image: "images/placeholder.svg",
          },
          {
            name: "Cheese Fries",
            description: "Classic fries loaded with melted cheese.",
            price: "₱000",
            image: "images/placeholder.svg",
          },
          {
            name: "Garlic Parmesan Fries",
            description: "Add a short, tasty description here.",
            price: "₱000",
            image: "images/placeholder.svg",
          },
        ],
      },
      {
        id: "drinks",
        name: "Drinks",
        // Drinks has two smaller groups inside it: Sodas and Milk Tea.
        // You can add more groups the same way, or remove this nesting
        // entirely and just use "items" like the other categories.
        subcategories: [
          {
            name: "Sodas",
            items: [
              { name: "Coke", description: "Ice-cold bottled soda.", price: "₱000", image: "images/placeholder.svg" },
              { name: "Sprite", description: "Ice-cold bottled soda.", price: "₱000", image: "images/placeholder.svg" },
              { name: "Royal", description: "Ice-cold bottled soda.", price: "₱000", image: "images/placeholder.svg" },
            ],
          },
          {
            name: "Milk Tea",
            items: [
              { name: "Wintermelon Milk Tea", description: "Add a short, tasty description here.", price: "₱000", image: "images/placeholder.svg" },
              { name: "Okinawa Milk Tea", description: "Add a short, tasty description here.", price: "₱000", image: "images/placeholder.svg" },
              { name: "Taro Milk Tea", description: "Add a short, tasty description here.", price: "₱000", image: "images/placeholder.svg" },
            ],
          },
        ],
      },
      {
        id: "sides",
        name: "Other Sides",
        items: [
          {
            name: "Steamed Rice",
            description: "A cup of steamed white rice.",
            price: "₱000",
            image: "images/placeholder.svg",
          },
          {
            name: "Coleslaw",
            description: "Crisp, creamy house-made coleslaw.",
            price: "₱000",
            image: "images/placeholder.svg",
          },
          {
            name: "Mac Salad",
            description: "Add a short, tasty description here.",
            price: "₱000",
            image: "images/placeholder.svg",
          },
        ],
      },
    ],
  },

  /* --------------------------------------------------------------------
     6. GALLERY — used on gallery.html, and the first 6 photos also
     show as a preview on the homepage. Add a new { ... } block to add
     a photo, or delete one to remove it.
     -------------------------------------------------------------------- */
  gallery: [
    { image: "images/placeholder.svg", caption: "Fresh off the grill" },
    { image: "images/placeholder.svg", caption: "Our famous fried chicken" },
    { image: "images/placeholder.svg", caption: "Family dining area" },
    { image: "images/placeholder.svg", caption: "Cold drinks and milk tea" },
    { image: "images/placeholder.svg", caption: "Storefront" },
    { image: "images/placeholder.svg", caption: "Weekend crowd" },
    { image: "images/placeholder.svg", caption: "Grilled specialties" },
    { image: "images/placeholder.svg", caption: "Behind the grill" },
    { image: "images/placeholder.svg", caption: "Add a caption here" },
  ],
};
