void showParticle(float px, float  py, float qx, float qy, int percent) {
    float ry = py - qy;
    float rx = px - qx;
    float a = ry / -rx;
    float xdiff = px - qx;
    float x = -xdiff * percent / 100;
    float y = a * x;
    float resx = mouseX + x;
    float resy = mouseY - y;
    fill(255,255,0);
    ellipse(resx, resy, 20, 20);
}

/*https://www.vistawide.com/languages/top_30_languages.htm*/
/*unit is million*/
Map<String, Integer> langPopulationList = new HashMap<String, Integer>() {
    {
        put("English", 510);
        put("German", 229);
        put("Russian", 255);
        put("Japanese", 127);
        put("Spanish", 420);
        put("Arabic", 230);
        /*put("Chinese", 1051);*/
        put("Hindi", 490);
        put("Portuguese", 213);
        put("Bengali", 215);
    }
};

Map<String, Integer> langPropotionList = new HashMap<String, Integer>();
Map<String, Integer> langColorList = new HashMap<String, Integer>();

Boolean compareRanksOfLanguages(String lang1, String lang2) {
    List<Map.Entry<String, Integer>> mapOrderList = new ArrayList<Map.Entry<String, Integer>>(langPropotionList.entrySet());
    Collections.sort(mapOrderList, new ValueListComparator());

    int rank1 = 0;
    int rank2 = 0;
    for(int i = 0; i < mapOrderList.size(); i++) {
        Map.Entry<String, Integer> entry= mapOrderList.get(i);
        String language = entry.getKey();
        if(language == lang1) {
            rank1 = entry.getValue();
        } else if(language == lang2) {
            rank2 = entry.getValue();
        }
    }
    return rank1 > rank2;
}

static class ValueListComparator
implements Comparator<Map.Entry<String, Integer>>{
    public int compare(Map.Entry<String, Integer> object1,
            Map.Entry<String, Integer> object2){
        int prop1 = object1.getValue();
        int prop2 = object2.getValue();
        if(prop1 > prop2) {
            return 1;
        } else if (prop1 < prop2) {
            return -1;
        }
        return 0;
    }
}

void pieChart(float diameter) {
  float lastAngle = 0;
  for(Map.Entry<String, Integer> entry : langPropotionList.entrySet()) {
      String language = entry.getKey();
      fill(langColorList.get(language));
      int propotion = entry.getValue();
      BigDecimal fullDeg = new BigDecimal(360);
      BigDecimal bgProp = new BigDecimal(propotion);
      BigDecimal bgTotal = new BigDecimal(totalSpeakersPropotion);
      float angle = fullDeg
          .multiply(bgProp, MathContext.DECIMAL64)
          .divide(bgTotal, MathContext.DECIMAL64)
          .floatValue();
          noStroke();
      arc(width/2, height/2, diameter, diameter, lastAngle, lastAngle+radians(angle));

      pushMatrix();
      translate(width/2, height/2);
      float rad = lastAngle + radians(angle);
      rotate(rad);
      fill(0);
      if(angle > 10) {
          textSize(angle/4);
          textAlign(LEFT);
          text(language, 0, 0);
      }
      popMatrix();

      lastAngle += radians(angle);
  }
}


