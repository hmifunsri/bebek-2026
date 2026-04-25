
//Const & Let
const a ="Const";
let b ="Let";

//Template Literal
const name = "Prisma";
const sapa = `Halooo " ${name}`;
console.log(sapa);

//Arrow Function
const tambah = (x,y) => x+y;
console.log(tambah(2,3));

//Destructuring
const person = {
    name: "Prisma",
    age: 25
};
const { name, age } = person;
console.log(name, age);

//spread and rest operator
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined);

//Default Parameter
function greet(name = "Guest") {
    return `Hello, ${name}!`;
}
console.log(greet());

//for of Loop
const fruits = ["apple", "banana", "orange"];
for (const fruit of fruits) {
    console.log(fruit);
}

//Modules
import { tambah } from "./Module";
const hasil= tambah(5, 10);
console.log(hasil);

//async Await
const fetchData =() => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data fetched");
        }, 2000);
    });
}
const getData = async () => {
    const data = await fetchData();
    console.log(data);
}
getData();

//array methods
const numbers = [1, 2, 3, 4, 5];

//map
const doubled = numbers.map(num => num * 2);
console.log(doubled);

//filter
const even = numbers.filter(num => num % 2 === 0);
console.log(even);

//reduce
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum);

//slice
const sliced = numbers.slice(1, 4);
console.log(sliced);

//splice
const spliced = numbers.splice(2, 1);
console.log(numbers);

//find
const found = numbers.find(num => num > 3);
console.log(found);