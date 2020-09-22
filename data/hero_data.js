/**
 * Represents a list of heroes
 */

const factionInfo = [{
    name: "Forest",
    color: "#a5ff60",
    boostAgainst: "Shadow",
}, {
    name: "Shadow",
    color: "#60eaff",
    boostAgainst: "Fortress",
}, {
    name: "Fortress",
    color: "#ff8d60",
    boostAgainst: "Abyss",
}, {
    name: "Abyss",
    color: "#ff60a5",
    boostAgainst: "Forest",
}, {
    name: "Light",
    color: "#ffff63",
    boostAgainst: "Dark",
}, {
    name: "Dark",
    color: "#c2c2c2",
    boostAgainst: "Light",
},];

const heroicData = [{
    id: 1,
    name: "Valkyrie",
    faction: factionInfo[0].name,
    backgroundColor: factionInfo[0].color,
    stats: {
        hp: 610537,
        attack: 25426,
        armor: 1554,
        speed: 1147,
    },
    basicAttack: {
        primaryDamage: {
            pctSelfAttack: .95,
            targetNum: 0,
        },
        damageOverTime: {
            pctEnemyHP: 0.06,
            rounds: 5,
            targetNum: 0,
        },
    },
    activeSkill: {
        primaryDamage: {
            pctSelfAttack: 1.62,
        },
        damageOverTime: {
            pctEnemyHP: 0.18,
            rounds: 10,
        },
    },
}, {
    id: 2,
    name: "Iceblink",
    faction: factionInfo[2].name,
    backgroundColor: factionInfo[2].color,
    stats: {
        hp: 572933,
        attack: 21478,
        armor: 1709,
        speed: 1140,
    },
    basicAttack: {
        primaryDamage: {
            pctSelfAttack: 1.00,
        },
        damageOverTime: {
            pctEnemyHP: 0.00,
            rounds: 0,
        },
    },
    activeSkill: {
        primaryDamage: {
            pctSelfAttack: 1.48,
        },
        damageOverTime: {
            pctEnemyHP: 0.00,
            rounds: 0,
        },
    },
},];
