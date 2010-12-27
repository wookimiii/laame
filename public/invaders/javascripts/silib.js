var monsters = [];
var player = null;

Crafty.c("tank_twoway", {
	__move: {left: false, right: false, up: false, falling: false},
	_speed: 3,
	
	twoway: function(speed) {
		if(speed) this._speed = speed;
		var move = this.__move;
		
		this.bind("enterframe", function() {
			var old = this.pos(),
				changed = false;
			if(move.right) {
				this.x += this._speed;
				if(this.x + this.w > Crafty.viewport.width ) this.x = Crafty.viewport.width - this.w;
			}
			if(move.left) {
				this.x -= this._speed;
				if(this.x < 0 ) this.x =0;
			}
		}).bind("keydown", function(e) {
			if(e.keyCode === Crafty.keys.RA || e.keyCode === Crafty.keys.D) {
				move.right = true;
			}
			if(e.keyCode === Crafty.keys.LA || e.keyCode === Crafty.keys.A) {
				move.left = true;
			}
			
		}).bind("keyup", function(e) {
			if(e.keyCode === Crafty.keys.RA || e.keyCode === Crafty.keys.D) {
				move.right = false;
			}
			if(e.keyCode === Crafty.keys.LA || e.keyCode === Crafty.keys.A) {
				move.left = false;
			}
		});
		return this;
	}
});

Crafty.c("bullet", {
		bullet: function(dir) {
			this.bind("enterframe", function() {
				this.move(dir, 10);
				if(this.y > Crafty.viewport.height || this.y < 0) 
					this.destroy();
			});
			return this;
		}
	});
	
	
Crafty.c("monster_move", {
	__dir: 'w',
	__alive: true,
	__speed: 1,
	__level: 1,
	monster_move: function(){
		this.bind("enterframe", function() {
			var change = false;
			this.move(this.__dir, this.__speed);
			if(this.x + this.w >= Crafty.viewport.width ){
				this.x = Crafty.viewport.width - this.w;
				change = true;
			} 
			if(this.x <= 0 ){
				this.x =0;
				change = true;
			}
			this.attr({x:this.x, y:this.y});
			if(change){
				for( m in monsters){
					monsters[m].trigger('change_direction');
				}
			}
			return this;
		});
		this.bind("change_direction", function() {
			this.__dir == 'w' ? this.__dir = 'e' : this.__dir = 'w';
			this.__level++;
			this.__speed = this.__level/3;
			this.move('s', 30);
		});
	}
});
	
