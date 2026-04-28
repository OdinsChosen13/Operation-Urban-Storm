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