class Person {
    constructor(p5, isPlayer, language) {
        this.p5 = p5;
        this.px = p5.mouseX;
        this.py = p5.mouseY;
        this.pc = p5.color(255, 255, 255);
        this.lang = language;

        //TODO object assignで値渡しする
        this.stand = p5.loadImage("assets/human_1.png");
        this.stand.resize(personSize, personSize);
        this.walk = p5.loadImage("assets/human_2.png");
        this.walk.resize(personSize, personSize);
        this.speak = p5.loadImage("assets/human_3.png");
        this.speak.resize(personSize, personSize);
        this.currentState = stand;

        //this.stand;
        //this.walk;
        //this.speak;
        //this.currentState;
        //this.px;
        //this.py;
        //this.ex;
        //this.ey;
        //this.exspeed;
        //this.eyspeed;
        //this.strand;
        //this.pc;
        //this.bumpTime;
        //this.standTime;
        //this.lang;

        if(!isPlayer) {
            this.initialize();
        }
    }

    initialize() {
        const p5 = this.p5;
        this.exspeed = p5.random(0.5, 4);
        this.eyspeed = p5.random(0.5, 4);
        this.ex = p5.random(0, width);
        this.ey = p5.random(0, height);
        if(p5.random(100) > 50) {
            this.exspeed = -this.exspeed;
        }
        if(p5.random(100) > 50) {
            this.eyspeed = -this.eyspeed;
        }
        this.strand = p5.random(200, 400);
        this.pc = langColorList.get(lang);
    }

    show() {
        const p5 = this.p5;
        this.currentState = this.stand;
        const d = new Date();
        this.currentTime = d.getTime();
        if (p5.keyPressed || (currentTime - this.bumpTime) < 500) {
            this.currentState = this.speak;
        } else if(this.px != p5.mouseX || this.py != p5.mouseY) {
            if((this.currentTime/300%2) == 0) {
                this.currentState = this.walk;
            }
        }
        p5.tint(this.pc);
        p5.image(this.currentState, this.mouseX, this.mouseY);
        this.px = this.mouseX;
        this.py = this.mouseY;
        this.ex = this.mouseX;
        this.ey = this.mouseY;

        if((currentTime - this.startTime) < 2000) {
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

