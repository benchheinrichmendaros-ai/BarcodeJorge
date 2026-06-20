/* ============================================================================
   BARCO DE JORGE — MAIN SCRIPT
   ============================================================================
   You should not need to edit this file for everyday content updates —
   that all happens in js/site-data.js. This file just takes that data
   and places it onto the page.

   HOW IT WORKS (high level):
   - Any element with a `data-link="peddlr"` attribute automatically gets
     its href filled in from SITE_DATA.links.peddlr, and the same for
     messenger / facebook / instagram / maps / phone / email.
   - Any element with `data-field="address"` (etc.) gets its text filled
     in from SITE_DATA.business.
   - Menu, gallery, hours, and highlight cards are built from the lists
     in SITE_DATA so you only ever maintain them in one place.
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  buildHeader();
  buildFooter();
  initMobileNav();
  markActiveNavLink();
  wireUpLinks();
  fillTextFields();
  buildHoursTable();
  buildHero();
  buildHighlights();
  buildGalleryGrid("[data-gallery-preview]", 6);
  buildGalleryGrid("[data-gallery-full]", Infinity);
  buildMenu();
  buildMenuJumpNav();
  buildOrderPolicy();
  wireUpMapEmbed();
  setFooterYear();
});

/* ---------- shared header & footer (edit nav links/labels here only) -- */

function buildHeader() {
  const headerEl = document.querySelector("[data-site-header]");
  if (!headerEl) return;

  headerEl.innerHTML =
    '<div class="container">' +
      '<a href="index.html" class="brand">' +
        '<img src="images/logo.jpg" alt="Barco de Jorge logo">' +
        '<span class="brand-name">Barco de Jorge</span>' +
      "</a>" +
      '<button class="nav-toggle" data-nav-toggle aria-label="Open menu" aria-expanded="false">' +
        "<span></span><span></span><span></span>" +
      "</button>" +
      '<nav class="nav-menu" data-nav-menu aria-label="Primary">' +
        '<ul class="nav-links">' +
          '<li><a href="index.html">Home</a></li>' +
          '<li><a href="menu.html">Menu</a></li>' +
          '<li><a href="gallery.html">Gallery</a></li>' +
          '<li><a href="location.html">Location / Contact</a></li>' +
        "</ul>" +
        '<div class="nav-ctas">' +
          '<a class="btn btn--gold" href="order-policy.html">Order Online</a>' +
          '<a class="btn btn--outline" data-link="messenger">Chat Us</a>' +
        "</div>" +
      "</nav>" +
    "</div>";
}

function buildFooter() {
  const footerEl = document.querySelector("[data-site-footer]");
  if (!footerEl) return;

  footerEl.innerHTML =
    '<div class="container">' +
      '<div class="footer-grid">' +

        '<div class="footer-col">' +
          '<h4>Barco de Jorge</h4>' +
          '<p data-field="shortDescription"></p>' +
          '<div class="footer-socials">' +
            '<a data-link="facebook" aria-label="Facebook" target="_blank">FB</a>' +
            '<a data-link="instagram" aria-label="Instagram" target="_blank">IG</a>' +
          "</div>" +
        "</div>" +

        '<div class="footer-col">' +
          '<h4>Quick Links</h4>' +
          '<nav class="footer-links" data-footer-links aria-label="Footer">' +
            '<a href="index.html">Home</a>' +
            '<a href="menu.html">Menu</a>' +
            '<a href="gallery.html">Gallery</a>' +
            '<a href="location.html">Location / Contact</a>' +
          "</nav>" +
        "</div>" +

        '<div class="footer-col">' +
          '<h4>Visit Us</h4>' +
          '<address data-field="address"></address>' +
          '<p style="margin-top:8px;">' +
            '<a data-link="phone" data-field="phone"></a>' +
          "</p>" +
          '<p><a data-link="email"></a></p>' +
        "</div>" +

        '<div class="footer-col">' +
          '<h4>Order &amp; Chat</h4>' +
          '<div class="cta-row" style="flex-direction:column;">' +
            '<a class="btn btn--gold btn--block" href="order-policy.html">Order Online</a>' +
            '<a class="btn btn--outline btn--block" data-link="messenger">Chat Us</a>' +
          "</div>" +
        "</div>" +

      "</div>" +
      '<div class="footer-bottom">' +
        '&copy; <span data-year></span> Barco de Jorge. All rights reserved.' +
      "</div>" +
    "</div>";
}



function placeholderImg() {
  return "images/placeholder.svg";
}

function createImg(src, alt) {
  const img = document.createElement("img");
  img.src = src && src.trim() !== "" ? src : placeholderImg();
  img.alt = alt || "";
  img.loading = "lazy";
  return img;
}

/* ---------- mobile nav toggle ------------------------------------------ */

function initMobileNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close the menu when a link inside it is clicked (mobile UX nicety)
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function markActiveNavLink() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav-menu] a, [data-footer-links] a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current || (current === "" && href === "index.html")) {
      link.classList.add("is-active");
    }
  });
}

/* ---------- links: Peddlr, Messenger, socials, phone, email, maps ----- */

function wireUpLinks() {
  const linkMap = {
    peddlr: SITE_DATA.links.peddlr,
    messenger: SITE_DATA.links.messenger,
    facebook: SITE_DATA.links.facebook,
    instagram: SITE_DATA.links.instagram,
    maps: SITE_DATA.business.mapsLink,
  };

  // Required, always-visible action links: if missing, mark as "pending"
  // instead of hiding, so the buttons stay easy to find on the live site.
  ["peddlr", "messenger"].forEach((key) => {
    document.querySelectorAll('[data-link="' + key + '"]').forEach((el) => {
      const url = linkMap[key];
      if (url && url.trim() !== "") {
        el.setAttribute("href", url);
        if (!el.hasAttribute("data-same-tab")) {
          el.target = "_blank";
          el.rel = "noopener noreferrer";
        }
      } else {
        el.setAttribute("href", "#");
        el.classList.add("is-pending");
        el.title = "Add your " + (key === "peddlr" ? "Peddlr" : "Messenger") + " link in js/site-data.js";
        el.addEventListener("click", (e) => e.preventDefault());
      }
    });
  });

  // Optional social links: hide entirely if left blank.
  ["facebook", "instagram"].forEach((key) => {
    document.querySelectorAll('[data-link="' + key + '"]').forEach((el) => {
      const url = linkMap[key];
      if (url && url.trim() !== "") {
        el.setAttribute("href", url);
        el.target = "_blank";
        el.rel = "noopener noreferrer";
      } else {
        el.style.display = "none";
      }
    });
  });

  // Maps link is provided, but keep this safe either way.
  document.querySelectorAll('[data-link="maps"]').forEach((el) => {
    const url = linkMap.maps;
    if (url && url.trim() !== "") {
      el.setAttribute("href", url);
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    } else {
      el.style.display = "none";
    }
  });

  // Phone: turn the digits into a tap-to-call link.
  document.querySelectorAll('[data-link="phone"]').forEach((el) => {
    const phone = SITE_DATA.business.phone;
    if (phone && phone.trim() !== "") {
      el.setAttribute("href", "tel:" + phone.replace(/[^\d+]/g, ""));
    } else {
      el.style.display = "none";
    }
  });

  // Email: only show/link if one has been added in site-data.js.
  document.querySelectorAll('[data-link="email"]').forEach((el) => {
    const email = SITE_DATA.business.email;
    if (email && email.trim() !== "") {
      el.setAttribute("href", "mailto:" + email);
      el.textContent = email;
    } else {
      el.setAttribute("href", "#");
      el.classList.add("is-pending");
      el.textContent = "Email coming soon";
      el.title = "Add an email address in js/site-data.js";
      el.addEventListener("click", (e) => e.preventDefault());
    }
  });

  // Quiet reminder for the site owner — visible only in the browser
  // console (F12 / right-click > Inspect), never to regular visitors.
  const missing = [];
  if (!linkMap.peddlr) missing.push("Peddlr link (links.peddlr)");
  if (!linkMap.messenger) missing.push("Messenger link (links.messenger)");
  if (!SITE_DATA.business.email) missing.push("Email address (business.email)");
  if (missing.length > 0) {
    console.info(
      "Barco de Jorge site: still missing — " + missing.join(", ") + ". Add these in js/site-data.js."
    );
  }
}

/* ---------- simple text fields (address, phone, tagline, etc.) -------- */

function fillTextFields() {
  const fieldMap = {
    name: SITE_DATA.business.name,
    tagline: SITE_DATA.business.tagline,
    shortDescription: SITE_DATA.business.shortDescription,
    address: SITE_DATA.business.address,
    phone: SITE_DATA.business.phone,
  };

  Object.keys(fieldMap).forEach((key) => {
    document.querySelectorAll('[data-field="' + key + '"]').forEach((el) => {
      el.textContent = fieldMap[key];
    });
  });
}

function setFooterYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

/* ---------- hours table ------------------------------------------------ */

function buildHoursTable() {
  document.querySelectorAll("[data-hours-table]").forEach((table) => {
    table.innerHTML = "";
    SITE_DATA.business.hours.forEach((row) => {
      const tr = document.createElement("tr");

      const dayCell = document.createElement("td");
      dayCell.textContent = row.day;

      const timeCell = document.createElement("td");
      timeCell.textContent = row.time;

      tr.append(dayCell, timeCell);
      table.appendChild(tr);
    });
  });
}

/* ---------- homepage hero ---------------------------------------------- */

function buildHero() {
  const eyebrowEl = document.querySelector("[data-hero-eyebrow]");
  const headingEl = document.querySelector("[data-hero-heading]");
  const subheadingEl = document.querySelector("[data-hero-subheading]");
  const imageWrap = document.querySelector("[data-hero-image]");

  if (eyebrowEl) eyebrowEl.textContent = SITE_DATA.hero.eyebrow;
  if (headingEl) headingEl.textContent = SITE_DATA.hero.heading;
  if (subheadingEl) subheadingEl.textContent = SITE_DATA.hero.subheading;
  if (imageWrap) {
    imageWrap.appendChild(createImg(SITE_DATA.hero.image, SITE_DATA.hero.heading));
  }
}

/* ---------- homepage "what we're known for" highlight cards ----------- */

function buildHighlights() {
  const container = document.querySelector("[data-highlights]");
  if (!container) return;

  container.innerHTML = "";
  SITE_DATA.featuredHighlights.forEach((item) => {
    const card = document.createElement("a");
    card.className = "highlight-card";
    card.href = item.link || "menu.html";

    const imgWrap = document.createElement("div");
    imgWrap.className = "highlight-card__image";
    imgWrap.appendChild(createImg(item.image, item.title));

    const title = document.createElement("h3");
    title.textContent = item.title;

    const blurb = document.createElement("p");
    blurb.textContent = item.blurb;

    card.append(imgWrap, title, blurb);
    container.appendChild(card);
  });
}

/* ---------- gallery grids (used on homepage preview + full gallery) --- */

function buildGalleryGrid(selector, limit) {
  const container = document.querySelector(selector);
  if (!container) return;

  container.innerHTML = "";
  SITE_DATA.gallery.slice(0, limit).forEach((photo) => {
    const figure = document.createElement("figure");
    figure.className = "gallery-item";
    figure.appendChild(createImg(photo.image, photo.caption));

    if (photo.caption) {
      const caption = document.createElement("figcaption");
      caption.textContent = photo.caption;
      figure.appendChild(caption);
    }
    container.appendChild(figure);
  });
}

function buildMenuJumpNav() {
  const nav = document.querySelector("[data-menu-jump]");
  if (!nav) return;

  nav.innerHTML = "";
  SITE_DATA.menu.categories.forEach((category) => {
    const link = document.createElement("a");
    link.href = "#" + category.id;
    link.textContent = category.name;
    nav.appendChild(link);
  });
}

/* ---------- order policy page --------------------------------------- */

function buildOrderPolicy() {
  const container = document.querySelector("[data-order-policy]");
  if (!container) return;

  container.innerHTML = "";

  const heading = document.createElement("h3");
  heading.textContent = SITE_DATA.orderPolicy.heading;

  const intro = document.createElement("p");
  intro.textContent = SITE_DATA.orderPolicy.intro;
  intro.style.marginBottom = "16px";

  const list = document.createElement("ul");
  list.className = "policy-list";
  SITE_DATA.orderPolicy.points.forEach((point) => {
    const li = document.createElement("li");
    li.textContent = point;
    list.appendChild(li);
  });

  container.append(heading, intro, list);

  // Only shows if temporaryNotice still exists in site-data.js — delete
  // it there later and this box disappears automatically.
  if (SITE_DATA.orderPolicy.temporaryNotice) {
    const notice = document.createElement("div");
    notice.className = "policy-notice";

    const label = document.createElement("strong");
    label.textContent = "Note: ";

    notice.append(label, document.createTextNode(SITE_DATA.orderPolicy.temporaryNotice));
    container.appendChild(notice);
  }
}

/* ---------- menu page ---------------------------------------------------*/

function buildMenu() {
  const container = document.querySelector("[data-menu]");
  if (!container) return;

  container.innerHTML = "";

  SITE_DATA.menu.categories.forEach((category) => {
    const section = document.createElement("section");
    section.className = "menu-category";
    section.id = category.id;

    const heading = document.createElement("h2");
    heading.className = "menu-category__title";
    heading.textContent = category.name;
    section.appendChild(heading);

    if (category.items) {
      section.appendChild(buildMenuItemGrid(category.items));
    }

    if (category.subcategories) {
      category.subcategories.forEach((sub) => {
        const subHeading = document.createElement("h3");
        subHeading.className = "menu-subcategory__title";
        subHeading.textContent = sub.name;
        section.appendChild(subHeading);
        section.appendChild(buildMenuItemGrid(sub.items));
      });
    }

    container.appendChild(section);
  });
}

function buildMenuItemGrid(items) {
  const grid = document.createElement("div");
  grid.className = "menu-grid";

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "food-card";

    const imgWrap = document.createElement("div");
    imgWrap.className = "food-card__image";
    imgWrap.appendChild(createImg(item.image, item.name));

    const body = document.createElement("div");
    body.className = "food-card__body";

    const titleRow = document.createElement("div");
    titleRow.className = "food-card__title-row";

    const name = document.createElement("h4");
    name.textContent = item.name;

    const price = document.createElement("span");
    price.className = "food-card__price";
    price.textContent = item.price || "";

    titleRow.append(name, price);

    const desc = document.createElement("p");
    desc.textContent = item.description || "";

    body.append(titleRow, desc);
    card.append(imgWrap, body);
    grid.appendChild(card);
  });

  return grid;
}

/* ---------- Google Maps embed (no API key needed) ---------------------- */

function wireUpMapEmbed() {
  const frame = document.querySelector("[data-map-embed]");
  if (!frame) return;
  const query = encodeURIComponent(SITE_DATA.business.address);
  frame.src = "https://www.google.com/maps?q=" + query + "&output=embed";
}
