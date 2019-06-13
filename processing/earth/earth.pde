import gifAnimation.*;

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
