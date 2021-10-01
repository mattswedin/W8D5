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

// markov.says("meow", "Ned");
// // Markov says meow to Ned!
// // true

// // bind time args are "meow" and "Kush", no call time args
// markov.says.myBind(pavlov, "meow", "Kush")();
// // Pavlov says meow to Kush!
// // true

// // no bind time args (other than context), call time args are "meow" and "a tree"
// markov.says.myBind(pavlov)("meow", "a tree");
// // Pavlov says meow to a tree!
// // true

// bind time arg is "meow", call time arg is "Markov"
// markov.says.myBind(pavlov, "meow")("Markov");
// Pavlov says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBind(pavlov);
// notMarkovSays("meow", "me");
// Pavlov says meow to me!
// true



Function.prototype.curry = function () {
    return function (num1) {
        return function (num2) {
            return function (num3) {
                return num1 + num2 + num3;

            }
        }
    }
}


function sumThree(num1, num2, num3) {
    return num1 + num2 + num3;
}

sumThree(4, 20, 6); // == 30

// you'll write `Function#curry`!
let f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
f1 = f1(4); // [Function]
f1 = f1(20); // [Function]
f1 = f1(6); // = 30

// or more briefly:
console.log(sumThree.curry(3)(4)(20)(6)); // == 30


function curriedSum(numArgs) {
    let numbers = [];
    function _curriedSum(num) {
        numbers.push(num);
        if (numbers.length === numArgs) {
            let numSum = 0;
            for (let i = 0; i < numbers.length; i++) {
                const element = numbers[i];
                numSum += element;
            }
            return numSum;
        } else {
            return _curriedSum;
        }

    }
    return _curriedSum;
}

const sum = curriedSum(4);
console.log(sum(5)(30)(20)(1)); // => 56

const sum2 = curriedSum(6);
console.log(sum2(1)(1)(1)(1)(1)(1)); // => 6