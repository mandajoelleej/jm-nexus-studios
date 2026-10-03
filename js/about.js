/* =========================================================
   JM NEXUS STUDIOS — About Page (full)
   ========================================================= */

const JM_ABOUT = {

  brand: {
    navLogo:  "assets/images/hero/jm-nexus-logo.webp",
    heroLogo: "assets/images/hero/jm-nexus-logo.webp",
    storyVideo:  "assets/videos/jm-nexus-showreel.mp4",
    storyPoster: "assets/images/hero/showreel-poster.webp"
  },

  orderIcon: "✈",
  orderLabel: "Get Started",
  orderHref: "contact.html",

  nav: [
    { label: "Home",     href: "index.html" },
    { label: "Services", href: "services.html" },
    { label: "About Us", href: "about.html", active: true },
    { label: "Contact",  href: "contact.html" }
  ],

  hero: {
    pill: "Who We Are",
    titleBefore: "About",
    titleGrad: "JM Nexus Studios",
    tagline: [
      { text: "Creativity.", cls: "accent-1" },
      { text: " Technology.", cls: "accent-2" },
      { text: " Purpose.", cls: "" }
    ],
    desc: "JM Nexus Studios is a creative digital studio passionate about turning ideas into stunning visual experiences and smart digital solutions. We blend creativity, technology, and strategy to help brands and individuals stand out in a digital world full of noise.",
    primaryBtn: { label: "Let's Work Together", href: "contact.html" }
  },

  /* ---------- ROTATING SOFTWARE ICONS AROUND THE LOGO ---------- */
  orbit: [
    { icon: "assets/icons/photoshop.png",     tone: "blue", tip: "Photoshop",     href: "services.html#graphic-design", angle: 205, radius: 0.92 },
    { icon: "assets/icons/illustrator.png",   tone: "gold", tip: "Illustrator",   href: "services.html#graphic-design", angle: 335, radius: 0.88 },
    { icon: "assets/icons/blender.png",       tone: "gold", tip: "Blender 3D",    href: "services.html#3d",             angle: 30,  radius: 0.95 },
    { icon: "assets/icons/after-effects.png", tone: "blue", tip: "After Effects", href: "services.html#vfx",            angle: 250, radius: 0.78 },
    { icon: "assets/icons/premiere.png",      tone: "cyan", tip: "Premiere Pro",  href: "services.html#video",          angle: 150, radius: 0.98 },
    { icon: "assets/icons/code.png",          tone: "blue", tip: "Web Dev",       href: "services.html#web",            angle: 355, radius: 0.75 },
    { icon: "assets/icons/vfx.png",           tone: "cyan", tip: "VFX",           href: "services.html#vfx",            angle: 285, radius: 0.90 }
  ],

  /* ---------- ROTATING STATUS RING TEXT ---------- */
  /*  This is the circular text that spins around the hero.
      Update the string any time you like — no code changes needed. */
  statusRing: {
    text: "✦ JM NEXUS STUDIOS ✦ CREATIVE ✦ 3D ✦ VFX ✦ WEB ✦ ROBOTICS ✦ INNOVATION ",
    spinSeconds: 24
  },

  /* ---------- FOUNDER ---------- */
  founder: {
    photo: "assets/images/founder/joel-manda.webp",
    name: "Joel Manda",
    role: "Founder & Creative Director",
    quote: "My mission is simple: to use creativity and technology to solve problems, tell stories, and inspire change.",
    sign: "Joel Manda",

    /* REAL SOCIAL LOGOS — icons are SVG files, you provide the links */
    socials: [
      { icon: "assets/icons/social/youtube.svg",   href: "https://youtube.com/@jmnexusstudios",          title: "YouTube"   },
      { icon: "assets/icons/social/instagram.svg", href: "https://instagram.com/jmnexusstudios",         title: "Instagram" },
      { icon: "assets/icons/social/tiktok.svg",    href: "https://tiktok.com/@jmnexusstudios",           title: "TikTok"    },
      { icon: "assets/icons/social/linkedin.svg",  href: "https://linkedin.com/company/jmnexusstudios",  title: "LinkedIn"  },
      { icon: "assets/icons/social/behance.svg",   href: "https://behance.net/jmnexusstudios",           title: "Behance"   }
    ]
  },

  stats: [
    { icon: "🏆", num: 100, suffix: "+",  label: "Projects Completed" },
    { icon: "😊", num: 50,  suffix: "+",  label: "Happy Clients" },
    { icon: "💼", num: 10,  suffix: "+",  label: "Industries Served" },
    { icon: "👁", num: 1,   suffix: "M+", label: "Views Generated" },
    { icon: "★",  num: 5,   suffix: "+",  label: "Years Experience" }
  ],

  timeline: [
    { year: "2019 — The Beginning", icon: "🚀",  tone: "blue", text: "Started as a passion project creating designs for local brands and friends." },
    { year: "2021 — Growing",       icon: "</>", tone: "blue", text: "Expanded into video editing, 3D and VFX, serving clients across different industries." },
    { year: "2024 — The Mission",   icon: "★",   tone: "gold", text: "Built JM Nexus Studios to empower brands with world-class creativity and tech solutions." }
  ],

  values: [
    { icon: "💡", tone: "blue", title: "Creativity",    text: "We think different to create unique solutions." },
    { icon: "🚀", tone: "gold", title: "Innovation",    text: "We embrace new ideas and technologies." },
    { icon: "💎", tone: "blue", title: "Excellence",    text: "We deliver high-quality work every time." },
    { icon: "👥", tone: "gold", title: "Collaboration", text: "We work closely with our clients." },
    { icon: "🎯", tone: "blue", title: "Purpose",       text: "We use our skills to make a positive impact." },
    { icon: "🛡", tone: "gold", title: "Integrity",     text: "We value honesty, respect and trust." }
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
  }
};

/* =========================================================
   HELPERS
   ========================================================= */
function isImage(str) {
  return typeof str === "string" && /\.(png|jpe?g|gif|svg|webp|avif)$/i.test(str.trim());
}
function renderIcon(icon, alt = "") {
  return isImage(icon)
    ? `<img src="${icon}" alt="${alt}" loading="lazy" />`
    : icon;
}

/* =========================================================
   RENDER
   ========================================================= */
(function () {
  const D = JM_ABOUT;

  /* NAV */
  document.getElementById("nav-links").innerHTML = D.nav.map(n =>
    `<a href="${n.href}" class="${n.active ? "active" : ""}">${n.label}</a>`
  ).join("");
  document.querySelectorAll(".nav-logo img").forEach(i => i.src = D.brand.navLogo);

  const orderBtn = document.querySelector(".btn-order");
  if (orderBtn) {
    orderBtn.href = D.orderHref;
    orderBtn.innerHTML = `${renderIcon(D.orderIcon)} ${D.orderLabel}`;
  }

  /* HERO */
  document.getElementById("about-pill").textContent = D.hero.pill;
  document.getElementById("about-title").innerHTML =
    `${D.hero.titleBefore} <br><span class="grad">${D.hero.titleGrad}</span>`;

  document.getElementById("about-tagline").innerHTML =
    D.hero.tagline.map(t => `<span class="${t.cls}">${t.text}</span>`).join("");

  document.getElementById("about-desc").textContent = D.hero.desc;

  const primary = document.getElementById("about-primary");
  primary.innerHTML = `${D.hero.primaryBtn.label} →`;
  primary.href = D.hero.primaryBtn.href;

  const logo = document.getElementById("about-logo");
  logo.src = D.brand.heroLogo;
  logo.alt = "JM Nexus Studios";

  /* =========================================================
     ORBIT ICONS (identical behaviour to Home)
     ========================================================= */
  const orbit = document.getElementById("about-orbit");
  orbit.innerHTML = "";

  // decorative rings
  ["r-a", "r-b", "r-c"].forEach(cls => {
    const s = document.createElement("span");
    s.className = "hero-ring " + cls;
    orbit.appendChild(s);
  });

  const baseRadius = 220;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const icons = [];

  D.orbit.forEach((o, i) => {
    const el = document.createElement("a");
    el.className = "orbit-icon";
    el.href = o.href;
    el.dataset.tone = o.tone;
    el.innerHTML = `${renderIcon(o.icon, o.tip)}<span class="tip">${o.tip}</span>`;

    // pause on hover
    el.addEventListener("mouseenter", () => el.dataset.paused = "1");
    el.addEventListener("mouseleave", () => delete el.dataset.paused);

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

  /* =========================================================
     ROTATING STATUS RING
     ========================================================= */
  const ringText = document.getElementById("ring-text");
  if (ringText) ringText.textContent = D.statusRing.text;

  const statusRing = document.getElementById("status-ring");
  if (statusRing && D.statusRing.spinSeconds) {
    statusRing.style.animationDuration = D.statusRing.spinSeconds + "s";
  }

  /* =========================================================
     FOUNDER CARD
     ========================================================= */
  document.getElementById("founder-photo").src = D.founder.photo;
  document.getElementById("founder-name").textContent = D.founder.name;
  document.getElementById("founder-role").textContent = D.founder.role;
  document.getElementById("founder-quote").textContent = D.founder.quote;
  document.getElementById("founder-sign").textContent = D.founder.sign;

  document.getElementById("founder-socials").innerHTML = D.founder.socials.map(s => `
    <a href="${s.href}" target="_blank" rel="noopener" title="${s.title}" aria-label="${s.title}">
      ${renderIcon(s.icon, s.title)}
    </a>
  `).join("");

  /* STATS */
  document.getElementById("stats-grid").innerHTML = D.stats.map(s => `
    <div class="stat">
      <span class="ic">${renderIcon(s.icon, s.label)}</span>
      <div>
        <span class="num"><span class="accent" data-target="${s.num}" data-suffix="${s.suffix}">0${s.suffix}</span></span>
        <span class="lbl">${s.label}</span>
      </div>
    </div>
  `).join("");

  /* TIMELINE */
  document.getElementById("timeline").innerHTML = D.timeline.map(t => `
    <li>
      <span class="t-icon ${t.tone}">${renderIcon(t.icon)}</span>
      <div class="t-body">
        <h4>${t.year}</h4>
        <p>${t.text}</p>
      </div>
    </li>
  `).join("");

  /* VALUES */
  document.getElementById("values-grid").innerHTML = D.values.map(v => `
    <div class="value-item">
      <span class="v-icon ${v.tone}">${renderIcon(v.icon)}</span>
      <div>
        <h5>${v.title}</h5>
        <p>${v.text}</p>
      </div>
    </div>
  `).join("");

  /* DRIVES */
  document.getElementById("drives-quote").textContent = D.drives.quote;
  const drivesImg = document.getElementById("drives-image");
  drivesImg.src = D.drives.image;
  drivesImg.alt = D.drives.caption;

  /* CTA */
  document.getElementById("cta-title").innerHTML =
    `${D.cta.title} <span class="grad">${D.cta.sub}</span>`;
  const ctaBtn = document.getElementById("cta-btn");
  ctaBtn.innerHTML = `${D.cta.btn} →`;
  ctaBtn.href = D.cta.href;

  /* SHOWREEL MODAL */
  const modal = document.getElementById("video-modal");
  const video = document.getElementById("story-video");
  video.src = D.brand.storyVideo;
  video.poster = D.brand.storyPoster;

  document.getElementById("watch-story").addEventListener("click", () => {
    modal.classList.add("open");
    video.currentTime = 0;
    video.play().catch(() => {});
  });
  const closeModal = () => { modal.classList.remove("open"); video.pause(); };
  document.getElementById("video-close").addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  /* MOBILE MENU */
  document.getElementById("nav-toggle").addEventListener("click", () => {
    document.getElementById("nav-links").classList.toggle("open");
  });

  /* REVEAL + COUNTERS */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        if (en.target.id === "stats") runCounters();
      }
    });
  }, { threshold: 0.25 });

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