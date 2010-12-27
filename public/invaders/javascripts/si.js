

$(document).ready(function(){
	Crafty.init(40);
	Crafty.canvas();
	//Crafty.sprite("/images/monster1.png", {monster:[0,0,128,128]})
	
	Crafty.scene("main", function(){
		createPlayer();
		var i, rows;
		for(rows = 0; rows < 4; rows++){
			for(i=0; i < 8; i++){
				m = createMonster(100 + 40*i, (rows+1) * 50);
				monsters.push(m);
			}
		}
	});
	
	Crafty.scene("main");
});

function createPlayer(){
	player = Crafty.e("2D, player, DOM, controls, collision, animate, audio, health, tank_twoway");
	player.addComponent("color").color("black");
	player.attr({x: Crafty.viewport.width/2, y: Crafty.viewport.height-20, w: 20, h: 20}).twoway(3);
	player.bind("keydown", function(e) {
		if(e.keyCode === Crafty.keys.SP) {
			if(!this.shoot) {
				this.shoot = true;
				this.delay(function() {
					this.shoot = false;
				}, 100);

				Crafty.e("2D, DOM, color, bullet").attr({x: this.x+10, y: this.y, w: 3, h: 5, z:50}).color("rgb(250,0,0)").bullet('n');
			}
		}
	});
}

function createMonster( x, y){
	monster = Crafty.e("2D, DOM, collision, monster, monster_move");
	monster.addComponent("color").color("blue");
	monster.attr({x: x, y: y, w: 20, h: 20, dir: 'e'});
	monster.collision("bullet", function(e){
		this.alive = false;
		this.destroy();
		e.destroy();
	});
	
	monster.collision("player", function(e){
		e.alive = false;
		e.destroy();
	});
	monster.monster_move();
	return monster;
}


