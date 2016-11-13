

/**
 * State machine functions declerations
 */
var HUNGER = {
  min:0,
  maxThreshold:10
}
var FATIGUE = {
  min:0,
  maxThreshold:10
}
var HEALTH = {
  min:0,
  maxThreshold:90
}
var HAPPINESS = {
  min:0,
  maxThreshold:90
}
var random = new Random();
petFSM.prototype = {
  //initiate
  onafterinit: function(event, from, to) {
    // while (this.is('idle')) {
    //   console.log(this.name);;
    // }
    // this.startLoop();
    var self = this;
    var happinesshLoop = function() {
        self.decreaseHappiness();
        setTimeout(happinesshLoop, random.integer(10, 20)*1000/ document.getElementById("speed").value);
    }
    var healthLoop = function() {
        self.decreaseHealth();
        setTimeout(healthLoop, random.integer(10, 20)*1000/ document.getElementById("speed").value);
    }
    var fatigueLoop = function() {
        self.increaseFatigue();
        // console.log(self.fatigue);
        setTimeout(fatigueLoop, random.integer(5, 20)*1000/ document.getElementById("speed").value);
    }
    var hungerLoop = function() {
        self.increaseHunger();
        setTimeout(hungerLoop, random.integer(10, 20)*1000/ document.getElementById("speed").value);
    }
    document.getElementById('Name').innerHTML = self.name;
    hungerLoop();
    healthLoop();
    fatigueLoop();
    happinesshLoop();
    this.decreaseHealth();
    // healthLoop();

    setTimeout(function mainLoop() {
      if (document.getElementById('auto').checked == true) {
        if (self.fatigue > FATIGUE.maxThreshold){

          if (!self.is("sleeping")) {
            sendmsg("Im going to sleep. goodnight.", "Wow what a long day. Time for bed","I really want to nap.");
            self.doIdle();
            self.sleep();
          }

        }

        if (self.hunger > HUNGER.maxThreshold){

            sendmsg("Im going to eat.", "Wow im hungry. Time for food!","Please feed me");
          self.doIdle();
          self.feed();
          self.feedWith(self.storage.feed.preferance);
          self.doIdle();

        }

        if (self.happiness < HAPPINESS.maxThreshold){
            sendmsg("Im going to play.", "Im sad, going to play!");
          self.doIdle();
          self.play();
          self.playWith(self.storage.play.preferance);
          self.doIdle();

        }

        if (self.health < HEALTH.maxThreshold) {
          // self.
        }
      }


    setTimeout(mainLoop, 500);
    }, 500);

    setTimeout(function checkstatsLoop() {
      if (document.getElementById('auto').checked == false) {
          if (self.hunger == 100) {
            self.decreaseHealth(2);
          }
          if (self.fatigue == 100) {
            self.decreaseHealth(2);
          }
          if (self.happiness == 0) {
            self.decreaseHealth(2);
          }
        }


    setTimeout(checkstatsLoop, 1500);
  }, 1500);
  // checkstatsLoop();

    // mainLoop = setInterval(function () {
    //   document.getElementById('Name').innerHTML = self.name;
    //   document.getElementById('Health').innerHTML = self.health;
    //   document.getElementById('Hunger').innerHTML = self.hunger;
    //   document.getElementById('Fatigue').innerHTML = self.fatigue;
    //   self.decreaseHealth();
    //   self.increaseFatigue();
    //   self.increaseHunger();
    //
    // }, (2000/ document.getElementById("speed").value));
  },

  //---------playing----------------------------------------------------------------------
  onbeforeplay: function(event, from, to) {

    // restrictions
    // too tired
    // too hungry
    if (this.fatigue > FATIGUE.maxThreshold) {
      //too tired to play
      // sendmsg("Im too tired to play! I want to sleep");
      sendmsg("Im too tired to play! I want to sleep","Im really sleepy.","Wow im tired");
      return false;
    }
    if (this.hunger > HUNGER.maxThreshold) {
      //too hungry to play
      sendmsg("Im too hungy to play! Please feed me","Feed me.", "I want food.");
      return false;
    }
  },
  onenterplaying: function(event, from, to) {
    sendmsg("Cant wait to play","Get ready to rumble!","I love playing.");
    changeControls('play');
    var self = this;
    var decay = 250;
    this.tmpLoop = function() {
        self.increaseHappiness();
        decay*=2
        setTimeout(self.tmpLoop, decay/ document.getElementById("speed").value);
    }
    this.tmpLoop();
    //this.happinessLoop = setTimeout(function () {self.increaseHappiness();this.decay*=2;console.log(decay);}, decay);
      //change controls
      //play with differnt toys
      //remember toys
      //increase happiness

  },
  onleaveplaying: function(event, from, to) {
    changeControls('idle');
    clearInterval(this.tmpLoop)
    //change controlls back
    //learn a favourite toys
    //-differt toys give different personality
    //calculate personality

  },

  //-----feeding-------------------------------------------------------------------------------
  onbeforefeed: function(event, from, to) {
    if (this.hunger == 0) {
      sendmsg("Im not hungry!");
      return false;
    }else if (this.hunger < 30) {
      sendmsg("I dont think I can eat much");
    }else if (this.hunger > HUNGER.maxThreshold) {
      sendmsg("Wow, i'm starving");
    }
    //check if too full (lazy)


  },
  onenterfeeding: function(event, from, to) {
    //change controlls
    changeControls('feed');
    //eatc different foods
  },
  onleavefeeding: function(event, from, to) {
    changeControls('idle');
    //junk foods = more happniness less health
    //healthy foods = moreish happiness more health
    //will like types of food based on personality
    //favourote food
    //calculate personality
  },

  //-----------sleeping-------------------------------------------------------------------------
  onbeforesleep: function(event, from, to) {
    //check fatigue
    if (this.fatigue < FATIGUE.min) {
      sendmsg("Not sleepy!")
      return false;
    }
    if (this.fatigue > FATIGUE.maxThreshold) {
      sendmsg("Really sleepy! Goodnight");
    }
  },
  onentersleeping: function(event, from, to) {
    //chnage controls
    changeControls('sleep');
    this.startSleep();
    //sleep
    //decrease fatigue
    //increase health
  },
  onleavesleeping: function(event, from, to) {
    this.stopSleep();
    // this.startLoop();
    changeControls('idle');
    //if slept for too long, make lazy
  },
  //----------walking--------------------------------------------------------------------------
  onbeforewalk: function(event, from, to) {
    if (this.fatigue > FATIGUE.maxThreshold) {
      sendmsg("Too tired to walk");
      return false;
    }
    if (this.hunger > HUNGER.maxThreshold) {
      sendmsg("Feed me.");
      return false;
    }
    //check fatigue
    //check hunger
  },
  onenterwalking: function(event, from, to) {
    changeControls('walk');
    //change controls
    //encounter enemies/foes
    //ask user
  },
  onleavewalking: function(event, from, to) {
    changeControls('idle');
    //
  },
  //------------Caring----------------------------------------------------------------------------
  onentercaring: function(event, from, to) {
    changeControls('care');
  },
  onleavecaring: function(event, from, to) {
    changeControls('idle');
  }
};

StateMachine.create({
  target: petFSM.prototype,
  events  : [
    //initialise state
    { name: 'init', from   : 'none', to  : 'idle' },
    //actual states
    { name: 'play', from : 'idle', to : 'playing' },
    { name: 'feed', from : 'idle', to: 'feeding' },
    { name: 'sleep', from: 'idle', to   : 'sleeping' },
    { name: 'walk', from: 'idle', to   : 'walking' },
    //Go back to the idle state from all other states
    { name: 'doIdle', from : '*', to: 'idle' }
]});

function changeControls(ctrls){
  switch (ctrls) {
    case 'play':
      var controls = "<button onclick=pet.playWith('ball')>Ball</button>\
                      <button onclick=pet.playWith('string')>String</button>\
                      <button onclick=pet.playWith('teddy')>Teddy Bear</button>\
                      <button onclick=pet.doIdle()>Back</button>";
      document.getElementById('controls').innerHTML = controls;
      break;
    case 'idle':
      var controls = "<button onclick='pet.play()'>Play</button> \
                      <button onclick='pet.feed()'>Feed</button> \
                      <button onclick='pet.sleep()'>Sleep</button> \
                      <button onclick='pet.walk()'>Walk</button>";
        document.getElementById('controls').innerHTML = controls;
      break;
    case 'feed':
      var controls = "<button onclick=pet.feedWith('apple')>Apple</button>\
                      <button onclick=pet.feedWith('chocolate')>Chocolate</button>\
                      <button onclick=pet.feedWith('watermelon')>Watermelon</button> \
                      <button onclick=pet.doIdle()>Back</button>";
        document.getElementById('controls').innerHTML = controls;
      break;
    case 'sleep':
      var controls = "<button onclick='pet.doIdle()'>Wake Up</button>";
        document.getElementById('controls').innerHTML = controls
      break;
    case 'walk':
      var controls = "<button onclick='pet.meetFriend()'>Friend</button> \
                      <button onclick='pet.fightFoe()'>Fight</button> \
                      <button onclick='pet.doIdle()'>Back</button>";
        document.getElementById('controls').innerHTML = controls;
      break;
    case 'care':
      var controls = "<button onclick='pet.play()'>Bath</button> \
                      <button onclick='pet.feed()'>Medicine</button> \
                      <button onclick='pet.sleep()'>Snuggle</button> \
                      <button onclick='pet.doIdle()'>Back</button>";
        document.getElementById('controls').innerHTML = controls;
      break;
    default:

  }
}

function sendmsg(msg){
  var args = [];
  for (var i = 0; i < arguments.length; ++i) args[i] = arguments[i];
  var randomItem = args[random.integer(0, args.length-1)];
  // document.getElementById('petmsg').innerHTML = randomItem;
  var currenttime = new Date();
  var datetime = currenttime.getHours() + ":"
                + currenttime.getMinutes() + ":"
                + currenttime.getSeconds();
  var log = datetime + " => "+ randomItem + "\n";
  document.getElementById('log').value = log + document.getElementById('log').value;
}
function personality(){
  this.anger;
}
