var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const isInArray = (number) => {
    for(let i = 0; i < numberArray.length; i++) {
        if (number === numberArray[i]){
            return true;
        }
    } 
    return false;

}

console.log(isInArray(5));
console.log(isInArray(5000));
console.log("------------------");

console.log(numberArray.includes(5));
console.log(numberArray.includes(5000));