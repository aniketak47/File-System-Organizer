//File Organizer System Project
//js mein input array ke through lete hai

const fs = require('fs');
const path = require('path');

let input = process.argv.slice(2);

let inputArr = input;

let command = inputArr[0];


const helpModule = require('../commands/help');
const organizeModule = require('../commands/organize');
const treeModule = require('../commands/tree');


switch(command){
    case 'tree':
        treeModule.treeFnKey(inputArr[1]);
        break;
    case 'organize':
        organizeModule.organizeFnKey(inputArr[1]);
        break;
    case 'help':
        helpModule.helpFnKey();
        break;

    default :
        console.log('Please Enter a Valid Command....');
        break;
}







