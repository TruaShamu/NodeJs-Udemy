var name = 'Party Poison';
var age = 1e9+7;
var isCool = true;

function summarizeUser(userName, userAge, userCool) {
    return (' Name: ' + userName + 
            ' // Age: ' + userAge + 
            ' // isCool: ' + userCool); 
}

console.log(summarizeUser(name, age, isCool));