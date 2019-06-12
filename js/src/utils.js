import BigNumber from "bignumber.js";
BigNumber.set({ DECIMAL_PLACES: 10, ROUNDING_MODE: 4 });

/*https://www.vistawide.com/languages/top_30_languages.htm*/
/*unit is million*/
export const langPopulationList = {
    English: 510,
    German: 229,
    Russian: 255,
    Japanese: 127,
    Spanish: 420,
    Arabic: 230,
    Chinese: 1051,
    Hindi: 490,
    Portuguese: 213,
    Bengali: 215,
};

export function pieChart(p5, diameter) {
  let lastAngle = 0;
  for(const lang in langPropotionList) {
      p5.fill(langColorList.get(lang));
      const propotion = langPropotionList[lang];
      const fullDeg = new BigNumber(360);
      const bgProp = new BigNumber(propotion);
      const bgTotal = new BigNumber(totalSpeakersPropotion);
      const angle = fullDeg
          .multipliedBy(bgProp)
          .dividedBy(bgTotal);
      p5.noStroke();
      p5.arc(p5.windowWidth/2, p5.windowHeight/2, diameter, diameter, lastAngle, lastAngle+p5.radians(angle));
      p5.push();
      p5.translate(p5.windowWidth/2, p5.windowHeight/2);
      const rad = lastAngle + p5.radians(angle);
      p5.rotate(rad);
      p5.fill(0);
      if(angle > 10) {
          p5.textSize(angle/4);
          p5.textAlign(p5.LEFT);
          p5.text(lang, 0, 0);
      }
      p5.pop();
      lastAngle += p5.radians(angle);
  }
}

export function compareRanksOfLanguages(p5, lang1, lang2) {
    let sortable = [];
    for(let lang in langPropotionList) {
        sortable.push([ lang, langPropotionList[lang] ]);
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

export function initialize(p5) {
    p5.totalSpeakersPropotion = 0;
    p5.startTime = 0;
    p5.maxPeople = 500;
    p5.peopleSortList = new Array();
    p5.people = new Array();
    p5.personSize = 80;
    p5.langPropotionList = new Object();
    p5.langColorList = new Object();

    for(const lang in langPopulationList) {
        p5.totalLangSpeakers += langPopulationList[lang];
    }
    p5.person = new Person(p5, true, "Japanese");

    for(const lang in langPopulationList) {
        const speakers = new BigNumber(langPopulationList[lang]);
        const total = new BigNumber(p5.totalLangSpeakers);
        const maxNum = new BigNumber(p5.maxPeople);
        const propotion = new BigNumber()
            .dividedBy(total)
            .multipliedBy(maxNum)
        p5.langPropotionList[lang] = propotion;
        p5.totalSpeakersPropotion += propotion;

        const langColor = p5.color(p5.random(255), p5.random(255), p5.random(255));
        if(lang == p5.person.lang) {
            langColor = p5.color(255, 255, 255);
        }
        p5.langColorList[lang] = langColor;
        for(let i = 0; i < propotion; i++) {
            const langSpeaker = new Person(p5, false, lang);
            p5.people.push(langSpeaker);
        }
    }
    const d = new Date();
    this.startTime = d.now();
}

