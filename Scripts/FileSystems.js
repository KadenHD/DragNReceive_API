import fs from 'fs';
import ChalkMSG from './Chalk.js';

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

export const mkProduct = (id, shopId) => {
    dir = 'Store/Companies/' + shopId + '/Products/' + id;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export const writeProduct = (id, shopId, img) => {
    dir = 'Store/Companies/' + shopId + '/Products/' + id + '/';
    if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true })
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFile(dir + img.name, img.data, function (err) { if (err) throw err; });
}

/*
export const rmProduct = (id, shopId) => {
    dir = 'Store/Companies/' + shopId + '/Products/' + id;
    if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true })
}
*/

export const mkShop = (id) => {
    dir = 'Store/Companies/' + id + '/Products/';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    dir = 'Store/Companies/' + id + '/Logo/';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export const writeShop = (id, img) => {
    dir = 'Store/Companies/' + id + '/Logo/';
    if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true })
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFile(dir + img.name, img.data, function (err) { if (err) throw err; });
}

/*
export const rmShop = (id) => {
    dir = 'Store/Companies/' + id;
    if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true })
}
*/

export const mkUser = (id) => {
    dir = 'Store/Users/' + id + '/Invoices/';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    dir = 'Store/Users/' + id + '/Photo/';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export const writeUser = (id, img) => {
    dir = 'Store/Users/' + id + '/Photo/';
    if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true })
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFile(dir + img.name, img.data, function (err) { if (err) throw err; });
}

export const rmUser = (id) => {
    dir = 'Store/Users/' + id;
    if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true });
}
