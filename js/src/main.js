import 'babel-polyfill'
import { 
    initialize,
    pieChart,
    craeateCanvasOfParentSize,
} from './utils.js';

let canvasWidth;
let canvasHeight;
let canvas;
const sketch = function(p5) {
    p5.setup = async function() {
        p5.frameRate(30);
        const body = document.body;
        canvas = craeateCanvasOfParentSize(p5, body);
        canvasWidth = body.clientWidth;
        canvasHeight = body.clientHeight;
        p5.windowWidth = canvasWidth;
        p5.windowHeight = canvasHeight;
        initialize(p5);
    }

    p5.draw = async function() {
        p5.background(255);
        pieChart(p5, canvasHeight-50);
        p5.people.sort(function(a, b) {
            return a.ey - b.ey;
        });
        for(let i = 0; i < p5.people.length; i++) {
            p5.people[i].move();
        }
        p5.person.show();
    }

    p5.windowResized = function() {
        const body = document.body;
        canvasWidth = body.clientWidth;
        canvasHeight = body.clientHeight;
        p5.windowWidth = canvasWidth;
        p5.windowHeight = canvasHeight;
        p5.resizeCanvas(canvasWidth, canvasHeight);
    }

    p5.mousePressed = function() {
    }

    p5.mouseWheel = function(event) {
    }
}

new p5(sketch);
