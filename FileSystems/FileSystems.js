import fs from 'fs';
import ChalkMSG from '../Scripts/Chalk.js';

let dir = '';

export const instanceFiles = (envContent) => {
    try {
        dir = 'Store/Companies';
        if (fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true });
            console.log(`${ChalkMSG.INFO}Folder ${dir} created.`);
        }
        dir = 'Store/Users';
        if (fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true });
            console.log(`${ChalkMSG.INFO}Folder ${dir} created.`);
        }
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`${ChalkMSG.INFO}Folder ${dir} created.`);
        }
        dir = 'Store/Users';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`${ChalkMSG.INFO}Folder ${dir} created.`);
        }
        dir = 'Store/Companies';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`${ChalkMSG.INFO}Folder ${dir} created.`);
        }
        dir = '.env';
        fs.writeFile(dir, envContent, function (err) {
            if (err) throw err;
            console.log(`${ChalkMSG.INFO}File ${dir} created.`);
        });
    } catch (error) {
        console.log(`${ChalkMSG.ERROR}${error}`);
    }
}

export const rmStore = () => {
    dir = 'Store/Companies';
    if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true });
    dir = 'Store/Users';
    if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true });
}





