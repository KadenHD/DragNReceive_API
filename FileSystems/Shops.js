import fs from 'fs';

let dir = '';

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

/*
export const rmShop = (id) => {
    dir = 'Store/Companies/' + id;
    if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true })
    }
}
*/