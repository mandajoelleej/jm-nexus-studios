/* =========================================================
   JM NEXUS STUDIOS — About Page
   Supabase-driven • Clickable orbiting software icons
   ========================================================= */

const LOGO_URL = "assets/images/log.png";
const LOGO_FALLBACK = "assets/images/logo.png";

const FALLBACK_SETTINGS = {
  whatsapp_number: "+256 773 486 604",
  whatsapp_link: "https://wa.me/256773486604",
  email: "mandajoel12@gmail.com"
};

const NAV = [
  { label: "Home",      href: "index.html" },
  { label: "About Us",  href: "about.html", active: true },
  { label: "Services",  href: "services.html" },
  { label: "Portfolio", href: "portfolio.html" },
  { label: "Contact",   href: "contact.html" }
];

/* =========================================================
   FALLBACK content (used if Supabase is empty)
   ========================================================= */
const FALLBACK = {
  pill: "Who We Are",
  titleBefore: "About",
  titleGrad: "JM Nexus Studios",
  tagline: [
    { text: "Creativity.", cls: "accent-1" },
    { text: " Technology.", cls: "accent-2" },
    { text: " Purpose.", cls: "" }
  ],
  desc: "JM Nexus Studios is a creative digital studio passionate about turning ideas into stunning visual experiences and smart digital solutions. We blend creativity, technology, and strategy to help brands and individuals stand out in a digital world full of noise.",
  primaryBtn: { label: "Let's Work Together", href: "contact.html" },
  founder: {
    photo: "assets/images/r4.jpeg",
    name: "Joel Manda",
    role: "Founder & Creative Director",
    tags: "Design · Build · Grow",
    quote: "My mission is simple: to use creativity and technology to solve problems, tell stories, and inspire change.",
    sign: "Joel Manda",
    socials: [
      { icon: "YT", href: "https://youtube.com/@jmnexusstudios", title: "YouTube" },
      { icon: "IG", href: "https://instagram.com/jmnexusstudios", title: "Instagram" },
      { icon: "TT", href: "https://tiktok.com/@jmnexusstudios", title: "TikTok" },
      { icon: "in", href: "https://linkedin.com/company/jmnexusstudios", title: "LinkedIn" }
    ]
  },
  stats: [
    { icon: "🏆", num: 100, suffix: "+", label: "Projects Completed" },
    { icon: "😊", num: 50, suffix: "+", label: "Happy Clients" },
    { icon: "💼", num: 10, suffix: "+", label: "Industries Served" },
    { icon: "👁", num: 1, suffix: "M+", label: "Views Generated" },
    { icon: "★", num: 5, suffix: "+", label: "Years Experience" }
  ],
  timeline: [
    { year: "2019 — The Beginning", icon: "🚀", tone: "blue", text: "Started as a passion project creating designs for local brands and friends." },
    { year: "2021 — Growing", icon: "</>", tone: "blue", text: "Expanded into video editing, 3D and VFX, serving clients across different industries." },
    { year: "2024 — The Mission", icon: "★", tone: "gold", text: "Built JM Nexus Studios to empower brands with world-class creativity and tech solutions." }
  ],
  values: [
    { icon: "💡", tone: "blue", title: "Creativity", text: "We think different to create unique solutions." },
    { icon: "🚀", tone: "gold", title: "Innovation", text: "We embrace new ideas and technologies." },
    { icon: "💎", tone: "blue", title: "Excellence", text: "We deliver high-quality work every time." },
    { icon: "👥", tone: "gold", title: "Collaboration", text: "We work closely with our clients." },
    { icon: "🎯", tone: "blue", title: "Purpose", text: "We use our skills to make a positive impact." },
    { icon: "🛡", tone: "gold", title: "Integrity", text: "We value honesty, respect and trust." }
  ],
  drives: {
    quote: "We believe design is more than just visuals — it's a way to communicate, connect, and create lasting impact.",
    image: "assets/images/story/desk-setup.webp",
    caption: "Dream · Design · Deliver"
  },
  cta: {
    title: "Ready to start a project together?",
    sub: "Let's bring your ideas to life with creativity and technology.",
    btn: "Let's Talk",
    href: "contact.html"
  },
  statusRing: {
    text: "✦ JM NEXUS STUDIOS ✦ CREATIVE ✦ 3D ✦ VFX ✦ WEB ✦ INNOVATION ",
    spinSeconds: 24
  },
  /* Default fallback orbit icons */
  orbit: [
    { icon: "Ps",  tone: "blue",   tip: "Photoshop",      href: "services.html" },
    { icon: "Ai",  tone: "gold",   tip: "Illustrator",    href: "services.html" },
    { icon: "Ae",  tone: "violet", tip: "After Effects",  href: "services.html" },
    { icon: "Pr",  tone: "pink",   tip: "Premiere Pro",   href: "services.html" },
    { icon: "Bl",  tone: "orange", tip: "Blender",        href: "services.html" },
    { icon: "Fi",  tone: "cyan",   tip: "Figma",          href: "services.html" },
    { icon: "</>", tone: "green",  tip: "VS Code",        href: "services.html" }
  ]
};

/* ---------- Helpers ---------- */
function $(id) { return document.getElementById(id); }
function isImage(str) {
  return typeof str === "string" && /\.(png|jpe?g|gif|svg|webp|avif)$/i.test(str.trim());
}
function renderIcon(icon) {
  return isImage(icon) ? `<img src="${icon}" alt="" />` : (icon || "");
}

/* Tone → color mapping for orbit icons */
function toneColor(tone) {
  const map = {
    cyan:    "#00D9FF",
    blue:    "#6BB8FF",
    gold:    "#FFC857",
    yellow:  "#FFC857",
    green:   "#22C55E",
    pink:    "#FF89B8",
    violet:  "#B794FF",
    purple:  "#B794FF",
    orange:  "#FF8A3D",
    magenta: "#FF6B9E"
  };
  return map[tone] || "#00D9FF";
}

/* Tone → glow mapping */
function toneGlow(tone) {
  const c = toneColor(tone);
  return hexToRgba(c, 0.35);
}
function hexToRgba(hex, alpha) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
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
   ORBIT ICONS (from Supabase software table)
   ========================================================= */
let ORBIT_ICONS = [];
let ORBIT_ANGLES = [];
let orbitRAF = null;

function buildOrbitIcons(softwareList) {
  const orbitEl = $("about-orbit");
  if (!orbitEl) return;

  /* Clear everything */
  orbitEl.innerHTML = "";

  /* Add decorative rings */
  ["r-a", "r-b", "r-c"].forEach(cls => {
    const ring = document.createElement("span");
    ring.className = "hero-ring " + cls;
    orbitEl.appendChild(ring);
  });

  /* Add software icons */
  const vw = window.innerWidth;
  const baseRadius = vw < 480 ? 130 : vw < 640 ? 150 : vw < 992 ? 180 : 215;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  ORBIT_ICONS = [];
  ORBIT_ANGLES = [];

  softwareList.forEach((sw, i) => {
    const tone = sw.accent_color || "#00D9FF";
    const el = document.createElement("button");
    el.type = "button";
    el.className = "orbit-icon";
    el.style.setProperty("--oi-accent", tone);
    el.style.setProperty("--oi-glow", hexToRgba(tone, 0.35));

    el.innerHTML = `
      ${sw.image_url ? `<img src="${sw.image_url}" alt="${sw.name}" />` : (sw.icon || sw.name.charAt(0))}
      <span class="tip">${sw.name}</span>
    `;

    /* Spread icons evenly around the circle */
    const startAngle = (i / softwareList.length) * 360 + 30;

    /* Random-ish radius for depth */
    const radius = 0.75 + ((i % 3) * 0.12);

    el.dataset.paused = "";
    el.addEventListener("mouseenter", () => el.dataset.paused = "1");
    el.addEventListener("mouseleave", () => delete el.dataset.paused);

    /* Click → open software popover */
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      openSoftwarePopover(sw);
    });

    orbitEl.appendChild(el);

    ORBIT_ICONS.push({ el, radius });
    ORBIT_ANGLES.push(startAngle);
  });

  /* Animation loop */
  if (orbitRAF) cancelAnimationFrame(orbitRAF);
  if (!reduce && ORBIT_ICONS.length) {
    const speeds = ORBIT_ICONS.map((_, i) => 0.035 + i * 0.006);
    function tick() {
      ORBIT_ICONS.forEach((ic, i) => {
        if (!ic.el.dataset.paused) ORBIT_ANGLES[i] += speeds[i];
        const r = (ORBIT_ANGLES[i] * Math.PI) / 180;
        const x = Math.cos(r) * baseRadius * ic.radius;
        const y = Math.sin(r) * baseRadius * ic.radius;
        ic.el.style.transform = `translate(${x}px, ${y}px)`;
      });
      orbitRAF = requestAnimationFrame(tick);
    }
    orbitRAF = requestAnimationFrame(tick);
  } else {
    /* Static layout if reduced motion */
    ORBIT_ICONS.forEach((ic, i) => {
      const r = (ORBIT_ANGLES[i] * Math.PI) / 180;
      const x = Math.cos(r) * baseRadius * ic.radius;
      const y = Math.sin(r) * baseRadius * ic.radius;
      ic.el.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
}

/* =========================================================
   SOFTWARE POPOVER
   ========================================================= */
function openSoftwarePopover(sw) {
  const popover = $("software-popover");
  if (!popover) return;

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

  popover.hidden = false;
}

function wirePopoverClose() {
  const popover = $("software-popover");
  const close = $("software-close");
  if (close) close.addEventListener("click", () => popover.hidden = true);
  if (popover) popover.addEventListener("click", e => {
    if (e.target === popover) popover.hidden = true;
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && popover && !popover.hidden) popover.hidden = true;
  });
}

/* =========================================================
   BOOT
   ========================================================= */
(async function () {
  let SETTINGS = { ...FALLBACK_SETTINGS };
  let SOFTWARE = [];

  try {
    if (window.JM_SUPABASE) {
      const [set, sw] = await Promise.all([
        window.JM_SUPABASE.from("site_settings").select("*"),
        window.JM_SUPABASE.from("software").select("*").eq("active", true).order("sort_order")
      ]);
      if (!set.error && set.data) set.data.forEach(r => { SETTINGS[r.key] = r.value; });
      if (!sw.error && sw.data?.length) SOFTWARE = sw.data;
    }
  } catch (err) { console.warn("Supabase load failed:", err); }

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

  /* ---------- HERO TEXT ---------- */
  const pill = $("about-pill");
  if (pill) pill.textContent = FALLBACK.pill;

  const title = $("about-title");
  if (title) {
    title.innerHTML = `${FALLBACK.titleBefore} <br><span class="grad">${FALLBACK.titleGrad}</span>`;
  }

  const tagline = $("about-tagline");
  if (tagline) {
    tagline.innerHTML = FALLBACK.tagline.map(t =>
      `<span class="${t.cls}">${t.text}</span>`).join("");
  }

  const desc = $("about-desc");
  if (desc) desc.textContent = FALLBACK.desc;

  const primary = $("about-primary");
  if (primary) {
    primary.innerHTML = `${FALLBACK.primaryBtn.label} →`;
    primary.href = FALLBACK.primaryBtn.href;
  }

  /* Hero logo */
  const heroLogo = $("about-logo");
  if (heroLogo) {
    heroLogo.src = LOGO_URL;
    heroLogo.onerror = () => { heroLogo.style.opacity = ".3"; };
  }

  /* ---------- ORBIT ICONS ---------- */
  /* Use software from Supabase, fallback to defaults */
  const iconsToShow = SOFTWARE.length ? SOFTWARE : FALLBACK.orbit;
  buildOrbitIcons(iconsToShow);

  /* Rebuild on window resize */
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      buildOrbitIcons(SOFTWARE.length ? SOFTWARE : FALLBACK.orbit);
    }, 300);
  });

  /* Wire popover close */
  wirePopoverClose();

  /* ---------- FOUNDER ---------- */
  const founder = FALLBACK.founder;
  const fp = $("founder-photo");
  if (fp) fp.src = founder.photo;
  const fn = $("founder-name");
  if (fn) fn.textContent = founder.name;
  const fr = $("founder-role");
  if (fr) fr.textContent = founder.role;
  const ft = $("founder-tags");
  if (ft) ft.textContent = founder.tags;
  const fq = $("founder-quote");
  if (fq) fq.textContent = founder.quote;
  const fs = $("founder-sign");
  if (fs) fs.textContent = founder.sign;

  const fsoc = $("founder-socials");
  if (fsoc) {
    fsoc.innerHTML = founder.socials.map(s =>
      `<a href="${s.href}" target="_blank" rel="noopener" title="${s.title}">${renderIcon(s.icon)}</a>`
    ).join("");
  }

  /* ---------- STATS ---------- */
  const statsGrid = $("stats-grid");
  if (statsGrid) {
    statsGrid.innerHTML = FALLBACK.stats.map(s => `
      <div class="stat">
        <span class="ic">${renderIcon(s.icon)}</span>
        <div>
          <span class="num"><span class="accent" data-target="${s.num}" data-suffix="${s.suffix || ""}">0${s.suffix || ""}</span></span>
          <span class="lbl">${s.label}</span>
        </div>
      </div>
    `).join("");
  }

  /* ---------- TIMELINE ---------- */
  const timeline = $("timeline");
  if (timeline) {
    timeline.innerHTML = FALLBACK.timeline.map(t => `
      <li>
        <span class="t-icon ${t.tone === "gold" ? "gold" : ""}">${renderIcon(t.icon)}</span>
        <div class="t-body">
          <h4>${t.year}</h4>
          <p>${t.text}</p>
        </div>
      </li>
    `).join("");
  }

  /* ---------- VALUES ---------- */
  const valuesGrid = $("values-grid");
  if (valuesGrid) {
    valuesGrid.innerHTML = FALLBACK.values.map(v => `
      <div class="value-item">
        <span class="v-icon ${v.tone === "gold" ? "gold" : ""}">${renderIcon(v.icon)}</span>
        <div>
          <h5>${v.title}</h5>
          <p>${v.text}</p>
        </div>
      </div>
    `).join("");
  }

  /* ---------- DRIVES ---------- */
  const drivesQuote = $("drives-quote");
  if (drivesQuote) drivesQuote.textContent = FALLBACK.drives.quote;
  const drivesImg = $("drives-image");
  if (drivesImg) {
    drivesImg.src = FALLBACK.drives.image;
    drivesImg.onerror = () => {
      drivesImg.style.display = "none";
      const parent = drivesImg.parentElement;
      if (parent) parent.style.background = "linear-gradient(135deg,#0D1422,#1A0838)";
    };
  }

  /* ---------- STATUS RING ---------- */
  const ringText = $("ring-text");
  if (ringText) ringText.textContent = FALLBACK.statusRing.text;
  const statusRing = $("status-ring");
  if (statusRing) {
    statusRing.style.animationDuration = FALLBACK.statusRing.spinSeconds + "s";
  }

  /* ---------- CTA ---------- */
  const ctaTitle = $("cta-title");
  if (ctaTitle) ctaTitle.innerHTML = FALLBACK.cta.title;
  const ctaBtn = $("cta-btn");
  if (ctaBtn) {
    ctaBtn.innerHTML = `${FALLBACK.cta.btn} →`;
    ctaBtn.href = FALLBACK.cta.href;
  }

  /* ---------- FOOTER ---------- */
  const fNav = $("footer-nav");
  if (fNav) fNav.innerHTML = NAV.map(n => `<a href="${n.href}">${n.label}</a>`).join("");

  const fSvc = $("footer-services");
  if (fSvc) {
    const svcLinks = [
      "Graphic Design", "3D & CGI", "Video Editing",
      "VFX & Effects", "Web & Apps", "Branding"
    ];
    fSvc.innerHTML = svcLinks.map(s => `<a href="services.html">${s}</a>`).join("");
  }

  const fContact = $("footer-contact");
  if (fContact) {
    fContact.innerHTML = `
      <p>☎ ${SETTINGS.whatsapp_number || ""}</p>
      <p>✉ ${SETTINGS.email || ""}</p>
      <p>◉ Jinja, Uganda</p>`;
  }

  const yearEl = $("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- VIDEO MODAL ---------- */
  const modal = $("video-modal");
  const video = $("story-video");
  const watchBtn = $("watch-story");
  const videoClose = $("video-close");

  if (video) {
    video.poster = "assets/images/hero/showreel-poster.webp";
  }

  if (watchBtn && modal && video) {
    watchBtn.addEventListener("click", () => {
      modal.hidden = false;
      if (!video.src) {
        console.warn("No story video configured");
        return;
      }
      video.currentTime = 0;
      video.play().catch(() => {});
    });
  }
  function closeModal() {
    if (!modal || !video) return;
    modal.hidden = true;
    video.pause();
  }
  if (videoClose) videoClose.addEventListener("click", closeModal);
  if (modal) modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal && !modal.hidden) closeModal();
  });

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

})();