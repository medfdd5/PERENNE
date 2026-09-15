<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MED — Precision Performance Wear</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<style>
  @font-face {
    font-family: 'MED Title';
    src: url('fonts/title.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'MED Big Title';
    src: url('fonts/big title.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'MED Others';
    src: url('fonts/others.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  :root{
    --paper:#ffffff;
    --paper-dim:#eef2f7;
    --ink:#111827;
    --ink-soft:#3f4a5a;
    --text-black:#111827;
    --text-gray:#6b7280;
    --vital:#FFB300;
    --primary:#1f3f67;
    --primary-soft:#4c6aa2;
    --steel:#475569;
    --amber:#FFD670;
    --electric:#3d7dff;
    --surface:rgba(255,255,255,0.96);
    --surface-strong:rgba(255,255,255,0.98);
    --line: rgba(31,45,67,0.14);
    --radius: 14px;
    --radius-pill: 999px;
    transition: background-color .3s ease, color .3s ease;
  }
  body.dark-mode{
    --paper:#111827;
    --paper-dim:#1f2937;
    --ink:#f3f4f6;
    --ink-soft:#9ca3af;
    --text-black:#f9fafb;
    --text-gray:#d1d5db;
    --steel:#9ca3af;
    --surface:rgba(17,24,39,0.96);
    --surface-strong:rgba(17,24,39,0.98);
    --line:rgba(249,250,251,0.14);
    --vital:#FFC72C;
  }
  *{box-sizing:border-box; margin:0; padding:0;}
  html{scroll-behavior:smooth;}
  body{
    background-color:#f7f9fb;
    background-image: url('assets/stock-photo-fitness-in-gym-sport-and-healthy-lifestyle-concept-couple-of-athletic-man-and-woman-showing.webp');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    color:var(--text-black);
    font-family:'MED Others', sans-serif;
    -webkit-font-smoothing:antialiased;
    overflow-x:hidden;
  }
  ::selection{ background:var(--vital); color:var(--paper); }
  .mono{ font-family:'IBM Plex Mono', monospace; }

  a{color:inherit; text-decoration:none;}
  img{max-width:100%; display:block;}

  .wrap{ max-width:1240px; margin:0 auto; padding:0 32px; }

  /* ===== NAV ===== */
  header{
    position:sticky; top:0; z-index:50;
    background: #d18d00;
    border-bottom:1px solid rgba(31,45,67,0.12);
    backdrop-filter: blur(8px);
    transition: transform .3s ease-in-out;
    transform: translateY(0);
  }
  header.hidden{ transform: translateY(-100%); }
  nav.wrap{
    display:flex; align-items:center; justify-content:space-between;
    height:76px;
  }
  .logo{
    font-family:'MED Title', sans-serif;
    font-weight:700;
    font-size:30px;
    letter-spacing:0.05em;
    display:flex; align-items:center; gap:16px;
    color:var(--paper);
    isolation:isolate;
    background:transparent;
    padding:8px 0;
    border-radius:18px;
  }
  .logo img{
    width:auto;
    height:96px;
    display:block;
    border-radius:0;
    object-fit:contain;
    background:none;
    mix-blend-mode: normal;
    filter: none;
  }
  .logo span{
    display:inline-block;
    letter-spacing:0.08em;
    color:var(--paper);
  }
  @keyframes pulse-dot{
    0%,100%{ transform:scale(1); opacity:1; }
    50%{ transform:scale(1.5); opacity:0.55; }
  }
  .navlinks{ display:flex; gap:40px; font-size:13px; text-transform:uppercase; letter-spacing:0.12em; }
  .navlinks a{ position:relative; padding-bottom:4px; color:var(--paper); transition:color .2s ease; }
  .navlinks a:hover{ color:rgba(255,255,255,0.95); }
  .navlinks a::after{
    content:''; position:absolute; left:0; bottom:0; height:1px; width:0;
    background:var(--paper); transition:width .25s ease;
  }
  .navlinks a:hover::after{ width:100%; }

  @keyframes pageTransitionWipe{
    0%{ opacity:0; transform:translateX(-20%) skewX(-12deg); }
    35%{ opacity:0.9; transform:translateX(10%) skewX(-12deg); }
    70%{ opacity:0.95; transform:translateX(50%) skewX(-12deg); }
    100%{ opacity:0; transform:translateX(120%) skewX(-12deg); }
  }
  .nav-cta{
    font-family:'MED Others', sans-serif; font-size:12px; letter-spacing:0.08em;
    text-transform:uppercase;
  }
  .nav-right{ display:flex; align-items:center; gap:14px; }

  /* ===== MODERN BUTTON + ICON SYSTEM ===== */
  .btn{
    display:inline-flex; align-items:center; justify-content:center; gap:9px;
    border-radius:var(--radius-pill);
    font-family:'IBM Plex Mono', monospace; font-size:13px; letter-spacing:0.05em;
    text-transform:uppercase; cursor:pointer; border:none;
    padding:15px 26px;
    transition: transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s ease, background .3s ease, color .3s ease, border-color .3s ease;
  }
  .btn svg{
    width:18px; height:18px; flex-shrink:0;
    stroke:currentColor; fill:none; stroke-linecap:round; stroke-linejoin:round;
    transition: transform .3s cubic-bezier(.2,.8,.2,1), stroke .3s ease, fill .3s ease;
  }
  .btn-primary{
    background:var(--vital); color:var(--paper);
    box-shadow: 0 12px 24px -12px rgba(255,92,69,0.8);
  }
  .btn-primary:hover{
    background: #ff7b65; transform:translateY(-3px);
    box-shadow: 0 16px 30px -10px rgba(255,92,69,0.8);
  }
  .btn-primary:hover svg{ transform:translateX(3px); }
  .btn-ghost{
    background:rgba(255,255,255,0.16); color:var(--paper);
    border:1.5px solid rgba(255,255,255,0.28); padding:13.5px 24px;
    backdrop-filter: blur(8px);
  }
  .btn-ghost:hover{
    background:rgba(255,255,255,0.28); color:var(--paper); transform:translateY(-3px);
    box-shadow: 0 14px 26px -10px rgba(255,255,255,0.18);
  }
  .btn-ghost:hover svg{ transform:translateX(3px); }

  .icon-btn{
    width:44px; height:44px; padding:0; border-radius:50%;
    background:rgba(255,255,255,0.18); border:1.5px solid rgba(255,255,255,0.28); color:var(--paper);
    display:inline-flex; align-items:center; justify-content:center;
    position:relative; cursor:pointer;
    transition: transform .3s cubic-bezier(.2,.8,.2,1), background .3s ease, color .3s ease, box-shadow .3s ease;
  }
  .icon-btn svg{
    width:20px; height:20px;
    stroke:currentColor; fill:none; stroke-linecap:round; stroke-linejoin:round;
    transition: transform .3s cubic-bezier(.2,.8,.2,1), stroke .3s ease, fill .3s ease;
  }
  .icon-btn:hover{
    background:var(--vital); color:var(--paper); transform:translateY(-2px);
    box-shadow: 0 10px 20px -8px rgba(255,153,0,0.4);
  }
  .cart-badge{
    position:absolute; top:-6px; right:-6px;
    width:19px; height:19px; border-radius:50%;
    background:var(--vital); color:var(--paper);
    font-family:'IBM Plex Mono', monospace; font-size:10px; font-weight:500;
    display:flex; align-items:center; justify-content:center;
    transform:scale(0); transition: transform .3s cubic-bezier(.34,1.56,.64,1);
  }
  .cart-badge.show{ transform:scale(1); }

  /* ===== HERO ===== */
  .hero{
    position:relative;
    padding:96px 0 64px;
    border-bottom:1px solid var(--line);
    overflow:hidden;
    background: url('assets/stock-photo-fitness-in-gym-sport-and-healthy-lifestyle-concept-couple-of-athletic-man-and-woman-showing.webp') center/cover no-repeat;
    background-size: cover;
  }
  .hero::before{
    content:'';
    position:absolute;
    inset:0;
    background:rgba(255,255,255,0.36);
    pointer-events:none;
    z-index:1;
  }
  .hero .wrap{ position:relative; z-index:2; }
  .hero .rx-label{
    display:inline-flex; align-items:center; gap:8px;
    font-family:'IBM Plex Mono', monospace; font-size:12px; letter-spacing:0.14em;
    text-transform:uppercase; color:var(--text-black);
    background:rgba(255,255,255,0.96);
    border:1px solid rgba(31,45,67,0.12); padding:10px 16px; margin-bottom:28px;
    border-radius:999px;
    box-shadow:0 16px 30px -20px rgba(15,23,42,0.18);
  }
  .rx-label span.rx{ color:var(--vital); font-weight:500; }

  h1.headline{
    font-family:'MED Big Title', sans-serif;
    font-weight:700;
    font-size:clamp(48px, 8vw, 108px);
    line-height:0.94;
    letter-spacing:-0.02em;
    max-width:920px;
    color:var(--text-gray);
  }
  h1.headline em{
    font-style:normal;
    color:var(--vital);
    background:rgba(255,179,0,0.12);
    padding:0 10px;
  }

  .hero-sub{
    display:flex; justify-content:space-between; align-items:flex-end;
    margin-top:44px; gap:40px; flex-wrap:wrap;
  }
  .hero-copy{ max-width:420px; font-size:16px; line-height:1.75; color:var(--text-black); }
  .hero-copy .cta-row{ margin-top:28px; display:flex; gap:16px; align-items:center; }

  /* vitals readout */
  .vitals{
    font-family:'IBM Plex Mono', monospace;
    font-size:12px; color:var(--steel);
    display:flex; gap:28px; flex-wrap:wrap;
  }
  .vitals div span{ display:block; color:var(--ink); font-size:20px; font-weight:500; margin-top:2px; }

  .ekg{
    width:100%; height:70px; margin-top:56px;
    stroke:var(--vital); fill:none; stroke-width:2;
  }
  .ekg path{
    stroke-dasharray: 1400;
    stroke-dashoffset: 1400;
    animation: draw 3.4s ease-in-out infinite;
  }
  @keyframes draw{
    0%{ stroke-dashoffset:1400; }
    55%{ stroke-dashoffset:0; }
    100%{ stroke-dashoffset:-1400; }
  }

  /* ===== MARQUEE ===== */
  .marquee{
    border-bottom:1px solid var(--line);
    background:var(--ink); color:var(--paper);
    overflow:hidden; white-space:nowrap; padding:14px 0;
  }
  .marquee-track{
    display:inline-block; padding-left:100%;
    animation: scroll 26s linear infinite;
    font-family:'IBM Plex Mono', monospace; font-size:13px; letter-spacing:0.1em; text-transform:uppercase;
  }
  .marquee-track span{ margin:0 28px; color:var(--sage); }
  @keyframes scroll{ 0%{ transform:translateX(0);} 100%{ transform:translateX(-100%);} }

  /* ===== SECTION HEADERS ===== */
  .section{ padding:110px 0; border-bottom:1px solid var(--line); }
  .section#collection{ padding-top:80px; padding-bottom:80px; }
  .section-head{
    display:flex; justify-content:space-between; align-items:flex-end;
    margin-bottom:56px; gap:24px; flex-wrap:wrap;
  }
  .eyebrow{
    font-family:'MED Others', sans-serif; font-size:12px; letter-spacing:0.14em;
    text-transform:uppercase; color:var(--vital); margin-bottom:14px; display:block;
  }
  .section-title{
    font-size:clamp(32px, 4vw, 52px); font-weight:700; letter-spacing:-0.01em; max-width:600px;
    color:var(--text-gray);
  }
  .section-note{ max-width:320px; font-size:14px; color:var(--text-black); line-height:1.6; }

  .hero-stats{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:16px; margin-top:28px; }
  .hero-stat{ border:1px solid rgba(31,45,67,0.08); padding:22px; background:rgba(255,255,255,0.88); border-radius:18px; box-shadow:0 22px 40px -28px rgba(15,23,42,0.35); }
  .hero-stat strong{ display:block; font-size:22px; margin-bottom:6px; }
  .hero-stat span{ font-family:'IBM Plex Mono', monospace; font-size:11px; color:var(--steel); text-transform:uppercase; letter-spacing:0.08em; }

  /* ===== PROTOCOL / PHILOSOPHY ===== */
  .protocol-grid{
    display:grid; grid-template-columns: repeat(3, 1fr); gap:1px;
    background:var(--line); border:1px solid var(--line);
  }
  .protocol-item{ background:var(--paper); padding:40px 32px; border-radius:26px; box-shadow:0 18px 40px -32px rgba(15,23,42,0.14); }
  .protocol-item .code{
    font-family:'IBM Plex Mono', monospace; font-size:13px; color:var(--vital); margin-bottom:18px; display:block;
  }
  .protocol-item h3{ font-size:22px; margin-bottom:12px; letter-spacing:-0.01em; color:var(--text-gray); }
  .protocol-item p{ font-size:14px; color:var(--text-black); line-height:1.65; }

  /* ===== PRODUCTS ===== */
  .products{
    display:grid; grid-template-columns: repeat(4, 1fr); gap:26px;
    perspective: 1000px;
  }
  .product-card{ position:relative; will-change:transform; }
  .product-frame{
    aspect-ratio: 3/4;
    background: linear-gradient(180deg, rgba(255,255,255,0.82), rgba(245,247,250,0.95));
    border:1px solid rgba(15,23,42,0.08);
    border-radius:28px;
    box-shadow: 0 24px 48px -30px rgba(15,23,42,0.35);
    position:relative; overflow:hidden; margin-bottom:18px;
    transition: border-color .35s ease, box-shadow .35s ease;
  }
  .product-frame::before{
    content:'';
    position:absolute; inset:0;
    background:radial-gradient(circle at top left, rgba(255,255,255,0.6), transparent 35%);
    pointer-events:none;
  }
  .product-frame img{
    width:100%; height:100%; object-fit:cover;
    display:block;
    transition: transform .4s cubic-bezier(.2,.8,.2,1);
  }
  .product-frame svg{ width:100%; height:100%; }
  .dose-tag{
    position:absolute; top:14px; left:14px;
    font-family:'IBM Plex Mono', monospace; font-size:10.5px; letter-spacing:0.06em;
    background:rgba(255,255,255,0.88); border:1px solid rgba(15,23,42,0.08); padding:5px 9px 5px 9px;
    text-transform:uppercase;
  }
  .dose-tag b{ color:var(--vital); }
  .product-meta{ display:flex; justify-content:space-between; align-items:flex-start; }
  .product-meta h4{ font-size:17px; font-weight:500; margin-bottom:4px; }
  .product-meta .sku{ font-family:'IBM Plex Mono', monospace; font-size:11px; color:var(--steel); }
  .product-meta .price{ font-family:'IBM Plex Mono', monospace; font-size:15px; }
  .collection-subhead {
    font-family: 'MED Title', sans-serif;
    font-size: 24px;
    letter-spacing: 0.05em;
    color: var(--text-gray);
    margin: 0 0 28px 0;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--line);
  }
  
  /* Flip Card styles */
  .product-card-inner {
    position: relative; width: 100%;
    transition: transform 0.4s cubic-bezier(.2,.8,.2,1), box-shadow .4s ease;
    transform-style: preserve-3d; /* This enables 3D transforms */
    will-change: transform;
    border-radius: 28px;
  }
  .product-card-front{
    /* The front face doesn't need special styling now */
  }
  .product-card-back {
    display:none; /* Hide back by default, logic is handled by JS */
  }
  .product-card:hover .product-frame img {
    transform: scale(1.05);
  }

  .product-visual{
    position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
    background:radial-gradient(circle at 20% 20%, rgba(255,255,255,0.75), transparent 30%), linear-gradient(145deg, #f4f0e7 0%, #ece6dc 100%);
  }
  .product-visual svg{ width:86%; height:auto; }
  .product-badge{
    position:absolute; top:12px; right:12px; z-index:2;
    font-family:'IBM Plex Mono', monospace; font-size:10px; letter-spacing:0.08em; text-transform:uppercase;
    padding:7px 9px; border:1px solid rgba(18,24,27,0.12); background:rgba(255,255,255,0.96); color:var(--text-black);
    border-radius:999px;
    box-shadow:0 10px 18px -12px rgba(15,23,42,0.18);
  }

  /* ===== VITALS BAND ===== */
  .band{ background:var(--ink); color:var(--paper); padding:80px 0; }
  .band-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:32px; }
  .band-item .num{
    font-family:'Space Grotesk', sans-serif; font-weight:700; font-size:44px; color:var(--vital);
  }
  .band-item .lbl{
    font-family:'IBM Plex Mono', monospace; font-size:12px; letter-spacing:0.08em; text-transform:uppercase;
    color:var(--sage); margin-top:8px;
  }

  /* ===== FABRIC LAB ===== */
  .lab{ display:grid; grid-template-columns: 1fr 1fr; gap:64px; align-items:center; }
  .lab-visual{
    aspect-ratio:1; background:rgba(255,255,255,0.6); border:1px solid rgba(31,45,67,0.12);
    position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center;
    box-shadow:0 20px 40px -28px rgba(15,23,42,0.16);
  }
  .lab-visual img{ width:100%; height:100%; object-fit:cover; display:block; opacity:0.96; }
  .lab-copy p{ font-size:15px; line-height:1.75; color:var(--text-black); margin-bottom:18px; max-width:460px; }
  .spec-table{ margin-top:32px; width:100%; border-collapse:collapse; background:rgba(255,255,255,0.96); border:1px solid var(--line); border-radius:24px; overflow:hidden; box-shadow:0 24px 45px -38px rgba(15,23,42,0.14); }
  .spec-table th,
  .spec-table td{ padding:18px 20px; border-bottom:1px solid var(--line); }
  .spec-table th{ text-align:left; font-family:'IBM Plex Mono', monospace; font-size:12px; text-transform:uppercase; letter-spacing:0.12em; color:var(--steel); background:rgba(245,247,250,0.9); }
  .spec-table td{ font-size:15px; color:var(--text-black); }
  .spec-table tr:last-child td{ border-bottom:none; }

  /* ===== FOOTER ===== */
  footer{ padding:64px 0 40px; background:rgba(247,249,251,0.96); }
  .footer-top{
    display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:40px;
    padding:44px 0 56px; border-bottom:1px solid rgba(31,45,67,0.08);
  }
  .footer-cta h2{ font-size:clamp(30px,4vw,48px); max-width:520px; line-height:1.05; letter-spacing:-0.01em; color:var(--text-gray); }
  .footer-links{ display:flex; gap:48px; flex-wrap:wrap; }
  .footer-col{
    min-width:180px; flex:1;
  }
  .footer-col span.h{
    font-family:'IBM Plex Mono', monospace; font-size:11px; letter-spacing:0.14em; text-transform:uppercase;
    color:var(--text-gray); display:block; margin-bottom:16px;
  }
  .footer-col a{ display:block; font-size:14px; margin-bottom:12px; color:var(--text-black); line-height:1.9; font-weight:500; }
  .footer-col a:hover{ color:var(--vital); }
  .footer-bottom{
    display:flex; justify-content:space-between; margin-top:32px;
    font-family:'IBM Plex Mono', monospace; font-size:12px; color:var(--steel); flex-wrap:wrap; gap:12px;
  }

  .newsletter-card{
    display:flex; justify-content:space-between; align-items:center; gap:24px;
    padding:34px 36px; border:1px solid rgba(31,45,67,0.08);
    background:rgba(255,255,255,0.94);
    border-radius:28px;
    box-shadow:0 24px 50px -40px rgba(15,23,42,0.16);
  }
  .newsletter-card h3{ font-size:28px; margin-bottom:10px; max-width:580px; color:var(--text-gray); }
  .newsletter-card p{ color:var(--text-black); line-height:1.7; max-width:560px; }
  .newsletter-actions{ display:flex; gap:12px; flex-wrap:wrap; min-width:min(360px,100%); }
  .newsletter-input{
    flex:1; min-width:240px; padding:15px 18px; border:1px solid var(--line); border-radius:var(--radius-pill);
    background:rgba(255,255,255,0.86); font-family:'Space Grotesk', sans-serif; font-size:14px; color:var(--ink);
  }
  .newsletter-input:focus{ outline:none; border-color:var(--vital); }

  @media (max-width: 860px){
    .navlinks{ display:none; }
    .protocol-grid{ grid-template-columns:1fr; }
    .products{ grid-template-columns:1fr; }
    .band-grid{ grid-template-columns:repeat(2,1fr); }
    .lab{ grid-template-columns:1fr; }
    .hero-sub{ flex-direction:column; align-items:flex-start; }
  }
  @media (min-width: 861px) and (max-width: 1100px){
    .products{ grid-template-columns:repeat(2,1fr); }
  }
  @media (prefers-reduced-motion: reduce){
    *{ animation:none !important; transition:none !important; }
  }

  /* ===== SCROLL REVEAL / TRANSFORM SYSTEM ===== */
  .reveal{
    opacity:0;
    transform: translateY(28px);
    transition: opacity .7s cubic-bezier(.2,.7,.3,1), transform .7s cubic-bezier(.2,.7,.3,1);
  }
  .reveal.in{ opacity:1; transform:translateY(0); }
  .reveal.delay-1{ transition-delay:.08s; }
  .reveal.delay-2{ transition-delay:.16s; }
  .reveal.delay-3{ transition-delay:.24s; }


  .band-item{ transition: transform .4s ease; }
  .band-item:hover{ transform: translateY(-6px) scale(1.03); }
  .band-item:nth-child(1) .num{ color:var(--vital); }
  .band-item:nth-child(2) .num{ color:var(--electric); }
  .band-item:nth-child(3) .num{ color:var(--amber); }
  .band-item:nth-child(4) .num{ color:var(--sage); }

  .feature-grid{ display:grid; grid-template-columns:1.1fr 0.9fr; gap:32px; align-items:center; }
  .feature-card{ border:1px solid rgba(31,45,67,0.08); background:rgba(255,255,255,0.96); padding:34px 32px; min-height:280px; display:flex; flex-direction:column; justify-content:space-between; border-radius:28px; box-shadow:0 22px 50px -38px rgba(15,23,42,0.16); }
  .feature-card h3{ font-size:28px; margin-bottom:12px; color:var(--text-gray); }
  .feature-card p{ color:var(--text-black); line-height:1.7; }
  .feature-badges{ display:flex; flex-wrap:wrap; gap:10px; margin-top:18px; }
  .feature-badges span{ border:1px solid var(--line); padding:8px 12px; font-family:'IBM Plex Mono', monospace; font-size:11px; text-transform:uppercase; letter-spacing:0.06em; }
  .feature-image{ border:1px solid var(--line); min-height:320px; background:linear-gradient(135deg, var(--ink), var(--electric)); position:relative; overflow:hidden; }
  .feature-image::before{ content:''; position:absolute; inset:0; background:radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35), transparent 32%); }
  .feature-image::after{ content:'TRAIN SMART • RECOVER STRONGER'; position:absolute; inset:auto 22px 22px 22px; color:var(--paper); font-family:'IBM Plex Mono', monospace; font-size:12px; letter-spacing:0.2em; text-transform:uppercase; }
  /* Clean variant: remove overlays and borders for full-bleed images */
  .feature-image.clean{ border:0; border-radius:0; }
  .feature-image.clean::before{ background:transparent; }
  .feature-image.clean::after{ display:none; }
  /* Apply same clean behavior to hero and lab visual blocks */
  .hero.clean{ border-bottom:0; }
  .hero.clean::before{ display:none; }
  .lab-visual.clean{ border:0; padding:0; background:transparent; box-shadow:none; }
  .lab-visual.clean img{ border-radius:0; display:block; }
  .lab-visual img{ width:100%; height:100%; object-fit:cover; display:block; }

  .rx-label{ transition: transform .3s ease, border-color .3s ease; }
  .rx-label:hover{ transform: translateX(4px); border-color:var(--vital); }

  /* ===== ADD TO CART ===== */
  .btn-add{
    width:100%; margin-top:16px;
    background:rgba(255,255,255,0.92); border:1.5px solid var(--line); color:var(--ink);
    border-radius:var(--radius-pill); padding:13px 18px;
    font-family:'IBM Plex Mono', monospace; font-size:12px; letter-spacing:0.06em; text-transform:uppercase;
    display:flex; align-items:center; justify-content:center; gap:10px; cursor:pointer;
    position:relative; overflow:hidden;
    transition: background .3s ease, color .3s ease, transform .3s ease, box-shadow .3s ease;
  }
  .btn-add svg{
    width:20px; height:20px; transition: transform .3s ease, filter .3s ease, stroke .3s ease;
    stroke:currentColor; fill:none; stroke-linecap:round; stroke-linejoin:round;
    filter: drop-shadow(0 1px 0 rgba(0,0,0,0.08));
  }
  .btn-add:hover{
    background:var(--vital); color:var(--paper); transform:translateY(-2px);
    box-shadow: 0 14px 24px -10px rgba(255,153,0,0.4);
  }
  .btn-add:hover svg{ transform:translateX(3px) rotate(5deg); filter: drop-shadow(0 4px 12px rgba(255,153,0,0.24)); }
  .btn-add.added{
    background:var(--sage); border-color:var(--sage); color:var(--ink);
  }
  .btn-add.added svg{ transform:scale(1.15); }

  /* ===== CART DRAWER ===== */
  .cart-overlay{
    position:fixed; inset:0; background:rgba(18,24,27,0.45); backdrop-filter:blur(2px);
    opacity:0; pointer-events:none; transition:opacity .6s cubic-bezier(0.23, 1, 0.32, 1); z-index:90;
  }
  .cart-overlay.open{ opacity:1; pointer-events:auto; }
  .cart-drawer{
    position:fixed; top:0; right:0; height:100%; width:440px; max-width:92vw;
    background:var(--surface-strong); border-left:1px solid var(--line); backdrop-filter:blur(12px);
    transform:translateX(100%); transition: transform .7s cubic-bezier(0.23, 1, 0.32, 1);
    z-index:100; display:flex; flex-direction:column;
  }
  .cart-drawer.open{ transform:translateX(0); }
  .cart-head{
    display:flex; justify-content:space-between; align-items:center;
    padding:26px 28px; border-bottom:1px solid var(--line);
  }
  .cart-head h3{ font-size:20px; letter-spacing:-0.01em; color:#6b7280; }
  .cart-items{ flex:1; overflow-y:auto; padding:8px 28px; }
  .cart-empty{
    text-align:center; padding:80px 20px; color:var(--steel);
    font-family:'IBM Plex Mono', monospace; font-size:13px; line-height:1.7;
  }
  .cart-line{ display:flex; gap:14px; padding:18px 0; border-bottom:1px solid var(--line); }
  .cart-line-thumb{
    width:56px; height:56px; border-radius:12px; flex-shrink:0;
    display:flex; align-items:center; justify-content:center;
    background:var(--paper-dim); border:1px solid var(--line);
  }
  .cart-line-info{ flex:1; min-width:0; }
  .cart-line-info h5{ font-size:14px; font-weight:500; margin-bottom:3px; }
  .cart-line-info .meta{ font-family:'IBM Plex Mono', monospace; font-size:11px; color:var(--steel); }
  .qty-stepper{ display:flex; align-items:center; gap:10px; margin-top:10px; }
  .qty-stepper button, .cart-line-remove{
    width:24px; height:24px; border-radius:50%; border:1px solid var(--ink); background:transparent;
    display:flex; align-items:center; justify-content:center; cursor:pointer; color:var(--ink);
    transition: background .2s ease, color .2s ease;
  }
  .qty-stepper button svg{ width:11px; height:11px; }
  .qty-stepper button:hover{ background:var(--ink); color:var(--paper); }
  .qty-stepper span{ font-family:'IBM Plex Mono', monospace; font-size:13px; min-width:14px; text-align:center; }
  .cart-line-remove{
    background:none; border:none; cursor:none; color:var(--steel); align-self:flex-start;
    transition: color .2s ease;
  }
  .cart-line-remove:hover{ color:var(--vital); }
  .cart-line-remove svg{ width:18px; height:18px; stroke:currentColor; stroke-width:1.6; fill:none; stroke-linecap:round; stroke-linejoin:round; }
  .cart-line-price{ font-family:'IBM Plex Mono', monospace; font-size:13px; white-space:nowrap; }

  .cart-foot{ padding:22px 28px 28px; border-top:1px solid var(--line); }
  .cart-subtotal{
    display:flex; justify-content:space-between; align-items:center;
    font-family:'IBM Plex Mono', monospace; font-size:16px; margin-bottom:16px;
  }
  .cart-summary-card{
    border:1px solid var(--line); border-radius:18px; padding:14px 16px; background:var(--paper-dim); margin-bottom:14px;
  }
  .summary-row{ display:flex; justify-content:space-between; gap:10px; font-size:13px; padding:4px 0; }
  .summary-row span{ color:var(--steel); }
  .summary-row strong{ font-weight:500; }
  .cart-summary-card .small{ font-size:11px; color:var(--steel); margin-top:8px; }
  .checkout-form{ display:flex; flex-direction:column; gap:10px; }
  .checkout-form input{
    padding:13px 18px; border:1.5px solid var(--line); border-radius:var(--radius-pill);
    font-family:'Space Grotesk', sans-serif; font-size:14px; background:var(--paper-dim); color:var(--ink);
    transition: border-color .2s ease;
  }
  .checkout-form input:focus{ outline:none; border-color:var(--vital); }
  .payment-options{ display:grid; gap:10px; margin-bottom:4px; }
  .payment-option {
    border: 1.5px solid var(--line);
    border-radius: 16px;
    padding: 14px 16px; cursor:none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 14px;
    background: var(--paper-dim);
    transition: border-color .3s ease, transform .3s ease, background .3s ease, box-shadow .3s ease;
    position: relative;
  }
  .payment-option:hover { border-color: var(--vital); transform: translateY(-2px); box-shadow: 0 8px 16px -8px rgba(31, 45, 67, 0.1); }
  .payment-option.active { border-color: var(--vital); background: var(--paper); box-shadow: 0 4px 12px -6px rgba(31, 45, 67, 0.2); }
  .payment-option .icon { width: 36px; height: 24px; color: var(--steel); flex-shrink: 0; }
  .payment-option .icon svg { width: 100%; height: 100%; }
  .payment-option .label { font-family: 'IBM Plex Mono', monospace; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 500; }
  .payment-option .pill { font-size: 11px; color: var(--steel); margin-top: 2px; }
  .payment-option .radio { width: 18px; height: 18px; border-radius: 50%; border: 1.5px solid var(--line); margin-left: auto; transition: border-color .3s ease, background-color .3s ease; }
  .payment-option.active .radio { border-color: var(--vital); background-color: var(--vital); }
  .checkout-form .btn{ width:100%; margin-top:4px; }
  .cart-msg{
    font-family:'IBM Plex Mono', monospace; font-size:11.5px; color:var(--steel);
    margin-top:10px; text-align:center; min-height:16px;
  }
  .cart-msg.error{ color:var(--vital); }
  .order-confirm{ text-align:center; padding:60px 24px; }
  .order-confirm .icon-check{
    width:56px; height:56px; border-radius:50%; background:var(--sage); color:var(--ink);
    display:flex; align-items:center; justify-content:center; margin:0 auto 20px;
  }
  .order-confirm .icon-check svg{ width:28px; height:28px; stroke:currentColor; fill:none; stroke-linecap:round; stroke-linejoin:round; }
  .order-confirm h4{ font-size:20px; margin-bottom:8px; }
  .order-confirm p{ font-size:13px; color:var(--ink-soft); margin-bottom:4px; }
  .order-confirm .order-num{ font-family:'IBM Plex Mono', monospace; color:var(--vital); margin-top:10px; }

  /* toast */
  .toast{
    position:fixed; bottom:28px; left:50%; transform:translate(-50%, 20px);
    background:var(--ink); color:var(--paper);
    font-family:'IBM Plex Mono', monospace; font-size:12.5px; letter-spacing:0.03em;
    padding:14px 22px; border-radius:var(--radius-pill);
    opacity:0; pointer-events:none; transition: all .35s cubic-bezier(.2,.8,.2,1);
    z-index:200; display:flex; align-items:center; gap:10px; white-space:nowrap;
  }
  .toast.show{ opacity:1; transform:translate(-50%, 0); }
  .toast svg{ width:15px; height:15px; color:var(--vital); flex-shrink:0; }

  @media (max-width: 480px){
    .cart-drawer{ width:100vw; }
    .newsletter-card{ padding:28px 24px; flex-direction:column; align-items:flex-start; }
  }

  /* ===== Back to Top Button ===== */
  .back-to-top {
    position: fixed;
    bottom: 28px;
    right: 28px;
    width: 48px;
    height: 48px;
    background: var(--vital);
    color: var(--paper);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 80;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: opacity .3s ease, visibility .3s ease, transform .3s ease, box-shadow .3s ease;
    box-shadow: 0 10px 20px -8px rgba(255,153,0,0.4);
  }
  .back-to-top.show { opacity: 1; visibility: visible; transform: translateY(0); }
  .back-to-top:hover { transform: translateY(-3px); box-shadow: 0 14px 28px -10px rgba(255,153,0,0.5); }
  .back-to-top svg { width: 22px; height: 22px; }
</style>
</head>
<body>

<header>
  <nav class="wrap">
    <div class="logo">
      <span>MED</span>
    </div>
    <div class="navlinks">
      <a href="#protocol">Protocol</a>
      <a href="#collection">Collection</a>
      <a href="#lab">Fabric Lab</a>
      <a href="#footer">Contact</a>
    </div>
    <div class="nav-right">
      <a href="#collection" class="btn btn-ghost nav-cta">Shop the Dose</a>
      <button class="icon-btn" id="cartToggle" aria-label="Open cart">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6 5 3H2"/><circle cx="9.5" cy="20" r="1.4" fill="currentColor" stroke="none"/><circle cx="18" cy="20" r="1.4" fill="currentColor" stroke="none"/></svg>
        <span class="cart-badge" id="cartBadge">0</span>
      </button>
      <button class="icon-btn" id="themeToggle" aria-label="Toggle theme">
        <svg id="themeIconSun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 18.36l1.42-1.42M18.36 4.22l1.42-1.42"/></svg>
        <svg id="themeIconMoon" style="display:none;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
    </div>
  </nav>
</header>

<section class="hero clean">
  <div class="wrap">
    <div class="rx-label">℞ <span class="rx">Performance</span> — dosed, not decorated</div>
    <h1 class="headline">Train like it's <em>prescribed.</em></h1>

    <div class="hero-sub">
      <p class="hero-copy">
        MED makes training kit the way a pharmacist makes a compound — measured to the gram, tested to failure, labeled so you know exactly what you're putting your body through. No mood, no mascot. Just correct dosage.
      </p>
      <div class="vitals">
        <div>COMPRESSION<span>22 mmHg</span></div>
        <div>MOISTURE OUT<span>340g/m²/24h</span></div>
        <div>RESTOCK<span>WEEKLY</span></div>
      </div>
    </div>

    <div class="cta-row">
      <a href="#collection" class="btn btn-primary">
        View Collection
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
      </a>
      <a href="#protocol" class="btn btn-ghost">
        Read the Protocol
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
      </a>
    </div>

    <div class="hero-stats" id="heroStats">
      <div class="hero-stat reveal delay-1">
        <strong id="heroLiveProducts">0</strong>
        <span>active formulas</span>
      </div>
      <div class="hero-stat reveal delay-2">
        <strong>24/7</strong>
        <span>restock intelligence</span>
      </div>
      <div class="hero-stat reveal delay-3">
        <strong>Free</strong>
        <span>shipping over $120</span>
      </div>
    </div>

    <svg class="ekg" viewBox="0 0 1400 70" preserveAspectRatio="none">
      <path d="M0,35 L120,35 L145,10 L165,60 L190,35 L340,35 L365,15 L385,55 L410,35 L1400,35"/>
    </svg>
  </div>
</section>

<div class="marquee">
  <div class="marquee-track">
    COMPRESSION <span>•</span> RECOVERY <span>•</span> HEAT ZONES <span>•</span> RESISTANCE PANELS <span>•</span> COLD LAYER <span>•</span> MED <span>•</span>
    COMPRESSION <span>•</span> RECOVERY <span>•</span> HEAT ZONES <span>•</span> RESISTANCE PANELS <span>•</span> COLD LAYER <span>•</span> MED <span>•</span>
  </div>
</div>

<section class="section" id="protocol" style="padding-top: 140px; padding-bottom: 140px;">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="eyebrow">The MED Protocol</span>
        <h2 class="section-title">Three rules govern every garment we release.</h2>
      </div>
      <p class="section-note">We treat apparel like a course of treatment: a defined dose, a measurable effect, no filler ingredients.</p>
    </div>
    <div class="protocol-grid">
      <div class="protocol-item reveal">
        <span class="code">RULE 01 — DOSAGE</span>
        <h3>Every panel earns its place</h3>
        <p>Compression, mesh, and reinforcement go exactly where load testing says they matter. Nothing is added for silhouette alone.</p>
      </div>
      <div class="protocol-item reveal delay-1">
        <span class="code">RULE 02 — TOLERANCE</span>
        <h3>Fit is a measurement, not a guess</h3>
        <p>Every block is graded against motion-capture data across 40 movement patterns, so sizing tolerance stays under 4mm at the seam.</p>
      </div>
      <div class="protocol-item reveal delay-2">
        <span class="code">RULE 03 — TRANSPARENCY</span>
        <h3>The label tells the truth</h3>
        <p>Fabric origin, compression rating, and wash-cycle life are printed on the tag — not buried in a sustainability PDF.</p>
      </div>
    </div>
  </div>
</section>

<section class="section" id="collection">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="eyebrow">Current Formulary</span>
        <h2 class="section-title">The Collection</h2>
      </div>
      <p class="section-note">Four active compounds. Each dosed for a specific training condition.</p>
    </div>

    <div id="productsContainer">
      <div class="section-note reveal">Loading formulary…</div>
    </div>
  </div>
</section>

<section class="band">
  <div class="wrap band-grid">
    <div class="band-item reveal">
      <div class="num">340g</div>
      <div class="lbl">Moisture Expelled / m² / 24h</div>
    </div>
    <div class="band-item reveal delay-1">
      <div class="num">4mm</div>
      <div class="lbl">Max Seam Tolerance</div>
    </div>
    <div class="band-item reveal delay-2">
      <div class="num">200+</div>
      <div class="lbl">Wash Cycles Tested</div>
    </div>
    <div class="band-item reveal delay-3">
      <div class="num">40</div>
      <div class="lbl">Movement Patterns Graded</div>
    </div>
  </div>
</section>

<section class="section" id="lab">
  <div class="wrap feature-grid">
    <div class="feature-card reveal">
      <div>
        <span class="eyebrow">Built for real training</span>
        <h3>Premium gear that looks sharp in the studio and on the street.</h3>
        <p>From warm-up to cooldown, every piece is designed to move with the body, hold its form, and feel confident enough for regular rotation.</p>
      </div>
      <div class="feature-badges">
        <span>Free shipping</span>
        <span>30-day easy returns</span>
        <span>New drops weekly</span>
      </div>
    </div>
    <div class="feature-image reveal delay-1 clean" style="background-image:url('assets/sport-woman-sitting-resting-after-workout-exercise-fitness-gym-with-protein-shak_10307-27.webp'); background-size:cover; background-position:center; background-repeat:no-repeat;"></div>
  </div>
</section>

<section class="section">
  <div class="wrap lab">
    <div class="lab-visual reveal clean">
      <img src="assets/stock-photo-fitness-in-gym-sport-and-healthy-lifestyle-concept-couple-of-athletic-man-and-woman-showing.webp" alt="Fabric lab athlete image">
    </div>
    <div class="lab-copy reveal delay-1">
      <span class="eyebrow">Fabric Lab</span>
      <h2 class="section-title" style="margin-bottom:22px;">One yarn, tested past its limit.</h2>
      <p>Our base compound is a mechanical-stretch polyamide blend, knitted at variable density so compression rises exactly where the body needs support and drops where it needs to breathe.</p>
      <p>Every batch is run through 200 wash cycles and a controlled sweat-rate simulation before it's cleared for production. Anything that falls outside spec never reaches the cutting floor.</p>
      <table class="spec-table">
        <tr>
          <th>Composition</th>
          <td>78% Polyamide / 22% Elastane</td>
        </tr>
        <tr>
          <th>Compression range</th>
          <td>15–24 mmHg</td>
        </tr>
        <tr>
          <th>UV rating</th>
          <td>UPF 50+</td>
        </tr>
        <tr>
          <th>Origin</th>
          <td>Milled in Porto, PT</td>
        </tr>
      </table>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="newsletter-card reveal">
      <div>
        <span class="eyebrow">Stay in the loop</span>
        <h3>Get first access to the next drop and the latest training notes.</h3>
        <p>Weekly updates, restock alerts, and care tips — no spam, just the good stuff.</p>
      </div>
      <div class="newsletter-actions">
        <input class="newsletter-input" type="email" placeholder="you@example.com">
        <button class="btn btn-primary">Join Waitlist</button>
      </div>
    </div>
  </div>
</section>

<footer id="footer">
  <div class="wrap">
    <div class="footer-top reveal">
      <div class="footer-cta">
        <span class="eyebrow">Join the Trial</span>
        <h2>Get early access to the next formulary drop.</h2>
        <div class="cta-row" style="margin-top:24px;">
          <a href="#" class="btn btn-primary">
            Sign Up
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
          </a>
        </div>
      </div>
      <div class="footer-links">
        <div class="footer-col">
          <span class="h">Shop</span>
          <a href="#collection">Compression</a>
          <a href="#collection">Outerwear</a>
          <a href="#collection">Leggings</a>
        </div>
        <div class="footer-col">
          <span class="h">Company</span>
          <a href="#protocol">Protocol</a>
          <a href="#lab">Fabric Lab</a>
          <a href="#">Stockists</a>
        </div>
        <div class="footer-col">
          <span class="h">Support</span>
          <a href="#">Sizing Chart</a>
          <a href="#">Returns</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 MED PERFORMANCE LABS</span>
      <span>DOSED FOR TRAINING · NOT FOR DIAGNOSTIC USE</span>
    </div>
  </div>
</footer>

<div class="page-transition-overlay" id="pageTransitionOverlay"></div>

<div class="cart-overlay" id="cartOverlay"></div>
<aside class="cart-drawer" id="cartDrawer" aria-label="Shopping cart">
  <div class="cart-head">
    <h3>Your Cart</h3>
    <button class="icon-btn" id="cartClose" aria-label="Close cart">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
  </div>
  <div class="cart-items" id="cartItems">
    <div class="cart-empty">Your cart is empty.<br>Add something from the collection.</div>
  </div>
  <div class="cart-foot" id="cartFoot" style="display:none;">
    <div class="cart-subtotal">
      <span>Subtotal</span>
      <span id="cartSubtotal">$0.00</span>
    </div>
    <div class="cart-summary-card">
      <div class="summary-row"><span>Shipping</span><strong>Free over $120</strong></div>
      <div class="summary-row"><span>Arrival</span><strong>2–4 business days</strong></div>
      <div class="small">Secure checkout with Visa or PayPal.</div>
    </div>
    <div class="checkout-form">
      <div class="payment-options">
        <div class="payment-option active" data-payment="visa" aria-label="Pay with Visa or Card">
          <div class="icon"><svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-visa"><title id="pi-visa">Visa</title><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" opacity=".07"/><path fill="#fff" d="M34 1.6c.8 0 1.4.6 1.4 1.4v18c0 .8-.6 1.4-1.4 1.4H4c-.8 0-1.4-.6-1.4-1.4V3c0-.8.6-1.4 1.4-1.4h30z"/><path d="M14.3 14.1c-.2-1.1-.9-1.8-2.2-2.3-.9-.3-1.5-.5-1.5-.8 0-.3.4-.5.9-.5.6 0 1.1.2 1.5.5l.4-.9c-.4-.3-1.1-.5-2-.5-.9 0-2.2.4-2.2 1.5 0 .9.9.9 1.6 1.3.9.3 1.3.5 1.3.8 0 .4-.5.6-1 .6-.7 0-1.3-.2-1.7-.5l-.4.9c.5.3 1.2.5 2.1.5.9 0 2.3-.4 2.3-1.5zM23.1 10.3h-1.8c-.3 0-.5.2-.6.4l-2.8 5.9c-.2.4-.2.7 0 1 .2.3.5.4.8.4h.4c.5 0 .9-.3 1.1-.7l.7-1.5h2.3l.4 1.5c.2.4.6.7 1.1.7h.4c.3 0 .6-.1.8-.4.2-.3.2-.6 0-1l-2.8-5.9c-.2-.2-.4-.4-.7-.4zm-2.1 3.9l.9-2.1.9 2.1h-1.8zM29.5 10.4c-.4-.2-.9-.3-1.5-.3-.8 0-1.5.2-2.1.5-.6.3-1.1.8-1.4 1.4-.3.6-.5 1.3-.5 2.1s.2 1.5.5 2.1c.3.6.8 1.1 1.4 1.4.6.3 1.3.5 2.1.5.6 0 1.1-.1 1.5-.3l-.2-1c-.3.1-.6.2-1 .2-.5 0-.9-.1-1.3-.3-.4-.2-.7-.5-1-.8-.2-.4-.3-.8-.3-1.3s.1-.9.3-1.3c.2-.4.5-.7.9-.9.4-.2.8-.3 1.3-.3.4 0 .7.1.9.2l.2-1zM10.1 10.3h-1.2c-.3 0-.6.2-.7.5l-1.3 3.4-1.4-3.4c-.1-.3-.4-.5-.7-.5H3.4l2.5 6.2c.2.4.6.6 1 .6h.4c.4 0 .8-.2 1-.6l2.5-6.2z" fill="#142688"/></svg></div>
          <div>
            <div class="label">Card Payment</div>
            <div class="pill">Secure checkout</div>
          </div>
          <div class="radio"></div>
        </div>
        <div class="payment-option" data-payment="paypal" aria-label="Pay with PayPal">
          <div class="icon"><svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-paypal"><title id="pi-paypal">PayPal</title><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" opacity=".07"/><path fill="#fff" d="M34 1.6c.8 0 1.4.6 1.4 1.4v18c0 .8-.6 1.4-1.4 1.4H4c-.8 0-1.4-.6-1.4-1.4V3c0-.8.6-1.4 1.4-1.4h30z"/><path fill="#003087" d="M23.4 6.2H12.2c-.3 0-.5.2-.6.5L8.8 16c-.1.3.1.7.4.7h3.4c.3 0 .5-.2.6-.5l.3-1.8h3.8l-.3 1.8c0 .3.2.5.5.5h2.9c.3 0 .5-.2.6-.5l2.2-9.6c.1-.3-.1-.6-.4-.6z"/><path fill="#009cde" d="M23.9 8.7l-.2.9-1.7-1.7c-.2-.1-.4-.2-.6-.2h-3.4c-.3 0-.5.2-.6.5l-2 9.6c-.1.3.1.7.4.7h3.1c.2 0 .4-.1.5-.3l.4-2.3h.9c2.6 0 4.1-1.5 4.5-4.1.2-1.3-.1-2.4-.8-3.1-.5-.5-1.2-.8-2-.8z"/><path fill="#002169" d="M23.3 8.5h-2c-.3 0-.5.2-.6.5l-.2.9c.3-.1.7-.2 1.1-.2.6 0 1.1.1 1.5.4.4.3.6.7.7 1.2.1.6-.1 1.2-.5 1.6-.4.4-.9.6-1.5.6h-.8l.3 1.5c.1.3.3.5.6.5h.3c.3 0 .5-.2.6-.5l.2-.9h.3c.3 0 .5-.2.6-.5l.2-.9.1-.3s0-.1.1-.1c.1 0 .1-.1.1-.2.3-1.1.1-2.1-.5-2.8-.5-.6-1.2-.9-2.1-.9z"/></svg></div>
          <div>
            <div class="label">PayPal</div>
            <div class="pill">Fast wallet checkout</div>
          </div>
          <div class="radio"></div>
        </div>
      </div>
      <input type="email" id="checkoutEmail" placeholder="you@example.com" autocomplete="email">
      <button class="btn btn-primary" id="checkoutBtn">
        Pay with <span id="paymentMethodLabel">Visa</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
      </button>
    </div>
    <div class="cart-msg" id="cartMsg"></div>
  </div>
</aside>

<div class="toast" id="toast"></div>

<a href="#" class="back-to-top" id="backToTopBtn" aria-label="Back to top"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg></a>

<script>
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => io.observe(el));

  // ===================================================================
  // MED backend integration — talks to the Express/SQLite API in /backend.
  // Run `npm install && npm start` inside backend/ so this page has
  // something to call. If it can't reach the API, the storefront still
  // renders; cart actions surface a friendly toast instead of failing silently.
  // ===================================================================

  const API_BASE = 'http://localhost:3000';

  function getCartId() {
    let id = localStorage.getItem('med_cart_id');
    if (!id) {
      id = (crypto.randomUUID ? crypto.randomUUID() : 'cart-' + Date.now() + '-' + Math.random().toString(16).slice(2));
      localStorage.setItem('med_cart_id', id);
    }
    return id;
  }
  const CART_ID = getCartId();

  const ICONS = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>',
    tshirt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3 3 7l3 3 2-1.5V21h8V8.5L18 10l3-3-5-4-2 2h-4z"/></svg>'
  };

  function renderProductVisual(product) {
    if (product.imageUrl) {
      return `<img src="${product.imageUrl}" alt="${product.name}">`;
    }

    const accentColor = product.accent === 'electric' ? 'var(--electric)' : product.accent === 'amber' ? 'var(--amber)' : 'var(--vital)';
    switch (product.id) {
      case 2:
        return `
          <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="500" rx="34" fill="#f7f2e8"/>
            <circle cx="292" cy="140" r="92" fill="rgba(18,24,27,0.06)"/>
            <path d="M134 144h136l24 34-14 22-20 16v128h-34V226l-24-18-20-16z" fill="#12181B"/>
            <path d="M152 184h102v84H152z" fill="${accentColor}"/>
            <path d="M178 172h50" stroke="#ffffff" stroke-width="9" stroke-linecap="round"/>
          </svg>`;
      case 3:
        return `
          <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="500" rx="34" fill="#f7f2e8"/>
            <circle cx="108" cy="140" r="88" fill="rgba(255,255,255,0.46)"/>
            <path d="M126 122h148c18 0 34 12 39 29l15 58c10 38-18 75-58 75H130c-40 0-68-37-58-75l15-58c5-17 21-29 39-29z" fill="#12181B"/>
            <path d="M150 154h96v98H150z" fill="${accentColor}"/>
            <path d="M168 174h60" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
          </svg>`;
      case 4:
        return `
          <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="500" rx="34" fill="#f7f2e8"/>
            <path d="M118 112h164c28 0 50 23 50 52v124c0 34-27 61-61 61H129c-34 0-61-27-61-61V164c0-29 22-52 50-52z" fill="#12181B"/>
            <path d="M144 166h112v90H144z" fill="${accentColor}"/>
            <path d="M164 186h72" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
            <path d="M186 164v-34" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
          </svg>`;
      default:
        return `
          <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="500" rx="34" fill="#f7f2e8"/>
            <path d="M140 90h120l30 40-22 18-16 16v198l-44 0V164l-16-18-22-20z" fill="#12181B"/>
            <path d="M154 186h92v146h-92z" fill="${accentColor}"/>
            <path d="M174 208h52" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
          </svg>`;
    }
  }

  const localProducts = [
    { id: 1, name: 'Men\'s Compression Tee', sku: 'M-TEE-001', spec: '22mmHg', priceCents: 7500, description: 'Engineered for peak performance and rapid recovery.', dose: '22mmHg', accent: 'vital', imageUrl: 'assets/collection/men/men-tee.webp' },
    { id: 2, name: 'Men\'s Training Shorts', sku: 'M-SHORT-001', spec: '15mmHg', priceCents: 6000, description: 'Lightweight and flexible for unrestricted movement.', dose: '15mmHg', accent: 'electric', imageUrl: 'assets/collection/men/men-shorts.webp' },
    { id: 3, name: 'Men\'s Performance Hoodie', sku: 'M-HOOD-001', spec: 'Thermal', priceCents: 11000, description: 'Stay warm without overheating during your warmup.', dose: 'Thermal', accent: 'amber', imageUrl: 'assets/collection/men/men-hoodie.webp' },
    { id: 4, name: 'Men\'s Base Layer', sku: 'M-BASE-001', spec: '18mmHg', priceCents: 8500, description: 'A second-skin fit for core temperature regulation.', dose: '18mmHg', accent: 'vital', imageUrl: 'assets/collection/men/men-base-layer.webp' },
    { id: 5, name: 'Women\'s Racerback Tank', sku: 'W-TANK-001', spec: '12mmHg', priceCents: 6500, description: 'Maximum breathability with targeted support.', dose: '12mmHg', accent: 'vital', imageUrl: 'assets/collection/women/women-tank.webp' },
    { id: 6, name: 'Women\'s High-Waist Leggings', sku: 'W-LEG-001', spec: '20mmHg', priceCents: 9500, description: 'Sculpting compression that supports every move.', dose: '20mmHg', accent: 'electric', imageUrl: 'assets/collection/women/women-leggings.webp' },
    { id: 7, name: 'Women\'s Zip Jacket', sku: 'W-JACKET-001', spec: 'Weather-Resist', priceCents: 12500, description: 'A light, protective layer for outdoor sessions.', dose: 'Weather', accent: 'amber', imageUrl: 'assets/collection/women/women-jacket.webp' },
    { id: 8, name: 'Women\'s Sports Bra', sku: 'W-BRA-001', spec: 'High-Impact', priceCents: 5500, description: 'High-impact support with a comfortable, secure fit.', dose: 'Impact', accent: 'vital', imageUrl: 'assets/collection/women/women-bra.webp' }
  ];

  function renderProductCard(product, index) {
    const accentColor = product.accent === 'electric' ? 'var(--electric)' : product.accent === 'amber' ? 'var(--amber)' : 'var(--vital)';
    const badgeText = product.id === 4 ? 'New Drop' : product.id === 3 ? 'Restock' : 'Editors Pick';
    return `
      <div class="product-card reveal delay-${Math.min(index, 3)}">
        <div class="product-card-inner">
          <div class="product-card-front">
            <div class="product-frame">
              <span class="dose-tag">DOSE: <b>${product.dose}</b></span>
              <span class="product-badge">${badgeText}</span>
              ${renderProductVisual(product)}
            </div>
            <div class="product-meta">
              <div>
                <h4>${product.name}</h4>
                <div class="sku">${product.sku} / ${product.spec}</div>
              </div>
              <div class="price">${money(product.priceCents)}</div>
            </div>
          </div>
          <div class="product-card-back">
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <button class="btn-add" data-product-id="${product.id}" data-name="${product.name}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  }

  async function loadFeaturedProducts() {
    const container = document.getElementById('productsContainer');
    try {
      document.getElementById('heroLiveProducts').textContent = localProducts.length;

      const menProducts = localProducts.filter(p => p.sku.startsWith('M-'));
      const womenProducts = localProducts.filter(p => p.sku.startsWith('W-'));

      let html = '<h3 class="collection-subhead reveal">Men\'s Collection</h3>';
      html += '<div class="products">';
      html += menProducts.map((product, index) => renderProductCard(product, index)).join('');
      html += '</div>';

      html += '<h3 class="collection-subhead reveal" style="margin-top: 60px;">Women\'s Collection</h3>';
      html += '<div class="products">';
      html += womenProducts.map((product, index) => renderProductCard(product, menProducts.length + index)).join('');
      html += '</div>';

      container.innerHTML = html;

      document.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', async () => {
          const productId = Number(btn.dataset.productId);
          const product = localProducts.find(p => p.id === productId);
          if (!product) return;

          const name = product.name;
          const original = btn.innerHTML;
          btn.disabled = true;
          try {
            const cart = await apiCall('/api/cart/' + CART_ID + '/items', {
              method: 'POST',
              body: JSON.stringify({ productId, quantity: 1, size: 'M' })
            });
            updateBadge(cart.itemCount);
            renderCart(cart);
            btn.innerHTML = ICONS.check + 'Added';
            btn.classList.add('added');
            showToast(name + ' added to cart');
            setTimeout(() => {
              btn.innerHTML = original;
              btn.classList.remove('added');
              btn.disabled = false;
            }, 1400);
          } catch (err) {
            btn.disabled = false;
            showToast(err.message || 'Could not add item to cart', true);
          }
        });
      });

      document.querySelectorAll('.product-card').forEach((card) => card.classList.add('reveal'));
      const revealEls = document.querySelectorAll('.reveal');
      revealEls.forEach((el) => io.observe(el));

    } catch (err) {
      container.innerHTML = '<div class="section-note">The catalog is temporarily unavailable. Please try again shortly.</div>';
    }
  }

  let toastTimer = null;
  function showToast(message, isError) {
    const toast = document.getElementById('toast');
    toast.innerHTML = (isError ? '' : ICONS.check) + '<span>' + message + '</span>';
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  function money(cents) {
    return '$' + (cents / 100).toFixed(2);
  }

  function updateBadge(count) {
    const badge = document.getElementById('cartBadge');
    badge.textContent = count;
    badge.classList.toggle('show', count > 0);
  }

  async function apiCall(path, options) {
    const res = await fetch(API_BASE + path, Object.assign({
      headers: { 'Content-Type': 'application/json' }
    }, options));
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || ('Request failed (' + res.status + ')'));
    }
    return res.json();
  }

  async function refreshCart() {
    try {
      const cart = await apiCall('/api/cart/' + CART_ID);
      updateBadge(cart.itemCount);
      renderCart(cart);
      return cart;
    } catch (err) {
      updateBadge(0);
      return null;
    }
  }

  function renderCart(cart) {
    const itemsEl = document.getElementById('cartItems');
    const footEl = document.getElementById('cartFoot');

    if (!cart || cart.items.length === 0) {
      itemsEl.innerHTML = '<div class="cart-empty">Your cart is empty.<br>Add something from the collection.</div>';
      footEl.style.display = 'none';
      return;
    }

    footEl.style.display = 'block';
    document.getElementById('cartSubtotal').textContent = money(cart.subtotalCents);

    itemsEl.innerHTML = cart.items.map(item => `
      <div class="cart-line" data-item-id="${item.id}">
        <div class="cart-line-thumb" style="color:var(--${item.accent})">${ICONS.tshirt}</div>
        <div class="cart-line-info">
          <h5>${item.name}</h5>
          <div class="meta">SIZE ${item.size} · ${item.dose}</div>
          <div class="qty-stepper">
            <button data-action="dec" aria-label="Decrease quantity">${ICONS.minus}</button>
            <span>${item.quantity}</span>
            <button data-action="inc" aria-label="Increase quantity">${ICONS.plus}</button>
          </div>
        </div>
        <div style="display:flex; flex-direction:column; align-items:flex-end; gap:10px;">
          <div class="cart-line-price">${money(item.lineTotalCents)}</div>
          <button class="cart-line-remove" data-action="remove" aria-label="Remove item">${ICONS.trash}</button>
        </div>
      </div>
    `).join('');
  }

  // ----- cart drawer open/close -----
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  function openCart() { overlay.classList.add('open'); drawer.classList.add('open'); }
  function closeCart() { overlay.classList.remove('open'); drawer.classList.remove('open'); }
  document.getElementById('cartToggle').addEventListener('click', () => { openCart(); refreshCart(); });
  document.getElementById('cartClose').addEventListener('click', closeCart);
  overlay.addEventListener('click', closeCart);

  function attachProductHandlers() {
    // This function is now mostly handled inside loadFeaturedProducts to ensure it runs after products are loaded.
    // We can keep it for any other generic handlers if needed in the future.
  }

  // ----- quantity / remove inside drawer -----
  document.getElementById('cartItems').addEventListener('click', async (e) => {
    const line = e.target.closest('.cart-line');
    if (!line) return;
    const itemId = line.dataset.itemId;
    const action = e.target.closest('button')?.dataset.action;
    if (!action) return;

    try {
      if (action === 'remove') {
        const cart = await apiCall('/api/cart/' + CART_ID + '/items/' + itemId, { method: 'DELETE' });
        updateBadge(cart.itemCount); renderCart(cart);
      } else {
        const qtySpan = line.querySelector('.qty-stepper span');
        let qty = parseInt(qtySpan.textContent, 10);
        qty = action === 'inc' ? qty + 1 : qty - 1;
        const cart = await apiCall('/api/cart/' + CART_ID + '/items/' + itemId, {
          method: 'PATCH',
          body: JSON.stringify({ quantity: qty })
        });
        updateBadge(cart.itemCount); renderCart(cart);
      }
    } catch (err) {
      showToast('Could not update cart', true);
    }
  });

  // ----- checkout -----
  const paymentOptions = document.querySelectorAll('.payment-option');
  const paymentMethodLabel = document.getElementById('paymentMethodLabel');
  let selectedPayment = 'visa';

  paymentOptions.forEach(option => {
    option.addEventListener('click', () => {
      paymentOptions.forEach(item => item.classList.remove('active'));
      option.classList.add('active');
      selectedPayment = option.dataset.payment;
      paymentMethodLabel.textContent = selectedPayment === 'paypal' ? 'PayPal' : 'Visa';
    });
  });

  document.getElementById('checkoutBtn').addEventListener('click', async () => {
    const emailInput = document.getElementById('checkoutEmail');
    const msgEl = document.getElementById('cartMsg');
    const email = emailInput.value.trim();

    if (!email || !email.includes('@')) {
      msgEl.textContent = 'Enter a valid email to continue.';
      msgEl.classList.add('error');
      return;
    }
    msgEl.classList.remove('error');
    msgEl.textContent = 'Processing ' + (selectedPayment === 'paypal' ? 'PayPal' : 'Visa') + ' payment…';

    try {
      const order = await apiCall('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({ cartId: CART_ID, email })
      });
      updateBadge(0);
      document.getElementById('cartItems').innerHTML = `
        <div class="order-confirm">
          <div class="icon-check">${ICONS.check}</div>
          <h4>Payment received</h4>
          <p>${selectedPayment === 'paypal' ? 'PayPal' : 'Visa'} payment was accepted for ${order.email}.</p>
          <div class="order-num">${order.orderNumber} · ${money(order.totalCents)}</div>
        </div>`;
      document.getElementById('cartFoot').style.display = 'none';
      showToast((selectedPayment === 'paypal' ? 'PayPal' : 'Visa') + ' payment confirmed');
    } catch (err) {
      msgEl.textContent = err.message || 'Checkout failed — is the backend running?';
      msgEl.classList.add('error');
    }
  });

  // page transition behavior
  const pageOverlay = document.getElementById('pageTransitionOverlay');
  window.addEventListener('load', () => {
    pageOverlay.classList.remove('active');
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (event) => {
      const target = link.getAttribute('href');
      if (!target || target === '#') return;

      const destination = document.querySelector(target);
      if (!destination) return;

      event.preventDefault();
      pageOverlay.classList.add('active');

      setTimeout(() => {
        destination.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.location.hash = target;
        setTimeout(() => pageOverlay.classList.remove('active'), 650);
      }, 180);
    });
  });

  // ----- theme switcher -----
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.getElementById('themeIconSun');
  const moonIcon = document.getElementById('themeIconMoon');

  function setTheme(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    sunIcon.style.display = isDark ? 'none' : 'block';
    moonIcon.style.display = isDark ? 'block' : 'none';
    localStorage.setItem('med_theme_dark', isDark);
  }

  themeToggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-mode');
    setTheme(isDark);
  });

  // check for saved theme preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('med_theme_dark');
  setTheme(savedTheme === 'true' || (savedTheme === null && prefersDark));

  // ----- Hide nav on scroll -----
  let lastScrollY = window.scrollY;
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (lastScrollY < window.scrollY && window.scrollY > 100) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
  });

  // ----- Back to Top Button -----
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- GSAP Animations ---
  document.addEventListener('DOMContentLoaded', () => {
    gsap.utils.toArray('.product-card').forEach(card => {
      const inner = card.querySelector('.product-card-inner');
      const btn = card.querySelector('.btn-add');
      gsap.set(inner, { transformStyle: 'preserve-3d', transformPerspective: 1000 });

      card.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        gsap.to(inner, {
          rotationY: x * 15,
          rotationX: -y * 15,
          boxShadow: `${x * -20}px ${y * -20}px 40px -10px rgba(0,0,0,0.2)`,
          ease: 'power1.out',
          duration: 0.8
        });
      });

      card.addEventListener('mouseenter', () => {
        gsap.to(btn, {
          opacity: 1,
          y: 0,
          scale: 1.05,
          backgroundColor: 'var(--vital)',
          color: 'var(--paper)',
          duration: 0.4,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(inner, { rotationY: 0, rotationX: 0, boxShadow: '0 10px 30px -15px rgba(0,0,0,0.1)', duration: 1, ease: 'elastic.out(1, 0.5)' });
        gsap.to(btn, { opacity: 0, y: 10, scale: 1, backgroundColor: 'rgba(255,255,255,0.92)', color: 'var(--ink)', duration: 0.3 });
      });
    });
  });

  // initial badge sync (fails silently if backend isn't running yet)
  refreshCart();
  loadFeaturedProducts();
</script>
</body>
</html>
