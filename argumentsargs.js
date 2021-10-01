// function sum() {
//     let sumd = 0;
//     for (let i = 0; i < arguments.length; i++) {
//         const element = arguments[i];
//         sumd += element;
//     }
//     return sumd;

// };

// function sum(...args) {
//     let sumd = 0;
//     for (let i = 0; i < args.length; i++) {
//         const element = args[i];
//         sumd += element;
//     }
//     return sumd;

// };

// console.log(sum(1, 2, 3, 4) === 10);
// console.log(sum(1, 2, 3, 4, 5) === 15);

// Function.prototype.myBind = function(context,...bindArgs) {
//     let that = this;
//     return function(...callArgs){
//         return that.call(context,...bindArgs,...callArgs);
//     };
// }

Function.prototype.myBind = function () {
    let that = this;
    let args = Array.prototype.slice.call(arguments)
    return function () {
        let args2 = Array.prototype.slice.call(arguments)
        // console.log(args.slice(1))
        let arrArgs = [];

        for (let i = 1; i < args.length; i++) {
            const element = args[i];
            arrArgs.push(element);
        }
        for (let i = 0; i < args2.length; i++) {
            const element = args2[i];
            arrArgs.push(element)
        }
        return that.apply(args[0], arrArgs);

    };
}


class Cat {
    constructor(name) {
        this.name = name;
    }

    says(sound, person) {
        console.log(`${this.name} says ${sound} to ${person}!`);
        return true;
    }
}

class Dog {
    constructor(name) {
        this.name = name;
    }
}

const markov = new Cat("Markov");
const pavlov = new Dog("Pavlov");

markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
markov.says.myBind(pavlov, "meow", "Kush")();
// Pavlov says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "a tree"
markov.says.myBind(pavlov)("meow", "a tree");
// Pavlov says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
markov.says.myBind(pavlov, "meow")("Markov");
// Pavlov says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBind(pavlov);
notMarkovSays("meow", "me");
// Pavlov says meow to me!
// true