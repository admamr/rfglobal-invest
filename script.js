"use strict";

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const menuBtn = document.querySelector(".menuBtn");
const mobileNav = document.getElementById("mobileNav");

function closeMobileNav() {
  if (!mobileNav || !menuBtn) return;
  mobileNav.setAttribute("hidden", "");
  menuBtn.setAttribute("aria-expanded", "false");
}

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = !mobileNav.hasAttribute("hidden");
    if (isOpen) closeMobileNav();
    else {
      mobileNav.removeAttribute("hidden");
      menuBtn.setAttribute("aria-expanded", "true");
    }
  });

  mobileNav.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.tagName === "A") closeMobileNav();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileNav();
  });
}

const form = document.getElementById("leadForm");
const statusEl = document.getElementById("formStatus");

function setStatus(msg) {
  if (!statusEl) return;
  statusEl.textContent = msg;
}

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = String(form.name?.value || "").trim();
    const phone = String(form.phone?.value || "").trim();
    const email = String(form.email?.value || "").trim();
    const message = String(form.message?.value || "").trim();

    if (!name || !phone || !email) {
      setStatus("נא למלא שם, טלפון, ואימייל");
      return;
    }
    if (!isEmail(email)) {
      setStatus("נא להזין אימייל תקין");
      return;
    }

    const subject = encodeURIComponent("Lead חדש, RF Global");
    const body = encodeURIComponent(
      `שם: ${name}\nטלפון: ${phone}\nאימייל: ${email}\n\nהודעה:\n${
        message || "אין"
      }`
    );

    const to = "YOURFIRMEMAIL@gmail.com";
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}
