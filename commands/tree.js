
const fs = require('fs');

const path = require('path');


function treeFn(dirPath){
    if(dirPath==undefined){
        console.log('Please Enter a Valid Directory Path...');
        return;
    }

    let doesExist = fs.existsSync(dirPath);

    if(doesExist==true){
        treeHelper(dirPath, ' ');
    }else{
        console.log('Please Enter a valid Path!!!');
    }
}


function treeHelper(targetPath , indent){
    let isFile = fs.lstatSync(targetPath).isFile();

    if(isFile==true){
        let fileName = path.basename(targetPath);
        console.log(indent+"├── "+fileName);
    }else{
        let dirName = path.basename(targetPath);
        console.log(indent+"└──"+dirName);

        let childern = fs.readdirSync(targetPath);

        for(let i=0;i<childern.length;i++){
            let childPath = path.join(targetPath, childern[i]);
            treeHelper(childPath, indent+'\t');
        }
    }
}

// ├──  -----> includes symbol
// └──  -----> bar symbol


module.exports = {
    treeFnKey : treeFn
}