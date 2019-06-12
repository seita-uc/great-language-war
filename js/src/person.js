export class Person {
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
        this.currentTime = d.now();
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

        if((currentTime - p5.startTime) < 2000) {
            return;
        }

        for(const speaker in people) {
            if(this.bumped(speaker) && this.lang !== speaker.lang) {
                if(!compareRanksOfLanguages(this.lang, speaker.lang)) {
                    //const propotion1 = p5.langPropotionList[this.lang];
                    //p5.langPropotionList[lang] = propotion1-1;

                    //const propotion2 = langPropotionList[speaker.lang];
                    //langPropotionList[speaker.lang] = propotion2+1;
                    //this.pc = speaker.pc;
                    //this.lang = speaker.lang;
                    this.updatePropotionList(speaker.lang);
                } else {
                    const propotion1 = p5.langPropotionList[this.lang];
                    p5.langPropotionList[lang] = propotion1+1;

                    const propotion2 = langPropotionList[speaker.lang];
                    langPropotionList[speaker.lang] = propotion2-1;
                    speaker.pc = this.pc;
                    speaker.lang = this.lang;
                }
                const date = new Date();
                this.bumpTime = date.now();
            }
        }
    }

    move() {
        const p5 = this.p5;
        this.currentState = stand;
        this.ex -= this.exspeed;
        this.ey -= this.eyspeed;
        const d = new Date();
        const currentTime = d.now();
        if((currentTime - this.bumpTime) < 800) {
            this.currentState = this.speak;
        } else if((currentTime/this.strand%2) == 0) {
            this.currentState = this.walk;
        } else if (p5.random(100) > 99) {
            this.standTime = currentTime;
        }
            
        if ((currentTime - this.standTime) < 500) {
            this.ex += this.exspeed;
            this.ey += this.eyspeed;
        }

        p5.tint(this.pc);
        p5.image(
            this.currentState,
            this.ex,
            this.ey,
            p5.personSize,
            p5.personSize
        );

        if(this.ex < -p5.personSize) {
            this.ex = p5.windowWidth + p5.personSize;
        } else if(this.ex > p5.windowWidth) {
            this.ex = -p5.personSize;
        }
        if(this.ey < -p5.personSize) {
            this.ey = p5.windowHeight + p5.personSize;
        } else if(this.ey > p5.windowHeight) {
            this.ey = -p5.personSize;
        }

        if((currentTime - p5.startTime) < 3000) {
            return;
        }

        for(const speaker in people) {
            if(this.bumped(speaker) && this.lang != speaker.lang) {
                if(!compareRanksOfLanguages(lang, speaker.lang)) {
                    this.updatePropotionList(speaker.lang);
                    this.pc = speaker.pc;
                    this.lang = speaker.lang;
                }
                const date = new Date();
                this.bumpTime = date.now();
            }
        }
    }

    updatePropotionList(anotherLang) {
        const p5 = this.p5;
        const propotion1 = p5.langPropotionList[this.lang];
        p5.langPropotionList[lang] = propotion1-1;
        const propotion2 = langPropotionList[speaker.lang];
        langPropotionList[speaker.lang] = propotion2+1;
    }

    bumped(speaker) {
        const p5 = this.p5;
        const distance = p5.dist(
            this.ex,
            this.ey,
            speaker.ex,
            speaker.ey
        );
        if(this.ex == speaker.ex && this.ey == speaker.ey) {
            return false;
        } else if(distance < 5) {
            return true;
        }
        return false;
    }
}

