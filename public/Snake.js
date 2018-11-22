class Snake {
    constructor(size, startPosX = Generator.position(), startPosY = Generator.position()) {
        this.size = size;
        this.posx = startPosX;
        this.posy = startPosY;
        this.tail = [];
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.total = 1;
    }
    
    eat(apple) {
        if (this.posx == apple.posx && this.posy == apple.posy) {
            this.tail.push({
                posx: this.posx,
                posy: this.posy
            });
            this.total++;
            return true;
        }
        return false;
    }
    setColors(firstColor, secondColor) {
        this.firstColor = firstColor;
        this.secondColor = secondColor;
    }
    controlsARROWS(keyCode) {
        switch (keyCode) {
            case 37:
                if (this.xVelocity != 1) {
                    this.xVelocity = -1;
                    this.yVelocity = 0;
                }
                break;
            case 38:
                if (this.yVelocity != 1) {
                    this.xVelocity = 0;
                    this.yVelocity = -1;
                }
                break;
            case 39:
                if (this.xVelocity != -1) {
                    this.xVelocity = 1;
                    this.yVelocity = 0;
                }
                break;
            case 40:
                if (this.yVelocity != -1) {
                    this.xVelocity = 0;
                    this.yVelocity = 1;
                }
                break;
        }
    }
    controlsWSAD(keyCode) {
        switch (keyCode) {
            case 65:
                if (this.xVelocity != 1) {
                    this.xVelocity = -1;
                    this.yVelocity = 0;
                }
                break;
            case 87:
                if (this.yVelocity != 1) {
                    this.xVelocity = 0;
                    this.yVelocity = -1;
                }
                break;
            case 68:
                if (this.xVelocity != -1) {
                    this.xVelocity = 1;
                    this.yVelocity = 0;
                }
                break;
            case 83:
                if (this.yVelocity != -1) {
                    this.xVelocity = 0;
                    this.yVelocity = 1;
                }
                break;
        }
    }
    controlsBOTH(keyCode) {
        switch (keyCode) {
            case 65:
            case 37:
                if (this.xVelocity != 1) {
                    this.xVelocity = -1;
                    this.yVelocity = 0;
                }
                break;
            case 87:
            case 38:
                if (this.yVelocity != 1) {
                    this.xVelocity = 0;
                    this.yVelocity = -1;
                }
                break;
            case 68:
            case 39:
                if (this.xVelocity != -1) {
                    this.xVelocity = 1;
                    this.yVelocity = 0;
                }
                break;
            case 83:
            case 40:
                if (this.yVelocity != -1) {
                    this.xVelocity = 0;
                    this.yVelocity = 1;
                }
                break;
        }
    }
    setControls(controls = "ARROWS") {
        delete this.changeDirection;
        if (controls == "ARROWS")
            this.changeDirection = this.controlsARROWS;
        else if (controls == "WSAD")
            this.changeDirection = this.controlsWSAD;
        else if (controls == "BOTH")
            this.changeDirection = this.controlsBOTH;
    }
    draw(ctx) {
        this.tail.forEach((piece, idx) => {
            if (idx % 2 == 0)
                ctx.fillStyle = this.firstColor;
            else
                ctx.fillStyle = this.secondColor;
            ctx.fillRect(piece.posx, piece.posy, this.size, this.size);
        })
    }
    move() {
        this.posx += this.xVelocity * this.size;
        this.posy += this.yVelocity * this.size;
    }
    tailMove() {
        this.tail.pop();
        this.tail.unshift({
            posx: this.posx,
            posy: this.posy
        });
    }
    wallCross(ctxSize) {
        if (this.posx > ctxSize - this.size) {
            this.posx = 0;
        } else if (this.posx < 0) {
            this.posx = ctxSize - this.size;
        }
        if (this.posy > ctxSize - this.size) {
            this.posy = 0;
        } else if (this.posy < 0) {
            this.posy = ctxSize - this.size;
        }
    }
    checkCollision() {
        let result = false;
        this.tail.forEach((obj,idx) => {
            if(idx != 0 && this.posx == obj.posx && this.posy == obj.posy)
                result = true;
        });
        return result;
    }
}