// ============================================
// OPERATION URBAN STORM - LIST BUILDER
// Version 1.6.0
// Unit data sourced from OUS Unit Card Master
// UPDATED: Error modals, upgrade selection UI, clone button, VDV faction
// ============================================

const GAME_VERSION = "1.6.0";
const POINTS_LIMIT = 1000;

// ============================================
// FACTION DATA
// ============================================

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
        abilities: ["Squad Leader (3\")", "Rally", "Authority Override", "Fireteam Cohesion", "Coordinated Fire"],
        socketLimits: { WEAPON: 1, EQUIPMENT: 1, SUPPORT: 1 },
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
        abilities: ["Lead From The Front", "Stress Transfer", "Fireteam Cohesion", "Coordinated Fire"],
        socketLimits: { WEAPON: 1, EQUIPMENT: 1, SUPPORT: 1 },
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
        abilities: ["Fireteam Cohesion", "Coordinated Fire"],
        socketLimits: { WEAPON: 1, EQUIPMENT: 1, SUPPORT: 1 },
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
        abilities: ["Fireteam Cohesion", "Coordinated Fire"],
        socketLimits: { EQUIPMENT: 1, SUPPORT: 1 },
        upgrades: [
          { socket: "EQUIPMENT", name: "Frag Grenade", pts: 8, effect: "EXPL 1 / LOB / ONE-SHOT" },
          { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." },
          { socket: "SUPPORT", name: "Bipod", pts: 10, effect: "+1 die on Shoot if this model did not Move this activation" },
          { socket: "SUPPORT", name: "Assault Pack", pts: 15, effect: "C-FIRE generates +2 Stress instead of +1" }
        ]
      },
      {
        id: "usa_at",
        name: "AT Specialist",
        role: "Specialist",
        pts: 105,
        stats: { MOV: '5"', MOR: 3, CEV: 3, DR: "6+" },
        weapons: [
          { name: "M3 MAAWS", dice: 4, hit: "4+", range: '36"', keywords: "EXPL 2 / RLD / ENC" },
          { name: "M4A1 Carbine", dice: 5, hit: "5+", range: '36"', keywords: "" }
        ],
        abilities: ["Fireteam Cohesion", "Coordinated Fire"],
        socketLimits: { EQUIPMENT: 1 },
        upgrades: [
          { socket: "EQUIPMENT", name: "Frag Grenade", pts: 8, effect: "EXPL 1 / LOB / ONE-SHOT" },
          { socket: "EQUIPMENT", name: "Smoke Grenade", pts: 6, effect: "SMOKE / LOB / ONE-SHOT" },
          { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." }
        ]
      },
      {
        id: "usa_gs",
        name: "Grenadier",
        role: "Specialist",
        pts: 100,
        stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "6+" },
        weapons: [
          { name: "M4A1 Carbine", dice: 5, hit: "5+", range: '36"', keywords: "" },
          { name: "M320 Grenade Launcher", dice: 3, hit: "5+", range: '24"', keywords: "EXPL 1 / RLD / UBW" },
          { name: "M9 Pistol", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Fireteam Cohesion", "Coordinated Fire"],
        socketLimits: { EQUIPMENT: 1, SUPPORT: 1 },
        upgrades: [
          { socket: "EQUIPMENT", name: "Frag Grenade", pts: 8, effect: "EXPL 1 / LOB / ONE-SHOT" },
          { socket: "EQUIPMENT", name: "Smoke Grenade", pts: 6, effect: "SMOKE / LOB / ONE-SHOT" },
          { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." },
          { socket: "SUPPORT", name: "Smoke Rounds", pts: 8, effect: "M320 fires SMOKE instead of EXPL. List limit 1." }
        ]
      },
      {
        id: "usa_dm",
        name: "Designated Marksman",
        role: "Specialist",
        pts: 100,
        stats: { MOV: '5"', MOR: 3, CEV: 3, DR: "6+" },
        weapons: [
          { name: "M110A1 CSASS", dice: 3, hit: "4+", range: '42"', keywords: "" },
          { name: "M9 Pistol", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Fireteam Cohesion", "Coordinated Fire", "Steady Aim"],
        socketLimits: { SUPPORT: 1 },
        upgrades: [
          { socket: "SUPPORT", name: "Suppressor", pts: 15, effect: "Only generates 1 Stress when hitting. List limit 1." },
          { socket: "SUPPORT", name: "Bipod", pts: 10, effect: "+1 die on Shoot if this model did not Move this activation" }
        ]
      },
      {
        id: "usa_cqb",
        name: "Breacher",
        role: "Specialist",
        pts: 120,
        stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "5+" },
        weapons: [
          { name: "M4A1 Carbine", dice: 5, hit: "5+", range: '24"', keywords: "CQB" },
          { name: "M9 Pistol", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Aggressive Entry", "Urban Predator", "Fireteam Cohesion", "Coordinated Fire"],
        socketLimits: { WEAPON: 1, EQUIPMENT: 1 },
        upgrades: [
          { socket: "WEAPON", name: "M870 Shotgun", pts: 12, effect: "6D / 6+ / 8\" / CQB — replaces M4A1" },
          { socket: "EQUIPMENT", name: "Flashbang", pts: 10, effect: "Defenders lose Ambush bonus this Breach. ONE-SHOT." },
          { socket: "EQUIPMENT", name: "Breaching Charge", pts: 12, effect: "Destroy one door/window within 1\". EXPL / ONE-SHOT." },
          { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." }
        ]
      },
      {
        id: "usa_medic",
        name: "Combat Medic",
        role: "Specialist",
        pts: 100,
        stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "6+" },
        weapons: [
          { name: "M4A1 Carbine", dice: 5, hit: "5+", range: '36"', keywords: "" },
          { name: "M9 Pistol", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Fireteam Cohesion", "Coordinated Fire", "Field Treatment", "Last Chance"],
        socketLimits: { EQUIPMENT: 1, SUPPORT: 1 },
        upgrades: [
          { socket: "EQUIPMENT", name: "Smoke Grenade", pts: 6, effect: "SMOKE / LOB / ONE-SHOT" },
          { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." },
          { socket: "SUPPORT", name: "Advanced Aid Bag", pts: 15, effect: "Last Chance roll improved by 1" },
          { socket: "SUPPORT", name: "Trauma Kit", pts: 10, effect: "Field Treatment may target this model" }
        ]
      },
      {
        id: "usa_sniper",
        name: "Sniper",
        role: "Independent — Sniper Team",
        pts: 120,
        stats: { MOV: '6"', MOR: 2, CEV: 2, DR: "7+" },
        weapons: [
          { name: "M110A1 CSASS", dice: 2, hit: "3+", range: '48"', keywords: "RLD / ENC" },
          { name: "M9 Pistol", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Concealment", "Minimum Range 8\"", "Coherency Range 2\""],
        socketLimits: { SUPPORT: 1 },
        upgrades: [
          { socket: "SUPPORT", name: "Ghillie Suit", pts: 20, effect: "Cannot be targeted beyond 8\" unless fired this turn" },
          { socket: "SUPPORT", name: "Bipod", pts: 10, effect: "+1 die on Shoot if this model did not Move this activation" }
        ],
        independent: true,
        maxPerList: 1
      },
      {
        id: "usa_spotter",
        name: "Spotter",
        role: "Independent — Sniper Team",
        pts: 85,
        stats: { MOV: '6"', MOR: 2, CEV: 3, DR: "7+" },
        weapons: [
          { name: "M4A1 Carbine", dice: 5, hit: "5+", range: '36"', keywords: "" },
          { name: "M9 Pistol", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Overwatch Correction", "Acquire Target"],
        socketLimits: { WEAPON: 1, SUPPORT: 1 },
        upgrades: [
          { socket: "WEAPON", name: "XM7 Rifle", pts: 10, effect: "5D / 4+ / 36\" — replaces M4A1" },
          { socket: "SUPPORT", name: "Laser Designator", pts: 8, effect: "Acquire Target grants +2 dice instead of +1" }
        ],
        independent: true,
        maxPerList: 1
      },
      {
        id: "usa_at_gunner",
        name: "Javelin Gunner",
        role: "Independent — AT Team",
        pts: 155,
        stats: { MOV: '6"', MOR: 3, CEV: 2, DR: "6+" },
        weapons: [
          { name: "FGM-148 Javelin", dice: 4, hit: "4+", range: '48"', keywords: "RLD / ENC / PEN 4 / Deploy" },
          { name: "M9 Pistol", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Deploy", "Minimum Range 6\"", "Coherency Range 2\""],
        socketLimits: { WEAPON: 1, EQUIPMENT: 1 },
        upgrades: [
          { socket: "WEAPON", name: "M3E1 MAAWS", pts: 0, effect: "3D / 4+ / 24\" / RLD / PEN 2 — free swap, no Deploy" },
          { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." }
        ],
        independent: true,
        maxPerList: 1
      },
      {
        id: "usa_at_loader",
        name: "AT Loader",
        role: "Independent — AT Team",
        pts: 85,
        stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "6+" },
        weapons: [
          { name: "M4A1 Carbine", dice: 5, hit: "5+", range: '36"', keywords: "" },
          { name: "M9 Pistol", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Assisted Reload"],
        socketLimits: { WEAPON: 1, EQUIPMENT: 1 },
        upgrades: [
          { socket: "WEAPON", name: "XM7 Rifle", pts: 10, effect: "5D / 4+ / 36\" — replaces M4A1" },
          { socket: "EQUIPMENT", name: "Frag Grenade", pts: 8, effect: "EXPL 1 / LOB / ONE-SHOT" },
          { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed, remain at CEV 1. ONE-USE." }
        ],
        independent: true,
        maxPerList: 1
      }
    ]
  },

  "insurgents": {
    name: "Insurgents",
    color: "#8b4513",
    accent: "#d4a017",
    units: [
      {
        id: "ins_cell_leader",
        name: "Cell Leader",
        role: "Squad Leader",
        pts: 60,
        stats: { MOV: '6"', MOR: 3, CEV: 2, DR: "7+" },
        weapons: [
          { name: "AKM", dice: 5, hit: "6+", range: '36"', keywords: "" }
        ],
        abilities: ["Squad Leader (3\")", "Rally", "Authority Override"],
        socketLimits: { WEAPON: 1, EQUIPMENT: 1 },
        upgrades: [
          { socket: "WEAPON", name: "AK-12", pts: 8, effect: "6D / 6+ / 36\" — replaces AKM" },
          { socket: "WEAPON", name: "AK-74", pts: 6, effect: "5D / 6+ / 36\" — replaces AKM" },
          { socket: "EQUIPMENT", name: "RGD-5 Grenade", pts: 6, effect: "EXPL 1 / LOB / ONE-SHOT" },
          { socket: "EQUIPMENT", name: "IED Trigger", pts: 35, effect: "Deploy IED anywhere within 24\". No LoS required. List limit 1." }
        ],
        required: true,
        maxPerList: 1
      },
      {
        id: "ins_team_leader",
        name: "Team Leader",
        role: "Team Leader",
        pts: 50,
        stats: { MOV: '6"', MOR: 2, CEV: 2, DR: "8+" },
        weapons: [
          { name: "AKM", dice: 5, hit: "6+", range: '36"', keywords: "" }
        ],
        abilities: ["Lead From The Front", "Stress Transfer"],
        socketLimits: { WEAPON: 1, EQUIPMENT: 1 },
        upgrades: [
          { socket: "WEAPON", name: "AK-12", pts: 8, effect: "6D / 6+ / 36\" — replaces AKM" },
          { socket: "WEAPON", name: "AK-74", pts: 6, effect: "5D / 6+ / 36\" — replaces AKM" },
          { socket: "EQUIPMENT", name: "RGD-5 Grenade", pts: 6, effect: "EXPL 1 / LOB / ONE-SHOT" }
        ]
      },
      {
        id: "ins_fighter",
        name: "Fighter",
        role: "Infantry",
        pts: 40,
        stats: { MOV: '6"', MOR: 2, CEV: 2, DR: "8+" },
        weapons: [
          { name: "AKM", dice: 5, hit: "6+", range: '36"', keywords: "" }
        ],
        abilities: [],
        socketLimits: { WEAPON: 1, EQUIPMENT: 1 },
        upgrades: [
          { socket: "WEAPON", name: "AK-12", pts: 8, effect: "6D / 6+ / 36\" — replaces AKM" },
          { socket: "WEAPON", name: "AK-74", pts: 6, effect: "5D / 6+ / 36\" — replaces AKM" },
          { socket: "WEAPON", name: "PKM", pts: 25, effect: "8D / 6+ / 36\" / C-FIRE / ENC — replaces AKM" },
          { socket: "EQUIPMENT", name: "RGD-5 Grenade", pts: 6, effect: "EXPL 1 / LOB / ONE-SHOT" }
        ]
      },
      {
        id: "ins_rpg",
        name: "RPG Operator",
        role: "Specialist",
        pts: 85,
        stats: { MOV: '5"', MOR: 2, CEV: 2, DR: "8+" },
        weapons: [
          { name: "RPG-7", dice: 4, hit: "5+", range: '36"', keywords: "EXPL 2 / RLD / ENC" },
          { name: "AKM", dice: 5, hit: "6+", range: '36"', keywords: "" }
        ],
        abilities: [],
        socketLimits: { EQUIPMENT: 1 },
        upgrades: [
          { socket: "EQUIPMENT", name: "RGD-5 Grenade", pts: 6, effect: "EXPL 1 / LOB / ONE-SHOT" }
        ]
      },
      {
        id: "ins_svd",
        name: "SVD Marksman",
        role: "Specialist",
        pts: 75,
        stats: { MOV: '5"', MOR: 2, CEV: 2, DR: "8+" },
        weapons: [
          { name: "SVD Dragunov", dice: 3, hit: "4+", range: '42"', keywords: "" }
        ],
        abilities: ["Steady Aim"],
        socketLimits: { SUPPORT: 1 },
        upgrades: [
          { socket: "SUPPORT", name: "Bipod", pts: 10, effect: "+1 die on Shoot if this model did not Move this activation" }
        ]
      },
      {
        id: "ins_bomber",
        name: "Suicide Bomber",
        role: "Specialist",
        pts: 50,
        stats: { MOV: '6"', MOR: 5, CEV: 1, DR: "8+" },
        weapons: [
          { name: "Suicide Vest", dice: 6, hit: "5+", range: '1"', keywords: "EXPL 3 / SELF-DESTRUCT" }
        ],
        abilities: ["Fanatic", "Self-Destruct"],
        socketLimits: {},
        upgrades: []
      }
    ]
  },

  "vdv": {
    name: "VDV (Russian Airborne)",
    color: "#4a5a7c",
    accent: "#7c8fbc",
    units: [
      {
        id: "vdv_leytenant",
        name: "Leytenant",
        role: "Squad Leader",
        pts: 100,
        stats: { MOV: '6"', MOR: 4, CEV: 4, DR: "6+" },
        weapons: [
          { name: "AK-12", dice: 6, hit: "6+", range: '36"', keywords: "" },
          { name: "Makarov PM", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Squad Leader (3\")", "Rally (+2 Stress)", "Authority Override (+2 Stress)", "Command Imperative", "Command Collapse"],
        socketLimits: { WEAPON: 1, EQUIPMENT: 1 },
        upgrades: [
          { socket: "WEAPON", name: "AK-15", pts: 12, effect: "5D / 4+ / 36\" — replaces AK-12" },
          { socket: "EQUIPMENT", name: "Frag Grenade", pts: 8, effect: "EXPL 1 / LOB / ONE-SHOT" },
          { socket: "EQUIPMENT", name: "Smoke Grenade", pts: 6, effect: "SMOKE / LOB / ONE-SHOT" },
          { socket: "EQUIPMENT", name: "Flashbang", pts: 10, effect: "Defenders lose Ambush bonus this Breach. ONE-SHOT." },
          { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed from play, remain at CEV 1 instead. ONE-USE." },
          { socket: "EQUIPMENT", name: "SL Radio", pts: 25, effect: "May issue orders to friendly RTO regardless of distance and LoS. Requires RTO Radio." }
        ],
        required: true,
        maxPerList: 1
      },
      {
        id: "vdv_section_cdr",
        name: "Section Commander",
        role: "Team Leader",
        pts: 85,
        stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "6+" },
        weapons: [
          { name: "AK-12", dice: 6, hit: "6+", range: '36"', keywords: "" },
          { name: "Makarov PM", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Lead From The Front", "Stress Transfer"],
        socketLimits: { WEAPON: 1, EQUIPMENT: 1 },
        upgrades: [
          { socket: "WEAPON", name: "AK-15", pts: 12, effect: "5D / 4+ / 36\" — replaces AK-12" },
          { socket: "EQUIPMENT", name: "Frag Grenade", pts: 8, effect: "EXPL 1 / LOB / ONE-SHOT" },
          { socket: "EQUIPMENT", name: "Smoke Grenade", pts: 6, effect: "SMOKE / LOB / ONE-SHOT" },
          { socket: "EQUIPMENT", name: "Flashbang", pts: 10, effect: "Defenders lose Ambush bonus this Breach. ONE-SHOT." },
          { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed from play, remain at CEV 1 instead. ONE-USE." }
        ]
      },
      {
        id: "vdv_desantnik",
        name: "Desantnik",
        role: "Assault Trooper",
        pts: 85,
        stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "6+" },
        weapons: [
          { name: "AK-12", dice: 6, hit: "6+", range: '36"', keywords: "" },
          { name: "Makarov PM", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Assault Mobility"],
        socketLimits: { WEAPON: 1, EQUIPMENT: 1 },
        upgrades: [
          { socket: "WEAPON", name: "AK-15", pts: 12, effect: "5D / 4+ / 36\" — replaces AK-12" },
          { socket: "WEAPON", name: "AK-12K", pts: 12, effect: "6D / 6+ / 18\" / CQB — replaces AK-12. Desantnik and Shturmovnik only." },
          { socket: "EQUIPMENT", name: "Frag Grenade", pts: 8, effect: "EXPL 1 / LOB / ONE-SHOT" },
          { socket: "EQUIPMENT", name: "Smoke Grenade", pts: 6, effect: "SMOKE / LOB / ONE-SHOT" },
          { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed from play, remain at CEV 1 instead. ONE-USE." },
          { socket: "EQUIPMENT", name: "RTO Radio", pts: 25, effect: "May issue orders as if Squad Leader to friendlies within 2\" and LoS. Requires SL Radio. List limit 1." }
        ]
      },
      {
        id: "vdv_pkm",
        name: "PKM Operator",
        role: "Specialist",
        pts: 130,
        stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "6+" },
        weapons: [
          { name: "PKM", dice: 8, hit: "6+", range: '36"', keywords: "C-FIRE" },
          { name: "Makarov PM", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Assault Mobility (no ENC on PKM)"],
        socketLimits: { EQUIPMENT: 1, SUPPORT: 1 },
        upgrades: [
          { socket: "EQUIPMENT", name: "Frag Grenade", pts: 8, effect: "EXPL 1 / LOB / ONE-SHOT" },
          { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed from play, remain at CEV 1 instead. ONE-USE." },
          { socket: "SUPPORT", name: "Bipod", pts: 10, effect: "+1 die on Shoot actions if this model did not Move this activation" },
          { socket: "SUPPORT", name: "Assault Pack", pts: 15, effect: "C-FIRE generates +2 Stress on target instead of +1" }
        ]
      },
      {
        id: "vdv_rpg",
        name: "RPG Operator",
        role: "Specialist",
        pts: 115,
        stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "6+" },
        weapons: [
          { name: "RPG-7D", dice: 4, hit: "5+", range: '36"', keywords: "EXPL 2 / RLD" },
          { name: "AK-12", dice: 6, hit: "6+", range: '36"', keywords: "" }
        ],
        abilities: ["Assault Mobility (no ENC on RPG-7D)"],
        socketLimits: { EQUIPMENT: 1 },
        upgrades: [
          { socket: "EQUIPMENT", name: "Frag Grenade", pts: 8, effect: "EXPL 1 / LOB / ONE-SHOT" },
          { socket: "EQUIPMENT", name: "Smoke Grenade", pts: 6, effect: "SMOKE / LOB / ONE-SHOT" },
          { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed from play, remain at CEV 1 instead. ONE-USE." }
        ]
      },
      {
        id: "vdv_shturmovnik",
        name: "Shturmovnik",
        role: "CQB Specialist",
        pts: 130,
        stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "5+" },
        weapons: [
          { name: "AK-12K", dice: 6, hit: "6+", range: '18"', keywords: "CQB" },
          { name: "Makarov PM", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Aggressive Entry", "Urban Predator", "Assault Mobility"],
        socketLimits: { WEAPON: 1, EQUIPMENT: 1 },
        upgrades: [
          { socket: "WEAPON", name: "PP-19 Bizon", pts: 10, effect: "5D / 6+ / 12\" / CQB — replaces AK-12K" },
          { socket: "WEAPON", name: "Saiga-12", pts: 15, effect: "6D / 6+ / 8\" / CQB — replaces AK-12K" },
          { socket: "EQUIPMENT", name: "Flashbang", pts: 10, effect: "Defenders lose Ambush bonus this Breach. ONE-SHOT." },
          { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed from play, remain at CEV 1 instead. ONE-USE." }
        ]
      },
      {
        id: "vdv_marksman",
        name: "Marksman",
        role: "Specialist",
        pts: 105,
        stats: { MOV: '5"', MOR: 3, CEV: 3, DR: "6+" },
        weapons: [
          { name: "VSS Vintorez", dice: 3, hit: "4+", range: '36"', keywords: "" },
          { name: "Makarov PM", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Steady Aim"],
        socketLimits: { WEAPON: 1, SUPPORT: 1 },
        upgrades: [
          { socket: "WEAPON", name: "AS Val", pts: 12, effect: "4D / 4+ / 24\" / CQB — replaces VSS Vintorez" },
          { socket: "SUPPORT", name: "Rangefinder", pts: 15, effect: "+1 hit value improvement on all Shoot actions. List limit 1." },
          { socket: "SUPPORT", name: "Bipod", pts: 10, effect: "+1 die on Shoot actions if this model did not Move this activation" }
        ]
      },
      {
        id: "vdv_sanitar",
        name: "Sanitár",
        role: "Medic",
        pts: 105,
        stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "6+" },
        weapons: [
          { name: "AK-12", dice: 6, hit: "6+", range: '36"', keywords: "" },
          { name: "Makarov PM", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Field Treatment (+2 Stress)", "Last Chance"],
        socketLimits: { EQUIPMENT: 1, SUPPORT: 1 },
        upgrades: [
          { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed from play, remain at CEV 1 instead. ONE-USE." },
          { socket: "SUPPORT", name: "Advanced Aid Bag", pts: 15, effect: "Last Chance roll improved by 1" },
          { socket: "SUPPORT", name: "Trauma Kit", pts: 10, effect: "Field Treatment may target this model" }
        ]
      },
      {
        id: "vdv_sniper",
        name: "Sniper",
        role: "Independent — Sniper Team",
        pts: 125,
        stats: { MOV: '6"', MOR: 2, CEV: 2, DR: "7+" },
        weapons: [
          { name: "SV-98", dice: 2, hit: "3+", range: '48"', keywords: "RLD / ENC" },
          { name: "Makarov PM", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Concealment", "Minimum Range 8\"", "Coherency Range 2\""],
        socketLimits: { SUPPORT: 1 },
        upgrades: [
          { socket: "SUPPORT", name: "Ghillie Suit", pts: 20, effect: "Cannot be targeted beyond 8\" unless fired this turn" },
          { socket: "SUPPORT", name: "Bipod", pts: 10, effect: "+1 die on Shoot actions if this model did not Move this activation" }
        ],
        independent: true,
        maxPerList: 1
      },
      {
        id: "vdv_spotter",
        name: "Spotter",
        role: "Independent — Sniper Team",
        pts: 85,
        stats: { MOV: '6"', MOR: 2, CEV: 3, DR: "7+" },
        weapons: [
          { name: "AK-12", dice: 6, hit: "6+", range: '36"', keywords: "" },
          { name: "Makarov PM", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Overwatch Correction", "Acquire Target"],
        socketLimits: { WEAPON: 1, SUPPORT: 1 },
        upgrades: [
          { socket: "WEAPON", name: "AK-15", pts: 12, effect: "5D / 4+ / 36\" — replaces AK-12" },
          { socket: "SUPPORT", name: "Laser Designator", pts: 8, effect: "Acquire Target grants +2 dice instead of +1" }
        ],
        independent: true,
        maxPerList: 1
      },
      {
        id: "vdv_kornet",
        name: "Kornet Gunner",
        role: "Independent — AT Team",
        pts: 150,
        stats: { MOV: '6"', MOR: 3, CEV: 2, DR: "6+" },
        weapons: [
          { name: "9M133 Kornet", dice: 4, hit: "4+", range: '48"', keywords: "RLD / ENC / PEN 4 / Deploy" },
          { name: "Makarov PM", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Deploy", "Minimum Range 6\"", "Coherency Range 2\""],
        socketLimits: { WEAPON: 1, EQUIPMENT: 1 },
        upgrades: [
          { socket: "WEAPON", name: "RPG-29 Vampir", pts: 0, effect: "3D / 4+ / 24\" / RLD / PEN 2 — free swap, no Deploy required" },
          { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed from play, remain at CEV 1 instead. ONE-USE." }
        ],
        independent: true,
        maxPerList: 1
      },
      {
        id: "vdv_loader",
        name: "AT Loader",
        role: "Independent — AT Team",
        pts: 85,
        stats: { MOV: '6"', MOR: 3, CEV: 3, DR: "6+" },
        weapons: [
          { name: "AK-12", dice: 6, hit: "6+", range: '36"', keywords: "" },
          { name: "Makarov PM", dice: 3, hit: "6+", range: '12"', keywords: "CQB" }
        ],
        abilities: ["Assisted Reload"],
        socketLimits: { WEAPON: 1, EQUIPMENT: 1 },
        upgrades: [
          { socket: "WEAPON", name: "AK-15", pts: 12, effect: "5D / 4+ / 36\" — replaces AK-12" },
          { socket: "EQUIPMENT", name: "Frag Grenade", pts: 8, effect: "EXPL 1 / LOB / ONE-SHOT" },
          { socket: "EQUIPMENT", name: "IFAK", pts: 12, effect: "When removed from play, remain at CEV 1 instead. ONE-USE." }
        ],
        independent: true,
        maxPerList: 1
      }
    ]
  }
};

// ============================================
// STATE MANAGEMENT
// ============================================

let currentFaction = null;
let activeList = [];
let fireteams = [];
let nextFireteamId = 0;

const fireteamNames = [
  "Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot",
  "Golf", "Hotel", "India", "Juliet", "Kilo", "Lima"
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

function showErrorModal(message) {
  // Create modal overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  `;

  // Create modal box
  const modal = document.createElement('div');
  modal.style.cssText = `
    background: #111418;
    border: 2px solid #e74c3c;
    padding: 30px;
    max-width: 500px;
    width: 100%;
    text-align: center;
  `;

  // Create message text
  const messageEl = document.createElement('p');
  messageEl.style.cssText = `
    color: #e74c3c;
    font-size: 15px;
    letter-spacing: 2px;
    line-height: 1.6;
    margin-bottom: 20px;
  `;
  messageEl.textContent = message;

  // Create close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'CLOSE';
  closeBtn.style.cssText = `
    background: #1a0808;
    border: 1px solid #e74c3c;
    color: #e74c3c;
    padding: 10px 30px;
    cursor: pointer;
    font-family: 'Share Tech Mono', monospace;
    font-size: 14px;
    letter-spacing: 2px;
  `;
  closeBtn.onmouseover = () => {
    closeBtn.style.background = '#e74c3c';
    closeBtn.style.color = '#fff';
  };
  closeBtn.onmouseout = () => {
    closeBtn.style.background = '#1a0808';
    closeBtn.style.color = '#e74c3c';
  };
  closeBtn.onclick = () => document.body.removeChild(overlay);

  modal.appendChild(messageEl);
  modal.appendChild(closeBtn);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Close on overlay click
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  };
}

function calculateTotalPoints() {
  return activeList.reduce((sum, entry) => sum + entry.totalPts, 0);
}

function getPointsColor(points) {
  const percent = (points / POINTS_LIMIT) * 100;
  if (percent >= 100) return "#e74c3c"; // red
  if (percent >= 85) return "#e67e22";  // orange
  return "#8fbc8f";                      // green
}

function updatePointsDisplay() {
  const total = calculateTotalPoints();
  const display = document.getElementById('points-display');
  if (display) {
    display.textContent = `${total} / ${POINTS_LIMIT} PTS`;
    display.style.color = getPointsColor(total);
  }
}

function getFireteamName(id) {
  return fireteamNames[id % fireteamNames.length];
}

// ============================================
// VALIDATION
// ============================================

function validateList() {
  const errors = [];
  const faction = factions[currentFaction];

  // Check squad leader requirement
  const hasSquadLeader = activeList.some(entry => entry.unit.required === true);
  if (!hasSquadLeader) {
    errors.push("MISSING REQUIRED SQUAD LEADER");
  }

  // Check fireteam minimum size
  fireteams.forEach(ft => {
    const members = activeList.filter(e => e.fireteamId === ft.id);
    if (members.length < 2) {
      errors.push(`FIRETEAM ${ft.name.toUpperCase()} REQUIRES MINIMUM 2 MODELS`);
    }
  });

  // Check specialist limits per fireteam
  fireteams.forEach(ft => {
    const members = activeList.filter(e => e.fireteamId === ft.id);
    const specialists = {};
    
    members.forEach(entry => {
      if (entry.unit.role === "Specialist") {
        const specType = entry.unit.name;
        specialists[specType] = (specialists[specType] || 0) + 1;
        if (specialists[specType] > 1) {
          errors.push(`FIRETEAM ${ft.name.toUpperCase()}: MAX 1 ${specType.toUpperCase()} PER FIRETEAM`);
        }
      }
    });
  });

  // Check points limit
  const total = calculateTotalPoints();
  if (total > POINTS_LIMIT) {
    errors.push(`POINTS EXCEED LIMIT (${total} / ${POINTS_LIMIT})`);
  }

  return errors;
}

function renderValidation() {
  const container = document.getElementById('validation-summary');
  if (!container) return;

  const errors = validateList();
  
  if (errors.length === 0) {
    container.innerHTML = '<div class="validation-valid">✓ LIST VALID — READY FOR DEPLOYMENT</div>';
  } else {
    const errorHTML = errors.map(err => `<div>${err}</div>`).join('');
    container.innerHTML = `<div class="validation-invalid">${errorHTML}</div>`;
  }
}

// ============================================
// UNIT BROWSER RENDERING
// ============================================

function renderUnitBrowser() {
  const faction = factions[currentFaction];
  const container = document.getElementById('unit-list');
  
  // Group units by role
  const leaders = faction.units.filter(u => u.role === "Squad Leader" || u.role === "Team Leader");
  const infantry = faction.units.filter(u => !u.role.includes("Leader") && !u.role.includes("Specialist") && !u.role.includes("Independent"));
  const specialists = faction.units.filter(u => u.role === "Specialist");
  const independent = faction.units.filter(u => u.independent === true);

  let html = '<div class="section-label">LEADERS</div>';
  leaders.forEach(unit => {
    html += `
      <div class="unit-card" onclick="openUnitModal('${unit.id}')">
        <div class="unit-card-role">${unit.role}</div>
        <div class="unit-card-row">
          <div class="unit-card-name">${unit.name}</div>
          <div class="unit-card-pts">${unit.pts}pts</div>
        </div>
        ${unit.required ? '<div class="unit-note">REQUIRED</div>' : ''}
        ${unit.maxPerList ? '<div class="unit-note">MAX ' + unit.maxPerList + ' PER LIST</div>' : ''}
      </div>
    `;
  });

  if (infantry.length > 0) {
    html += '<div class="section-label" style="margin-top:20px">INFANTRY</div>';
    infantry.forEach(unit => {
      html += `
        <div class="unit-card" onclick="openUnitModal('${unit.id}')">
          <div class="unit-card-role">${unit.role}</div>
          <div class="unit-card-row">
            <div class="unit-card-name">${unit.name}</div>
            <div class="unit-card-pts">${unit.pts}pts</div>
          </div>
        </div>
      `;
    });
  }

  html += '<div class="section-label" style="margin-top:20px">SPECIALISTS</div>';
  specialists.forEach(unit => {
    html += `
      <div class="unit-card" onclick="openUnitModal('${unit.id}')">
        <div class="unit-card-role">${unit.role}</div>
        <div class="unit-card-row">
          <div class="unit-card-name">${unit.name}</div>
          <div class="unit-card-pts">${unit.pts}pts</div>
        </div>
      </div>
    `;
  });

  if (independent.length > 0) {
    html += '<div class="section-label" style="margin-top:20px">INDEPENDENT UNITS</div>';
    independent.forEach(unit => {
      html += `
        <div class="unit-card" onclick="openUnitModal('${unit.id}')">
          <div class="unit-card-role">${unit.role}</div>
          <div class="unit-card-row">
            <div class="unit-card-name">${unit.name}</div>
            <div class="unit-card-pts">${unit.pts}pts</div>
          </div>
          ${unit.maxPerList ? '<div class="unit-note">MAX ' + unit.maxPerList + ' PER LIST</div>' : ''}
        </div>
      `;
    });
  }

  container.innerHTML = html;
}

// ============================================
// ACTIVE LIST RENDERING
// ============================================

function renderActiveList() {
  const container = document.getElementById('active-list');
  
  if (activeList.length === 0) {
    container.innerHTML = '<div class="empty-list">NO UNITS ADDED YET</div><div id="validation-summary"></div>';
    return;
  }

  let html = '';

  // Squad Leader (always independent)
  const squadLeader = activeList.find(e => e.unit.required === true);
  if (squadLeader) {
    html += '<div class="list-section-label">SQUAD LEADER</div>';
    html += renderListEntry(squadLeader);
  }

  // Fireteams
  fireteams.forEach(ft => {
    const members = activeList.filter(e => e.fireteamId === ft.id);
    if (members.length > 0) {
      const ftPts = members.reduce((sum, m) => sum + m.totalPts, 0);
      html += `<div class="list-section-label">FIRETEAM ${ft.name.toUpperCase()} <span>${ftPts}pts</span></div>`;
      members.forEach(entry => {
        html += renderListEntry(entry);
      });
    }
  });

  // Independent units
  const independentUnits = activeList.filter(e => e.unit.independent === true);
  if (independentUnits.length > 0) {
    html += '<div class="list-section-label">INDEPENDENT UNITS</div>';
    independentUnits.forEach(entry => {
      html += renderListEntry(entry);
    });
  }

  html += '<div id="validation-summary"></div>';
  container.innerHTML = html;
  
  renderValidation();
}

function renderListEntry(entry) {
  const upgradeText = entry.selectedUpgrades.map(u => u.name).join(', ');
  
  return `
    <div class="list-entry" onclick="editUnit(${entry.id})">
      <div class="list-entry-info">
        <div class="list-entry-role">${entry.unit.role}</div>
        <div class="list-entry-name">${entry.unit.name}</div>
        ${upgradeText ? `<div class="list-entry-upgrades">${upgradeText}</div>` : ''}
      </div>
      <div class="list-entry-right">
        <div class="list-entry-pts">${entry.totalPts}pts</div>
        <button class="remove-btn" onclick="event.stopPropagation(); removeUnit(${entry.id})">✕</button>
        <button class="remove-btn" onclick="event.stopPropagation(); cloneUnit(${entry.id})">⎘</button>
      </div>
    </div>
  `;
}

// ============================================
// UNIT MODAL
// ============================================

let currentModalUnitId = null;
let currentModalMode = 'add'; // 'add' or 'edit'
let currentEditingEntryId = null;
let selectedUpgrades = [];

function openUnitModal(unitId, editMode = false, entryId = null) {
  const faction = factions[currentFaction];
  const unit = faction.units.find(u => u.id === unitId);
  if (!unit) return;

  currentModalUnitId = unitId;
  currentModalMode = editMode ? 'edit' : 'add';
  currentEditingEntryId = entryId;
  selectedUpgrades = [];

  // If editing, load current upgrades
  if (editMode && entryId !== null) {
    const entry = activeList.find(e => e.id === entryId);
    if (entry) {
      selectedUpgrades = [...entry.selectedUpgrades];
    }
  }

  renderUnitModal(unit);
}

function renderUnitModal(unit) {
  // Remove existing modal if present
  const existing = document.getElementById('unit-modal-overlay');
  if (existing) {
    document.body.removeChild(existing);
  }

  const overlay = document.createElement('div');
  overlay.id = 'unit-modal-overlay';

  const modal = document.createElement('div');
  modal.id = 'unit-modal';

  // Header
  const header = document.createElement('div');
  header.id = 'modal-header';
  header.innerHTML = `
    <div>
      <div class="modal-role">${unit.role}</div>
      <div class="modal-name">${unit.name}</div>
    </div>
    <button id="modal-close">✕</button>
  `;
  modal.appendChild(header);

  // Points display
  const upgradePoints = selectedUpgrades.reduce((sum, u) => sum + u.pts, 0);
  const totalPts = unit.pts + upgradePoints;
  
  const ptsDisplay = document.createElement('div');
  ptsDisplay.id = 'modal-pts-display';
  ptsDisplay.textContent = `${totalPts}pts`;
  modal.appendChild(ptsDisplay);

  // Stats
  const statsLabel = document.createElement('div');
  statsLabel.className = 'modal-section-label';
  statsLabel.textContent = 'STATS';
  modal.appendChild(statsLabel);

  const stats = document.createElement('div');
  stats.id = 'modal-stats';
  stats.innerHTML = `
    <div class="modal-stat">
      <div class="modal-stat-label">MOVE</div>
      <div class="modal-stat-value">${unit.stats.MOV}</div>
    </div>
    <div class="modal-stat">
      <div class="modal-stat-label">MOR</div>
      <div class="modal-stat-value">${unit.stats.MOR}</div>
    </div>
    <div class="modal-stat">
      <div class="modal-stat-label">CEV</div>
      <div class="modal-stat-value">${unit.stats.CEV}</div>
    </div>
    <div class="modal-stat">
      <div class="modal-stat-label">DR</div>
      <div class="modal-stat-value">${unit.stats.DR}</div>
    </div>
  `;
  modal.appendChild(stats);

  // Weapons
  const weaponsLabel = document.createElement('div');
  weaponsLabel.className = 'modal-section-label';
  weaponsLabel.textContent = 'WEAPONS';
  weaponsLabel.style.marginTop = '16px';
  modal.appendChild(weaponsLabel);

  const weaponsTable = document.createElement('table');
  weaponsTable.id = 'modal-weapons';
  weaponsTable.innerHTML = `
    <thead>
      <tr>
        <th>NAME</th>
        <th>DICE</th>
        <th>HIT</th>
        <th>RANGE</th>
        <th>KW</th>
      </tr>
    </thead>
    <tbody>
      ${unit.weapons.map(w => `
        <tr>
          <td>${w.name}</td>
          <td>${w.dice}D</td>
          <td>${w.hit}</td>
          <td>${w.range}</td>
          <td class="kw-cell">${w.keywords || '—'}</td>
        </tr>
      `).join('')}
    </tbody>
  `;
  modal.appendChild(weaponsTable);

  // Abilities
  if (unit.abilities && unit.abilities.length > 0) {
    const abilitiesLabel = document.createElement('div');
    abilitiesLabel.className = 'modal-section-label';
    abilitiesLabel.textContent = 'ABILITIES';
    abilitiesLabel.style.marginTop = '16px';
    modal.appendChild(abilitiesLabel);

    const abilities = document.createElement('div');
    abilities.id = 'modal-abilities';
    abilities.innerHTML = unit.abilities.map(a => `<div class="ability-tag">${a}</div>`).join('');
    modal.appendChild(abilities);
  }

  // Upgrades
  if (unit.upgrades && unit.upgrades.length > 0) {
    renderUpgrades(modal, unit);
  }

  // Add/Update button
  const addBtn = document.createElement('button');
  addBtn.id = 'modal-add-btn';
  addBtn.textContent = currentModalMode === 'edit' ? 'UPDATE UNIT' : 'ADD TO LIST';
  if (currentModalMode === 'edit') {
    addBtn.classList.add('edit-mode');
  }
  addBtn.onclick = () => {
    if (currentModalMode === 'edit') {
      updateExistingUnit();
    } else {
      addUnitToList();
    }
  };
  modal.appendChild(addBtn);

  // Close button handler
  modal.querySelector('#modal-close').onclick = () => {
    document.body.removeChild(overlay);
  };

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Close on overlay click
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  };
}

function renderUpgrades(modal, unit) {
  const upgradesLabel = document.createElement('div');
  upgradesLabel.className = 'modal-section-label';
  upgradesLabel.textContent = 'UPGRADES';
  upgradesLabel.style.marginTop = '16px';
  
  // Show socket limits if they exist
  if (unit.socketLimits) {
    const limitText = Object.entries(unit.socketLimits)
      .map(([socket, limit]) => `${limit} ${socket}`)
      .join(' / ');
    upgradesLabel.innerHTML = `UPGRADES <span class="upgrade-socket-summary">${limitText}</span>`;
  }
  
  modal.appendChild(upgradesLabel);

  // Group by socket
  const bySocket = {};
  unit.upgrades.forEach(upgrade => {
    if (!bySocket[upgrade.socket]) {
      bySocket[upgrade.socket] = [];
    }
    bySocket[upgrade.socket].push(upgrade);
  });

  Object.keys(bySocket).forEach(socket => {
    const socketLabel = document.createElement('div');
    socketLabel.className = 'upgrade-socket-label';
    socketLabel.textContent = `[${socket}]`;
    modal.appendChild(socketLabel);

    bySocket[socket].forEach(upgrade => {
      const isSelected = selectedUpgrades.some(u => u.socket === upgrade.socket && u.name === upgrade.name);
      const socketCount = selectedUpgrades.filter(u => u.socket === socket).length;
      const socketLimit = unit.socketLimits ? unit.socketLimits[socket] || 0 : 0;
      const isDisabled = !isSelected && socketCount >= socketLimit;

      const row = document.createElement('div');
      row.className = 'upgrade-row';
      if (isSelected) row.classList.add('selected');
      if (isDisabled) row.classList.add('disabled');

      row.innerHTML = `
        <div class="upgrade-info">
          <div class="upgrade-name">${isSelected ? '✓ ' : ''}${upgrade.name}</div>
          <div class="upgrade-effect">${upgrade.effect}</div>
        </div>
        <div class="upgrade-pts">+${upgrade.pts}pts</div>
      `;

      if (!isDisabled || isSelected) {
        row.onclick = () => toggleUpgrade(upgrade, unit);
      }

      modal.appendChild(row);
    });
  });
}

function toggleUpgrade(upgrade, unit) {
  const isSelected = selectedUpgrades.some(u => u.socket === upgrade.socket && u.name === upgrade.name);
  
  if (isSelected) {
    // Remove upgrade
    selectedUpgrades = selectedUpgrades.filter(u => !(u.socket === upgrade.socket && u.name === upgrade.name));
  } else {
    // Check socket limit
    const socketCount = selectedUpgrades.filter(u => u.socket === upgrade.socket).length;
    const socketLimit = unit.socketLimits ? unit.socketLimits[upgrade.socket] || 0 : 0;
    
    if (socketCount >= socketLimit) {
      showErrorModal(`SOCKET LIMIT REACHED: MAX ${socketLimit} ${upgrade.socket} UPGRADE${socketLimit > 1 ? 'S' : ''}`);
      return;
    }
    
    selectedUpgrades.push(upgrade);
  }

  // Re-render modal with updated selection
  renderUnitModal(unit);
}

// ============================================
// ADD/EDIT/REMOVE UNIT FUNCTIONS
// ============================================

function showFireteamPicker(unit, upgradePoints, totalPts) {
  // Create modal overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 250;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  `;

  // Create modal box
  const modal = document.createElement('div');
  modal.style.cssText = `
    background: #111418;
    border: 2px solid #8fbc8f;
    padding: 30px;
    max-width: 400px;
    width: 100%;
  `;

  // Title
  const title = document.createElement('div');
  title.style.cssText = `
    color: #8fbc8f;
    font-size: 16px;
    letter-spacing: 2px;
    margin-bottom: 20px;
    text-align: center;
  `;
  title.textContent = 'SELECT FIRETEAM';
  modal.appendChild(title);

  // Unit info
  const unitInfo = document.createElement('div');
  unitInfo.style.cssText = `
    color: #ccc;
    font-size: 14px;
    margin-bottom: 20px;
    text-align: center;
  `;
  unitInfo.textContent = `${unit.name} (${totalPts}pts)`;
  modal.appendChild(unitInfo);

  // Fireteam buttons
  fireteams.forEach(ft => {
    const members = activeList.filter(e => e.fireteamId === ft.id);
    const ftPts = members.reduce((sum, m) => sum + m.totalPts, 0);
    
    const btn = document.createElement('button');
    btn.style.cssText = `
      width: 100%;
      background: #1a1f26;
      border: 1px solid #8fbc8f;
      color: #8fbc8f;
      padding: 15px;
      margin-bottom: 10px;
      cursor: pointer;
      font-family: 'Share Tech Mono', monospace;
      font-size: 14px;
      letter-spacing: 2px;
      text-align: left;
    `;
    btn.innerHTML = `
      <div style="display: flex; justify-content: space-between;">
        <span>FIRETEAM ${ft.name.toUpperCase()}</span>
        <span>${members.length} MODELS | ${ftPts}pts</span>
      </div>
    `;
    
    btn.onmouseover = () => {
      btn.style.background = '#8fbc8f';
      btn.style.color = '#111418';
    };
    btn.onmouseout = () => {
      btn.style.background = '#1a1f26';
      btn.style.color = '#8fbc8f';
    };
    
    btn.onclick = () => {
      document.body.removeChild(overlay);
      finalizeAddUnit(unit, upgradePoints, totalPts, ft.id);
    };
    
    modal.appendChild(btn);
  });

  // Cancel button
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'CANCEL';
  cancelBtn.style.cssText = `
    width: 100%;
    background: #1a0808;
    border: 1px solid #e74c3c;
    color: #e74c3c;
    padding: 10px;
    margin-top: 10px;
    cursor: pointer;
    font-family: 'Share Tech Mono', monospace;
    font-size: 14px;
    letter-spacing: 2px;
  `;
  cancelBtn.onmouseover = () => {
    cancelBtn.style.background = '#e74c3c';
    cancelBtn.style.color = '#fff';
  };
  cancelBtn.onmouseout = () => {
    cancelBtn.style.background = '#1a0808';
    cancelBtn.style.color = '#e74c3c';
  };
  cancelBtn.onclick = () => document.body.removeChild(overlay);
  
  modal.appendChild(cancelBtn);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Close on overlay click
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  };
}

function finalizeAddUnit(unit, upgradePoints, totalPts, fireteamId) {
  const entry = {
    id: Date.now(),
    unit: unit,
    selectedUpgrades: [...selectedUpgrades],
    totalPts: totalPts,
    fireteamId: fireteamId
  };

  activeList.push(entry);
  
  // Close unit modal
  const unitModalOverlay = document.getElementById('unit-modal-overlay');
  if (unitModalOverlay) {
    document.body.removeChild(unitModalOverlay);
  }

  renderActiveList();
  updatePointsDisplay();
}

function addUnitToList() {
  const faction = factions[currentFaction];
  const unit = faction.units.find(u => u.id === currentModalUnitId);
  if (!unit) return;

  // Check max per list
  if (unit.maxPerList) {
    const count = activeList.filter(e => e.unit.id === unit.id).length;
    if (count >= unit.maxPerList) {
      showErrorModal(`MAX ${unit.maxPerList} ${unit.name.toUpperCase()} PER LIST`);
      return;
    }
  }

  const upgradePoints = selectedUpgrades.reduce((sum, u) => sum + u.pts, 0);
  const totalPts = unit.pts + upgradePoints;

  let fireteamId = null;

  // Handle fireteam assignment
  if (unit.role === "Team Leader") {
    // Create new fireteam
    const newFireteam = {
      id: nextFireteamId++,
      name: getFireteamName(nextFireteamId - 1)
    };
    fireteams.push(newFireteam);
    fireteamId = newFireteam.id;
  } else if (!unit.required && !unit.independent) {
    // Regular unit needs to join a fireteam
    if (fireteams.length === 0) {
      showErrorModal("CREATE A FIRETEAM FIRST — ADD A TEAM LEADER");
      return;
    }
    
    // Show fireteam picker if multiple fireteams exist
    if (fireteams.length > 1) {
      showFireteamPicker(unit, upgradePoints, totalPts);
      return; // Exit here, the picker will handle adding the unit
    }
    
    // Only one fireteam exists, auto-assign
    fireteamId = fireteams[0].id;
  }

  const entry = {
    id: Date.now(),
    unit: unit,
    selectedUpgrades: [...selectedUpgrades],
    totalPts: totalPts,
    fireteamId: fireteamId
  };

  activeList.push(entry);
  
  // Close modal
  const overlay = document.getElementById('unit-modal-overlay');
  if (overlay) {
    document.body.removeChild(overlay);
  }

  renderActiveList();
  updatePointsDisplay();
}

function editUnit(entryId) {
  const entry = activeList.find(e => e.id === entryId);
  if (!entry) return;

  openUnitModal(entry.unit.id, true, entryId);
}

function updateExistingUnit() {
  const entry = activeList.find(e => e.id === currentEditingEntryId);
  if (!entry) return;

  const upgradePoints = selectedUpgrades.reduce((sum, u) => sum + u.pts, 0);
  entry.selectedUpgrades = [...selectedUpgrades];
  entry.totalPts = entry.unit.pts + upgradePoints;

  // Close modal
  const overlay = document.getElementById('unit-modal-overlay');
  if (overlay) {
    document.body.removeChild(overlay);
  }

  renderActiveList();
  updatePointsDisplay();
}

function removeUnit(entryId) {
  const entry = activeList.find(e => e.id === entryId);
  if (!entry) return;

  // If removing a Team Leader, remove the entire fireteam
  if (entry.unit.role === "Team Leader" && entry.fireteamId !== null) {
    activeList = activeList.filter(e => e.fireteamId !== entry.fireteamId);
    fireteams = fireteams.filter(ft => ft.id !== entry.fireteamId);
  } else {
    activeList = activeList.filter(e => e.id !== entryId);
  }

  renderActiveList();
  updatePointsDisplay();
}

function cloneUnit(entryId) {
  const entry = activeList.find(e => e.id === entryId);
  if (!entry) return;

  // Check max per list
  if (entry.unit.maxPerList) {
    const count = activeList.filter(e => e.unit.id === entry.unit.id).length;
    if (count >= entry.unit.maxPerList) {
      showErrorModal(`MAX ${entry.unit.maxPerList} ${entry.unit.name.toUpperCase()} PER LIST`);
      return;
    }
  }

  const clonedEntry = {
    id: Date.now(),
    unit: entry.unit,
    selectedUpgrades: [...entry.selectedUpgrades],
    totalPts: entry.totalPts,
    fireteamId: entry.fireteamId
  };

  activeList.push(clonedEntry);
  
  renderActiveList();
  updatePointsDisplay();
}

// ============================================
// FACTION SELECT
// ============================================

function selectFaction(factionKey) {
  currentFaction = factionKey;
  activeList = [];
  fireteams = [];
  nextFireteamId = 0;

  const factionSelect = document.getElementById('faction-select');
  factionSelect.style.display = 'none';

  const app = document.getElementById('app');
  app.innerHTML = `
    <div id="points-bar">
      <div id="list-name">${factions[factionKey].name.toUpperCase()} — LIST BUILDER</div>
      <div id="points-display">0 / ${POINTS_LIMIT} PTS</div>
    </div>
    <div id="unit-browser">
      <div id="unit-list"></div>
      <div id="active-list"></div>
    </div>
  `;

  renderUnitBrowser();
  renderActiveList();
  updatePointsDisplay();
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const factionBtns = document.querySelectorAll('.faction-btn');
  
  factionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const faction = btn.dataset.faction;
      selectFaction(faction);
    });
  });
});