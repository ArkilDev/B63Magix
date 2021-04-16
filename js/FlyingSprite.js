class FlyingSprite {
    constructor(spriteIndex) {
		switch(spriteIndex) {
			default: this.tiledImage = new TiledImage("images/vengefly.png", 5, 1, 100, true, 1, null); break;
			case 1: this.tiledImage = new TiledImage("images/aspid.png", 6, 1, 100, true, 1, null); break;
			case 2: this.tiledImage = new TiledImage("images/maskfly.png", 4, 1, 100, true, 1, null); break;
		}

        this.tiledImage.changeRow(0);
        this.tiledImage.changeMinMaxInterval(0, 5);
		this.x = window.innerWidth;
		this.y = Math.random() * 500 + 50;
		this.spd = Math.random() * 10 + 30;
	}

	tick () {
        this.x -= this.spd;
        if (this.x <= 0) {
            return false;
        }

		this.tiledImage.tick(this.x, this.y, ctx);
		return true;
	}
}