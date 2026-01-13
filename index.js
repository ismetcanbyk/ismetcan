#!/usr/bin/env node

import chalk from "chalk";
import boxen from "boxen";
import { select, intro, outro } from "@clack/prompts";
import fetch from "node-fetch";
import open from "open";
import qrcode from "qrcode-terminal";

console.clear();

/* ===== CONFIG ===== */
const GITHUB = "ismetcanbyk";
const LINKEDIN = "https://linkedin.com/in/ismetcanbyk";
const WEBSITE = "https://ismetcanbyk.me";
const EMAIL = "mailto:ismetcanbyk@gmail.com";



/* ===== GitHub Stats ===== */
async function getGitHubStats() {
  const res = await fetch(`https://api.github.com/users/${GITHUB}`);
  const data = await res.json();
  return {
    repos: data.public_repos,
    followers: data.followers,
  };
}

/* ===== HERO ===== */
async function showHero() {
  const stats = await getGitHubStats();

  const hero = `
${chalk.bold.cyan("İsmet Can Bıyık")}
${chalk.white("Software Engineer | Full-Stack & Backend Focus")}

Production-grade web & mobile systems
Node.js • TypeScript • React • PostgreSQL • MongoDB • Prisma • AWS

Experience:
• Backend Developer at Duosoft
• Full-Stack Engineer at Smart Bee (UK)
• Full-Stack Developer at Elegant Ofis (Elit Hair & Elit Klinik)

GitHub: ${stats.repos} public repos • ${stats.followers} followers
`;

  console.log(
    boxen(hero, {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "cyan",
    })
  );
}


/* ===== PROJECT SELECTOR ===== */
async function showProjects() {
  const project = await select({
    message: "Select a live project to open",
    options: [
      {
        label: "Hayvanım Pazarda — Live marketplace",
        value: "https://www.hayvanimpazarda.com",
      },
      {
        label: "IBANControl — IBAN validation service",
        value: "https://ibancontrol.com/en",
      },
      {
        label: "AI Blog Writer — Open-source AI platform",
        value: "https://github.com/ismetcanbyk/AIBlogWriter",
      },
      {
        label: "← Back",
        value: null,
      },
    ],
  });

  if (project) {
    await open(project);
  }
}


/* ===== MAIN MENU ===== */
async function showMenu() {
  const action = await select({
    message: "What would you like to see?",
    options: [
      { value: "projects", label: "🧩 Live production projects" },
      { value: "github", label: "🧠 GitHub (What am I building?)" },
      { value: "linkedin", label: "🏗 LinkedIn (Experience)" },
      { value: "website", label: "🌐 Personal website" },
      { value: "email", label: "📬 Contact me" },
      { value: "exit", label: "❌ Exit" },
    ],
  });

  if (action === "projects") await showProjects();
  if (action === "github") await open(`https://github.com/${GITHUB}`);
  if (action === "linkedin") await open(LINKEDIN);
  if (action === "website") await open(WEBSITE);
  if (action === "email") await open(EMAIL);

  return action;
}



/* ===== QR ===== */
function showQR() {
  console.log();
  qrcode.generate(LINKEDIN, { small: true });
}

/* ===== RUN ===== */
async function run() {
  let running = true;

  while (running) {
    console.clear();
    await showHero();

    const action = await showMenu();

    if (action === "exit") {
      running = false;
    }
  }

  showQR();
}

await run();

