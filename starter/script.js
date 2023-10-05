'use strict';
// IIFE
// Coding challenge 2
(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';

    const body = document.querySelector('body')
    body.addEventListener("click", function () {
        header.style.color = "blue"
    })
})()

// (function () {
//     console.log("This will never run again");
// })();




// (() => console.log("This will Also not run again"))()
// Default Parameters
const bookings = []
const createBooking = function (flightNum, numPassengers = 1, price = 199 * numPassengers) {
    const booking = {
        flightNum,
        numPassengers,
        price,
    }
    console.log(booking);
    bookings.push(booking)
}
createBooking('LH123', 23)
createBooking('LH123', undefined, 950)


// How passing arguments work
const flight = 'LH235'
const emmanuel = {
    name: 'kenzo',
    passport: 98765434
}

const checkIn = function (flightNum, passenger) {
    flightNum = 'LH999'
    passenger.name = "Mr. " + passenger.name

    if (passenger.passport === 98765434) {
        alert(" Checked In")
    } else {
        alert("wrong passport")
    }
}
// checkIn(flight, emmanuel)
// console.log(flight);
// console.log(emmanuel);

const newPassport = function (person) {
    person.passport = Math.trunc(Math.random() * 10000000000)
}

// newPassport(emmanuel)
// checkIn(flight, emmanuel)
// console.log(emmanuel);


// First Class and Higher Order functions 
const oneWord = function (str) {
    return str.replace(/ /g, "").toLowerCase()
}
const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' ')
    return [first.toUpperCase(), ...others].join(' ')
}
//Higher order function
const transformer = function (str, fn) {
    console.log(`original string: ${str}`);
    console.log(`transformed string: ${fn(str)}`);
    console.log(`trasformed by: ${fn.name}`);
}
transformer("JavaScript is the best!", upperFirstWord)
transformer("JavaScript is the best!", oneWord)

// Functions Returning functions
// const greet = function (greeting) {
//     return function (name) {
//         console.log(`${greeting} ${name}`);
//     }
// }
// const greeterHey = greet("Hey")
// greeterHey("emmanuel")
// Mini challenge
const greet = (greeting) => (name) => console.log(`${greeting} ${name}`);

const greeterHey = greet("Hey")
greeterHey("emmanuel")

// The call method
const lufthansa = {
    airline: 'lufthansa',
    iataCode: 'LH',
    bookings: [],
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
        this.bookings.push({ flight: `${this.iataCode}${flightNum}}`, name })
    }

}
lufthansa.book(239, "Kenzo John")
lufthansa.book(769, "Toluj John")
console.log(lufthansa);
const book = lufthansa.book
const eurowings = {
    airline: "eurowings",
    iataCode: "EW",
    bookings: []
}
book.call(eurowings, 23, "sarah willaims")
console.log(eurowings);


const siwss = {
    airline: "Swiss AirLines",
    iataCode: "LX",
    bookings: []
}

book.call(siwss, 567, "Mary Jane")


// The apply method 
const flightData = [583, "George Micheal"]
book.apply(siwss, flightData)
// same as 
book.call(siwss, ...flightData)


// Closures
const secureBooking = function () {
    let passengerCount = 0;

    return function () {
        passengerCount++
        console.log(`${passengerCount} passengers`);
    }
}

const booker = secureBooking()
booker()
booker()
booker()
console.dir(booker)

// Example 1 of Closures
let f;
const g = function () {
    const a = 23
    f = function () {
        console.log(a * 2);
    }
}
const h = function () {
    const b = 777
    f = function () {
        console.log(b * 2);
    }
}
g()
f()
console.dir(f)
// Re-assigning f function
h()
f()
console.dir(f)

// Example 2
const boardPassengers = function (k, wait) {
    const perGroup = k / 3;
    setTimeout(function () {
        console.log(`We are now boarding all ${k}`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000)
    console.log(`Will start boarding in ${wait} secs`);
}
// to show the closure has priority over the scope chain 
const perGroup = 800
boardPassengers(180, 3)


