var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for(var i = numberArray.length-1; i >= 0; i--) {
    console.log(numberArray[i]);
}

console.log("------------");

// console.log(numberArray.reverse())
numberArray.reverse().forEach(number => console.log(number))

// Both these methods will flip your array to count in REVERSE 