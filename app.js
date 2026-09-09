const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const cards = [...document.querySelectorAll(".product-card")];
const noResults = document.getElementById("noResults");

menuBtn?.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

mobileNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuBtn?.setAttribute("aria-expanded", "false");
  });
});

function filterProducts() {
  const term = searchInput.value.trim().toLowerCase();
  let visible = 0;

  cards.forEach(card => {
    const text = card.dataset.name.toLowerCase();
    const match = !term || text.includes(term);
    card.style.display = match ? "" : "none";
    if (match) visible++;
  });

  noResults.style.display = visible ? "none" : "block";
}

searchInput?.addEventListener("input", filterProducts);
clearSearch?.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  filterProducts();
});

document.getElementById("year").textContent = new Date().getFullYear();
