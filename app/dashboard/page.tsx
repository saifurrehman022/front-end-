// @ts-nocheck
// This file is a self-contained visual/animation component (canvas, WebGL, CSS custom props)
// written as plain JSX. It isn't authored against strict TypeScript, so type-checking is
// skipped here rather than hand-annotating ~55 animation callbacks and ref types.
'use client'
// Beatback: public landing site (dark, lime accent) with a live, cursor-reactive particle-wave hero.
// Single-file React component. Requires only: react and lucide-react.
// All styling is self-contained in the <style> block below (no Tailwind setup needed).
// Content comes from the Beatback Developer Brief. Scoring weights, fraud signals and other
// confidential details are intentionally NOT published here.
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  Music,
  Menu,
  X,
  ArrowRight,
  ArrowDown,
  UserPlus,
  Link2,
  Headphones,
  Video,
  Send,
  ShieldCheck,
  TrendingUp,
  Wallet,
  Lock,
  Users,
  Gift,
  Check,
  Clock,
  GitBranch,
  UserCheck,
  CheckCircle2,
} from "lucide-react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap');

:where(.bb) h1, :where(.bb) h2, :where(.bb) h3, :where(.bb) p, :where(.bb) ul, :where(.bb) ol { margin: 0; padding: 0; }
:where(.bb) ul, :where(.bb) ol { list-style: none; }
:where(.bb) a { color: inherit; text-decoration: none; }
:where(.bb) *, :where(.bb) *::before, :where(.bb) *::after { box-sizing: border-box; }
.bb {
  --lime: #C1FF21;
  position: relative; isolation: isolate; min-height: 100vh; overflow-x: clip;
  background: #0B0F12; color: #e4e4e7;
  font-family: 'Geist', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  font-size: 16px; line-height: 1.55; -webkit-font-smoothing: antialiased;
}
.bb button, .bb input, .bb summary { font: inherit; }
.bb button, .bb summary { cursor: pointer; }
.bb a:focus-visible, .bb button:focus-visible, .bb input:focus-visible, .bb summary:focus-visible { outline: 2px solid var(--lime); outline-offset: 2px; }
.bb .mono { font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace; }
.bb .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.bb section[id] { scroll-margin-top: 72px; }

/* hero background */
.bb .r-canvas { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; max-height: 1100px; z-index: 0; pointer-events: none; }
.bb .r-fade-l { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; max-height: 1100px; z-index: 1; pointer-events: none;
  background: linear-gradient(to right, rgba(11,15,18,.8), rgba(11,15,18,.36) 55%, rgba(11,15,18,.18)); }
.bb .r-content { position: relative; z-index: 10; }

/* nav */
.bb .r-nav { position: sticky; top: 0; z-index: 30; border-bottom: 1px solid rgba(255,255,255,.07);
  background: rgba(11,15,18,.74); -webkit-backdrop-filter: blur(16px); backdrop-filter: blur(16px); }
.bb .r-nav-in { max-width: 1152px; margin: 0 auto; height: 64px; padding: 0 20px;
  display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.bb .r-left { display: flex; align-items: center; gap: 40px; }
.bb .r-right { display: flex; align-items: center; gap: 12px; }
.bb .r-logo { display: flex; align-items: center; gap: 10px; }
.bb .r-logo-mark { width: 32px; height: 32px; border-radius: 8px; background: var(--lime); color: #0B0F12; display: grid; place-items: center; }
.bb .r-logo-text { font-size: 19px; font-weight: 600; letter-spacing: -.02em; color: #fff; }
.bb .r-links { display: none; align-items: center; gap: 28px; font-size: 14px; color: #a1a1aa; }
.bb .r-links a:hover { color: #fff; }
.bb .r-pill { display: none; align-items: center; gap: 8px; border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.06);
  border-radius: 999px; padding: 6px 12px; font-size: 12.5px; color: #d4d4d8; white-space: nowrap; }
.bb .r-btn-sm { height: 40px; display: inline-flex; align-items: center; padding: 0 16px; border-radius: 8px;
  background: var(--lime); color: #0B0F12; font-size: 14px; font-weight: 600; transition: filter .2s; white-space: nowrap; }
.bb .r-btn-sm:hover { filter: brightness(1.1); }
.bb .r-menu-btn { width: 40px; height: 40px; display: grid; place-items: center; border-radius: 8px;
  border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.06); color: #d4d4d8; }
.bb .r-mobile { border-top: 1px solid rgba(255,255,255,.07); background: rgba(11,15,18,.97); padding: 12px 20px 16px; }
.bb .r-mobile a { display: block; padding: 12px 0; font-size: 16px; color: #e4e4e7; }
.bb .r-mobile .r-pill { display: inline-flex; margin-top: 8px; }

.bb .r-dot { position: relative; display: inline-block; width: 8px; height: 8px; flex: none; }
.bb .r-dot i { position: absolute; inset: 0; border-radius: 999px; background: var(--lime); }
.bb .r-dot i:first-child { opacity: .6; animation: r-ping 1.5s cubic-bezier(0,0,.2,1) infinite; }
@keyframes r-ping { 75%, 100% { transform: scale(2.3); opacity: 0; } }

/* hero */
.bb .r-hero { max-width: 1152px; margin: 0 auto; padding: 56px 20px 96px;
  display: grid; grid-template-columns: minmax(0,1fr); gap: 48px; align-items: center; }
.bb .r-badge { display: inline-flex; align-items: center; flex-wrap: wrap; gap: 8px; border: 1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.06); border-radius: 999px; padding: 6px 14px; font-size: 13px; color: #e4e4e7; }
.bb .r-badge .bullet { width: 6px; height: 6px; border-radius: 999px; background: var(--lime); }
.bb .sep { color: #52525b; }
.bb .dim { color: #a1a1aa; }
.bb .r-h1 { margin-top: 24px; font-family: 'Instrument Serif', Georgia, 'Times New Roman', serif;
  font-size: clamp(46px, 7.4vw, 86px); font-weight: 400; line-height: .98; letter-spacing: -.02em; color: #fff; }
.bb .r-h1 em, .bb .r-h2 em { font-style: italic; color: var(--lime); }
.bb .r-lead { margin-top: 24px; max-width: 48ch; font-size: 17px; line-height: 1.65; color: #b4b4bd; }
.bb .r-cta { margin-top: 32px; display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
.bb .r-btn-primary { height: 48px; display: inline-flex; align-items: center; gap: 8px; padding: 0 24px; border-radius: 12px; border: 0;
  background: var(--lime); color: #0B0F12; font-size: 15px; font-weight: 600;
  box-shadow: 0 0 32px rgba(193,255,33,.35); transition: box-shadow .25s; }
.bb .r-btn-primary:hover { box-shadow: 0 0 46px rgba(193,255,33,.55); }
.bb .r-btn-ghost { height: 48px; display: inline-flex; align-items: center; gap: 10px; padding: 0 20px; border-radius: 12px;
  border: 1px solid rgba(255,255,255,.14); background: rgba(255,255,255,.06); color: #fff; font-size: 15px; font-weight: 500; transition: background .2s; }
.bb .r-btn-ghost:hover { background: rgba(255,255,255,.12); }
.bb .r-micro { margin-top: 20px; font-size: 13.5px; line-height: 1.7; color: #8b8b95; }
.bb .r-micro .sep { margin: 0 6px; }

/* dashboard panel */
.bb .r-panel { min-width: 0; border-radius: 16px; border: 1px solid rgba(255,255,255,.12); background: rgba(20,26,30,.66);
  box-shadow: 0 30px 80px -20px rgba(0,0,0,.75); -webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px); }
.bb .r-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; border-bottom: 1px solid rgba(255,255,255,.07); padding: 12px 16px; }
.bb .r-bar-l { display: flex; align-items: center; gap: 12px; min-width: 0; }
.bb .r-dots { display: flex; gap: 6px; }
.bb .r-dots span { width: 10px; height: 10px; border-radius: 999px; background: rgba(255,255,255,.18); }
.bb .r-file { font-size: 12px; color: #a1a1aa; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.bb .r-live { border-radius: 999px; background: rgba(193,255,33,.14); color: var(--lime); padding: 2px 8px; font-size: 11px; font-weight: 500; white-space: nowrap; }
.bb .r-body { padding: 16px; }
.bb .r-logwrap { border-top: 1px solid rgba(255,255,255,.07); }

/* nodes */
.bb .r-node { border-radius: 12px; border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.05); padding: 12px; min-width: 0; }
.bb .r-node.ring { border-color: rgba(193,255,33,.45); box-shadow: 0 0 28px -8px rgba(193,255,33,.45); }
.bb .r-node-row { display: flex; align-items: flex-start; gap: 12px; }
.bb .r-node.stack .r-node-row { flex-direction: column; gap: 10px; }
.bb .r-ico { width: 32px; height: 32px; flex: none; border-radius: 8px; display: grid; place-items: center; }
.bb .r-ico.zinc { background: rgba(255,255,255,.08); color: #d4d4d8; }
.bb .r-ico.lime { background: rgba(193,255,33,.15); color: var(--lime); }
.bb .r-ico.amber { background: rgba(251,191,36,.15); color: #fcd34d; }
.bb .r-node-title { font-size: 14px; font-weight: 500; line-height: 1.35; color: #fff; }
.bb .r-node-meta { margin-top: 2px; font-size: 12px; color: #8b8b95; }
.bb .r-node-tag { margin-top: 12px; }
.bb .r-tag { display: inline-flex; align-items: center; gap: 4px; border-radius: 999px; padding: 2px 8px; font-size: 11px; font-weight: 500; }
.bb .r-tag.amber { background: rgba(251,191,36,.15); color: #fcd34d; box-shadow: inset 0 0 0 1px rgba(251,191,36,.35); }
.bb .r-tag.lime { background: rgba(193,255,33,.12); color: var(--lime); box-shadow: inset 0 0 0 1px rgba(193,255,33,.35); }
.bb .flow-v { width: 2px; height: 24px; margin: 0 auto;
  background: repeating-linear-gradient(to bottom, rgba(193,255,33,.8) 0 4px, transparent 4px 8px); animation: r-flow-y .9s linear infinite; }
@keyframes r-flow-y { to { background-position: 0 8px; } }
.bb .r-split { position: relative; height: 56px; }
.bb .r-split svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.bb .flow-path { stroke-dasharray: 5 4; animation: r-dash .9s linear infinite; }
@keyframes r-dash { to { stroke-dashoffset: -9; } }
.bb .r-lbl { position: absolute; top: 46%; transform: translate(-50%,-50%); border-radius: 999px; padding: 2px 8px; font-size: 11px; font-weight: 500; }
.bb .r-lbl.t { left: 34%; border: 1px solid rgba(193,255,33,.45); background: #10160f; color: var(--lime); }
.bb .r-lbl.f { left: 66%; border: 1px solid rgba(251,113,133,.45); background: #1a1014; color: #fda4af; }
.bb .r-branches { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 12px; }

/* log */
.bb .r-log-head { display: flex; align-items: center; justify-content: space-between; padding: 16px 16px 8px; }
.bb .r-log-title { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; color: #d4d4d8; }
.bb .r-log-note { font-size: 11px; color: #71717a; }
.bb table.r-table { width: 100%; table-layout: fixed; border-collapse: collapse; text-align: left; }
.bb .r-table .c-time { width: 104px; }
.bb .r-table .c-st { width: 82px; }
.bb .r-table th { padding: 6px 0; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: .06em; color: #71717a;
  border-top: 1px solid rgba(255,255,255,.07); border-bottom: 1px solid rgba(255,255,255,.07); }
.bb .r-table th:last-child, .bb .r-table td:last-child { text-align: right; }
.bb .r-table th:first-child, .bb .r-table td:first-child { padding-left: 16px; }
.bb .r-table th:last-child, .bb .r-table td:last-child { padding-right: 16px; }
.bb .r-logwin { height: 186px; overflow: hidden; -webkit-mask-image: linear-gradient(to bottom,#000 72%,transparent); mask-image: linear-gradient(to bottom,#000 72%,transparent); }
.bb .r-table td { padding: 7px 0; font-size: 12.5px; border-bottom: 1px solid rgba(255,255,255,.05); color: #e4e4e7; }
.bb .r-table td.time { font-size: 11.5px; color: #8b8b95; white-space: nowrap; }
.bb .r-table td.ev { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding-right: 8px; }
.bb .chip { display: inline-block; border-radius: 999px; padding: 1px 8px; font-size: 11px; font-weight: 500; }
.bb .chip.pending { background: rgba(255,255,255,.08); color: #d4d4d8; }
.bb .chip.verified { background: rgba(193,255,33,.14); color: var(--lime); }
.bb .chip.review { background: rgba(251,191,36,.15); color: #fcd34d; }
.bb .chip.rejected { background: rgba(251,113,133,.15); color: #fda4af; }
.bb .row-in { animation: r-row-in .35s ease-out; }
@keyframes r-row-in { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }

/* sections */
.bb .sec { max-width: 1152px; margin: 0 auto; padding: 72px 20px; }
.bb .sec-head { max-width: 720px; }
.bb .eyebrow { font-size: 12px; font-weight: 500; letter-spacing: .14em; text-transform: uppercase; color: var(--lime); }
.bb .r-h2 { margin-top: 12px; font-family: 'Instrument Serif', Georgia, 'Times New Roman', serif; font-weight: 400;
  font-size: clamp(36px, 5.2vw, 56px); line-height: 1.02; letter-spacing: -.02em; color: #fff; }
.bb .sec-sub { margin-top: 16px; font-size: 17px; line-height: 1.65; color: #a8a8b2; max-width: 60ch; }
.bb .divider { border: 0; border-top: 1px solid rgba(255,255,255,.07); max-width: 1152px; margin: 0 auto; }
.bb .card { border: 1px solid rgba(255,255,255,.1); background: rgba(13,18,21,.78); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); border-radius: 16px; padding: 22px; min-width: 0; }
.bb .card h3 { font-size: 17px; font-weight: 600; color: #fff; line-height: 1.3; }
.bb .card p { margin-top: 8px; font-size: 15px; line-height: 1.6; color: #a8a8b2; }

/* loop */
.bb .loop { display: grid; gap: 10px; grid-template-columns: minmax(0,1fr); margin-top: 32px; }
.bb .loop-item { display: flex; align-items: center; gap: 12px; border: 1px solid rgba(255,255,255,.1); background: rgba(13,18,21,.78);
  border-radius: 14px; padding: 16px 18px; font-size: 17px; font-weight: 500; color: #fff; }
.bb .loop-item .ico { color: var(--lime); flex: none; display: grid; }
.bb .loop-arrow { display: none; }
.bb .loop-note { margin-top: 20px; font-size: 14px; color: #8b8b95; }

/* steps */
.bb .steps { display: grid; gap: 14px; margin-top: 40px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr)); }
.bb .step .num { font-size: 12px; color: var(--lime); letter-spacing: .1em; }
.bb .step .r-ico { margin-top: 14px; margin-bottom: 14px; }
.bb .step h3 { font-size: 17px; }
.bb .journeys { display: grid; gap: 14px; margin-top: 14px; }
.bb .admin-note { margin-top: 24px; font-size: 14px; color: #8b8b95; }

/* two column blocks */
.bb .split2 { display: grid; gap: 32px; margin-top: 40px; grid-template-columns: minmax(0,1fr); align-items: start; }
.bb .life { display: grid; gap: 0; }
.bb .life li { position: relative; display: grid; grid-template-columns: 28px minmax(0,1fr); gap: 14px; padding-bottom: 22px; }
.bb .life li:last-child { padding-bottom: 0; }
.bb .life li::before { content: ""; position: absolute; left: 13px; top: 28px; bottom: 0; width: 2px; background: rgba(255,255,255,.1); }
.bb .life li:last-child::before { display: none; }
.bb .life .dot { width: 28px; height: 28px; border-radius: 999px; border: 1px solid rgba(193,255,33,.5); background: rgba(193,255,33,.1);
  display: grid; place-items: center; color: var(--lime); font-size: 11px; }
.bb .life .t { font-size: 16px; font-weight: 600; color: #fff; }
.bb .life .d { margin-top: 2px; font-size: 14.5px; color: #a8a8b2; line-height: 1.55; }
.bb .calc { padding: 22px; }
.bb .calc .lbl { font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: #8b8b95; }
.bb .formula { margin-top: 10px; font-family: 'Instrument Serif', Georgia, serif; font-size: clamp(22px, 3vw, 28px); line-height: 1.25; color: #fff; }
.bb .formula em { color: var(--lime); }
.bb .bars { margin-top: 22px; display: grid; gap: 14px; }
.bb .bar-row .head { display: flex; justify-content: space-between; gap: 12px; font-size: 13.5px; color: #c4c4cc; margin-bottom: 6px; }
.bb .bar-row .head b { font-weight: 600; color: #fff; }
.bb .track { height: 10px; border-radius: 999px; background: rgba(255,255,255,.08); overflow: hidden; }
.bb .track i { display: block; height: 100%; border-radius: 999px; background: var(--lime); }
.bb .track.mid i { background: rgba(193,255,33,.6); }
.bb .track.low i { background: rgba(193,255,33,.35); }
.bb .fine { margin-top: 18px; font-size: 13px; color: #8b8b95; line-height: 1.55; }
.bb .factors { margin-top: 20px; display: grid; gap: 10px; }
.bb .factors li { display: grid; grid-template-columns: 20px minmax(0,1fr); gap: 10px; font-size: 15px; color: #c4c4cc; }
.bb .factors .ck { color: var(--lime); margin-top: 3px; }

/* verification */
.bb .layers { display: grid; gap: 14px; margin-top: 40px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); }
.bb .layer .top { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 14px; }
.bb .legend { margin-top: 14px; display: flex; flex-wrap: wrap; gap: 8px; }
.bb .supported { margin-top: 14px; display: grid; gap: 14px; }

/* money facts */
.bb .facts { display: grid; gap: 12px; margin-top: 40px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr)); }
.bb .fact { border-top: 2px solid var(--lime); padding: 16px 0 0; }
.bb .fact .big { font-family: 'Instrument Serif', Georgia, serif; font-size: clamp(44px, 6vw, 60px); line-height: 1; color: #fff; }
.bb .fact .cap { margin-top: 8px; font-size: 15px; color: #a8a8b2; line-height: 1.5; }
.bb .checks { margin-top: 18px; display: grid; gap: 12px; }
.bb .checks li { display: grid; grid-template-columns: 22px minmax(0,1fr); gap: 10px; font-size: 15px; color: #c4c4cc; line-height: 1.55; }
.bb .checks .ck { color: var(--lime); margin-top: 3px; }

/* trust */
.bb .trust { display: grid; gap: 14px; margin-top: 40px; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); }
.bb .trust .r-ico { margin-bottom: 14px; }

/* faq */
.bb .faq { margin-top: 36px; max-width: 820px; border-top: 1px solid rgba(255,255,255,.1); }
.bb .faq details { border-bottom: 1px solid rgba(255,255,255,.1); }
.bb .faq summary { list-style: none; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 20px 0; font-size: 18px; font-weight: 500; color: #fff; }
.bb .faq summary::-webkit-details-marker { display: none; }
.bb .faq summary .plus { flex: none; width: 28px; height: 28px; border-radius: 999px; border: 1px solid rgba(255,255,255,.2); display: grid; place-items: center; color: #d4d4d8; transition: transform .2s; }
.bb .faq details[open] summary .plus { transform: rotate(45deg); border-color: var(--lime); color: var(--lime); }
.bb .faq .ans { padding: 0 44px 22px 0; font-size: 16px; line-height: 1.7; color: #a8a8b2; }

/* cta + footer */
.bb .cta-band { max-width: 1152px; margin: 0 auto; padding: 0 20px 72px; }
.bb .cta-box { border-radius: 24px; border: 1px solid rgba(193,255,33,.3); padding: 44px 22px; text-align: center;
  background: radial-gradient(80% 140% at 50% 0%, rgba(193,255,33,.16), rgba(193,255,33,0) 70%), #10161a; }
.bb .cta-box .r-h2 { max-width: 16ch; margin: 12px auto 0; }
.bb .cta-box p.sub { margin: 16px auto 0; max-width: 46ch; color: #a8a8b2; font-size: 17px; }
.bb .cta-form { margin: 28px auto 0; max-width: 480px; display: flex; flex-wrap: wrap; gap: 10px; }
.bb .cta-form input { flex: 1 1 220px; min-width: 0; height: 48px; padding: 0 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,.15); background: rgba(255,255,255,.07); color: #fff; }
.bb .cta-form input::placeholder { color: #8b8b95; }
.bb .cta-ok { margin-top: 28px; color: var(--lime); font-weight: 500; }
.bb .cta-fine { margin-top: 14px; font-size: 13px; color: #8b8b95; }
.bb footer { border-top: 1px solid rgba(255,255,255,.08); background: #0B0F12; position: relative; }
.bb .foot { max-width: 1152px; margin: 0 auto; padding: 40px 20px 48px; display: grid; gap: 28px; grid-template-columns: minmax(0,1fr); }
.bb .foot p { font-size: 14px; color: #8b8b95; line-height: 1.6; max-width: 56ch; }
.bb .foot .links { display: flex; flex-wrap: wrap; gap: 8px 22px; font-size: 14px; color: #a1a1aa; }
.bb .foot .links a:hover { color: #fff; }

/* hero entrance (finishes on its own, content is never left hidden) */
@keyframes r-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
.bb .rv { animation: r-rise .8s cubic-bezier(.2,.7,.2,1) both; animation-delay: var(--d, 0s); }

/* 3D tilt stage for the dashboard panel */
.bb .stage { position: relative; min-width: 0; --tx: 0; --ty: 0; }
.bb .stage .r-panel { position: relative; will-change: transform;
  transform: perspective(1400px) rotateY(calc(var(--tx) * 7deg)) rotateX(calc(var(--ty) * -5deg)); }
.bb .stage .r-panel::after { content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  background: radial-gradient(420px circle at calc(50% + var(--tx) * 45%) calc(35% + var(--ty) * 45%), rgba(193,255,33,.09), rgba(193,255,33,0) 62%); }
.bb .float-chip { display: none; position: absolute; z-index: 3; pointer-events: none; align-items: center; gap: 8px;
  border-radius: 12px; padding: 9px 13px; font-size: 13px; font-weight: 500; color: #fff; white-space: nowrap;
  border: 1px solid rgba(255,255,255,.14); background: rgba(16,22,26,.82); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
  box-shadow: 0 18px 40px -12px rgba(0,0,0,.7);
  transform: translate(calc(var(--tx) * var(--m, 16) * 1px), calc(var(--ty) * var(--m, 16) * .7px)); }
.bb .float-chip .ci { width: 22px; height: 22px; border-radius: 7px; display: grid; place-items: center; background: rgba(193,255,33,.16); color: var(--lime); }
.bb .float-chip.amber .ci { background: rgba(251,191,36,.16); color: #fcd34d; }
.bb .float-chip small { display: block; font-size: 11px; font-weight: 400; color: #8b8b95; line-height: 1.2; }

/* card polish: lift + cursor spotlight */
.bb .card { position: relative; overflow: hidden; transition: transform .25s ease, border-color .25s ease, background .25s ease; }
.bb .card > * { position: relative; }
.bb .card::before { content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity .25s;
  background: radial-gradient(280px circle at var(--mx, 50%) var(--my, 0%), rgba(193,255,33,.11), rgba(193,255,33,0) 70%); }
.bb .card:hover { transform: translateY(-3px); border-color: rgba(193,255,33,.35); }
.bb .card:hover::before { opacity: 1; }

@media (min-width: 640px) {
  .bb .r-nav-in { padding: 0 32px; }
  .bb .r-hero { padding-left: 32px; padding-right: 32px; }
  .bb .r-lead { font-size: 18px; }
  .bb .r-body { padding: 20px; }
  .bb .r-bar { padding: 12px 20px; }
  .bb .r-log-head { padding: 16px 20px 8px; }
  .bb .r-table .c-time { width: 116px; }
  .bb .r-table th:first-child, .bb .r-table td:first-child { padding-left: 20px; }
  .bb .r-table th:last-child, .bb .r-table td:last-child { padding-right: 20px; }
  .bb .sec { padding: 88px 32px; }
  .bb .cta-band { padding: 0 32px 88px; }
  .bb .cta-box { padding: 64px 32px; }
  .bb .foot { padding: 48px 32px 56px; }
  .bb .journeys { grid-template-columns: repeat(2, minmax(0,1fr)); }
}
@media (min-width: 768px) {
  .bb .r-links { display: flex; }
  .bb .r-menu-btn, .bb .r-mobile { display: none; }
  .bb .loop { grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr; align-items: center; }
  .bb .loop-arrow { display: grid; color: #52525b; }
  .bb .split2 { grid-template-columns: repeat(2, minmax(0,1fr)); gap: 48px; }
  .bb .foot { grid-template-columns: 1.4fr 1fr; align-items: start; }
  .bb .foot .links { justify-content: flex-end; }
}
@media (min-width: 1024px) {
  .bb .float-chip { display: inline-flex; }
  .bb .r-nav .r-pill { display: inline-flex; }
  .bb .r-hero { grid-template-columns: minmax(0,1.02fr) minmax(0,1fr); gap: 56px; padding-top: 96px; }
}
@media (prefers-reduced-motion: reduce) {
  .bb .flow-v, .bb .flow-path, .bb .row-in, .bb .r-dot i:first-child, .bb .rv { animation: none; }
  .bb .faq summary .plus, .bb .card { transition: none; }
  .bb .card:hover { transform: none; }
  .bb .stage .r-panel { transform: none; }
  .bb .float-chip { transform: none; }
}

/* sample reel: phone-framed video + waveform, open-source placeholder clip */
.bb .reels { display: grid; gap: 40px; margin-top: 40px; grid-template-columns: minmax(0,1fr); align-items: center; }
.bb .reel-phone { justify-self: center; width: 100%; max-width: 260px; aspect-ratio: 9/16; border-radius: 28px;
  border: 1px solid rgba(255,255,255,.14); background: #000; overflow: hidden; position: relative;
  box-shadow: 0 30px 80px -20px rgba(0,0,0,.8); }
.bb .reel-phone video { width: 100%; height: 100%; object-fit: cover; display: block; }
.bb .reel-notch { position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 72px; height: 18px;
  border-radius: 999px; background: rgba(0,0,0,.55); z-index: 2; }
.bb .reel-caption { position: absolute; left: 14px; right: 14px; bottom: 14px; z-index: 2; color: #fff; }
.bb .reel-caption .handle { font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 6px; }
.bb .reel-caption .sound { margin-top: 4px; font-size: 11.5px; color: #d4d4d8; display: flex; align-items: center; gap: 6px; }
.bb .reel-tag { position: absolute; top: 14px; right: 14px; z-index: 2; }
.bb .wave { display: flex; align-items: flex-end; gap: 3px; height: 46px; }
.bb .wave span { width: 3px; border-radius: 2px; background: var(--lime); opacity: .55; }
.bb .wave span.on { opacity: 1; }
.bb .reel-player { display: flex; align-items: center; gap: 12px; margin-top: 16px; }
.bb .reel-play { width: 40px; height: 40px; border-radius: 999px; border: 1px solid rgba(193,255,33,.5); background: rgba(193,255,33,.1);
  display: grid; place-items: center; color: var(--lime); flex: none; }
.bb .reel-note { margin-top: 16px; }
@media (min-width: 768px) {
  .bb .reels { grid-template-columns: minmax(0,0.8fr) minmax(0,1.2fr); gap: 56px; }
}
`;

/* ------------------------------------------------------------------ */
/* Hero background: dense lime particle ribbons on a 2D canvas         */
/* ------------------------------------------------------------------ */

function makeSprite() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  if (!g) return c;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(240,255,190,1)");
  grad.addColorStop(0.16, "rgba(193,255,33,0.95)");
  grad.addColorStop(0.45, "rgba(193,255,33,0.22)");
  grad.addColorStop(1, "rgba(193,255,33,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return c;
}

function Particles2D() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sprite = makeSprite();
    const TAU = Math.PI * 2;
    const LANES = 5;

    const ribbons = Array.from({ length: 6 }, (_, i) => ({
      pos: 0.12 + i * 0.13,
      amp: 0.045 + (i % 3) * 0.022,
      k: 0.8 + i * 0.19,
      speed: 0.55 + i * 0.09,
      phase: i * 1.9,
      width: 22 + i * 6,
      dir: i % 2 ? 1 : -1,
    }));

    let W = 0;
    let H = 0;
    let raf = 0;
    const m = { cx: 0, cy: 0, x: 0, y: 0, p: 0, tp: 0 };

    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      const stage = Math.min(H, 860);
      const top = 70;
      const N = W < 640 ? 80 : 150;
      const sigma = W < 640 ? 130 : 200;
      const s2 = 2 * sigma * sigma;

      for (const r of ribbons) {
        for (let j = 0; j < LANES; j++) {
          const lane = (j / (LANES - 1)) * 2 - 1;
          for (let i = 0; i < N; i++) {
            const u = i / (N - 1);
            let x = -40 + u * (W + 80);
            const th = u * 3.4 + t * 0.45 + r.phase;
            const wave =
              (Math.sin(u * r.k * TAU + t * r.speed + r.phase) +
                0.35 * Math.sin(u * r.k * 2.3 * TAU - t * r.speed * 0.7)) *
              r.amp *
              stage;
            let y = top + r.pos * stage + wave + lane * r.width * Math.cos(th);
            const depth = (Math.sin(th) + 1) / 2;

            let glow = 0;
            if (m.p > 0.01) {
              const dx = x - m.x;
              const dy = y - m.y;
              const f = Math.exp(-(dx * dx + dy * dy) / s2) * m.p;
              if (f > 0.003) {
                const a = f * 1.15 * r.dir;
                const c = Math.cos(a);
                const s = Math.sin(a);
                const k = 1 - f * 0.3;
                x = m.x + (dx * c - dy * s) * k;
                y = m.y + (dx * s + dy * c) * k;
                glow = f;
              }
            }

            const fade = Math.min(1, u * 7, (1 - u) * 7);
            const alpha = Math.min(1, (0.2 + 0.45 * depth) * (1 + glow * 1.6)) * fade;
            const size = 7 + depth * 6 + glow * 7;
            ctx.globalAlpha = alpha;
            ctx.drawImage(sprite, x - size / 2, y - size / 2, size, size);
          }
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce.matches) draw(0);
    }

    function tick(now) {
      const rect = canvas.getBoundingClientRect();
      m.x += (m.cx - rect.left - m.x) * 0.1;
      m.y += (m.cy - rect.top - m.y) * 0.1;
      m.p += (m.tp - m.p) * 0.06;
      draw(now / 1000);
      raf = requestAnimationFrame(tick);
    }

    const onMove = (e) => {
      if (reduce.matches) return;
      const rect = canvas.getBoundingClientRect();
      if (m.p < 0.05) {
        m.x = e.clientX - rect.left;
        m.y = e.clientY - rect.top;
      }
      m.cx = e.clientX;
      m.cy = e.clientY;
      m.tp = 1;
    };
    const onLeave = () => {
      m.tp = 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    if (!reduce.matches) raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onLeave);
    window.addEventListener("blur", onLeave);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onLeave);
      window.removeEventListener("blur", onLeave);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="r-canvas" />;
}

/* ------------------------------------------------------------------ */
/* Hero background in real 3D (Three.js, GPU-animated particle ribbons) */
/* ------------------------------------------------------------------ */

const VERT = `
uniform float uTime;
uniform vec3 uMouse;
uniform float uPower;
uniform float uPx;
uniform float uSpread;   // visible width of the scene
uniform float uSpreadY;  // visible height of the scene
uniform float uDist;
uniform float uStatic;   // 1 = show fully grown lines (reduced motion)
attribute vec3 aSeed;    // x: position along the ribbon (0..1), y: lane (-1..1), z: ribbon index
varying float vAlpha;
varying float vHot;

void main() {
  float u = aSeed.x;
  float lane = aSeed.y;
  float id = aSeed.z;

  // ribbons 0-6 run sideways (even ids left to right, odd ids right to left), 7-9 run top to bottom
  float isV = step(6.5, id);
  float dirH = mod(id, 2.0) < 1.0 ? 1.0 : -1.0;
  float s = (isV > 0.5 || dirH > 0.0) ? u : 1.0 - u;   // progress along the direction of travel

  float ph = id * 1.9;
  float k = 0.8 + id * 0.15;
  float sp = 0.55 + id * 0.07;
  float amp = 0.55 + mod(id, 3.0) * 0.22;
  float wid = 0.5 + mod(id, 5.0) * 0.14;

  // the ribbon twists around its own centre line, so it has real depth
  float th = u * 3.4 + uTime * 0.45 + ph;
  float wave = (sin(u * k * 6.2831 + uTime * sp + ph) + 0.35 * sin(u * k * 2.3 * 6.2831 - uTime * sp * 0.7)) * amp;
  float cross1 = lane * wid * cos(th);
  float cross2 = lane * wid * sin(th) * 1.9;

  vec3 p;
  if (isV > 0.5) {
    float vi = id - 7.0;
    p.y = (0.5 - u) * uSpreadY;
    p.x = (vi - 1.0) * uSpread * 0.24 + wave * 0.9 + cross1;
    p.z = (vi - 1.0) * 0.8 + cross2;
  } else {
    p.x = (u - 0.5) * uSpread;
    p.y = (id - 3.0) * 1.05 + wave + cross1;
    p.z = (id - 3.0) * 0.6 + cross2;
  }

  // growth: each line draws itself in from its start edge, then its tail slides off the far edge
  float period = 7.0 + mod(id, 3.0) * 1.6;
  float c = fract(uTime / period + id * 0.37);
  float head = clamp(c * 1.5, 0.0, 1.0);
  float tail = clamp((c - 0.333) * 1.5, 0.0, 1.0);
  float hf = head >= 0.999 ? 1.0 : 1.0 - smoothstep(head - 0.12, head, s);
  float tf = tail <= 0.001 ? 1.0 : smoothstep(tail, tail + 0.12, s);
  float behind = head - s;
  float comet = (head < 0.999 && behind >= 0.0) ? exp(-behind * 22.0) : 0.0;
  float vis = hf * tf;
  if (uStatic > 0.5) { vis = 1.0; comet = 0.0; }

  // cursor: swirl the ribbons around it and lift them toward the camera
  vec2 d = p.xy - uMouse.xy;
  float f = exp(-dot(d, d) / 9.68) * uPower;
  float dir = mod(id, 2.0) < 1.0 ? -1.0 : 1.0;
  float a = f * 1.2 * dir;
  float cs = cos(a);
  float sn = sin(a);
  p.xy = uMouse.xy + vec2(d.x * cs - d.y * sn, d.x * sn + d.y * cs) * (1.0 - f * 0.3);
  p.z += f * 2.6;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;

  float facing = sin(th) * 0.5 + 0.5;
  float depth = clamp(1.0 - (-mv.z - uDist * 0.55) / (uDist * 0.9), 0.0, 1.0);

  vAlpha = (0.26 + 0.5 * facing + f * 0.9 + comet * 0.8) * vis * (0.45 + 0.55 * depth) * 0.85;
  vHot = f + comet;
  gl_PointSize = (1.6 + facing * 1.5 + f * 3.0 + comet * 2.2) * 2.6 * uPx * (uDist / -mv.z);
}
`;

const FRAG = `
precision mediump float;
varying float vAlpha;
varying float vHot;
void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  if (d > 0.5) discard;
  float core = 1.0 - smoothstep(0.0, 0.5, d);
  float a = pow(core, 1.6) * vAlpha;
  vec3 lime = vec3(0.757, 1.0, 0.129);
  vec3 col = mix(lime, vec3(0.94, 1.0, 0.75), pow(core, 4.0) * 0.9 + vHot * 0.4);
  gl_FragColor = vec4(col, a);
}
`;

function ParticlesGL({ onFail }: { onFail: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    let renderer;
    try {
      if (!THREE || !THREE.WebGLRenderer) throw new Error("three.js not available");
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch (err) {
      onFail();
      return undefined;
    }
    renderer.setClearColor(0x000000, 0);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const FOV = 45;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 300);
    const group = new THREE.Group();
    scene.add(group);

    const small = window.innerWidth < 640;
    const RIBBONS = 10;
    const LANES = 6;
    const N = small ? 130 : 220;
    const count = RIBBONS * LANES * N;
    const seed = new Float32Array(count * 3);
    let n = 0;
    for (let r = 0; r < RIBBONS; r++) {
      for (let l = 0; l < LANES; l++) {
        for (let i = 0; i < N; i++) {
          seed[n++] = i / (N - 1);
          seed[n++] = (l / (LANES - 1)) * 2 - 1;
          seed[n++] = r;
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 3));

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(999, 999, 0) },
      uPower: { value: 0 },
      uPx: { value: 1 },
      uSpread: { value: 22 },
      uSpreadY: { value: 16 },
      uStatic: { value: reduce.matches ? 1 : 0 },
      uDist: { value: 18 },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    group.add(points);

    const m = { nx: 0, ny: 0, sx: 0, sy: 0, tp: 0, on: false };
    const tmp = new THREE.Vector3();
    let baseDist = 18;
    let visible = true;
    let raf = 0;

    function frame(t) {
      // camera parallax follows the cursor, and dollies back a little on scroll
      m.sx += ((m.on ? m.nx : 0) - m.sx) * 0.04;
      m.sy += ((m.on ? m.ny : 0) - m.sy) * 0.04;
      const sy = window.scrollY || document.documentElement.scrollTop || 0;
      const sp = Math.min(1, sy / 900);
      camera.position.set(m.sx * 1.6, m.sy * 1.0, baseDist + sp * 5);
      camera.lookAt(0, 0, 0);
      camera.updateMatrixWorld();
      group.rotation.y = Math.sin(t * 0.12) * 0.1 + Math.sin(sy * 0.0006) * 0.3;
      group.rotation.x = Math.sin(sy * 0.0004) * 0.3;
      canvas.style.opacity = String(1 - 0.5 * sp);

      // cursor position on the z = 0 plane
      tmp.set(m.nx, m.ny, 0.5).unproject(camera).sub(camera.position).normalize();
      const dd = -camera.position.z / tmp.z;
      uniforms.uMouse.value.copy(camera.position).addScaledVector(tmp, dd);

      uniforms.uPower.value += (m.tp - uniforms.uPower.value) * 0.06;
      uniforms.uTime.value = t;
      renderer.render(scene, camera);
    }

    function resize() {
      const W = canvas.clientWidth;
      const H = canvas.clientHeight || 1;
      if (!W) return;
      const aspect = W / H;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(W, H, false);
      camera.aspect = aspect;
      const tan = Math.tan((FOV * Math.PI) / 360);
      baseDist = Math.max(18, 12 / (2 * tan * aspect));
      camera.updateProjectionMatrix();
      const visW = 2 * tan * baseDist * aspect;
      uniforms.uSpread.value = Math.max(visW * 1.2, 14);
      uniforms.uSpreadY.value = 2 * tan * baseDist * 1.25;
      uniforms.uDist.value = baseDist;
      uniforms.uPx.value = renderer.getPixelRatio();
      if (reduce.matches) frame(0);
    }

    function tick(now) {
      if (visible) frame(now / 1000);
      raf = requestAnimationFrame(tick);
    }

    const onMove = (e) => {
      if (reduce.matches) return;
      const r = canvas.getBoundingClientRect();
      m.nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      m.ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
      m.on = true;
      m.tp = 1;
    };
    const onLeave = () => {
      m.tp = 0;
      m.on = false;
    };
    const onLost = (e) => {
      e.preventDefault();
      onFail();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
    });
    io.observe(canvas);
    resize();
    if (!reduce.matches) raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onLeave);
    window.addEventListener("blur", onLeave);
    document.documentElement.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onLeave);
      window.removeEventListener("blur", onLeave);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("webglcontextlost", onLost);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="r-canvas" />;
}

function ParticleBackground() {
  const [gl, setGl] = useState(true);
  return gl ? <ParticlesGL key="gl" onFail={() => setGl(false)} /> : <Particles2D key="2d" />;
}

/* Tilts the dashboard panel in 3D toward the cursor (fine pointers only) */
function useTilt(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return undefined;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    const clamp = (v) => Math.max(-1, Math.min(1, v));
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      tx = clamp((e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2));
      ty = clamp((e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2));
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty("--tx", cx.toFixed(4));
      el.style.setProperty("--ty", cy.toFixed(4));
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);
}

/* ------------------------------------------------------------------ */
/* Hero panel: verification flow + sample activity                     */
/* ------------------------------------------------------------------ */

function Node({ icon: Icon, title, meta, tone = "zinc", ring = false, stack = false, children }) {
  return (
    <div className={`r-node${ring ? " ring" : ""}${stack ? " stack" : ""}`}>
      <div className="r-node-row">
        <span className={`r-ico ${tone}`}>
          <Icon size={16} strokeWidth={2.2} />
        </span>
        <div style={{ minWidth: 0 }}>
          <p className="r-node-title">{title}</p>
          <p className="r-node-meta">{meta}</p>
        </div>
      </div>
      {children && <div className="r-node-tag">{children}</div>}
    </div>
  );
}

function Tag({ tone, icon: Icon, children }) {
  return (
    <span className={`r-tag ${tone}`}>
      <Icon size={11} strokeWidth={2.4} />
      {children}
    </span>
  );
}

function VerificationDiagram() {
  return (
    <div>
      <Node icon={Video} title="Video submitted" meta="Reel, TikTok or Short" />
      <div className="flow-v" />
      <Node icon={GitBranch} tone="lime" ring title="Sound matches the track?" meta="Ownership and audio checks" />

      <div className="r-split">
        <svg viewBox="0 0 100 56" preserveAspectRatio="none" aria-hidden="true">
          <path className="flow-path" d="M50 0 C50 28, 25 24, 25 56" fill="none" stroke="#C1FF21" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
          <path className="flow-path" d="M50 0 C50 28, 75 24, 75 56" fill="none" stroke="#FB7185" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="r-lbl t">Yes</span>
        <span className="r-lbl f">Not sure</span>
      </div>

      <div className="r-branches">
        <Node icon={CheckCircle2} tone="lime" stack title="Verified, earns points" meta="Counts toward the monthly pool">
          <Tag tone="lime" icon={CheckCircle2}>Verified</Tag>
        </Node>
        <Node icon={UserCheck} tone="amber" stack title="A person takes a look" meta="Manual review queue">
          <Tag tone="amber" icon={Clock}>Under review</Tag>
        </Node>
      </div>
    </div>
  );
}

const ACTIVITY = [
  ["Reel submitted · @maya.edits", "pending", "Pending"],
  ["Ownership confirmed", "verified", "Verified"],
  ["Audio matched to the track", "verified", "Verified"],
  ["Short submitted · @loopdaily", "pending", "Pending"],
  ["Sound not confirmed", "review", "Review"],
  ["Duplicate link blocked", "rejected", "Rejected"],
];

const pad = (n, l = 2) => String(n).padStart(l, "0");
const stamp = (d) =>
  `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(), 3)}`;

function LogCols() {
  return (
    <colgroup>
      <col className="c-time" />
      <col />
      <col className="c-st" />
    </colgroup>
  );
}

function LiveLog() {
  const counter = useRef(0);
  const makeRow = (date) => {
    const n = counter.current++;
    const [text, tone, label] = ACTIVITY[n % ACTIVITY.length];
    return { id: n, time: stamp(date), text, tone, label };
  };
  const [rows, setRows] = useState(() => {
    const now = Date.now();
    return Array.from({ length: 6 }, (_, i) => makeRow(new Date(now - (5 - i) * 1800))).reverse();
  });

  useEffect(() => {
    const id = setInterval(() => {
      setRows((r) => [makeRow(new Date()), ...r].slice(0, 6));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <div className="r-log-head">
        <h3 className="r-log-title">
          <span className="r-dot">
            <i />
            <i />
          </span>
          Verification activity
        </h3>
        <span className="r-log-note mono">sample data</span>
      </div>
      <table className="r-table">
        <LogCols />
        <thead>
          <tr>
            <th>Time</th>
            <th>Event</th>
            <th>Status</th>
          </tr>
        </thead>
      </table>
      <div className="r-logwin">
        <table className="r-table">
          <LogCols />
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="row-in">
                <td className="time mono">{r.time}</td>
                <td className="ev">{r.text}</td>
                <td>
                  <span className={`chip ${r.tone}`}>{r.label}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Content sections                                                    */
/* ------------------------------------------------------------------ */

const LINKS = [
  ["See it in action", "reel"],
  ["How it works", "how"],
  ["Pools", "pools"],
  ["Verification", "verification"],
  ["Payouts", "payouts"],
  ["FAQ", "faq"],
];

const STEPS = [
  [UserPlus, "Sign up", "Use your email and a password, confirm your email, and accept the terms and privacy policy. Two-factor sign-in is offered now and required before your first payout."],
  [Link2, "Link your accounts", "Connect Instagram, TikTok or YouTube through each platform's official login. Only accounts that share their view insights qualify, such as Instagram professional accounts."],
  [Headphones, "Pick a track", "Browse the catalogue, listen in your browser, read the brief, and open the official sound page on each platform."],
  [Video, "Post with the sound", "Make a Reel, TikTok or Short using the official sound of the track."],
  [Send, "Submit the link", "Choose the track and paste your video link. We detect the platform for you."],
  [ShieldCheck, "Get verified", "We check that the video is yours, short-form, posted after you joined, and really uses the track. You see verified, under review, or rejected with a reason."],
  [TrendingUp, "Earn points", "Your video earns points while it gathers views. At month end the points are frozen and you see an estimated share, marked pending."],
  [Wallet, "Withdraw in USD", "When the distributor's statement for that month is in, your share becomes real money in your balance. Above the minimum, you withdraw."],
];

const LIFE = [
  ["Open", "Videos earn points while they gather views during the calendar month."],
  ["Snapshotted", "At 00:00 UTC on the 1st the points are frozen. You see an estimated share."],
  ["Awaiting revenue", "We wait for the distributor's statement, which usually arrives two to three months later. Your dashboard shows this as pending."],
  ["Confirmed", "The statement is imported and every amount is calculated. Your share is now real."],
  ["Paid", "The money sits in your balance, ready to withdraw in USD."],
];

const FACTORS = [
  "The views your verified video gained that month",
  "The size of your audience, which never dominates the result",
  "Whether your account is verified",
  "How real the engagement looks: likes, comments and shares per view",
];

const LAYERS = [
  ["Ownership", "Automatic", "The video must appear on a social account you linked, be posted after you joined, and be short-form: a Reel, a TikTok, or a YouTube video of 3 minutes or less."],
  ["Audio match", "Automatic where possible", "Where a platform lets us, we match the video's audio against the track. Where it doesn't, we may ask you to upload the exported video when you submit."],
  ["Human review", "Manual", "Anything the first two layers can't settle goes to a reviewer, who checks that the sound is our track. Random spot checks keep the system honest."],
];

const TRUST = [
  [Lock, "Two-factor sign-in", "Authenticator-app 2FA with recovery codes. Required before your first payout. Changing it holds payouts for 48 hours and emails you."],
  [Link2, "Official logins only", "You connect through each platform's own login, so we never see your social passwords. Unlink any time and we delete the tokens and platform data."],
  [ShieldCheck, "Encrypted and private", "Tokens are stored encrypted. You can only ever read your own data. Platform data is used only to verify and score, never sold or shared."],
  [Wallet, "Traceable money", "Every amount is a USD ledger entry, from the distributor's statement down to your payout. Entries are never edited, only corrected with a note."],
  [UserCheck, "Your data, your call", "Export or delete your data on request. We collect only what we need and keep it for a set period per data type."],
  [Users, "18 and over", "Beatback is for adults. Age is checked at sign-up and again by our payout provider's identity check."],
];

const FAQ = [
  ["Do I pay to join?", "No. Creators never pay to join Beatback."],
  ["Who can join?", "You need to be 18 or over and have an Instagram professional account, a TikTok account, or a YouTube channel. Platforms must share view counts for us to verify your videos, which is why Instagram needs a professional account."],
  ["Which videos count?", "Reels, TikToks and YouTube Shorts of 3 minutes or less, posted from an account you linked, after you joined, using the official sound of a Beatback track."],
  ["How is my share worked out?", "Each track has one pool per calendar month, filled with 50% of that track's net revenue. Your share is your points on that track divided by everyone's points on it. Points come from the views your verified videos gain, adjusted by a few factors listed on this page. The exact weights stay private so nobody can game them."],
  ["Why does my money say pending?", "Distributors report revenue two to three months after streams happen. Until we import that statement, your share is an estimate. Once it is confirmed, it moves to your balance."],
  ["When can I withdraw?", "Once your balance reaches $10, in USD. Before your first payout, turn on two-factor sign-in, finish identity and tax details with our payout provider, and accept the terms. Payouts go out in batches after an admin approves them."],
  ["Why is my video under review?", "Some videos can't be settled automatically, so a person checks them. A video with unusually high views is held for review rather than thrown out, because real videos do go viral. We tell you it is under review, not the reason."],
  ["Do I need to say I'm being paid?", "Follow each platform's rules, including disclosing paid relationships where required. Being paid for using a track can count as a paid partnership. Our terms explain the wording."],
  ["Can I unlink an account or delete mine?", "Yes to both. Unlinking removes the account's tokens and platform data. You can also export or delete your data on request."],
];

/* ------------------------------------------------------------------ */
/* Sample reel: a real, openly-licensed clip standing in for a verified
   submission, plus an openly-licensed audio track standing in for a
   Beatback release (swap both for your own media before launch).      */
/* ------------------------------------------------------------------ */

const SAMPLE_VIDEO_SRC =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"; // Big Buck Bunny, (c) Blender Foundation, CC BY 3.0
const SAMPLE_AUDIO_SRC = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // free sample track, soundhelix.com

function Waveform({ playing }) {
  const bars = useRef(
    Array.from({ length: 28 }, (_, i) => 6 + Math.round(18 * Math.abs(Math.sin(i * 1.7))))
  ).current;
  return (
    <div className="wave" aria-hidden="true">
      {bars.map((h, i) => (
        <span key={i} className={playing ? "on" : ""} style={{ height: h, animationDelay: `${i * 0.05}s` }} />
      ))}
    </div>
  );
}

function SampleReel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [videoOn, setVideoOn] = useState(false);
  const [audioOn, setAudioOn] = useState(false);

  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play().catch(() => {}); setVideoOn(true); } else { v.pause(); setVideoOn(false); }
  };
  const toggleAudio = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) { a.play().catch(() => {}); setAudioOn(true); } else { a.pause(); setAudioOn(false); }
  };

  return (
    <section id="reel" className="sec">
      <div className="sec-head">
        <span className="eyebrow mono">See it in action</span>
        <h2 className="r-h2">What a <em>verified submission</em> looks like</h2>
        <p className="sec-sub">
          Sample clip and sample track shown here are openly licensed stand-ins, not an actual Beatback release — drop in your own catalogue media when this ships.
        </p>
      </div>
      <div className="reels">
        <div className="reel-phone">
          <div className="reel-notch" aria-hidden="true" />
          <span className="reel-tag"><span className="chip verified">Verified</span></span>
          <video
            ref={videoRef}
            src={SAMPLE_VIDEO_SRC}
            loop
            muted
            playsInline
            preload="metadata"
            onClick={toggleVideo}
            aria-label="Sample short-form video, Creative Commons licensed"
          />
          <div className="reel-caption">
            <p className="handle">@maya.edits</p>
            <p className="sound"><Music size={12} strokeWidth={2.4} /> Original sound · Undertow</p>
          </div>
        </div>
        <div>
          <h3 style={{ fontSize: 20, color: "#fff", fontWeight: 600 }}>Track audio, for reference</h3>
          <p className="fine" style={{ marginTop: 8 }}>
            Verification fingerprints the track's audio and checks it against what's posted. This sample track (SoundHelix, free to use) stands in for a Beatback release.
          </p>
          <div className="reel-player">
            <button type="button" className="reel-play" onClick={toggleAudio} aria-label={audioOn ? "Pause sample track" : "Play sample track"}>
              {audioOn ? <Clock size={16} strokeWidth={2.4} /> : <ArrowRight size={16} strokeWidth={2.4} />}
            </button>
            <Waveform playing={audioOn} />
          </div>
          <audio ref={audioRef} src={SAMPLE_AUDIO_SRC} preload="metadata" onEnded={() => setAudioOn(false)} />
          <p className="reel-note fine">
            Open-source credits: sample video is Big Buck Bunny (Blender Foundation, CC BY 3.0). Sample audio is a free SoundHelix demo track.
          </p>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="sec">
      <div className="sec-head">
        <span className="eyebrow mono">How it works</span>
        <h2 className="r-h2">From sign-up to payout in <em>eight steps</em></h2>
        <p className="sec-sub">
          You post. We verify. Points turn into a share of the track's pool, and the money lands once the distributor reports it.
        </p>
      </div>
      <ol className="steps">
        {STEPS.map(([Icon, title, text], i) => (
          <li key={title} className="card step">
            <span className="num mono">{pad(i + 1)}</span>
            <span className="r-ico lime">
              <Icon size={16} strokeWidth={2.2} />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Pools() {
  return (
    <section id="pools" className="sec">
      <div className="sec-head">
        <span className="eyebrow mono">Pools and points</span>
        <h2 className="r-h2">Every track shares <em>half</em> of what it earns</h2>
        <p className="sec-sub">
          Each track has a creator pool every calendar month, filled with 50% of that track's net revenue as reported by the distributor.
        </p>
      </div>
      <div className="split2">
        <div className="card calc">
          <span className="lbl mono">Your share</span>
          <p className="formula" style={{ marginTop: 10, color: "#fff" }}>
            <em>your points</em> on the track ÷ <em>all points</em> on that track that month
          </p>
          <div className="bars" aria-label="Illustration of a pool">
            <div className="bar-row">
              <div className="head"><span>Track earns, net</span><b>$1,000</b></div>
              <div className="track"><i style={{ width: "100%" }} /></div>
            </div>
            <div className="bar-row">
              <div className="head"><span>Creator pool (50%)</span><b>$500</b></div>
              <div className="track mid"><i style={{ width: "50%" }} /></div>
            </div>
            <div className="bar-row">
              <div className="head"><span>You hold 10% of the points</span><b>$50</b></div>
              <div className="track low"><i style={{ width: "5%" }} /></div>
            </div>
          </div>
          <p className="fine">Illustration only. Real amounts depend on the track's revenue and everyone's points. Shares are never guaranteed, and estimates are only estimates.</p>
        </div>
        <div>
          <h3 style={{ fontSize: 20, color: "#fff", fontWeight: 600 }}>What your points depend on</h3>
          <ul className="factors">
            {FACTORS.map((f) => (
              <li key={f}>
                <Check size={16} strokeWidth={2.6} className="ck" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <p className="fine">
            The weights behind these factors are private and may change with notice. A cap stops any one creator from taking too much of a pool, and a video that goes viral is reviewed, not zeroed.
          </p>
        </div>
      </div>

      <h3 style={{ marginTop: 56, fontSize: 20, color: "#fff", fontWeight: 600 }}>How a month moves from points to money</h3>
      <ol className="life" style={{ marginTop: 22, maxWidth: 640 }}>
        {LIFE.map(([t, d], i) => (
          <li key={t}>
            <span className="dot mono">{i + 1}</span>
            <div>
              <p className="t">{t}</p>
              <p className="d">{d}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="fine" style={{ maxWidth: 640 }}>
        A video keeps earning month after month for as long as it keeps gaining views. If a post is deleted or made private, its points for open months are voided.
      </p>
    </section>
  );
}

function Verification() {
  return (
    <section id="verification" className="sec">
      <div className="sec-head">
        <span className="eyebrow mono">Verification</span>
        <h2 className="r-h2">Verified, not <em>bought</em></h2>
        <p className="sec-sub">
          Bought views must not pay. Every submission passes through layers that prove the video is yours and that it really uses our track.
        </p>
      </div>
      <div className="layers">
        {LAYERS.map(([t, tag, d], i) => (
          <div key={t} className="card layer">
            <div className="top">
              <span className="eyebrow mono">Layer {i + 1}</span>
              <span className={`chip ${i === 2 ? "review" : "verified"}`}>{tag}</span>
            </div>
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
        ))}
      </div>
      <div className="supported">
        <div className="card">
          <h3>What you see after you submit</h3>
          <p>Every submission shows one of four statuses. Rejections come with a reason. If something is under review, we tell you that, but not why it was flagged.</p>
          <div className="legend">
            <span className="chip pending">Pending</span>
            <span className="chip verified">Verified</span>
            <span className="chip review">Under review</span>
            <span className="chip rejected">Rejected, with a reason</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Payouts() {
  return (
    <section id="payouts" className="sec">
      <div className="sec-head">
        <span className="eyebrow mono">Payouts and referrals</span>
        <h2 className="r-h2">Money moves only after <em>real revenue</em> arrives</h2>
        <p className="sec-sub">
          Every amount is a ledger entry in USD, and your balance is always the sum of your entries.
        </p>
      </div>
      <div className="facts">
        <div className="fact"><p className="big">50%</p><p className="cap">of each track's net revenue goes into its monthly creator pool</p></div>
        <div className="fact"><p className="big">$10</p><p className="cap">minimum balance to withdraw, in USD</p></div>
        <div className="fact"><p className="big">20%</p><p className="cap">referral bonus on your invitee's confirmed earnings for their first 3 months</p></div>
        <div className="fact"><p className="big">$0</p><p className="cap">to join. Creators never pay to take part</p></div>
      </div>
      <div className="split2">
        <div className="card">
          <h3>Getting paid</h3>
          <ul className="checks">
            <li><Check size={16} strokeWidth={2.6} className="ck" /><span>Before your first payout: two-factor sign-in on, identity and tax details complete with our payout provider, and the terms accepted.</span></li>
            <li><Check size={16} strokeWidth={2.6} className="ck" /><span>Payouts go out in batches after an admin approves them. PayPal comes first, with more options as creators join from more places.</span></li>
            <li><Check size={16} strokeWidth={2.6} className="ck" /><span>If a payout fails, the amount goes back to your balance.</span></li>
            <li><Check size={16} strokeWidth={2.6} className="ck" /><span>Your payout details stay with the payout provider, not with us.</span></li>
          </ul>
        </div>
        <div className="card">
          <span className="r-ico lime" style={{ marginBottom: 14 }}><Gift size={16} strokeWidth={2.2} /></span>
          <h3>Invite other creators</h3>
          <ul className="checks">
            <li><Check size={16} strokeWidth={2.6} className="ck" /><span>Every creator gets an invite link.</span></li>
            <li><Check size={16} strokeWidth={2.6} className="ck" /><span>The bonus is paid by the platform on top. It is never taken from the person you invite.</span></li>
            <li><Check size={16} strokeWidth={2.6} className="ck" /><span>One level only, paid on confirmed earnings. Self-referrals are blocked.</span></li>
          </ul>
          <p className="fine">Referral terms may change with notice.</p>
        </div>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section id="trust" className="sec">
      <div className="sec-head">
        <span className="eyebrow mono">Security and privacy</span>
        <h2 className="r-h2">Built to be <em>trusted</em> with your money and data</h2>
        <p className="sec-sub">We hold login tokens, personal details and payout balances, so security comes first.</p>
      </div>
      <div className="trust">
        {TRUST.map(([Icon, t, d]) => (
          <div key={t} className="card">
            <span className="r-ico lime"><Icon size={16} strokeWidth={2.2} /></span>
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="sec">
      <div className="sec-head">
        <span className="eyebrow mono">FAQ</span>
        <h2 className="r-h2">Questions creators <em>ask</em></h2>
      </div>
      <div className="faq">
        {FAQ.map(([q, a]) => (
          <details key={q}>
            <summary>
              <span>{q}</span>
              <span className="plus" aria-hidden="true"><span style={{ fontSize: 18, lineHeight: 1 }}>+</span></span>
            </summary>
            <p className="ans">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function CtaBand() {
  const [done, setDone] = useState(false);
  return (
    <div className="cta-band" id="join">
      <div className="cta-box">
        <span className="eyebrow mono">Closed beta</span>
        <h2 className="r-h2">Post with the sound. <em>Share</em> the royalties.</h2>
        <p className="sub">We are starting with a small group of invited creators and Clochie Records artists, Auralane first. Leave your email to ask for an invite.</p>
        {done ? (
          <p className="cta-ok">Thanks. We will email you when a spot opens.</p>
        ) : (
          <form
            className="cta-form"
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <label className="sr" htmlFor="bb-email">Email address</label>
            <input id="bb-email" type="email" required placeholder="you@example.com" />
            <button type="submit" className="r-btn-primary">Request an invite</button>
          </form>
        )}
        <p className="cta-fine">Free to join. 18+ only. Paid in USD.</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <div className="foot">
        <div>
          <a href="#" className="r-logo" aria-label="Beatback home">
            <span className="r-logo-mark"><Music size={18} strokeWidth={2.4} /></span>
            <span className="r-logo-text">Beatback</span>
          </a>
          <p style={{ marginTop: 14 }}>
            Beatback is the platform Clochie Records runs for creators. We pay short-form creators a share of what our tracks earn.
          </p>
          <p style={{ marginTop: 10 }}>Earnings are a share of a pool and are never guaranteed.</p>
        </div>
        <nav className="links" aria-label="Footer">
          <a href="#how">How it works</a>
          <a href="#faq">FAQ</a>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function StatusPill() {
  return (
    <span className="r-pill">
      <span className="r-dot">
        <i />
        <i />
      </span>
      Invite-only beta
    </span>
  );
}

export default function BeatbackLanding() {
  const [open, setOpen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  useTilt(stageRef);

  // cursor spotlight on cards
  const onSpot = (e) => {
    const card = e.target.closest && e.target.closest(".card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const goTo = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="bb" style={{ background: "#0B0F12", color: "#e4e4e7" }} onPointerMove={onSpot}>
      <style>{CSS}</style>

      <ParticleBackground />
      <div className="r-fade-l" />

      <div className="r-content">
        <header className="r-nav">
          <div className="r-nav-in">
            <div className="r-left">
              <a href="#" className="r-logo" aria-label="Beatback home">
                <span className="r-logo-mark">
                  <Music size={18} strokeWidth={2.4} />
                </span>
                <span className="r-logo-text">Beatback</span>
              </a>
              <nav className="r-links" aria-label="Primary">
                {LINKS.map(([label, id]) => (
                  <a key={id} href={`#${id}`} onClick={goTo(id)}>
                    {label}
                  </a>
                ))}
              </nav>
            </div>
            <div className="r-right">
              <StatusPill />
              <a href="#join" className="r-btn-sm" onClick={goTo("join")}>
                Request invite
              </a>
              <button
                type="button"
                className="r-menu-btn"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="bb-mobile-menu"
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
          {open && (
            <div id="bb-mobile-menu" className="r-mobile">
              <nav aria-label="Mobile">
                {LINKS.map(([label, id]) => (
                  <a key={id} href={`#${id}`} onClick={goTo(id)}>
                    {label}
                  </a>
                ))}
              </nav>
              <StatusPill />
            </div>
          )}
        </header>

        <main>
          <div className="r-hero">
            <div>
              <div className="r-badge rv" style={{ "--d": "0s" }}>
                <span className="bullet" aria-hidden="true" />
                <span>closed beta</span>
                <span className="sep">/</span>
                <span className="dim">by Clochie Records, Auralane first</span>
              </div>

              <h1 className="r-h1 rv" style={{ "--d": ".08s" }}>
                Make videos. Share the <em>royalties.</em>
              </h1>

              <p className="r-lead rv" style={{ "--d": ".18s" }}>
                Beatback pays short-form creators a share of the money our tracks earn, for every verified Reel, TikTok or Short made with our music. Link your account, pick a track, post, and submit the link.
              </p>

              <div className="r-cta rv" style={{ "--d": ".28s" }}>
                <a href="#join" className="r-btn-primary" onClick={goTo("join")}>
                  Request an invite
                  <ArrowRight size={17} strokeWidth={2.4} />
                </a>
                <a href="#how" className="r-btn-ghost" onClick={goTo("how")}>
                  <ArrowDown size={16} />
                  See how it works
                </a>
              </div>

              <p className="r-micro rv" style={{ "--d": ".36s" }}>
                Free to join <span className="sep">/</span> 18+ only <span className="sep">/</span> Paid in USD
              </p>
            </div>

            <div className="stage rv" ref={stageRef} style={{ "--d": ".2s" }}>
            <span className="float-chip" style={{ left: -34, top: 92, "--m": 26 }}>
              <span className="ci"><CheckCircle2 size={13} strokeWidth={2.4} /></span>
              <span>Verified<small>Reel · audio matched</small></span>
            </span>
            <span className="float-chip amber" style={{ right: -22, top: -16, "--m": -18 }}>
              <span className="ci"><Clock size={13} strokeWidth={2.4} /></span>
              <span>Est. share<small>pending statement</small></span>
            </span>
            <div className="r-panel">
              <div className="r-bar">
                <div className="r-bar-l">
                  <div className="r-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="r-file mono">submission-check</span>
                </div>
                <span className="r-live">Example</span>
              </div>
              <div className="r-body">
                <VerificationDiagram />
              </div>
              <div className="r-logwrap">
                <LiveLog />
              </div>
            </div>
            </div>
          </div>

          <section className="sec" style={{ paddingTop: 24 }} aria-labelledby="loop-h">
            <div className="sec-head">
              <span className="eyebrow mono">Why it exists</span>
              <h2 className="r-h2" id="loop-h">A track grows when many people use it as a <em>sound</em></h2>
              <p className="sec-sub">
                Paying creators from real royalties turns that into a loop. More videos bring more listeners, more listeners bring more revenue, and more revenue fills bigger pools.
              </p>
            </div>
            <div className="loop" role="list">
              <div className="loop-item" role="listitem"><span className="ico"><Video size={18} /></span>More videos</div>
              <span className="loop-arrow" aria-hidden="true"><ArrowRight size={18} /></span>
              <div className="loop-item" role="listitem"><span className="ico"><Headphones size={18} /></span>More listeners</div>
              <span className="loop-arrow" aria-hidden="true"><ArrowRight size={18} /></span>
              <div className="loop-item" role="listitem"><span className="ico"><TrendingUp size={18} /></span>More revenue</div>
              <span className="loop-arrow" aria-hidden="true"><ArrowRight size={18} /></span>
              <div className="loop-item" role="listitem"><span className="ico"><Wallet size={18} /></span>Bigger pools</div>
            </div>
          </section>

          <hr className="divider" />
          <SampleReel />
          <hr className="divider" />
          <HowItWorks />
          <hr className="divider" />
          <Pools />
          <hr className="divider" />
          <Verification />
          <hr className="divider" />
          <Payouts />
          <hr className="divider" />
          <Trust />
          <hr className="divider" />
          <Faq />
          <CtaBand />
        </main>

        <Footer />
      </div>
    </div>
  );
}
