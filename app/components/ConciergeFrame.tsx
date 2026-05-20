"use client";
import Script from "next/script";

const FRAMEABLE = [
  "app.mplannerpro.com",
  "dreamsscore.biz",
  "ownly-gap-audit.vercel.app",
  "ownly-business-credit-builder.vercel.app",
  "campbellwa.vercel.app",
  "ownly-web-studio.vercel.app",
  "the-ownly-breakthrough.vercel.app",
  "itsownlymoney.vercel.app",
  "venice50kchallenge.com",
  "venicebusinessacademy.com",
  "localspotlightads.com",
];

export default function ConciergeFrame() {
  const js = `(function(){
  const FRAMEABLE = ${JSON.stringify(FRAMEABLE)};
  const style = document.createElement('style');
  style.textContent = \`
    #ownly-concierge{position:fixed;inset:0;z-index:9999;display:none;background:rgba(15,31,57,.92);backdrop-filter:blur(8px);animation:ocFade .25s ease-out}
    #ownly-concierge.open{display:flex;flex-direction:column}
    @keyframes ocFade{from{opacity:0}to{opacity:1}}
    .oc-bar{display:flex;align-items:center;justify-content:space-between;padding:12px 18px;background:linear-gradient(180deg,#0F1F39 0%,#1B3C73 100%);border-bottom:1px solid rgba(184,150,90,.25);color:#FDFCF8;font-family:'Inter',sans-serif}
    .oc-brand{display:flex;align-items:center;gap:10px;font-weight:700;font-size:14px;letter-spacing:.02em}
    .oc-brand .oc-dot{width:8px;height:8px;border-radius:50%;background:#B8965A;box-shadow:0 0 12px rgba(184,150,90,.7)}
    .oc-title{font-size:12px;opacity:.7;font-weight:500;max-width:50vw;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .oc-actions{display:flex;gap:8px}
    .oc-btn{background:transparent;border:1px solid rgba(184,150,90,.35);color:#D4B87A;padding:6px 14px;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;text-decoration:none}
    .oc-btn:hover{background:rgba(184,150,90,.1)}
    .oc-btn.oc-close{border-color:rgba(255,255,255,.2);color:#FDFCF8}
    .oc-frame-wrap{flex:1;position:relative;background:#fff}
    .oc-frame-wrap iframe{width:100%;height:100%;border:0;background:#fff}
    .oc-toast{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);max-width:480px;width:90%;background:linear-gradient(135deg,#0F1F39,#1B3C73);border:1px solid rgba(184,150,90,.4);border-radius:18px;padding:36px 32px;color:#FDFCF8;text-align:center;box-shadow:0 30px 80px rgba(0,0,0,.6);font-family:'Inter',sans-serif;z-index:10000;display:none;animation:ocFade .3s ease-out}
    .oc-toast.show{display:block}
    .oc-toast h3{font-family:'Cormorant Garamond',serif;color:#D4B87A;font-size:28px;margin:0 0 12px;font-weight:500;font-style:italic}
    .oc-toast p{color:rgba(253,252,248,.8);font-size:15px;line-height:1.55;margin:0 0 22px}
    .oc-toast .oc-primary{display:inline-block;background:linear-gradient(135deg,#B8965A,#D4B87A);color:#0F1F39;padding:12px 26px;border-radius:999px;font-weight:700;text-decoration:none;font-size:14px;margin-right:8px}
    .oc-toast .oc-secondary{display:inline-block;background:transparent;border:1px solid rgba(255,255,255,.25);color:#FDFCF8;padding:12px 26px;border-radius:999px;font-weight:700;cursor:pointer;font-size:14px;font-family:inherit}
  \`;
  document.head.appendChild(style);

  const shell = document.createElement('div');
  shell.id = 'ownly-concierge';
  shell.innerHTML = \`
    <div class="oc-bar">
      <div class="oc-brand"><span class="oc-dot"></span>Ownly ONCE <span class="oc-title" id="oc-title"></span></div>
      <div class="oc-actions">
        <a class="oc-btn" id="oc-open-tab" target="_blank" rel="noopener">Open in new tab ↗</a>
        <button class="oc-btn oc-close" id="oc-close">← Back to Ownly</button>
      </div>
    </div>
    <div class="oc-frame-wrap"><iframe id="oc-frame" referrerpolicy="no-referrer-when-downgrade" allow="payment; microphone; camera; clipboard-read; clipboard-write" sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe></div>
  \`;
  document.body.appendChild(shell);

  const toast = document.createElement('div');
  toast.className = 'oc-toast';
  toast.id = 'oc-toast';
  toast.innerHTML = \`
    <h3>Opening in a new tab</h3>
    <p id="oc-toast-msg">This partner doesn&rsquo;t allow embedded preview. We&rsquo;ll open it in a new tab so their security stays intact &mdash; come right back when you&rsquo;re done.</p>
    <a class="oc-primary" id="oc-toast-go" target="_blank" rel="noopener">Continue &rarr;</a>
    <button class="oc-secondary" id="oc-toast-cancel">Stay here</button>
  \`;
  document.body.appendChild(toast);

  const frame = document.getElementById('oc-frame');
  const titleEl = document.getElementById('oc-title');
  const openTabEl = document.getElementById('oc-open-tab');
  document.getElementById('oc-close').onclick = closeFrame;
  document.getElementById('oc-toast-cancel').onclick = closeToast;

  function isFrameable(url){
    try{ return FRAMEABLE.includes(new URL(url, window.location.href).hostname); } catch(e){ return false; }
  }
  function openFrame(url, label){
    titleEl.textContent = label ? '· ' + label : '';
    openTabEl.href = url; frame.src = url;
    shell.classList.add('open'); document.body.style.overflow = 'hidden';
  }
  function closeFrame(){
    shell.classList.remove('open'); frame.src = 'about:blank'; document.body.style.overflow = '';
  }
  function openToast(url, label){
    document.getElementById('oc-toast-msg').textContent = label
      ? label + ' opens outside Ownly — we will launch it in a new tab so your spot here stays warm. Come right back when you are done.'
      : 'This partner does not allow embedded preview. We will open it in a new tab — come right back when you are done.';
    const go = document.getElementById('oc-toast-go');
    go.href = url;
    go.onclick = () => setTimeout(closeToast, 600);
    toast.classList.add('show');
  }
  function closeToast(){ toast.classList.remove('show'); }

  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[data-frame="modal"]');
    if(!a) return;
    const href = a.getAttribute('href');
    if(!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    e.preventDefault();
    const label = a.textContent.trim().slice(0, 60);
    if(isFrameable(href)){ openFrame(href, label); } else { openToast(href, label); }
    try { navigator.sendBeacon && navigator.sendBeacon('/api/route-click', new Blob([JSON.stringify({type:'cta',href,label,ts:Date.now()})], { type: 'application/json' })); } catch(_){}
  });

  document.addEventListener('keydown', e => { if(e.key === 'Escape'){ closeFrame(); closeToast(); } });
})();`;
  return (
    <Script id="ownly-concierge" strategy="afterInteractive">
      {js}
    </Script>
  );
}
