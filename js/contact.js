/* =========================================================
   JM NEXUS STUDIOS — Contact Page
   Loads work from Supabase, submits message + donations
   ========================================================= */

const JM_CONTACT = {
  brand: {
    navLogo: "assets/images/hero/jm-nexus-logo.webp",
    footerDesc: "We create stunning designs, powerful digital solutions and innovative technology to help brands grow.",
    footerTagline: "Your Vision, Our Creativity",
    heroVisual: "assets/images/portfolio/hero-studio.webp"
  },

  orderIcon: "✈",
  orderLabel: "Start a Project",
  orderHref: "#contact-main",

  nav: [
    { label: "Home",      href: "index.html" },
    { label: "About Us",  href: "about.html" },
    { label: "Services",  href: "services.html" },
    { label: "Portfolio", href: "portfolio.html" },
    { label: "Contact",   href: "contact.html", active: true }
  ],

  hero: {
    pill: "GET IN TOUCH",
    title: "Let's Create",
    gradTitle: "Something Amazing",
    desc: "We'd love to hear from you! Whether you have a project, a collaboration idea, or just want to say hello — reach out to us."
  },

  features: [
    { icon: "✦", label: "Creative Solutions",    tone: "gold" },
    { icon: "⚙", label: "Professional Support",  tone: "cyan" },
    { icon: "⚡", label: "Fast Response",         tone: "purple" },
    { icon: "🌍", label: "Global Reach",          tone: "green" }
  ],

  channel: {
    name: "JM Nexus Studios",
    desc: "Subscribe to our channel for tutorials, behind the scenes and creative content.",
    status: "Coming Soon",
    statusNote: "We're launching soon!",
    watchHref: "https://youtube.com/@jmnexusstudios",
    followHref: "https://youtube.com/@jmnexusstudios"
  },

  socials: [
    { net: "yt", icon: "▶", name: "YouTube",   handle: "@JM Nexus Studios",  action: "Subscribe", href: "https://youtube.com/@jmnexusstudios" },
    { net: "tt", icon: "♪", name: "TikTok",    handle: "@jmnexusstudios",    action: "Follow",    href: "https://tiktok.com/@jmnexusstudios" },
    { net: "ig", icon: "◉", name: "Instagram", handle: "@jmnexusstudios",    action: "Follow",    href: "https://instagram.com/jmnexusstudios" },
    { net: "fb", icon: "f", name: "Facebook",  handle: "JM Nexus Studios",   action: "Like",      href: "https://facebook.com/jmnexusstudios" },
    { net: "x",  icon: "X", name: "X",         handle: "@jmnexusstudios",    action: "Follow",    href: "https://x.com/jmnexusstudios" },
    { net: "li", icon: "in",name: "LinkedIn",  handle: "JM Nexus Studios",   action: "Connect",   href: "https://linkedin.com/company/jmnexusstudios" }
  ],

  contact: {
    phone: { value: "+256 700 123 456", action: "Call us anytime",      href: "tel:+256700123456" },
    email: { value: "jmnexusstudios@gmail.com", action: "Send us a message", href: "mailto:jmnexusstudios@gmail.com" },
    location: {
      city: "Jinja, Uganda",
      street: "Lubas Road / Bugembe",
      action: "Find us on Google Maps",
      href: "https://maps.google.com/?q=Lubas+Road+Bugembe+Jinja+Uganda"
    }
  },

  what: [
    { icon: "▣", label: "Graphic Design & Branding",        href: "services.html#graphic-design", tone: "gold" },
    { icon: "⬢", label: "3D Modeling & Rendering",          href: "services.html#3d",             tone: "cyan" },
    { icon: "▶", label: "Video Editing & Motion Graphics",  href: "services.html#video",          tone: "blue" },
    { icon: "✧", label: "VFX & CGI",                        href: "services.html#vfx",            tone: "purple" },
    { icon: "</>", label: "Web & App Development",          href: "services.html#web",            tone: "cyan" },
    { icon: "◆", label: "Content Creation",                 href: "services.html#content",        tone: "pink" },
    { icon: "◉", label: "Digital / Tech Solutions",         href: "services.html#robotics",       tone: "green" },
    { icon: "✺", label: "Branding & Identity",              href: "services.html#branding",       tone: "gold" }
  ],

  hours: [
    { day: "Mon – Fri", time: "8:00 AM – 6:00 PM" },
    { day: "Sat",       time: "9:00 AM – 4:00 PM" },
    { day: "Sun",       time: "Closed", closed: true }
  ],

  whatsapp: { number: "+256 773 486 604", link: "https://wa.me/256773486604" },

  footer: {
    contact: {
      phone: "+256 700 123 456",
      email: "jmnexusstudios@gmail.com",
      address: "Jinja, Uganda"
    },
    socials: [
      { icon: "YT", href: "https://youtube.com/@jmnexusstudios",         title: "YouTube" },
      { icon: "IG", href: "https://instagram.com/jmnexusstudios",        title: "Instagram" },
      { icon: "TT", href: "https://tiktok.com/@jmnexusstudios",          title: "TikTok" },
      { icon: "in", href: "https://linkedin.com/company/jmnexusstudios", title: "LinkedIn" },
      { icon: "X",  href: "https://x.com/jmnexusstudios",                title: "X" }
    ]
  }
};

/* ---------- Helpers ---------- */
function isImage(str) {
  return typeof str === "string" && /\.(png|jpe?g|gif|svg|webp|avif)/i.test(str.trim());
}
function renderIcon(icon, alt = "") {
  return isImage(icon) ? `<img src="${icon}" alt="${alt}" />` : (icon || "");
}
function toneForCategory(cat) {
  const map = {
    "Graphic Design": "gold",
    "3D & CGI":       "cyan",
    "Branding":       "green",
    "Video & Motion": "blue",
    "VFX & Effects":  "purple",
    "Web & UI":       "cyan"
  };
  return map[cat] || "cyan";
}

/* =========================================================
   BOOT
   ========================================================= */
(async function () {
  const C = JM_CONTACT;
  document.body.classList.add("contact-page");

  /* ---------- NAV ---------- */
  document.getElementById("nav-links").innerHTML = C.nav.map(n =>
    `<a href="${n.href}" class="${n.active ? "active" : ""}">${n.label}</a>`
  ).join("");
  document.querySelectorAll(".nav-logo img").forEach(i => i.src = C.brand.navLogo);

  const orderBtn = document.querySelector(".btn-order");
  if (orderBtn) {
    orderBtn.href = C.orderHref;
    orderBtn.innerHTML = `${renderIcon(C.orderIcon)} ${C.orderLabel}`;
  }

  /* ---------- HERO ---------- */
  document.querySelector(".hero-pill").innerHTML =
    `<span class="dot"></span>${C.hero.pill}`;
  document.querySelector(".ch-title").innerHTML =
    `${C.hero.title}<br><span class="grad">${C.hero.gradTitle}</span>`;
  document.querySelector(".ch-desc").textContent = C.hero.desc;

  /* Feature chips */
  document.getElementById("feature-chips").innerHTML = C.features.map(f => `
    <div class="feature-chip" data-tone="${f.tone}">
      <span class="fc-icon">${renderIcon(f.icon)}</span>
      <span class="fc-label">${f.label}</span>
    </div>
  `).join("");

  /* Hero visual */
  const heroImg = document.getElementById("hero-visual");
  heroImg.src = C.brand.heroVisual;
  heroImg.onerror = () => {
    heroImg.style.display = "none";
    heroImg.parentElement.style.background =
      "linear-gradient(135deg, #060D20 0%, #0A1030 55%, #1A0838 100%)";
  };

  /* ---------- OUR CHANNEL + FOLLOW US ---------- */
  document.getElementById("channel-card").innerHTML = `
    <div class="channel-head">
      <span class="ic">▶</span>
      <span>Our Channel</span>
    </div>
    <div class="channel-name">${C.channel.name}</div>
    <p class="channel-desc">${C.channel.desc}</p>
    <div class="channel-actions">
      <span class="channel-status">⏱ ${C.channel.status}</span>
      <a class="btn-small red" href="${C.channel.watchHref}" target="_blank" rel="noopener">
        Watch
      </a>
    </div>
  `;

  document.getElementById("follow-card").innerHTML = `
    <div class="follow-head">
      <span class="ic">✦</span>
      <span>Follow Us</span>
    </div>
    <p class="channel-desc">Stay connected for updates, creative content and more.</p>
    <div class="follow-icons">
      ${C.socials.map(s => `
        <a href="${s.href}" target="_blank" rel="noopener" data-net="${s.net}" title="${s.name}">
          ${s.icon}
        </a>
      `).join("")}
    </div>
    <div class="follow-actions">
      <a class="btn-small primary" href="${C.socials[0].href}" target="_blank" rel="noopener">
        Follow Now
      </a>
    </div>
  `;

  /* ---------- OUR CONTACT ---------- */
  document.getElementById("contact-cards").innerHTML = `
    <div class="contact-card" data-tone="green">
      <div class="cc-icon">☎</div>
      <h4>Phone</h4>
      <div class="cc-value">${C.contact.phone.value}</div>
      <a class="cc-action" href="${C.contact.phone.href}">${C.contact.phone.action} →</a>
    </div>
    <div class="contact-card" data-tone="purple">
      <div class="cc-icon">✉</div>
      <h4>Email</h4>
      <div class="cc-value">${C.contact.email.value}</div>
      <a class="cc-action" href="${C.contact.email.href}">${C.contact.email.action} →</a>
    </div>
    <div class="contact-card" data-tone="gold">
      <div class="cc-icon">◉</div>
      <h4>Location</h4>
      <div class="cc-value">
        ${C.contact.location.city}<br>${C.contact.location.street}
      </div>
      <a class="cc-action" href="${C.contact.location.href}" target="_blank" rel="noopener">
        ${C.contact.location.action} →
      </a>
    </div>
  `;

  /* ---------- OUR SOCIAL MEDIA ---------- */
  document.getElementById("social-grid").innerHTML = C.socials.map(s => `
    <a class="social-card" data-net="${s.net}" href="${s.href}" target="_blank" rel="noopener">
      <span class="sc-icon">${s.icon}</span>
      <span class="sc-name">${s.name}</span>
      <span class="sc-handle">${s.handle}</span>
      <span class="sc-action">${s.action}</span>
    </a>
  `).join("");

  /* ---------- WHAT WE DO ---------- */
  document.getElementById("what-grid").innerHTML = C.what.map(w => `
    <a class="what-item" data-tone="${w.tone}" href="${w.href}">
      <span class="wi-icon">${renderIcon(w.icon)}</span>
      <span>${w.label}</span>
    </a>
  `).join("");

  /* ---------- MAP + HOURS ---------- */
  const mapEmbed = document.getElementById("map-embed");
  mapEmbed.innerHTML = `
    <iframe
      src="https://www.google.com/maps?q=Lubas+Road+Bugembe+Jinja+Uganda&output=embed"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      title="JM Nexus Studios location">
    </iframe>
  `;
  document.getElementById("map-link").href = C.contact.location.href;
  document.getElementById("map-city").textContent = C.contact.location.city;
  document.getElementById("map-street").textContent = C.contact.location.street;

  document.getElementById("hours-list").innerHTML = C.hours.map(h => `
    <div class="hours-row ${h.closed ? "closed" : ""}">
      <span class="day">${h.day}</span>
      <span class="time">${h.time}</span>
    </div>
  `).join("");

  /* =========================================================
     LOAD GADGETS FROM SUPABASE
     ========================================================= */
  const gadgetGrid = document.getElementById("gadget-grid");
  const gadgetSelect = document.getElementById("d-gadget");

  try {
    const { data, error } = await window.JM_SUPABASE
      .from("gadgets")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    const gadgets = data || [];

    if (gadgets.length) {
      gadgetGrid.innerHTML = gadgets.map(g => `
        <div class="gadget-card" data-tone="${g.tone || "cyan"}">
          <div class="g-img">
            ${g.image_url
              ? `<img src="${g.image_url}" alt="${g.name}" loading="lazy" />`
              : "📦"}
          </div>
          <div class="g-name">${g.name}</div>
          <a class="g-btn" href="${g.shop_url}" target="_blank" rel="noopener">
            Shop on ${g.shop_name || "Store"}
          </a>
        </div>
      `).join("");

      gadgetSelect.innerHTML = `<option value="">Select gadget</option>` +
        gadgets.map(g => `<option value="${g.name}">${g.name}</option>`).join("");
    } else {
      gadgetGrid.innerHTML = `<div style="grid-column:1/-1; padding:20px; text-align:center; color:#8A97B0;">No gadgets listed yet.</div>`;
    }
  } catch (err) {
    console.error("Gadget load error:", err);
    gadgetGrid.innerHTML = `<div style="grid-column:1/-1; padding:20px; text-align:center; color:#FF89B8;">Could not load gadgets.</div>`;
  }

  /* =========================================================
     LOAD RECENT WORK (from projects table)
     ========================================================= */
  const workGrid = document.getElementById("work-grid");

  try {
    const { data, error } = await window.JM_SUPABASE
      .from("projects")
      .select("id, title, category, thumbnail, hero_image")
      .eq("active", true)
      .order("sort_order", { ascending: true })
      .limit(6);

    if (error) throw error;
    const projects = data || [];

    if (projects.length) {
      workGrid.innerHTML = projects.map(p => {
        const img = p.thumbnail || p.hero_image || "";
        const tone = toneForCategory(p.category);
        return `
          <a class="work-item" data-tone="${tone}" href="portfolio.html#project-${p.id}">
            ${img ? `<img src="${img}" alt="${p.title}" loading="lazy" />` : ""}
            <div class="w-meta">
              <span>▣ ${p.category}</span>
              <span>→</span>
            </div>
          </a>
        `;
      }).join("");
    } else {
      workGrid.innerHTML = `<div style="grid-column:1/-1; padding:20px; text-align:center; color:#8A97B0;">No projects yet.</div>`;
    }
  } catch (err) {
    console.error("Work load error:", err);
    workGrid.innerHTML = `<div style="grid-column:1/-1; padding:20px; text-align:center; color:#FF89B8;">Could not load projects.</div>`;
  }

  /* ---------- FOOTER ---------- */
  document.querySelectorAll("#footer .nav-logo img").forEach(i => i.src = C.brand.navLogo);
  document.getElementById("footer-desc").textContent = C.brand.footerDesc;
  document.getElementById("footer-tagline").textContent = C.brand.footerTagline;
  document.getElementById("footer-nav").innerHTML = C.nav.map(n =>
    `<a href="${n.href}">${n.label}</a>`).join("");
  document.getElementById("footer-services").innerHTML = C.what.slice(0, 6)
    .map(w => `<a href="${w.href}">${w.label}</a>`).join("");
  document.getElementById("footer-contact").innerHTML = `
    <p>☎ ${C.footer.contact.phone}</p>
    <p>✉ ${C.footer.contact.email}</p>
    <p>◉ ${C.footer.contact.address}</p>
  `;
  document.getElementById("footer-socials").innerHTML = C.footer.socials.map(s =>
    `<a href="${s.href}" target="_blank" rel="noopener" title="${s.title}">${s.icon}</a>`
  ).join("");
  document.getElementById("year").textContent = new Date().getFullYear();

  document.getElementById("nav-toggle").addEventListener("click", () => {
    document.getElementById("nav-links").classList.toggle("open");
  });

  /* =========================================================
     CONTACT FORM → Supabase
     ========================================================= */
  const form      = document.getElementById("contact-form");
  const sendBtn   = document.getElementById("send-btn");
  const sendLabel = document.getElementById("send-label");
  const formMsg   = document.getElementById("form-msg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    formMsg.hidden = true;

    const name    = document.getElementById("f-name").value.trim();
    const email   = document.getElementById("f-email").value.trim();
    const subject = document.getElementById("f-subject").value.trim();
    const message = document.getElementById("f-message").value.trim();

    let ok = true;
    ["f-name","f-email","f-message"].forEach(id =>
      document.getElementById(id).classList.remove("invalid"));

    if (!name)  { document.getElementById("f-name").classList.add("invalid");    ok = false; }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      document.getElementById("f-email").classList.add("invalid"); ok = false;
    }
    if (!message) { document.getElementById("f-message").classList.add("invalid"); ok = false; }

    if (!ok) {
      formMsg.hidden = false;
      formMsg.className = "form-msg err";
      formMsg.textContent = "Please fill in all required fields correctly.";
      return;
    }

    sendBtn.disabled = true;
    sendLabel.textContent = "Sending…";

    const { error } = await window.JM_SUPABASE
      .from("contact_messages")
      .insert([{ name, email, subject, message }]);

    if (error) {
      console.error(error);
      sendBtn.disabled = false;
      sendLabel.textContent = "Send Message";
      formMsg.hidden = false;
      formMsg.className = "form-msg err";
      formMsg.textContent = "Could not send. Please try again or contact us directly.";
      return;
    }

    /* Success */
    form.reset();
    sendBtn.disabled = false;
    sendLabel.textContent = "Send Message";
    formMsg.hidden = false;
    formMsg.className = "form-msg ok";
    formMsg.textContent = "✓ Your message has been sent. We'll get back to you soon.";
  });

  /* =========================================================
     DONATION MODAL
     ========================================================= */
  const modal       = document.getElementById("donate-modal");
  const backdrop    = document.getElementById("donate-backdrop");
  const closeBtn    = document.getElementById("donate-close");
  const tabs        = document.getElementById("donate-tabs");
  const donateForm  = document.getElementById("donate-form");
  const donateSub   = document.getElementById("donate-submit");
  const donateLabel = document.getElementById("donate-label");
  const donateMsg   = document.getElementById("donate-msg");

  let donateType = "money";

  function openDonate() {
    modal.hidden = false;
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeDonate() {
    modal.hidden = true;
    backdrop.hidden = true;
    document.body.style.overflow = "";
  }

  document.getElementById("donate-now-btn").addEventListener("click", openDonate);
  closeBtn.addEventListener("click", closeDonate);
  backdrop.addEventListener("click", closeDonate);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeDonate();
  });

  /* Type tabs */
  tabs.addEventListener("click", (e) => {
    const b = e.target.closest(".type-tab");
    if (!b) return;
    tabs.querySelectorAll(".type-tab").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    donateType = b.dataset.type;
    document.querySelectorAll("[data-type-panel]").forEach(p => {
      p.hidden = p.dataset.typePanel !== donateType;
    });
  });

  /* Submit donation */
  donateForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    donateMsg.hidden = true;

    const donorName  = document.getElementById("d-name").value.trim();
    const donorEmail = document.getElementById("d-email").value.trim();
    const donorPhone = document.getElementById("d-phone").value.trim();
    const amount     = document.getElementById("d-amount").value.trim();
    const gadget     = document.getElementById("d-gadget").value;
    const other      = document.getElementById("d-other").value.trim();
    const message    = document.getElementById("d-message").value.trim();

    let ok = true;
    ["d-name"].forEach(id => document.getElementById(id).classList.remove("invalid"));
    if (!donorName) { document.getElementById("d-name").classList.add("invalid"); ok = false; }

    if (donateType === "money"  && !amount) { document.getElementById("d-amount").classList.add("invalid"); ok = false; }
    if (donateType === "gadget" && !gadget) { document.getElementById("d-gadget").classList.add("invalid"); ok = false; }
    if (donateType === "other"  && !other)  { document.getElementById("d-other").classList.add("invalid");  ok = false; }

    if (!ok) {
      donateMsg.hidden = false;
      donateMsg.className = "form-msg err";
      donateMsg.textContent = "Please fill in the required fields.";
      return;
    }

    donateSub.disabled = true;
    donateLabel.textContent = "Submitting…";

    const ref = "DON-" + Date.now().toString().slice(-6);

    const { error } = await window.JM_SUPABASE
      .from("donations")
      .insert([{
        donor_name: donorName,
        donor_email: donorEmail || null,
        donor_phone: donorPhone || null,
        type: donateType,
        amount: amount || null,
        gadget_name: gadget || null,
        message: [other, message].filter(Boolean).join(" | ") || null,
        reference: ref
      }]);

    if (error) {
      console.error(error);
      donateSub.disabled = false;
      donateLabel.textContent = "Submit Support";
      donateMsg.hidden = false;
      donateMsg.className = "form-msg err";
      donateMsg.textContent = "Could not submit. Please try again.";
      return;
    }

    /* Success */
    donateForm.reset();
    donateSub.disabled = false;
    donateLabel.textContent = "Submit Support";
    donateMsg.hidden = false;
    donateMsg.className = "form-msg ok";
    donateMsg.innerHTML = `
      ✓ Thank you! Reference: <strong style="color:#FFC400">${ref}</strong>.
      We'll contact you shortly with instructions.
    `;
  });

})();