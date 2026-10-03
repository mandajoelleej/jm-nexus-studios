/* =========================================================
   JM NEXUS STUDIOS — Portfolio Page
   Data-driven • Supabase • Video + Download + Share
   ========================================================= */

const JM_PORTFOLIO = {
  brand: {
    navLogo: "assets/images/hero/jm-nexus-logo.webp",
    heroImage: "assets/images/portfolio/hero-studio.webp",
    ctaImage: "assets/images/portfolio/vr-character.webp"
  },

  nav: [
    { label: "Home",      href: "index.html" },
    { label: "About Us",  href: "about.html" },
    { label: "Services",  href: "services.html" },
    { label: "Portfolio", href: "portfolio.html", active: true },
    { label: "Contact",   href: "contact.html" }
  ],

  hero: {
    pill: "Our Portfolio",
    titleLines: ["Ideas We've", "Turned Into "],
    gradientWord: "Reality.",
    desc: "Explore a selection of our creative, design, 3D, video, VFX, web, branding and technology projects. Each project tells a story of creativity, innovation and impact.",
    stats: [
      { icon: "📁", num: 50, suffix: "+", label: "Projects Completed", tone: "gold" },
      { icon: "😊", num: 10, suffix: "+", label: "Happy Clients",      tone: "cyan" },
      { icon: "⏱", num: 5,  suffix: "+", label: "Years of Experience", tone: "pink" }
    ],
    floats: [
      { icon: "Ps", tone: "cyan",    x: "8%",  y: "15%" },
      { icon: "Ae", tone: "violet",  x: "85%", y: "10%" },
      { icon: "Pr", tone: "magenta", x: "90%", y: "50%" },
      { icon: "</>",tone: "yellow",  x: "78%", y: "82%" },
      { icon: "3D", tone: "orange",  x: "10%", y: "78%" }
    ]
  },

  filters: [
    { id: "All",            ico: "✦" },
    { id: "Graphic Design", ico: "▣" },
    { id: "Branding",       ico: "◆" },
    { id: "3D & CGI",       ico: "⬢" },
    { id: "Video",          ico: "▶" },
    { id: "VFX",            ico: "✧" },
    { id: "Web",            ico: "</>" },
    { id: "Technology",     ico: "⚙" }
  ],

  ctaShortcuts: [
    { icon: "✦", label: "Creative Design", tone: "yellow" },
    { icon: "⬢", label: "3D & Animation",  tone: "violet" },
    { icon: "▶", label: "Video Production", tone: "magenta" },
    { icon: "</>", label: "Web & Tech",      tone: "cyan" }
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
function $(id) { return document.getElementById(id); }
function isImage(str) {
  return typeof str === "string" && /\.(png|jpe?g|gif|svg|webp|avif)$/i.test(str.trim());
}
function isVideo(str) {
  return typeof str === "string" && /\.(mp4|webm|mov|m4v|ogg)$/i.test(str.trim());
}
function renderIcon(icon) {
  return isImage(icon) ? `<img src="${icon}" alt="" />` : (icon || "");
}
function toneForCategory(cat) {
  const map = {
    "Graphic Design":  "yellow",
    "3D & CGI":        "violet",
    "3D":              "violet",
    "Branding":        "green",
    "Video":           "orange",
    "Video & Motion":  "orange",
    "VFX":             "blue",
    "VFX & Effects":   "blue",
    "Web":             "cyan",
    "Web & UI":        "cyan",
    "Technology":      "green",
    "Robotics & Tech": "green"
  };
  return map[cat] || "cyan";
}
function slugify(str) {
  return String(str || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/* =========================================================
   BOOT
   ========================================================= */
(async function () {
  const P = JM_PORTFOLIO;

  /* ---------- NAV ---------- */
  const navLinks = $("nav-links");
  if (navLinks) {
    navLinks.innerHTML = P.nav.map(n =>
      `<a href="${n.href}" class="${n.active ? "active" : ""}">${n.label}</a>`
    ).join("");
  }
  const mobileNav = $("mobile-nav");
  if (mobileNav) {
    mobileNav.innerHTML = P.nav.map(n =>
      `<a href="${n.href}" class="${n.active ? "active" : ""}">${n.label}</a>`
    ).join("");
  }
  document.querySelectorAll(".nav-logo img").forEach(img => img.src = P.brand.navLogo);

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
  }
  function closeMenu() {
    if (!mobileMenu || !mobileBackdrop) return;
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    mobileBackdrop.hidden = true;
    document.body.style.overflow = "";
  }

  if (navToggle) navToggle.addEventListener("click", openMenu);
  if (mobileClose) mobileClose.addEventListener("click", closeMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener("click", closeMenu);
  if (mobileNav) mobileNav.addEventListener("click", e => {
    if (e.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("open")) closeMenu();
  });

  /* ---------- HERO ---------- */
  const heroTitle = $("hero-title");
  if (heroTitle) {
    heroTitle.innerHTML =
      P.hero.titleLines.join("<br>") +
      `<span class="grad">${P.hero.gradientWord}</span>`;
  }

  const heroDesc = $("hero-desc");
  if (heroDesc) heroDesc.textContent = P.hero.desc;

  const heroStats = $("hero-stats");
  if (heroStats) {
    heroStats.innerHTML = P.hero.stats.map(s => `
      <div class="stat-item" data-tone="${s.tone}">
        <span class="ic">${renderIcon(s.icon)}</span>
        <div>
          <div class="num">${s.num}${s.suffix || ""}</div>
          <span class="lbl">${s.label}</span>
        </div>
      </div>
    `).join("");
  }

  const heroImage = $("hero-image");
  if (heroImage) {
    heroImage.src = P.brand.heroImage;
    heroImage.onerror = () => { heroImage.style.display = "none"; };
  }

  const heroFloats = $("hero-floats");
  if (heroFloats) {
    heroFloats.innerHTML = P.hero.floats.map(f => `
      <span class="hero-float" data-tone="${f.tone}" style="left:${f.x};top:${f.y};">
        ${renderIcon(f.icon)}
      </span>
    `).join("");
  }

  /* ---------- CTA SHORTCUTS ---------- */
  const ctaShortcuts = $("cta-shortcuts");
  if (ctaShortcuts) {
    ctaShortcuts.innerHTML = P.ctaShortcuts.map(c => `
      <a class="cta-shortcut" data-tone="${c.tone}" href="services.html">
        <span class="icon">${renderIcon(c.icon)}</span>
        <span>${c.label}</span>
      </a>
    `).join("");
  }

  const ctaImage = $("cta-image");
  if (ctaImage) {
    ctaImage.src = P.brand.ctaImage;
    ctaImage.onerror = () => { ctaImage.style.display = "none"; };
  }

  /* ---------- FILTERS ---------- */
  const filterRow = $("filters");
  let currentFilter = "All";
  let currentSearch = "";

  if (filterRow) {
    filterRow.innerHTML = P.filters.map((f, i) =>
      `<button class="filter-btn ${i === 0 ? "active" : ""}" data-filter="${f.id}">
         <span class="ico">${f.ico}</span>${f.id}
       </button>`
    ).join("");
  }

  /* ---------- LOAD PROJECTS ---------- */
  const grid = $("project-grid");
  const noRes = $("no-results");
  let PROJECTS = [];

  const fallbackProjects = [
    { id: "manda-green", title: "Manda Green", category: "Branding",
      subtitle: "Brand Identity & Packaging Design",
      description: "A fresh, natural brand identity designed for a wellness company focused on organic living.",
      image: "", year: 2024, client: "Manda Green",
      tools: ["Ps", "Ai", "Pr"], project_type: "Branding & Packaging",
      video: "" },
    { id: "headphones", title: "Wireless Headphones", category: "3D & CGI",
      subtitle: "3D Product Visualization",
      description: "Realistic 3D product render for a wireless headphones campaign.",
      image: "", year: 2024, client: "Tech Brand",
      tools: ["Bl", "Ps"], project_type: "3D Product Render", video: "" },
    { id: "nexus-car", title: "NEXUS Car Commercial", category: "Video",
      subtitle: "Cinematic Video Production",
      description: "A dramatic cinematic commercial for the NEXUS car brand.",
      image: "", year: 2024, client: "NEXUS",
      tools: ["Pr", "Ae"], project_type: "Video Production", video: "" },
    { id: "fantasy-world", title: "Fantasy World", category: "VFX",
      subtitle: "VFX & Compositing",
      description: "A dark fantasy scene combining live-action and CGI compositing.",
      image: "", year: 2023, client: "Studio",
      tools: ["Ae", "Bl"], project_type: "VFX & Compositing", video: "" },
    { id: "techhub", title: "TechHub Website", category: "Web",
      subtitle: "UI/UX & Web Development",
      description: "A modern, responsive website and dashboard for a tech platform.",
      image: "", year: 2024, client: "TechHub",
      tools: ["FIG", "HTML"], project_type: "UI/UX Design", video: "" },
    { id: "event-posters", title: "Event Poster Series", category: "Graphic Design",
      subtitle: "Posters & Social Media Designs",
      description: "A vibrant series of event posters for a creative campaign.",
      image: "", year: 2024, client: "Events Co.",
      tools: ["Ps", "Ai"], project_type: "Graphic Design", video: "" },
    { id: "smart-robot", title: "Smart Robot", category: "Technology",
      subtitle: "Robotics & Automation",
      description: "A realistic 3D robot concept for an industrial automation project.",
      image: "", year: 2023, client: "Lab",
      tools: ["Bl", "Ps"], project_type: "Robotics", video: "" },
    { id: "character-anim", title: "Character Animation", category: "3D & CGI",
      subtitle: "3D Character Design & Animation",
      description: "A stylized 3D character with cinematic animation and lighting.",
      image: "", year: 2024, client: "Studio",
      tools: ["Bl", "Ae"], project_type: "3D Animation", video: "" }
  ];

  try {
    if (window.JM_SUPABASE) {
      const { data, error } = await window.JM_SUPABASE
        .from("projects")
        .select("*")
        .eq("active", true)
        .order("sort_order", { ascending: true });

      if (error) throw error;

      if (data?.length) {
        PROJECTS = data.map(r => ({
          id: r.id,
          title: r.title,
          category: r.category || "Other",
          subtitle: r.subtitle || r.project_type || r.description?.split(".")[0] || r.category,
          description: r.description || "",
          image: r.thumbnail || r.hero_image || r.image_url || "",
          hero_image: r.hero_image || r.thumbnail || "",
          gallery: Array.isArray(r.gallery) ? r.gallery : [],
          year: r.year || new Date().getFullYear(),
          client: r.brand_name || r.client || "JM Nexus Studios",
          tools: Array.isArray(r.tools) ? r.tools : [],
          project_type: r.project_type || r.dimensions || r.category,
          challenge: r.challenge || "",
          approach: r.approach || "",
          process: Array.isArray(r.techniques) ? r.techniques :
                   Array.isArray(r.process) ? r.process :
                   ["Research & Analysis", "Design Concepts", "Production", "Refinement", "Final Delivery"],
          video: r.video_url || r.video || "",
          download_url: r.download_url || "",
          href: r.href || ""
        }));
      }
    }
  } catch (err) {
    console.warn("Supabase fetch failed:", err);
  }

  if (!PROJECTS.length) PROJECTS = fallbackProjects;

  /* ---------- RENDER PROJECTS ---------- */
  function renderProjects() {
    if (!grid) return;
    const q = currentSearch.trim().toLowerCase();

    let items = PROJECTS.filter(p => {
      const matchCat = currentFilter === "All" || p.category === currentFilter;
      const matchQ = !q ||
        p.title.toLowerCase().includes(q) ||
        (p.subtitle || "").toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchCat && matchQ;
    });

    if (!items.length) {
      grid.innerHTML = "";
      if (noRes) noRes.hidden = false;
      return;
    }
    if (noRes) noRes.hidden = true;

    grid.innerHTML = items.map(p => {
      const tone = toneForCategory(p.category);
      return `
        <article class="project-card" data-id="${p.id}" data-tone="${tone}">
          <div class="pc-thumb">
            ${p.image
              ? `<img src="${p.image}" alt="${p.title}" loading="lazy" />`
              : `<div style="width:100%;height:100%;display:grid;place-items:center;background:linear-gradient(135deg,#0A1020,#1A0838);font-size:44px;color:#FFB52E;">◈</div>`}
            <span class="pc-cat">${p.category}</span>
          </div>
          <div class="pc-body">
            <h3 class="pc-title">${p.title}</h3>
            <p class="pc-sub">${p.subtitle}</p>
            <div class="pc-foot">
              <button class="pc-btn" data-open="${p.id}">View Project →</button>
              <span class="pc-go">→</span>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  /* Filter clicks */
  if (filterRow) {
    filterRow.addEventListener("click", e => {
      const b = e.target.closest(".filter-btn");
      if (!b) return;
      filterRow.querySelectorAll(".filter-btn").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      currentFilter = b.dataset.filter;
      renderProjects();
    });
  }

  /* Search */
  const searchInput = $("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      currentSearch = searchInput.value;
      renderProjects();
    });
  }

  /* Card clicks */
  if (grid) {
    grid.addEventListener("click", e => {
      const btn = e.target.closest("[data-open]");
      if (btn) { openProject(btn.dataset.open); return; }
      const card = e.target.closest(".project-card");
      if (card) openProject(card.dataset.id);
    });
  }

  renderProjects();

  /* ---------- FOOTER ---------- */
  document.querySelectorAll("#footer .nav-logo img").forEach(img => img.src = P.brand.navLogo);

  const footerNav = $("footer-nav");
  if (footerNav) footerNav.innerHTML = P.nav.map(n => `<a href="${n.href}">${n.label}</a>`).join("");

  const footerServices = $("footer-services");
  if (footerServices) {
    footerServices.innerHTML = P.filters.slice(1, 7)
      .map(f => `<a href="portfolio.html">${f.id}</a>`).join("");
  }

  const footerContact = $("footer-contact");
  if (footerContact) {
    footerContact.innerHTML = `
      <p>☎ ${P.footer.contact.phone}</p>
      <p>✉ ${P.footer.contact.email}</p>
      <p>◉ ${P.footer.contact.address}</p>
    `;
  }

  const yearEl = $("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================================================
     PROJECT DRAWER
     ========================================================= */
  const drawerEl   = $("drawer");
  const backdrop   = $("drawer-backdrop");
  const drawerBody = $("drawer-scroll");

  let currentProject = null;
  let currentGallery = [];
  let currentIndex = 0;

  function openProject(id) {
    if (!drawerEl || !backdrop || !drawerBody) return;

    const p = PROJECTS.find(x => String(x.id) === String(id));
    if (!p) return;

    currentProject = p;

    /* Build gallery — image + extra images + video if any */
    const gallery = [];
    if (p.hero_image || p.image) gallery.push({ type: "image", src: p.hero_image || p.image });
    if (Array.isArray(p.gallery)) {
      p.gallery.forEach(g => gallery.push({ type: "image", src: g }));
    }
    if (p.video) gallery.push({ type: "video", src: p.video });

    if (!gallery.length) gallery.push({ type: "image", src: p.image });

    currentGallery = gallery;
    currentIndex = 0;

    drawerBody.innerHTML = `
      <button class="pd-back" id="pd-back">← Back to Portfolio</button>

      <div class="pd-media">
        <div class="pd-main" id="pd-main-container">
          ${renderMedia(gallery[0])}
          <button class="pd-play ${gallery[0].type === "video" ? "hidden" : ""}" id="pd-play" title="Play">▶</button>
        </div>
        <div class="pd-thumbs" id="pd-thumbs">
          ${gallery.map((g, i) => `
            <div class="pd-thumb ${i === 0 ? 'active' : ''}" data-idx="${i}">
              ${g.type === "video"
                ? `<div style="width:100%;height:100%;display:grid;place-items:center;background:#0A1020;color:#FFB52E;font-size:18px;">▶</div>`
                : `<img src="${g.src}" alt="View ${i + 1}" />`}
            </div>
          `).join("")}
        </div>
      </div>

      <div class="pd-meta">
        <span class="pd-badge">${p.category}</span>
        <span class="pd-year">📅 ${p.year}</span>
      </div>

      <h2 class="pd-title">${p.title} — ${p.subtitle}</h2>
      <p class="pd-subtitle">${p.description || p.subtitle}</p>

      <div class="pd-metagrid">
        <div class="pd-metacell">
          <span class="lbl">Client</span>
          <span class="val">${p.client}</span>
        </div>
        <div class="pd-metacell">
          <span class="lbl">Tools Used</span>
          <div class="tools">
            ${(p.tools || []).map(t => `<span class="pd-tool">${t}</span>`).join("")}
          </div>
        </div>
        <div class="pd-metacell">
          <span class="lbl">Project Type</span>
          <span class="val">${p.project_type || p.category}</span>
        </div>
      </div>

      <div class="pd-section">
        <h4>Project Description</h4>
        <div class="pd-desc-grid">
          <p class="pd-desc-main">
            ${p.description || p.subtitle}
          </p>
          <div class="pd-desc-side">
            <div class="pd-desc-block">
              <strong><span class="ic">◎</span> The Challenge</strong>
              ${p.challenge || "Create a distinctive identity that stands out and connects with the target audience."}
            </div>
            <div class="pd-desc-block">
              <strong><span class="ic">◈</span> Our Approach</strong>
              ${p.approach || "We researched the market, developed a strong creative direction and refined every detail for maximum impact."}
            </div>
          </div>
        </div>
      </div>

      <div class="pd-section">
        <h4>The Process</h4>
        <div class="pd-process">
          <div class="pd-process-steps">
            ${(p.process || []).slice(0, 5).map((step, i) => `
              <div class="pd-step ${i === 0 ? 'highlight' : ''}">
                <span class="num">${i + 1}</span>
                <span class="lbl">${step}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <div class="pd-section">
        <h4>More from Our Portfolio</h4>
        <div class="pd-related" id="pd-related">
          ${PROJECTS.filter(x => String(x.id) !== String(p.id)).slice(0, 4).map(r => `
            <div class="pd-rel-item" data-related="${r.id}">
              ${r.image ? `<img src="${r.image}" alt="${r.title}" />` : ""}
              <span class="caption">${r.title}</span>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="pd-actions">
        <button class="btn btn-download" id="pd-download">
          ⬇ Download
        </button>
        <button class="btn btn-share" id="pd-share">
          ↗ Share
        </button>
      </div>

      <div class="pd-cta-row">
        <a class="btn-primary"
           href="contact.html?project=${encodeURIComponent(p.title)}">
          Start a Similar Project →
        </a>
      </div>
    `;

    /* Wire up */
    const back = $("pd-back");
    if (back) back.addEventListener("click", closeDrawer);

    const thumbs = $("pd-thumbs");
    if (thumbs) {
      thumbs.addEventListener("click", e => {
        const t = e.target.closest(".pd-thumb");
        if (!t) return;
        currentIndex = Number(t.dataset.idx);
        setMainMedia();
        thumbs.querySelectorAll(".pd-thumb").forEach((x, i) => {
          x.classList.toggle("active", i === currentIndex);
        });
      });
    }

    const playBtn = $("pd-play");
    if (playBtn) {
      playBtn.addEventListener("click", () => {
        /* Find first video in gallery or convert to video */
        if (currentGallery[currentIndex].type === "video") return;
        const videoItem = currentGallery.find(g => g.type === "video");
        if (videoItem) {
          currentIndex = currentGallery.indexOf(videoItem);
          setMainMedia();
          thumbs?.querySelectorAll(".pd-thumb").forEach((x, i) => {
            x.classList.toggle("active", i === currentIndex);
          });
        }
      });
    }

    const downloadBtn = $("pd-download");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        const target = p.download_url || currentGallery[currentIndex]?.src || p.image;
        if (!target) return;
        const a = document.createElement("a");
        a.href = target;
        a.download = slugify(p.title) + (isVideo(target) ? ".mp4" : ".jpg");
        a.target = "_blank";
        a.rel = "noopener";
        a.click();
      });
    }

    const shareBtn = $("pd-share");
    if (shareBtn) {
      shareBtn.addEventListener("click", () => openShareModal(p));
    }

    const related = $("pd-related");
    if (related) {
      related.addEventListener("click", e => {
        const item = e.target.closest("[data-related]");
        if (!item) return;
        openProject(item.dataset.related);
      });
    }

    /* Open drawer */
    drawerEl.classList.add("open");
    drawerEl.setAttribute("aria-hidden", "false");
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
    drawerBody.scrollTop = 0;
  }

  function renderMedia(item) {
    if (!item) return "";
    if (item.type === "video") {
      return `<video id="pd-main-media" controls autoplay muted loop playsinline src="${item.src}"></video>`;
    }
    return `<img id="pd-main-media" src="${item.src}" alt="" />`;
  }

  function setMainMedia() {
    const container = $("pd-main-container");
    if (!container) return;
    const item = currentGallery[currentIndex];
    if (!item) return;
    container.innerHTML = `
      ${renderMedia(item)}
      <button class="pd-play ${item.type === "video" ? "hidden" : ""}" id="pd-play" title="Play">▶</button>
    `;
    /* Re-wire play button */
    const playBtn = $("pd-play");
    if (playBtn) {
      playBtn.addEventListener("click", () => {
        const videoItem = currentGallery.find(g => g.type === "video");
        if (videoItem) {
          currentIndex = currentGallery.indexOf(videoItem);
          setMainMedia();
          const thumbs = $("pd-thumbs");
          thumbs?.querySelectorAll(".pd-thumb").forEach((x, i) => {
            x.classList.toggle("active", i === currentIndex);
          });
        }
      });
    }
  }

  function closeDrawer() {
    if (!drawerEl || !backdrop) return;
    drawerEl.classList.remove("open");
    drawerEl.setAttribute("aria-hidden", "true");
    backdrop.hidden = true;
    document.body.style.overflow = "";
  }

  const drawerClose = $("drawer-close");
  if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && drawerEl && drawerEl.classList.contains("open")) closeDrawer();
  });

  /* =========================================================
     SHARE MODAL
     ========================================================= */
  const shareModal = $("share-modal");
  const shareBackdrop = $("share-backdrop");
  const shareClose = $("share-close");
  const shareWhatsApp = $("share-whatsapp");
  const shareFacebook = $("share-facebook");
  const shareTikTok = $("share-tiktok");
  const shareEmail = $("share-email");
  const shareCopy = $("share-copy");
  const shareNative = $("share-native");

  function openShareModal(p) {
    if (!shareModal || !shareBackdrop) return;

    const url = `${location.origin}${location.pathname}#project-${p.id}`;
    const text = `${p.title} — JM Nexus Studios`;
    const desc = p.subtitle || p.description || "";

    if (shareWhatsApp) {
      shareWhatsApp.href = `https://wa.me/?text=${encodeURIComponent(text + "\n" + desc + "\n" + url)}`;
    }
    if (shareFacebook) {
      shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    }
    if (shareTikTok) {
      /* TikTok doesn't have direct share URL — copy and open app */
      shareTikTok.href = "#";
      shareTikTok.onclick = (e) => {
        e.preventDefault();
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(() => {
            alert("Link copied! Now open TikTok and paste to share.");
          });
        } else {
          prompt("Copy this link to share on TikTok:", url);
        }
      };
    }
    if (shareEmail) {
      shareEmail.href = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(desc + "\n\n" + url)}`;
    }
    if (shareCopy) {
      shareCopy.onclick = async () => {
        try {
          await navigator.clipboard.writeText(url);
          shareCopy.classList.add("copied");
          shareCopy.innerHTML = `<span class="icon">✓</span> Copied!`;
          setTimeout(() => {
            shareCopy.classList.remove("copied");
            shareCopy.innerHTML = `<span class="icon">🔗</span> Copy Link`;
          }, 1800);
        } catch {
          prompt("Copy this link:", url);
        }
      };
    }
    if (shareNative) {
      if (navigator.share) {
        shareNative.hidden = false;
        shareNative.onclick = () => {
          navigator.share({ title: p.title, text: desc, url }).catch(() => {});
        };
      } else {
        shareNative.hidden = true;
      }
    }

    shareModal.hidden = false;
    shareBackdrop.hidden = false;
  }

  function closeShareModal() {
    if (shareModal) shareModal.hidden = true;
    if (shareBackdrop) shareBackdrop.hidden = true;
  }

  if (shareClose) shareClose.addEventListener("click", closeShareModal);
  if (shareBackdrop) shareBackdrop.addEventListener("click", closeShareModal);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && shareModal && !shareModal.hidden) closeShareModal();
  });

})();