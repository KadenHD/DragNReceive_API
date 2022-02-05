import fs from 'fs';

let dir = '';

export const instanceFiles = (envContent) => {
    try {
        dir = 'Store';
        if (fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true });
            console.log("INFO: Folder" + dir + " deleted.");
        }
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log("INFO: Folder" + dir + " created.");
        }
        dir = 'Store/Users';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log("INFO: Folder" + dir + " created.");
        }
        dir = 'Store/Companies';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log("INFO: Folder" + dir + " created.");
        }
        dir = '.env';
        fs.writeFile(dir, envContent, function (err) {
            if (err) throw err;
            console.log("INFO: File" + dir + " created.");
        });
    } catch (error) {
        console.log("ERROR: " + error);
    }
}

export const rmStore = () => {
    dir = 'Store';
    if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true });
}





