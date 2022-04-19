import fs from 'fs';
import Pdfmake from 'pdfmake';
import path from 'path';

const fonts = {
    Roboto: {
        normal: 'node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf',
        bold: 'node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf',
        italics: 'node_modules/roboto-font/fonts/Roboto/roboto-italic-webfont.ttf',
        bolditalics: 'node_modules/roboto-font/fonts/Roboto/roboto-bolditalic-webfont.ttf'
    }
};

export const orderInvoicesPDF = (user, orders) => {
    let attachments = [];

    let shopIdTab = [];
    for (let i = 0; i < orders.length; i++) {
        let shopIdExist = false;
        for (let j = 0; j < shopIdTab.length; j++) {
            if (orders[i].shopId === shopIdTab[j]) {
                shopIdExist = true;
            }
        }
        if (!shopIdExist) {
            shopIdTab.push(orders[i].shopId);
        }
    }
    let finalTab = [];
    for (let i = 0; i < shopIdTab.length; i++) {
        let finalOrders = [];
        for (let j = 0; j < orders.length; j++) {
            if (orders[j].shopId === shopIdTab[i]) {
                finalOrders.push(orders[j]);
            }
        }
        finalTab[i] = finalOrders;
    }

    // faire boucle for, final tab lisible en 2d : [][]
    // chaque fin de commande boutique, rajouter l'attachments
    let pdfmake = new Pdfmake(fonts);
    var docDefinition = {
        content: [{
            text: "Commande n°" + orders[0].number,
            alignment: 'center',
            fontSize: 25
        }]
    };
    for (let i = 0; i < orders.length; i++) {
        docDefinition.content.push({
            text: `${orders[i].product.name}`
        })
    }
    const currentTime = "date"
    const fileName = `${currentTime}-${orders[0].number}.pdf`
    const filePath = `./Store/Users/${user.id}/Invoices/${fileName}`
    let pdfDoc = pdfmake.createPdfKitDocument(docDefinition, {});
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.end();
    attachments = [{
        filename: fileName,
        path: path.join(filePath),
        contentType: 'application/pdf'
    }]
    //end

    return attachments
}

