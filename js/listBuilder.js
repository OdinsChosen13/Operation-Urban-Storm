// ============================================
// OPERATION URBAN STORM - LIST BUILDER
// Version 1.6.0
// Unit data sourced from OUS Unit Card Master
// To update a unit: find it below and edit
// ============================================

const GAME_VERSION = "1.6.0";
const POINTS_LIMIT = 1000;

const factions = {
  "us-army": {
    name: "US Army",
    color: "#4a7c59",
    accent: "#8fbc8f",
    units: [
      {
        id: "usa_ssg",
        name: "Staff Sergeant",
        role: "Squad Leader",
        pts: 110,
        stats: { MOV: '6"', MOR: 4, CEV: 3, DR: "6+" },
        weapons: [
          { name: "M4A1 Carbine", dice: 5, hit: "5+", range: '36"', keywords: "" },
          { name: "M9 Pistol", dice: 3, hit: "6+", range: '14"', keywords: "CQB" }
        ],
        abilities: ["Squad Leader (3\")", "Authority Override", "Rally", "Fireteam Cohesion", "Coordinated Fire"],
        upgrades: { weapon: 1, equipment: 1, support: 1 },
        required: true,
        maxPerList: 1
      },
      {
        id: "usa_sgt",
        name: "Sergeant",
        role: "Team Leader",
        pts: 100,
        stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "6+" },
        weapons: [
          { name: "M4A1 Carbine", dice: 5, hit: "5+", range: '36"', keywords: "" },
          { name: "M9 Pistol", dice: 3, hit: "6+", range: '14"', keywords: "CQB" }
        ],
        abilities: ["Stress Transfer", "Fireteam Cohesion", "Coordinated Fire", "Lead From The Front"],
        upgrades: { weapon: 1, equipment: 1, support: 1 }
      },
      {
        id: "usa_pfc",
        name: "Private First Class",
        role: "Rifleman",
        pts: 90,
        stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "6+" },
        weapons: [
          { name: "M4A1 Carbine", dice: 5, hit: "5+", range: '36"', keywords: "" },
          { name: "M9 Pistol", dice: 3, hit: "6+", range: '14"', keywords: "CQB" }
        ],
        abilities: ["Fireteam Cohesion", "Coordinated Fire"],
        upgrades: { weapon: 1, equipment: 1, support: 1 }
      },
      {
        id: "usa_mg",
        name: "Machine Gunner",
        role: "Specialist",
        pts: 110,
        stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "6+" },
        weapons: [
          { name: "M249 SAW", dice: 7, hit: "6+", range: '36"', keywords: "ENC / C-FIRE" },
          { name: "M9 Pistol", dice: 3, hit: "6+", range: '14"', keywords: "CQB" }
        ],
        abilities: ["Fireteam Cohesion", "Coordinated Fire"],
        upgrades: { equipment: 1, support: 1 }
      },
      {
        id: "usa_gren",
        name: "Grenadier",
        role: "Specialist",
        pts: 100,
        stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "6+" },
        weapons: [
          { name: "M4A1 Carbine", dice: 5, hit: "5+", range: '36"', keywords: "" },
          { name: "M203 Launcher", dice: 4, hit: "6+", range: '14"', keywords: "IDF / EXPL(2) / RLD" },
          { name: "M203 Smoke", dice: 1, hit: "-", range: '14"', keywords: "IDF / SMOKE / RLD" },
          { name: "M9 Pistol", dice: 3, hit: "6+", range: '14"', keywords: "CQB" }
        ],
        abilities: ["Fireteam Cohesion (M4A1 only)", "Coordinated Fire (M4A1 only)"],
        upgrades: { weapon: 1, equipment: 2 }
      },
      {
        id: "usa_medic",
        name: "Combat Medic",
        role: "Specialist",
        pts: 110,
        stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "6+" },
        weapons: [
          { name: "M4A1 Carbine", dice: 5, hit: "5+", range: '36"', keywords: "" },
          { name: "M9 Pistol", dice: 3, hit: "6+", range: '14"', keywords: "CQB" }
        ],
        abilities: ["Fireteam Cohesion", "Coordinated Fire", "Last Chance", "Field Treatment"],
        upgrades: { weapon: 1, equipment: 1, support: 2 }
      },
      {
        id: "usa_cqb",
        name: "CQB Specialist",
        role: "Specialist",
        pts: 110,
        stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "6+" },
        weapons: [
          { name: "MK18 CQBR", dice: 5, hit: "5+", range: '18"', keywords: "CQB" },
          { name: "M9 Pistol", dice: 3, hit: "6+", range: '14"', keywords: "CQB" }
        ],
        abilities: ["Fireteam Cohesion", "Coordinated Fire", "Aggressive Entry", "Urban Predator"],
        upgrades: { weapon: 1, equipment: 1 }
      },
      {
        id: "usa_marksman",
        name: "Marksman",
        role: "Specialist",
        pts: 100,
        stats: { MOV: '5"', MOR: 3, CEV: 3, DR: "6+" },
        weapons: [
          { name: "M110 SASS", dice: 3, hit: "4+", range: '36"', keywords: "" },
          { name: "M9 Pistol", dice: 3, hit: "6+", range: '14"', keywords: "CQB" }
        ],
        abilities: ["Fireteam Cohesion", "Coordinated Fire", "Steady Aim", "Urban Predator"],
        upgrades: { weapon: 1, equipment: 1, support: 1 }
      },
      {
        id: "usa_atspec",
        name: "AT Specialist",
        role: "Specialist",
        pts: 130,
        stats: { MOV: '6"', MOR: 3, CEV: 2, DR: "6+" },
        weapons: [
          { name: "M4A1 Carbine", dice: 5, hit: "5+", range: '36"', keywords: "" },
          { name: "FGM-148 Javelin", dice: 4, hit: "4+", range: '36"', keywords: "RLD / ENC / PEN(4) / DEPLOY" },
          { name: "M9 Pistol", dice: 3, hit: "6+", range: '14"', keywords: "CQB" }
        ],
        abilities: ["Fireteam Cohesion (M4A1 only)", "Coordinated Fire (M4A1 only)", "Deploy"],
        upgrades: { weapon: 1, equipment: 1, support: 1 }
      },
      {
        id: "usa_atloader",
        name: "AT Loader",
        role: "Private First Class",
        pts: 85,
        stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "6+" },
        weapons: [
          { name: "M4A1 Carbine", dice: 5, hit: "5+", range: '36"', keywords: "" },
          { name: "M9 Pistol", dice: 3, hit: "6+", range: '14"', keywords: "CQB" }
        ],
        abilities: ["Fireteam Cohesion", "Coordinated Fire", "Assisted Reload"],
        upgrades: { weapon: 1, equipment: 1, support: 1 }
      },
      {
        id: "usa_sniper",
        name: "Sniper",
        role: "Sergeant",
        pts: 120,
        stats: { MOV: '6"', MOR: 2, CEV: 2, DR: "7+" },
        weapons: [
          { name: "M24 SWS", dice: 2, hit: "3+", range: '36"', keywords: "RLD / ENC" },
          { name: "M9 Pistol", dice: 3, hit: "6+", range: '14"', keywords: "CQB" }
        ],
        abilities: ["Fireteam Cohesion", "Coordinated Fire"],
        upgrades: { support: 1 },
        note: "In development"
      }
    ]
  },
  "insurgents": {
    name: "Insurgents",
    color: "#7c4a2a",
    accent: "#dc9f6a",
    units: [
      {
        id: "ins_cl",
        name: "Cell Leader",
        role: "Squad Leader",
        pts: 100,
        stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "7+" },
        weapons: [
          { name: "AK-47", dice: 6, hit: "7+", range: '36"', keywords: "" },
          { name: "TT-33 Pistol", dice: 3, hit: "7+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Squad Leader (3\")", "Authority Override", "Rally", "Ambush Shock"],
        upgrades: { weapon: 1, equipment: 1, support: 1 },
        required: true,
        maxPerList: 1
      },
      {
        id: "ins_tl",
        name: "Team Leader",
        role: "Team Leader",
        pts: 80,
        stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "8+" },
        weapons: [
          { name: "AK-47", dice: 6, hit: "7+", range: '36"', keywords: "" },
          { name: "TT-33 Pistol", dice: 3, hit: "7+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Stress Transfer", "Ambush Shock", "Lead From The Front"],
        upgrades: { weapon: 1, equipment: 1, support: 1 }
      },
      {
        id: "ins_fighter",
        name: "Fighter",
        role: "Fighter",
        pts: 60,
        stats: { MOV: '6"', MOR: 2, CEV: 2, DR: "9+" },
        weapons: [
          { name: "AK-47", dice: 6, hit: "7+", range: '36"', keywords: "" },
          { name: "TT-33 Pistol", dice: 3, hit: "7+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Ambush Shock"],
        upgrades: { equipment: 1 }
      },
      {
        id: "ins_mg",
        name: "MG Weapons Fighter",
        role: "Machine Gunner",
        pts: 90,
        stats: { MOV: '6"', MOR: 2, CEV: 2, DR: "8+" },
        weapons: [
          { name: "RPK Machine Gun", dice: 7, hit: "8+", range: '36"', keywords: "ENC / C-FIRE" },
          { name: "TT-33 Pistol", dice: 3, hit: "7+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Ambush Shock"],
        upgrades: { equipment: 1, support: 1 }
      },
      {
        id: "ins_rpg",
        name: "RPG Weapons Fighter",
        role: "RPG Specialist",
        pts: 100,
        stats: { MOV: '6"', MOR: 2, CEV: 2, DR: "8+" },
        weapons: [
          { name: "AK-47", dice: 6, hit: "7+", range: '36"', keywords: "" },
          { name: "RPG-7", dice: 4, hit: "6+", range: '36"', keywords: "EXPL(2) / ENC / RLD" },
          { name: "TT-33 Pistol", dice: 3, hit: "7+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Ambush Shock"],
        upgrades: { equipment: 1 }
      },
      {
        id: "ins_cqb",
        name: "Street Fighter",
        role: "CQB Specialist",
        pts: 75,
        stats: { MOV: '6"', MOR: 2, CEV: 2, DR: "7+" },
        weapons: [
          { name: "AK-74U", dice: 6, hit: "8+", range: '24"', keywords: "CQB" },
          { name: "TT-33 Pistol", dice: 3, hit: "7+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Urban Predator", "Ambush Shock", "Aggressive Entry"],
        upgrades: { weapon: 1, equipment: 1 }
      },
      {
        id: "ins_marksman",
        name: "Marksman",
        role: "Veteran Fighter",
        pts: 75,
        stats: { MOV: '6"', MOR: 2, CEV: 2, DR: "9+" },
        weapons: [
          { name: "SVD Dragunov", dice: 3, hit: "4+", range: '36"', keywords: "CQB" },
          { name: "TT-33 Pistol", dice: 3, hit: "7+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Steady Aim", "Ambush Shock"],
        upgrades: { support: 1 }
      },
      {
        id: "ins_medic",
        name: "Field Medic",
        role: "Veteran Fighter",
        pts: 80,
        stats: { MOV: '6"', MOR: 2, CEV: 2, DR: "8+" },
        weapons: [
          { name: "AK-47", dice: 6, hit: "7+", range: '36"', keywords: "" },
          { name: "TT-33 Pistol", dice: 3, hit: "7+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Field Treatment", "Ambush Shock", "Last Chance"],
        upgrades: { equipment: 1, support: 1 }
      },
      {
        id: "ins_atgun",
        name: "AT Weapons Fighter",
        role: "AT Team Gunner",
        pts: 110,
        stats: { MOV: '6"', MOR: 2, CEV: 1, DR: "8+" },
        weapons: [
          { name: "AK-47", dice: 6, hit: "7+", range: '36"', keywords: "" },
          { name: "RPG-7", dice: 4, hit: "6+", range: '36"', keywords: "PEN(3) / ENC / RLD" },
          { name: "TT-33 Pistol", dice: 3, hit: "7+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Ambush Shock"],
        upgrades: { equipment: 1 }
      },
      {
        id: "ins_atloader",
        name: "AT Loader",
        role: "Fighter",
        pts: 60,
        stats: { MOV: '6"', MOR: 2, CEV: 2, DR: "9+" },
        weapons: [
          { name: "AK-47", dice: 6, hit: "7+", range: '36"', keywords: "" },
          { name: "TT-33 Pistol", dice: 3, hit: "7+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Ambush Shock", "Assisted Reload"],
        upgrades: { equipment: 1 }
      }
    ]
  }
};

// ============================================
// STATE - tracks what's happening right now
// ============================================

let selectedFaction = null;  // which faction is selected
let currentList = [];        // units added to the list
let totalPoints = 0;         // running points total

// ============================================
// INIT - runs when the page loads
// ============================================

document.addEventListener("DOMContentLoaded", function() {
  setupFactionButtons();
});

// ============================================
// FUNCTIONS
// ============================================

function setupFactionButtons() {
  const buttons = document.querySelectorAll(".faction-btn");
  
  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      const factionKey = button.getAttribute("data-faction");
      selectFaction(factionKey);
    });
  });
}

function selectFaction(factionKey) {
  selectedFaction = factions[factionKey];
  
  if (!selectedFaction) return;
  
  currentList = [];
  totalPoints = 0;
  
  renderUnitBrowser();
}
function renderUnitBrowser() {
  const app = document.getElementById("app");
  
  app.innerHTML = `
    <div id="points-bar">
      <span id="list-name">${selectedFaction.name}</span>
      <span id="points-display">0 / ${POINTS_LIMIT} PTS</span>
    </div>

    <div id="unit-browser">
      <div id="unit-list">
        <div class="section-label">SELECT UNITS</div>
        ${selectedFaction.units.map(function(unit) {
          return `
            <div class="unit-card" data-id="${unit.id}">
              <div class="unit-card-role">${unit.role}</div>
              <div class="unit-card-row">
                <span class="unit-card-name">${unit.name}</span>
                <span class="unit-card-pts">${unit.pts}pt</span>
              </div>
              ${unit.note ? `<div class="unit-note">⚠ ${unit.note}</div>` : ""}
            </div>
          `;
        }).join("")}
      </div>

      <div id="active-list">
        <div class="section-label">YOUR LIST</div>
        <div id="list-entries">
          <div class="empty-list">— NO UNITS ADDED —</div>
        </div>
      </div>
    </div>
  `;

  setupUnitCards();
}
function setupUnitCards() {
  const cards = document.querySelectorAll(".unit-card");
  
  cards.forEach(function(card) {
    card.addEventListener("click", function() {
      const unitId = card.getAttribute("data-id");
      addUnit(unitId);
    });
  });
}

function addUnit(unitId) {
  const unit = selectedFaction.units.find(function(u) {
    return u.id === unitId;
  });
  
  if (!unit) return;

  currentList.push({
    uid: unitId + "_" + Date.now(),
    unit: unit
  });

  totalPoints += unit.pts;
  
  updatePointsDisplay();
  updateListDisplay();
}
function updatePointsDisplay() {
  const display = document.getElementById("points-display");
  if (!display) return;

  display.textContent = totalPoints + " / " + POINTS_LIMIT + " PTS";

  if (totalPoints > POINTS_LIMIT) {
    display.style.color = "#e74c3c";
  } else if (totalPoints > POINTS_LIMIT * 0.85) {
    display.style.color = "#e67e22";
  } else {
    display.style.color = selectedFaction.accent;
  }
}

function updateListDisplay() {
  const listEntries = document.getElementById("list-entries");
  if (!listEntries) return;

  if (currentList.length === 0) {
    listEntries.innerHTML = `<div class="empty-list">— NO UNITS ADDED —</div>`;
    return;
  }

  listEntries.innerHTML = currentList.map(function(entry) {
    return `
      <div class="list-entry" data-uid="${entry.uid}">
        <div class="list-entry-info">
          <span class="list-entry-role">${entry.unit.role}</span>
          <span class="list-entry-name">${entry.unit.name}</span>
        </div>
        <div class="list-entry-right">
          <span class="list-entry-pts">${entry.unit.pts}pt</span>
          <button class="remove-btn" data-uid="${entry.uid}">✕</button>
        </div>
      </div>
    `;
  }).join("");

  setupRemoveButtons();
}

function setupRemoveButtons() {
  const buttons = document.querySelectorAll(".remove-btn");

  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      const uid = button.getAttribute("data-uid");
      removeUnit(uid);
    });
  });
}

function removeUnit(uid) {
  const entry = currentList.find(function(e) {
    return e.uid === uid;
  });

  if (!entry) return;

  totalPoints -= entry.unit.pts;
  currentList = currentList.filter(function(e) {
    return e.uid !== uid;
  });

  updatePointsDisplay();
  updateListDisplay();
}