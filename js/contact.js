/* =========================================================
   JM NEXUS STUDIOS — Contact Page
   Hero + Cards + Socials + Donation Drawer (3 paths)
   ========================================================= */

const LOGO_URL = "assets/images/hero/jm-nexus-logo.webp";
const LOGO_FALLBACK = "assets/images/hero/jm-nexus-logo.png";

const FALLBACK_SETTINGS = {
  whatsapp_number: "+256 773 486 604",
  whatsapp_link: "https://wa.me/256773486604",
  email: "mandajoel12@gmail.com",
  maps_link: "https://maps.google.com/?q=Jinja+Uganda",
  directions_link: "https://maps.google.com/dir/?api=1&destination=Jinja+Uganda"
};

const NAV = [
  { label: "Home",      href: "index.html" },
  { label: "About Us",  href: "about.html" },
  { label: "Services",  href: "services.html" },
  { label: "Portfolio", href: "portfolio.html" },
  { label: "Contact",   href: "contact.html", active: true }
];

const FALLBACK_CARDS = [
  { title: "WhatsApp / Phone", icon: "💬", description: "Chat with us on WhatsApp for a fast reply.", value: "+256 773 486 604", link: "https://wa.me/256773486604", action_label: "Chat on WhatsApp", tone: "green" },
  { title: "Email", icon: "✉", description: "Send us an email — we reply within 24 hours.", value: "mandajoel12@gmail.com", link: "mailto:mandajoel12@gmail.com", action_label: "Send Email", tone: "cyan" },
  { title: "Location", icon: "◉", description: "Visit our studio in Jinja, Uganda.", value: "Lubas Road / Bugembe, Jinja", link: "https://maps.google.com/?q=Jinja+Uganda", action_label: "Open in Maps", tone: "gold" }
];

const FALLBACK_SOCIALS = [
  { platform: "YouTube",   icon: "YT", handle: "@jmnexusstudios", description: "Behind-the-scenes and tutorials.", url: "https://youtube.com/@jmnexusstudios", tone: "red" },
  { platform: "TikTok",    icon: "TT", handle: "@jmnexusstudios", description: "Short-form creative content.",     url: "https://tiktok.com/@jmnexusstudios", tone: "white" },
  { platform: "Instagram", icon: "IG", handle: "@jmnexusstudios", description: "Daily design and studio moments.", url: "https://instagram.com/jmnexusstudios", tone: "pink" },
  { platform: "Facebook",  icon: "f",  handle: "JM Nexus Studios", description: "Updates and community posts.",    url: "https://facebook.com/jmnexusstudios", tone: "blue" },
  { platform: "WhatsApp",  icon: "💬", handle: "+256 773 486 604", description: "Chat with us directly.",          url: "https://wa.me/256773486604", tone: "green" },
  { platform: "LinkedIn",  icon: "in", handle: "JM Nexus Studios", description: "Professional updates.",           url: "https://linkedin.com/company/jmnexusstudios", tone: "blue" }
];

const FALLBACK_ITEMS = [
  { id: 1, title: "Camera Equipment", description: "Camera for improving JM Nexus Studios videography.", target_price: 2500000, quantity_needed: 1, amount_raised: 0, category: "Video", shopping_platform: "Amazon", accent_color: "#FFC857" },
  { id: 2, title: "Computer / Workstation", description: "Help improve our editing workstation.", target_price: 3000000, quantity_needed: 1, amount_raised: 0, category: "Studio", shopping_platform: "Amazon", accent_color: "#00D9FF" },
  { id: 3, title: "Microphone", description: "Professional microphone for studio recording.", target_price: 300000, quantity_needed: 2, amount_raised: 0, category: "Audio", shopping_platform: "AliExpress", accent_color: "#FFC857" },
  { id: 4, title: "General Support", description: "Any amount helps us grow our creative work.", target_price: 0, quantity_needed: 1, amount_raised: 0, category: "General", shopping_platform: "Direct", accent_color: "#FFC857" }
];

const FALLBACK_ACCOUNTS = [
  { provider: "Stanbic Bank Uganda", account_name: "JM Nexus Studios", account_number: "0123456789012", instructions: "Use your name as payment reference." },
  { provider: "MTN Mobile Money", account_name: "Joel Manda", account_number: "+256 773 486 604", instructions: "Send and share the reference." }
];

function $(id) { return document.getElementById(id); }
function formatUGX(n) { return "UGX " + Number(n || 0).toLocaleString("en-UG"); }
function cleanPhone(n) { return String(n || "").replace(/[^\d]/g, ""); }

function isImage(str) {
  return typeof str === "string" && /\.(png|jpe?g|gif|svg|webp|avif)$/i.test(str.trim());
}
function renderIcon(icon) {
  return isImage(icon) ? `<img src="${icon}" alt="" />` : (icon || "");
}

function categoryEmoji(cat) {
  const map = {
    Video: "📷", Audio: "🎙", Studio: "💻", Digital: "🌐",
    Tech: "🤖", General: "❤", Lighting: "💡", Creative: "🎨"
  };
  return map[cat] || "❤";
}

function loadLogos() {
  document.querySelectorAll(".nav-logo img, #footer .nav-logo img").forEach(img => {
    let triedFallback = false;
    img.onerror = () => {
      if (!triedFallback) { triedFallback = true; img.src = LOGO_FALLBACK; return; }
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
   BOOT
   ========================================================= */
(async function () {
  let SETTINGS = { ...FALLBACK_SETTINGS };
  let CARDS = [];
  let SOCIALS = [];
  let ITEMS = [];
  let ACCOUNTS = [];

  try {
    if (window.JM_SUPABASE) {
      const [setRes, cardRes, socRes, itemRes, acctRes] = await Promise.all([
        window.JM_SUPABASE.from("site_settings").select("*"),
        window.JM_SUPABASE.from("contact_cards").select("*").eq("active", true).order("sort_order"),
        window.JM_SUPABASE.from("contact_socials").select("*").eq("active", true).order("sort_order"),
        window.JM_SUPABASE.from("donation_items").select("*").eq("active", true).order("sort_order"),
        window.JM_SUPABASE.from("payment_accounts").select("*").eq("active", true).order("sort_order")
      ]);
      if (!setRes.error && setRes.data) setRes.data.forEach(r => { SETTINGS[r.key] = r.value; });
      if (!cardRes.error && cardRes.data?.length) CARDS = cardRes.data;
      if (!socRes.error && socRes.data?.length) SOCIALS = socRes.data;
      if (!itemRes.error && itemRes.data?.length) ITEMS = itemRes.data;
      if (!acctRes.error && acctRes.data?.length) ACCOUNTS = acctRes.data;
    }
  } catch (err) { console.warn("Supabase load failed:", err); }

  if (!CARDS.length) CARDS = FALLBACK_CARDS;
  if (!SOCIALS.length) SOCIALS = FALLBACK_SOCIALS;
  if (!ITEMS.length) ITEMS = FALLBACK_ITEMS;
  if (!ACCOUNTS.length) ACCOUNTS = FALLBACK_ACCOUNTS;

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

  /* ---------- RENDER CONTACT CARDS ---------- */
  const cardsEl = $("contact-cards");
  if (cardsEl) {
    cardsEl.innerHTML = CARDS.map(c => `
      <a class="card" href="${c.link || '#'}" ${c.link && c.link.startsWith("http") ? 'target="_blank" rel="noopener"' : ''}>
        <div class="card-icon ${c.tone || 'cyan'}">${renderIcon(c.icon)}</div>
        <h4>${c.title}</h4>
        <p class="card-value">${c.value || c.description || ''}</p>
        <span class="card-action">${c.action_label || "Learn more"} →</span>
      </a>
    `).join("");
  }

  /* ---------- RENDER SOCIALS ---------- */
  const socialsEl = $("social-channels");
  if (socialsEl) {
    socialsEl.innerHTML = SOCIALS.map(s => `
      <a class="social-card" data-tone="${s.tone || 'cyan'}" href="${s.url}" target="_blank" rel="noopener">
        <span class="sc-icon">${renderIcon(s.icon)}</span>
        <h4>${s.platform}</h4>
        <span class="handle">${s.handle || ''}</span>
        <span class="desc">${s.description || ''}</span>
        <span class="visit">Visit Channel →</span>
      </a>
    `).join("");
  }

  /* ---------- FOOTER ---------- */
  const fNav = $("footer-nav");
  if (fNav) fNav.innerHTML = NAV.map(n => `<a href="${n.href}">${n.label}</a>`).join("");
  const fSvc = $("footer-services");
  if (fSvc) {
    const svcLinks = ["Graphic Design", "3D & CGI", "Video Editing", "VFX & Effects", "Web & Apps", "Branding"];
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

  /* ---------- CONTACT FORM ---------- */
  const form = $("contact-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const msg = $("cf-msg");
      msg.hidden = true;

      const name = $("cf-name").value.trim();
      const email = $("cf-email").value.trim();
      const phone = $("cf-phone").value.trim();
      const subject = $("cf-subject").value.trim();
      const message = $("cf-message").value.trim();

      let ok = true;
      ["cf-name","cf-email","cf-message"].forEach(id => $(id).classList.remove("invalid"));
      if (!name) { $("cf-name").classList.add("invalid"); ok = false; }
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) { $("cf-email").classList.add("invalid"); ok = false; }
      if (!message) { $("cf-message").classList.add("invalid"); ok = false; }

      if (!ok) {
        msg.hidden = false;
        msg.className = "form-msg err";
        msg.textContent = "Please fill in all required fields.";
        return;
      }

      const btn = $("cf-submit");
      const lbl = $("cf-label");
      btn.disabled = true;
      lbl.textContent = "Sending…";

      let saved = false;
      try {
        if (window.JM_SUPABASE) {
          const { error } = await window.JM_SUPABASE.from("contact_messages").insert([{ name, email, phone, subject, message }]);
          if (!error) saved = true;
        }
      } catch (err) { console.warn(err); }

      btn.disabled = false;
      lbl.textContent = "Send Message";
      msg.hidden = false;
      msg.className = "form-msg ok";
      msg.textContent = saved ? "✓ Message sent. We'll reply soon." : "✓ Ready — send us a WhatsApp message for a faster reply.";

      if (!saved) {
        const waNumber = cleanPhone(SETTINGS.whatsapp_number);
        const text = `New message\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`;
        window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, "_blank");
      }
      form.reset();
    });
  }

  /* =========================================================
     DRAWER — Donation
     ========================================================= */
  const drawerEl = $("drawer");
  const backdrop = $("drawer-backdrop");
  const drawerBody = $("drawer-scroll");

  const state = {
    mode: "donate-list",
    item: null,
    quantity: 1,
    tab: "buy",       // "buy" (purchase for us) or "money"
    reference: "",
    saved: false
  };

  function openDrawer(mode) {
    if (!drawerEl || !backdrop || !drawerBody) return;
    state.mode = mode;
    state.item = null;
    state.quantity = 1;
    state.tab = "buy";
    renderDrawer();
    drawerEl.classList.add("open");
    drawerEl.setAttribute("aria-hidden", "false");
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
    drawerBody.scrollTop = 0;
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
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawerEl && drawerEl.classList.contains("open")) closeDrawer();
  });

  const heroDonate = $("hero-donate");
  if (heroDonate) heroDonate.addEventListener("click", () => openDrawer("donate-list"));

  function renderDrawer() {
    if (!drawerBody) return;
    if (state.mode === "donate-list")  return renderDonateList();
    if (state.mode === "donate-item")  return renderDonateItem();
    if (state.mode === "donate-form")  return renderDonateForm();
    if (state.mode === "bank")         return renderBank();
    if (state.mode === "success")      return renderSuccess();
  }

  /* ---------- Donate list ---------- */
  function renderDonateList() {
    drawerBody.innerHTML = `
      <div class="dr-head">
        <h2><span class="ic">❤</span> Support JM Nexus Studios</h2>
        <p>Choose how you'd like to support. Buy equipment for us, or donate money directly.</p>
      </div>

      <div class="donate-items">
        ${ITEMS.map(item => {
          const raised = item.amount_raised || 0;
          const target = item.target_price || 0;
          const pct = target > 0 ? Math.min(100, Math.round((raised / target) * 100)) : 0;
          const accent = item.accent_color || "#FFC857";
          return `
            <div class="donate-item" data-item-id="${item.id}">
              <div class="thumb" style="color:${accent}; border:1px solid ${accent}40;">
                ${item.image_url
                  ? `<img src="${item.image_url}" alt="${item.title}" />`
                  : categoryEmoji(item.category)}
              </div>
              <div class="info">
                <h4>${item.title}</h4>
                <p>${item.description || ""}</p>
                <div class="price">${target > 0 ? formatUGX(target) : "Any amount"}</div>
                ${target > 0 ? `
                  <div class="donate-progress"><span style="width:${pct}%;"></span></div>
                  <div class="donate-progress-label">
                    <span>Raised: ${formatUGX(raised)}</span>
                    <span>${pct}%</span>
                  </div>
                ` : ''}
              </div>
              <span class="go">›</span>
            </div>
          `;
        }).join("")}
      </div>
    `;

    drawerBody.querySelectorAll("[data-item-id]").forEach(el => {
      el.addEventListener("click", () => {
        const item = ITEMS.find(x => String(x.id) === String(el.dataset.itemId));
        if (!item) return;
        state.item = item;
        state.quantity = 1;
        state.mode = "donate-item";
        renderDrawer();
      });
    });
  }

  /* ---------- Item preview ---------- */
  function renderDonateItem() {
    const item = state.item;
    if (!item) return;
    const total = (item.target_price || 0) * state.quantity;
    const hasShop = item.shopping_url && item.shopping_platform && item.shopping_platform !== "Direct";

    drawerBody.innerHTML = `
      <button class="btn-back" id="dr-back">← Back to items</button>

      <div class="dr-preview">
        <div class="dr-preview-image" style="color:${item.accent_color || '#FFC857'};">
          ${item.image_url
            ? `<img src="${item.image_url}" alt="${item.title}" />`
            : categoryEmoji(item.category)}
        </div>

        <h3 class="dr-preview-title">${item.title}</h3>
        <p class="dr-preview-desc">${item.description || ""}</p>

        ${item.target_price > 0 ? `
          <div class="dr-preview-price">${formatUGX(item.target_price)}</div>
        ` : `<p style="color:#9AA7B8;font-size:13px;">Any amount is welcome</p>`}

        <div class="qty-row">
          <span class="label">Quantity ${item.category === "General" ? "(any)" : ""}</span>
          <div class="qty-stepper">
            <button type="button" id="qty-minus">−</button>
            <input type="number" id="qty-input" min="1" value="${state.quantity}" readonly />
            <button type="button" id="qty-plus">+</button>
          </div>
        </div>

        ${item.target_price > 0 ? `
          <div class="dr-total">
            <span>Total amount</span>
            <strong id="item-total">${formatUGX(total)}</strong>
          </div>
        ` : ''}

        ${hasShop ? `
          <a class="btn-buy" href="${item.shopping_url}" target="_blank" rel="noopener">
            🛒 View on ${item.shopping_platform}
          </a>
        ` : ''}

        <div class="dr-actions">
          <button class="btn-primary" id="dr-support">
            ${hasShop ? "🛒 Buy This Product For Us" : "Support This Item →"}
          </button>
          <button class="btn-ghost" id="dr-donate-money">
            💰 I Want To Donate Money
          </button>
        </div>
      </div>
    `;

    const back = $("dr-back");
    if (back) back.addEventListener("click", () => {
      state.mode = "donate-list";
      renderDrawer();
    });

    const minus = $("qty-minus");
    const plus = $("qty-plus");
    const qtyInput = $("qty-input");
    const totalEl = $("item-total");
    function updateTotal() {
      if (totalEl) totalEl.textContent = formatUGX((item.target_price || 0) * state.quantity);
      if (qtyInput) qtyInput.value = state.quantity;
    }
    if (minus) minus.addEventListener("click", () => { if (state.quantity > 1) { state.quantity--; updateTotal(); } });
    if (plus) plus.addEventListener("click", () => { state.quantity++; updateTotal(); });

    const support = $("dr-support");
    if (support) support.addEventListener("click", () => {
      state.tab = "buy";
      state.mode = "donate-form";
      renderDrawer();
    });

    const moneyBtn = $("dr-donate-money");
    if (moneyBtn) moneyBtn.addEventListener("click", () => {
      state.tab = "money";
      state.mode = "bank";
      renderDrawer();
    });
  }

  /* ---------- Donation form ---------- */
  function renderDonateForm() {
    const item = state.item;
    if (!item) return;
    const total = (item.target_price || 0) * state.quantity;
    const isBuy = state.tab === "buy";

    drawerBody.innerHTML = `
      <button class="btn-back" id="dr-back">← Back to item</button>

      <div class="dr-head">
        <h2><span class="ic">❤</span> ${isBuy ? "Buy For Us" : "Donate"}</h2>
        <p>You're supporting <strong>${item.title}</strong> × ${state.quantity}${item.target_price > 0 ? ` — Total: <strong style="color:#FFC857;">${formatUGX(total)}</strong>` : ''}</p>
      </div>

      <form class="dr-form" id="donate-form" novalidate>
        <div class="dr-field">
          <label>Your Name <span class="req">*</span></label>
          <input type="text" id="d-name" placeholder="Full name" required />
        </div>
        <div class="dr-field">
          <label>Email</label>
          <input type="email" id="d-email" placeholder="you@example.com" />
        </div>
        <div class="dr-field">
          <label>Phone / WhatsApp</label>
          <input type="tel" id="d-phone" placeholder="+256 ..." />
        </div>

        ${isBuy ? `
          <div class="dr-field">
            <label>Shopping Platform</label>
            <input type="text" id="d-platform" value="${item.shopping_platform || ''}" readonly />
          </div>
          <div class="dr-field">
            <label>Order / Reference Number</label>
            <input type="text" id="d-ref" placeholder="e.g. AMZ-123456789" />
          </div>
          <div class="dr-field">
            <label>Delivery Address / Location</label>
            <input type="text" id="d-location" placeholder="Where should we expect the delivery?" />
          </div>
        ` : `
          <div class="dr-field">
            <label>Amount (UGX) ${item.target_price === 0 ? '<span class="req">*</span>' : ''}</label>
            <input type="number" id="d-amount" value="${item.target_price > 0 ? total : ''}" ${item.target_price === 0 ? 'required' : ''} placeholder="Enter amount" />
          </div>
          <div class="dr-field">
            <label>Payment Method</label>
            <select id="d-method">
              <option value="">Choose payment method</option>
              ${ACCOUNTS.map(a => `<option>${a.provider}</option>`).join("")}
              <option>Other</option>
            </select>
          </div>
          <div class="dr-field">
            <label>Transaction Reference</label>
            <input type="text" id="d-ref" placeholder="Reference number from your payment" />
          </div>
        `}

        <div class="dr-field">
          <label>Message (optional)</label>
          <textarea id="d-message" rows="3" placeholder="Anything you'd like to say?"></textarea>
        </div>

        <div class="dr-actions">
          <button type="submit" class="btn-primary" id="d-submit">
            <span id="d-label">${isBuy ? "Submit Purchase Info" : "Submit Donation Info"}</span> <span>→</span>
          </button>
        </div>

        <p id="d-msg" class="form-msg" hidden></p>
      </form>
    `;

    const back = $("dr-back");
    if (back) back.addEventListener("click", () => {
      state.mode = "donate-item";
      renderDrawer();
    });

    const form = $("donate-form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const msg = $("d-msg");
      msg.hidden = true;

      const name = $("d-name").value.trim();
      const email = $("d-email").value.trim();
      const phone = $("d-phone").value.trim();
      const message = $("d-message").value.trim();
      const ref = $("d-ref")?.value.trim() || "";
      const location = $("d-location")?.value.trim() || "";
      const platform = $("d-platform")?.value || (isBuy ? item.shopping_platform : "");
      const amount = isBuy ? total : Number($("d-amount")?.value || 0);
      const method = $("d-method")?.value || "";

      $("d-name").classList.remove("invalid");
      if (!name) {
        $("d-name").classList.add("invalid");
        msg.hidden = false; msg.className = "form-msg err";
        msg.textContent = "Please enter your name.";
        return;
      }
      if (!isBuy && item.target_price === 0 && amount <= 0) {
        $("d-amount").classList.add("invalid");
        msg.hidden = false; msg.className = "form-msg err";
        msg.textContent = "Please enter the amount you're donating.";
        return;
      }

      const btn = $("d-submit");
      const lbl = $("d-label");
      btn.disabled = true;
      lbl.textContent = "Submitting…";

      const submissionRef = "DON-" + Date.now().toString().slice(-6);
      const payload = {
        reference: submissionRef,
        submission_type: isBuy ? "purchase" : "money",
        donor_name: name,
        donor_email: email || null,
        donor_phone: phone || null,
        item_title: item.title,
        quantity: state.quantity,
        amount: amount || 0,
        payment_method: method || null,
        shopping_platform: platform || null,
        transaction_ref: ref || null,
        delivery_info: isBuy ? location : null,
        location: location || null,
        message: message || null,
        status: "Pending"
      };

      let saved = false;
      try {
        if (window.JM_SUPABASE) {
          const { error } = await window.JM_SUPABASE.from("donation_submissions").insert([payload]);
          if (!error) saved = true; else console.warn(error);
        }
      } catch (err) { console.warn(err); }

      state.reference = submissionRef;
      state.saved = saved;
      state.mode = "success";
      renderDrawer();
    });
  }

  /* ---------- Bank / payment methods ---------- */
  function renderBank() {
    const item = state.item;
    const amountText = item && item.target_price > 0
      ? `for <strong>${item.title}</strong> — ${formatUGX(item.target_price * state.quantity)}`
      : "";

    drawerBody.innerHTML = `
      <button class="btn-back" id="dr-back">← Back to item</button>

      <div class="dr-head">
        <h2><span class="ic">💰</span> Payment Accounts</h2>
        <p>Send your donation ${amountText}. Then click <strong>I Have Paid</strong> to send us the details.</p>
      </div>

      <div class="account-list">
        ${ACCOUNTS.map(a => `
          <div class="account-row">
            <span class="label">${a.provider}</span>
            <span class="value">${a.account_number}</span>
            <button class="copy" data-copy="${a.account_number}" title="Copy">📋</button>
          </div>
          ${a.account_name ? `
          <div class="account-row">
            <span class="label">Account Name</span>
            <span class="value">${a.account_name}</span>
            <button class="copy" data-copy="${a.account_name}" title="Copy">📋</button>
          </div>` : ''}
          ${a.instructions ? `<p style="font-size:11.5px;color:#6C7A8E;padding:0 4px 12px;line-height:1.5;">${a.instructions}</p>` : ''}
        `).join("")}
      </div>

      <div class="dr-actions" style="margin-top:20px;">
        <button class="btn-primary" id="dr-paid">
          ✓ I Have Paid — Send Details
        </button>
      </div>
    `;

    drawerBody.querySelectorAll("[data-copy]").forEach(btn => {
      btn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(btn.dataset.copy);
          btn.classList.add("copied");
          btn.textContent = "✓";
          setTimeout(() => { btn.classList.remove("copied"); btn.textContent = "📋"; }, 1500);
        } catch { prompt("Copy this:", btn.dataset.copy); }
      });
    });

    const back = $("dr-back");
    if (back) back.addEventListener("click", () => {
      state.mode = "donate-item";
      renderDrawer();
    });

    const paid = $("dr-paid");
    if (paid) paid.addEventListener("click", () => {
      state.tab = "money";
      state.mode = "donate-form";
      renderDrawer();
    });
  }

  /* ---------- Success ---------- */
  function renderSuccess() {
    const item = state.item;
    const isBuy = state.tab === "buy";
    const total = isBuy ? (item.target_price || 0) * state.quantity : Number(state.lastAmount || 0);

    const waNumber = cleanPhone(SETTINGS.whatsapp_number);
    const summary = [
      isBuy ? "🛒 JM NEXUS — EQUIPMENT PURCHASE" : "❤ JM NEXUS — DONATION",
      "─────────────────────────────",
      "",
      `Reference:  ${state.reference}`,
      `Item:       ${item.title} × ${state.quantity}`,
      `Amount:     ${formatUGX(total)}`,
      `Donor:      ${$("d-name")?.value || ""}`,
      `Contact:    ${$("d-phone")?.value || $("d-email")?.value || ""}`,
      "",
      `Submitted: ${new Date().toLocaleString()}`
    ].join("\n");

    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(summary)}`;
    const emailUrl = `mailto:${SETTINGS.email}?subject=${encodeURIComponent((isBuy ? "Purchase " : "Donation ") + state.reference)}&body=${encodeURIComponent(summary)}`;

    drawerBody.innerHTML = `
      <div class="dr-success">
        <div class="check">✓</div>
        <h3>Thank You!</h3>
        <span class="ref">Ref: ${state.reference}</span>
        <p>
          ${state.saved
            ? "Your information has been received. Send us a WhatsApp message to confirm."
            : "Please send us a WhatsApp message so we can confirm your support."}
        </p>
        <div class="dr-success-actions">
          <a class="wa" href="${waUrl}" target="_blank" rel="noopener">💬 Send on WhatsApp</a>
          <a class="email" href="${emailUrl}">✉ Send by Email</a>
        </div>
        <button class="btn-back" id="dr-back-final" style="margin-top:20px;">← Back to Contact</button>
      </div>
    `;

    const back = $("dr-back-final");
    if (back) back.addEventListener("click", closeDrawer);
  }

})();