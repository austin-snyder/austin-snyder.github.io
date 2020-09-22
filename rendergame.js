/*
 * Game: Idle Remake
 * Author: Austin Snyder
 */

export const renderHeroCard = function(hero) {
    var div_beg = `<div id="card_${hero.id}">`;
    var span_beg = `<span>`;
    var name = `<title>${hero.name}</title>`;
    var subtitle = `<subtitle>${hero.subtitle}</subtitle>`;
    var first = `<p>${hero.first}`;
    var last = ` ${hero.last}</p>`;
    var span_end = `</span>`;
    var image = `<img src=${hero.img}>`;
    var desc = `<p style="background-color: ${hero.backgroundColor};">${hero.description}</p>`;
    var first_seen = `<p style="color: ${hero.color};">${hero.firstSeen}</p>`;
    var edit_button = `<button type="button" id="edit_${hero.id}" class="editButton">Edit</button>`;
    var div_end = `</div>`;

    var hero_card = div_beg.concat(span_beg, name, subtitle, first, last, span_end, image, desc, first_seen, edit_button, div_end);
    return hero_card;
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    var form_beg = `<form>`;
    var name = `<label>Superhero Name:</label><br><input type="text" id="in_name_${hero.id}" value="${hero.name}"><br>`;
    var subtitle = `<label>Subtitle:</label><br><input type="text" id="in_subtitle_${hero.id}" value="${hero.subtitle}"><br>`;
    var first = `<label>First Name:</label><br><input type="text" id="in_first_${hero.id}" value="${hero.first}"><br>`;
    var last = `<label>Last Name:</label><br><input type="text" id="in_last_${hero.id}" value="${hero.last}"><br>`;
    var image = `<label>Image source:</label><br><input type="text" id="in_image_${hero.id}" value="${hero.img}"><br>`;
    var desc = `<label>Description:</label><br><textarea id="in_desc_${hero.id}">${hero.description}</textarea><br>`;
    var first_seen = `<label>First Seen:</label><br><input type="date" id="in_firstSeen_${hero.id}" value="${formatDate(hero.firstSeen)}"><br>`;
    var save_button = `<button type="submit" id="submit_${hero.id}" class="submitButton">Save</button>`;
    var cancel_button = `<button type="button" id="cancel_${hero.id}" class="cancelButton">Cancel</button>`;
    var form_end = `</form>`;

    var rendered_form = form_beg.concat(name, subtitle, first, last, image, desc, first_seen, save_button, cancel_button, form_end);
    return rendered_form;
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // Grab event information
    var type = event.type;
    var target = event.currentTarget;
    var id = parseInt(target.id.split("_")[1]);

    // Grab hero information
    var hero_location = 0;

    for (var i = 0; i < heroicData.length; i++) {
        if (heroicData[i].id === id) {
            hero_location = i;
            console.log("Edit: ".concat(heroicData[i].name));
        }
    }

    // Create hero edit form & replace the old card with it
    var rendered_form = renderHeroEditForm(heroicData[hero_location]);
    document.getElementById("card_".concat(id)).innerHTML = rendered_form;
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {

    // Grab event information
    var type = event.type;
    var target = event.currentTarget;
    var id = parseInt(target.id.split("_")[1]);

    // Grab hero information
    var hero_location = 0;

    for (var i = 0; i < heroicData.length; i++) {
        if (heroicData[i].id === id) {
            hero_location = i;
            console.log("Cancel: ".concat(heroicData[i].name));
        }
    }

    // Create non-modified hero card and replace form with it
    var rendered_card = renderHeroCard(heroicData[hero_location]);
    document.getElementById("card_".concat(id)).innerHTML = rendered_card;
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // Grab event information
    var type = event.type;
    var target = event.currentTarget;
    var id = parseInt(target.id.split("_")[1]);

    // Display event information
    console.log("Event type: ".concat(type));
    console.log("Event target: ".concat(target));
    console.log("Event target ID: ".concat(id));

    // Grab hero information
    var hero_location = 0;

    for (var i = 0; i < heroicData.length; i++) {
        if (heroicData[i].id === id) {
            hero_location = i;
            console.log("Submit: ".concat(heroicData[i].name));
        }
    }

    // Modify hero data
    heroicData[hero_location].name = document.getElementById("in_name_".concat(id)).value;
    heroicData[hero_location].subtitle = document.getElementById("in_subtitle_".concat(id)).value;
    heroicData[hero_location].first = document.getElementById("in_first_".concat(id)).value;
    heroicData[hero_location].last = document.getElementById("in_last_".concat(id)).value;
    heroicData[hero_location].img = document.getElementById("in_image_".concat(id)).value;
    heroicData[hero_location].description = document.getElementById("in_desc_".concat(id)).value;
    var date = new Date(document.getElementById("in_firstSeen_".concat(id)).value);
    date.setTime(date.getTime() + (date.getTimezoneOffset()*60*1000));
    heroicData[hero_location].firstSeen = date;

    // Create modified hero card and replace form with it
    var rendered_card = renderHeroCard(heroicData[hero_location]);
    document.getElementById("card_".concat(id)).innerHTML = rendered_card;
};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    for (var i = 0; i < heroes.length; i++) {
        var hero = heroes[i];
        var card = renderHeroCard(hero);
        $root.append(card);
    }

    $root.on("click", ".editButton", handleEditButtonPress);
    $root.on("click", ".submitButton", handleEditFormSubmit);
    $root.on("click", ".cancelButton", handleCancelButtonPress);

    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button

    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form

    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
};

export function formatDate(date) {
    var formatted_date = new Date(date),
        month = '' + (formatted_date.getMonth() + 1),
        day = '' + formatted_date.getDate(),
        year = formatted_date.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

$(function() {
    loadHeroesIntoDOM(heroicData);
});