class Generator {
    static setSizes(ctxSize, size){
        this.ctxSize = ctxSize;
        this.size = size;
    }
    static position() {
        return Math.floor((Math.random() * (this.ctxSize - this.size)/this.size)) * this.size;
    }
}

class Apple {
    constructor(size, color){
        this.size = size;
        this.posx = 0;
        this.posy = 0;
        this.color = color;
    }
    setPosition(x = Generator.position(), y = Generator.position()){
        this.posx = x;
        this.posy = y;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posx, this.posy, this.size, this.size);
    }
}