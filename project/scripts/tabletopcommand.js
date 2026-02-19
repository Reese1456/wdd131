// ─── Dynamic footer ───────────────────────────────────────────────────────────
const yearEl = document.getElementById("currentyear");
const modEl  = document.getElementById("lastModified");
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (modEl)  modEl.textContent  = document.lastModified;

// ─── Hamburger Menu ───────────────────────────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const mainNav   = document.getElementById("main-nav");

if (hamburger && mainNav) {
    hamburger.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("is-open");
        hamburger.classList.toggle("is-open", isOpen);
        hamburger.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("is-open");
            hamburger.classList.remove("is-open");
            hamburger.setAttribute("aria-expanded", "false");
        });
    });

    document.addEventListener("click", (e) => {
        if (!hamburger.contains(e.target) && !mainNav.contains(e.target)) {
            mainNav.classList.remove("is-open");
            hamburger.classList.remove("is-open");
            hamburger.setAttribute("aria-expanded", "false");
        }
    });
}

// ─── Game Data ────────────────────────────────────────────────────────────────

const LIGHT_VEHICLES = [
    {
        name: "APC",
        cost: "1 Ore",
        move: '6"',
        hp: 1,
        ad: 1,
        toHit: "4+",
        attRange: '6"',
        special: null,
        specialDesc: null,
        category: "light",
        image: "images/APC.jpg",
        flavour: "A rugged all-terrain carrier — first boots on any contested moon."
    },
    {
        name: "Enforcer",
        cost: "2 Ore, 1 Energy",
        move: '4"',
        hp: 2,
        ad: 1,
        toHit: "3+",
        attRange: '6"',
        special: "Armored",
        specialDesc: "Attackers suffer &minus;1 to hit against this unit.",
        category: "light",
        image: "images/Enforcer.jpg",
        flavour: "Slow but nearly impervious &mdash; a walking wall of composite alloy."
    },
    {
        name: "Strider",
        cost: "1 Ore, 1 Energy",
        move: '10"',
        hp: 1,
        ad: 1,
        toHit: "5+",
        attRange: '10"',
        special: "Quick Attack",
        specialDesc: "Can use any unused movement after attacking.",
        category: "light",
        image: "images/Strider.jpg",
        flavour: "Spider-legged recon unit &mdash; strikes fast, retreats faster."
    }
];

const HEAVY_VEHICLES = [
    {
        name: "Vanguard Tank",
        cost: "3 Ore, 2 Energy",
        move: '5"',
        hp: 3,
        ad: 2,
        toHit: "4+",
        attRange: '10"',
        special: "Ignores Armored",
        specialDesc: "Bypasses the Armored special rule entirely.",
        category: "heavy",
        image: "images/Vanguard.jpg",
        flavour: "The hammer of any offensive push. Nothing stays standing for long."
    }
];

const BUILDINGS = [
    {
        name: "Headquarters (HQ)",
        cost: "Start",
        hp: 12,
        functions: "Core structure. Safe haven for workers. Produces additional Workers.",
        special: "Destroying the enemy HQ wins the game.",
        image: "images/HQ.jpg",
        icon: "HQ"
    },
    {
        name: "Generator",
        cost: "2 Ore",
        hp: 4,
        functions: "+1 Energy per round.",
        special: null,
        image: "images/Generator.png",
        icon: "GEN"
    },
    {
        name: "Mine",
        cost: "2 Ore",
        hp: 4,
        functions: "With a Worker assigned: +2 Ore per round. Supports up to 3 workers.",
        special: null,
        image: "images/mine.png",
        icon: "ORE"
    },
    {
        name: "Research Center",
        cost: "2 Ore, 1 Energy",
        hp: 4,
        functions: "Unlocks Tier 2 units & advanced upgrades. Worker assigned: +1 Knowledge per round.",
        special: null,
        image: "images/research-center.png",
        icon: "R&D"
    },
    {
        name: "Light Vehicle Factory",
        cost: "3 Ore, 1 Energy",
        hp: 6,
        functions: "Produces Light Vehicles (APC, Enforcer, Strider). Units produced can act immediately.",
        special: null,
        image: "images/light-vehicle-factory.png",
        icon: "LVF"
    },
    {
        name: "Heavy Arms Factory",
        cost: "4 Ore, 2 Energy",
        hp: 8,
        functions: "Produces Heavy Vehicles (Vanguard Tank and future units).",
        special: null,
        image: "images/heavy-vehicle-factory.png",
        icon: "HAF"
    },
    {
        name: "Turret",
        cost: "2 Ore, 1 Energy",
        hp: 2,
        functions: '1 AD, 4+ to hit, 6" range. Stationary defensive structure.',
        special: "Protects workers at adjacent buildings. Must be destroyed before workers there can be targeted.",
        image: "images/turret.png",
        icon: "TRT"
    }
];

// ─── Card Rendering Helpers ───────────────────────────────────────────────────

function renderStatBadge(label, value) {
    return `<div class="stat-badge">
        <span class="stat-label">${label}</span>
        <span class="stat-value">${value}</span>
    </div>`;
}

function renderUnitCard(unit) {
    const specialHTML = unit.special
        ? `<div class="unit-special">
               <span class="special-tag">${unit.special}</span>
               <p class="special-desc">${unit.specialDesc}</p>
           </div>`
        : `<div class="unit-special">
               <span class="special-tag no-special">No Special Rule</span>
           </div>`;

    const imageHTML = unit.image
        ? `<div class="unit-img-wrap">
               <img
                   src="${unit.image}"
                   alt="${unit.name} miniature"
                   class="unit-img"
                   loading="lazy"
                   decoding="async"
                   width="400"
                   height="300"
               >
           </div>`
        : '';

    return `
    <article class="unit-card ${unit.category}">
        ${imageHTML}
        <div class="unit-card-body">
            <div class="unit-card-header">
                <h3 class="unit-name">${unit.name}</h3>
                <span class="unit-category-tag">${unit.category === 'light' ? 'Light' : 'Heavy'}</span>
            </div>
            <p class="unit-flavour">${unit.flavour}</p>
            <div class="unit-stats">
                ${renderStatBadge("Cost", unit.cost)}
                ${renderStatBadge("Move", unit.move)}
                ${renderStatBadge("HP", unit.hp)}
                ${renderStatBadge("AD", unit.ad)}
                ${renderStatBadge("To-Hit", unit.toHit)}
                ${renderStatBadge("Range", unit.attRange)}
            </div>
            ${specialHTML}
        </div>
    </article>`;
}

function renderBuildingCard(b) {
    const specialHTML = b.special
        ? `<p class="building-special"><strong>Special:</strong> ${b.special}</p>`
        : '';

    const imageHTML = b.image
        ? `<div class="building-img-wrap">
               <img
                   src="${b.image}"
                   alt="${b.name} miniature"
                   class="building-img"
                   loading="lazy"
                   decoding="async"
                   width="400"
                   height="300"
               >
           </div>`
        : `<div class="building-icon-block">${b.icon}</div>`;

    return `
    <article class="building-card">
        ${imageHTML}
        <div class="building-info">
            <h3 class="building-name">${b.name}</h3>
            <div class="building-meta">
                <span class="building-cost">Cost: ${b.cost}</span>
                <span class="building-hp">${b.hp} HP</span>
            </div>
            <p class="building-functions">${b.functions}</p>
            ${specialHTML}
        </div>
    </article>`;
}

// ─── Page Initializers ────────────────────────────────────────────────────────

function initUnitsPage() {
    const lightGrid = document.getElementById("light-vehicles-grid");
    const heavyGrid = document.getElementById("heavy-vehicles-grid");
    if (lightGrid) lightGrid.innerHTML = LIGHT_VEHICLES.map(renderUnitCard).join('');
    if (heavyGrid) {
        const tbaCard = `
        <article class="unit-card heavy tba">
            <div class="tba-inner"><span>More units<br>coming soon</span></div>
        </article>`;
        heavyGrid.innerHTML = HEAVY_VEHICLES.map(renderUnitCard).join('') + tbaCard;
    }
}

function initBuildingsPage() {
    const grid = document.getElementById("buildings-grid");
    if (grid) grid.innerHTML = BUILDINGS.map(renderBuildingCard).join('');
}

// Auto-init based on page content
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("light-vehicles-grid")) initUnitsPage();
    if (document.getElementById("buildings-grid"))      initBuildingsPage();
});