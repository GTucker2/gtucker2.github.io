function startGame() {
    gameArea.start();
}

const TOTAL_POINTS = 24;
const BAR_WIDTH = 20;
const STYLE = {
    POINTS_COLOR_A : "brown",
    POINTS_COLOR_B : "red"
}
const STYLE_FROG = {
    POINTS_COLOR_A : "green",
    POINTS_COLOR_B : "yellow"
}

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        this.drawGameArea();
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    drawGameArea : function() {
        const POINTS_WIDTH = (this.canvas.width - BAR_WIDTH) / (TOTAL_POINTS / 2);
        const POINTS_HEIGHT = this.canvas.height / 2;
        const CHECKER_RADIUS = POINTS_HEIGHT/10;
        for(let i = 0; i < TOTAL_POINTS/2; i++) {
            var x = i * POINTS_WIDTH;
            if(i >= TOTAL_POINTS/4) {
                x += BAR_WIDTH;
            }
            if(i % 2 == 0) {
                this.drawPoint(POINTS_WIDTH, POINTS_HEIGHT, x, 0, STYLE.POINTS_COLOR_A);
                this.drawPoint(POINTS_WIDTH, -POINTS_HEIGHT, x, this.canvas.height, STYLE.POINTS_COLOR_B)
                this.drawChecker(CHECKER_RADIUS, x + POINTS_WIDTH/2, POINTS_HEIGHT/9, "black");
                this.drawChecker(CHECKER_RADIUS, x + POINTS_WIDTH/2, (POINTS_HEIGHT*2) - (POINTS_HEIGHT/9), "black");
            } else {
                this.drawPoint(POINTS_WIDTH, POINTS_HEIGHT, x, 0, STYLE.POINTS_COLOR_B);
                this.drawPoint(POINTS_WIDTH, -POINTS_HEIGHT, x, this.canvas.height, STYLE.POINTS_COLOR_A)
            }
            this.drawChecker(CHECKER_RADIUS, x + POINTS_WIDTH/2, POINTS_HEIGHT/9, "black");
            this.drawChecker(CHECKER_RADIUS, x + POINTS_WIDTH/2, (POINTS_HEIGHT*2) - (POINTS_HEIGHT/9), "black");  
        }
    },
    drawPoint : function(width, height, x, y, color) {
        ctx = gameArea.context; 
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x+width,y);
        ctx.lineTo(x+(width/2),y+height);
        ctx.closePath();    
        ctx.fillStyle = color;
        ctx.fill();
    },
    drawChecker : function(radius, x, y, color) {
        ctx = gameArea.context; 
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}