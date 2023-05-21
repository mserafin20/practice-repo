var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let multiplesOfThree = [];

for(let i = 0; i < numberArray.length; i++) {
    if (numberArray[i] % 3 === 0) {
        multiplesOfThree.push(numberArray[i])
    }
}

console.log(multiplesOfThree);
console.log("---------------");

let multiplesOfThreeNew = numberArray.filter(number => number % 3 === 0);

console.log(multiplesOfThreeNew);
console.log("---------------");