const TOTAL_POINTS = 24;
const BAR_WIDTH = 20;
const CANVAS_HEIGHT = 270;
const CANVAS_WIDTH = 480;
const POINTS_WIDTH = (CANVAS_WIDTH - BAR_WIDTH) / (TOTAL_POINTS / 2);
const POINTS_HEIGHT = CANVAS_HEIGHT / 2;
const CHECKER_RADIUS = POINTS_HEIGHT/10;
const STYLE = {
    POINTS_COLOR_A : "brown",
    POINTS_COLOR_B : "red",
    CHECKER_COLOR_A : "black",
    CHECKER_COLOR_B : "white"
}

const INITIAL_WEIGHTING = [2,0,0,0,0,5,
                           0,3,0,0,0,5,
                           5,0,0,0,3,0,
                           5,0,0,0,0,2,
];

const INITIAL_POINTS_STATE = [1,0,0,0,0,2,
                              0,2,0,0,0,1,
                              2,0,0,0,1,0,
                              1,0,0,0,0,2,
];

var points = [];

function startGame() {
    initGame();
    gameArea.start();
}

function initGame() {
    for(let i=1; i <= TOTAL_POINTS; i++) {
        weight = INITIAL_WEIGHTING[i];
        state = INITIAL_POINTS_STATE[i];
        points.push(new Point(i, weight, state)); 
    }
}

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        this.context = this.canvas.getContext("2d");
        this.update();
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    update : function() {
        this.clear();
        points.forEach(point => {
            point.draw();
            for(let i=0; i<point.weight; i++) {

            }
        });
    }
}

function Point(index, weight, state) {
    _offset = (index <= TOTAL_POINTS/4) || (index > 18 ) ? BAR_WIDTH : 0;
    _x_white = (((12)-(index)) * POINTS_WIDTH) + _offset;
    _x_black = ((index - 13) * POINTS_WIDTH) + _offset;
    this.color = index % 2 == 0 ? STYLE.POINTS_COLOR_A : STYLE.POINTS_COLOR_B;
    this.x = index <= TOTAL_POINTS/2 ? _x_white : _x_black;
    this.y = index <= TOTAL_POINTS/2 ? CANVAS_HEIGHT : 0;
    this.height = (index <= TOTAL_POINTS/2) ? -POINTS_HEIGHT : POINTS_HEIGHT;
    this.width = POINTS_WIDTH;
    this.index = index;
    this.weight = weight;
    this.state = state; 
    this.draw = function() {
        ctx = gameArea.context; 
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.lineTo(this.x + (this.width/2), this.y + this.height);
        ctx.closePath();    
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

class Checker extends Component {
    constructor(index, color) {
        this.width = CHECKER_RADIUS * 2;
        this.height = CHECKER_RADIUS * 2; 
        this.color = color;
        this.index = this.setIndex(index);
        this.draw = function() {
            ctx = gameArea.context;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(x, y, CHECKER_RADIUS, 0, 2 * Math.PI, false);
            ctx.fill();
        }
    }
    getIndex() { return this.index; }
    setIndex(index) {
        widthOffset = 0;
        heightOffset = 0;
        const POSITION_OFFSET = POINTS_HEIGHT/9;
        if (1 <= index <= TOTAL_POINTS/4)
            widthOffset = BAR_WIDTH;
        if (TOTAL_POINTS - ((TOTAL_POINTS/4)-1) <= index <= TOTAL_POINTS)
            widthOffset = BAR_WIDTH;
        if (index > TOTAL_POINTS/2)
            heightOffset = POINTS_HEIGHT*2;
        this.setX((index * POINTS_WIDTH) + widthOffset);
        this.setY(heightOffset - POSITION_OFFSET); 
        this.index = index;
    }
}

function drawChecker(radius, x, y, color) {
    ctx = gameArea.context;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fill();
}