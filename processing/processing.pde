import java.util.*; 
Player player;
int playerSize = 150;
void setup() {
    size(800, 800, FX2D);
    player = new Player();
    imageMode(CENTER);
}
           
void draw() {
    background(255);
    player.show();
}

void mouseMoved() {
}
void mousePressed() {
    player.currentState = player.speak;
}

/*void setUpField() {*/
    /*image(earthBackground, 0, 0);*/
    /*for(int i = 0; i < width/blockWidth; i++) {*/
        /*image(block, i*blockWidth, height-blockHeight);*/
    /*}*/
/*}*/

class Player {
    public PImage stand, walk, speak, currentState;
    public float px, py;
    public Player() {
        stand = loadImage("assets/human_1.png");
        stand.resize(playerSize, playerSize);
        walk = loadImage("assets/human_2.png");
        walk.resize(playerSize, playerSize);
        speak = loadImage("assets/human_3.png");
        speak.resize(playerSize, playerSize);
        currentState = stand;
        px = mouseX;
        py = mouseY;
    }

    public void show() {
        currentState = stand;
        if (mousePressed) {
            currentState = speak;
        } else if(px != mouseX || py != mouseY) {
            Date d = new Date();
            if((d.getTime()/300 % 2) == 0) {
                currentState = walk;
            }
        }
        /*tint(0, 153, 204);*/
        image(currentState, mouseX, mouseY);
        px = mouseX;
        py = mouseY;
    }
}
