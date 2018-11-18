const size = 20;
const ctxWidth = size * 20, ctxHeight = size * 20;

const canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.height = ctxHeight;
canvas.width = ctxWidth;

const randPos = () => {
    return Math.floor((Math.random() * (ctxWidth - size)/size)) * size;
}

let interval,
    xVelocity = 0,
    yVelocity = 0,
    posx = randPos(),
    posy = randPos(),
    start = false,
    snake = [];

const apple = {
    posx: randPos(),
    posy: randPos()
};

const game = () => {
    if(start){
        ctx.clearRect(snake[0].posx, snake[0].posy, size, size);
        snake.shift();
    }
    start = true;

    posx += xVelocity * size;
    posy += yVelocity * size;

    if(posx > ctxWidth - size){
        posx = 0;
    } else if (posx < 0){
        posx = ctxWidth - size;
    }
    if(posy > ctxHeight - size){
        posy = 0;
    } else if (posy < 0){
        posy = ctxHeight - size;
    }

    if(posx == apple.posx && posy == apple.posy){
        snake.push({
            posx,
            posy
        });
        ctx.clearRect(apple.posx, apple.posy, size, size);
        apple.posx = randPos();
        apple.posy = randPos();
    } else {
        snake.forEach(el => {
            if(posx == el.posx && posy == el.posy){
                alert('Przegrana');
                clearInterval(interval);
                ctx.clearRect(0,0,ctxWidth, ctxHeight);
                start = false;
                snake = [];
                posx = randPos();
                posy = randPos();
                xVelocity = 0;
                yVelocity = 0;
                return;
            }
        });
    }
    ctx.fillStyle = "red";
    ctx.fillRect(apple.posx, apple.posy, size, size);

    ctx.fillStyle = "lime";
    ctx.fillRect(posx, posy, size, size);
    snake.push({
        posx,
        posy
    });
}

window.addEventListener('keydown', ev => {
    if(!start){
        interval = setInterval(game, 1000/15);
    } else {
        switch(ev.keyCode){
            case 37: if(xVelocity != 1){xVelocity = -1; yVelocity = 0;} break;
            case 38: if(yVelocity != 1){xVelocity = 0; yVelocity = -1;} break;
            case 39: if(xVelocity != -1){xVelocity = 1; yVelocity = 0;} break;
            case 40: if(yVelocity != -1){xVelocity = 0; yVelocity = 1;} break;
        }
    }
});