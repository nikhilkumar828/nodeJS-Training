const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Enter the String: ', value => {
    console.log(value.split("").reverse().join(""));
    readline.close();
});