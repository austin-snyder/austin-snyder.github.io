$ = jQuery;
var maxHealth = 500,
  curHealth = maxHealth;
$('.total').html(maxHealth + "/" + maxHealth);
$(".health-bar-text").html("100%");
$(".health-bar").css({
  "width": "100%"
});
$(".add-damage").click(function() {
  if (curHealth == 0) {
    $('.message-box').html("Is this the end??");
  } else {
    var damage = Math.floor((Math.random() * 100) + 50);
    $(".health-bar-red, .health-bar").stop();
    curHealth = curHealth - damage;
    if (curHealth < 0) {
      curHealth = 0;
      restart();
    } else {
      $('.message-box').html("You took " + damage + " points of damage!");
    }
    applyChange(curHealth);
  }
});
$(".add-heal").click(function() {
  if (curHealth == maxHealth) {
    $('.message-box').html("You are already at full health");
  } else {
    var heal = Math.floor((Math.random() * 100) + 5);
    $(".health-bar-red, .health-bar-blue, .health-bar").stop();
    curHealth = curHealth + heal;
    if (curHealth > maxHealth) {
      curHealth = maxHealth;
      $('.message-box').html("You're at full health");
    } else if (curHealth == 0) {
      $('.message-box').html("Miraculously! You regained your health by " + heal + " points and get back on to your feet!");
    } else {
      $('.message-box').html("You regained your health by " + heal + " points!");
    }
    applyChange(curHealth);
  }
});

function applyChange(curHealth) {
  var a = curHealth * (100 / maxHealth);
  $(".health-bar-text").html(Math.round(a) + "%");
  $(".health-bar-red").animate({
    'width': a + "%"
  }, 700);
  $(".health-bar").animate({
    'width': a + "%"
  }, 500);
  $(".health-bar-blue").animate({
    'width': a + "%"
  }, 300);
  $('.total').html(curHealth + "/" + maxHealth);
}

function restart() {
  //Was going to have a game over/restart function here. 
  $('.health-bar-red, .health-bar');
  $('.message-box').html("You've been knocked down! Thing's are looking bad.");
}