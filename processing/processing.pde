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
    background(255);
    setUpField();
    Player player = new Player();
    player.show();
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
    PImage player;
    public Player() {
        player = loadImage("assets/Sprites/cyberpunk-detective/PNG/sprites/walk/Layer-2.png");
        player.resize(50, 0);
    }

    public void show() {
        image(player, mouseX, height-blockHeight-500);
    }
}