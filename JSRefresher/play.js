const killjoy = {
    name: 'Party Poison',
    age: 1e9+7,
    isCool: true,
    title () {
        console.log('Hi, I am ' + this.name);
    }
}
/* 
let name = 'Party Poison';
let age = 1e9+7;
let isCool = true;
*/

const summarizeUser = (userName, userAge, userCool) => {
    return (' Name: ' + userName + 
            ' // Age: ' + userAge + 
            ' // isCool: ' + userCool); 
};

//console.log(summarizeUser(name, age, isCool));
console.log(killjoy);
killjoy.title();

const arrTest = ['Jet Star', 'Kobra Kid'];
/*for (let oLet of arr) {
    console.log(oLet);
}*/

console.log(arrTest.map(arr => {
    return "Killjoy: " + arr;
}));
const copiedArr = [...arrTest];
console.log(copiedArr);
arrTest.push("Fun Ghoul");
console.log(copiedArr);


const copiedKilljoy = {...killjoy};
console.log(copiedKilljoy);

const toArray = (...args) => {
    return args;
}
console.log(toArray("jello", true, 1));

const printName = ({name}) => {
    console.log(name);
}

printName(killjoy);

const arr2 = [1, 2, 'ssss', true, false];
