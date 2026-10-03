/* =========================================================
   JM NEXUS STUDIOS — Home Page
   Blue + Yellow • Clean professional • Small compact cards
   ========================================================= */

const JM_DATA = {
  brand: {
    navLogo:  "assets/images/logo.png",
    heroImage: "assets/images/3d.png",
    heroVideo: "",            /* set to a .mp4 URL to enable video */
    heroVideoPoster: "assets/images/hero/jm-nexus-logo.webp",
    showreel: "assets/videos/jm-nexus-showreel.mp4",
    poster:   "assets/images/hero/showreel-poster.webp"
  },

  nav: [
    { label: "Home",      href: "index.html",     active: true },
    { label: "About Us",  href: "about.html" },
    { label: "Services",  href: "services.html" },
    { label: "Portfolio", href: "portfolio.html" },
    { label: "Contact",   href: "contact.html" }
  ],

  hero: {
    pill: "Creative. Innovative. Impactful.",
    titleLines: ["We Create.", "We Build.", "We "],
    gradientWord: "Inspire.",
    desc: "JM Nexus Studios is a creative digital studio delivering stunning designs, 3D visuals, videos, branding and technology solutions that bring your ideas to life.",
    primaryBtn:   { label: "Explore Our Work", href: "portfolio.html" },
    secondaryBtn: { label: "View Services",    href: "services.html" }
  },

  orbit: [
    { icon: "Ps", tone: "blue",   tip: "Photoshop",       href: "services.html", angle: 200, radius: 0.92 },
    { icon: "Ae", tone: "orange", tip: "After Effects",   href: "services.html", angle: 340, radius: 0.88 },
    { icon: "Ai", tone: "yellow", tip: "Illustrator",     href: "services.html", angle: 25,  radius: 0.96 },
    { icon: "3D", tone: "blue",   tip: "Blender",         href: "services.html", angle: 250, radius: 0.75 },
    { icon: "▶",  tone: "cyan",   tip: "Video Editing",   href: "services.html", angle: 150, radius: 0.98 },
    { icon: "</>",tone: "yellow", tip: "Web Development", href: "services.html", angle: 355, radius: 0.75 },
    { icon: "✧",  tone: "cyan",   tip: "Motion Graphics", href: "services.html", angle: 285, radius: 0.90 }
  ],

  features: [
    { icon: "⚡", title: "Creative Team",  sub: "Talented & Passionate",     tone: "blue" },
    { icon: "◆", title: "High Quality",    sub: "Premium Results",           tone: "yellow" },
    { icon: "⏱", title: "Fast Delivery",   sub: "On Time, Every Time",       tone: "cyan" },
    { icon: "⛨", title: "Client Focused",  sub: "Your Vision, Our Priority", tone: "orange" },
    { icon: "🎧", title: "24/7 Support",   sub: "We're Always Here",         tone: "green" }
  ],

  footer: {
    contact: {
      phone: "+256 773 486 604",
      email: "info@jmnexusstudios.com",
      address: "Jinja, Uganda"
    }
  }
};

/* ---------- Helpers ---------- */
function isImagePath(str) {
  return typeof str === "string" && /\.(png|jpe?g|gif|svg|webp|avif)$/i.test(str.trim());
}
function isVideoPath(str) {
  return typeof str === "string" && /\.(mp4|webm|ogg|mov|m4v)$/i.test(str.trim());
}
function renderIcon(icon) {
  return isImagePath(icon) ? `<img src="${icon}" alt="" />` : (icon || "");
}
function $(id) { return document.getElementById(id); }

/* =========================================================
   BOOT
   ========================================================= */
(async function () {
  const D = JM_DATA;

  /* ---------- NAV ---------- */
  const navLinks = $("nav-links");
  if (navLinks) {
    navLinks.innerHTML = D.nav.map(n =>
      `<a href="${n.href}" class="${n.active ? "active" : ""}">${n.label}</a>`
    ).join("");
  }
  const mobileNav = $("mobile-nav");
  if (mobileNav) {
    mobileNav.innerHTML = D.nav.map(n =>
      `<a href="${n.href}" class="${n.active ? "active" : ""}">${n.label}</a>`
    ).join("");
  }
  document.querySelectorAll(".nav-logo img").forEach(img => img.src = D.brand.navLogo);

  /* ---------- MOBILE MENU ---------- */
  const mobileMenu = $("mobile-menu");
  const mobileBackdrop = $("mobile-backdrop");
  const navToggle = $("nav-toggle");
  const mobileClose = $("mobile-close");

  function openMenu() {
    if (!mobileMenu || !mobileBackdrop) return;
    mobileMenu.classList.add("open");
    mobileMenu.setAttribute("aria-hidden", "false");
    mobileBackdrop.hidden = false;
    document.body.style.overflow = "hidden";
    if (navToggle) navToggle.setAttribute("aria-expanded", "true");
  }
  function closeMenu() {
    if (!mobileMenu || !mobileBackdrop) return;
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    mobileBackdrop.hidden = true;
    document.body.style.overflow = "";
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle) navToggle.addEventListener("click", openMenu);
  if (mobileClose) mobileClose.addEventListener("click", closeMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener("click", closeMenu);
  if (mobileNav) {
    mobileNav.addEventListener("click", e => {
      if (e.target.closest("a")) closeMenu();
    });
  }
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("open")) closeMenu();
  });

  /* ---------- HERO TEXT ---------- */
  const pillText = $("hero-pill-text");
  if (pillText) pillText.textContent = D.hero.pill;

  const heroTitle = $("hero-title");
  if (heroTitle) {
    heroTitle.innerHTML = D.hero.titleLines.join("<br>") +
      `<span class="grad">${D.hero.gradientWord}</span>`;
  }

  const heroDesc = $("hero-desc");
  if (heroDesc) heroDesc.textContent = D.hero.desc;

  const hp = $("hero-primary");
  if (hp) { hp.innerHTML = `${D.hero.primaryBtn.label} →`; hp.href = D.hero.primaryBtn.href; }

  const hs = $("hero-secondary");
  if (hs) { hs.innerHTML = `${D.hero.secondaryBtn.label} ▦`; hs.href = D.hero.secondaryBtn.href; }

  /* ---------- HERO MEDIA ---------- */
  const heroMedia = $("hero-media");
  if (heroMedia) {
    const hasVideo = isVideoPath(D.brand.heroVideo);
    const hasImage = isImagePath(D.brand.heroImage);

    if (hasVideo) {
      heroMedia.innerHTML = `
        <video autoplay muted loop playsinline preload="metadata"
               ${hasImage ? `poster="${D.brand.heroVideoPoster || D.brand.heroImage}"` : ""}>
          <source src="${D.brand.heroVideo}" type="video/mp4" />
        </video>`;
      const v = heroMedia.querySelector("video");
      if (v) v.play().catch(() => {
        if (hasImage) heroMedia.innerHTML = `<img src="${D.brand.heroImage}" alt="JM Nexus Studios" />`;
      });
    } else if (hasImage) {
      heroMedia.innerHTML = `<img src="${D.brand.heroImage}" alt="JM Nexus Studios" />`;
    }
  }

  /* ---------- ORBIT ---------- */
  const orbit = $("hero-orbit");
  if (orbit) {
    orbit.innerHTML = "";
    ["r-a", "r-b", "r-c"].forEach(cls => {
      const ring = document.createElement("span");
      ring.className = "hero-ring " + cls;
      orbit.appendChild(ring);
    });

    const vw = window.innerWidth;
    const baseRadius = vw < 480 ? 125 : vw < 640 ? 145 : vw < 992 ? 175 : 210;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const icons = [];

    D.orbit.forEach((o, i) => {
      const el = document.createElement("a");
      el.className = "orbit-icon";
      el.href = o.href;
      el.dataset.tone = o.tone;
      el.innerHTML = `${renderIcon(o.icon)}<span class="tip">${o.tip}</span>`;
      el.addEventListener("mouseenter", () => el.dataset.paused = "1");
      el.addEventListener("mouseleave", () => delete el.dataset.paused);
      el.addEventListener("touchstart", () => el.dataset.paused = "1", { passive: true });
      el.addEventListener("touchend", () => setTimeout(() => delete el.dataset.paused, 1200), { passive: true });

      orbit.appendChild(el);
      icons.push({ el, angle: o.angle, radius: o.radius, speed: 0.035 + i * 0.006 });
    });

    function tick() {
      icons.forEach(ic => {
        if (!ic.el.dataset.paused) ic.angle += ic.speed;
        const r = (ic.angle * Math.PI) / 180;
        const x = Math.cos(r) * baseRadius * ic.radius;
        const y = Math.sin(r) * baseRadius * ic.radius;
        ic.el.style.transform = `translate(${x}px, ${y}px)`;
      });
      requestAnimationFrame(tick);
    }
    if (!reduce) requestAnimationFrame(tick);
  }

  /* ---------- FEATURES STRIP ---------- */
  const featureStrip = $("feature-strip");
  if (featureStrip) {
    featureStrip.innerHTML = D.features.map(f => `
      <div class="feat-item" data-tone="${f.tone}">
        <span class="feat-icon">${renderIcon(f.icon)}</span>
        <span class="feat-body">
          <strong>${f.title}</strong>
          <em>${f.sub}</em>
        </span>
      </div>
    `).join("");
  }

  /* ---------- FOOTER ---------- */
  const footerNav = $("footer-nav");
  if (footerNav) footerNav.innerHTML = D.nav.map(n => `<a href="${n.href}">${n.label}</a>`).join("");

  const footerContact = $("footer-contact");
  if (footerContact) {
    footerContact.innerHTML = `
      <p>☎ ${D.footer.contact.phone}</p>
      <p>✉ ${D.footer.contact.email}</p>
      <p>◉ ${D.footer.contact.address}</p>`;
  }

  const yearEl = $("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- SHOWREEL ---------- */
  const modal = $("video-modal");
  const video = $("showreel-video");
  if (video) { video.src = D.brand.showreel; video.poster = D.brand.poster; }

  const showreelBtn = $("watch-showreel");
  if (showreelBtn && modal && video) {
    showreelBtn.addEventListener("click", () => {
      modal.classList.add("open");
      video.currentTime = 0;
      video.play().catch(() => {});
    });
    const closeModal = () => { modal.classList.remove("open"); video.pause(); };
    const vc = $("video-close");
    if (vc) vc.addEventListener("click", closeModal);
    modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    });
  }

  /* ---------- REVEAL + COUNTERS ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        if (en.target.id === "stats") runCounters();
      }
    });
  }, { threshold: 0.20 });
  document.querySelectorAll(".reveal, #stats").forEach(el => io.observe(el));

  let counted = false;
  function runCounters() {
    if (counted) return;
    counted = true;
    document.querySelectorAll(".stat .accent").forEach(el => {
      const target = Number(el.dataset.target);
      const suffix = el.dataset.suffix || "";
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 45));
      const t = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(t); }
        el.textContent = cur + suffix;
      }, 24);
    });
  }

  /* =========================================================
     SUPABASE DATA
     ========================================================= */
  const fallbackServices = [
    { title: "Graphic Design",           desc: "Logos, Flyers, Posters",           icon: "▣", icon_tone: "purple", category: "Design",         price: 30000, image: "" },
    { title: "3D Modeling & Rendering",  desc: "Product, Character, Environment",  icon: "⬢", icon_tone: "blue",   category: "3D & CGI",       price: 80000, image: "" },
    { title: "Video Editing",            desc: "Cinematic & Social Videos",        icon: "▶", icon_tone: "orange", category: "Video",          price: 25000, image: "" },
    { title: "Motion Graphics",          desc: "Animated Visuals & Effects",       icon: "✧", icon_tone: "cyan",   category: "Motion",         price: 50000, image: "" }
  ];

  let SERVICES = [];
  let STATS = [];
  let PROJECTS = [];

  try {
    if (window.JM_SUPABASE) {
      const svcRes = await window.JM_SUPABASE
        .from("services")
        .select("id, title, description, price, thumbnail_url, icon, icon_tone, categories(name), sort_order")
        .eq("active", true)
        .order("sort_order", { ascending: true });
      if (!svcRes.error && svcRes.data?.length) {
        SERVICES = svcRes.data.map(r => ({
          title: r.title,
          desc: r.description || "",
          price: r.price || 0,
          image: r.thumbnail_url || "",
          icon: r.icon || "◈",
          icon_tone: r.icon_tone || "blue",
          category: r.categories?.name || "Service"
        }));
      }

      const stRes = await window.JM_SUPABASE
        .from("stats")
        .select("*")
        .order("sort_order", { ascending: true });
      if (!stRes.error && stRes.data?.length) STATS = stRes.data;

      const pjRes = await window.JM_SUPABASE
        .from("projects")
        .select("*")
        .eq("active", true)
        .order("sort_order", { ascending: true });
      if (!pjRes.error && pjRes.data?.length) PROJECTS = pjRes.data;
    }
  } catch (err) {
    console.warn("Supabase fetch failed:", err);
  }

  if (!SERVICES.length) SERVICES = fallbackServices;
  if (!STATS.length) STATS = [
    { icon: "🏆", num: 100, suffix: "+",  label: "Projects Completed" },
    { icon: "😊", num: 50,  suffix: "+",  label: "Happy Clients" },
    { icon: "💼", num: 10,  suffix: "+",  label: "Industries Served" },
    { icon: "👁", num: 1,   suffix: "M+", label: "Views Generated" },
    { icon: "★",  num: 5,   suffix: "★",  label: "Client Rating" }
  ];
  if (!PROJECTS.length) PROJECTS = [
    { title: "Brand Identity Design",  category: "Branding",       image_url: "", href: "portfolio.html" },
    { title: "3D Character Animation", category: "3D & CGI",       image_url: "", href: "portfolio.html" },
    { title: "Motion Graphics Video",  category: "Video & Motion", image_url: "", href: "portfolio.html" },
    { title: "Website Design",         category: "Web & UI",       image_url: "", href: "portfolio.html" }
  ];

  /* ---------- HERO SERVICES (right card) ---------- */
  const svcList = $("hero-services-list");
  if (svcList) {
    svcList.innerHTML = SERVICES.slice(0, 6).map(s => `
      <a class="service-row" href="services.html">
        <span class="s-icon ${s.icon_tone}">${renderIcon(s.icon)}</span>
        <span class="s-body">
          <span class="s-title">${s.title}</span>
          <span class="s-desc">${s.desc}</span>
        </span>
        <span class="s-arrow">›</span>
      </a>
    `).join("");
  }

  /* ---------- STATS ---------- */
  const statsGrid = $("stats-grid");
  if (statsGrid) {
    statsGrid.innerHTML = STATS.map(s => `
      <div class="stat">
        <span class="ic">${renderIcon(s.icon)}</span>
        <div>
          <span class="num"><span class="accent" data-target="${s.num}" data-suffix="${s.suffix || ""}">0${s.suffix || ""}</span></span>
          <span class="lbl">${s.label}</span>
        </div>
      </div>
    `).join("");
    document.querySelectorAll("#stats").forEach(el => io.observe(el));
  }

  /* ---------- FOOTER SERVICES ---------- */
  const footerServices = $("footer-services");
  if (footerServices) {
    footerServices.innerHTML = SERVICES.slice(0, 6)
      .map(s => `<a href="services.html">${s.title}</a>`).join("");
  }

  /* =========================================================
     FEATURED SERVICES — 4 small cards
     ========================================================= */
  const servicesGrid = $("services-grid");
  if (servicesGrid) {
    const featured = SERVICES.slice(0, 4);
    servicesGrid.innerHTML = featured.map(s => `
      <a class="service-card" href="services.html">
        <div class="sc-thumb">
          ${s.image
            ? `<img src="${s.image}" alt="${s.title}" loading="lazy" />`
            : `<div style="width:100%;height:100%;background:linear-gradient(135deg,#0A1020,#1A0838);display:grid;place-items:center;font-size:40px;color:#FFD43B;">${renderIcon(s.icon)}</div>`}
        </div>
        <div class="sc-body">
          <h4>${s.title}</h4>
          <p>${s.desc}</p>
          <div class="sc-foot">
            <span class="sc-price">From UGX ${Number(s.price || 0).toLocaleString()}</span>
            <span class="sc-btn">View →</span>
          </div>
        </div>
      </a>
    `).join("");
  }

  /* =========================================================
     FEATURED WORK — 4 small image-only cards
     ========================================================= */
  const grid = $("portfolio-grid");
  if (grid) {
    const items = PROJECTS.slice(0, 4);
    grid.innerHTML = items.map(p => {
      const img = p.thumbnail || p.image_url || p.hero_image || "";
      const link = p.href || "portfolio.html";
      return `
        <a class="work-card" href="${link}">
          <div class="thumb">
            ${img
              ? `<img src="${img}" alt="${p.title}" loading="lazy" />`
              : `<div style="width:100%;height:100%;background:linear-gradient(135deg,#0A1020,#1A0838);"></div>`}
          </div>
          <div class="meta">
            <h4>${p.title}</h4>
          </div>
          <span class="go">→</span>
        </a>
      `;
    }).join("");
  }

})();