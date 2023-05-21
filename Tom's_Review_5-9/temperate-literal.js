const myAPIData = [
    {
        city: "Philadelphia",
        temp: "cold",
        tomorrow:{
            temp: "warmer",
            wind: "5mph"
        }
    }
]

console.log("Wow, the temperature in Philadelphia is so cold! Tomorrow it should be warmer and the wind speed will only be 5mph.");
console.log(`Wow, the temperature in ${myAPIData[0].city} is so ${myAPIData[0].temp}! Tomorrow it should be ${myAPIData[0].tomorrow.temp} and the wind speed will only be ${myAPIData[0].tomorrow.wind}`);