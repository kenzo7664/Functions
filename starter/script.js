'use strict';

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


// Bind method
const bookEW = book.bind(eurowings)
const bookLH = book.bind(lufthansa)
const bookLX = book.bind(siwss)
bookEW(578, "frank lampard")

const bookEW23 = book.bind(eurowings, 23)
bookEW23("Toni Kroos")
bookEW23("Jude Bellingham")
// With Event Listeners
lufthansa.planes = 300
lufthansa.buyPlane = function () {
    console.log(this);
    this.planes++
    console.log(this.planes);
}
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa))
// Partial application
const addTax = (rate, value) => value + value * rate
console.log(addTax(.10, 200));
const addVAT = addTax.bind(null, 0.23)
console.log(addVAT(3000));

// Mini challenge on functions returning functions
const taxValue = (rate) => (value) => value + value * rate
const vatValue = taxValue(0.23)
console.log(vatValue(100))
console.log(vatValue(23))

// Coding challenge 1 
const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section 😃
    answers: new Array(4).fill(0),
    registerNewAnswer() {
        let answer = Number(prompt(`${this.question}\n ${this.options.join('\n')}\n What is your answer`))
        let finalAnswer = answer <= this.answers.length ? answer : alert("Wrong input!!! Reload to restart again")

        typeof finalAnswer === "number" && finalAnswer <= this.answers.length && this.answers[finalAnswer]++;
        this.displayResults()
        this.displayResults("string")
    },
    displayResults(type = "array") {
        type === "array" ? console.log(this.answers) : console.log(`Poll results are ${this.answers.join(', ')}`);
    }
}
const pollChecker = poll.registerNewAnswer.bind(poll)
document.querySelector(".poll").addEventListener('click', pollChecker)

poll.displayResults.call({ answers: [7, 8, 6] })
poll.displayResults.call({ answers: [7, 8, 6] }, "string")
