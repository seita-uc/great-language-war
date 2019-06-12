class Person implements Comparable<Person> {
    public PImage stand, walk, speak, currentState;
    public float px, py, ex, ey, exspeed, eyspeed;
    public int strand;
    public color pc;
    public long bumpTime;
    public Boolean isShot;
    public String lang;

    public Person(Boolean isPlayer, String language) {
        px = mouseX;
        py = mouseY;
        pc = color(255, 255, 255);
        lang = language;
        stand = loadImage("assets/human_1.png");
        stand.resize(personSize, personSize);
        walk = loadImage("assets/human_2.png");
        walk.resize(personSize, personSize);
        speak = loadImage("assets/human_3.png");
        speak.resize(personSize, personSize);
        currentState = stand;

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
        Date d = new Date();
        long currentTime = d.getTime();
        if (keyPressed || (currentTime - bumpTime) < 500) {
            currentState = speak;
        } else if(px != mouseX || py != mouseY) {
            if((currentTime/300%2) == 0) {
                currentState = walk;
            }
        }
        tint(pc);
        image(currentState, mouseX, mouseY);
        px = mouseX;
        py = mouseY;
        ex = mouseX;
        ey = mouseY;

        if((currentTime - startTime) < 2000) {
            return;
        }

        for(Iterator it = people.iterator(); it.hasNext();) {
            Person speaker = (Person)it.next();
            if(bumped(speaker) && lang != speaker.lang) {
                if(!compareRanksOfLanguages(lang, speaker.lang)) {
                    int propotion1 = langPropotionList.get(lang);
                    langPropotionList.put(lang, propotion1-1);

                    int propotion2 = langPropotionList.get(speaker.lang);
                    langPropotionList.put(speaker.lang, propotion2+1);
                    pc = speaker.pc;
                    lang = speaker.lang;
                } else {
                    int propotion1 = langPropotionList.get(lang);
                    langPropotionList.put(lang, propotion1+1);

                    int propotion2 = langPropotionList.get(speaker.lang);
                    langPropotionList.put(speaker.lang, propotion2-1);
                    speaker.pc = pc;
                    speaker.lang = lang;
                }
                Date date = new Date();
                bumpTime = date.getTime();
            }
        }
    }

    public void move() {
        if(isShot) {
            /*explode();*/
        } else {
            ex -= exspeed;
            ey -= eyspeed;
            currentState = stand;
            Date d = new Date();
            long currentTime = d.getTime();
            if((currentTime - bumpTime) < 800) {
                currentState = speak;
            } else if((currentTime/strand%2) == 0) {
                currentState = walk;
            }

            noTint();
            tint(pc);
            image(currentState, ex, ey, personSize, personSize);
            if(ex < -personSize) {
                ex = width+personSize;
            }
            if(ey < -personSize) {
                ey = height+personSize;
            }

            if((currentTime - startTime) < 1000) {
                return;
            }

            for(Iterator it = people.iterator(); it.hasNext();) {
                Person speaker = (Person)it.next();
                if(bumped(speaker) && lang != speaker.lang) {
                    if(!compareRanksOfLanguages(lang, speaker.lang)) {
                        int propotion1 = langPropotionList.get(lang);
                        langPropotionList.put(lang, propotion1-1);

                        int propotion2 = langPropotionList.get(speaker.lang);
                        langPropotionList.put(speaker.lang, propotion2+1);
                        pc = speaker.pc;
                        lang = speaker.lang;
                    }
                    Date date = new Date();
                    bumpTime = date.getTime();
                }
            }
        }
    }

    Boolean bumped(Person speaker) {
            float distance = dist(ex, ey, speaker.ex, speaker.ey);
            if(ex == speaker.ex && ey == speaker.ey) {
                return false;
            } else if(distance < 10) {
                return true;
            }
            return false;
    }

    int compareTo(Person p)
    {
        if(p.ey < this.ey) return 1;
        else if(p.ey > this.ey) return -1;
        else return 0;
    }
}

