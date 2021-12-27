import fs from 'fs';

let dir = '';

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