import fs from 'fs';

let dir = '';

export const mkProduct = (id, shopId) => {
    dir = 'Store/Companies/' + shopId + '/Products/' + id;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export const writeProduct = (id, shopId, img) => {
    dir = 'Store/Companies/' + shopId + '/Products/' + id + '/';
    if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true })
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFile(dir + img.name, img.data, function (err) {
        if (err) throw err;
        console.log("Image : " + dir + img.name + " saved !");
    });
}

/*
export const rmProduct = (id, shopId) => {
    dir = 'Store/Companies/' + shopId + '/Products/' + id;
    if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true })
}
*/