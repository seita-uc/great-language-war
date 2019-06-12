import gifAnimation.*;

Player player;
PShape earth;
PImage earthBackground;
GifMaker gifExport;
float a;
void setup() {
    size(800, 800, P3D);
    gifExport = new GifMaker(this, "images/export1.gif");
    gifExport.setRepeat(0);
    player = new Player();
    earth = loadShape("globe/Globe.obj");
    earth.scale(45);
}

void draw() {
    background(0);
    a += 3;
    lights();

    pushMatrix();
    translate(width/2, height/2, 0);
    rotateY(radians(-90));
    rotateX(radians(-90));
    rotateY(radians(-a));
    shape(earth);

    /*stroke(255, 0, 0);*/
    /*line(-4000, 0, 0, 4000, 0, 0);*/
    /*stroke(0, 255, 0);*/
    /*line(0, -4000, 0, 0, 4000, 0);*/
    /*stroke(0, 0, 255);*/
    /*line(0, 0, -4000, 0, 0, 4000);*/
    popMatrix();

    /*player.fight();*/
    gifExport.addFrame();
    if(a == 360) {
        gifExport.finish();
    }
}

void mousePressed() {
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
