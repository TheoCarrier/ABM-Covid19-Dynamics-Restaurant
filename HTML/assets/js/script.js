
//Covid-19 transmission in facilities
console.clear();


//HTML variables
//CHECK IF SIMULATION IS RELOAD WITH PARAMETERS OR NOT
if(window.localStorage.getItem('callReload')){
  var NbParticules = localStorage.getItem('NbParticules');
  var NbMask = localStorage.getItem('NbMask');
  var NbPerTable = localStorage.getItem('NbPerTable');
  // var r0 = localStorage.getItem('r0');
  var lethal = localStorage.getItem('lethal');
  // var Desinfection = localStorage.getItem('Desinfection');

  var InfectiousRate = localStorage.getItem('infectiousRate');
  var Virulence =  localStorage.getItem('virulence');
  var guerison = localStorage.getItem('guerison');
  var vaccinated = localStorage.getItem('vaccinated');

  var newCovidEntry = localStorage.getItem('newCovidEntry');


  var adjustedBeta = true;

  if(localStorage.getItem('MaskWaiter') === 'true'){
    var maskwaiter = true;
    document.getElementById('MaskWaiter').checked = true;
  }
  else if(localStorage.getItem('MaskWaiter') === 'false'){
    var maskwaiter = false;
    document.getElementById('MaskWaiter').checked = false;
  }

  // if(localStorage.getItem('tableDesin') === 'true'){
  //   var tableDesin = true;
  //   document.getElementById('tableDesin').checked = true;
  //   }
  // else if(localStorage.getItem('tableDesin') === 'false'){
  //   var tableDesin = false;
  //   document.getElementById('tableDesin').checked = false;
  // }
  if(parseFloat(NbParticules) !== 50){
    if(parseFloat(Virulence) !== 0.0714){
      console.log("hey1")
      adjustedBeta = false;
    }
    if(parseFloat(lethal) !== 0.53 ){
      console.log("hey2")
      adjustedBeta = false;
    }
    if( parseFloat(guerison) !== 14){
      console.log("hey3")
      adjustedBeta = false;
    }
    if(adjustedBeta){
      InfectiousRate = ((4.5 * (parseFloat(Virulence) + (parseFloat(lethal) / 100) + parseFloat(guerison))) / parseFloat(NbParticules)).toFixed(3);
    }
  }
    

  //Mise à jour des ranges
  document.getElementById('NbParticules').value = NbParticules;
  document.getElementById('NbMask').value = NbMask;
  document.getElementById('NbPerTable').value = NbPerTable;
  // document.getElementById('r0').value = r0; // Not use
  document.getElementById('lethal').value = lethal; //Not use
  // document.getElementById('Desinfection').value = Desinfection;//not use

  document.getElementById('infectiousRate').value = InfectiousRate;
  document.getElementById('virulence').value = Virulence;
  document.getElementById('guerison').value = guerison;
  document.getElementById('Vaccinated').value = vaccinated;

  document.getElementById('newCovidEntry').value = newCovidEntry;



  //Mise à jour des outputs
  document.getElementById('OutputNbParticules').value = NbParticules;
  document.getElementById('outputNbMask').value = NbMask;
  document.getElementById('outputNbPerTable').value = NbPerTable;
  // document.getElementById('outputr0').value = r0;
  document.getElementById('outputlethal').value = lethal;
  // document.getElementById('OutputDesinfection').value = Desinfection;

  document.getElementById('outputrate').value = InfectiousRate;
  document.getElementById('outputvirulence').value = Virulence;
  document.getElementById('outputguerison').value = guerison;
  document.getElementById('outputVaccinated').value = vaccinated;

  document.getElementById('outputNewCovidEntry').value = newCovidEntry;



  // var checkingBool = localStorage.getItem('expert');
  // checkbox = document.getElementById('expert');

  // console.log(checkingBool)
  // console.log("asidj" + checkbox.checked);
  // if(checkingBool){
  //   console.log("Comment ça peut aller ici si ça c'est" + checkingBool)
  //   paramsExpert.style['display'] = 'inline-flex';
  //   checkbox.checked = true;
  //   checkbox.value = "on";
  // }
  // else{
  //   console.log("allo2")
  //   checkbox.checked = false;
  //   paramsExpert.style['display'] = 'none';
  //   checkbox.value = "off";
  // }

}
else{
  var NbParticules = document.getElementById('NbParticules').value;
  var NbMask = document.getElementById('NbMask').value;
  var NbPerTable = document.getElementById('NbPerTable').value;
  // var r0 = document.getElementById('r0').value; //Not use
  var lethal = document.getElementById('lethal').value; //Not use
  // var Desinfection = document.getElementById('Desinfection').value;

  var InfectiousRate = document.getElementById('infectiousRate').value;
  var Virulence =  document.getElementById('virulence').value;
  var guerison = document.getElementById('guerison').value;

  var vaccinated = document.getElementById('Vaccinated').value;

  var newCovidEntry = document.getElementById('newCovidEntry').value;

  if(document.getElementById('MaskWaiter').checked){
    var maskwaiter = true;
  }
  else if(!document.getElementById('MaskWaiter').checked){
    var maskwaiter = false;
  }

  // if(document.getElementById('tableDesin').checked){
  //   var tableDesin = true;
  // }
  // else{
  //   var tableDesin = false;
  // }
}

localStorage.clear();





// function HTML(){
//   NbParticules = document.getElementById('NbParticules').value;
//   NbMask = document.getElementById('NbMask').value;
//   NbPerTable = document.getElementById('NbPerTable').value;
//   r0 = document.getElementById('r0').value;
//   lethal = document.getElementById('lethal').value;
// };

// window.setInterval(function(){HTML();}, 1000);


/* Play with these values! */
const PARTICLE_COUNT = NbParticules;  //70
const SAFE_DISTANCE = 200 + getRandomInt(50);
const INFECTED_DISTANCE = 10;
const INFECTION_RATE = 0.15; //TO USE
const RECOVERY_TIME = 30000 + getRandomInt(10000);
const DEATH_RATE = 6; //Choose a number between 0 and 100, : 6 (Case and death at 22/07/20)
const STAY_AT_HOME = 0;
const LOCAL_DISPLACEMENT_DISTANCE = 100;

const ONLY_ONE_INFECTED = false; //if true then NUMBER_INFECTED_START is useless
const NUMBER_INFECTED_START = (newCovidEntry / 100); //from 0 to 0.99

const LOCKDOWN = false;
const TIME_BEFORE_LOCKDOWN = 25000;
const TIME_OF_LOCKDOWN = 15000;

const WEAR_MASK = true; //if true then WEAR_MASK_AFTER_TIME and PERCENTAGE_OF_MASK are useless
const WEAR_MASK_AFTER_TIME = 0;
const PERCANTAGE_OF_MASK = NbMask; //Between 0 and 10;

const SPEED = 1.6;

lethal /= 100; //to get percentage !

//R0 CALCULATION !!!
  console.log(InfectiousRate)
  console.log(NbParticules)
  console.log(Virulence)
  console.log(lethal)
  console.log(guerison)

const R0 = parseFloat(((InfectiousRate * NbParticules) / (parseFloat(Virulence) + parseFloat(lethal) + parseFloat(guerison))));
console.log("R0: " + R0);

document.getElementById('outputr0').value = R0.toFixed(3);


/* ---------------------------------- */

var PAUSE = false;


let particles = [];
var ok = false;
var lockdown_ok = false;
var lockdown_on = false;
var local_displacement = false;
var startx, starty;
var changeDirection = true;
var infectOne = false;
var infectOneWaiter = false;

var numberInfected = 0;
var numberDeath = 0;
var numberRecover = 0;

var dataSusceptible = [];
var dataInfected = [];
var dataInfectedAfter = [];
var dataRecover = [];
var dataHealthy = [];
var dataDeath = [];
var dataParticles = [];
var dataParticlesTotal = 0;

var countingInfectedForOutput = 0;
var countingEntryInfectedForOutput = 0;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const STATUSES = {
  HEALTHY: 'HEALTHY',
  INFECTED: 'INFECTED',
  MASKED: 'MASKED',
  VACCIN: 'VACCIN'
};

const DISPLACEMENT_STATUSES = {
  WALKING: 'WALKING',
  WAITING: 'WAITING',
  SIT: 'SIT',
};

const PARTICLE_TYPE = {
  WAITER: 'WAITER',
  CLIENT: 'CLIENT',
};

const elBody = document.body;
const elCanvas = document.querySelector('#canvas');
const ctx = elCanvas.getContext('2d');

let width, height;

function resize() {
  // width = elCanvas.width = elBody.clientWidth;
  // height = elCanvas.height = elBody.clientHeight;
  width = elCanvas.width;
  height = elCanvas.height;
}
resize();
window.addEventListener('resize', resize);
// var graphUpdateInterval = setInterval(function(){updateData();}, 2000);

/* ---------------------------------- */

class Wall {
  constructor(a1, a2, a3, a4, fill) {
    this.x1 = a1;
    this.y1 = a2;
    this.width = a3;
    this.height = a4;
    this.fill2 = fill;

    this.x2 = this.x1 + this.width;
    this.y2 = this.y1 + this.height;
    this.color = true;
    if (this.fill2 === undefined) {
      this.color = false;
    }
  }
  Draw(context) {
    context.beginPath();
    context.lineWidth = '3';
    if (this.color) {
      context.strokeStyle = 'DarkGray';
    } else {
      context.strokeStyle = '#F9F8F6';
    }
    //context.moveTo(this.x1, this.y1);
    //context.lineTo(this.width, this.height);
    context.rect(this.x1, this.y1, this.width, this.height);
    context.stroke();
    if (this.fill2) {
      if (this.color) {
        context.fillStyle = 'DarkGray';
      }
      context.fill();
    }
  }
}
var walls = [];
//Murs extérieur du restaurant
walls.push(new Wall(200, 200, 40, 1, false));
walls.push(new Wall(450, 200, 850, 1, false));
walls.push(new Wall(200, 200, 1, 1000, false));
walls.push(new Wall(1300, 200, 1, 1000, false));

//Bloc intérieur du restaurant
walls.push(new Wall(520, 520, 400, 500, true));
//Toillettes
// walls.push(new Wall(950, 500, 50, 1, false));
// walls.push(new Wall(1000, 500, 1, 500, false));

//Bar
walls.push(new Wall(1100, 550, 200, 40, true));

//tables extérieurs devant
walls.push(new Wall(500, 90, 50, 80, true));
walls.push(new Wall(700, 90, 50, 80, true));
walls.push(new Wall(900, 90, 50, 80, true));
walls.push(new Wall(1100, 90, 50, 80, true));

//Tables extérieurs côté
walls.push(new Wall(130, 250, 50, 50, true));
walls.push(new Wall(130, 400, 50, 50, true));
walls.push(new Wall(130, 550, 50, 50, true));

//Tables intérieurs côté gauche
walls.push(new Wall(220, 300, 80, 50, true));
walls.push(new Wall(220, 450, 80, 50, true));
walls.push(new Wall(220, 600, 80, 50, true));

walls.push(new Wall(400, 530, 60, 120, true));

//tables intérieurs centre
walls.push(new Wall(550, 415, 80, 50, true));
walls.push(new Wall(700, 415, 80, 50, true));

walls.push(new Wall(500, 250, 80, 50, true));
walls.push(new Wall(650, 250, 80, 50, true));
walls.push(new Wall(800, 250, 80, 50, true));
walls.push(new Wall(1000, 250, 80, 50, true));
walls.push(new Wall(1150, 250, 80, 50, true));

//Couloir invisible
walls.push(new Wall(0, 0, 1, 1000, undefined));
walls.push(new Wall(0, 0, 2000, 1, undefined));

walls.push(new Wall(150, 200, 46, 1, undefined));

//tables intérieurs côté droit
walls.push(new Wall(1150, 380, 60, 120, true));

class Seat {
  constructor(a1, a2, a3) {
    this.x1 = a1;
    this.y1 = a2;
    this.radius = a3;
    var isOccuped = false;
  }
  Draw(context) {
    context.beginPath();
    context.lineWidth = '2.5';
    context.strokeStyle = 'black';
    context.arc(this.x1, this.y1, this.radius, 0, Math.PI * 2);
    context.stroke();
  }
}

class Table {
  constructor(seatsOfTable) {
    this.seatss = seatsOfTable;
    this.isOccupedd = false;
    this.numberSeats = seatsOfTable.length;
  }
  ChangeStatus() {
    this.seatss.forEach(seat => {
      if (seat.isOccuped) {
        this.isOccupedd = true;
      }
    });
  }
}

var seats = [];
var tables = [];

//Table extérieur centre
if (true) {
  seats.push(new Seat(480, 115, 5.5));
  seats.push(new Seat(480, 150, 5.5));
  seats.push(new Seat(570, 115, 5.5));
  seats.push(new Seat(570, 150, 5.5));
  var tempoSeats = [seats[0], seats[1], seats[2], seats[3]];
  tables.push(new Table(tempoSeats));

  seats.push(new Seat(680, 115, 5.5));
  seats.push(new Seat(680, 150, 5.5));
  seats.push(new Seat(770, 115, 5.5));
  seats.push(new Seat(770, 150, 5.5));
  var tempoSeats = [seats[4], seats[5], seats[6], seats[7]];
  tables.push(new Table(tempoSeats));

  seats.push(new Seat(880, 115, 5.5));
  seats.push(new Seat(880, 150, 5.5));
  seats.push(new Seat(970, 115, 5.5));
  seats.push(new Seat(970, 150, 5.5));
  var tempoSeats = [seats[8], seats[9], seats[10], seats[11]];
  tables.push(new Table(tempoSeats));

  seats.push(new Seat(1080, 115, 5.5));
  seats.push(new Seat(1080, 150, 5.5));
  seats.push(new Seat(1170, 115, 5.5));
  seats.push(new Seat(1170, 150, 5.5));
  var tempoSeats = [seats[12], seats[13], seats[14], seats[15]];
  tables.push(new Table(tempoSeats));

  //tables extérieurs côté
  seats.push(new Seat(155, 230, 5.5));
  seats.push(new Seat(155, 320, 5.5));
  var tempoSeats = [seats[16], seats[17]];
  tables.push(new Table(tempoSeats));

  seats.push(new Seat(155, 380, 5.5));
  seats.push(new Seat(155, 470, 5.5));
  var tempoSeats = [seats[18], seats[19]];
  tables.push(new Table(tempoSeats));

  seats.push(new Seat(155, 530, 5.5));
  seats.push(new Seat(155, 620, 5.5));
  var tempoSeats = [seats[20], seats[21]];
  tables.push(new Table(tempoSeats));

  //tables intérieurs côté gauche
  seats.push(new Seat(245, 280, 5.5));
  seats.push(new Seat(280, 280, 5.5));
  seats.push(new Seat(245, 370, 5.5));
  seats.push(new Seat(280, 370, 5.5));
  var tempoSeats = [seats[22], seats[23], seats[24], seats[25]];
  tables.push(new Table(tempoSeats));

  seats.push(new Seat(245, 430, 5.5));
  seats.push(new Seat(280, 430, 5.5));
  seats.push(new Seat(245, 520, 5.5));
  seats.push(new Seat(280, 520, 5.5));
  var tempoSeats = [seats[26], seats[27], seats[28], seats[29]];
  tables.push(new Table(tempoSeats));

  seats.push(new Seat(245, 580, 5.5));
  seats.push(new Seat(280, 580, 5.5));
  seats.push(new Seat(245, 670, 5.5));
  seats.push(new Seat(280, 670, 5.5));
  var tempoSeats = [seats[30], seats[31], seats[32], seats[33]];
  tables.push(new Table(tempoSeats));

  seats.push(new Seat(380, 555, 5.5));
  seats.push(new Seat(380, 595, 5.5));
  seats.push(new Seat(380, 635, 5.5));
  seats.push(new Seat(480, 555, 5.5));
  seats.push(new Seat(480, 595, 5.5));
  seats.push(new Seat(480, 635, 5.5));
  var tempoSeats = [
    seats[34],
    seats[35],
    seats[36],
    seats[37],
    seats[38],
    seats[39],
  ];
  tables.push(new Table(tempoSeats));

  //Tables intérieurs centre
  seats.push(new Seat(525, 230, 5.5));
  seats.push(new Seat(560, 230, 5.5));
  seats.push(new Seat(525, 320, 5.5));
  seats.push(new Seat(560, 320, 5.5));
  var tempoSeats = [seats[40], seats[41], seats[42], seats[43]];
  tables.push(new Table(tempoSeats));

  seats.push(new Seat(675, 230, 5.5));
  seats.push(new Seat(710, 230, 5.5));
  seats.push(new Seat(675, 320, 5.5));
  seats.push(new Seat(710, 320, 5.5));
  var tempoSeats = [seats[44], seats[45], seats[46], seats[47]];
  tables.push(new Table(tempoSeats));

  seats.push(new Seat(825, 230, 5.5));
  seats.push(new Seat(860, 230, 5.5));
  seats.push(new Seat(825, 320, 5.5));
  seats.push(new Seat(860, 320, 5.5));
  var tempoSeats = [seats[48], seats[49], seats[50], seats[51]];
  tables.push(new Table(tempoSeats));

  seats.push(new Seat(1025, 230, 5.5));
  seats.push(new Seat(1060, 230, 5.5));
  seats.push(new Seat(1025, 320, 5.5));
  seats.push(new Seat(1060, 320, 5.5));
  var tempoSeats = [seats[52], seats[53], seats[54], seats[55]];
  tables.push(new Table(tempoSeats));

  seats.push(new Seat(1175, 230, 5.5));
  seats.push(new Seat(1210, 230, 5.5));
  seats.push(new Seat(1175, 320, 5.5));
  seats.push(new Seat(1210, 320, 5.5));
  var tempoSeats = [seats[56], seats[57], seats[58], seats[59]];
  tables.push(new Table(tempoSeats));

  seats.push(new Seat(575, 395, 5.5));
  seats.push(new Seat(575, 485, 5.5));
  seats.push(new Seat(610, 395, 5.5));
  seats.push(new Seat(610, 485, 5.5));
  var tempoSeats = [seats[60], seats[61], seats[62], seats[63]];
  tables.push(new Table(tempoSeats));

  seats.push(new Seat(725, 395, 5.5));
  seats.push(new Seat(725, 485, 5.5));
  seats.push(new Seat(760, 395, 5.5));
  seats.push(new Seat(760, 485, 5.5));
  var tempoSeats = [seats[64], seats[65], seats[66], seats[67]];
  tables.push(new Table(tempoSeats));

  //tables intérieurs côté droit
  seats.push(new Seat(1130, 405, 5.5));
  seats.push(new Seat(1130, 445, 5.5));
  seats.push(new Seat(1130, 485, 5.5));

  seats.push(new Seat(1230, 405, 5.5));
  seats.push(new Seat(1230, 445, 5.5));
  seats.push(new Seat(1230, 485, 5.5));

  // seats.push(new Seat(100, 100, 5.5));


  var tempoSeats = [
    seats[68],
    seats[69],
    seats[70],
    seats[71],
    seats[72],
    seats[73],
  ];
  tables.push(new Table(tempoSeats));
}

class Couloir {
  constructor(a1, a2, a3, a4) {
    this.x1 = a1;
    this.y1 = a2;
    this.x2 = a3;
    this.y2 = a4;
  }
  Draw(context) {
    context.beginPath();
    context.lineWidth = '1';
    context.strokeStyle = 'DarkGray';
    context.moveTo(this.x1, this.y1);
    context.lineTo(this.x2, this.y2);
    context.stroke();
  }
}

var couloirs = [];

// couloirs.push(new Couloir(100, 50, 100, 800));
// couloirs.push(new Couloir(100, 50, 1500, 50));
// couloirs.push(new Couloir(350, 50, 350, 700));
// couloirs.push(new Couloir(350, 700, 500, 700));
// couloirs.push(new Couloir(350, 350, 1300, 350));
// couloirs.push(new Couloir(1280, 350, 1280, 500));
// couloirs.push(new Couloir(920, 250, 920, 700));
// couloirs.push(new Couloir(600, 200, 600, 400));
// couloirs.push(new Couloir(780, 200, 780, 400));

class Particle {
  constructor(x, y, type, table, index1) {
    this.index = index1;
    this.table = table;
    this.x = x;
    this.y = y;
    this.radius = 6;
    this.color = '#1803ff';
    this.extColor = this.color;
    this.isInBackPath = false;
    this.exist = true;
    this.avoiding = false;
    this.mask = false;
    this.DesinfectedHands = false;
    this.authorizedDisplacement = false;


    this.infectWaiterOnClick = false;



    this.status = STATUSES.HEALTHY;
    this.mask = false;


    this.r0 = R0;


    this.newInfected = false;

    if(Math.random() < (PERCANTAGE_OF_MASK / 100)){
      this.wearMask();
    }


    if(Math.random() < parseFloat(vaccinated) / 100){
      this.status = STATUSES.VACCIN;
      this.color = '#00BFFF';
      this.extColor = '#00BFFF';
    }



    //this.speed = Math.random() < STAY_AT_HOME ? 0 : 0.4;

    this.speed = SPEED; //A REDUIRE A 0.5

    // if(Math.random() < Desinfection){
    //   this.DesinfectedHands = true;
    // }

    this.seated = false;
    this.returnHome = false;
    if (table !== undefined) {
      // for (var p = 0; p < tables[table].seatss.length; p++) {
      var countWhile = 0;
      while(!this.seated){
        countWhile += 1;
        var p = getRandomInt(tables[table].seatss.length);
        if (!tables[table].seatss[p].isOccuped && !this.seated) {
          this.seated = true;      
          this.SeatNumber = p;
          tables[table].seatss[p].isOccuped = true;
          this.SeatX = tables[table].seatss[p].x1;
          this.SeatY = tables[table].seatss[p].y1;
          // console.log(this.SeatX + ',' + this.SeatY);
        }
        if(countWhile > 20){
          break
        }
      }
    }

    //CHECKPOINT DEFINITION FOR EVERY TABLE
    this.checkpoint1 = false;
    this.checkpoint2 = false;
    this.checkpoint3 = false;
    this.checkpoint4 = false;

    this.goto4 = false;
    this.goto3 = false;
    this.goto2 = false;
    this.goto1 = false;
    this.backHome = false;

    this.passedCheck4 = false;
    this.passedCheck3 = false;
    this.passedCheck2 = false;
    this.passedCheck1 = false;

    if (
      this.table === 0 ||
      this.table === 1 ||
      this.table === 2 ||
      this.table === 3
    ) {
      this.check1X = this.SeatX;
      this.check1Y = 40 + getRandomInt(20);
      this.checkpoint1 = true;
    }

    if (this.table === 4 || this.table === 5 || this.table === 6) {
      this.check1X = 80 + getRandomInt(20);
      this.check1Y = this.SeatY;
      this.checkpoint1 = true;
    }

    if(this.table >= 7){
      this.checkpoint1 = true;
      this.check1X = 340 + getRandomInt(60);
      this.check1Y = 180 + getRandomInt(40);
      if(this.table === 7 || this.table === 8 || this.table === 9) {
        this.checkpoint2 = true;
        this.check2X = 320 + getRandomInt(30);
        this.check2Y = this.SeatY;
      }
      else if(this.table === 10){
        this.checkpoint2 = true;
        if(this.SeatX < 400){
          this.check2X = 360;
          this.check2Y = 480;
        }
        else{
          this.check2X = 460;
          this.check2Y = 480;
        }
      }
      else{
        this.checkpoint2 = true;
        this.check2X = 430 + getRandomInt(30);
        this.check2Y = 370 + getRandomInt(30);
      }
      if(this.table >= 11 && this.table <=15){
        this.checkpoint3 = true;
        if(this.table === 11 || this.table === 12){
          this.check3X = 600;
        }
        if(this.table === 13 || this.table === 14){
          this.check3X = 920;
        }
        if(this.table === 15){
          this.check3X = 1110;
        }
        this.check3Y = 340;
        if(this.SeatY < 300){
          this.checkpoint4 = true;
          this.check4X = this.check3X;
          this.check4Y = 230;
        }
      }
      if(this.table === 16 || this.table === 17){
        this.checkpoint3 = true;
        this.check3X = 660;
        this.check3Y = 360;
        if(this.SeatY > 400){
          this.checkpoint4 = true;
          this.check4X = 660;
          this.check4Y = 470;
        }
      }
      if(this.table === 18){
        this.checkpoint3 = true;
        this.check3X = 1000;
        this.check3Y = 355;
        if(this.SeatX > 1150){
          this.checkpoint4 = true;
          this.check4X = 1250;
          this.check4Y = 355;
        } 
      }
    }
    //END OF CHECKPOINT DEFINITION


    if (type === 0) {
      this.type = PARTICLE_TYPE.WAITER;
      this.color = '#8c0509';
      this.extColor = this.color;
      this.local_displacement = true;
      this.startx = this.x;
      this.starty = this.y;
      this.speed = 0;
      this.authorizedDisplacement = false;

      this.waiterDoAgain = false;

      if(maskwaiter || maskwaiter === 'true'){
        this.wearMask();
      }
    }
    if (type === 1) {
      this.type = PARTICLE_TYPE.CLIENT;
      this.authorizedDisplacement = true;
    }

    this.vector = {
      x: 0,
      y: 0
    };



    if (ONLY_ONE_INFECTED && !ok && !this.local_displacement) {
      this.infect(false);
      ok = true;
    }
    if (Math.random() < NUMBER_INFECTED_START && !ONLY_ONE_INFECTED && this.type !== PARTICLE_TYPE.WAITER) {
      this.infect(false);
      this.newInfected = false;
    }
    if(type === 2){
      this.type = PARTICLE_TYPE.CLIENT;
      this.infect(false);
      this.newInfected = false;
    }

    if (this.checkpoint1) {
      this.check1 = setInterval(() => {
        this.goToSeat(this.check1X, this.check1Y);
      }, 2000);
    } else {
      this.gotoseat = setInterval(() => {
        this.goToSeat(this.SeatX, this.SeatY);
      }, 2000);
    }



    if(this.type = PARTICLE_TYPE.WAITER){
      this.waiterMove = setInterval(() => {
        var rand = Math.random();
        var tempoIndex = -1;
        if(rand <= 0.33 ){
          tempoIndex = 0;
          this.waiterCheckX = [1200];
          this.waiterCheckY = [650]; 
        }
        if(rand > 0.33 && rand <= 0.66){
          tempoIndex = 1;
          this.waiterCheckX = [1250];
          this.waiterCheckY = [650]; 
        }
        if(rand > 0.66){
          tempoIndex = 2;
          this.waiterCheckX = [1150];
          this.waiterCheckY = [650]; 
        }
        if(this.index === tempoIndex){

          if(Math.random() <= 0.5){
            this.waiterCheck1 = true;
            this.waiterCheck2a1 = false;
            this.waiterCheck2a2 = false;
            this.waiterCheck3 = false;
            this.waiterCheck4a1 = false;
            this.waiterCheck4a2 = false;
            this.waiterCheck5a1 = false;
            this.waiterCheck5a2 = false;
            this.waiterCheck6 = false;

            this.wait2sec = true;
            this.showInfo = true;
            this.waiterReturnHome = false;
            this.lastcheck = true;


            this.local_displacement = false;
            this.authorizedDisplacement = true;
            console.log("Waiter " + this.index + " is allowed to move")
          }
        }
      }, 10000);
    }

    // this.gotoseat = setInterval(() => {
    //   this.goToSeat();
    // }, 5000);

    //Clear interval
    //clearInterval(this.gotoseat);
  }


  infect(new1) {
    if (
      this.status === STATUSES.INFECTED ||
      this.status === STATUSES.RECOVERED ||
      this.status === STATUSES.DEATH ||
      this.status === STATUSES.VACCIN
    ) {
      return;
    }

    if(!this.infectWaiterOnClick){


      if(new1){
        this.newInfected = true;
      }

      if(this.mask === false){
        this.color = "#53ff03";
        this.extColor = this.color;
      }
      if(this.mask === true){
        this.color = "#53ff03";
        this.extColor = '#ff0353';
      }
      if(new1){
        this.color = "#003300"
        this.extColor = this.color;
      }
    }
    else if(this.infectWaiterOnClick){
      this.color = "#53ff03";
      if(this.mask){
        this.extColor = '#ff0353';
      }
      else{this.extColor = "#8c0509"}
      this.newInfected = false;
    }

    if(new1){
      console.log("Une nouvelle particule à été infecté")
      countingInfectedForOutput += 1;
    }
    else{
      console.log("Une particule infectée est entrée")
      countingEntryInfectedForOutput += 1;
    }

    this.status = STATUSES.INFECTED;
    numberInfected += 1;

    document.getElementById('nbInfected').value = countingInfectedForOutput;
    document.getElementById('nbInfected2').value = countingEntryInfectedForOutput;
    document.getElementById('nbInfected3').value = countingInfectedForOutput + countingEntryInfectedForOutput;
    document.getElementById('nbInfectedAfter').value = (countingInfectedForOutput * R0).toFixed(2);
    document.getElementById('deathAfter').value = ((countingInfectedForOutput + countingEntryInfectedForOutput) * lethal).toFixed(2);
  }

  wearMask() {
    this.extColor = '#ff0353';
    this.mask = true;
    if(this.type === PARTICLE_TYPE.WAITER){
      this.color = '#ff0353';
    }
  }

  draw(drawCtx) {
    drawCtx.beginPath();
    drawCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    drawCtx.closePath();
    drawCtx.fillStyle = this.color;
    drawCtx.fill();
    drawCtx.strokeStyle = this.extColor;
    drawCtx.stroke();
  }

  update() {

    //Button disabled and enabled 
    var button = document.getElementById('button1');
    var button1 = document.getElementById('button2')

    var randomWaiter1 = Math.floor(Math.random() * 4);  


    if(infectOne){
      button.disabled = true;
    }
    if(!infectOne){
      button.disabled = false;
    }
    if(infectOneWaiter){
      button1.disabled = true;
    }
    if(!infectOneWaiter){
      button1.disabled = false;
    }

    if(infectOneWaiter){
      if(this.index === randomWaiter1){
        if(this.status === STATUSES.HEALTHY){
          this.infectWaiterOnClick = true;
          this.infect();
          infectOneWaiter = false;
        }
      }
    }

    this.x1 = this.x - this.radius / 2 - 1;
    this.y1 = this.y - this.radius / 2 - 1;
    this.width = this.radius + 1;
    this.height = this.radius + 1;



    if (closeToSeat(this) && !this.returnHome && this.type !== PARTICLE_TYPE.WAITER) {
      this.goToSeat(this.SeatX, this.SeatY);
    }



  //Waiter checkpoint and movement

  if(this.index >= 0 && this.index <= 2){
    if(this.waiterCheck1){
      this.speed = SPEED;
      clearInterval(this.waiterMove);

      this.goToSeat(970 + getRandomInt(10), 565 + getRandomInt(10));

      this.checkwaiter1 = setInterval(() => {
        this.goToSeat(970 + getRandomInt(10), 565 + getRandomInt(10));
      }, 2000);


      if(this.x > 969 && this.x < 981 && this.y > 564 && this.y < 576){
        this.waiterCheckX.push(975);
        this.waiterCheckY.push(570);

        clearInterval(this.checkwaiter1);
        this.waiterCheck1 = false;
        console.log("waiter" + this.index + " passed check1");

        if(Math.random() < 0.5){
          console.log("Waiter " + this.index + " is going to checkwaiter2-1");
          this.waiterCheck2a1 = true; 
        }else{
          console.log("Waiter " + this.index + " is going to checkwaiter2-2");
          this.waiterCheck2a2 = true;
        }
      }
    }

    if(this.waiterCheck2a1){
      this.goToSeat(1060 + getRandomInt(10), 360 + getRandomInt(10));

      this.checkwaiter2a1 = setInterval(() => {
        this.goToSeat(1060 + getRandomInt(10), 360 + getRandomInt(10));
      }, 2000);
    }

    if(this.waiterCheck2a2){
      this.goToSeat(800 + getRandomInt(10), 350 + getRandomInt(10));


      this.checkwaiter2a2 = setInterval(() => {
        this.goToSeat(800 + getRandomInt(10), 350 + getRandomInt(10));
      }, 2000);
    }

    if(this.waiterCheck2a1 || this.waiterCheck2a2){
      if((this.x > 1060 && this.y < 1070 && this.y > 360 && this.y < 370)
          || (this.x > 800 && this.x < 810 && this.y > 350 && this.y < 360)){
        clearInterval(this.checkwaiter2a1)
        clearInterval(this.checkwaiter2a2)
        this.waiterCheck2a1 = false;
        this.waiterCheck2a2 = false;
        // console.log("Waiter " + this.index + " is going to checkwaiter3");

        this.waiterCheckX.push(805);
        this.waiterCheckY.push(355);

        this.waiterCheck3 = true;

      }
    }

    if(this.waiterCheck3){

      this.goToSeat(370 + getRandomInt(10), 360 + getRandomInt(10));


      this.checkwaiter3 = setInterval(() => {
        this.goToSeat(370 + getRandomInt(10), 360 + getRandomInt(10));
      }, 2000);


      if(this.x > 370 && this.x < 380 && this.y > 360 && this.y < 370){
        clearInterval(this.checkwaiter3);
        this.waiterCheck3 = false;
        this.waiterCheckX.push(375);
        this.waiterCheckY.push(365);
        console.log("waiter" + this.index + " passed check3");

        if(Math.random() < 0.4){
          console.log("Waiter " + this.index + " is going to checkwaiter4-1");
          this.waiterCheck4a1 = true; 
        }else{
          console.log("Waiter " + this.index + " is going to checkwaiter4-2");
          this.waiterCheck4a2 = true;
        }
      }
    }

    if(this.waiterCheck4a1){
      this.goToSeat(330 + getRandomInt(10), 550 + getRandomInt(10));


      this.checkwaiter4a1 = setInterval(() => {
        this.goToSeat(330 + getRandomInt(10), 550 + getRandomInt(10));
      }, 2000);
    }

    if(this.waiterCheck4a2){
      this.goToSeat(340 + getRandomInt(10), 70 + getRandomInt(10));


      this.checkwaiter4a2 = setInterval(() => {
        this.goToSeat(340 + getRandomInt(10), 70 + getRandomInt(10));
      }, 2000);
    }

    if(this.waiterCheck4a1 || this.waiterCheck4a2){
      if(this.x > 330 && this.x < 340 && this.y > 550 && this.y < 560){
        console.log("waiter" + this.index + " passed check4-1");

        clearInterval(this.checkwaiter4a1)
        this.waiterCheck4a1 = false;

        this.waiterReturnHome = true;

      }
      if(this.x > 340 && this.x < 350 && this.y > 70 && this.y < 80){
        clearInterval(this.checkwaiter4a2)
        this.waiterCheck4a2 = false;
        console.log("waiter" + this.index + " passed check4-2");

        this.waiterCheckX.push(345);
        this.waiterCheckY.push(75);

        if(Math.random() < 0.5){
          this.waiterCheck5a1 = true; 
          console.log("waiter" + this.index + " going to check5-1");

        }else{
          this.waiterCheck5a2 = true;
          console.log("waiter" + this.index + " going to check5-2");

          this.tempoWaiterIndex = getRandomInt(4);

        }
      }
    }

    if(this.waiterCheck5a1){
      this.goToSeat(70 + getRandomInt(10), 180 + getRandomInt(10));


      this.checkwaiter5a1 = setInterval(() => {
        this.goToSeat(70 + getRandomInt(10), 180 + getRandomInt(10));
      }, 2000);

      if(this.x > 70 && this.x < 80 && this.y > 180 && this.y < 190){
        console.log("waiter" + this.index + " passed check5-1");
        this.waiterCheckX.push(75);
        this.waiterCheckY.push(185);

        clearInterval(this.checkwaiter5a1);        
        this.waiterCheck5a1 = false;
        this.tempoWaiterIndex2 = getRandomInt(2);
        this.waiterCheck6 = true;
      }
    }

    if(this.waiterCheck5a2){
      //x :
      //510
      //720
      //920
      //1120
      //4 tables
      if(this.tempoWaiterIndex === 0){
        this.goToSeat(510 + getRandomInt(10), 50 + getRandomInt(10));

        this.checkwaiter5a2 = setInterval(() => {
          this.goToSeat(510 + getRandomInt(10), 50 + getRandomInt(10));
        }, 2000);

        if(this.x > 510 && this.x < 520 && this.y > 50 && this.y < 60){
          this.waiterCheck5a2 = false;
          clearInterval(this.checkwaiter5a2);
          this.waiterReturnHome = true;

          console.log("waiter" + this.index + " passed check5-2-1");

        }
      }
      if(this.tempoWaiterIndex === 1){
        this.goToSeat(720 + getRandomInt(10), 50 + getRandomInt(10));


        this.checkwaiter5a2 = setInterval(() => {
          this.goToSeat(720 + getRandomInt(10), 50 + getRandomInt(10));
        }, 2000);
        if(this.x > 720 && this.x < 730 && this.y > 50 && this.y < 60){
          this.waiterCheck5a2 = false;
          clearInterval(this.checkwaiter5a2);
          this.waiterReturnHome = true;

          console.log("waiter" + this.index + " passed check5-2-2");

        }

      }
      if(this.tempoWaiterIndex === 2){
        this.goToSeat(920 + getRandomInt(10), 50 + getRandomInt(10));


        this.checkwaiter5a2 = setInterval(() => {
          this.goToSeat(920 + getRandomInt(10), 50 + getRandomInt(10));
        }, 2000);

        if(this.x > 920 && this.x < 930 && this.y > 50 && this.y < 60){
          this.waiterCheck5a2 = false;
          clearInterval(this.checkwaiter5a2);
          this.waiterReturnHome = true;

          console.log("waiter" + this.index + " passed check5-2-3");         

        }

      }
      if(this.tempoWaiterIndex === 3){
        this.goToSeat(1120 + getRandomInt(10), 50 + getRandomInt(10));


        this.checkwaiter5a2 = setInterval(() => {
          this.goToSeat(1120 + getRandomInt(10), 50 + getRandomInt(10));
        }, 2000);
        if(this.x > 1120 && this.x < 1130 && this.y > 50 && this.y < 60){
          this.waiterCheck5a2 = false;
          clearInterval(this. checkwaiter5a2);
          this.waiterReturnHome = true;

          console.log("waiter" + this.index + " passed check5-2-4");
        }
      }
    }


    if(this.waiterCheck6){
      //3 tables possibles et retour

      if(this.tempoWaiterIndex2 === 0){
        this.goToSeat(80 + getRandomInt(10), 270 + getRandomInt(10));


        this.checkwaiter6 = setInterval(() => {
          this.goToSeat(80 + getRandomInt(10), 270 + getRandomInt(10));
        }, 2000);

        if(this.x > 80 && this.x < 90 && this.y > 270 && this.y < 280){
          this.waiterCheck6 = false;
          clearInterval(this.checkwaiter6);
          this.waiterReturnHome = true;

          console.log("waiter" + this.index + " passed check6-1");                  
        }
      }
      if(this.tempoWaiterIndex2 === 1){
        this.goToSeat(80 + getRandomInt(10), 420 + getRandomInt(10));      

        this.checkwaiter6 = setInterval(() => {
          this.goToSeat(80 + getRandomInt(10), 420 + getRandomInt(10));
        }, 2000);

        if(this.x > 80 && this.x < 90 && this.y > 420 && this.y < 430){
          this.waiterCheck6 = false;
          clearInterval(this.checkwaiter6);
          this.waiterReturnHome = true;

          console.log("waiter" + this.index + " passed check6-2");    
             
        }
      }
      if(this.tempoWaiterIndex2 === 2){
        this.goToSeat(80 + getRandomInt(10), 570 + getRandomInt(10));

        this.checkwaiter6 = setInterval(() => {
          this.goToSeat(80 + getRandomInt(10), 570 + getRandomInt(10));
        }, 2000);

        if(this.x > 80 && this.x < 90 && this.y > 570 && this.y < 580){
          this.waiterCheck6 = false;
          clearInterval(this.checkwaiter6);
          this.waiterReturnHome = true;

          console.log("waiter" + this.index + " passed check6-3");    

        }
      }
    }

    if(this.waiterReturnHome){

      if(this.showInfo){
        this.showInfo = false;
        console.log("returning home with thoses info")
        console.log(this.waiterCheckX)
        console.log(this.waiterCheckY)
      }

      //   setTimeout(() =>{
      //     this.wait2sec = false;
      //   }, 5000)
      // }

      // if(this.wait2sec){
      //   this.speed = 0.000001;
      // }
      this.wait2sec = false;

      if(!this.wait2sec){
        this.speed = SPEED;
        this.indexX = this.waiterCheckX.length - 1
        this.indexY = this.waiterCheckY.length - 1;

        if(this.indexX >= 0){
          this.goToSeat(this.waiterCheckX[this.indexX], this.waiterCheckY[this.indexY]);

          if(this.x > this.waiterCheckX[this.indexX] - 5 && this.x < this.waiterCheckX[this.indexX] + 5 && this.y > this.waiterCheckY[this.indexY] - 5 && this.y < this.waiterCheckY[this.indexY] + 5){
            console.log("Waiter " + this.index + " is going back home, steps to do : " + this.indexX)
            this.waiterCheckX.pop();
            this.waiterCheckY.pop();
          }
        }
        else if(this.lastcheck && this.indexX < 0){
          this.lastcheck = false;
          this.waiterReturnHome = false;
          this.speed = 0;
          this.waiterDoAgain = true;


        }   
      }
    }

  if(this.waiterDoAgain){
    this.waiterDoAgain = false;

    setTimeout(() => {
    var rand3 = Math.random();
    var tempoIndex3 = -1;
    if(rand3 <= 0.33 ){
      tempoIndex3 = 0;
      this.waiterCheckX = [1200];
      this.waiterCheckY = [650]; 
    }
    if(rand3 > 0.33 && rand3 <= 0.66){
      tempoIndex3 = 1;
      this.waiterCheckX = [1250];
      this.waiterCheckY = [650]; 
    }
    if(rand3 > 0.66){
      tempoIndex3 = 2;
      this.waiterCheckX = [1150];
      this.waiterCheckY = [650]; 
    }
    if(this.index === tempoIndex3){

      if(Math.random() <= 0.5){
        this.speed = SPEED;
        this.waiterCheck1 = true;
        this.waiterCheck2a1 = false;
        this.waiterCheck2a2 = false;
        this.waiterCheck3 = false;
        this.waiterCheck4a1 = false;
        this.waiterCheck4a2 = false;
        this.waiterCheck5a1 = false;
        this.waiterCheck5a2 = false;
        this.waiterCheck6 = false;

        this.wait2sec = true;
        this.showInfo = true;
        this.waiterReturnHome = false;
        this.lastcheck = true;


        this.local_displacement = false;
        this.authorizedDisplacement = true;
        console.log("Waiter " + this.index + " is allowed to move")
      } 
    }
    }, 10000); 
  }
}




    this.checkColision();
    this.checkBoundaries();
    if(this.status===STATUSES.INFECTED){
      this.checkInfect();
    }


    // //Infection de la table 
    // if(this.status === STATUSES.INFECTED && !newInfected && !tableDesin){
    //   var tableInfected = [];
    //     if(!this.DesinfectedHands){
    //       if(Math.random() < ){
    //         tableInfected.push(table);        //VERIFY RISK OF CONTAMINE TABLE
    //       }
    //     }
    //   }
    // }

    // particle.forEach(part => {
    //   tableInfected.forEach(tableInfected2 =>{
    //     if(part.table === tableInfected2){
    //       if(Math.random() < 0.05){           //VERIFIY RISK OF GETTING COVID OVER INFECTED TABLE
    //         part.infect(true);
    //       }
    //       var tabletoRemove = tableInfected2;
    //     }
    //   })
    //   var indexof = tableInfected.indexof(tabletoRemove);
    //   if(indexof > -1){
    //     tableInfected.splice(indexof, 1);
    //   }
    // });





    //Fin Checkpoint1
    if (this.checkpoint1 && !this.returnHome) {
      if (
        this.x > this.check1X - 10 &&
        this.x < this.check1X + 10 &&
        this.y > this.check1Y - 10 &&
        this.y < this.check1Y + 10
      ) {
        clearInterval(this.check1);
        clearInterval(this.gotoseat);
        this.checkpoint1 = false;

        if (!this.checkpoint2) {  
          this.goToSeat(this.SeatX, this.SeatY);

          this.gotoseat = setInterval(() => {
            this.goToSeat(this.SeatX, this.SeatY);
          }, 2000);
        } else if (this.checkpoint2) {
          this.goToSeat(this.check2X, this.check2Y);

          this.chckp2 = setInterval(() => {
            this.goToSeat(this.check2X, this.check2Y);
          }, 2000);
        }
      }
    }

    //Fin checkpoint2
    if (this.checkpoint2 && !this.checkpoint1 && !this.returnHome) {
      if (
        this.x > this.check2X - 10 &&
        this.x < this.check2X + 10 &&
        this.y > this.check2Y - 10 &&
        this.y < this.check2Y + 10
      ) {
        clearInterval(this.chckp2);
        this.checkpoint2 = false;


        if (!this.checkpoint3) {  
          this.goToSeat(this.SeatX, this.SeatY);

          this.gotoseat = setInterval(() => {
            this.goToSeat(this.SeatX, this.SeatY);
          }, 2000);
        } else if (this.checkpoint3) {
          this.goToSeat(this.check3X, this.check3Y);

          this.chckp3 = setInterval(() => {
            this.goToSeat(this.check3X, this.check3Y);
          }, 2000);
        }
      }
    }

    //Fin check3
    if (this.checkpoint3 && !this.checkpoint2 && !this.returnHome) {
      if (
        this.x > this.check3X - 5 &&
        this.x < this.check3X + 5 &&
        this.y > this.check3Y - 5 &&
        this.y < this.check3Y + 5
      ) {
        clearInterval(this.chckp3);
        this.checkpoint3 = false;

        if (!this.checkpoint4) {  
          this.goToSeat(this.SeatX, this.SeatY);

          this.gotoseat = setInterval(() => {
            this.goToSeat(this.SeatX, this.SeatY);
          }, 2000);
        } else if (this.checkpoint4) {
          this.goToSeat(this.check4X, this.check4Y);
          this.chckp4 = setInterval(() => {
            this.goToSeat(this.check4X, this.check4Y);
          }, 2000);
        }
      }
    }

    //Fin check4
    if (this.checkpoint4 && !this.checkpoint3 && !this.returnHome) {
      if (
        this.x > this.check4X - 2 &&
        this.x < this.check4X + 2 &&
        this.y > this.check4Y - 2 &&
        this.y < this.check4Y + 2
      ) {
        clearInterval(this.chckp4);
        this.checkpoint4 = false;


        this.goToSeat(this.SeatX, this.SeatY);

        this.gotoseat = setInterval(() => {
          this.goToSeat(this.SeatX, this.SeatY);
        }, 2000);
      }
    }

    //Arrivé au bout !
    if (
      this.x > this.SeatX - 2 &&
      this.x < this.SeatX + 2 &&
      this.y > this.SeatY - 2 &&
      this.y < this.SeatY + 2
    ) {
      clearInterval(this.gotoseat);
      if(!this.returnHome){
        this.speed = 0;
        this.vector.x = 0;
        this.vector.y = 0;
      }
      this.return = setTimeout(() => {
        this.isInBackPath = true;
        this.SeatX = 0;
        this.SeatY = 0;
        this.returnHome = true;
        tables[this.table].isOccupedd = false;
        tables[this.table].seatss[this.SeatNumber].isOccuped = false;
      }, 30000+getRandomInt(40000));
    }


    //Return to point of start
    if(this.returnHome){
      // this.color = "Chartreuse"; //Juste visuel
      this.speed = SPEED;

    // console.log(    
    // this.checkpoint1 + "\n" +
    // this.checkpoint2 + "\n" +
    // this.checkpoint3 + "\n" +
    // this.checkpoint4 + "\n" +
    // this.goto4 + "\n" +
    // this.goto3 + "\n" +
    // this.goto2 + "\n" +
    // this.goto1 + "\n" +
    // this.backHome + "\n" +
    // this.passedCheck4 + "\n" +
    // this.passedCheck3 + "\n" +
    // this.passedCheck2 + "\n" +
    // this.passedCheck1 + "\n");

      if(this.check4X !== undefined){
        if(!this.checkpoint4 && !this.goto3 && !this.passedCheck4){
          // console.log("Hey check4");
          this.goto4 = true;
          this.checkpoint4 = true;
          this.goToSeat(this.check4X, this.check4Y);
          this.back4 = setInterval(() => {
            this.goToSeat(this.check4X, this.check4Y);
          }, 2000);
        }
        if(this.checkpoint4 && !this.checkpoint3 && !this.passedCheck4){
          if(this.x > this.check4X - 2 && this.x < this.check4X + 2 && this.y > this.check4Y -2 && this.y < this.check4Y + 2 && this.goto4){
            // console.log("Hey check4-2");
            this.passedCheck4 = true;

            clearInterval(this.back4);              
            this.goto3 = true;
            this.checkpoint4 = false;
            this.checkpoint3 = true;
            this.goto4 = false;     
            
            this.goToSeat(this.check3X, this.check3Y);
            this.back3 = setInterval(() => {
              this.goToSeat(this.check3X, this.check3Y);
            }, 2000);       
          }
        }
      }

      if(this.check3X !== undefined){
          if(!this.checkpoint3 && !this.checkpoint4 && !this.goto2 && !this.passedCheck3){
            // console.log("Hey check3")
            this.goto3 = true;
            this.checkpoint3 = true;

            this.goToSeat(this.check3X, this.check3Y);
            this.back3 = setInterval(() => {
              this.goToSeat(this.check3X, this.check3Y);
            }, 2000);
          }
          if(this.checkpoint3 && !this.checkpoint2 && !this.passedCheck3){
            if(this.x > this.check3X - 2 && this.x < this.check3X + 2 && this.y > this.check3Y -2 && this.y < this.check3Y + 2 && this.goto3){
              // console.log("Hey check3-2")
              this.passedCheck3 = true;

              clearInterval(this.back3);
              this.goto2 = true;
              this.goto3 = false;
              this.checkpoint2 = true;
              this.checkpoint3 = false;
              
              this.goToSeat(this.check2X, this.check2Y);
              this.back2 = setInterval(() => {
                this.goToSeat(this.check2X, this.check2Y);
              }, 2000);
            }
          }
      }

      if(this.check2X !== undefined){
          if(!this.checkpoint2 && !this.checkpoint3 &&!this.checkpoint4 && !this.goto1 && !this.backHome && !this.passedCheck2){
            // console.log("Hey check2")

            this.goto2 = true;
            this.checkpoint2 = true;
            
            this.goToSeat(this.check2X, this.check2Y);                       
            this.back2 = setInterval(() => {
                this.goToSeat(this.check2X, this.check2Y);
              }, 2000);
          }
          if(this.checkpoint2 && !this.checkpoint1){
            if(this.x > this.check2X - 10 && this.x < this.check2X + 10 && this.y > this.check2Y - 10 && this.y < this.check2Y + 10 && this.goto2 && !this.passedCheck2){
              // console.log("Hey check2-2")
              this.passedCheck2 = true;

              clearInterval(this.back2);
              this.goto2 = false;
              this.goto1 = true;
              this.checkpoint1 = true;
              this.checkpoint2 = false;
              
              this.goToSeat(this.check1X, this.check1Y);
              this.back1 = setInterval(() => {
                this.goToSeat(this.check1X, this.check1Y);
              }, 2000);
            }
          }
      }

      if(this.check1X !== undefined){
          if(!this.checkpoint1 && !this.checkpoint2 && !this.checkpoint3 && !this.checkpoint4 && !this.backHome && !this.passedCheck1){
            // console.log("Hey check1")
            this.checkpoint1 = true;
            this.goto1 = true;

            this.goToSeat(this.check1X, this.check1Y);
            this.back1 = setInterval(() => {
              this.goToSeat(this.check1X, this.check1Y);
            }, 2000);
          }
          if(this.checkpoint1){
            if(this.x > this.check1X - 5 && this.x < this.check1X + 5 && this.y > this.check1Y - 5 && this.y < this.check1Y + 5 && this.goto1 && !this.passedCheck1){
              // console.log("Hey check1-2")
              this.passedCheck1 = true;

              clearInterval(this.back1);
              this.goto1 = false;
              this.backHome = true;
              this.checkpoint1 = false;
              this.xgoback = 200;
              if(this.table === 4 || this.table === 5 || this.table === 6){
                this.xgoback = 100;
              }
              this.goToSeat(this.xgoback,50);
              this.back = setInterval(() => {
                this.goToSeat(this.xgoback,50);
              }, 2000);
            }
          }
      }

      //Bug table 11 ?

      if(this.backHome && this.x > this.xgoback - 30 && this.x < this.xgoback + 30 && this.y > 50 - 40 && this.y < 50 + 40){
        clearInterval(this.back);
        this.speed = 0;
        this.vector.x = 0;
        this.vector.y = 0;

        if(this.exist){
          this.exist = false;

          ShiftIndex(this.index);

          console.log("Part supprimée : " + this.index);
        }
      } 
    }

    

    this.x += this.vector.x;
    this.y += this.vector.y;
  }

  checkInfect(){
    particles.forEach(part => {
      if (distance(this.x, this.y, part.x, part.y) > SAFE_DISTANCE) {
      }
      else if(distance(this.x, this.y, part.x, part.y) < SAFE_DISTANCE){
        setTimeout(() => {

          if(distance(this.x, this.y, part.x, part.y) < SAFE_DISTANCE){
            if(this.status === STATUSES.INFECTED && !this.newInfected){


              if(Math.random() < this.r0){

              if(!part.mask){ //If not wearing mask
                if(!this.mask){ //If other not wearing mask
                  if(Math.random() < 1){
                    part.infect(true);
                  }
                }
                else if(this.mask){ //if other wearing mask
                  if(Math.random() < 0.05){
                    part.infect(true);
                  }
                }
              }
                if(!part.mask){ //If other not wearing mask
                  if(Math.random() < 0.7){
                    part.infect(true);
                  }
                }
                else if(this.mask){ //if other wearing mask
                  if(Math.random() < 0.015){
                    part.infect(true);
                  }
                }

              }
              if(this.r0 >= 1){this.r0 = this.r0 - 1}
              else if(this.r0 < 1){this.r0 = 0}
            }
          }
        }, 2500 + getRandomInt(7500));
      }
    });
  }

  checkColision(){
    particles.forEach(part => {

      var radiusEvitement = 50;
      this.sameTableButNotSameGroup = false;


      //Sometimes people left table and one other group wants to go to the same table they will not avoid except with this code
      if(this.table === part.table){
        if(this.isInBackPath !== part.isInBackPath){
          this.sameTableButNotSameGroup = true;
          }
      }
      if(this.table !== part.table){this.sameTableButNotSameGroup = true} //If their table are different table --> Avoid

      if(this.avoiding){ //If already avoiding and is close from someone else better stop
        if(this.x > part.x - radiusEvitement &&
          this.x < part.x + radiusEvitement &&
          this.y > part.y - radiusEvitement &&
          this.y < part.y + radiusEvitement && 
          this.sameTableButNotSameGroup){
            this.speed = 0;
            setTimeout(() => {
              this.speed = SPEED;
            }, 250);
        }
      }


      if (
        this.x > part.x - radiusEvitement &&
        this.x < part.x + radiusEvitement &&
        this.y > part.y - radiusEvitement &&
        this.y < part.y + radiusEvitement && 
        this.sameTableButNotSameGroup
      ) {

        if(!this.avoiding && !part.avoiding){
          this.avoiding = true;
          part.avoiding = true;
          var centerX = (this.x + part.x) / 2;
          var centerY = (this.y + part.y) / 2;

          var radiusC = distance(this.x, this.y, part.x, part.y) / 2;

          //Height mesurement for inclinationRAD
          if(this.y > part.y){var height = this.y - part.y;}
          else if (this.y < part.y){var height = part.y - this.y;}
          else if(this.y === part.y){var height = radiusC * 2;}

          //Horizontal mesurement for inclinatioNRAD
          if(this.x > part.x){var horizontal = this.x - part.x;}
          else if (this.x < part.x){var horizontal = part.x - this.x;}
          else if(this.x === part.x){var horizontal = radiusC * 2;}
          
          var inclinationRAD = Math.atan(height/horizontal);
          var inclinationRADforDown = inclinationRAD + 0.65;
          //45° to rad = 0,785398
          //34,38° to rad = 0.6
          //37,24° to rad = 0.65
          //180° to rad = 3,14159
          var inclinationRADforTop = -(3.14159 - inclinationRAD - 0.65);

          var waypointPartX;
          var waypointPartY;
          var waypointThisX;
          var waypointThisY; 

          if(this.y > part.y){
            waypointPartX = centerX + (radiusC * Math.cos(inclinationRADforTop));
            waypointPartY = centerY + (radiusC * Math.sin(inclinationRADforTop));
            waypointThisX = centerX + (radiusC * Math.cos(inclinationRADforDown));
            waypointThisY = centerY + (radiusC * Math.sin(inclinationRADforDown));
          }
          else if(this.y <= part.y){
            // waypointPartX = centerX + (radiusC * Math.cos(inclinationRADforDown));
            // waypointPartY = centerY + (radiusC * Math.sin(inclinationRADforDown));
            waypointThisX = centerX + (radiusC * Math.cos(inclinationRADforTop));
            waypointThisY = centerY + (radiusC * Math.sin(inclinationRADforTop));
          }

          var thisTempoVectorX = this.vector.x;
          var thisTempoVectorY = this.vector.y;
          
          // var partTempoVectorX = part.vector.x;
          // var partTempoVectorY = part.vector.y;


          this.goToSeat(waypointThisX, waypointThisY);
          // part.goToSeat(waypointPartX, waypointPartY);

          //TESSST !!
          part.speed = 0;
          setTimeout(() => {
            part.speed = SPEED;
          }, 50);

          setTimeout(() => {
            this.vector.x = thisTempoVectorX;
            this.vector.y = thisTempoVectorY;
            // part.vector.x = partTempoVectorX;
            // part.vector.y = partTempoVectorY;
            setTimeout(() =>{
              this.avoiding = false;
              part.avoiding = false;
            }, 50);
          }, 250);
        

        }
      }
    });
  }

  checkBoundaries() {
    // if (this.local_displacement) {
    //   if (
    //     this.x > this.startx + LOCAL_DISPLACEMENT_DISTANCE ||
    //     this.x < this.startx - LOCAL_DISPLACEMENT_DISTANCE
    //   ) {
    //     this.vector.x *= -1;
    //     /* Ensure the dots are pushed inside */
    //     this.x = Math.max(0, Math.min(width, this.x));
    //   }
    //   if (
    //     this.y > this.starty + LOCAL_DISPLACEMENT_DISTANCE ||
    //     this.y < this.starty - LOCAL_DISPLACEMENT_DISTANCE
    //   ) {
    //     this.vector.y *= -1;
    //     /* Ensure the dots are pushed inside */
    //     this.y = Math.max(0, Math.min(height, this.y));
    //   }
    // }


    if (this.x > width || this.x < 0) {
      this.vector.x *= -1;
      /* Ensure the dots are pushed inside */
      this.x = Math.max(0, Math.min(width, this.x));
    }
    if (this.y > height || this.y < 0) {
      this.vector.y *= -1;
      /* Ensure the dots are pushed inside */
      this.y = Math.max(0, Math.min(height, this.y));
    }



    walls.forEach(wall => {
      if (isCollide(this, wall)) {
        if (this.y > wall.y1 && this.x > wall.x1 && this.x < wall.x2) {
          this.vector.y *= -1;
        }
        if (this.x > wall.x1 && this.y > wall.y1 && this.y < wall.y2) {
          this.vector.x *= -1;
        }
        if (this.y < wall.y2 && this.x > wall.x1 && this.x < wall.x2) {
          this.vector.y *= -1;
        }
        if (this.x < wall.x2 && this.y > wall.y1 && this.y < wall.y2) {
          this.vector.x *= -1;
        }
      }
    });
  }

  goToSeat(SeatX, SeatY) {

    if(this.type === PARTICLE_TYPE.WAITER && this.speed === 0){
      this.vector ={
        x: 0,
        y: 0
      };
    }
    else if (this.type === PARTICLE_TYPE.CLIENT || !this.local_displacement) {
      // Solution vectorielle
      if((SeatX-this.x !== 0) || (SeatY-this.y !== 0)){
        this.vecteurX = ((SeatX-this.x) / Math.sqrt((SeatX-this.x)**2 + (SeatY-this.y)**2));
        this.vecteurY = ((SeatY-this.y) / Math.sqrt((SeatX-this.x)**2 + (SeatY-this.y)**2));
      }
      else{
        this.vecteurX = (SeatX-this.x);
        this.vecteurY = (SeatY-this.y);
      }
      this.vector = {
        x: this.vecteurX * this.speed,
        y: this.vecteurY * this.speed
      };

    } else {
      this.directionAngle = Math.floor(Math.random() * 360);
      this.vector = {
        x: Math.cos(this.directionAngle) * this.speed,
        y: Math.sin(this.directionAngle) * this.speed,
      };
    }
  }
}

/* ---------------------------------- */
//Find here : http://jsfiddle.net/justin_c_rounds/Gd2S2/light/ 
function checkLineIntersection(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));
/*
        // it is worth noting that this should be the same as:
        x = line2StartX + (b * (line2EndX - line2StartX));
        y = line2StartX + (b * (line2EndY - line2StartY));
        */
    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    return result;
};

function isCollide(a, b) {
  return !(
    a.y1 + a.height < b.y1 ||
    a.y1 > b.y1 + b.height ||
    a.x1 + a.width < b.x1 ||
    a.x1 > b.x1 + b.width
  );
}

function closeToSeat(part) {
  if (
    part.x > part.SeatX - 20 &&
    part.x < part.SeatX + 20 &&
    part.y > part.SeatY - 20 &&
    part.y < part.SeatY + 20
  ) {
    return true;
  }
}

function ShiftIndex(indexTe) {
  particles.splice(indexTe,1); //Delete the particle from list

  particles.forEach(particle => { //Shift index from every particle after
     if(particle.index > indexTe){
       particle.index -= 1;
     }
  });
  indexOfPart -= 1; //Shift index for new particles
}

function distance(x1, y1, x2, y2) {
  var dx = x1 - x2;
  var dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

function linkParticles(particle, otherParticles, drawCtx) {
  // for (const p of otherParticles) {
  //   var d = distance(particle.x, particle.y, p.x, p.y);

  //   if (d > SAFE_DISTANCE) {
  //     continue;
  //   }
  //   else if(d < SAFE_DISTANCE && particle.status === STATUSES.INFECTED){


  //     // setTimeout(() => {

  //       if(d < SAFE_DISTANCE){
  //         if(particle.status === STATUSES.INFECTED && !particle.newInfected){
  //           console.log("HiHiHi")

  //           if(!p.mask){ //If not wearing mask
  //             if(!particle.mask){ //If other not wearing mask
  //               if(Math.random() < 1){
  //                 p.infect();
  //                 p.newInfected = true;
  //               }
  //             }
  //             else if(particle.mask){ //if other wearing mask
  //               if(Math.random() < 0.05){
  //                 p.infect();
  //                 p.newInfected = true;
  //               }
  //             }
  //           }
  //           if(p.mask){ //If wearing mask
  //             if(!particle.mask){ //If other not wearing mask
  //               if(Math.random() < 0.7){
  //                 p.infect();
  //                 p.newInfected = true;
  //               }
  //             }
  //             else if(particle.mask){ //if other wearing mask
  //               if(Math.random() < 0.015){
  //                 p.infect();
  //                 p.newInfected = true;
  //               }
  //             }

  //           }
  //         }
  //       }
  //     // }, 100);
  //   }

    // if (
    //   particle.status === STATUSES.INFECTED &&
    //   p.status === STATUSES.HEALTHY
    // ) {
    //   const opacity = 0.8 - (d / SAFE_DISTANCE) * 0.8;
    //   drawCtx.lineWidth = 0.7;
    //   drawCtx.strokeStyle = 'green'; //rgba(255,255,255,${opacity})`;
    //   drawCtx.globalAlpha = opacity;
    //   drawCtx.beginPath();
    //   drawCtx.moveTo(particle.x, particle.y);
    //   drawCtx.lineTo(p.x, p.y);
    //   drawCtx.closePath();
    //   drawCtx.stroke();
    //   drawCtx.globalAlpha = 1;
    // }
  // }
}

/* ---------------------------------- */

function render() {
  try {
    requestAnimationFrame(render);

    ctx.clearRect(0, 0, width, height);

    walls.forEach(wall => {
      wall.Draw(ctx);
    });

    seats.forEach(seat => {
      seat.Draw(ctx);
    });

    couloirs.forEach(coul => {
      coul.Draw(ctx);
    });

    particles.forEach(particle => {
      if(PAUSE){
        particle.draw(ctx);
        return;
      }
      else{
        particle.update();
        if (particle.status === STATUSES.INFECTED) {
          linkParticles(particle, particles, ctx);
        }
        particle.draw(ctx);
      }
    });
  } catch (e) {
    throw e;
  }
}

render();

/* ---------------------------------- */


var indexOfPart = 3;
function reset(a) {
  if(PAUSE){
    return;
  }
  else{
    if (particles.length < PARTICLE_COUNT) {
      if (a === 1) {
        particles = [];
        //3 Serveurs
        particles.push(new Particle(1200, 650, 0, undefined, 0));
        particles.push(new Particle(1250, 650, 0, undefined, 1));
        particles.push(new Particle(1150, 650, 0, undefined, 2));
        dataParticlesTotal = 3;
      }

      var newTable = true;
      while (newTable) {
        var countTables = 0;
        for (var v = 0; v < tables.length; v++) {
          if (tables[v].isOccupedd) {
            countTables += 1;
          }
        }
        console.log("")
        console.log('Tables occupées: ' + (countTables + 1) + '/' + tables.length);
        if (countTables === tables.length) {
          newTable = false;
        }
        var TableNumber = getRandomInt(tables.length);
        if (!tables[TableNumber].isOccupedd) {
          var randompertable = getRandomInt(tables[TableNumber].numberSeats) + 1;
          if(randompertable >= NbPerTable){
            var numberOfParticle = NbPerTable;
          }
          else{
            var numberOfParticle = randompertable ;
          }
          newTable = false;
          tables[TableNumber].isOccupedd = true;
          var typeOfClient = 1;
          if(infectOne){
            typeOfClient = 2;
          }
          
          console.log(numberOfParticle + " particules, à la table N° " + TableNumber);
          for (var l = 0; l < numberOfParticle; l++) {
            particles.push(new Particle(getRandomInt(50) + 50,getRandomInt(50) + 50,typeOfClient,TableNumber, indexOfPart));
            dataParticlesTotal += 1;
            if(infectOne){
              typeOfClient = 1;
              infectOne = false;
            }
            indexOfPart += 1;
          }
        }
      }
    }
  }

  //  for (var i = 0; particles.length < PARTICLE_COUNT; i++) {
  //    particles.push(new Particle(10,10,1));
  // }
}



function addInfectedPart(){
  infectOne = true;
}

function InfectWaiter(){
  infectOneWaiter = true;
}

  var graphUpdateInterval;
function makeIntervalGraph(){
  graphUpdateInterval = setInterval(function(){updateData();}, 2000);
}

function clearIntervalGraph(){
  clearInterval(graphUpdateInterval);
  console.log(graphUpdateInterval);
}

//initial 
makeIntervalGraph();

function togglePause()
{
    if (!PAUSE)
    {
        PAUSE = true;
        console.log("Simulation en pause !")
        clearIntervalGraph();
    } else if (PAUSE)
    {
       PAUSE = false;
       makeIntervalGraph();
    }

}

window.addEventListener('keydown', function (e) {
  var key = e.keyCode;
  if (key === 80)// p key
  {togglePause();}
  if (key === 82) //r key
  {}
});

reset(1);

window.setInterval(function () {
  reset(0);
}, 3000 + getRandomInt(4000)); //Chaque 2-6 secondes si il y a une table libre alors une équipe apparaît
// window.setInterval(function () {}, 200); //Chaque 4-12 secondes si il y a une table libre alors une équipe apparaît


/*document.addEventListener("click", reset);*/


var data = {
  labels: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206, 208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240, 242, 244, 246, 248, 250, 252, 254, 256, 258, 260, 262, 264, 266, 268, 270, 272, 274, 276, 278, 280, 282, 284, 286, 288, 290, 292, 294, 296, 298, 300],
  datasets: [
  {
    label: "Particules simulées",
    data: [],
    borderColor:"#0000FF",
    fill :false
  },
  {
    label: "Particules totales apparues",
    data: [],
    borderColor:"#00BFFF",
    fill :false
  },
  {
    label: "Infecté total dans la simulation",
    data: [],
    borderColor:"#008000",
    fill : false
  },
  {
    label: "Possible infections hors simulation",
    data: [],
    borderColor:"#003300",
    fill :false
  },
    // {
    //   label: "Possible guérisons",
    //   data: [],
    //   borderColor:"#00ccff",
    //   fill :false
    // },
  {
    label: "Possible morts hors simulation",
    data: [],
    borderColor:"#FF0000",
    fill :false
  }]        
};


var options = {
  display : true,
  responsive: true,
  text : "Evolution of simulation",
  scales: {
    xAxes: [{
      scaleLabel:{
          labelString:'Secondes',
          display : true
      }
    }],
    yAxes: [{
      scaleLabel:{
          labelString:'Nombre d\'individus',
          display : true
      },
      ticks: {
        suggestedMin: 0,
        suggestedMax: PARTICLE_COUNT,
        }
      }]
   }
};


var chart = document.getElementById("chart").getContext('2d');
var Mychart = new Chart(chart, {
  type: 'line',
  options: options,
  data: data
});
// var Mychart =  new Chart(chart).line(data);

var countingUpdate = 0;
var boolCheck = true;

function updateData(){

    dataSusceptible.push(particles.length);
    Mychart.data.datasets[0].data = dataSusceptible;

    dataParticles.push(dataParticlesTotal);
    Mychart.data.datasets[1].data = dataParticles;

    dataInfected.push(countingInfectedForOutput + countingEntryInfectedForOutput);
    Mychart.data.datasets[2].data = dataInfected;
   
    dataInfectedAfter.push((countingInfectedForOutput * R0).toFixed(2));
    Mychart.data.datasets[3].data = dataInfectedAfter;
    
    // dataHealthy.push((countingInfectedForOutput * R0)-((countingInfectedForOutput + countingEntryInfectedForOutput) * lethal));
    // Mychart.data.datasets[3].data = dataHealthy;
  
    dataDeath.push(((countingInfectedForOutput + countingEntryInfectedForOutput) * lethal));
    Mychart.data.datasets[4].data = dataDeath;

    Mychart.update();

    countingUpdate += 2;
    if(countingUpdate === 300 && boolCheck){
      PAUSE = true;
      boolCheck = false;
      updateGraph2();
    }
}



function updateGraph2(){
  console.log(dataParticles);
  console.log(dataInfected)

    document.getElementById("finalR0").value = (countingInfectedForOutput /countingEntryInfectedForOutput).toFixed(3);

    var totParticles = [];
    totParticles.push(dataParticles[dataParticles.length -1]);

    for (var z = 1; z < dataParticles.length; z++) {
        totParticles.push(dataParticles[dataParticles.length -1] - dataInfected[z]);    
    }

    var totGuerissons = []

    for (var y = 0; y < dataInfected.length; y++){
      totGuerissons.push(dataInfected[y] - (dataInfected[y] * lethal));
    }

    // var InfectedGaus = []

    console.log(totParticles)
    console.log(totGuerissons)

    var data = {
    labels: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206, 208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240, 242, 244, 246, 248, 250, 252, 254, 256, 258, 260, 262, 264, 266, 268, 270, 272, 274, 276, 278, 280, 282, 284, 286, 288, 290, 292, 294, 296, 298, 300],
    datasets: [
    {
      label: "Susceptible",
      data: totParticles,
      borderColor:"#0000FF",
      fill :false
    },
    {
      label: "Infecté total",
      data: dataInfected,
      borderColor:"#008000",
      fill :false
    },
    // { label:"Infecté total gausienne",
    //   data: InfectedGaus,
    //   borderColor:"#008000",
    //   fill : false
    // },
    {
      label: "Guérissons",
      data: totGuerissons,
      borderColor:"#00BFFF",
      fill : false
    },]        
  };


  var options = {
    display : true,
    responsive: true,
    text : "Evolution of simulation",
    scales: {
      xAxes: [{
        scaleLabel:{
            labelString:'Secondes',
            display : true
        }
      }],
      yAxes: [{
        scaleLabel:{
            labelString:'Nombre d\'individus',
            display : true
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: PARTICLE_COUNT,
          }
        }]
     }
  };

  var chart2 = document.getElementById("chart2").getContext('2d');
  var Mychart2 = new Chart(chart2, {
    type: 'line',
    options: options,
    data: data
  });
  var labelSec = ["Secondes", 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200, 202, 204, 206, 208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232, 234, 236, 238, 240, 242, 244, 246, 248, 250, 252, 254, 256, 258, 260, 262, 264, 266, 268, 270, 272, 274, 276, 278, 280, 282, 284, 286, 288, 290, 292, 294, 296, 298, 300];
  const rows = [[Mychart.data.datasets[0].data], [Mychart.data.datasets[1].data], [Mychart.data.datasets[2].data], [Mychart.data.datasets[3].data], [Mychart.data.datasets[4].data], [totParticles], [totGuerissons], [labelSec]];


    rows[0].unshift("Particules totales : ");
    rows[1].unshift("Particules temps réel");
    rows[2].unshift("Particules infectée");
    rows[3].unshift("Particule infectée hors simulation");
    rows[4].unshift("Particules mortes");
    rows[5].unshift("Particules totales depuis la fin");
    rows[6].unshift("Total guérisson");

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    var CsvString = '"sep=,"\r\n';
    rows.forEach(function(RowItem, RowIndex) {
      RowItem.forEach(function(ColItem, ColIndex) {
        CsvString += ColItem + ',';
      });
      CsvString += "\r\n";
    });
    CsvString = "data:application/csv," + encodeURIComponent(CsvString);
    var x = document.createElement("A");
    x.setAttribute("href", CsvString );
    x.setAttribute("download","data - " + dateTime +".csv");
    document.body.appendChild(x);
    x.click();
  
  


}


//Mouse position
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

    console.log("X : " + (evt.clientX - rect.left) * scaleX + "Y : " + (evt.clientY - rect.top) * scaleY);
}

function draw(evt) {
    var pos = getMousePos(elCanvas, evt);

    // ctx.fillStyle = "#000000";
    // ctx.fillRect (pos.x, pos.y, 4, 4);
}

function resetPage(ok){
  if(ok){
    localStorage.clear();
    window.location.reload();
  }
}