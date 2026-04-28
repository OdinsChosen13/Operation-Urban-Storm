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
      { name: "M9 Pistol", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Squad Leader (3\")", "Rally", "Authority Override"],
    upgrades: [
      { socket: "EQUIPMENT", name: "Frag Grenade", pts: 8, effect: "EXPL 1 / LOB / ONE-SHOT" },
      { socket: "EQUIPMENT", name: "Smoke Grenade", pts: 6, effect: "SMOKE / LOB / ONE-SHOT" },
      { socket: "EQUIPMENT", name: "Flashbang", pts: 10, effect: "Defenders lose Ambush bonus this Breach. ONE-SHOT." },
      { socket: "EQUIPMENT", name: "AT4", pts: 15, effect: "PEN 2 / ENC / ONE-SHOT. List limit 2." },
      { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." },
      { socket: "EQUIPMENT", name: "SL Radio", pts: 25, effect: "Issue orders to RTO regardless of distance/LoS." }
    ],
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
      { name: "M9 Pistol", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Lead From The Front", "Stress Transfer", "Fireteam Cohesion"],
    upgrades: [
      { socket: "WEAPON", name: "XM7 Rifle", pts: 10, effect: "5D / 4+ / 36\" — replaces M4A1 Carbine" },
      { socket: "EQUIPMENT", name: "Frag Grenade", pts: 8, effect: "EXPL 1 / LOB / ONE-SHOT" },
      { socket: "EQUIPMENT", name: "Smoke Grenade", pts: 6, effect: "SMOKE / LOB / ONE-SHOT" },
      { socket: "EQUIPMENT", name: "Flashbang", pts: 10, effect: "Defenders lose Ambush bonus this Breach. ONE-SHOT." },
      { socket: "EQUIPMENT", name: "AT4", pts: 15, effect: "PEN 2 / ENC / ONE-SHOT. Leaders only. List limit 2." },
      { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." }
    ]
  },
  {
    id: "usa_pfc",
    name: "Private First Class",
    role: "Rifleman",
    pts: 90,
    stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "6+" },
    weapons: [
      { name: "M4A1 Carbine", dice: 5, hit: "5+", range: '36"', keywords: "" },
      { name: "M9 Pistol", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Fireteam Cohesion"],
    upgrades: [
      { socket: "WEAPON", name: "XM7 Rifle", pts: 10, effect: "5D / 4+ / 36\" — replaces M4A1 Carbine" },
      { socket: "EQUIPMENT", name: "Frag Grenade", pts: 8, effect: "EXPL 1 / LOB / ONE-SHOT" },
      { socket: "EQUIPMENT", name: "Smoke Grenade", pts: 6, effect: "SMOKE / LOB / ONE-SHOT" },
      { socket: "EQUIPMENT", name: "Flashbang", pts: 10, effect: "Defenders lose Ambush bonus this Breach. ONE-SHOT." },
      { socket: "EQUIPMENT", name: "M72 LAW", pts: 10, effect: "PEN 1 / ONE-SHOT. List limit 2." },
      { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." },
      { socket: "EQUIPMENT", name: "RTO Radio", pts: 25, effect: "Issue orders to friendlies within 2\". Requires SL Radio. List limit 1." }
    ]
  },
  {
    id: "usa_mg",
    name: "Machine Gunner",
    role: "Specialist",
    pts: 110,
    stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "6+" },
    weapons: [
      { name: "M249 SAW", dice: 7, hit: "6+", range: '36"', keywords: "C-FIRE / ENC" },
      { name: "M9 Pistol", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Fireteam Cohesion"],
    upgrades: [
      { socket: "EQUIPMENT", name: "Frag Grenade", pts: 8, effect: "EXPL 1 / LOB / ONE-SHOT" },
      { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." },
      { socket: "SUPPORT", name: "Bipod", pts: 10, effect: "+1 die on Shoot if this model did not Move this activation" },
      { socket: "SUPPORT", name: "Assault Pack", pts: 15, effect: "C-FIRE generates +2 Stress instead of +1" }
    ]
  },
  {
    id: "usa_gren",
    name: "Grenadier",
    role: "Specialist",
    pts: 100,
    stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "6+" },
    weapons: [
      { name: "M4A1 Carbine", dice: 5, hit: "5+", range: '36"', keywords: "" },
      { name: "M203 Launcher", dice: 3, hit: "7+", range: '14"', keywords: "IDF / EXPL 2 / RLD" },
      { name: "M203 Smoke", dice: 0, hit: "—", range: '14"', keywords: "IDF / SMOKE / RLD" },
      { name: "M9 Pistol", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Fireteam Cohesion (M4A1 only)"],
    upgrades: [
      { socket: "WEAPON", name: "XM7 Rifle", pts: 10, effect: "5D / 4+ / 36\" — replaces M4A1. M203 retained." },
      { socket: "EQUIPMENT", name: "Frag Grenade", pts: 8, effect: "EXPL 1 / LOB / ONE-SHOT" },
      { socket: "EQUIPMENT", name: "Smoke Grenade", pts: 6, effect: "SMOKE / LOB / ONE-SHOT" },
      { socket: "EQUIPMENT", name: "Flashbang", pts: 10, effect: "Defenders lose Ambush bonus this Breach. ONE-SHOT." },
      { socket: "EQUIPMENT", name: "M72 LAW", pts: 10, effect: "PEN 1 / ONE-SHOT. List limit 2." },
      { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." }
    ]
  },
  {
    id: "usa_medic",
    name: "Combat Medic",
    role: "Specialist",
    pts: 110,
    stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "6+" },
    weapons: [
      { name: "M4A1 Carbine", dice: 5, hit: "5+", range: '36"', keywords: "" },
      { name: "M9 Pistol", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Field Treatment", "Last Chance", "Fireteam Cohesion"],
    upgrades: [
      { socket: "EQUIPMENT", name: "M72 LAW", pts: 10, effect: "PEN 1 / ONE-SHOT. List limit 2." },
      { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." },
      { socket: "SUPPORT", name: "Advanced Aid Bag", pts: 15, effect: "Last Chance roll improved by 1" },
      { socket: "SUPPORT", name: "Trauma Kit", pts: 10, effect: "Field Treatment may target this model" }
    ]
  },
  {
    id: "usa_cqb",
    name: "CQB Specialist",
    role: "Specialist",
    pts: 110,
    stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "6+" },
    weapons: [
      { name: "Mk 18 CQBR", dice: 5, hit: "5+", range: '18"', keywords: "CQB" },
      { name: "M9 Pistol", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Aggressive Entry", "Urban Predator"],
    upgrades: [
      { socket: "WEAPON", name: "M590 Shotgun", pts: 15, effect: "6D / 6+ / 8\" / CQB — replaces Mk 18 CQBR" },
      { socket: "WEAPON", name: "M26 MASS", pts: 10, effect: "4D / 6+ / 8\" / CQB — underbarrel, Mk 18 retained" },
      { socket: "EQUIPMENT", name: "Flashbang", pts: 10, effect: "Defenders lose Ambush bonus this Breach. ONE-SHOT." },
      { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." }
    ]
  },
  {
    id: "usa_marksman",
    name: "Marksman",
    role: "Specialist",
    pts: 100,
    stats: { MOV: '5"', MOR: 3, CEV: 3, DR: "6+" },
    weapons: [
      { name: "M110 SASS", dice: 3, hit: "4+", range: '36"', keywords: "" },
      { name: "M9 Pistol", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Steady Aim"],
    upgrades: [
      { socket: "WEAPON", name: "Mk 12 SPR", pts: 10, effect: "4D / 4+ / 30\" — replaces M110 SASS" },
      { socket: "SUPPORT", name: "Rangefinder", pts: 15, effect: "+1 hit value on all Shoot actions. List limit 1." },
      { socket: "SUPPORT", name: "Bipod", pts: 10, effect: "+1 die on Shoot if this model did not Move this activation" }
    ]
  },
  {
    id: "usa_sniper",
    name: "Sniper",
    role: "Sniper Team",
    pts: 125,
    stats: { MOV: '6"', MOR: 2, CEV: 2, DR: "7+" },
    weapons: [
      { name: "M24 SWS", dice: 2, hit: "3+", range: '48"', keywords: "RLD / ENC" },
      { name: "M9 Pistol", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Concealment", "Minimum Range 8\"", "Coherency Range 2\""],
    upgrades: [
      { socket: "SUPPORT", name: "Ghillie Suit", pts: 20, effect: "Cannot be targeted beyond 8\" unless fired this turn" },
      { socket: "SUPPORT", name: "Bipod", pts: 10, effect: "+1 die on Shoot if this model did not Move this activation" }
    ],
    maxPerList: 1,
    independentOnly: true,
    note: "PROVISIONAL"
  },
  {
    id: "usa_spotter",
    name: "Spotter",
    role: "Sniper Team",
    pts: 85,
    stats: { MOV: '6"', MOR: 2, CEV: 3, DR: "7+" },
    weapons: [
      { name: "M4A1 Carbine", dice: 5, hit: "5+", range: '36"', keywords: "" },
      { name: "M9 Pistol", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Overwatch Correction", "Acquire Target"],
    upgrades: [
      { socket: "WEAPON", name: "XM7 Rifle", pts: 10, effect: "5D / 4+ / 36\" — replaces M4A1 Carbine" },
      { socket: "SUPPORT", name: "Laser Designator", pts: 8, effect: "Acquire Target grants +2 dice instead of +1" }
    ],
    maxPerList: 1,
    independentOnly: true,
    note: "PROVISIONAL"
  },
  {
    id: "usa_javelin",
    name: "Javelin Gunner",
    role: "AT Team",
    pts: 135,
    stats: { MOV: '6"', MOR: 3, CEV: 2, DR: "6+" },
    weapons: [
      { name: "FGM-148 Javelin", dice: 4, hit: "4+", range: '48"', keywords: "RLD / ENC / PEN 4 / Deploy" },
      { name: "M9 Pistol", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Deploy", "Minimum Range 6\"", "Coherency Range 2\""],
    upgrades: [
      { socket: "WEAPON", name: "M3 MAAWS", pts: 0, effect: "4D / 5+ / 24\" / RLD / PEN 2 / EXPL 2 — free swap, no Deploy" },
      { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." }
    ],
    maxPerList: 1,
    independentOnly: true
  },
  {
    id: "usa_atloader",
    name: "AT Loader",
    role: "AT Team",
    pts: 85,
    stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "6+" },
    weapons: [
      { name: "M4A1 Carbine", dice: 5, hit: "5+", range: '36"', keywords: "" },
      { name: "M9 Pistol", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Assisted Reload"],
    upgrades: [
      { socket: "WEAPON", name: "XM7 Rifle", pts: 10, effect: "5D / 4+ / 36\" — replaces M4A1 Carbine" },
      { socket: "EQUIPMENT", name: "Frag Grenade", pts: 8, effect: "EXPL 1 / LOB / ONE-SHOT" },
      { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." }
    ],
    maxPerList: 1,
    independentOnly: true
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
      { name: "AK-47 Rifle", dice: 6, hit: "7+", range: '36"', keywords: "" },
      { name: "TT-33 Pistol", dice: 3, hit: "7+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Squad Leader (3\")", "Rally", "Authority Override"],
    upgrades: [
      { socket: "WEAPON", name: "Shotgun", pts: 8, effect: "6D / 7+ / 8\" / CQB — replaces AK-47" },
      { socket: "WEAPON", name: "MP5", pts: 8, effect: "5D / 6+ / 12\" / CQB — replaces AK-47" },
      { socket: "EQUIPMENT", name: "Frag Grenade", pts: 8, effect: "EXPL 1 / LOB / ONE-SHOT" },
      { socket: "EQUIPMENT", name: "Smoke Grenade", pts: 6, effect: "SMOKE / LOB / ONE-SHOT" },
      { socket: "EQUIPMENT", name: "Flashbang", pts: 10, effect: "Defenders lose Ambush bonus this Breach. ONE-SHOT." },
      { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." }
    ],
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
      { name: "AK-47 Rifle", dice: 6, hit: "7+", range: '36"', keywords: "" },
      { name: "TT-33 Pistol", dice: 3, hit: "7+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Lead From The Front", "Stress Transfer"],
    upgrades: [
      { socket: "WEAPON", name: "Shotgun", pts: 8, effect: "6D / 7+ / 8\" / CQB — replaces AK-47" },
      { socket: "WEAPON", name: "MP5", pts: 8, effect: "5D / 6+ / 12\" / CQB — replaces AK-47" },
      { socket: "EQUIPMENT", name: "Frag Grenade", pts: 8, effect: "EXPL 1 / LOB / ONE-SHOT" },
      { socket: "EQUIPMENT", name: "Smoke Grenade", pts: 6, effect: "SMOKE / LOB / ONE-SHOT" },
      { socket: "EQUIPMENT", name: "Flashbang", pts: 10, effect: "Defenders lose Ambush bonus this Breach. ONE-SHOT." },
      { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." }
    ]
  },
  {
    id: "ins_fighter",
    name: "Fighter",
    role: "Infantry",
    pts: 60,
    stats: { MOV: '6"', MOR: 2, CEV: 2, DR: "9+" },
    weapons: [
      { name: "AK-47 Rifle", dice: 6, hit: "7+", range: '36"', keywords: "" },
      { name: "TT-33 Pistol", dice: 3, hit: "7+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Ambush Shock"],
    upgrades: [
      { socket: "EQUIPMENT", name: "Frag Grenade", pts: 8, effect: "EXPL 1 / LOB / ONE-SHOT" },
      { socket: "EQUIPMENT", name: "Smoke Grenade", pts: 6, effect: "SMOKE / LOB / ONE-SHOT" },
      { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." }
    ]
  },
  {
    id: "ins_mg",
    name: "MG Weapons Fighter",
    role: "Machine Gunner",
    pts: 90,
    stats: { MOV: '6"', MOR: 2, CEV: 2, DR: "8+" },
    weapons: [
      { name: "RPK", dice: 7, hit: "8+", range: '36"', keywords: "C-FIRE / ENC" },
      { name: "TT-33 Pistol", dice: 3, hit: "7+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Ambush Shock"],
    upgrades: [
      { socket: "EQUIPMENT", name: "Frag Grenade", pts: 8, effect: "EXPL 1 / LOB / ONE-SHOT" },
      { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." },
      { socket: "SUPPORT", name: "Bipod", pts: 10, effect: "+1 die on Shoot if this model did not Move this activation" },
      { socket: "SUPPORT", name: "Assault Pack", pts: 15, effect: "C-FIRE generates +2 Stress instead of +1" }
    ]
  },
  {
    id: "ins_rpg",
    name: "RPG Weapons Fighter",
    role: "AT Specialist",
    pts: 100,
    stats: { MOV: '6"', MOR: 2, CEV: 2, DR: "8+" },
    weapons: [
      { name: "AK-47 Rifle", dice: 6, hit: "7+", range: '36"', keywords: "" },
      { name: "RPG-7 / PG-7V", dice: 4, hit: "6+", range: '36"', keywords: "EXPL 2 / RLD / ENC" },
      { name: "TT-33 Pistol", dice: 3, hit: "7+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Ambush Shock"],
    upgrades: [
      { socket: "EQUIPMENT", name: "Frag Grenade", pts: 8, effect: "EXPL 1 / LOB / ONE-SHOT" },
      { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." }
    ]
  },
  {
    id: "ins_cqb",
    name: "Street Fighter",
    role: "CQB Specialist",
    pts: 75,
    stats: { MOV: '6"', MOR: 2, CEV: 2, DR: "7+" },
    weapons: [
      { name: "AK-74U Rifle", dice: 6, hit: "8+", range: '24"', keywords: "CQB" },
      { name: "TT-33 Pistol", dice: 3, hit: "7+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Aggressive Entry", "Urban Predator", "Ambush Shock"],
    upgrades: [
      { socket: "WEAPON", name: "Shotgun", pts: 8, effect: "6D / 7+ / 8\" / CQB — replaces AK-74U" },
      { socket: "WEAPON", name: "MP5", pts: 8, effect: "5D / 6+ / 12\" / CQB — replaces AK-74U" },
      { socket: "EQUIPMENT", name: "Flashbang", pts: 10, effect: "Defenders lose Ambush bonus this Breach. ONE-SHOT." },
      { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." }
    ]
  },
  {
    id: "ins_marksman",
    name: "Marksman",
    role: "Veteran Fighter",
    pts: 75,
    stats: { MOV: '5"', MOR: 2, CEV: 2, DR: "9+" },
    weapons: [
      { name: "SVD Dragunov", dice: 3, hit: "4+", range: '36"', keywords: "" },
      { name: "TT-33 Pistol", dice: 3, hit: "7+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Steady Aim", "Ambush Shock"],
    upgrades: [
      { socket: "SUPPORT", name: "Rangefinder", pts: 15, effect: "+1 hit value on all Shoot actions. List limit 1." },
      { socket: "SUPPORT", name: "Bipod", pts: 10, effect: "+1 die on Shoot if this model did not Move this activation" }
    ]
  },
  {
    id: "ins_medic",
    name: "Field Medic",
    role: "Veteran Fighter",
    pts: 80,
    stats: { MOV: '6"', MOR: 2, CEV: 2, DR: "8+" },
    weapons: [
      { name: "AK-47 Rifle", dice: 6, hit: "7+", range: '36"', keywords: "" },
      { name: "TT-33 Pistol", dice: 3, hit: "7+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Field Treatment", "Last Chance", "Ambush Shock"],
    upgrades: [
      { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." },
      { socket: "SUPPORT", name: "Advanced Aid Bag", pts: 15, effect: "Last Chance roll improved by 1" },
      { socket: "SUPPORT", name: "Trauma Kit", pts: 10, effect: "Field Treatment may target this model" }
    ]
  },
  {
    id: "ins_sharpshooter",
    name: "Sharpshooter",
    role: "Sniper Team",
    pts: 85,
    stats: { MOV: '6"', MOR: 2, CEV: 1, DR: "8+" },
    weapons: [
      { name: "Mosin-Nagant", dice: 2, hit: "4+", range: '48"', keywords: "RLD / ENC" },
      { name: "TT-33 Pistol", dice: 3, hit: "7+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Concealment", "Minimum Range 8\"", "Coherency Range 2\""],
    upgrades: [
      { socket: "SUPPORT", name: "Ghillie Suit", pts: 20, effect: "Cannot be targeted beyond 8\" unless fired this turn" },
      { socket: "SUPPORT", name: "Bipod", pts: 10, effect: "+1 die on Shoot if this model did not Move this activation" }
    ],
    maxPerList: 1,
    independentOnly: true,
    note: "PROVISIONAL"
  },
  {
    id: "ins_observer",
    name: "Observer",
    role: "Sniper Team",
    pts: 50,
    stats: { MOV: '6"', MOR: 2, CEV: 2, DR: "9+" },
    weapons: [
      { name: "AK-47 Rifle", dice: 6, hit: "7+", range: '36"', keywords: "" },
      { name: "TT-33 Pistol", dice: 3, hit: "7+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Overwatch Correction", "Acquire Target"],
    upgrades: [
      { socket: "SUPPORT", name: "Laser Designator", pts: 8, effect: "Acquire Target grants +2 dice instead of +1" }
    ],
    maxPerList: 1,
    independentOnly: true,
    note: "PROVISIONAL"
  },
  {
    id: "ins_rpggunner",
    name: "RPG Gunner",
    role: "AT Team",
    pts: 100,
    stats: { MOV: '6"', MOR: 2, CEV: 1, DR: "8+" },
    weapons: [
      { name: "RPG-7 / PG-7VR", dice: 4, hit: "6+", range: '36"', keywords: "RLD / ENC / PEN 3" },
      { name: "TT-33 Pistol", dice: 3, hit: "7+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Minimum Range 6\"", "Coherency Range 2\""],
    upgrades: [
      { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." }
    ],
    maxPerList: 1,
    independentOnly: true
  },
  {
    id: "ins_rpgloader",
    name: "RPG Loader",
    role: "AT Team",
    pts: 50,
    stats: { MOV: '6"', MOR: 2, CEV: 2, DR: "9+" },
    weapons: [
      { name: "AK-47 Rifle", dice: 6, hit: "7+", range: '36"', keywords: "" },
      { name: "TT-33 Pistol", dice: 3, hit: "7+", range: '12"', keywords: "CQB" }
    ],
    abilities: ["Assisted Reload"],
    upgrades: [
      { socket: "EQUIPMENT", name: "Frag Grenade", pts: 8, effect: "EXPL 1 / LOB / ONE-SHOT" },
      { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." }
    ],
    maxPerList: 1,
    independentOnly: true
  }
]
  }
};

// ============================================
// STATE - tracks what's happening right now
// ============================================

let selectedFaction = null;
let totalPoints = 0;

// New list structure
let currentList = {
  squadLeader: null,
  fireteams: [],
  independent: [],
  vehicles: []
};

// Phonetic alphabet for fireteam naming
const PHONETIC = [
  "ALPHA", "BRAVO", "CHARLIE", "DELTA",
  "ECHO", "FOXTROT", "GOLF", "HOTEL"
];

// Specialist unit IDs - one per fireteam
const SPECIALISTS = [
  "usa_mg", "usa_gren", "usa_medic",
  "usa_cqb", "usa_marksman",
  "ins_mg", "ins_rpg", "ins_cqb",
  "ins_marksman", "ins_medic"
];

// Independent units - exist outside fireteams
const INDEPENDENT_UNITS = [
  "usa_javelin", "usa_atloader",
  "usa_sniper", "usa_spotter",
  "ins_sharpshooter", "ins_observer",
  "ins_rpggunner", "ins_rpgloader"
];

// Squad leader unit IDs
const SQUAD_LEADERS = [
  "usa_ssg", "ins_cl"
];

// Team leader unit IDs
const TEAM_LEADERS = [
  "usa_sgt", "ins_tl"
];

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

  // Reset list to correct structure
  currentList = {
    squadLeader: null,
    fireteams: [],
    independent: [],
    vehicles: []
  };

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
  updateListDisplay();
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

  // Route the unit to the correct part of the list
  if (SQUAD_LEADERS.includes(unitId)) {
    addSquadLeader(unit);
  } else if (TEAM_LEADERS.includes(unitId)) {
    addTeamLeader(unit);
  } else if (INDEPENDENT_UNITS.includes(unitId)) {
    addIndependent(unit);
  } else {
    addFireteamModel(unit);
  }

  updatePointsDisplay();
  updateListDisplay();
}

function addSquadLeader(unit) {
  // Only one squad leader allowed
  if (currentList.squadLeader) {
    showWarning("A Squad Leader is already in your list.");
    return;
  }
  currentList.squadLeader = {
    uid: unit.id + "_" + Date.now(),
    unit: unit
  };
  totalPoints += unit.pts;
}

function addTeamLeader(unit) {
  // Create a new fireteam
  const index = currentList.fireteams.length;
  if (index >= PHONETIC.length) {
    showWarning("Maximum number of fireteams reached.");
    return;
  }
  const fireteam = {
    id: "fireteam_" + Date.now(),
    name: PHONETIC[index],
    teamLeader: {
      uid: unit.id + "_" + Date.now(),
      unit: unit
    },
    models: []
  };
  currentList.fireteams.push(fireteam);
  totalPoints += unit.pts;
}

function addIndependent(unit) {
  currentList.independent.push({
    uid: unit.id + "_" + Date.now(),
    unit: unit
  });
  totalPoints += unit.pts;
}

function addFireteamModel(unit) {
  // Must have at least one fireteam
  if (currentList.fireteams.length === 0) {
    showWarning("Add a Team Leader first to create a Fireteam.");
    return;
  }

  // If only one fireteam, assign automatically
  if (currentList.fireteams.length === 1) {
    assignToFireteam(unit, 0);
    return;
  }

  // Multiple fireteams - ask user which one
  showFireteamPicker(unit);
}

function assignToFireteam(unit, fireteamIndex) {
  const fireteam = currentList.fireteams[fireteamIndex];

  // Check specialist limit
  if (SPECIALISTS.includes(unit.id)) {
    const alreadyHasSpecialist = fireteam.models.some(function(m) {
      return m.unit.id === unit.id;
    });
    if (alreadyHasSpecialist) {
      showWarning("Fireteam " + fireteam.name + " already has a " + unit.name + ".");
      return;
    }
  }

  fireteam.models.push({
    uid: unit.id + "_" + Date.now(),
    unit: unit
  });
  totalPoints += unit.pts;

  updatePointsDisplay();
  updateListDisplay();
}

function showWarning(message) {
  const existing = document.getElementById("warning-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "warning-toast";
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #1a0808;
    border: 1px solid #e74c3c;
    color: #e74c3c;
    padding: 10px 20px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 12px;
    letter-spacing: 2px;
    z-index: 100;
  `;
  document.body.appendChild(toast);
  setTimeout(function() { toast.remove(); }, 3000);
}

function showFireteamPicker(unit) {
  const existing = document.getElementById("fireteam-picker");
  if (existing) existing.remove();

  const picker = document.createElement("div");
  picker.id = "fireteam-picker";
  picker.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #111418;
    border: 2px solid #2a2e35;
    padding: 20px;
    z-index: 100;
    min-width: 280px;
  `;

  picker.innerHTML = `
    <div style="font-size:11px; letter-spacing:3px; color:#555; margin-bottom:12px;">
      ASSIGN TO FIRETEAM
    </div>
    <div style="font-size:13px; color:#fff; margin-bottom:16px;">
      ${unit.name}
    </div>
    ${currentList.fireteams.map(function(ft, index) {
      return `
        <button class="picker-btn" data-index="${index}"
          style="display:block; width:100%; background:#0d0f12;
          border:1px solid #2a2e35; color:#c8cdd4; padding:10px;
          margin-bottom:6px; cursor:pointer; font-family:'Share Tech Mono',monospace;
          font-size:13px; letter-spacing:2px; text-align:left;">
          FIRETEAM ${ft.name}
        </button>
      `;
    }).join("")}
    <button id="picker-cancel"
      style="display:block; width:100%; background:transparent;
      border:1px solid #333; color:#555; padding:8px;
      margin-top:8px; cursor:pointer; font-family:'Share Tech Mono',monospace;
      font-size:11px; letter-spacing:2px;">
      CANCEL
    </button>
  `;

  document.body.appendChild(picker);

  picker.querySelectorAll(".picker-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      const index = parseInt(btn.getAttribute("data-index"));
      picker.remove();
      assignToFireteam(unit, index);
    });
  });

  document.getElementById("picker-cancel").addEventListener("click", function() {
    picker.remove();
  });
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

  let html = "";

  // Squad Leader
  if (currentList.squadLeader) {
    html += `
      <div class="list-section-label">SQUAD LEADER</div>
      <div class="list-entry">
        <div class="list-entry-info">
          <span class="list-entry-role">${currentList.squadLeader.unit.role}</span>
          <span class="list-entry-name">${currentList.squadLeader.unit.name}</span>
        </div>
        <div class="list-entry-right">
          <span class="list-entry-pts">${currentList.squadLeader.unit.pts}pt</span>
          <button class="remove-btn" data-uid="${currentList.squadLeader.uid}" data-type="squadLeader">✕</button>
        </div>
      </div>
    `;
  } else {
    html += `
      <div class="list-section-label">SQUAD LEADER</div>
      <div class="list-warning">⚠ REQUIRED — NO SQUAD LEADER</div>
    `;
  }

  // Fireteams
  if (currentList.fireteams.length === 0) {
    html += `
      <div class="list-section-label">FIRETEAMS</div>
      <div class="empty-list">— ADD A TEAM LEADER TO CREATE A FIRETEAM —</div>
    `;
  } else {
    currentList.fireteams.forEach(function(fireteam) {
      const modelCount = fireteam.models.length + 1; // +1 for TL
      const isValid = modelCount >= 2;

      html += `
        <div class="list-section-label">
          FIRETEAM ${fireteam.name}
          ${!isValid ? '<span class="invalid-label">⚠ NEEDS 1+ MODEL</span>' : ""}
        </div>
        <div class="list-entry">
          <div class="list-entry-info">
            <span class="list-entry-role">TEAM LEADER</span>
            <span class="list-entry-name">${fireteam.teamLeader.unit.name}</span>
          </div>
          <div class="list-entry-right">
            <span class="list-entry-pts">${fireteam.teamLeader.unit.pts}pt</span>
            <button class="remove-btn" 
              data-uid="${fireteam.teamLeader.uid}" 
              data-type="teamLeader"
              data-fireteam="${fireteam.id}">✕</button>
          </div>
        </div>
        ${fireteam.models.map(function(entry) {
          return `
            <div class="list-entry">
              <div class="list-entry-info">
                <span class="list-entry-role">${entry.unit.role}</span>
                <span class="list-entry-name">${entry.unit.name}</span>
              </div>
              <div class="list-entry-right">
                <span class="list-entry-pts">${entry.unit.pts}pt</span>
                <button class="remove-btn"
                  data-uid="${entry.uid}"
                  data-type="model"
                  data-fireteam="${fireteam.id}">✕</button>
              </div>
            </div>
          `;
        }).join("")}
      `;
    });
  }

  // Independent units
  if (currentList.independent.length > 0) {
    html += `<div class="list-section-label">INDEPENDENT</div>`;
    currentList.independent.forEach(function(entry) {
      html += `
        <div class="list-entry">
          <div class="list-entry-info">
            <span class="list-entry-role">${entry.unit.role}</span>
            <span class="list-entry-name">${entry.unit.name}</span>
          </div>
          <div class="list-entry-right">
            <span class="list-entry-pts">${entry.unit.pts}pt</span>
            <button class="remove-btn"
              data-uid="${entry.uid}"
              data-type="independent">✕</button>
          </div>
        </div>
      `;
    });
  }

  // Vehicles placeholder
  if (currentList.vehicles.length > 0) {
    html += `<div class="list-section-label">VEHICLES</div>`;
    currentList.vehicles.forEach(function(entry) {
      html += `
        <div class="list-entry">
          <div class="list-entry-info">
            <span class="list-entry-role">VEHICLE</span>
            <span class="list-entry-name">${entry.unit.name}</span>
          </div>
          <div class="list-entry-right">
            <span class="list-entry-pts">TBD</span>
            <button class="remove-btn"
              data-uid="${entry.uid}"
              data-type="vehicle">✕</button>
          </div>
        </div>
      `;
    });
  }

  // Validation summary
  html += buildValidationSummary();

  listEntries.innerHTML = html;
  setupRemoveButtons();
}

function buildValidationSummary() {
  const issues = [];

  if (!currentList.squadLeader) {
    issues.push("No Squad Leader");
  }

  currentList.fireteams.forEach(function(ft) {
    if (ft.models.length < 1) {
      issues.push("Fireteam " + ft.name + " needs at least 1 model");
    }
  });

  if (totalPoints > POINTS_LIMIT) {
    issues.push("Over points limit by " + (totalPoints - POINTS_LIMIT) + "pts");
  }

  if (issues.length === 0) {
    if (currentList.squadLeader && currentList.fireteams.length > 0) {
      return `<div class="validation-valid">✓ LIST VALID</div>`;
    }
    return "";
  }

  return `
    <div class="validation-invalid">
      ${issues.map(function(issue) {
        return `<div>⚠ ${issue}</div>`;
      }).join("")}
    </div>
  `;
}

function setupRemoveButtons() {
  document.querySelectorAll(".remove-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      const uid = btn.getAttribute("data-uid");
      const type = btn.getAttribute("data-type");
      const fireteamId = btn.getAttribute("data-fireteam");
      removeUnit(uid, type, fireteamId);
    });
  });
}

function removeUnit(uid, type, fireteamId) {
  if (type === "squadLeader") {
    totalPoints -= currentList.squadLeader.unit.pts;
    currentList.squadLeader = null;

  } else if (type === "teamLeader") {
    const ft = currentList.fireteams.find(function(f) {
      return f.id === fireteamId;
    });
    if (!ft) return;
    totalPoints -= ft.teamLeader.unit.pts;
    // Remove all models in this fireteam too
    ft.models.forEach(function(m) { totalPoints -= m.unit.pts; });
    currentList.fireteams = currentList.fireteams.filter(function(f) {
      return f.id !== fireteamId;
    });
    renameFIreTeams();

  } else if (type === "model") {
    const ft = currentList.fireteams.find(function(f) {
      return f.id === fireteamId;
    });
    if (!ft) return;
    const entry = ft.models.find(function(m) { return m.uid === uid; });
    if (!entry) return;
    totalPoints -= entry.unit.pts;
    ft.models = ft.models.filter(function(m) { return m.uid !== uid; });

  } else if (type === "independent") {
    const entry = currentList.independent.find(function(e) {
      return e.uid === uid;
    });
    if (!entry) return;
    totalPoints -= entry.unit.pts;
    currentList.independent = currentList.independent.filter(function(e) {
      return e.uid !== uid;
    });
  }

  updatePointsDisplay();
  updateListDisplay();
}

function renameFIreTeams() {
  currentList.fireteams.forEach(function(ft, index) {
    ft.name = PHONETIC[index];
  });
}