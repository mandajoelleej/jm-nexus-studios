/* =========================================================
   JM NEXUS STUDIOS — Services Page
   WhatsApp opens direct chat with full order prefilled
   ========================================================= */

/* =========================================================
   LOGO CONFIG
   ========================================================= */
const LOGO_URL = "assets/images/hero/jm-nexus-logo.webp";
const LOGO_FALLBACK = "assets/images/hero/jm-nexus-logo.png";

/* =========================================================
   FALLBACK SETTINGS
   ========================================================= */
const FALLBACK_SETTINGS = {
  whatsapp_number: "+256 773 486 604",
  whatsapp_link: "https://wa.me/256773486604",
  email: "mandajoel12@gmail.com",
  hero_image: "",
  hero_title: "Creative Services. Built Around Your ",
  hero_gradient_word: "Vision",
  hero_desc: "Choose exactly what you need — from logo design and video editing to 3D rendering, VFX and web development."
};

const NAV = [
  { label: "Home",      href: "index.html" },
  { label: "About Us",  href: "about.html" },
  { label: "Services",  href: "services.html", active: true },
  { label: "Portfolio", href: "portfolio.html" },
  { label: "Contact",   href: "contact.html" }
];

const PROCESS = [
  { icon: "✎", title: "1 Brief",    text: "Share your idea" },
  { icon: "◈", title: "2 Design",   text: "We create concepts" },
  { icon: "◉", title: "3 Review",   text: "Give feedback" },
  { icon: "⚙", title: "4 Finalize", text: "Polish to perfection" },
  { icon: "✈", title: "5 Deliver",  text: "Get your files" }
];

const STEPS = [
  { id: 1, label: "Project" },
  { id: 2, label: "Style" },
  { id: 3, label: "Colors & Fonts" },
  { id: 4, label: "References" },
  { id: 5, label: "Requirements" },
  { id: 6, label: "Details" },
  { id: 7, label: "Review" }
];

/* =========================================================
   HELPERS
   ========================================================= */
function $(id) { return document.getElementById(id); }
function formatUGX(n) { return "UGX " + Number(n || 0).toLocaleString("en-UG"); }
function isVideoUrl(str) {
  return typeof str === "string" && /\.(mp4|webm|mov|m4v|ogg)$/i.test(str.trim());
}
function getToneColor(tone) {
  const map = {
    gold: "#FFC857", yellow: "#FFC857",
    blue: "#1677FF", cyan: "#00D9FF",
    green: "#22C55E", pink: "#FF89B8",
    purple: "#B794FF", violet: "#B794FF",
    orange: "#FF8A3D", magenta: "#FF6B9E"
  };
  return map[tone] || "#00D9FF";
}
function defaultFields() {
  return [
    { key: "brand_name", label: "Brand / Business Name", type: "text", required: true },
    { key: "project_name", label: "Project Name", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea", required: true }
  ];
}

/* Strip non-digits from a phone number for wa.me links */
function cleanPhone(num) {
  if (!num) return "";
  return String(num).replace(/[^\d]/g, "");
}

/* ---------- Safe logo loader ---------- */
function loadLogos() {
  document.querySelectorAll(".nav-logo img, #footer .nav-logo img").forEach(img => {
    let triedFallback = false;
    img.onerror = () => {
      if (!triedFallback) {
        triedFallback = true;
        img.src = LOGO_FALLBACK;
        return;
      }
      const parent = img.parentElement;
      if (parent) {
        parent.innerHTML = `
          <span style="font-family:'Poppins',sans-serif;font-weight:800;font-size:20px;letter-spacing:1px;background:linear-gradient(90deg,#FFC857,#00D9FF);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;">JM NEXUS</span>
          <span style="display:block;font-family:'Poppins',sans-serif;font-weight:600;font-size:10px;letter-spacing:4px;color:#9AA7B8;margin-top:2px;">STUDIOS</span>
        `;
      }
    };
    img.src = LOGO_URL;
  });
}

/* =========================================================
   INLINE VIDEO — plays in card
   ========================================================= */
function wireCardVideos() {
  document.querySelectorAll("[data-toggle-play]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      const id = btn.dataset.togglePlay;
      const video = document.querySelector(`[data-video-for="${id}"]`);
      if (!video) return;

      if (video.paused || video.ended) {
        document.querySelectorAll(".sc-video").forEach(v => {
          if (v !== video && !v.paused) v.pause();
        });
        if (video.ended) video.currentTime = 0;
        video.play().catch(err => console.warn("Play failed:", err));
      } else {
        video.pause();
      }
    });
  });

  document.querySelectorAll(".sc-video").forEach(video => {
    const id = video.dataset.videoFor;
    const btn = document.querySelector(`[data-toggle-play="${id}"]`);

    video.addEventListener("play", () => {
      video.classList.add("is-active");
      if (btn) btn.classList.add("playing");
    });
    video.addEventListener("pause", () => {
      if (btn) btn.classList.remove("playing");
    });
    video.addEventListener("ended", () => {
      video.classList.remove("is-active");
      if (btn) btn.classList.remove("playing");
    });
    video.addEventListener("click", (e) => {
      e.stopPropagation();
      if (video.paused) video.play().catch(() => {});
      else video.pause();
    });
  });
}

/* =========================================================
   BUILD ORDER MESSAGE (used by WhatsApp + Email)
   ========================================================= */
function buildOrderMessage(s, state) {
  const lines = [
    "🟡 JM NEXUS STUDIOS — NEW ORDER",
    "─────────────────────────────",
    "",
    `Reference:    ${state.reference}`,
    `Service:      ${s.title}`,
    `Category:     ${s.category}`,
    `Price:        ${formatUGX(s.price)}`,
    "",
    "── CUSTOMER ──",
    `Name:         ${state.values.contact_name || "—"}`,
    `Email:        ${state.values.contact_email || "—"}`,
    `Phone:        ${state.values.contact_phone || "—"}`,
    `Contact via:  ${state.values.comm || "—"}`
  ];

  const projectRows = [];
  if (state.values.brand_name)    projectRows.push(`Brand:        ${state.values.brand_name}`);
  if (state.values.project_name)  projectRows.push(`Project:      ${state.values.project_name}`);
  if (state.values.description)   projectRows.push(`Description:  ${state.values.description}`);
  if (state.values.deadline)      projectRows.push(`Deadline:     ${state.values.deadline}`);
  if (state.values.budget)        projectRows.push(`Budget:       ${state.values.budget}`);

  if (projectRows.length) {
    lines.push("", "── PROJECT ──", ...projectRows);
  }

  const creativeRows = [];
  if (state.values.style)        creativeRows.push(`Style:        ${state.values.style}`);
  if (state.values.palette)      creativeRows.push(`Palette:      ${state.values.palette}`);
  if (state.values.custom_color) creativeRows.push(`Custom Color: ${state.values.custom_color}`);
  if (state.values.font)         creativeRows.push(`Font:         ${state.values.font}`);

  if (creativeRows.length) {
    lines.push("", "── CREATIVE ──", ...creativeRows);
  }

  /* Any extra form fields not already shown */
  const skipKeys = [
    "contact_name", "contact_email", "contact_phone", "comm",
    "brand_name", "project_name", "description", "deadline",
    "budget", "style", "palette", "custom_color", "font", "notes"
  ];
  const extraRows = [];
  Object.entries(state.values).forEach(([k, v]) => {
    if (skipKeys.includes(k)) return;
    if (!v) return;
    if (Array.isArray(v) && !v.length) return;
    const val = Array.isArray(v) ? v.join(", ") : v;
    extraRows.push(`${k}: ${val}`);
  });
  if (extraRows.length) {
    lines.push("", "── REQUIREMENTS ──", ...extraRows);
  }

  if (state.values.notes) {
    lines.push("", "── NOTES ──", state.values.notes);
  }

  if (state.files.length) {
    lines.push("", "── FILES ──");
    state.files.forEach((f, i) => {
      lines.push(`${i + 1}. ${f.name} (${(f.size / 1024).toFixed(1)} KB)`);
    });
  }

  lines.push("");
  lines.push("─────────────────────────────");
  lines.push(`Submitted: ${new Date().toLocaleString()}`);

  return lines.join("\n");
}

/* =========================================================
   BOOT
   ========================================================= */
(async function () {
  let SETTINGS = { ...FALLBACK_SETTINGS };
  let SERVICES = [];
  let CATEGORIES = [];
  let SOFTWARE = [];
  let currentFilter = "All";
  let currentSearch = "";

  /* ---------- LOAD FROM SUPABASE ---------- */
  try {
    if (window.JM_SUPABASE) {
      const [set, cat, svc, sw] = await Promise.all([
        window.JM_SUPABASE.from("site_settings").select("*"),
        window.JM_SUPABASE.from("categories").select("*").order("sort_order"),
        window.JM_SUPABASE.from("services").select("*").eq("active", true).order("sort_order"),
        window.JM_SUPABASE.from("software").select("*").eq("active", true).order("sort_order")
      ]);

      if (!set.error && set.data) set.data.forEach(r => { SETTINGS[r.key] = r.value; });
      if (!cat.error && cat.data) CATEGORIES = cat.data;
      if (!sw.error && sw.data) SOFTWARE = sw.data;

      if (!svc.error && svc.data?.length) {
        SERVICES = svc.data.map(r => ({
          id: String(r.id),
          title: r.title,
          description: r.description || "",
          price: r.price || 0,
          price_type: r.price_type || "From",
          image: r.thumbnail_url || "",
          icon: r.icon || "◈",
          icon_tone: r.icon_tone || "cyan",
          category: CATEGORIES.find(c => c.id === r.category_id)?.name || "Other",
          category_id: r.category_id,
          badge: r.badge || "",
          delivery: r.delivery || "",
          featured: !!r.featured,
          includes: Array.isArray(r.includes) ? r.includes : [],
          tags: Array.isArray(r.tags) ? r.tags : [],
          mockup_images: Array.isArray(r.mockup_images) ? r.mockup_images : [],
          social_examples: Array.isArray(r.social_examples) ? r.social_examples : [],
          sample_video: r.sample_video || "",
          form_fields: Array.isArray(r.form_fields) && r.form_fields.length
            ? r.form_fields
            : defaultFields()
        }));
      }
    }
  } catch (err) { console.warn("Supabase fetch failed:", err); }

  if (!SERVICES.length) {
    SERVICES = [{
      id: "1", title: "Graphic Design & Branding", category: "Design",
      description: "Logos, posters, social media graphics.",
      price: 30000, price_type: "From",
      image: "", icon: "◈", icon_tone: "gold",
      badge: "Popular", delivery: "3–5 days",
      mockup_images: [], social_examples: [], sample_video: "",
      form_fields: defaultFields(), tags: []
    }];
  }
  if (!CATEGORIES.length) {
    CATEGORIES = [...new Set(SERVICES.map(s => s.category))].map((name, i) => ({ id: i + 1, name }));
  }

  /* ---------- NAV ---------- */
  const navLinks = $("nav-links");
  if (navLinks) navLinks.innerHTML = NAV.map(n =>
    `<a href="${n.href}" class="${n.active ? "active" : ""}">${n.label}</a>`).join("");

  const mobileNav = $("mobile-nav");
  if (mobileNav) mobileNav.innerHTML = NAV.map(n =>
    `<a href="${n.href}" class="${n.active ? "active" : ""}">${n.label}</a>`).join("");

  loadLogos();

  /* ---------- MOBILE MENU ---------- */
  const mobileMenu = $("mobile-menu");
  const mobileBackdrop = $("mobile-backdrop");
  const navToggle = $("nav-toggle");
  const mobileClose = $("mobile-close");

  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add("open");
    mobileBackdrop.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("open");
    mobileBackdrop.hidden = true;
    document.body.style.overflow = "";
  }
  if (navToggle) navToggle.addEventListener("click", openMenu);
  if (mobileClose) mobileClose.addEventListener("click", closeMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener("click", closeMenu);

  /* ---------- HERO ---------- */
  const heroTitle = $("hero-title");
  if (heroTitle) {
    heroTitle.innerHTML = `${SETTINGS.hero_title || ""}<span class="grad">${SETTINGS.hero_gradient_word || "Vision"}</span>`;
  }
  const heroDesc = $("hero-desc");
  if (heroDesc) heroDesc.textContent = SETTINGS.hero_desc || "";

  const heroImage = $("hero-image");
  if (heroImage) {
    const primaryUrl = (SETTINGS.hero_image || "").trim();
    const fallbackUrl = "assets/images/services/services-hero.webp";
    let triedFallback = false;

    heroImage.onerror = () => {
      if (primaryUrl && !triedFallback) {
        triedFallback = true;
        heroImage.src = fallbackUrl;
        return;
      }
      heroImage.style.display = "none";
      const parent = heroImage.parentElement;
      if (parent) parent.style.background = "linear-gradient(135deg,#0D1422 0%,#0A1A38 55%,#1A0838 100%)";
    };

    heroImage.src = primaryUrl || fallbackUrl;
  }

  /* ---------- SOFTWARE ICONS ---------- */
  const heroTools = $("hero-tools");
  if (heroTools && SOFTWARE.length) {
    heroTools.innerHTML = SOFTWARE.map(s => `
      <button class="hero-tool" data-sw-id="${s.id}"
              style="left:${s.position_x || '10%'};top:${s.position_y || '10%'};"
              title="${s.name}" aria-label="${s.name}">
        ${s.image_url ? `<img src="${s.image_url}" alt="${s.name}" />` : (s.icon || s.name.charAt(0))}
      </button>
    `).join("");

    heroTools.addEventListener("click", e => {
      const btn = e.target.closest("[data-sw-id]");
      if (!btn) return;
      const sw = SOFTWARE.find(x => String(x.id) === btn.dataset.swId);
      if (sw) openSoftwarePopover(sw);
    });
  }

  const swPopover = $("software-popover");
  function openSoftwarePopover(sw) {
    if (!swPopover) return;
    const logo = $("sw-logo");
    logo.innerHTML = sw.image_url
      ? `<img src="${sw.image_url}" alt="${sw.name}" />`
      : (sw.icon || sw.name.charAt(0));
    logo.style.borderColor = sw.accent_color || "#00D9FF";
    logo.style.color = sw.accent_color || "#00D9FF";

    $("sw-name").textContent = sw.name;
    $("sw-desc").textContent = sw.description || "";
    $("sw-uses").textContent = sw.uses || "";

    const link = $("sw-link");
    if (sw.website_url) {
      link.href = sw.website_url;
      link.style.display = "";
    } else {
      link.style.display = "none";
    }
    swPopover.hidden = false;
  }
  const swClose = $("software-close");
  if (swClose) swClose.addEventListener("click", () => { swPopover.hidden = true; });
  if (swPopover) swPopover.addEventListener("click", e => {
    if (e.target === swPopover) swPopover.hidden = true;
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && swPopover && !swPopover.hidden) swPopover.hidden = true;
  });

  /* ---------- FILTERS ---------- */
  const filterRow = $("filters");
  if (filterRow) {
    const cats = ["All", ...CATEGORIES.map(c => c.name)];
    filterRow.innerHTML = cats.map((name, i) =>
      `<button class="filter-btn ${i === 0 ? "active" : ""}" data-filter="${name}">${name}</button>`
    ).join("");
  }

  /* ---------- RENDER SERVICES ---------- */
  const grid = $("services-grid");
  const noRes = $("no-results");
  const resultCount = $("result-count");

  function renderServices() {
    if (!grid) return;
    const q = currentSearch.trim().toLowerCase();

    const items = SERVICES.filter(s => {
      const matchCat = currentFilter === "All" || s.category === currentFilter;
      const matchQ = !q ||
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        (s.tags || []).some(t => t.toLowerCase().includes(q));
      return matchCat && matchQ;
    });

    if (!items.length) {
      grid.innerHTML = "";
      if (noRes) noRes.hidden = false;
      if (resultCount) resultCount.textContent = "0 services";
      return;
    }
    if (noRes) noRes.hidden = true;
    if (resultCount) resultCount.textContent = items.length + " service" + (items.length === 1 ? "" : "s");

    grid.innerHTML = items.map(s => {
      const toneColor = getToneColor(s.icon_tone);
      const hasVideo = isVideoUrl(s.sample_video);

      return `
        <article class="service-card" data-id="${s.id}">
          <div class="sc-thumb">
            ${s.image
              ? `<img src="${s.image}" alt="${s.title}" loading="lazy"
                      onerror="this.style.display='none';this.parentElement.insertAdjacentHTML('beforeend','<div class=\\'sc-thumb-fallback\\' style=\\'color:${toneColor};\\'>${s.icon || "◈"}</div>')" />`
              : `<div class="sc-thumb-fallback" style="color:${toneColor};">${s.icon || "◈"}</div>`}

            ${hasVideo ? `
              <video
                class="sc-video"
                data-video-for="${s.id}"
                src="${s.sample_video}"
                playsinline
                preload="metadata"
                muted
                poster="${s.image || ''}"></video>
              <button
                class="sc-play-btn"
                data-toggle-play="${s.id}"
                aria-label="Play video">
                <span>▶</span>
              </button>
            ` : ""}
          </div>
          <div class="sc-body">
            <div class="sc-badge-row">
              <span class="sc-badge">${s.category}</span>
              ${s.badge ? `<span class="sc-badge hot">${s.badge}</span>` : ""}
            </div>
            <h3 class="sc-title">${s.title}</h3>
            <p class="sc-desc">${s.description}</p>
            <div class="sc-price">
              <small>${s.price_type}</small>
              ${formatUGX(s.price)}
              ${s.delivery ? `<span class="sc-delivery">⏱ ${s.delivery}</span>` : ""}
            </div>
            <div class="sc-actions">
              <button class="sc-btn" data-open="${s.id}">Order Now →</button>
            </div>
          </div>
        </article>
      `;
    }).join("");

    wireCardVideos();
  }

  /* Filter clicks */
  if (filterRow) {
    filterRow.addEventListener("click", e => {
      const b = e.target.closest(".filter-btn");
      if (!b) return;
      filterRow.querySelectorAll(".filter-btn").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      currentFilter = b.dataset.filter;
      renderServices();
    });
  }

  /* Search */
  const searchInput = $("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      currentSearch = searchInput.value;
      renderServices();
    });
  }

  /* Card clicks */
  if (grid) {
    grid.addEventListener("click", e => {
      if (e.target.closest("[data-toggle-play]")) return;
      if (e.target.closest(".sc-video")) return;

      const openBtn = e.target.closest("[data-open]");
      if (openBtn) {
        openDrawer(openBtn.dataset.open);
        return;
      }
    });
  }

  renderServices();

  /* ---------- PROCESS ---------- */
  const processStrip = $("process-strip");
  if (processStrip) {
    processStrip.innerHTML = PROCESS.map(p => `
      <div class="pstep">
        <span class="circle">${p.icon}</span>
        <h5>${p.title}</h5>
        <p>${p.text}</p>
      </div>
    `).join("");
  }

  /* ---------- FOOTER ---------- */
  const fNav = $("footer-nav");
  if (fNav) fNav.innerHTML = NAV.map(n => `<a href="${n.href}">${n.label}</a>`).join("");

  const fSvc = $("footer-services");
  if (fSvc) fSvc.innerHTML = SERVICES.slice(0, 6)
    .map(s => `<a href="services.html">${s.title}</a>`).join("");

  const fContact = $("footer-contact");
  if (fContact) fContact.innerHTML = `
    <p>☎ ${SETTINGS.whatsapp_number || ""}</p>
    <p>✉ ${SETTINGS.email || ""}</p>
    <p>◉ Jinja, Uganda</p>`;

  const yearEl = $("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================================================
     DRAWER — Multi-step order
     ========================================================= */
  const drawerEl = $("drawer");
  const backdrop = $("drawer-backdrop");
  const drawerBody = $("drawer-scroll");

  const state = {
    service: null,
    step: 1,
    mode: "form",
    values: {},
    files: [],
    galleryIndex: 0,
    reference: "",
    saved: false,
    stylings: { styles: [], palettes: [], fonts: [] }
  };

  async function openDrawer(id) {
    if (!drawerEl || !backdrop || !drawerBody) return;
    const s = SERVICES.find(x => String(x.id) === String(id));
    if (!s) return;

    state.service = s;
    state.step = 1;
    state.mode = "form";
    state.values = {};
    state.files = [];
    state.galleryIndex = 0;
    state.reference = "";
    state.saved = false;

    await loadStylings(s.id);
    renderDrawer();

    drawerEl.classList.add("open");
    drawerEl.setAttribute("aria-hidden", "false");
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
    drawerBody.scrollTop = 0;
  }

  async function loadStylings(serviceId) {
    state.stylings = { styles: [], palettes: [], fonts: [] };
    if (!window.JM_SUPABASE) return;
    try {
      const [st, pl, fo] = await Promise.all([
        window.JM_SUPABASE.from("service_styles").select("*").eq("service_id", serviceId).order("sort_order"),
        window.JM_SUPABASE.from("service_palettes").select("*").eq("service_id", serviceId).order("sort_order"),
        window.JM_SUPABASE.from("service_fonts").select("*").eq("service_id", serviceId).order("sort_order")
      ]);
      if (!st.error && st.data) state.stylings.styles = st.data;
      if (!pl.error && pl.data) state.stylings.palettes = pl.data;
      if (!fo.error && fo.data) state.stylings.fonts = fo.data;
    } catch (err) { console.warn("Stylings load:", err); }
  }

  function closeDrawer() {
    if (!drawerEl || !backdrop) return;
    drawerEl.classList.remove("open");
    drawerEl.setAttribute("aria-hidden", "true");
    backdrop.hidden = true;
    document.body.style.overflow = "";
  }

  const dc = $("drawer-close");
  if (dc) dc.addEventListener("click", closeDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && drawerEl && drawerEl.classList.contains("open")) closeDrawer();
  });

  /* ---------- GALLERY ---------- */
  function buildGallery(s) {
    const items = [];
    if (s.image) items.push({ type: "image", url: s.image, caption: "Main Preview" });
    (s.mockup_images || []).forEach((url, i) =>
      items.push({ type: "image", url, caption: `Mockup ${i + 1}` }));
    (s.social_examples || []).forEach((url, i) =>
      items.push({ type: "image", url, caption: `Social Example ${i + 1}` }));
    if (s.sample_video && isVideoUrl(s.sample_video)) {
      items.push({ type: "video", url: s.sample_video, caption: "Sample Video" });
    }
    return items;
  }

  function renderGallery(s) {
    const gallery = buildGallery(s);
    if (!gallery.length) return "";
    const current = gallery[state.galleryIndex] || gallery[0];
    const isVideo = current.type === "video";

    return `
      <div class="dr-gallery">
        <div class="dr-gallery-main">
          ${isVideo
            ? `<video
                 id="dr-gallery-video"
                 src="${current.url}"
                 controls
                 playsinline
                 preload="metadata"></video>
               <button class="play-badge" id="dr-gallery-play" type="button" aria-label="Play video">
                 <span>▶</span>
               </button>`
            : `<img src="${current.url}" alt="${current.caption}" />`}
          <div class="dr-gallery-caption">${current.caption}</div>
        </div>
        <div class="dr-gallery-thumbs" id="dr-gallery-thumbs">
          ${gallery.map((g, i) => `
            <div class="dr-gallery-thumb ${i === state.galleryIndex ? 'active' : ''}" data-idx="${i}">
              ${g.type === "video"
                ? `<img src="${s.image || ''}" alt="" style="opacity:.3;" /><span class="video-tag">▶</span>`
                : `<img src="${g.url}" alt="${g.caption}" />`}
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  /* ---------- RENDER DRAWER ---------- */
  function renderDrawer() {
    if (state.mode === "success") { renderSuccess(); return; }
    const s = state.service;
    const accent = getToneColor(s.icon_tone);

    drawerBody.innerHTML = `
      <div class="dr-identity">
        <div class="dr-thumb">
          ${s.image
            ? `<img src="${s.image}" alt="${s.title}" />`
            : `<div class="fallback" style="color:${accent};">${s.icon}</div>`}
        </div>
        <div class="dr-identity-info">
          <div class="cat">${s.category}</div>
          <h3>${s.title}</h3>
          <div class="price">${s.price_type} ${formatUGX(s.price)}</div>
        </div>
      </div>

      <nav class="dr-progress">
        ${STEPS.map(st => `
          <button class="step-dot ${state.step === st.id ? 'active' : ''} ${state.step > st.id ? 'done' : ''}"
                  data-goto="${st.id}">
            <span class="num">${state.step > st.id ? '✓' : st.id}</span>${st.label}
          </button>
        `).join("")}
      </nav>

      <div class="dr-step ${state.step === 1 ? 'active' : ''}" data-step="1">
        <h4>1. Project Preview & Basics</h4>
        <p class="hint">See examples of what we create, then tell us about your project.</p>
        ${renderGallery(s)}
        <div class="dr-fields">${renderStep1Fields(s)}</div>
      </div>

      <div class="dr-step ${state.step === 2 ? 'active' : ''}" data-step="2">
        <h4>2. Style Direction</h4>
        <p class="hint">Pick the visual style that matches your vision.</p>
        ${state.stylings.styles.length ? `
          <div class="dr-field">
            <div class="dr-style-grid">
              ${state.stylings.styles.map(st => `
                <button class="dr-style-item ${state.values.style === st.label ? 'selected' : ''}"
                        data-style="${st.label}">
                  <div class="swatch-dot" style="background:${st.preview_color || accent};"></div>
                  <strong>${st.label}</strong>
                  <span>${st.description || ''}</span>
                </button>
              `).join("")}
            </div>
          </div>
        ` : '<p class="hint">No styles configured for this service yet.</p>'}
      </div>

      <div class="dr-step ${state.step === 3 ? 'active' : ''}" data-step="3">
        <h4>3. Colors & Fonts</h4>
        <p class="hint">Choose a palette or set custom colors, then pick a font style.</p>

        ${state.stylings.palettes.length ? `
          <div class="dr-field">
            <label class="dr-field-label">Color Palette</label>
            <div class="dr-palettes">
              ${state.stylings.palettes.map(pa => `
                <button class="dr-palette ${state.values.palette === pa.name ? 'selected' : ''}"
                        data-palette="${pa.name}">
                  <strong>${pa.name}</strong>
                  <div class="dr-palette-swatches">
                    ${(pa.colors || []).map(c => `<span style="background:${c};"></span>`).join("")}
                  </div>
                </button>
              `).join("")}
            </div>
          </div>
        ` : ''}

        <div class="dr-custom-color">
          <span>Custom Color</span>
          <input type="color" id="dr-custom-color" value="${state.values.custom_color || '#00D9FF'}" />
          <em id="dr-custom-hex">${state.values.custom_color || '#00D9FF'}</em>
        </div>

        ${state.stylings.fonts.length ? `
          <div class="dr-field" style="margin-top:14px;">
            <label class="dr-field-label">Font Style</label>
            <div class="dr-fonts">
              ${state.stylings.fonts.map(f => `
                <button class="dr-font-item ${state.values.font === f.name ? 'selected' : ''}"
                        data-font="${f.name}">
                  <div class="dr-font-sample" style="font-family:'${f.preview_font || f.name}', sans-serif;">${f.name}</div>
                  <div class="dr-font-meta">
                    <span class="tag">${f.category || 'Font'}</span>
                    <span>${f.description || ''}</span>
                  </div>
                </button>
              `).join("")}
            </div>
          </div>
        ` : ''}
      </div>

      <div class="dr-step ${state.step === 4 ? 'active' : ''}" data-step="4">
        <h4>4. References & Uploads</h4>
        <p class="hint">Upload any images, logos, videos or documents.</p>
        <label class="dr-upload" id="dr-upload-area">
          <div class="dr-upload-inner">
            <span class="dr-upload-icon">☁</span>
            <strong>Click to upload or drag and drop</strong>
            <em>PNG · JPG · SVG · PDF · MP4 (Max 10MB each)</em>
          </div>
          <input type="file" id="dr-upload-input" multiple
                 accept=".png,.jpg,.jpeg,.svg,.pdf,.mp4,.webm,.webp" />
        </label>
        <div class="dr-files" id="dr-files"></div>
      </div>

      <div class="dr-step ${state.step === 5 ? 'active' : ''}" data-step="5">
        <h4>5. Service Requirements</h4>
        <p class="hint">Specific details for your ${s.title.toLowerCase()}.</p>
        <div class="dr-fields">${renderStep5Fields(s)}</div>
      </div>

      <div class="dr-step ${state.step === 6 ? 'active' : ''}" data-step="6">
        <h4>6. Final Details</h4>
        <p class="hint">Deadline, budget and how you'd like us to contact you.</p>

        <div class="dr-fields">
          <div class="dr-field">
            <label class="dr-field-label">Preferred Deadline <span class="opt">Optional</span></label>
            <select data-field="deadline">
              <option value="">Select timeline</option>
              ${["Within 3 days","1 week","2 weeks","1 month","Flexible"].map(o =>
                `<option value="${o}" ${state.values.deadline === o ? "selected" : ""}>${o}</option>`).join("")}
            </select>
          </div>

          <div class="dr-field">
            <label class="dr-field-label">Estimated Budget <span class="opt">Optional</span></label>
            <select data-field="budget">
              <option value="">Select budget</option>
              ${["Under UGX 50,000","UGX 50,000 – 150,000","UGX 150,000 – 500,000","UGX 500,000+"].map(o =>
                `<option value="${o}" ${state.values.budget === o ? "selected" : ""}>${o}</option>`).join("")}
            </select>
          </div>

          <div class="dr-field">
            <label class="dr-field-label">Additional Notes <span class="opt">Optional</span></label>
            <textarea data-field="notes" placeholder="Anything else we should know?">${state.values.notes || ""}</textarea>
          </div>

          <div class="dr-field">
            <label class="dr-field-label">Communication Method</label>
            <div class="dr-comm">
              <button class="dr-pill ${state.values.comm === 'whatsapp' ? 'selected' : ''}" data-comm="whatsapp">💬 WhatsApp</button>
              <button class="dr-pill ${state.values.comm === 'email' ? 'selected' : ''}" data-comm="email">✉ Email</button>
              <button class="dr-pill ${state.values.comm === 'website' ? 'selected' : ''}" data-comm="website">🌐 Website</button>
            </div>
          </div>

          <div class="dr-field">
            <label class="dr-field-label">Your Name <span class="req">*</span></label>
            <input type="text" id="contact-name" placeholder="Full name" value="${state.values.contact_name || ''}" />
          </div>
          <div class="dr-field">
            <label class="dr-field-label">Email <span class="req">*</span></label>
            <input type="email" id="contact-email" placeholder="you@example.com" value="${state.values.contact_email || ''}" />
          </div>
          <div class="dr-field">
            <label class="dr-field-label">Phone / WhatsApp <span class="opt">Optional</span></label>
            <input type="tel" id="contact-phone" placeholder="+256 ..." value="${state.values.contact_phone || ''}" />
          </div>
        </div>
      </div>

      <div class="dr-step ${state.step === 7 ? 'active' : ''}" data-step="7">
        <h4>7. Review Your Request</h4>
        <p class="hint">Check every section. Click Edit to change anything before submitting.</p>
        <div id="dr-review"></div>
      </div>
    `;

    wireDrawer();
    updateFooter();
  }

  function renderStep1Fields(s) {
    const keys = ["brand_name", "project_name", "description"];
    const fields = (s.form_fields || defaultFields()).filter(f => keys.includes(f.key));
    const list = fields.length ? fields : defaultFields();
    return list.map(f => renderField(f)).join("");
  }

  function renderStep5Fields(s) {
    const skip = ["brand_name", "project_name", "description", "reference", "footage"];
    const fields = (s.form_fields || defaultFields()).filter(f => !skip.includes(f.key));
    if (!fields.length) return '<p style="color:var(--sv-text-2);font-size:13px;">No additional details required.</p>';
    return fields.map(f => renderField(f)).join("");
  }

  function renderField(f) {
    const req = f.required ? ' <span class="req">*</span>' : ' <span class="opt">Optional</span>';
    const val = state.values[f.key] || "";

    if (["text","email","tel","number"].includes(f.type)) {
      return `
        <div class="dr-field">
          <label class="dr-field-label">${f.label}${req}</label>
          <input type="${f.type}" data-field="${f.key}" placeholder="${f.placeholder || ''}"
                 value="${String(val).replace(/"/g, '&quot;')}" />
        </div>
      `;
    }
    if (f.type === "textarea") {
      return `
        <div class="dr-field">
          <label class="dr-field-label">${f.label}${req}</label>
          <textarea data-field="${f.key}" placeholder="${f.placeholder || ''}">${val}</textarea>
        </div>
      `;
    }
    if (f.type === "select") {
      return `
        <div class="dr-field">
          <label class="dr-field-label">${f.label}${req}</label>
          <select data-field="${f.key}">
            <option value="">Select ${f.label}</option>
            ${(f.options || []).map(o =>
              `<option value="${o}" ${val === o ? "selected" : ""}>${o}</option>`).join("")}
          </select>
        </div>
      `;
    }
    if (f.type === "radio" || f.type === "checkbox") {
      const isArr = Array.isArray(val);
      const sel = isArr ? val : (val ? [val] : []);
      return `
        <div class="dr-field">
          <label class="dr-field-label">${f.label}${req}</label>
          <div class="dr-pills" data-pills-key="${f.key}" data-multi="${f.type === 'checkbox'}">
            ${(f.options || []).map(o => `
              <button type="button" class="dr-pill ${sel.includes(o) ? 'selected' : ''}" data-value="${o}">${o}</button>
            `).join("")}
          </div>
        </div>
      `;
    }
    if (f.type === "color") {
      return `
        <div class="dr-field">
          <label class="dr-field-label">${f.label}${req}</label>
          <div class="dr-custom-color">
            <input type="color" data-field="${f.key}" value="${val || '#00D9FF'}" />
            <em data-field-hex="${f.key}">${(val || '#00D9FF').toUpperCase()}</em>
          </div>
        </div>
      `;
    }
    return "";
  }

  function wireDrawer() {
    drawerBody.querySelectorAll("[data-goto]").forEach(dot => {
      dot.addEventListener("click", () => {
        const step = Number(dot.dataset.goto);
        if (step <= state.step) {
          state.step = step;
          renderDrawer();
        }
      });
    });

    drawerBody.querySelectorAll("[data-field]").forEach(el => {
      el.addEventListener("input", () => {
        state.values[el.dataset.field] = el.value;
        const hex = drawerBody.querySelector(`[data-field-hex="${el.dataset.field}"]`);
        if (hex && el.type === "color") hex.textContent = el.value.toUpperCase();
      });
      el.addEventListener("change", () => {
        state.values[el.dataset.field] = el.value;
      });
    });

    drawerBody.querySelectorAll("[data-pills-key]").forEach(group => {
      const key = group.dataset.pillsKey;
      const multi = group.dataset.multi === "true";
      group.addEventListener("click", e => {
        const pill = e.target.closest(".dr-pill");
        if (!pill) return;
        const val = pill.dataset.value;
        if (multi) {
          pill.classList.toggle("selected");
          state.values[key] = [...group.querySelectorAll(".dr-pill.selected")].map(x => x.dataset.value);
        } else {
          group.querySelectorAll(".dr-pill").forEach(x => x.classList.remove("selected"));
          pill.classList.add("selected");
          state.values[key] = val;
        }
      });
    });

    const thumbs = drawerBody.querySelector("#dr-gallery-thumbs");
    if (thumbs) {
      thumbs.addEventListener("click", e => {
        const t = e.target.closest("[data-idx]");
        if (!t) return;
        state.galleryIndex = Number(t.dataset.idx);
        renderDrawer();
      });
    }

    const galleryVideo = drawerBody.querySelector("#dr-gallery-video");
    const galleryPlayBtn = drawerBody.querySelector("#dr-gallery-play");

    if (galleryVideo && galleryPlayBtn) {
      galleryPlayBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        document.querySelectorAll(".sc-video").forEach(v => {
          if (!v.paused) v.pause();
        });
        galleryVideo.play().catch(err => console.warn("Gallery play failed:", err));
      });

      galleryVideo.addEventListener("play", () => {
        galleryPlayBtn.classList.add("playing");
      });
      galleryVideo.addEventListener("pause", () => {
        galleryPlayBtn.classList.remove("playing");
      });
      galleryVideo.addEventListener("ended", () => {
        galleryPlayBtn.classList.remove("playing");
      });
    }

    drawerBody.querySelectorAll("[data-style]").forEach(el => {
      el.addEventListener("click", () => {
        drawerBody.querySelectorAll("[data-style]").forEach(x => x.classList.remove("selected"));
        el.classList.add("selected");
        state.values.style = el.dataset.style;
      });
    });

    drawerBody.querySelectorAll("[data-palette]").forEach(el => {
      el.addEventListener("click", () => {
        drawerBody.querySelectorAll("[data-palette]").forEach(x => x.classList.remove("selected"));
        el.classList.add("selected");
        state.values.palette = el.dataset.palette;
      });
    });

    drawerBody.querySelectorAll("[data-font]").forEach(el => {
      el.addEventListener("click", () => {
        drawerBody.querySelectorAll("[data-font]").forEach(x => x.classList.remove("selected"));
        el.classList.add("selected");
        state.values.font = el.dataset.font;
      });
    });

    const cc = drawerBody.querySelector("#dr-custom-color");
    if (cc) {
      cc.addEventListener("input", () => {
        state.values.custom_color = cc.value;
        const h = drawerBody.querySelector("#dr-custom-hex");
        if (h) h.textContent = cc.value.toUpperCase();
      });
    }

    drawerBody.querySelectorAll("[data-comm]").forEach(pill => {
      pill.addEventListener("click", () => {
        drawerBody.querySelectorAll("[data-comm]").forEach(x => x.classList.remove("selected"));
        pill.classList.add("selected");
        state.values.comm = pill.dataset.comm;
      });
    });

    ["contact-name","contact-email","contact-phone"].forEach(id => {
      const el = drawerBody.querySelector(`#${id}`);
      if (!el) return;
      el.addEventListener("input", () => {
        state.values[id.replace("-", "_")] = el.value;
      });
    });

    const upInput = drawerBody.querySelector("#dr-upload-input");
    const upArea = drawerBody.querySelector("#dr-upload-area");
    if (upInput) {
      upInput.addEventListener("change", e => {
        [...e.target.files].slice(0, 8).forEach(f => {
          if (f.size > 10 * 1024 * 1024) { alert(f.name + " is too large (10MB max)."); return; }
          state.files.push(f);
        });
        renderFiles();
      });
    }
    if (upArea) {
      ["dragover","dragenter"].forEach(ev => upArea.addEventListener(ev, e => {
        e.preventDefault(); upArea.classList.add("drag");
      }));
      ["dragleave","drop"].forEach(ev => upArea.addEventListener(ev, e => {
        e.preventDefault(); upArea.classList.remove("drag");
      }));
      upArea.addEventListener("drop", e => {
        [...e.dataTransfer.files].slice(0, 8).forEach(f => {
          if (f.size <= 10 * 1024 * 1024) state.files.push(f);
        });
        renderFiles();
      });
    }
  }

  function renderFiles() {
    const c = drawerBody.querySelector("#dr-files");
    if (!c) return;
    c.innerHTML = state.files.map((f, i) => `
      <div class="dr-file">
        <span class="f-ico">📎</span>
        <div class="f-info">
          <strong>${f.name}</strong>
          <em>${(f.size / 1024).toFixed(1)} KB</em>
        </div>
        <button class="f-remove" data-remove="${i}">Remove</button>
      </div>
    `).join("");
    c.querySelectorAll("[data-remove]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.files.splice(Number(btn.dataset.remove), 1);
        renderFiles();
      });
    });
  }

  function updateFooter() {
    let foot = drawerEl.querySelector(".dr-foot");
    if (!foot) {
      foot = document.createElement("div");
      foot.className = "dr-foot";
      drawerEl.appendChild(foot);
    }
    const step = state.step;
    const s = state.service;

    let actions = "";
    if (step > 1) actions += `<button class="btn-back" id="dr-back">← Back</button>`;
    if (step < 7) actions += `<button class="btn-continue" id="dr-continue">Continue →</button>`;
    if (step === 7) actions += `<button class="btn-submit" id="dr-submit">Submit Request →</button>`;

    foot.innerHTML = `
      <div class="dr-foot-info">
        Step ${step} of 7
        <strong>${s.price_type} ${formatUGX(s.price)}</strong>
      </div>
      <div class="dr-actions">${actions}</div>
    `;

    const back = $("dr-back");
    if (back) back.addEventListener("click", () => { if (state.step > 1) { state.step--; renderDrawer(); } });
    const cont = $("dr-continue");
    if (cont) cont.addEventListener("click", () => { if (state.step < 7) { state.step++; renderDrawer(); } });
    const sub = $("dr-submit");
    if (sub) sub.addEventListener("click", submitOrder);

    if (step === 7) buildReview();
  }

  function buildReview() {
    const el = $("dr-review");
    if (!el) return;
    const s = state.service;

    el.innerHTML = `
      <div class="dr-review-section">
        <button class="edit-btn" data-edit="1">Edit</button>
        <h5>Project Basics</h5>
        ${["brand_name","project_name","description"].map(k => {
          if (!state.values[k]) return "";
          const label = (s.form_fields.find(f => f.key === k) || { label: k }).label;
          return `<div class="dr-review-row"><span>${label}</span><strong>${state.values[k]}</strong></div>`;
        }).join("") || '<div class="dr-review-row"><span>—</span><strong>Not set</strong></div>'}
      </div>

      <div class="dr-review-section">
        <button class="edit-btn" data-edit="2">Edit</button>
        <h5>Style</h5>
        <div class="dr-review-row"><span>Style</span><strong>${state.values.style || "—"}</strong></div>
      </div>

      <div class="dr-review-section">
        <button class="edit-btn" data-edit="3">Edit</button>
        <h5>Colors & Fonts</h5>
        <div class="dr-review-row"><span>Palette</span><strong>${state.values.palette || "—"}</strong></div>
        <div class="dr-review-row"><span>Custom Color</span><strong>${state.values.custom_color || "—"}</strong></div>
        <div class="dr-review-row"><span>Font</span><strong>${state.values.font || "—"}</strong></div>
      </div>

      <div class="dr-review-section">
        <button class="edit-btn" data-edit="4">Edit</button>
        <h5>Files (${state.files.length})</h5>
        ${state.files.length
          ? state.files.map(f => `<div class="dr-review-row"><span>${f.name}</span><strong>${(f.size/1024).toFixed(1)} KB</strong></div>`).join("")
          : '<div class="dr-review-row"><span>—</span><strong>No files</strong></div>'}
      </div>

      <div class="dr-review-section">
        <button class="edit-btn" data-edit="6">Edit</button>
        <h5>Contact</h5>
        <div class="dr-review-row"><span>Name</span><strong>${state.values.contact_name || "—"}</strong></div>
        <div class="dr-review-row"><span>Email</span><strong>${state.values.contact_email || "—"}</strong></div>
        <div class="dr-review-row"><span>Phone</span><strong>${state.values.contact_phone || "—"}</strong></div>
        <div class="dr-review-row"><span>Communication</span><strong>${state.values.comm || "—"}</strong></div>
      </div>
    `;

    el.querySelectorAll("[data-edit]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.step = Number(btn.dataset.edit);
        renderDrawer();
      });
    });
  }

  async function submitOrder() {
    const s = state.service;

    if (!state.values.contact_name?.trim()) {
      alert("Please enter your name."); state.step = 6; renderDrawer(); return;
    }
    if (!state.values.contact_email?.trim() || !/^\S+@\S+\.\S+$/.test(state.values.contact_email)) {
      alert("Please enter a valid email."); state.step = 6; renderDrawer(); return;
    }

    const btn = $("dr-submit");
    if (btn) { btn.textContent = "Submitting…"; btn.disabled = true; }

    /* Upload files */
    const fileUrls = [];
    for (const f of state.files) {
      try {
        if (window.JM_SUPABASE) {
          const ext = f.name.split(".").pop();
          const path = `order-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
          const { data, error } = await window.JM_SUPABASE
            .storage.from("request-files").upload(path, f, { upsert: false });
          if (!error) {
            const { data: pub } = window.JM_SUPABASE.storage.from("request-files").getPublicUrl(data.path);
            fileUrls.push(pub.publicUrl);
          }
        }
      } catch (err) { console.warn(err); }
    }

    const ref = "JM-" + Date.now().toString().slice(-6);
    const payload = {
      reference: ref,
      service_title: s.title,
      category: s.category,
      customer_name: state.values.contact_name || null,
      customer_email: state.values.contact_email || null,
      customer_phone: state.values.contact_phone || null,
      communication: state.values.comm || null,
      project_name: state.values.project_name || null,
      brand_name: state.values.brand_name || null,
      description: state.values.description || null,
      style: state.values.style || null,
      palette: state.values.palette || null,
      font: state.values.font || null,
      color: state.values.custom_color || null,
      budget: state.values.budget || null,
      timeline: state.values.deadline || null,
      notes: state.values.notes || null,
      file_urls: fileUrls,
      form_data: state.values,
      estimated_price: s.price
    };

    let saved = false;
    try {
      if (window.JM_SUPABASE) {
        const { error } = await window.JM_SUPABASE.from("service_requests").insert([payload]);
        if (!error) saved = true;
        else console.warn("Save error:", error);
      }
    } catch (err) { console.warn(err); }

    state.mode = "success";
    state.reference = ref;
    state.saved = saved;
    renderSuccess();
  }

  function renderSuccess() {
    const s = state.service;

    /* Build the full message */
    const summary = buildOrderMessage(s, state);

    /* WhatsApp — direct chat with your number */
    const waNumber = cleanPhone(SETTINGS.whatsapp_number || "256773486604");
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(summary)}`;

    /* Email */
    const emailTo = SETTINGS.email || "mandajoel12@gmail.com";
    const emailSubject = `JM Nexus Studios — New Order ${state.reference}`;
    const emailUrl = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(summary)}`;

    drawerBody.innerHTML = `
      <div class="dr-success">
        <div class="check">✓</div>
        <h3>Request Received!</h3>
        <span class="ref">Ref: ${state.reference}</span>
        <p>
          ${state.saved
            ? "Your order has been saved. Send it via WhatsApp or Email so we can start immediately."
            : "Almost done — send your order via WhatsApp or Email to confirm."}
        </p>

        <div class="dr-success-actions">
          <a class="wa" href="${waUrl}" target="_blank" rel="noopener">
            💬 Send on WhatsApp
          </a>
          <a class="email" href="${emailUrl}">
            ✉ Send by Email
          </a>
        </div>

        <button class="back" id="dr-back-services" style="margin-top:14px;">
          ← Back to Services
        </button>

        <p style="font-size:11.5px;color:#9AA7B8;margin-top:20px;line-height:1.6;">
          A copy has been saved to our system.<br>
          Ref: <strong style="color:#FFC857;">${state.reference}</strong>
        </p>
      </div>
    `;

    const back = $("dr-back-services");
    if (back) back.addEventListener("click", () => {
      closeDrawer();
      setTimeout(() => window.location.reload(), 200);
    });

    const foot = drawerEl.querySelector(".dr-foot");
    if (foot) foot.innerHTML = "";
  }

})();