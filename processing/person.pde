class Person implements Comparable<Person> {
    public PImage stand, walk, speak, currentState;
    public float px, py, ex, ey, exspeed, eyspeed;
    public int strand;
    public color pc;
    public long bumpTime, standTime;
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
        exspeed = random(0.5, 4);
        eyspeed = random(0.5, 4);
        ex = random(0, width);
        ey = random(0, height);
        if(random(100) > 50) {
            exspeed = -exspeed;
        }
        if(random(100) > 50) {
            eyspeed = -eyspeed;
        }
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
        currentState = stand;
        ex -= exspeed;
        ey -= eyspeed;
        Date d = new Date();
        long currentTime = d.getTime();
        if((currentTime - bumpTime) < 800) {
            currentState = speak;
        } else if((currentTime/strand%2) == 0) {
            currentState = walk;
        } else if (random(100) > 99) {
            standTime = currentTime;
        }
            
        if ((currentTime - standTime) < 500) {
            ex += exspeed;
            ey += eyspeed;
        }

        noTint();
        tint(pc);
        image(currentState, ex, ey, personSize, personSize);
        if(ex < -personSize) {
            ex = width+personSize;
        } else if(ex > width) {
            ex = -personSize;
        }
        if(ey < -personSize) {
            ey = height+personSize;
        } else if(ey > height) {
            ey = -personSize;
        }

        if((currentTime - startTime) < 3000) {
            return;
        }

        for(Iterator it = people.iterator(); it.hasNext();) {
            Person speaker = (Person)it.next();
            if(bumped(speaker) && lang != speaker.lang) {
                if(!compareRanksOfLanguages(lang, speaker.lang)) {
                    try {
                        semaphore.acquire();
                        updatePropotionList(speaker.lang);
                        semaphore.release();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    pc = speaker.pc;
                    lang = speaker.lang;
                }
                Date date = new Date();
                bumpTime = date.getTime();
            }
        }
    }

    void updatePropotionList(String anotherLang) {
        int propotion1 = langPropotionList.get(lang);
        langPropotionList.put(lang, propotion1-1);

        int propotion2 = langPropotionList.get(anotherLang);
        langPropotionList.put(anotherLang, propotion2+1);
    }

    Boolean bumped(Person speaker) {
        float distance = dist(ex, ey, speaker.ex, speaker.ey);
        if(ex == speaker.ex && ey == speaker.ey) {
            return false;
        } else if(distance < 5) {
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

