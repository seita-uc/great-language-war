class Person implements Comparable<Person> {
    public PImage stand, walk, speak, currentState;
    public float px, py, ex, ey, exspeed, eyspeed;
    public int strand;
    public color pc;
    public long shotTime;
    public Boolean isShot;
    public String lang;

    public Person(Boolean isPlayer, String language) {
        stand = loadImage("assets/human_1.png");
        stand.resize(personSize, personSize);
        walk = loadImage("assets/human_2.png");
        walk.resize(personSize, personSize);
        speak = loadImage("assets/human_3.png");
        speak.resize(personSize, personSize);
        currentState = stand;
        px = mouseX;
        py = mouseY;
        pc = color(255, 255, 255);
        lang = language;

        if(!isPlayer) {
            initialize();
        }
    }

    public void initialize() {
        ex = random(0, width);
        ey = random(0, height);
        exspeed = random(1, 5);
        eyspeed = random(1, 5);
        isShot = false;
        strand = int(random(200, 400));
        pc = langColorList.get(lang);
    }

    public void show() {
        currentState = stand;
        if (keyPressed) {
            currentState = speak;
        } else if(px != mouseX || py != mouseY) {
            Date d = new Date();
            if((d.getTime()/300%2) == 0) {
                currentState = walk;
            }
        }
        tint(pc);
        image(currentState, mouseX, mouseY);
        px = mouseX;
        py = mouseY;
    }

    public void move() {
        if(isShot) {
            explode();
        } else {
            ex -= exspeed;
            ey -= eyspeed;
            currentState = stand;
            Date d = new Date();
            if((d.getTime()/strand%2) == 0) {
                currentState = walk;
            }
            tint(pc);
            image(currentState, ex, ey, personSize, personSize);
            if(ex < -personSize) {
                ex = width+personSize;
            }
            if(ey < -personSize) {
                ey = height+personSize;
            }
            for(Iterator it = people.iterator(); it.hasNext();) {
                Person speaker = (Person)it.next();
                float distance = dist(ex, ey, speaker.ex, speaker.ey);
                if(ex == speaker.ex && ey == speaker.ey) {
                    return;
                }
                if(distance < 5) {
                    if(!compareRanksOfLanguages(lang, speaker.lang)) {
                        pc = speaker.pc;
                    }
                }
            }
        }
    }

    public void fire(Person enemy) {
        enemy.getShot();
    }

    public void explode() {
        Date d = new Date();
        long timePassed = d.getTime() - shotTime;

        if(timePassed > 1000) {
            initialize();
        }

        if(timePassed > 0 && timePassed < 500) {
            float weight = 500/timePassed;
            strokeWeight(weight);
            stroke(255,255,0);
            line(mouseX, mouseY, ex, ey);
            noStroke();
            showParticle(mouseX, mouseY, ex, ey, int(100*timePassed/500));
        }

        noStroke();
        fill(178, 34, 34);
        float explosionSize = timePassed/30+70;
        ellipse(ex, ey, explosionSize, explosionSize);
        fill(255, 140, 0);
        float explosionCoreSize = timePassed/30;
        ellipse(ex, ey, explosionCoreSize, explosionCoreSize);
    }

    public void getShot() {
        Date d = new Date();
        isShot = true;
        shotTime = d.getTime();
    }

    int compareTo(Person p)
    {
        if(p.ey < this.ey) return 1;
        else if(p.ey > this.ey) return -1;
        else return 0;
    }
}

