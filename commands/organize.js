const fs = require('fs');

const path = require('path');


let types = {
    media: ["mp4", "mkv", "mp3"],
    image: ["jpeg","jpg","png","gif"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
      "docx",
      "doc",
      "pdf",
      "xlsx",
      "xls",
      "pptx",
      "ppt",
      "odt",
      "ods",
      "odp",
      "odg",
      "odf",
      "txt",
      "ps",
      "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
};


// Organize Function will organize all your target folder's files in a different folders according to their extensions
function organizeFn(dirPath){ //we need a directory path as parameter
    let destPath;
    if(dirPath==undefined){
        console.log('Please Enter a Valid Directory Path...');
        return;
    } // check wheter directory path is passed or not and if not simply return

    let doesExist = fs.existsSync(dirPath);
    //this doesExist wil tell the target folder exists or not

    if(doesExist==true){
         destPath = path.join(dirPath , 'organized_Files');
         //here we created a path for organized_Files folder

         //check whether in the given destPath does a folder exist with samee name and if does not make a folder
         if(fs.existsSync(destPath)==false){
             fs.mkdirSync(destPath);
         }else{
             console.log('Folder Already Exists!!');
         }
    }else{
        console.log('Please Enter a Valid Path!!!');
    }

    organizeHelper(dirPath , destPath);

}


function organizeHelper(src , dest){
    let childNames = fs.readdirSync(src);
    // console.log(childNames);

    for(let i=0;i<childNames.length;i++){
        let childAddress = path.join(src , childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();

        if(isFile==true){
            let fileCategory = getCategory(childNames[i]);
            console.log(childNames[i]+' belongs to '+fileCategory);

            sendFiles(childAddress, dest , fileCategory)
        }
    }
}

function getCategory(FileName){
    let ext = path.extname(FileName);
    //here we get extension as .pdf .mp3 etc
    
    ext=ext.slice(1);
    //we extracted extension names of the target files
    //and get the extension as pdf mp3 etc

    // console.log(ext);

    for(let key in types){
        let cTypeArr = types[key];
        //we took out all the category type arrays here
        // console.log(cTypeArr);

        for(let i=0;i<cTypeArr.length;i++){
            if(ext==cTypeArr[i]){
                return key;
            }
        }
    }

    return 'others';

}


function sendFiles(srcFilePath, dest, fileCategory){
    //we will create path for each category type encountered to create folders of their names
    let catPath = path.join(dest, fileCategory);
    
    if(fs.existsSync(catPath)==false){
        fs.mkdirSync(catPath);
    }
    //here created folder for catPath is like below
    // C:\Users\anike\OneDrive\Documents\Pepcoding\DEV\Daily Classes\1_HTML\testFolder\organized_files\media
    // C:\Users\anike\OneDrive\Documents\Pepcoding\DEV\Daily Classes\1_HTML\testFolder\organized_files\documents


    let fileName = path.basename(srcFilePath);
    //we took out the basename of all the files to create fileName

    let destFilePath = path.join(catPath, fileName);

    fs.copyFileSync(srcFilePath, destFilePath);

    fs.unlinkSync(srcFilePath);

    console.log('Files Organized..');
}


module.exports = {
    organizeFnKey : organizeFn
}