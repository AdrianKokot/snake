class Game {
    constructor(crates, size, fps, resultSpan, bgColor, firstColor, secondColor, appleColor){
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctxSize = size * crates;
        this.canvas.width = this.ctxSize;
        this.canvas.height = this.ctxSize;
        this.size = size;
        this.fps = fps;
        this.setColors(bgColor, firstColor, secondColor, appleColor);
        this.started = false;
        this.resultSpan = resultSpan;
        Generator.setSizes(this.ctxSize, size);
    }
    drawBackground(){
        this.ctx.clearRect(0,0,this.ctxSize, this.ctxSize);
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(0,0,this.ctxSize, this.ctxSize);
    }
    setColors(bgColor, firstColor, secondColor, appleColor){
        this.bgColor = bgColor;
        this.firstColor = firstColor;
        this.secondColor = secondColor;
        this.appleColor = appleColor;
    }
    play(){
        this.drawBackground();
        this.player.move();
        this.player.wallCross(this.ctxSize);
        if(this.player.eat(this.apple)){
            this.resultSpan.textContent = this.player.total;
            this.apple.setPosition();
        } else
            if(this.player.checkCollision())
                this.stop();
        this.player.tailMove();
        this.apple.draw(this.ctx);
        this.player.draw(this.ctx);
    }
    start(snakeControls = "BOTH"){
        this.player = new Snake(this.size);
        this.player.setControls(snakeControls);
        this.player.setColors(this.firstColor, this.secondColor);
        this.resultSpan.textContent = this.player.total;
        this.apple = new Apple(this.size, this.appleColor);
        this.apple.setPosition();
        let that = this;
        this.interval = setInterval(that.play.bind(that), 1000/that.fps);
    }
    reset(){
        clearInterval(this.interval);
        setTimeout(()=>{
            this.drawBackground();
            delete this.player;
            delete this.apple;
            this.started = false;
        }, 1000);
    }
    stop(){
        window.alert('PRZEGRANA');
        this.reset();
    }
}