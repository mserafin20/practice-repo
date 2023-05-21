var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Rewrite to a .map
let fiveStarArrayOld = [];
for(let i = 0; i < numberArray.length; i++) {
        fiveStarArrayOld.push(numberArray[i] * 5);
    };

    console.log(fiveStarArrayOld);
    console.log("-----------");
                                            // Whenever you don't have curly braces here it is called an implicit return
    const fiveStarArrayNew = numberArray.map(number => number * 5)
    console.log(fiveStarArrayNew);
