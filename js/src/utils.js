import { Person } from "./person.js";
import BigNumber from "bignumber.js";
BigNumber.set({ DECIMAL_PLACES: 10, ROUNDING_MODE: 4 });

/*https://www.vistawide.com/languages/top_30_languages.htm*/
/*unit is million*/
export const langPopulationList = {
    English: 510, //253 20 228
    German: 229, //20 253 52
    Russian: 255, //253 20 135
    Japanese: 127, //20 253 145
    Spanish: 420, //148 253 20
    Arabic: 230, //125 20 253
    Chinese: 1051, //253 20 20
    Hindi: 490, //20 38 253
    Portuguese: 213, //20 135 253
    Bengali: 215, //253 95 20
};

export function pieChart(p5, diameter) {
  let lastAngle = 0;
  for(const lang in p5.langPropotionList) {
      p5.fill(p5.langColorList[lang]);
      const propotion = p5.langPropotionList[lang];
      const fullDeg = new BigNumber(360);
      const bgProp = new BigNumber(propotion);
      const bgTotal = new BigNumber(p5.totalSpeakersPropotion);
      let angle = fullDeg
          .multipliedBy(bgProp)
          .dividedBy(bgTotal)
          .toNumber();
      if(angle < 0) {
          angle = 0;
      }
      p5.noStroke();
      p5.arc(
          p5.windowWidth/2,
          p5.windowHeight/2,
          diameter,
          diameter,
          lastAngle,
          lastAngle + p5.radians(angle)
      );

      p5.push();
      p5.translate(p5.windowWidth/2, p5.windowHeight/2);
      const rad = lastAngle + p5.radians(angle)/2;
      p5.rotate(rad);
      p5.fill(0, 175);
      if(angle > 10) {
          p5.push();
          p5.translate(diameter/3.5, 0);
          p5.rotate(p5.PI);
          p5.textSize(40);
          p5.textAlign(p5.CENTER, p5.CENTER);
          p5.text(lang, 0, 0);
          p5.pop();
      }
      p5.pop();

      lastAngle += p5.radians(angle);
  }
}

export function craeateCanvasOfParentSize(p5, parent) {
    const canvas = p5.createCanvas(parent.clientWidth, parent.clientHeight);
    canvas.parent(parent);
    canvas.position(0, 0);
    return canvas;
}

export function initialize(p5) {
    p5.totalSpeakersPropotion = 0;
    p5.totalLangSpeakers = 0;
    p5.startTime = 0;
    p5.playerLang = "Japanese";
    //TODO 100以下に人数を設定するとバグる
    p5.maxPeople = 400;
    p5.peopleSortList = new Array();
    p5.people = new Array();
    p5.personSize = 100;
    p5.langPropotionList = new Object();
    p5.langColorList = new Object();
    p5.stand = new Object(); 
    p5.walk = new Object();
    p5.speak = new Object();

    //p5.stand = p5.loadImage("assets/human_1.svg");
    //p5.stand.resize(p5.personSize, p5.personSize);
    //p5.walk = p5.loadImage("assets/human_2.svg");
    //p5.walk.resize(p5.personSize, p5.personSize);
    //p5.speak = p5.loadImage("assets/human_3.svg");
    //p5.speak.resize(p5.personSize, p5.personSize);

    for(const lang in langPopulationList) {
        p5.totalLangSpeakers += langPopulationList[lang];
    }

    for(const lang in langPopulationList) {
        const speakers = new BigNumber(langPopulationList[lang]);
        const total = new BigNumber(p5.totalLangSpeakers);
        const maxNum = new BigNumber(p5.maxPeople);
        const speakersNum = speakers
            .dividedBy(total)
            .multipliedBy(maxNum)
            .toNumber();
        p5.langPropotionList[lang] = speakersNum;
        p5.totalSpeakersPropotion += speakersNum;

        p5.langColorList = {
            English: p5.color(253, 20, 228),
            German: p5.color(20, 253, 52),
            Russian: p5.color(253, 20, 135),
            Japanese: p5.color(20, 253, 145),
            Spanish: p5.color(148, 253, 20),
            Arabic: p5.color(125, 20, 253),
            Chinese: p5.color(253, 20, 20),
            Hindi: p5.color(20, 38, 253),
            Portuguese: p5.color(20, 135, 253),
            Bengali: p5.color(253, 95, 20),
        };

        //TODO pixelを上書き
        //stand.loadPixels();
        //for (let y = 0; y < stand.height; y++) {
            //for (let x = 0; x < stand.width; x++) {
                ////if(isWhite(stand, x, y)) {
                    //let red = p5.random(255);
                    //let green = p5.random(255);
                    //let blue = p5.random(255);
                    //let alpha = 255;
                    //writeColor(stand, x, y, red, green, blue, alpha);
                ////}
            //}
        //}
        //stand.updatePixels();
        //stand.copy(stand, 0, 0, stand.width, stand.height, 0, 0, stand.width, stand.height);

        //function writeColor(image, x, y, red, green, blue, alpha) {
            //const index = (x + y * image.width) * 4;
            //image.pixels[index] = red;
            //image.pixels[index + 1] = green;
            //image.pixels[index + 2] = blue;
            //image.pixels[index + 3] = alpha;
        //}

        //function isWhite(image, x, y) {
            //const index = (x + y * image.width) * 4;
            //return image.pixels[index] == 255 &&
                //image.pixels[index + 1] == 255 &&
                //image.pixels[index + 2] == 255;
        //}

        const stand = p5.loadImage("assets/" + lang + "_1.png");
        stand.resize(p5.personSize, p5.personSize);
        p5.stand[lang] = stand;
        const walk = p5.loadImage("assets/" + lang + "_2.png");
        walk.resize(p5.personSize, p5.personSize);
        p5.walk[lang] = walk;
        const speak = p5.loadImage("assets/" + lang + "_3.png");
        speak.resize(p5.personSize, p5.personSize);
        p5.speak[lang] = speak;

        p5.person = new Person(p5, true, p5.playerLang);
        if(speakersNum > 1) {
            for(let i = 0; i < speakersNum; i++) {
                const langSpeaker = new Person(p5, false, lang);
                p5.people.push(langSpeaker);
            }
        }
    }
    p5.startTime = Date.now();
}

