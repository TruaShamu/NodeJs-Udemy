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
