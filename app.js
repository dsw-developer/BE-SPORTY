const menuBtn=document.getElementById("menuBtn");
const mobileNav=document.getElementById("mobileNav");
const closeMenu=document.getElementById("closeMenu");
const menuBackdrop=document.getElementById("menuBackdrop");
const searchInput=document.getElementById("searchInput");
const clearSearch=document.getElementById("clearSearch");
const cards=[...document.querySelectorAll(".product-card")];
const noResults=document.getElementById("noResults");

function setMenu(open){
  mobileNav?.classList.toggle("open",open);
  menuBtn?.classList.toggle("open",open);
  menuBackdrop?.classList.toggle("open",open);
  document.body.classList.toggle("menu-open",open);
  menuBtn?.setAttribute("aria-expanded",String(open));
  menuBtn?.setAttribute("aria-label",open?"Fechar menu":"Abrir menu");
}
menuBtn?.addEventListener("click",()=>setMenu(!mobileNav?.classList.contains("open")));
closeMenu?.addEventListener("click",()=>setMenu(false));
menuBackdrop?.addEventListener("click",()=>setMenu(false));
mobileNav?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>setMenu(false)));
document.addEventListener("keydown",e=>{if(e.key==="Escape")setMenu(false)});

function filterProducts(){
  const term=(searchInput?.value||"").trim().toLowerCase();
  let visible=0;
  cards.forEach(card=>{
    const text=(card.dataset.name||card.textContent||"").toLowerCase();
    const match=!term||text.includes(term);
    card.style.display=match?"":"none";
    if(match)visible++;
  });
  if(noResults)noResults.style.display=visible?"none":"block";
}
searchInput?.addEventListener("input",filterProducts);
clearSearch?.addEventListener("click",()=>{
  if(!searchInput)return;
  searchInput.value="";searchInput.focus();filterProducts();
});

const year=document.getElementById("year");
if(year)year.textContent=new Date().getFullYear();

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}})
},{threshold:.12});
document.querySelectorAll(".reveal").forEach((el,i)=>{
  el.style.transitionDelay=`${Math.min(i*45,240)}ms`;
  observer.observe(el);
});

function comprar(botao){
  const produto=botao?.closest(".product-card");
  if(!produto)return;
  const nome=produto.querySelector("h3")?.textContent.trim()||"Produto";
  const preco=produto.querySelector(".price")?.textContent.trim()||"";
  const disponibilidade=produto.querySelector(".availability")?.textContent.trim()||"";
  const categoria=produto.querySelector(".category")?.textContent.trim()||"";
  const mensagem=`Olá, Be Sporty! 👋

Tenho interesse em comprar este produto:

🛍️ Produto: ${nome}
🏷️ Categoria: ${categoria}
${preco?`💰 Preço: ${preco}`:""}${disponibilidade?`\n📏 ${disponibilidade}`:""}

Gostaria de confirmar a disponibilidade e saber como posso efetuar a compra.

Obrigado!`;
  window.open("https://wa.me/244943379573?text="+encodeURIComponent(mensagem),"_blank","noopener");
}
window.comprar=comprar;


// Professional UX enhancements
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (header) header.classList.toggle("scrolled", window.scrollY > 12);
}, {passive:true});

document.addEventListener("keydown", e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    searchInput?.focus();
  }
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".desktop-nav a")];
if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + entry.target.id
      ));
    });
  }, {rootMargin:"-35% 0px -55% 0px", threshold:0});
  sections.forEach(section => sectionObserver.observe(section));
}

document.querySelectorAll(".product-card").forEach(card => {
  card.addEventListener("pointermove", e => {
    if (window.innerWidth < 900) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(900px) rotateX(${(-y*2).toFixed(2)}deg) rotateY(${(x*2).toFixed(2)}deg) translateY(-7px)`;
  });
  card.addEventListener("pointerleave", () => card.style.transform = "");
});


// Full dynamic interaction layer
window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("pageLoader")?.classList.add("loaded"), 450);
});

const cursorGlow = document.getElementById("cursorGlow");
if (cursorGlow && window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("pointermove", e => {
    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";
    cursorGlow.style.opacity = "1";
  }, {passive:true});
}

document.querySelectorAll("a,button,.product-card").forEach(el => {
  el.addEventListener("mouseenter", () => {
    if (cursorGlow) cursorGlow.style.opacity = ".55";
  });
  el.addEventListener("mouseleave", () => {
    if (cursorGlow) cursorGlow.style.opacity = "1";
  });
});

// Subtle parallax on the hero, disabled on touch devices.
if (window.matchMedia("(pointer:fine)").matches) {
  const hero = document.querySelector(".hero");
  const heroCopy = document.querySelector(".hero-copy");
  const heroBadge = document.querySelector(".hero-badge");
  window.addEventListener("pointermove", e => {
    if (!hero || window.scrollY > hero.offsetHeight) return;
    const x = (e.clientX / window.innerWidth - .5);
    const y = (e.clientY / window.innerHeight - .5);
    if (heroCopy) heroCopy.style.transform = `translate3d(${x*5}px,${y*4}px,0)`;
    if (heroBadge) heroBadge.style.marginRight = `${x*-12}px`;
  }, {passive:true});
}

// Reveal elements entering viewport, including newly added dynamic sections.
const dynamicObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      dynamicObserver.unobserve(entry.target);
    }
  });
}, {threshold:.08});
document.querySelectorAll(".benefit-card,.quick-category-inner a,.statement-content").forEach((el,i)=>{
  el.classList.add("reveal");
  el.style.transitionDelay = `${Math.min(i*70,280)}ms`;
  dynamicObserver.observe(el);
});
