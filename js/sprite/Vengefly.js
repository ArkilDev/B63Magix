class Vengefly {
    constructor() {
        let columnCount = 5;
		let rowCount = 1;
		let refreshDelay = 100;
		let loopColumn = true;
		let scale = 1;

		this.tiledImage = new TiledImage("images/spritesheet.png", columnCount, rowCount, refreshDelay, loopColumn, scale, null);

        this.tiledImage.changeRow(0);
        this.tiledImage.changeMinMaxInterval(0, 5);
		this.x = window.innerWidth;
		this.y = Math.random() * 500 + 50;
	}

	tick () {
        this.x -= 40;
        if (this.x <= 0) {
            return false;
        }

		this.tiledImage.tick(this.x, this.y, ctx);
		return true;
	}
}