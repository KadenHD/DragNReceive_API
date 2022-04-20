import fs from 'fs';
import Pdfmake from 'pdfmake';
import path from 'path';
import { Shop } from '../Models/Models.js';
import { sendShopInvoices } from './NodeMailer.js';

const fonts = {
    Roboto: {
        normal: 'node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf',
        bold: 'node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf',
        italics: 'node_modules/roboto-font/fonts/Roboto/roboto-italic-webfont.ttf',
        bolditalics: 'node_modules/roboto-font/fonts/Roboto/roboto-bolditalic-webfont.ttf'
    }
};

export const orderInvoicesPDF = async (user, orders) => {
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
    const d = new Date;
    const currentTime =
        [
            d.getMonth() + 1,
            d.getDate(),
            d.getFullYear()
        ].join('-') + '_' +
        [
            d.getHours(),
            d.getMinutes(),
            d.getSeconds()
        ].join('-');
    let attachments = [];
    for (let i = 0; i < finalTab.length; i++) {
        const currentShop = await Shop.findByPk(finalTab[i][0].shopId);
        const shopName = currentShop.name.replace(" ", "_");
        const fileName = `${currentTime}-${shopName}.pdf`;
        const filePath = `./Store/Users/${user.id}/Invoices/${fileName}`;
        let pdfDatas = {
            table: {
                body: [
                    ["Produit", "Quantité", "Prix HT unitaire", "Prix TTC unitaire", "Prix HT", "Prix TTC"],
                ]
            }
        }
        let totalPrice = 0.00;
        for (let j = 0; j < finalTab[i].length; j++) {
            totalPrice = (parseFloat(totalPrice) + parseFloat(finalTab[i][j].price)).toFixed(2);
            pdfDatas.table.body.push([
                `${finalTab[i][j].product.name}`,
                `${finalTab[i][j].quantities}`,
                `${parseFloat(finalTab[i][j].product.price * 0.8).toFixed(2)} €`,
                `${finalTab[i][j].product.price} €`,
                `${parseFloat(finalTab[i][j].price * 0.8).toFixed(2)} €`,
                `${finalTab[i][j].price} €`
            ]);
        }
        let pdfmake = new Pdfmake(fonts);
        let docDefinition = {
            header: {
                text: `Facture - DragN'Receive`,
                bold: true,
                decoration: 'underline',
                fontSize: 18,
                alignment: 'center'
            },
            content: [
                {
                    columns: [
                        [
                            {
                                text: `${user.firstname} ${user.firstname}`,
                                bold: true
                            },
                            { text: user.email },
                            { text: ` ` },
                            { text: `Date: ${new Date().toLocaleString()}` },
                            { text: `Commande n° : ${orders[0].number}` },
                        ],
                        [
                            {
                                text: `${currentShop.name}`,
                                alignment: 'right',
                                bold: true
                            },
                            {
                                text: `Email : ${currentShop.email}`,
                                alignment: 'right'
                            },
                            {
                                text: `Téléphone : ${currentShop.phone}`,
                                alignment: 'right'
                            }
                            ,
                            {
                                text: `Adresse : ${currentShop.city}, ${currentShop.street}, ${currentShop.postal}`,
                                alignment: 'right'
                            }
                        ]
                    ],
                },
                { text: " " }, { text: " " }, { text: " " },
                { text: "Détails de la commande :", bold: true, decoration: 'underline' },
                { text: " " }, { text: " " }, { text: " " },
                pdfDatas,
                { text: `Prix total : ${totalPrice} €`, bold: true },
            ],
        }
        let pdfDoc = pdfmake.createPdfKitDocument(docDefinition, {});
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.end();
        const shopAttachments = {
            filename: fileName,
            path: path.join(filePath),
            contentType: 'application/pdf'
        }
        attachments.push(shopAttachments);
        sendShopInvoices(currentShop, orders[0].number, shopAttachments);
    }
    return attachments
}

