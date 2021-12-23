import fs from 'fs';

let dir = '';

export const instanceFiles = (envContent) => {
    try {
        dir = 'Store';
        if (fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true });
            console.log("Folder : " + dir + " deleted !");
        }
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log("Folder : " + dir + " created !");
        }
        dir = 'Store/Users';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log("Folder : " + dir + " created !");
        }
        dir = 'Store/Companies';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log("Folder : " + dir + " created !");
        }
        dir = '.env';
        fs.writeFile(dir, envContent, function (err) {
            if (err) throw err;
            console.log("File : " + dir + " created !");
        });
    } catch (error) {
        console.log(error);
    }
}

export const rmStore = () => {
    dir = 'Store';
    if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true });
    }
}

export const mkUser = (id) => {
    dir = 'Store/Users/' + id + '/Invoices/';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

export const rmUser = (id) => {
    dir = 'Store/Users/' + id;
    if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true });
    }
}

export const mkShop = (id) => {
    dir = 'Store/Companies/' + id + '/Products/';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    dir = 'Store/Companies/' + id + '/Logo/';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

export const rmShop = (id) => {
    dir = 'Store/Companies/' + id;
    if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true })
    }
}

export const writeShop = (id, img) => {
    dir = 'Store/Companies/' + id + '/Logo/';
    console.log(dir)
    if (fs.existsSync(dir)) {
        fs.rmdirSync(dir, { recursive: true })
    }
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFile(dir + img.name, img.data, function (err) {
        if (err) throw err;
        console.log("Image : " + dir + img.name + " saved !");
    });
}