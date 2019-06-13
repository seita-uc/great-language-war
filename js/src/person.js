export class Person {
    constructor(p5, isPlayer, language) {
        this.p5 = p5;
        this.px = p5.mouseX;
        this.py = p5.mouseY;
        this.lang = language;

        this.stand = Object.assign({}, p5.stand[language]); 
        this.walk = Object.assign({}, p5.walk[language]);
        this.speak = Object.assign({}, p5.speak[language]);
        this.currentState = this.stand;

        if(!isPlayer) {
            this.initialize();
        }
    }

    initialize() {
        const p5 = this.p5;
        this.exspeed = p5.random(0.5, 4);
        this.eyspeed = p5.random(0.5, 4);
        this.ex = p5.random(0, p5.windowWidth);
        this.ey = p5.random(0, p5.windowHeight);
        if(p5.random(100) > 50) {
            this.exspeed = -this.exspeed;
        }
        if(p5.random(100) > 50) {
            this.eyspeed = -this.eyspeed;
        }
        this.strand = p5.random(200, 400);
    }

    show() {
        const p5 = this.p5;
        this.currentState = this.stand;
        const currentTime = Date.now();
        if (p5.keyIsPressed || (currentTime - this.bumpTime) < 500) {
            this.currentState = this.speak;
        } else if(this.px != p5.mouseX || this.py != p5.mouseY) {
            if(Math.floor(currentTime/300%2) == 0) {
                this.currentState = this.walk;
            }
        }
        p5.image(this.currentState,
            p5.mouseX,
            p5.mouseY,
            p5.personSize,
            p5.personSize,
        );
        this.px = p5.mouseX;
        this.py = p5.mouseY;
        this.ex = p5.mouseX;
        this.ey = p5.mouseY;

        if((currentTime - p5.startTime) < 2000) {
            return;
        }

        for(let i = 0; i < p5.people.length; i++) {
            const speaker = p5.people[i];
            if(this.bumped(speaker) && this.lang !== speaker.lang) {
                if(!this.compareRanksOfLanguages(this.lang, speaker.lang)) {
                    this.updatePropotionList(speaker.lang);
                    this.updateImages(speaker.lang);
                    this.lang = speaker.lang;
                } else {
                    const propotion1 = p5.langPropotionList[this.lang];
                    p5.langPropotionList[this.lang] = propotion1+1;

                    const propotion2 = p5.langPropotionList[speaker.lang];
                    p5.langPropotionList[speaker.lang] = propotion2-1;
                    speaker.updateImages(this.lang);
                    speaker.lang = this.lang;
                }
                this.bumpTime = Date.now();
            }
        }
    }

    move() {
        const p5 = this.p5;
        this.currentState = this.stand;
        this.ex -= this.exspeed;
        this.ey -= this.eyspeed;
        const currentTime = Date.now();
        if((currentTime - this.bumpTime) < 800) {
            this.currentState = this.speak;
        } else if(Math.floor(currentTime/this.strand%2) == 0) {
            this.currentState = this.walk;
        } else if (p5.random(100) > 99) {
            this.standTime = currentTime;
        }
            
        if ((currentTime - this.standTime) < 500) {
            this.ex += this.exspeed;
            this.ey += this.eyspeed;
        }

        p5.image(
            this.currentState,
            this.ex,
            this.ey,
            p5.personSize,
            p5.personSize
        );

        if(this.ex < -p5.personSize) {
            this.ex = p5.windowWidth + p5.personSize;
        } else if(this.ex > p5.windowWidth + p5.personSize) {
            this.ex = -p5.personSize;
        }
        if(this.ey < -p5.personSize) {
            this.ey = p5.windowHeight + p5.personSize;
        } else if(this.ey > p5.windowHeight + p5.personSize) {
            this.ey = -p5.personSize;
        }

        if((currentTime - p5.startTime) < 3000) {
            return;
        }

        for(let i = 0; i < p5.people.length; i++) {
            const speaker = p5.people[i];
            if(this.bumped(speaker) && this.lang != speaker.lang) {
                if(!this.compareRanksOfLanguages(this.lang, speaker.lang)) {
                    this.updatePropotionList(speaker.lang);
                    this.updateImages(speaker.lang);
                    this.lang = speaker.lang;
                }
                this.bumpTime = Date.now();
            }
        }
    }

    updatePropotionList(anotherLang) {
        const p5 = this.p5;
        const propotion1 = p5.langPropotionList[this.lang];
        p5.langPropotionList[this.lang] = propotion1-1;
        const propotion2 = p5.langPropotionList[anotherLang];
        p5.langPropotionList[anotherLang] = propotion2+1;
    }

    updateImages(anotherLang) {
        const p5 = this.p5;
        this.stand = Object.assign({}, p5.stand[anotherLang]);
        this.walk = Object.assign({}, p5.walk[anotherLang]);
        this.speak = Object.assign({}, p5.speak[anotherLang]);
        this.currentState = this.stand;
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
        } else if(distance < 10) {
            return true;
        }
        return false;
    }

    compareRanksOfLanguages(lang1, lang2) {
        const p5 = this.p5;
        let sortable = [];
        for(let lang in p5.langPropotionList) {
            sortable.push([ lang, p5.langPropotionList[lang] ]);
        }
        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });

        let rank1 = 0;
        let rank2 = 0;
        for(let i = 0; i < sortable.length; i++) {
            const language = sortable[i][0];
            if(language == lang1) {
                rank1 = sortable[i][1];
            } else if(language == lang2) {
                rank2 = sortable[i][1];
            }
        }
        return rank1 > rank2;
    }

}

