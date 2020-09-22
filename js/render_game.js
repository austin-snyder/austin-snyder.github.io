/*
 * Game: Idle Remake
 * Author: Austin Snyder
 */

export const renderHeroInfo = function(hero) {
    var div_beg = `<div id="card_${hero.id}" style="background-color: ${hero.backgroundColor};">`;
    var span_beg = `<span>`;
    var name = `<h2>${hero.name}</h2>`;
    var span_end = `</span>`;
    var hp = `<p><span style="font-weight: bold;">HP:</span> ${hero.stats.hp}</p>`;
    var attack = `<p><span style="font-weight: bold;">Attack:</span> ${hero.stats.attack}</p>`;
    var armor = `<p><span style="font-weight: bold;">Armor:</span> ${hero.stats.armor}</p>`;
    var speed = `<p><span style="font-weight: bold;">Speed:</span> ${hero.stats.speed}</p>`;
    var battle_button = `<button type="button" id="battle_${hero.id}" class="battleButton">Battle</button>`;
    var div_end = `</div>`;

    var hero_card = div_beg.concat(span_beg, name, span_end, hp, attack, armor, speed, battle_button, div_end);
    return hero_card;
};

export const renderBattleHero = function(hero) {
    var heroName = `<h2>${hero.name}</h2>`;
    var hb = renderHealthBar(hero);
    var str = heroName.concat(hb);
    return str;
};

export const damageHero = function(event) {
    // Grab event information
    var eventTarget = event.currentTarget;
    var id = parseInt(eventTarget.id.split("_")[1]);
    const $health = $('#health_'.concat(id));

    // Grab hero information
    var attackHeroLoc;
    var attackHero;

    for (var i = 0; i < heroicData.length; i++) {
        if (heroicData[i].id === id) {
            attackHeroLoc = i;
            attackHero = heroicData[i];
        }
    }

    var targetHero;

    for (var i = 0; i < heroicData.length; i++) {
        var el = document.getElementById("health_".concat(heroicData[i].id));
        if (el != null && id != heroicData[i].id) {
            targetHero = heroicData[i];
            console.log("Target: ".concat(targetHero.name));
        }
    }

    var currHealth = parseInt(document.getElementById("heroHP_".concat(targetHero.id)).innerHTML);
    var maxHealth = targetHero.stats.hp;

    var attackStat = attackHero.stats.attack;
    var multiplier = attackHero.basicAttack.primaryDamage.pctSelfAttack;

    var damage = Math.floor(attackStat * multiplier);
    currHealth = currHealth - damage;

    var messageType = "damage";
    if (currHealth <= 0) {
        currHealth = 0;
        messageType = "death";
    }

    animateHealthBar(currHealth, maxHealth, targetHero.id);
    updateMessageBox(attackHero, targetHero, messageType, damage);
};

export const animateHealthBar = function(currHealth, maxHealth, id) {
    var a = currHealth * (100 / maxHealth);
    $("#healthBarText_".concat(id)).html(String(Math.round(a)).concat("%"));
    $("#healthBarRed_".concat(id)).animate({"width": a + "%"}, 350);
    $("#healthBar_".concat(id)).animate({"width": a + "%"}, 250);
    $("#healthBarBlue_".concat(id)).animate({"width": a + "%"}, 150);

    document.getElementById("heroHP_".concat(id)).innerHTML = currHealth;
}

export const updateMessageBox = function(hero1, hero2, messageType, num) {
    var hero1Name = hero1.name;
    var hero2Name = hero2.name;
    var el = document.getElementById("messageBox");

    if (messageType == "heal") {
        el.innerHTML = hero1Name.concat(" healed ", hero2Name, " for ", num, " health!");
    } else if (messageType == "damage") {
        el.innerHTML = hero1Name.concat(" dealt ", num, " points of damage to ", hero2Name, "!");
    } else if (messageType == "death") {
        el.innerHTML = hero2Name.concat(" has died!");
    }
}

export const renderHealthBar = function(hero) {
    var container = `<div id="health_${hero.id}">`;
    var area = `<div class="area">`;
    var row = `<div class="row">`;

    var healthBox = `<div class="health-box">`;
    var totalHealth = `<div class="total"><span style="font-weight: bold;">HP:</span> <span id="heroHP_${hero.id}">${hero.stats.hp}</span> / ${hero.stats.hp}</div>`;
    var healthBarRed = `<div class="health-bar-red" id="healthBarRed_${hero.id}"></div>`;
    var healthBarBlue = `<div class="health-bar-blue" id="healthBarBlue_${hero.id}"></div>`;
    var healthBar = `<div class="health-bar" id="healthBar_${hero.id}"></div>`;
    var healthBarText = `<div class="health-bar-text" id="healthBarText_${hero.id}"></div>`;

    var attackBtn = `<div class="attackBtn btn" id="attackBtn_${hero.id}" type="button">Attack</div>`;
    var healBtn = `<div class="healBtn btn" id=attackBtn_${hero.id}" type="button">Heal</div>`;
    
    var end = `</div>`;

    var hb = "";
    hb = hb.concat(container, area, row);
    hb = hb.concat(totalHealth, healthBox, healthBarRed, healthBarBlue, healthBar, healthBarText, end);
    hb = hb.concat(attackBtn, healBtn, end)
    hb = hb.concat(end, end);

    return hb;
};


export const handleBattleButtonPress = function(event) {
    // Grab event information
    var target = event.currentTarget;
    var id = parseInt(target.id.split("_")[1]);

    // Grab hero information
    var hero_location = 0;

    for (var i = 0; i < heroicData.length; i++) {
        if (heroicData[i].id === id) {
            hero_location = i;
            console.log("Chosen: ".concat(heroicData[i].name));
        }
    }

    var statusSpot1 = document.getElementById("battleHero1").innerHTML;
    var statusSpot2 = document.getElementById("battleHero2").innerHTML;
    var battleHero = renderBattleHero(heroicData[hero_location]);

    if (statusSpot1 == "") {
        document.getElementById("battleHero1").innerHTML = battleHero;
        console.log("Battle Hero ".concat(heroicData[hero_location].name, " generated in spot 1."))
    } else if (statusSpot2 == "") {
        document.getElementById("battleHero2").innerHTML = battleHero;
        console.log("Battle Hero ".concat(heroicData[hero_location].name, " generated in spot 2."))
    } else {
        console.log("Battle Hero ".concat(heroicData[hero_location].name, " not generated."))
    }

};

export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $heroList = $('#heroList');
    const $arena = $('#arena');

    for (var i = 0; i < heroes.length; i++) {
        var hero = heroes[i];
        var card = renderHeroInfo(hero);
        $heroList.append(card);
    }

    $heroList.on("click", ".battleButton", handleBattleButtonPress);
    
    $arena.on("click", ".attackBtn", damageHero);
};

$(function() {
    loadHeroesIntoDOM(heroicData);
});