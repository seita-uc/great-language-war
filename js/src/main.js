import 'babel-polyfill'
import { 
    initialize,
    pieChart,
    compareRanksOfLanguages,
} from './utils.js';

let canvasWidth;
let canvasHeight;
let canvas;

//let person;
//let maxPeople = 500;
//let totalLangSpeakers;
//let totalSpeakersPropotion;
//let peopleSortList = new Array();
//let people = new Array();
//let personSize = 80;
//let startTime;

const sketch = function(p5) {
    p5.setup = async function() {
        const body = document.body;
        canvas = craeateCanvasOfParentSize(p5, body);
        canvasWidth = body.clientWidth;
        canvasHeight = body.clientHeight;
        initialize(p5);
    }

    p5.draw = async function() {
    }

    p5.windowResized = function() {
        const body = document.body;
        canvasWidth = body.clientWidth;
        canvasHeight = body.clientHeight;
        p5.resizeCanvas(canvasWidth, canvasHeight);
    }

    p5.mousePressed = function() {
    }

    p5.mouseWheel = function(event) {
    }
}

function craeateCanvasOfParentSize(p5, parent) {
    canvas = p5.createCanvas(parent.clientWidth, parent.clientHeight);
    canvas.parent(parent);
    canvas.position(0, 0);
    return canvas;
}

new p5(sketch);
