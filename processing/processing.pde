import processing.core.*;
import java.util.*; 
import java.math.*;
Person person;
int maxPeople = 200;
int totalLangSpeakers, totalSpeakersPropotion;
Person[] peopleSortList;
ArrayList<Person> people = new ArrayList<Person>();
int personSize = 150;

void setup() {
    size(800, 800, FX2D);
    imageMode(CENTER);
    for(Map.Entry<String, Integer> entry : langPopulationList.entrySet()) {
        totalLangSpeakers += entry.getValue();
    }
    person = new Person(true, "English");

    for(Map.Entry<String, Integer> entry : langPopulationList.entrySet()) {
        String language = entry.getKey();
        BigDecimal speakers = new BigDecimal(entry.getValue());
        BigDecimal total = new BigDecimal(totalLangSpeakers);
        BigDecimal maxNum = new BigDecimal(maxPeople);
        BigDecimal propotion = speakers
            .divide(total, MathContext.DECIMAL64)
            .multiply(maxNum, MathContext.DECIMAL64);
        int intPropotion = propotion.intValue();
        langPropotionList.put(language, intPropotion);
        totalSpeakersPropotion += intPropotion;

        color langColor = color(random(255), random(255), random(255));
        if(language == person.lang) {
            langColor = color(255, 255, 255);
        }
        langColorList.put(language, langColor);
        for(Integer i = 0; i < intPropotion; i++) {
            Person langSpeaker = new Person(false, language);
            people.add(langSpeaker);
        }
    }

    for(Map.Entry<String, Integer> entry : langPropotionList.entrySet()) {
        println(entry.getKey(), ": ", entry.getValue());
    }
    println(totalSpeakersPropotion);
}
           
void draw() {
    background(255);
    Collections.sort(people);
    for(Iterator it = people.iterator(); it.hasNext();) {
        Person speaker = (Person)it.next();
        speaker.move();
    }
    person.show();
}

void keyPressed(){
    /*for(int i = 0; i < enemies.length; i++) {*/
        /*int randNum = int(random(i, enemies.length));*/
        /*if(!enemies[randNum].isShot) {*/
            /*Person enemy = enemies[randNum];*/
            /*person.fire(enemy);*/
            /*break;*/
        /*}*/
    /*}*/
} 
