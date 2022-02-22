import fs from 'fs';

let dir = '';

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