Player player;
PShape earth;
void setup() {
    size(800, 800, P3D);
    player = new Player();
    earth = loadShape("globe/Globe.obj");
}

void draw() {
    background(0);
    translate(width/2, height/2, 500);
    shape(earth);
    player.fight();
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
        ellipse(mouseX, y, 20, 20);
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
