
/**
 * This is a pet object with a state machine functionality
 * @method petFSM
 * @brief  Pet state machine object
 * @param  {string} name The name to set the pet
 */
function petFSM(name) {    // my constructor function
  this.name = name;
  this.age = 0;

  this.happiness = 50;
  this.hunger = 50;
  this.health = 50;
  this.fatigue = 50;

  var sleepTimer;
  var mainLoop;
  var tmpLoop;

  this.storage = {
    'play' : {
        'Ball': {
          'timesPlayed': 0
        },
        'String': {
          'timesPlayed': 0
        },
        'Teddy': {
          'timesPlayed': 0
        },
        'preferance': "ball"
    },
    'feed' : {
        'Apple': {
          'timesAte': 0
        },
        'Chocolate': {
          'timesAte': 0
        },
        'Watermelon': {
          'timesAte': 0
        },
        'preferance': "apple"
    },
    'walk' : {
      'numberOfFriends': 0,
      'numberOfFights': 0
    }
};
  ///
  /// Aesthetics
  ///
  var happinessBar = new ProgressBar.SemiCircle(happiness, {
    color: '#aaa',
    strokeWidth: 6,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    text: {autoStyleContainer: false},
    from: { color: 'rgb(255, 0, 0)'},
    to: { color: 'rgb(0, 255, 0)'},
    // Set default step function for all animate calls
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      var value = Math.round(circle.value() * 100);
      if (value === 0) {
        circle.setText('0');
      } else {
        circle.setText(value);
      }
    }
  });
  var healthBar = new ProgressBar.SemiCircle(health, {
    color: '#aaa',
    strokeWidth: 6,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    text: {autoStyleContainer: false},
    from: { color: 'rgb(255, 0, 0)'},
    to: { color: 'rgb(0, 255, 0)'},
    // Set default step function for all animate calls
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      var value = Math.round(circle.value() * 100);
      if (value === 0) {
        circle.setText('0');
      } else {
        circle.setText(value);
      }
    }
  });
  var fatigueBar = new ProgressBar.SemiCircle(fatigue, {
    color: '#aaa',
    strokeWidth: 6,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    text: {autoStyleContainer: false},
    to: { color: 'rgb(255, 0, 0)'},
    from: { color: 'rgb(0, 255, 0)'},
    // Set default step function for all animate calls
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      var value = Math.round(circle.value() * 100);
      if (value === 0) {
        circle.setText('0');
      } else {
        circle.setText(value);
      }
    }
  });
  var hungerBar = new ProgressBar.SemiCircle(hunger, {
    color: '#aaa',
    strokeWidth: 6,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    text: {autoStyleContainer: false},
    to: { color: 'rgb(255, 0, 0)'},
    from: { color: 'rgb(0, 255, 0)'},
    // Set default step function for all animate calls
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      var value = Math.round(circle.value() * 100);
      if (value === 0) {
        circle.setText('0');
      } else {
        circle.setText(value);
      }
    }
  });

  // this.personality = new personality();

  //functions
  this.playWith = function(toy) {
    if (this.is("playing")) {
      if (this.storage.play.preferance == toy) {

        sendmsg("My favourite toy!!");
        this.increaseHappiness(10);
      }

      switch (toy) {
        case "ball":
          sendmsg("Bouncing the ball!","I love this!","This is fun");
          this.storage.play.Ball.timesPlayed++;
          this.increaseHappiness();
          this.increaseHunger();
          this.increaseFatigue();
          break;
        case "string":
          sendmsg("OMG! String","I love this!","I really am enjoying myself.");
          this.storage.play.String.timesPlayed++;
          this.increaseHappiness();
          this.increaseHunger();
          this.increaseFatigue();
          break;
        case "teddy":
          sendmsg("CUTE TEDDY BEAR!","I love this!","This is fun");
          this.storage.play.Teddy.timesPlayed++;
          this.increaseHappiness();
          this.increaseHunger();
          this.increaseFatigue();
          break;
        default:

      }
    } else {
      console.log("Cant do play actions outside of play state");
    }

  }
  this.feedWith = function(food) {
    if (this.is("feeding")) {
      switch (food) {
        case "apple":
          sendmsg("Apples are healthy!","MHHHh","I enjoy healthy foods");
          this.storage.feed.Apple.timesAte++;
          this.increaseHappiness();
          this.increaseHealth(5);
          this.decreaseHunger(30);
          break;
        case "chocolate":
          sendmsg("Chocolate is the best","ahhh","I dont want to eat too much of this");
          this.storage.feed.Chocolate.timesAte++;
          this.increaseHappiness();
          this.decreaseHunger(30);
          this.decreaseHealth(5);
          break;
        case "watermelon":
          sendmsg("What a weird food","So yummy");
          this.storage.feed.Apple.timesAte++;
          this.increaseHappiness();
          this.decreaseHunger(30);
          break;
        default:
      }
    } else {
      console.log("Cant do feeding actions outside of feed state");
    }

  }
  this.meetFriend = function(){
    if (random.bool()) {
      sendmsg("I made a new friend!","OMG a friend!", "I like my new buddy");
      this.increaseHappiness(10);
      this.storage.walk.numberOfFriends ++;
    }
    else {
      sendmsg("Aw I didnt find friends", "Theres no one here", "Im so loney");
      this.decreaseHappiness(10);
    }

  }
  this.fightFoe = function(){
    if (random.bool()) {
      sendmsg("I met a new oponent!","LETS FIGHT!", "He doesnt look so strong");
      var strongEnemy = random.bool();
      var enemyStrength = random.integer(0,50);
      if (strongEnemy) {
        sendmsg("I am defeated!","OH NO I LOST!","This is unfair, i lost");
        this.decreaseHealth(enemyStrength);
        this.decreaseHappiness(10);
      }else {
        sendmsg("I have won!","I am victorious", "Im the best");
        this.increaseHappiness(10);
      }
      this.storage.walk.numberOfFights ++;
    }
    else {
      sendmsg("Aw I didnt find anyone to fight", "Theres no one here to duel");
      this.decreaseHappiness(5);
    }

  }
  this.startSleep = function(){
    var self = this;
    // this.stoptLoop();
      // console.log(self.fatigue);
    this.sleeptimer = setInterval(function () {
      if (self.fatigue==0) {
        self.stopSleep();
        sendmsg("Refreshing!","That was a good rest");
        self.doIdle();
        // self.startLoop();
      }else {
        self.decreaseFatigue();
        // console.log(self.fatigue);
        self.increaseHealth();
      }
    }, 1000);
  }
  this.stopSleep = function(){
    clearInterval(this.sleeptimer);
  }
  this.updateAge = function(){
      this.age = this.age +1;
      document.getElementById('Age').innerHTML = this.age;
  }
  ///
  /// happiness
  ///
  ///
  this.decreaseHappiness = function(times) {

    if (this.happiness > 0 && this.happiness <= 100) {
      if (times !== undefined) {
          // argument passed and not undefined
          this.happiness-=times;
          if ( this.happiness < 0) {
            this.happiness = 0;
          }
      } else {
      this.happiness--;
      }
    }
    happinessBar.animate(this.happiness/100);

  }
  this.increaseHappiness = function(times) {

    if (this.happiness >= 0 && this.happiness < 100) {
      if (times !== undefined) {
          // argument passed and not undefined
          this.happiness+=times;
          if ( this.happiness > 100) {
            this.happiness = 100;
          }
      } else {
          // argument not passed or undefined
          this.happiness++;
      }
    }
    happinessBar.animate(this.happiness/100);
  }
  ///
  /// HUNGER
  ///
  this.decreaseHunger = function(times) {

    if (this.hunger > 0 && this.hunger <= 100) {
      if (times !== undefined) {
        this.hunger-=times;
        if (this.hunger < 0) {
          this.hunger = 0;
        }
      }else{
        this.hunger--;
      }
    }

    hungerBar.animate(this.hunger/100);
  }
  this.increaseHunger = function(times) {

    if (this.hunger >= 0 && this.hunger < 100) {
      if (times !== undefined) {
          this.hunger += times;
          if (this.hunger > 100) {
            this.hunger = 100;
          }
      } else {
        this.hunger++;
      }
    }
    hungerBar.animate(this.hunger/100);
  }
  ///--------------------------------------------------------------------------
  /// SLEEP
  ///--------------------------------------------------------------------------
  this.decreaseFatigue = function(times) {

    if (this.fatigue >= 0 && this.fatigue <= 100) {
      if (times !== undefined) {
          // argument passed and not undefined
          this.fatigue-=times;
          if ( this.fatigue < 0) {
            this.fatigue = 0;
          }
      } else {
      this.fatigue--;
      }
    }
    fatigueBar.animate(this.fatigue/100);
  }
  this.increaseFatigue = function(times) {

    if (this.fatigue >= 0 && this.fatigue < 100) {
      if (times !== undefined) {
          // argument passed and not undefined
          this.fatigue+=times;
          if ( this.fatigue > 100) {
            this.fatigue = 100;
          }
        }else{
      this.fatigue++;
    }
    }
    fatigueBar.animate(this.fatigue/100);
  }
  ///
  /// HEALTH
  ///
  this.decreaseHealth = function(times) {

    if (this.health > 0 && this.health <= 100) {
      if (times !== undefined) {
          // argument passed and not undefined
          this.health-=times;
          if ( this.health < 0) {
            this.health = 0;
          }
        }else {
            this.health--;
          }

      healthBar.animate(this.health/100);
    }
    else if (this.health == 0) {
      sendmsg("I DIED");
    }
    // console.log(this.fatigue);
  }
  this.increaseHealth = function(times) {

    if (this.health > 0 && this.health < 100) {
      if (times !== undefined) {
          // argument passed and not undefined
          this.health+=times;
          if ( this.happiness > 100) {
            this.health = 100;
          }
        }else{
            this.health++;
          }

      healthBar.animate(this.health/100);
    }

    // console.log(this.fatigue);
  }

  ///
  /// INIT
  ///

  this.init();
};
