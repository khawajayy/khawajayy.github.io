// Add your projects here. Each one becomes a card in the Projects section.
// Fields: title, meta (short tag line), summary, points (list), tags (list),
// link (live URL, optional), code (repo URL, optional), featured (wide card, optional).
const PROJECTS = [
  {
    title: "Investment & Crypto Tracker",
    meta: "Featured · Built with Claude · CI/CD",
    featured: true,
    summary: "A personal crypto and stocks ledger that tracks every trade, my financial goals and my real return against the capital I started with.",
    points: [
      "Average-cost P&L per position plus whole-account return, so losses and recoveries add up correctly",
      "Works offline, with optional Google sign-in and real-time Firebase sync across devices",
      "Full Playwright E2E suite run by a GitHub Actions pipeline: lint, HTML validation, npm audit, tests, then auto-deploy",
      "Branch protection: nothing merges to main unless the E2E check passes",
    ],
    tags: ["JavaScript", "Firebase", "Firestore", "Playwright", "GitHub Actions", "Claude"],
    link: "https://khawajayy.github.io/CryptoTracker/",
    code: "https://github.com/khawajayy/CryptoTracker",
  },
  {
    title: "Week Maxxing",
    meta: "Built with Claude · Supabase",
    summary: "A gamified weekly dashboard for a disciplined 7-day sprint, combining to-dos, notes, habits, analytics and progression.",
    points: [
      "XP, levels, 7 rank tiers and 22 unlockable achievements",
      "Weekly archive with grades, heatmaps and carry-over tasks and notes",
      "Tracks habits, deep work, food macros, fitness and screen time",
    ],
    tags: ["JavaScript", "Supabase", "Claude"],
    link: "https://khawajayy.github.io/WeakWeek/",
    code: "https://github.com/khawajayy/WeakWeek",
  },
  {
    title: "Expense Tracker",
    meta: "Built with Claude · Supabase",
    summary: "A personal finance app that turned my Excel workbook into a synced web app, with debt tracking and monthly analytics.",
    points: [
      "Monthly dashboard of income, expenses, net and spending by category",
      "Debt and net worth register across assets and bank accounts",
      "Supabase auth and Postgres with Row Level Security on every row",
    ],
    tags: ["JavaScript", "Supabase", "Postgres", "Playwright", "Claude"],
    link: "https://khawajayy.github.io/ExpenseTracker/",
    code: "https://github.com/khawajayy/ExpenseTracker",
  },
  {
    title: "Electricity Guru",
    meta: "Built with Antigravity (Gemini)",
    summary: "A manual electricity tracker for Pakistani households: log meter readings and see where your units and bill are heading.",
    points: [
      "Daily consumption and cumulative charts from your meter readings",
      "PKR tariff and billing-cycle day so usage maps to your actual bill",
      "Readings, billing cycles and appliances, with optional cloud sync",
    ],
    tags: ["HTML", "JavaScript", "Antigravity", "Gemini"],
    link: "https://khawajayy.github.io/ElectricityGuru/",
    code: "https://github.com/khawajayy/ElectricityGuru",
  },
  {
    title: "AI-Powered Air Quality Prediction",
    meta: "Android · Web · TensorFlow",
    summary: "Estimates air quality from real-time images using TensorFlow models, on Android and the web.",
    points: [
      "Built the Android and web apps around the ML models",
      "Predicts air quality from live camera input",
      "Validated the model and analyzed its predictions to improve accuracy",
    ],
    tags: ["TensorFlow", "Android", "Web", "Machine learning"],
    link: "",
  },
];

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "text") node.textContent = v;
    else node.setAttribute(k, v);
  }
  for (const c of children) node.append(c);
  return node;
}

function renderProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;
  for (const p of PROJECTS) {
    const card = el("article", { class: "card proj reveal" + (p.featured ? " featured" : "") }, [
      el("p", { class: "meta", text: p.meta }),
      el("h3", { text: p.title }),
      el("p", { text: p.summary }),
    ]);
    if (p.points?.length) {
      card.append(el("ul", { class: "points" }, p.points.map((t) => el("li", { text: t }))));
    }
    if (p.tags?.length) {
      card.append(el("ul", { class: "tags" }, p.tags.map((t) => el("li", { text: t }))));
    }
    const links = [];
    if (p.link) links.push(el("a", { href: p.link, target: "_blank", rel: "noopener", text: "Live app →" }));
    if (p.code) links.push(el("a", { href: p.code, target: "_blank", rel: "noopener", class: "muted", text: "Code on GitHub" }));
    if (links.length) card.append(el("div", { class: "links" }, links));
    grid.append(card);
  }
}

// Terminal "test run" animation in the hero
const TERM_LINES = [
  ["hi", "$ run suite --release 2026.10"],
  ["", ""],
  ["ok", "✓ payments: authorization & settlement     142 passed"],
  ["ok", "✓ payments: 3DS challenge flow              38 passed"],
  ["ok", "✓ emr: scheduling & claims (HL7/EDI)       211 passed"],
  ["ok", "✓ api: contract & integration (Postman)    176 passed"],
  ["bad", "✗ billing: rounding on split claims          1 failed"],
  ["", "  → root cause: decimal cast in claim_line view"],
  ["", "  → JIRA-4821 filed, fix verified, re-run"],
  ["ok", "✓ billing: rounding on split claims          1 passed"],
  ["", ""],
  ["hi", "700+ cases · 0 open blockers · release ready"],
];

function runTerminal() {
  const code = document.querySelector("#term code");
  if (!code) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const caret = el("span", { class: "caret" });

  const addLine = (cls, text) => {
    const line = el("span", cls ? { class: cls } : {});
    line.textContent = text + "\n";
    code.insertBefore(line, caret);
    return line;
  };

  code.append(caret);
  if (reduced) {
    TERM_LINES.forEach(([c, t]) => addLine(c, t));
    return;
  }

  let i = 0;
  const next = () => {
    if (i >= TERM_LINES.length) return;
    const [cls, text] = TERM_LINES[i++];
    if (i === 1) {
      // type the command
      const line = addLine(cls, "");
      let j = 0;
      const type = () => {
        line.textContent = text.slice(0, ++j) + (j >= text.length ? "\n" : "");
        if (j < text.length) setTimeout(type, 35);
        else setTimeout(next, 400);
      };
      type();
    } else {
      addLine(cls, text);
      setTimeout(next, cls === "bad" ? 700 : 260);
    }
  };
  setTimeout(next, 500);
}

function setupNav() {
  const nav = document.querySelector(".nav");
  const btn = document.querySelector(".menu-btn");
  const menu = document.getElementById("menu");
  addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 10), { passive: true });
  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
}

function setupBand() {
  const band = document.querySelector(".band");
  const track = band.querySelector(".band-track");
  const list = track.querySelector(".band-list");
  const clone = list.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  track.append(clone);
  const toggle = band.querySelector(".band-toggle");
  toggle.addEventListener("click", () => {
    const paused = band.classList.toggle("paused");
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.firstChild.textContent = paused ? "Play" : "Pause";
  });
}

function setupReveal() {
  const targets = document.querySelectorAll(".section, .stats, .card, .timeline > li");
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12 }
  );
  targets.forEach((t) => {
    t.classList.add("reveal");
    io.observe(t);
  });
}

function countUp() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const nums = document.querySelectorAll("[data-count]");
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const node = e.target;
      const target = Number(node.dataset.count);
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / 1200);
        node.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.unobserve(node);
    }
  });
  nums.forEach((n) => io.observe(n));
}

document.getElementById("yr").textContent = new Date().getFullYear();
renderProjects();
setupNav();
setupBand();
setupReveal();
countUp();
runTerminal();
