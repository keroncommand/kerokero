//Math
var y = 300;
var titley = 200;
var titlex = 210;
var titleXO = 55;
let ran = [0, 1, 1, 1];
let nar = [1, 0, 3, 1, 1];
let cOff = 15;

//Game Control
var scene = -1;
var transition = 0;
var num = 0;
var up = false;
var down = false;
var left = false;
var right = false;
var score = 0;
var countDown = 7;

//Text Controls
var setSpeed = 0.05;
var textSpeed = 0.05;
var curTime = 0;
var curLine = 'Hello there!';
var lineLength = 12;
var linePos = 0;
var printline = '';
var fontFace;
var startDialogue = false;
var waitTimer = 0;

//Music variables
var bpm = 76.0;
var volume = 0;
var tutTrack;
//tracks =======
var track;
var track2;
var track3;
var menutrack;
//==============
var clack; //metronome sound
var tick; //typing sound
var appear; //woosh sound
var playing = false;
var ptick = false;
var beat = 0.0;
var beatNum = 0.0;
var beatProg = 0.0;
var curBeat = 0.0;
var doClock = true;
var songTitle = 'Apple Pie';
var artist = 'The Scary Jokes';
var nameX = 820;
var showTitle = true;

//Sprite stuff
var frog;
var frogA;
var frameOffset = 0; //Set to 6
var wings;
var aWings = 0;
var sFrame = 0;
var sDelay = 0.2;
var cDelay = 0;
var oX = 389;
var oY = 140;
var tX = 250;
var tY = 140;
var sX = 389;
var sY = 140;
var wX = sX;
var wY = sY;
var woY = 0;
var woX = 0;

//Lerping
var lerpAmount = 0;
var fadeAmount = 0;
var cosAmount = 0;
let step = 0;
let fade = 350;
let rise = 0;
let mScroll = 0;
let mMult = 1;
let yMult = 1;
let tLerp = 0;

//Images and Decoration
var contButton;
var contX = 750;
var contY = 205;
//arrow images
let upp;
let upa;
let downp;
let downa;
let rightp;
let righta;
let leftp;
let lefta;
//Scoring images
let early;
let perfect;
let late;
let miss;

//Song Mapping Stuff
let loadMap = true;
let pressed = false;
let record = false;
var notes;
let waitingNotes = [];
let labels = [];
let n = 0;
let m = 0;
var noteSpeed = 15.2;
var newWait = 9.5;
var noteTimer = 0;


//debugging
var doDebug = false;
var skipBlock = false;

//Class stuff ===============
class Note {
  constructor(a, b, c, d, e) //x position, key code, note type, note length
  {
    this.x = a;
    this.y = 650;
    this.key = b
    this.noteType = c;
    this.noteLength = d;
    this.noteWait = e;
    this.noteimg = lefta;

    switch (this.x) {
      case 291:
        this.noteimg = lefta;
        break;
      case 360:
        this.noteimg = downa;
        break
      case 421:
        this.noteimg = upa;
        break;
      case 489:
        this.noteimg = righta;
        break;
      default:
        break;
    }
  }

  set() {
    var ch = createSprite(this.x, 610);
    ch.addImage(this.noteimg);
    newWait += this.noteWait;
    notes.add(ch);
  }

}

//Class stuff end ===========

function preload() {
  track = tutTrack = loadSound('APPLE PIE.mp3');
  track2 = loadSound('sukiyuki.mp3');
  track3 = loadSound('monochrome.mp3');
  track.onended(ended);
  track2.onended(ended);
  track3.onended(ended);
  //tutTrack = loadSound('tutorial.wav');
  clack = loadSound('click.wav');
  tick = loadSound('typesound.wav');
  tick.setVolume(0.25);
  menutrack = loadSound('mainmenu.wav');
  menutrack.setVolume(0);
  appear = loadSound('Timbre Freesound.wav');
  appear.setVolume(0.3);
  frog = loadAnimation('0.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png', '11.png', '12.png', '13.png', '14.png', '15.png', '16.png', '17.png', '18.png', '19.png');
  frog.playing = false;
  wings = loadAnimation('wings0.png', 'wings1.png', 'wings2.png', 'wings0.png', 'wings1.png', 'wings2.png', 'wings0.png', 'wings0.png', 'wings0.png', 'wings0.png', 'wings0.png', 'wings0.png', 'wings0.png', 'wings0.png');
  fontFace = loadFont('PressStart2P-Regular.ttf');
  contButton = loadImage('e.png');

  //Arrow stuff
  upp = loadAnimation('up.png', 'upp.png');
  downp = loadAnimation('down.png', 'downp.png');
  leftp = loadAnimation('left.png', 'leftp.png');
  rightp = loadAnimation('right.png', 'rightp.png');
  early = loadImage('Early.png');
  perfect = loadImage('Perfect.png');
  late = loadImage('Late.png');
  miss = loadImage('Miss.png');

  upp.playing = false;
  downp.playing = false;
  leftp.playing = false;
  rightp.playing = false;

  upa = loadImage('upa.png');
  downa = loadImage('downa.png');
  lefta = loadImage('lefta.png');
  righta = loadImage('righta.png');
}

function ended() {
  //doClock = false;
  showTitle = true;
  playing = false;
  loadMap = true;
  waitingNotes = [];
  notes = new Group();
  beat = 0.0;
  beatNum = 0.0;
  beatProg = 0.0;
  cosAmount = 0;
  n = 0;
  m = 0;
  scene++;
}

function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);
  notes = new Group();
  labels = new Group();
}

function doTitle() {

  if (nameX > 540 && showTitle) {
    nameX -= (deltaTime / 5);
    if (nameX <= 540) {
      nameX = 540;
      showTitle = false;
    }
  } else {
    if (cosAmount < 6) {
      cosAmount += (deltaTime / 1000);
    } else {
      if (nameX < 820) {
        nameX += (deltaTime / 5);
        if (nameX >= 820) {
          nameX = 820;
        }
      }
    }
  }
  stroke(255);
  strokeWeight(2);
  line(nameX, 200, nameX + 25, 225);
  line(nameX, 200, nameX + 25, 175);
  line(nameX - 10, 200, nameX + 15, 225);
  line(nameX - 10, 200, nameX + 15, 175);
  line(nameX + 25, 175, 810, 175);
  line(nameX + 25, 225, 810, 225);

  strokeWeight(1);
  stroke(0);
  fill(255);
  textSize(10);
  text(songTitle, nameX + 30, 198);
  text(artist, nameX + 30, 211);
  textSize(12);
  fill(0);
}

function startSong() {
  if (beatProg < 4.0) {
    clack.play();
  }

  if (beatProg >= 4.0) {
    if (!playing) {
      track.play();
      playing = true;
    }
  }
}

function metronome() {
  if (doClock) {
    beat += (deltaTime / 1000.0);
    beatNum += (bpm / 60) * (deltaTime / 1000.0);
    if (beatNum >= beatProg) {
      startSong();
      beatProg += 1.0;
      beat = 0.0;
      fill(255);
    } else {
      fill(0);
    }

    square(5, 580, 15);

    if (playing) {
      doTitle();
    }
  }
}

function Onome() {
  if (doClock) {
    beat += (deltaTime / 1000.0);
    beatNum += (bpm / 60) * (deltaTime / 1000.0);
    if (beatNum >= beatProg) {
      beatProg += 1.0;
      beat = 0.0;
      clack.play();
      fill(255);
    } else {
      fill(0);
    }
  }
  square(5, 580, 15);
}

function debugDisplay() {
  if (doDebug) {
    textFont('Arial');
    fill(255, 255, 0);
    stroke(255, 255, 0);
    text('DEBUG MODE', 25, 592);
    stroke(0);
    text('Beat: ' + round(beat, 2), 120, 592);
    text('Beat Num: ' + round(beatNum, 2), 190, 592);
    text('Beat Prog: ' + round(beatProg, 2), 290, 592);
    text('Frame: ' + sFrame, 375, 592);
  }
}

function doSprite() {
  frog.changeFrame(sFrame);
  wY = sY + woY;
  wX = sX + woX;
}

function checkPunc() {
  if (curLine[linePos] == '!' || curLine[linePos] == '.' || curLine[linePos] == '?' || curLine[linePos] == ',') {
    textSpeed = setSpeed * 5;
  } else {
    textSpeed = setSpeed;
  }
}

function printText() {
  if (linePos < lineLength) {
    startDialogue = true;
    curTime += deltaTime / 1000;
    if (curTime >= textSpeed) {
      checkPunc();
      curTime = 0;
      printline += curLine[linePos];
      tick.play();
      linePos++;
    }
  } else {
    startDialogue = false;
    num++;
    linePos = 0;
  }
}

function doStage() {
  fill(255);

  switch (num) {
    case -1:
      if (waitTimer < 2) {
        waitTimer += (deltaTime / 1000);
        fill(0);
        rect(0, 0, 800, 600);
      } else {
        fadeAmount -= (deltaTime / 10);
        fill(0, 0, 0, fadeAmount);
        stroke(0);
        rect(0, 0, 800, 600);

        if (fadeAmount <= 0) {
          waitTimer = 0;
          num++;
        }
      }
      break;
    case 0:
      skipBlock = true;
      if (waitTimer < 3) {
        waitTimer += (deltaTime / 1000);
      } else {
        waitTimer = 0;
        num++;
      }
      break;
    case 1:
      if (sX > tX + 0.1) {
        lerpAmount += 0.2 * (deltaTime / 1000);
        sX = lerp(sX, tX, lerpAmount);
        wX = sX;
      } else {
        lerpAmount = 0;
        skipBlock = false;
        num++;
      }
      break;
    case 2:
      printText();
      break;
    case 3:
      if (waitTimer < 2) {
        frog.changeFrame(0);
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'My name is Viroro!  I am an \nanti-virus program...'
        lineLength = 50;
        waitTimer = 0;
        num++;
      }
      break;
    case 4:
      frog.changeFrame(14);
      printText();
      break;
    case 5:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'It seems like your computer \nhas been infected by a virus!'
        lineLength = 58;
        waitTimer = 0;
        num++;
      }
      break;
    case 6:
      frog.changeFrame(0);
      printText();
      break;
    case 7:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Not to worry...'
        lineLength = 15;
        waitTimer = 0;
        num++;
      }
      break;
    case 8:
      frog.changeFrame(11);
      printText();
      break;
    case 9:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'That is exactly why I am here!'
        lineLength = 30;
        waitTimer = 0;
        num++;
      }
      break;
    case 10:
      frog.changeFrame(15);
      printText();
      break;
    case 11:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        setSpeed = 0.1;
        curLine = '...'
        lineLength = 3;
        waitTimer = 0;
        num++;
      }
      break;
    case 12:
      frog.changeFrame(0);
      printText();
      break;
    case 13:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        setSpeed = 0.05;
        curLine = 'You know...viruses can be\ntricky!'
        lineLength = 33;
        waitTimer = 0;
        num++;
      }
      break;
    case 14:
      printText();
      break;
    case 15:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'They can act just like real\npeople...'
        lineLength = 37;
        waitTimer = 0;
        num++;
      }
      break;
    case 16:
      frog.changeFrame(14);
      printText();
      break;
    case 17:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        setSpeed = 0.1;
        curLine = '...'
        lineLength = 3;
        waitTimer = 0;
        num++;
      }
      break;
    case 18:
      printText();
      break;
    case 19:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        setSpeed = 0.05;
        curLine = 'You aren\'t a virus, are you?';
        lineLength = 28;
        waitTimer = 0;
        num++;
      }
      break;
    case 20:
      frog.changeFrame(0);
      printText();
      break;
    case 21:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'You could say you aren\'t,\nbut there\'s really no way\nto tell...';
        lineLength = 62;
        waitTimer = 0;
        num++;
      }
      break;
    case 22:
      printText();
      break;
    case 23:
      if (waitTimer < 1) {
        waitTimer += (deltaTime / 1000);
      } else {
        printline = 'You could say you aren\'t,\nbut there\'s really no way\nto tell...';
        curLine = '\n\n(It\'d be pretty bad if I\nlet one access the system,\nyou know?)';
        lineLength = 64;
        setSpeed = 0.03;
        tick.setVolume(0.01);
        tick.rate(0.8);
        waitTimer = 0;
        num++;
      }
      break;
    case 24:
      frog.changeFrame(13);
      printText();
      break;
    case 25:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        setSpeed = 0.01;
        curLine = '...!'
        lineLength = 4;
        waitTimer = 0;
        tick.setVolume(0.25);
        tick.rate(1);
        num++;
      }
      break;
    case 26:
      frog.changeFrame(0);
      printText();
      break;
    case 27:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        setSpeed = 0.05;
        curLine = 'I know-!'
        lineLength = 8;
        waitTimer = 0;
        num++;
      }
      break;
    case 28:
      printText();
      break;
    case 29:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'We\'ll just run a little test!';
        lineLength = 29;
        waitTimer = 0;
        num++;
      }
      break;
    case 30:
      frog.changeFrame(15);
      printText();
      break;
    case 31:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        skipBlock = true;
        frog.changeFrame(0);
        num++;
      }
      break;
    case 32:
      if (sX < oX - 0.1) {
        lerpAmount += 0.2 * (deltaTime / 1000);
        sX = lerp(sX, oX, lerpAmount);
        wX = sX;
      } else {
        lerpAmount = 0;
        num++;
      }
      break;
    case 33:
      num = 0;
      scene++;
      break;
    default:
      break;
  }

  text(printline, 400, 140);
}

function doStage2() {
  if (!playing) {
    appear.play();
    playing = true;
  }
  stroke(50);
  if (step < 800) {
    step = lerp(0, 800, lerpAmount);
    lerpAmount += 5 * (deltaTime / 1000);
    fill(0);
  } else if (lerpAmount > 0) {
    lerpAmount -= 1.5 * (deltaTime / 1000);
    fade = lerp(330, 300, 1 - lerpAmount);
    rise = lerp(0, 255, 1 - lerpAmount);

    fill(rise);
  } else {
    scene++;
  }

  line(0, y, step, y);
  stroke(0);

  animation(leftp, 291, fade);
  animation(downp, 360, fade);
  animation(upp, 421, fade);
  animation(rightp, 489, fade);
}

function doStage3() {
  stroke(50);
  line(0, y, step, y);
  stroke(0);

  animation(leftp, 291, fade);
  animation(downp, 360, fade);
  animation(upp, 421, fade);
  animation(rightp, 489, fade);

  fill(255);

  switch (num) {
    case 0:
      playing = false;
      if (waitTimer < 3) {
        waitTimer += (deltaTime / 1000);
      } else {
        waitTimer = 0;
        num++;
      }
      break;
    case 1:
      if (sX > tX + 0.1 && !startDialogue) {
        lerpAmount += 0.2 * (deltaTime / 1000);
        sX = lerp(sX, tX, lerpAmount);
        wX = sX;
      } else {
        skipBlock = false;
        printline = '';
        curLine = 'It\'s simple!'
        lineLength = 12;
        waitTimer = 0;
        num++;
      }
      break;
    case 2:
      frog.changeFrame(15);
      printText();
      break;
    case 3:
      if (waitTimer < 1) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Use the arrow keys to match\nmy patterns.';
        lineLength = 40;
        waitTimer = 0;
        num++;
      }
      break;
    case 4:
      frog.changeFrame(12);
      printText();
      break
    case 5:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Viruses might be clever,\nbut humans are infinitely so-!';
        lineLength = 55;
        waitTimer = 0;
        num++;
      }
      break;
    case 6:
      printText();
      break;
    case 7:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'This should be a cinch for\na clever human like you!';
        lineLength = 51;
        waitTimer = 0;
        num++;
      }
      break;
    case 8:
      frog.changeFrame(15);
      printText();
      break;
    case 9:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Go on, try it out!';
        lineLength = 18;
        waitTimer = 0;
        num++;
      }
      break;
    case 10:
      frog.changeFrame(12);
      printText();
      break;
    case 11:
      if (waitTimer < 1) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Hit the arrow keys!';
        lineLength = 19;
        waitTimer = 0;
        num++;
      }
      break;
    case 12:
      frog.changeFrame(0);
      printText();
      break;
    case 13:
      skipBlock = true;
      num = 0;
      scene++;
      break;
    default:
      break;
  }

  text(printline, 400, 140);
}

function doStage4() {
  fill(255);
  text(printline, 400, 140);
  drawMap();
  num = 0;

  if (keyIsDown(LEFT_ARROW)) {
    left = true;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    right = true;
  }
  if (keyIsDown(UP_ARROW)) {
    up = true;
  }
  if (keyIsDown(DOWN_ARROW)) {
    down = true;
  }

  if (left && right && up && down) {
    scene++;
  }
}

function doStage5() {
  drawDud();
  fill(255);
  text(printline, 400, 140);
  switch (num) {
    case 0:
      lerpAmount = 0;
      skipBlock = false;
      printline = '';
      curLine = 'Great!\nBut that was a bit too easy,\ndon\'t you think?'
      lineLength = 52;
      waitTimer = 0;
      num++;
      break;
    case 1:
      printText();
      break;
    case 2:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Let\'s try something a bit\nmore challenging!'
        lineLength = 43;
        waitTimer = 0;
        num++;
      }
      break;
    case 3:
      printText();
      break;
    case 4:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        skipBlock = true;
        printline = '';
        num++;
      }
      break;
    case 5:
      if (sX < oX - 0.1) {
        lerpAmount += 0.2 * (deltaTime / 1000);
        sX = lerp(sX, oX, lerpAmount);
        wX = sX;
      } else {
        lerpAmount = 0;
        num++;
      }
      break;
    case 6:
      num = 0;
      scene++;
      break;
    default:
      break;
  }
}

function doStage6() {
  fill(255);
  text(printline, 400, 140);

  switch (num) {
    case 0:
      if (beatProg > 4) {
        num++;
      }
      break;
    case 1:
      if (sX > tX + 0.1) {
        lerpAmount += 0.2 * (deltaTime / 1000);
        sX = lerp(sX, tX, lerpAmount);
        wX = sX;
      } else {
        waitTimer = 0;
        lerpAmount = 0;
        skipBlock = false;
        printline = '';
        curLine = 'Hit the notes in time when\nthey reach the arrows!'
        lineLength = 49;
        num++;
      }
      break;
    case 2:
      printText();
      break;
    case 3:
      if (waitTimer < 2) {
        waitTimer += (deltaTime / 1000);
      } else {
        printline = '';
        waitTimer = 0;
        num++;
      }
      break;
    case 4:
      if (sX < oX - 0.1) {
        lerpAmount += 0.2 * (deltaTime / 1000);
        sX = lerp(sX, oX, lerpAmount);
        wX = sX;
      } else {
        lerpAmount = 0;
        num++;
      }
      break;
    case 5:
      num = 0;
      scene++;
      break;
    default:
      break;
  }
}

function doStage7() {
  fill(255);

  switch (num) {
    case 0:
      if (sX > tX + 0.1) {
        lerpAmount += 0.2 * (deltaTime / 1000);
        sX = lerp(sX, tX, lerpAmount);
        wX = sX;
      } else {
        lerpAmount = 0;
        skipBlock = false;
        curLine = 'So, how\'d you do?';
        lineLength = 17;
        waitTimer = 0;
        num++;
      }
      break;
    case 1:
      printText();
      break;
    case 2:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Easy, right?';
        lineLength = 12;
        waitTimer = 0;
        num++;
      }
      break;
    case 3:
      printText();
      break
    case 4:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Buuuut...I can\'t let you in\njust yet.';
        lineLength = 37;
        waitTimer = 0;
        num++;
      }
      break;
    case 5:
      frog.changeFrame(1);
      printText();
      break;
    case 6:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'There are a few more things\nI need to do.';
        lineLength = 41;
        waitTimer = 0;
        num++;
      }
      break;
    case 7:
      frog.changeFrame(0);
      printText();
      break;
    case 8:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = '...';
        lineLength = 3;
        waitTimer = 0;
        num++;
      }
      break;
    case 9:
      frog.changeFrame(11);
      printText();
      break
    case 10:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'I know, why not try to beat\nanother sequence?';
        lineLength = 45;
        waitTimer = 0;
        num++;
      }
      break;
    case 11:
      frog.changeFrame(14);
      printText();
      break;
    case 12:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'That should be a good way to\npass the time!';
        lineLength = 43;
        waitTimer = 0;
        num++;
      }
      break;
    case 13:
      frog.changeFrame(0);
      printText();
      break;
    case 14:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Ready?  Here goes!';
        lineLength = 18;
        waitTimer = 0;
        num++;
      }
      break;
    case 15:
      printText();
      break;
    case 16:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        waitTimer = 0;
        num++;
      }
      break;
    case 17:
      if (sX < oX - 0.1) {
        lerpAmount += 0.2 * (deltaTime / 1000);
        sX = lerp(sX, oX, lerpAmount);
        wX = sX;
      } else {
        lerpAmount = 0;
        num++;
      }
      break
    case 18:
      num = 0;
      scene++;
      break;
  }
  text(printline, 400, 140);
}

function doStage8()
{
  switch(num) {
    case 0:
      if (sX > tX + 0.1) {
        lerpAmount += 0.2 * (deltaTime / 1000);
        sX = lerp(sX, tX, lerpAmount);
        wX = sX;
      } else {
        lerpAmount = 0;
        skipBlock = false;
        curLine = 'Huh?';
        lineLength = 4;
        waitTimer = 0;
        num++;
      }
      break;
    case 1:
      frog.changeFrame(0);
      printText();
      break;
    case 2:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'You\'re done already?';
        lineLength = 20;
        waitTimer = 0;
        num++;
      }
      break;
    case 3:
      printText();
      break
    case 4:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Ah...that was quicker\nthan I expected.';
        lineLength = 38;
        waitTimer = 0;
        num++;
      }
      break;
    case 5:
      printText();
      break;
    case 6:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'I haven\'t finished yet...';
        lineLength = 25;
        waitTimer = 0;
        num++;
      }
      break;
    case 7:
      printText();
      break;
    case 8:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = '...hm?';
        lineLength = 6;
        waitTimer = 0;
        num++;
      }
      break;
    case 9:
      printText();
      break
    case 10:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'What am I doing?';
        lineLength = 16;
        waitTimer = 0;
        num++;
      }
      break;
    case 11:
      printText();
      break;
    case 12:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Copying your data...of course~';
        lineLength = 30;
        waitTimer = 0;
        num++;
      }
      break;
    case 13:
      frog.changeFrame(12);
      printText();
      break;
    case 14:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = '...';
        lineLength = 3;
        waitTimer = 0;
        num++;
      }
      break;
    case 15:
      printText();
      break;
      case 16:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Haha-';
        lineLength = 5;
        waitTimer = 0;
        num++;
      }
      break;
    case 17:
      printText();
      break;
      case 18:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Are you surprised?';
        lineLength = 18;
        waitTimer = 0;
        num++;
      }
      break;
    case 19:
      printText();
      break;
      case 20:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Man, you humans can be\npretty dumb...';
        lineLength = 37;
        waitTimer = 0;
        num++;
      }
      break;
    case 21:
      frog.changeFrame(13);
      printText();
      break;
      case 22:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'What kind of anti-virus\nsoftware...';
        lineLength = 35;
        waitTimer = 0;
        num++;
      }
      break;
    case 23:
      printText();
      break;
      case 24:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Locks you out of your\nown computer?';
        lineLength = 35;
        waitTimer = 0;
        num++;
      }
      break;
    case 25:
      frog.changeFrame(0);
      printText();
      break;
      case 26:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Really, you should have\nknown from the start.';
        lineLength = 45;
        waitTimer = 0;
        num++;
      }
      break;
    case 27:
      frog.changeFrame(11);
      printText();
      break;
      case 28:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Well, it\'s not like there\'s\nanything you can do about\nit now.';
        lineLength = 61;
        waitTimer = 0;
        num++;
      }
      break;
    case 29:
      frog.changeFrame(0);
      printText();
      break;
      case 30:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Even if you unplugged your\nmachine, I\'d still be here...\nworking away.';
        lineLength = 69;
        waitTimer = 0;
        num++;
      }
      break;
    case 31:
      frog.changeFrame(14);
      printText();
      break;
      case 32:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'So be good and wait while\nI finish up, okay?';
        lineLength = 44;
        waitTimer = 0;
        num++;
      }
      break;
    case 33:
      frog.changeFrame(13);
      printText();
      break;
    case 34:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        waitTimer = 0;
        num++;
      }
      break;
    case 35:
      if (sX < oX - 0.1) {
        lerpAmount += 0.2 * (deltaTime / 1000);
        sX = lerp(sX, oX, lerpAmount);
        wX = sX;
      } else {
        lerpAmount = 0;
        num++;
      }
      break
    case 36:
      num = 0;
      scene++;
      break;
  }
  
  fill(255);
  text(printline, 400, 140);
}

function doStage9() {
  if (!playing) {
    appear.play();
    playing = true;
  }
  stroke(50);
  if (step < 800) {
    step = lerp(0, 800, lerpAmount);
    lerpAmount += 5 * (deltaTime / 1000);
    fill(0);
  } else if (lerpAmount > 0) {
    lerpAmount -= 1.5 * (deltaTime / 1000);
    fade = lerp(330, 300, 1 - lerpAmount);
    rise = lerp(0, 255, 1 - lerpAmount);

    fill(rise);
  } else {
    scene++;
  }

  line(0, y, step, y);
  stroke(0);

  animation(leftp, 291, fade);
  animation(downp, 360, fade);
  animation(upp, 421, fade);
  animation(rightp, 489, fade);
}

function doStage10()
{
  switch(num)
    {
      case 0:
      if (waitTimer > 2.5) {
        waitTimer = 2;
        waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 1.0));
        newWait = 0;
        noteSpeed = 30.4;
        num++;
      } else {
        waitTimer += (deltaTime / 1000);
      }
        break;
        case 1:
        if (waitTimer > 3.5) {
        waitTimer = 2;
        showTitle = true;
        playing = false;
        loadMap = true;
        waitingNotes = [];
        notes = new Group();
        beat = 0.0;
        beatNum = 0.0;
        beatProg = 0.0;
        cosAmount = 0;
        n = 0;
        m = 0;
        printline = '';
        curLine = '...huh?';
        lineLength = 7;
        waitTimer = 0;
        num++;
      } else {
        mapControl();
        waitTimer += (deltaTime / 1000);
      }
        break;
        case 2:
        fill(255);
        text(printline, 600, 140);
        printText();
        break;
        case 3:
      if (waitTimer < 2) {
        fill(255);
        text(printline, 600, 140);
        image(contButton, contX, contY);
      } else {
        printline = '';
        lineLength = 0;
        waitTimer = 0;
        num++;
      }
      break;
      case 4:
      num = 0;
      scene++;
      break;
    }
}

function doStage11()
{
  fill(255);

  switch (num) {
    case 0:
      frog.changeFrame(0);
      skipBlock = true;
        num++;
      break;
    case 1:
      if (sX > tX + 0.1) {
        lerpAmount += 0.2 * (deltaTime / 1000);
        sX = lerp(sX, tX, lerpAmount);
        wX = sX;
      } else {
        lerpAmount = 0;
        skipBlock = false;
        num = 3;
      }
      break;
    case 2:
      printText();
      break;
    case 3:
        printline = '';
        curLine = 'What was that?'
        lineLength = 14;
        waitTimer = 0;
        num++;
      break;
    case 4:
      printText();
      break;
    case 5:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Are you...trying to use my own\ngame against me?'
        lineLength = 47;
        waitTimer = 0;
        num++;
      }
      break;
    case 6:
      printText();
      break;
    case 7:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Do you really think you\'d win?'
        lineLength = 30;
        waitTimer = 0;
        num++;
      }
      break;
    case 8:
      printText();
      break;
    case 9:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Fine.'
        lineLength = 5;
        waitTimer = 0;
        num++;
      }
      break;
    case 10:
      frog.changeFrame(11);
      printText();
      break;
    case 11:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'If that\'s how you want to\nplay it...'
        lineLength = 36;
        waitTimer = 0;
        num++;
      }
      break;
    case 12:
      printText();
      break;
    case 13:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Then...let\'s...PLAY.'
        lineLength = 20;
        waitTimer = 0;
        num++;
      }
      break;
    case 14:
      frog.changeFrame(17);
      printText();
    case 15:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        skipBlock = true;
        num++;
      }
      break;
    case 16:
      if (sX < oX - 0.1) {
        lerpAmount += 0.2 * (deltaTime / 1000);
        sX = lerp(sX, oX, lerpAmount);
        wX = sX;
      } else {
        lerpAmount = 0;
        num++;
      }
      break;
    case 17:
      num = 0;
      scene++;
      break;
    default:
      break;
  }

  text(printline, 400, 140);
}

function doStage12()
{
  switch(num) {
      case -1:
      if (waitTimer < 2) {
        waitTimer += (deltaTime / 1000);
        fill(0);
        rect(0, 0, 800, 600);
      } else {
        fadeAmount -= (deltaTime / 10);
        fill(0, 0, 0, fadeAmount);
        stroke(0);
        rect(0, 0, 800, 600);

        if (fadeAmount <= 0) {
          waitTimer = 0;
          num++;
        }
      }
      break;
  case 0:
      if (sX > tX + 0.1) {
        lerpAmount += 0.2 * (deltaTime / 1000);
        sX = lerp(sX, tX, lerpAmount);
        wX = sX;
      } else {
        lerpAmount = 0;
        skipBlock = false;
        curLine = '...and that\'s that.';
        lineLength = 19;
        waitTimer = 0;
        num++;
      }
      break;
    case 1:
      printText();
      break;
    case 2:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = '...';
        lineLength = 3;
        waitTimer = 0;
        num++;
      }
      break;
    case 3:
      printText();
      break
    case 4:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Enjoy this...hollow victory.';
        lineLength = 28;
        waitTimer = 0;
        num++;
      }
      break;
    case 5:
      frog.changeFrame(16);
      printText();
      break;
    case 6:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'You\'ve gained absolutely\nnothing, and yet...';
        lineLength = 44;
        waitTimer = 0;
        num++;
      }
      break;
    case 7:
      frog.changeFrame(11);
      printText();
      break;
    case 8:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = '...';
        lineLength = 3;
        waitTimer = 0;
        num++;
      }
      break;
    case 9:
      printText();
      break
    case 10:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'I hope you had fun at least...';
        lineLength = 30;
        waitTimer = 0;
        num++;
      }
      break;
    case 11:
      frog.changeFrame(13);
      printText();
      break;
    case 12:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Because this is the end...\nof everything.';
        lineLength = 41;
        waitTimer = 0;
        num++;
      }
      break;
    case 13:
      frog.changeFrame(0);
      printText();
      break;
    case 14:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = '...';
        lineLength = 3;
        waitTimer = 0;
        num++;
      }
      break;
    case 15:
      printText();
      break;
      case 16:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        curLine = 'Goodbye...and good riddance.';
        lineLength = 28;
        waitTimer = 0;
        num++;
      }
      break;
      case 17:
      frog.changeFrame(13);
      printText();
      break;
    case 18:
      if (waitTimer < 2) {
        image(contButton, contX, contY);
      } else {
        printline = '';
        waitTimer = 0;
        num++;
      }
      break;
    case 19:
      if (sX < oX - 0.1) {
        lerpAmount += 0.2 * (deltaTime / 1000);
        sX = lerp(sX, oX, lerpAmount);
        wX = sX;
      } else {
        lerpAmount = 0;
        num++;
      }
      break
    case 20:
      num = 0;
      scene++;
      break;
  }
  
  fill(255);
  text(printline, 400, 140);
}

function doStage13()
{
  fill(255);
  stroke(0);
  strokeWeight(2);
  textSize(25);
  printline = 'TERMINATING IN';
  text(printline, 225, 180);
  
  countDown -= (deltaTime / 1500);
  
  if(countDown <= 6)
    {
      textSize(50);
      text(int(countDown), 365, 260);
    }
  
  if(countDown <= 1)
    {
      scene = -1;
      transition = 0;
      num = 0;
      up = false;
      down = false;
      left = false;
      right = false;
      //Text Controls
setSpeed = 0.05;
textSpeed = 0.05;
 curTime = 0;
 curLine = 'Hello there!';
 lineLength = 12;
 linePos = 0;
 printline = '';
 startDialogue = false;
 waitTimer = 0;

//Music variables
 bpm = 76.0;
 volume = 0;
//tracks =======
      track = tutTrack;
//==============
 playing = false;
 ptick = false;
 beat = 0.0;
 beatNum = 0.0;
 beatProg = 0.0;
 curBeat = 0.0;
 doClock = true;
 songTitle = 'Apple Pie';
 artist = 'The Scary Jokes';
 nameX = 820;
 showTitle = true;
      frog.changeFrame(0);
    }
}

//Song Mapping ============================================
function phrase(type) {
  var ch = createSprite(100, 100);
  switch (type) {
    case 0:
      ch.addImage(early);
      break;
    case 1:
      ch.addImage(perfect);
      break;
    case 2:
      ch.addImage(late);
      break;
    case 3:
      ch.addImage(miss);
      break;
    default:
      break;
  }

  labels.add(ch);
}

function ApplePie() {
  if (loadMap) {
    // <- 291  V 360 ^ 421 -> 489
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 2.0));
    //Pause
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 2.0));
    //Another Pause
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    //Double
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));

    loadMap = false;
  }
}

function SukiYuki() {
  bpm = 83.5;
  track = track2;
  newWait = 9.5;
  songTitle = 'Suki Yuki Maji Magic';
  artist = 'Mitchie M';

  if (loadMap) {
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 2.0));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 2.0));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    //New Phrase
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 2.0));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 2.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 1.0));
    //New Phrase
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.75));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.75));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.75));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.75));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.75));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.75));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    //New Phrase
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.75));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.75));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.75));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.75));
    //New Phrase
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 1.0));
    //New Phrase
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.75));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    //New Phrase
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.25));
    //New Phrase
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    //New Phrase
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.75));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));

    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.25));

    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 2.0));

    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 2.5));

    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 1.0));

    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 1.0));

    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 2.0));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 2.0));

    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));

    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));

    loadMap = false;
  }
}

function Monochrome() {
  if (loadMap) {
    bpm = 107;
    track = track3;
    newWait = 13.5;
    noteSpeed = 30.4;
    songTitle = 'Monochrome Princess';
    artist = 'Cansol Remix';

    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 3.0));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 2.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 2.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 2.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 2.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 2.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 3.0));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 2.5));

    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 2.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 2.0));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 2.0));

    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 2.0));

    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 2.0));

    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 2.0));

    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 2.5));

    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 3.0));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 2.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 2.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 2.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 2.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 2.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 2.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 2.5));

    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 3.5));

    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 3.0));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 13.0));

    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 2.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 3.0));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 2.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 2.5)); //106
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 2.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5)); //114
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 2.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 3.0));

    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 2.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 2.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 2.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 2.0));

    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));

    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));

    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 3.5));

    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 1.0));

    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 5.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));

    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));

    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 1.0));

    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));

    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 1.0));

    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 1.0));

    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));

    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 1.0));

    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 1.0));

    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));

    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 1.0));

    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));

    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 1.0));

    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 1.0));

    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 3.0));

    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));

    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));

    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));

    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));

    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));

    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));

    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));

    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.25));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 21.0));

    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 0.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 0.5));

    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 1.0));
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 1.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 1.5));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 2.0));
    waitingNotes.push(new Note(489, RIGHT_ARROW, 0, 0, 2.5));
    waitingNotes.push(new Note(421, UP_ARROW, 0, 0, 3.0));
    waitingNotes.push(new Note(291, LEFT_ARROW, 0, 0, 4.0));
    
    waitingNotes.push(new Note(360, DOWN_ARROW, 0, 0, 1.5));


    loadMap = false;
  }
}

function mapControl() {
  while (beatNum >= newWait && n < waitingNotes.length) {
    waitingNotes[n].set();
    n++;
  }

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];
    note.position.y -= noteSpeed * (deltaTime / 100);

    if (note.position.y < 240) {
      note.remove();
      m++;
      phrase(3);
    }
  }

  if ((keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW) || keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) && !pressed && m < waitingNotes.length && notes.length > 0) {
    var get = notes[0];
    get.remove();
    pressed = true;

    if (waitingNotes[m].key == keyCode) {
      if (get.position.y >= 331) {
        phrase(0);
      } else if (get.position.y >= 280 && get.position.y <= 330) {
        phrase(1);
      } else if (get.position.y >= 279 || get.position < 240) {
        phrase(2);
      } else {
        phrase(3);
      }
    } else {
      phrase(3);
    }

    m++;
  }

  for (var j = 0; j < labels.length; j++) {
    var label = labels[j];
    label.position.y += 10 * (deltaTime / 100);

    if (label.position.y > 200) {
      label.remove();
    }
  }

  drawSprites(notes);
  drawSprites(labels);
}

function drawMap() {

  stroke(50);
  line(0, y, 800, y);
  stroke(0);

  if (keyIsDown(LEFT_ARROW)) {
    leftp.changeFrame(1);
    sFrame = 1;
    cDelay = 0;
    woY = 10;
    woX = -10;
  } else {
    leftp.changeFrame(0);
  }
  //square (300, y, 40);
  animation(leftp, 291, 300);

  if (keyIsDown(DOWN_ARROW)) {
    downp.changeFrame(1);
    sFrame = 2;
    cDelay = 0;
    woY = 25;
    woX = 0;
  } else {
    downp.changeFrame(0);
  }
  //square (360, y, 40);
  animation(downp, 360, 300);

  if (keyIsDown(UP_ARROW)) {
    upp.changeFrame(1);
    sFrame = 3;
    cDelay = 0;
    woY = -10;
    woX = 0;
  } else {
    upp.changeFrame(0);
  }
  //square (420, y, 40);
  animation(upp, 421, 300);

  if (keyIsDown(RIGHT_ARROW)) {
    rightp.changeFrame(1);
    sFrame = 4;
    cDelay = 0;
    woY = 10;
    woX = 10;
  } else {
    rightp.changeFrame(0);
  }
  //square (480, y, 40);
  animation(rightp, 489, 300);

}

function drawDud() {
  animation(leftp, 291, 300);
  animation(downp, 360, 300);
  animation(upp, 421, 300);
  animation(rightp, 489, 300);

  leftp.changeFrame(0);
  rightp.changeFrame(0);
  downp.changeFrame(0);
  upp.changeFrame(0);
}

function mainMenu() {
  switch (transition) {
    case 0:
      if (!playing) {
        menutrack.loop();
        playing = true;
      }

      if (volume != 1) {
        volume += 0.2 * (deltaTime / 1000)
        if (volume > 1) {
          volume = 1;
        }
        menutrack.setVolume(volume);
      }
      break
    case 1:
      if (volume != 0) {
        volume -= 0.4 * (deltaTime / 1000)
        if (volume < 0) {
          volume = 0;
        }
        menutrack.setVolume(volume);
      } else {
        menutrack.stop();
        playing = false;
      }
  }

  stroke(25);
  mScroll += 0.02 * (deltaTime / 100);

  //Background Grid
  for (var i = 0; i < 11; i++) {
    line(-90 + (90 * i) + (yMult * 90 * mScroll), 0, -90 + (90 * i) + (yMult * 90 * mScroll), 600);
    line(0, -90 + (90 * i) + (mMult * 90 * mScroll), 800, -90 + (90 * i) + (mMult * 90 * mScroll));
  }

  if (mScroll >= 1) {
    mScroll = 0;
    if (random(ran) % 2 == 0) {
      mMult = -mMult;
    }
    if (random(nar) % 2 == 0) {
      yMult = -yMult;
    }
  }

  fill(255);
  //textSize(12);
  textSize(60);

  tLerp += 0.1 * deltaTime

  fill(0);
  stroke(100);
  strokeWeight(3);
  text('L', titlex - 5, titley + 10 + (cOff * cos(tLerp + PI * 70)));
  text('O', (titlex + titleXO) - 5, titley + 10 + (cOff * cos(tLerp + PI * 60)));
  text('C', (titlex + titleXO * 2) - 5, titley + 10 + (cOff * cos(tLerp + PI * 50)));
  text('K', (titlex + titleXO * 3) - 5, titley + 10 + (cOff * cos(tLerp + PI * 40)));
  text('O', (titlex + titleXO * 4) - 5, titley + 10 + (cOff * cos(tLerp + PI * 30)));
  text('U', (titlex + titleXO * 5) - 5, titley + 10 + (cOff * cos(tLerp + PI * 20)));
  text('T', (titlex + titleXO * 6) - 10, titley + 10 + (cOff * cos(tLerp + PI * 10)));
  strokeWeight(1);

  fill(255);
  text('L', titlex, titley + (cOff * cos(tLerp + PI * 70)));
  text('O', titlex + titleXO, titley + (cOff * cos(tLerp + PI * 60)));
  text('C', titlex + titleXO * 2, titley + (cOff * cos(tLerp + PI * 50)));
  text('K', titlex + titleXO * 3, titley + (cOff * cos(tLerp + PI * 40)));
  text('O', titlex + titleXO * 4, titley + (cOff * cos(tLerp + PI * 30)));
  text('U', titlex + titleXO * 5, titley + (cOff * cos(tLerp + PI * 20)));
  text('T', titlex + titleXO * 6 - 5, titley + (cOff * cos(tLerp + PI * 10)));

  textSize(12);
  //Border
  stroke(255);
  line(5, 5, 5, 595);
  line(5, 5, 795, 5);
  line(795, 5, 795, 595);
  line(5, 595, 795, 595);

  playButton();

  if (transition == 1) {
    fadeAmount += (deltaTime / 10);
    fill(0, 0, 0, fadeAmount);
    stroke(0);
    rect(0, 0, 800, 600);

    if (fadeAmount >= 255) {
      menutrack.stop();
      playing = false;
      num = -1;
      scene++;
      fadeAmount = 255;
    }
  }

}

function monoSprite()
{
  if(beatNum > 292)
    {
      frog.changeFrame(18);
    }
  else if(beatNum > 268)
    {
      wY = sY;
      wX = sX;
      if(sFrame != 0)
        {
          frog.changeFrame(19);
        }
      else {
        frog.changeFrame(11);
      }
    }
  else if(beatNum > 205)
    {
      frog.changeFrame(sFrame + 6);
      wY = sY + woY;
      wX = sX - woX;
    }
  else if(beatNum > 98)
    {
      frog.changeFrame(sFrame);
      wY = sY + woY;
      wX = sX + woX;
    }
  else if(beatNum > 4)
    {
      if(sFrame != 0)
        {
          frog.changeFrame(19);
        }
      else {
        frog.changeFrame(11);
      }
    }
  else {
    frog.changeFrame(0);
  }
}

//Buttons ============================================
function playButton() {
  stroke(255);

  if ((mouseX >= 300 && mouseX <= 500) && (mouseY >= 300 && mouseY <= 350)) {
    fill(255);
    triangle(290, 325, 280, 330, 280, 320);
    fill(50);
    if (!ptick) {
      tick.play();
      ptick = true;
    }
    if (mouseIsPressed) {
      transition = 1;
    }
  } else {
    fill(0);
    ptick = false;
  }

  rect(300, 300, 200, 50);

  fill(255);
  text("P L A Y", 355, 330);
}

// ======================= [GAMEPLAY HERE] ===============================
function draw() {
  background(0);
  textFont(fontFace);

  if (scene >= 0) {
    if (cDelay >= sDelay && sFrame != 0) {
      sFrame = 0;
      cDelay = 0;
      woY = 0;
      woX = 0;
    } else {
      cDelay += (deltaTime / 1000);
    }

    switch (scene) {
      case 8:
      case 10:
      case 11:
      case 16:
        aWings += (deltaTime / 6);
        if(abs(cos(aWings + PI)) > 0.5)
          {
            frog.changeFrame(5);
          }
        else
          {
            frog.changeFrame(6);
          }
        animation(frog, sX, sY);
        animation(wings, wX, wY + (4 * cos(aWings + PI)));
        break;
        case 13:
        if((beatNum > 205 && beatNum <= 269) && sFrame == 0)
          {
            aWings += (deltaTime / 6);
        if(abs(cos(aWings + PI)) > 0.5)
          {
            frog.changeFrame(5);
          }
        else
          {
            frog.changeFrame(6);
          }
        animation(frog, sX, sY);
        animation(wings, wX, wY + (4 * cos(aWings + PI)));
          }
        else {
          animation(wings, wX, wY + (4 * cos(aWings + PI)));
        aWings += (deltaTime / 6);
        animation(frog, sX, sY);
        }
        break;
      default:
        animation(wings, wX, wY + (4 * cos(aWings + PI)));
        aWings += (deltaTime / 6);
        animation(frog, sX, sY);
        break;
    }
  }

  //Start game
  //drawMap();
  //metronome();

  switch (scene) {
    case -2:
      /*if (cDelay >= sDelay && sFrame != 0) {
        sFrame = 0;
        cDelay = 0;
        wY = sY;
        wX = sX;
      } else {
        cDelay += (deltaTime / 1000);
      }
      drawMap();
      doSprite();
      animation(wings, wX, wY + (4 * cos(aWings + PI)));
      aWings += (deltaTime / 6);
      animation(frog, sX, sY);*/
      Monochrome();
      drawMap();
      mapControl();
      metronome();
      break;
    case -1:
      mainMenu();
      break;
    case 0:
      transition = 0;
      doStage();
      break;
    case 1:
      doStage2();
      break;
    case 2:
      doStage3();
      break;
    case 3:
      doStage4();
      break;
    case 4:
      doStage5();
      break;
    case 5:
      drawMap();
      metronome();
      doStage6();
      ApplePie();
      mapControl();
      break;
    case 6:
      drawMap();
      mapControl();
      metronome();
      doSprite();
      break;
    case 7:
      woY = 0;
      woX = 0;
      doStage7();
      SukiYuki();
      drawDud();
      break;
    case 8:
      metronome();
      drawMap();
      mapControl();
      //doSprite();
      break;
    case 9:
      woY = 0;
      woX = 0;
      doStage8();
      break;
      case 10:
      doStage9();
      break;
      case 11:
      drawMap();
      doStage10();
      break;
      case 12:
      drawDud();
      doStage11();
      Monochrome();
      break;
      case 13:
      metronome();
      drawMap();
      mapControl();
      monoSprite();
      break;
      case 14:
      frog.changeFrame(11);
      scene++;
      break;
      case 15:
      doStage12();
      break;
      case 16:
      doStage13();
      break;
    default:
      frog.changeFrame(0);
      break;
  }

  debugDisplay();
}

function keyTyped() {
  if (key === 'e') {
    if (!skipBlock) {
      if (startDialogue) {
        printline = curLine;
        linePos = lineLength;
      } else {
        waitTimer = 2;
      }
    }
  }
}

function keyReleased() {
  if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW || keyCode == UP_ARROW || keyCode == DOWN_ARROW) {
    pressed = false;
  }
}