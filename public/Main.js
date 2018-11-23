class AppControl{
    constructor(fps, crates, size){
        this.fps = fps;
        this.wait = false;
        this.bgColor = localStorage.getItem('bgColor') || "#F1C26D"
        this.firstColor = localStorage.getItem('firstColor') || "#517AAC";
        this.secondColor  = localStorage.getItem('secondColor') || "#142F50";
        this.appleColor = localStorage.getItem('appleColor') || "#a30000";

        this.game = new Game(crates, size, fps, document.querySelector('span'), this.bgColor, this.firstColor, this.secondColor, this.appleColor);
        this.game.drawBackground();

        this.btnOptions = document.querySelector('i.options');
        this.btnOptionsClose = document.querySelector('section.options i');
        this.optionsModal = document.querySelector('section.options');
        this.optionsSubmit = document.querySelector('section.options input[type="submit"]');
        this.loseSubmit = document.querySelector('section.lose input[type="submit"]');
        this.inputBgColor = document.querySelector('#bgColor');
        this.inputFirstColor = document.querySelector('#snF');
        this.inputSecondColor = document.querySelector('#snT');
        this.inputAppleColor = document.querySelector('#apple');
        this.inputLocalStorage = document.querySelector('#local');

        this.inputBgColor.value = this.bgColor;
        this.inputFirstColor.value = this.firstColor;
        this.inputSecondColor.value = this.secondColor;
        this.inputAppleColor.value = this.appleColor;
        
        this.optionsSubmit.addEventListener('click', (ev)=>{
            ev.preventDefault();
            this.bgColor = this.inputBgColor.value;
            this.firstColor = this.inputFirstColor.value;
            this.secondColor = this.inputSecondColor.value;
            this.appleColor = this.inputAppleColor.value;
            this.game.setColors(this.bgColor, this.firstColor, this.secondColor, this.appleColor);
            this.game.reset();
            if(this.inputLocalStorage.checked){
                localStorage.setItem('bgColor', this.bgColor);
                localStorage.setItem('firstColor', this.firstColor);
                localStorage.setItem('secondColor', this.secondColor);
                localStorage.setItem('appleColor', this.appleColor);
            }
        });
        this.btnOptions.addEventListener('click', ()=>{this.optionsModal.classList.add('active')});
        this.btnOptionsClose.addEventListener('click', ()=>{this.optionsModal.classList.remove('active')})
        window.addEventListener('keydown', this.gameListener.bind(this));
    }
    gameListener(ev){
        if(!this.game.started){
            this.game.started = true;
            this.game.start();
        } else {
            if(!this.wait){
                this.game.player.changeDirection(ev.keyCode);
                this.wait = true;
                setTimeout(()=>{
                    this.wait = false;
                }, 1000/this.fps);
            }
        }
    }
}