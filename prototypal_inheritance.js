// Function.prototype.inherits = function (parentClass) {
//   let childClass = this;
//   let Surrogate = function () {};
//   Surrogate.prototype = parentClass.prototype;
//   childClass.prototype = new Surrogate();
//   childClass.prototype.constructor = childClass;

// }


Function.prototype.inherits = function (parentClass) {
  let childClass = this;
  let Surrogate = function () { };
  
  childClass.prototype = Object.create(parentClass.prototype);
  childClass.prototype.constructor = childClass;

}



function MovingObject(name) { 
  this.name = name;
}

function Ship(name) { 
  MovingObject.call(this, name);
}

Ship.inherits(MovingObject);

function Asteroid(name) { 
  MovingObject.call(this, name);
}

Asteroid.inherits(MovingObject);

Asteroid.prototype.flying = function () {
  console.log(`${this.name} is flying`);
  
}

Ship.prototype.swimming = function () {
  console.log(`${this.name} is swimming`);

}

let asteroid1 = new Asteroid("Henry");

asteroid1.flying();
// asteroid1.swimming();

let ship1 = new Ship("Steven");

ship1.swimming();
// ship1.flying();


