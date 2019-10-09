let font1, font2, font3;

var fontSize;
var textTyped1, textTyped2, textTyped3;
var letterCount;
var textHeight;

var char1, char2, char3;
var prevChar1 = "", prevChar2 = "", prevChar3 = "";

var colors;
var colors1, colors2, colors3;
var randColor1, randColor2, randColor3;
var huesAmount = 6;

var startX, startY;
var x, y;

var margin;
var availableRegionWidth, availableRegionHeight;

var charsA = "abcdefghijklmnopqrstuvwxyz0123456789";
var charsB = "áăắặằẳẵâấậầẩẫạàảãđéêếệềểễẹèẻẽíịìỉĩóôốộồổỗọòỏơớợờởỡõúụùủưứựừửữũýỵỳỷỹ";
var charsC = ".,:;…!?#/*(){}[]-–—_**$%&@";

var charAvailable1 = "abcdefghijklmnopqrstuvwxyz012469áắậầàđềễẹẻôốọỏờởõụùưựũ-?";
var charAvailable2 = "abcdefghijklmnopqrstuvwxyz012469áắậầàđềễẹẻôốọỏờởõụùưựũ-?";
var charAvailable3 = "abcdefghijklmnopqrstuvwxyz012469áắậầàđềễẹẻôốọỏờởõụùưựũ-?";

var preloadedString = "";

/*------------------------------------------------------------------*/

function preload() {
  // read in the font to opentype.js
  font1 = loadFont("assets/3Dinh-Mau.otf");
  font2 = loadFont("assets/3Dinh-Thuong.otf");
  font3 = loadFont("assets/3Dinh-MyKhe.otf");
}

function initializeText() {
  textTyped1 = new Array("");
  textTyped2 = new Array("");
  textTyped3 = new Array("");

  letterCount = 0;

  colors1 = new Array();
  colors2 = new Array();
  colors3 = new Array();
}

function preloadString(_preloadedString) {
  for (var i = 0; i < _preloadedString.length; i++) {
    pushCharacter(_preloadedString[i]);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  smooth();
  noLoop();

  imageMode(CENTER);
  rectMode(CORNER);
  textAlign(LEFT, BASELINE);
  noStroke();
  blendMode(MULTIPLY);

  initializeText();
  
  /* default 
  textHeight = 180;
  fontSize = 187;*/
  /* promo poster 
  textHeight = 242;
  fontSize = 210; */
  /* totebag
  textHeight = 250;
  fontSize = 269.5; */
  /* blue stone */
  textHeight = 140;
  fontSize = 120;

  textSize(fontSize);

  colors = [
             [
               "#86A840", // light green
               "#2B6B42", // dark green
             ],
             [
               "#6EB8F0", // light blue
               "#1A5AA3", // dark blue
             ],
             [
               "#DB782C", // orange
               "#CC3629", // red
             ],
             [
               "",
               "#DB782C", // orange
             ],
             [
               "#F5B622", // yellow
               "",
             ],
             [
               "#EB88C3", // pink
               "",        //
             ],
           ];

  // margin border
  margin = 108;

  startX = margin - 10;
  startY = margin + fontSize * 0.85 - 25;

  availableRegionWidth = width - (margin * 2);
  availableRegionHeight = height - (margin * 2);

  preloadString(preloadedString);
}

function lineCount() {
  return textTyped1.length;;
}

/*------------------------------------------------------------------*/

function drawCharacter(_font, _char, _x, _y) {
  textFont(_font);
  text(_char, _x, _y);
}

function draw() {
  var currentLetter = 0;

  // draw letters
  for (var line = 0; line < lineCount(); line++) {
    var currentLine1 = textTyped1[line];
    var currentLine2 = textTyped2[line];
    var currentLine3 = textTyped3[line];

    // line coordinate
    x = startX;
    y = startY + (textHeight * line);

    for (var i = 0; i < currentLine1.length; i++) {
      // layer 3
      fill(colors3[currentLetter]);
      drawCharacter(font3, currentLine3[i], x, y);

      // layer 1
      fill(colors1[currentLetter]);
      drawCharacter(font1, currentLine1[i], x, y);

      // layer 2
      fill(colors2[currentLetter]);
      drawCharacter(font2, currentLine2[i], x, y);

      currentLetter++;

      // increment position x with the width of the current character
      x += textWidth(currentLine1[i]);
    }
  }
}

/*------------------------------------------------------------------*/

function isCurrentLineFull(_char, _currentLine) {
  return (textWidth(_currentLine) + textWidth(_char) > availableRegionWidth);
}

function isCanvasFull() {
  return (textHeight * (lineCount() + 1) > availableRegionHeight);
}

/*------------------------------------------------------------------*/

function addLine() {
  textTyped1.push("");
  textTyped2.push("");
  textTyped3.push("");
}

function removeLine() {
  textTyped1.pop();
  textTyped2.pop();
  textTyped3.pop();
}

function removeLastCharacter(str) {
  if (str.length > 0) {
    return str.substring(0, str.length - 1); 
  }
  
  return "";
}

/*------------------------------------------------------------------*/

function pickGlyph(char, lastVariation) {
  var uni = '0x';

  var currentCharArray;

  if (charsA.includes(char)) {
    currentCharArray = charsA;
    uni += "A";
  }

  if (charsB.includes(char)) {
    currentCharArray = charsB;
    uni += "B";
  }

  if (charsC.includes(char)) {
    currentCharArray = charsC;
    uni += "C";
  }

  // traverse charArray to get the position of the letter
  for (var i = 0; i < currentCharArray.length; i++) {
    if (char === currentCharArray[i]) {
      if (i < 10) {
        uni += '0';
      }

      uni += i.toString();

      break;
    }
  }

  var rand;

  // get a randomized variation
  // if this is layer 1
  if (lastVariation == -1) {
    rand = int(random(0, 10));
  }
  // else layer 2
  else {

    // if layer 1 is backbone fill
    if (lastVariation == 0) {
      rand = int(random(1, 5));
    }

    // if layer 1 is backbone stroke
    if (lastVariation == 5) {
      rand = int(random(6, 10));
    }

    // if layer 1 is motif fill
    if ((lastVariation >= 1) && (lastVariation <= 4)) {
      rand = int(random(0, 5));
    }

    // if layer 1 is motif stroke
    if ((lastVariation >= 6) && (lastVariation <= 9)) {
      rand = int(random(5, 10));
    }
  }

  uni += rand.toString();

  return uni;
}

function isCurrentLayerRepeated(_char, _prevChar) {
  if (_char === "") {
    return true;
  }

  if (_char != "" && _prevChar === "") {
    return false;
  }
  else {
    if (_char != _prevChar) {
      return false;
    }
  }

  return true;
}

/*------------------------------------------------------------------*/

function pickColors(_uni1, _uni2) {
  var stillPicking = true;
  var randHue1, randHue2, randHue3;

  var variation1 = parseInt(_uni1[_uni1.length - 1]),
      variation2 = parseInt(_uni2[_uni2.length - 1]);

  randColor1 = "";
  randColor2 = "";
  randColor3 = "";

  while (stillPicking) {
    randColor1 = "";
    randColor2 = "";
    randColor3 = "";

    // layer 3
    while (randColor3 == "") {
      randHue3 = int(random(0, huesAmount));
      randColor3 = colors[randHue3][0];
    }

    // layer 1
    if (variation1 >= 5) {
      // layer 1 is a stroke
      while (randColor1 == "") {
        randHue1 = int(random(0, huesAmount));
        randColor1 = colors[randHue1][1];
      }
    }
    else {
      // layer 1 is a fill
      while (randColor1 == "") {
        randHue1 = int(random(0, huesAmount));
        randColor1 = colors[randHue1][int(random(0, 2))];
      }
    }

    // layer 2
    if (variation2 < 5) {
      // layer 2 is a stroke
      while (randColor2 == "") {
        randHue2 = int(random(0, huesAmount));
        randColor2 = colors[randHue2][1];
      }
    }
    else {
      // layer 2 is a fill
      while (randColor2 == "") {
        randHue2 = int(random(0, huesAmount));
        randColor2 = colors[randHue2][int(random(0, 2))];
      }
    }

    print("1 " + randColor1 + " " + randHue1);
    print("2 " + randColor2 + " " + randHue2);
    print("3 " + randColor3 + " " + randHue3);

    stillPicking = !checkColors(randColor1, randColor2, randColor3, randHue1, randHue2, randHue3);
  }
}

function checkColors(_color1, _color2, _color3, _hue1, _hue2, _hue3) {

  // check if the hues are repeated
  if (_hue1 > 1 && _hue2 > 1 && _hue3 > 1) {
  }
  else {
    if ((_hue1 != _hue2) && (_hue2 != _hue3) && (_hue3 != _hue1)) {
    }
    else {
      return false;
    }
  }

  // check if the colors are repeated with those of the previous letter
  if (
      // if this is the first letter
      (letterCount <= 1) &&
      (_color1 != _color2 && _color2 != _color3 && _color3 != _color1)
    )
  {
  }
  else {
    if (_color1 == _color2 || _color2 == _color3 || _color3 == _color1) {
      return false;
    }

    // if not, check with the previous letter
    var countRepeatedColors = 0;

    if (_color1 == colors1[letterCount - 2]) {
      countRepeatedColors++;
    }
    if (_color2 == colors1[letterCount - 2]) {
      countRepeatedColors++;
    }
    if (_color3 == colors1[letterCount - 2]) {
      countRepeatedColors++;
    }
    if (_color1 == colors2[letterCount - 2]) {
      countRepeatedColors++;
    }
    if (_color2 == colors2[letterCount - 2]) {
      countRepeatedColors++;
    }
    if (_color3 == colors2[letterCount - 2]) {
      countRepeatedColors++;
    }
    if (_color1 == colors3[letterCount - 2]) {
      countRepeatedColors++;
    }
    if (_color2 == colors3[letterCount - 2]) {
      countRepeatedColors++;
    }
    if (_color3 == colors3[letterCount - 2]) {
      return false;
    }

    if (countRepeatedColors > 1) {
      return false;
    }
  }

  return true;
}

/*------------------------------------------------------------------*/

function pushCharacter(_key) {
  var uni1 = "", uni2 = "", uni3 = "";
  var lastVar1;

  // generate character for layer 1
  char1 = "";
  var isAvailable1 = charAvailable1.includes(_key);
  if (isAvailable1) {
    while (isCurrentLayerRepeated(char1, prevChar1)) {
      uni1 = pickGlyph(_key, -1);
      char1 = String.fromCodePoint(uni1);
    }
    prevChar1 = char1;
  }
  else {
    char1 = _key;
  }

  // generate character for layer 2
  char2 = "";
  var isAvailable2 = charAvailable2.includes(_key);
  if (isAvailable2) {
    while (isCurrentLayerRepeated(char2, prevChar2)) {
      if (uni1 === "") {
        lastVar1 = -1;
      }
      else {
        lastVar1 = parseInt(uni1[uni1.length - 1]);
      }

      uni2 = pickGlyph(_key, lastVar1);
      char2 = String.fromCodePoint(uni2);;
    }

    prevChar2 = char2;
  }
  else {
    char2 = _key;
  }

  // generate character for layer 3
  char3 = "";
  var isAvailable3 = charAvailable3.includes(_key);
  if (isAvailable3) {
    while (isCurrentLayerRepeated(char3, prevChar3)) {
      uni3 = pickGlyph(_key, -1);
      char3 = String.fromCodePoint(uni3);
    }
    prevChar3 = char3;
  }
  else {
    char3 = _key;
  }

  // check if current line is full
  if (isCurrentLineFull(char1, textTyped1[lineCount() - 1])) {
    // check if canvas is full
    if (isCanvasFull()) {
      initializeText();
    }
    else {
      addLine();
    }
  }

  // push new character
  textTyped1[lineCount() - 1] += char1;
  textTyped2[lineCount() - 1] += char2;
  textTyped3[lineCount() - 1] += char3;

  letterCount++;

  pickColors(uni1, uni2);
    
  // push new color
  colors1[letterCount - 1] = randColor1;
  colors2[letterCount - 1] = randColor2;
  colors3[letterCount - 1] = randColor3;
}

/*------------------------------------------------------------------*/

function popCharacter() {
  // canvas is near empty
  if (letterCount <= 1) {
    initializeText();
  }

  // canvas is not empty
  else {
    // current line is near empty
    if (textTyped1[lineCount() - 1].length <= 1) {
      removeLine();
      letterCount--;
    }

    // current line is not empty
    else {
      textTyped1[lineCount() - 1] = removeLastCharacter(textTyped1[lineCount() - 1]);
      textTyped2[lineCount() - 1] = removeLastCharacter(textTyped2[lineCount() - 1]);
      textTyped3[lineCount() - 1] = removeLastCharacter(textTyped3[lineCount() - 1]);

      letterCount--;
    }
  }
}

/*------------------------------------------------------------------*/

// runs when a key is pressed
function keyPressed(){
  if (keyCode === TAB) {
    save();
  }

  if (keyCode === DELETE || keyCode === BACKSPACE || keyCode === LEFT_ARROW) {
    popCharacter();
  }

  if (keyCode === ENTER || keyCode === RETURN) {
    // canvas is full
    if (isCanvasFull()) {
      initializeText();
    }
    else {   
      addLine();
    }
  }

  // redraw
  clear();
  redraw();
}

// runs when a key is pressed
function keyTyped() {
  // convert uppercase to lowercase (if any)
  var letter = key.toLowerCase();

  // check if key is included in the available letter set
  var isValid = charsA.includes(letter) || charsB.includes(letter) || charsC.includes(letter);
  if (isValid) {
    pushCharacter(letter);
  }
  
  // redraw
  clear();
  redraw();
}