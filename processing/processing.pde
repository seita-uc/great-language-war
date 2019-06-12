import gifAnimation.*;
Player player;
Gif earthBackground;
PImage block;
int blockWidth, blockHeight;
void setup() {
    size(800, 800, FX2D);
    player = new Player();
    earthBackground = new Gif(this, "images/earth.gif");
    earthBackground.play();

    block = loadImage("images/block.png");
    blockWidth = 100;
    blockHeight = 100;
    block.resize(blockWidth, blockHeight);
}
           
void draw() {
    setUpField();
}

void mousePressed() {
}

void setUpField() {
    image(earthBackground, 0, 0);
    for(int i = 0; i < width/blockWidth; i++) {
        image(block, i*blockWidth, height-blockHeight);
    }
}

class Player {
    float y, r; 
    color c;
    public Player() {
        y = 700;
        c = color(random(0, 255), random(0, 255), random(0, 255));
    }

    public void fight() {
        noStroke();
        fill(c);
        /*ellipse(mouseX, y, 20, 20);*/
        ellipse(width/2, height/2, 20, 20);
        if(r > 40) {
            r = 0;
        }
        ellipse(mouseX, y, r, r);
        r++;
    }

    /*public void fire(Alien alien) {*/
    /*alien.getShot();*/
    /*}*/
}
