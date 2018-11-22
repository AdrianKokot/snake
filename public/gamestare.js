const size = 20;
const ctxWidth = size * 20, ctxHeight = size * 20;
const fps = 15;

let bgColor = localStorage.getItem('bgColor') || "#a5d6a7";
let firstColor = localStorage.getItem('firstColor') || "#689f38";
let secondColor = localStorage.getItem('secondColor') || firstColor;

const btnOptions = document.querySelector('i.options');
const modalOptions = document.querySelector('section.options');
const modalOptionsClose = document.querySelector('section.options i');

btnOptions.addEventListener('click', ()=>{
    modalOptions.classList.add('active');
});
modalOptionsClose.addEventListener('click', ()=>{
    modalOptions.classList.remove('active');
})
const canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.height = ctxHeight;
canvas.width = ctxWidth;
const spanResult = document.querySelector('span');
let total = 1;
spanResult.textContent = total;

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
ctx.fillStyle = bgColor;
    ctx.fillRect(0,0,ctxWidth,ctxHeight);
const game = () => {
    ctx.clearRect(0,0,ctxWidth, ctxHeight);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0,0,ctxWidth,ctxHeight);
    if(start){
        snake.pop();
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
        total++;
        spanResult.textContent = total;
        snake.push({
            posx,
            posy
        });
        ctx.clearRect(apple.posx, apple.posy, size, size);
        apple.posx = randPos();
        apple.posy = randPos();
    } else {
        snake.forEach(el => {
            if(posx == el.posx && posy == el.posy && start){
                alert('Przegrana');
                clearInterval(interval);
                setTimeout(function () {
                    start = false;
                    snake = [];
                    posx = randPos();
                    posy = randPos();
                    xVelocity = 0;
                    yVelocity = 0;
                    total = 1;
                    ctx.clearRect(0,0,ctxWidth, ctxHeight);
                    ctx.fillStyle = bgColor;
                    ctx.fillRect(0,0,ctxWidth,ctxHeight);
                  }, 1000);
                return 0;
            }
        });
    }
    ctx.fillStyle = "#a30000";
    ctx.fillRect(apple.posx, apple.posy, size, size);

    
    snake.unshift({
        posx,
        posy
    });
    snake.forEach((el,idx) => {
        if(idx%2==0)
            ctx.fillStyle = firstColor;
        else
            ctx.fillStyle = secondColor;
        ctx.fillRect(el.posx, el.posy, size, size);
    })
}

let wait = false;
window.addEventListener('keydown', ev => {
    if(!wait){
        if(!start){
            interval = setInterval(game, 1000/fps);
            spanResult.textContent = total;
        } else {
            // console.log(ev.keyCode);
            switch(ev.keyCode){
                case 65:
                case 37: if(xVelocity != 1){xVelocity = -1; yVelocity = 0;} break;
                case 87:
                case 38: if(yVelocity != 1){xVelocity = 0; yVelocity = -1;} break;
                case 68:
                case 39: if(xVelocity != -1){xVelocity = 1; yVelocity = 0;} break;
                case 83:
                case 40: if(yVelocity != -1){xVelocity = 0; yVelocity = 1;} break;
            }
        }
        wait = true;
        setTimeout(function () {
            wait = false;
          }, 1000/fps);
    }
});

const optionsSubmit = document.querySelector('form.options input[type="submit"]');
const bgColorInput = document.querySelector('#bgColor');
const firstColorInput = document.querySelector('#snF');
const secondColorInput = document.querySelector('#snT');
const localStorageInput = document.querySelector('#local');
bgColorInput.value = bgColor;
firstColorInput.value = firstColor; 
secondColorInput.value = firstColor; 
optionsSubmit.addEventListener('click', ev=>{
    ev.preventDefault();
    
    bgColor = bgColorInput.value;
    firstColor = firstColorInput.value;
    if(secondColorInput.value != ""){
        secondColor = secondColorInput.value;
    } else {
        secondColor = firstColor;
    }
    ctx.clearRect(0,0,ctxWidth, ctxHeight);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0,0,ctxWidth,ctxHeight);
    if(localStorageInput.checked){
        localStorage.setItem('bgColor', bgColor);
        localStorage.setItem('firstColor', firstColor);
        localStorage.setItem('secondColor', secondColor);
    }
});