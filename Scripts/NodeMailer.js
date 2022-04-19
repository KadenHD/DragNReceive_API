import nodemailer from 'nodemailer';
import { orderInvoicesPDF } from './PdfMake.js';
import dotenv from 'dotenv';
dotenv.config();

/* NodeMailer config */
let fromMail = '"Service DragN\'Receive" <service@dragnreceive.fr>';
let transport = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
    }
});

/* The default sending mail format */
const mailSender = async (data) => {
    await transport.sendMail({
        from: fromMail,
        to: data.toMail,
        subject: data.subjectMail,
        html: data.htmlMail,
        attachments: data.attachments
    });
}

const createdSadminData = (user, password) => {
    const toMail = user.email;
    const subjectMail = "DragN'Receive - Compte Super Administrateur créé !";
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>Vous êtes désormais un Super Administrateur DragN'Receive !</b><br>
    <b>Voici votre mot de passe pour vous connecter, nous vous recommandons de le changer une fois connecté !</b><br>
    <b>Mot de passe : ${password}</b>
    `;
    return {
        toMail: toMail,
        subjectMail: subjectMail,
        htmlMail: htmlMail
    }
}

const createdAdminData = (user, password) => {
    const toMail = user.email;
    const subjectMail = "DragN'Receive - Administrateur créé !";
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>Vous êtes désormais un Administrateur DragN'Receive !</b><br>
    <b>Voici votre mot de passe pour vous connecter, nous vous recommandons de le changer une fois connecté !</b><br>
    <b>Mot de passe : ${password}</b>
    `;
    return {
        toMail: toMail,
        subjectMail: subjectMail,
        htmlMail: htmlMail
    }
}

const createdPartnerData = (user, password) => {
    const toMail = user.email;
    const subjectMail = "DragN'Receive - Compte Partenaire créé !";
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>Vous êtes désormais un Partenaire DragN'Receive !</b><br>
    <b>Voici votre mot de passe pour vous connecter, nous vous recommandons de le changer une fois connecté !</b><br>
    <b>Mot de passe : ${password}</b>
    `;
    return {
        toMail: toMail,
        subjectMail: subjectMail,
        htmlMail: htmlMail
    }
}

const createdClientData = (user, password) => {
    const toMail = user.email;
    const subjectMail = " DragN'Receive - Compte Client créé !";
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>Vous êtes désormais un Client DragN'Receive !</b><br>
    <b>Voici votre mot de passe pour vous connecter, nous vous recommandons de le changer une fois connecté !</b><br>
    <b>Mot de passe : ${password}</b>
    `;
    return {
        toMail: toMail,
        subjectMail: subjectMail,
        htmlMail: htmlMail
    }
}

/* Redirect depend on the role of the created user */
export const createdUser = async (user, password) => {
    let data = {};
    if (user.roleId === "1") { data = createdSadminData(user, password); }
    else if (user.roleId === "2") { data = createdAdminData(user, password); }
    else if (user.roleId === "3") { data = createdPartnerData(user, password); }
    else if (user.roleId === "4") { data = createdClientData(user, password); }
    await mailSender(data);
}

export const resetedUser = async (user, link) => {
    const toMail = user.email;
    const subjectMail = "DragN'Receive - Demande de réinitialisation de mot de passe !";
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>Vous avez demandé une réinitialisation de mot de passe :</b><br>
    <b>Lien : <a href="${link}">${link}</a></b><br>
    <b>Ce n'est pas vous ? Veuillez changer de mot de passe par sécurité.</b>
    `;
    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        htmlMail: htmlMail
    }
    await mailSender(data);
}

export const updateResetedUser = async (user) => {
    const toMail = user.email;
    const subjectMail = "DragN'Receive - Mot de passe réinitialisé !";
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>Votre mot de passe à bien été réinitialisé.</b><br>
    <b>Ce n'est pas vous ? Veuillez nous contacter au xx.xx.xx.xx.xx.</b>
    `;
    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        htmlMail: htmlMail
    }
    await mailSender(data);
}

export const resetedClient = async (user, code) => {
    const toMail = user.email;
    const subjectMail = "DragN'Receive - Demande de réinitialisation de mot de passe !";
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>Vous avez demandé une réinitialisation de mot de passe :</b><br>
    <b>Votre code : ${code}<br>
    <b>Ce n'est pas vous ? Veuillez changer de mot de passe par sécurité.</b>
    `;
    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        htmlMail: htmlMail
    }
    await mailSender(data);
}

export const updateResetedClient = async (user) => {
    const toMail = user.email;
    const subjectMail = "DragN'Receive - Mot de passe réinitialisé !";
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>Votre mot de passe à bien été réinitialisé.</b><br>
    <b>Ce n'est pas vous ? Veuillez nous contacter au xx.xx.xx.xx.xx.</b>
    `;
    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        htmlMail: htmlMail
    }
    await mailSender(data);
}

export const createdShop = async (shop) => {
    const toMail = shop.email;
    const subjectMail = `DragN'Receive - Boutique ${shop.name} créée !`;
    const htmlMail = `
    <b>Bonjour boutique ${shop.name},</b><br>
    <b>Nous vous confirmons la création de votre boutique, un de nos administrateurs va 
    s'occuper d'ajouter un Partenaire à votre boutique incessamment sous peu.</b>
    `;
    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        htmlMail: htmlMail
    }
    await mailSender(data);
}

export const deletedShop = async (shop) => {
    const toMail = shop.email;
    const subjectMail = `DragN'Receive - Boutique ${shop.name} supprimée !`;
    const htmlMail = `
    <b>Bonjour boutique ${shop.name},</b><br>
    <b>Nous vous confirmons la suppression de votre boutique. Merci d'avoir collaboré avec nous jusque là !</b>
    `;
    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        htmlMail: htmlMail
    }
    await mailSender(data);
}

export const responsedTicket = async (ticket, user) => {
    const toMail = user.email;
    const subjectMail = `DragN'Receive - Réponse au ticket n°${ticket.id} !`;
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>Nous vous confirmons la réponse d'un de nos administrateur sur le ticket n°${ticket.id}.</b>
    `;
    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        htmlMail: htmlMail
    }
    await mailSender(data);
}

export const closedTicket = async (ticket, user) => {
    const toMail = user.email;
    const subjectMail = `DragN'Receive - Ticket n°${ticket.id} clos !`;
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>Nous vous confirmons que le ticket n°${ticket.id} a bien été clos.</b>
    `;
    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        htmlMail: htmlMail
    }
    await mailSender(data);
}

export const deletedUser = async (user) => {
    const toMail = user.email;
    const subjectMail = `DragN'Receive - Compte clos !`;
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>C'est dans le regret que nous vous annonçons que votre compte a bien été clos.</b>
    `;
    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        htmlMail: htmlMail
    }
    await mailSender(data);
}

export const updatedOrderInProgress = async (user, orderNumber, shop) => {
    const toMail = user.email;
    const subjectMail = `DragN'Receive - Commande n°${orderNumber} en cours de préparation !`;
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>Votre commande est en cours de préparation dans le magasins suivant : </b><br>
    <b>${shop.name}</b>
    `;
    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        htmlMail: htmlMail
    }
    await mailSender(data);
}

export const updatedOrderAvailable = async (user, orderNumber, shop) => {
    const toMail = user.email;
    const subjectMail = `DragN'Receive - Commande n°${orderNumber} disponible !`;
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>Votre commande est disponible dans le magasins suivant : </b><br>
    <b>${shop.name}</b>
    `;
    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        htmlMail: htmlMail
    }
    await mailSender(data);
}

export const updatedOrderCollected = async (user, orderNumber, shop) => {
    const toMail = user.email;
    const subjectMail = `DragN'Receive - Commande n°${orderNumber} récupéré !`;
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>Votre commande a bien été recupéré dans le magasins suivant : </b><br>
    <b>${shop.name}</b>
    `;
    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        htmlMail: htmlMail
    }
    await mailSender(data);
}

export const updatedOrderCanceled = async (user, orderNumber, shop) => {
    const toMail = user.email;
    const subjectMail = `DragN'Receive - Commande n°${orderNumber} annulé !`;
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>Votre commande a bien été annulé dans le magasins suivant : </b><br>
    <b>${shop.name}</b>
    `;
    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        htmlMail: htmlMail
    }
    await mailSender(data);
}

export const newOrder = async (user, orders) => {
    let totalPrice = 0.00
    for (let i = 0; i < orders.length; i++) {
        totalPrice = (parseFloat(totalPrice) + parseFloat(orders[i].price)).toFixed(2);
    }
    let ordersCard = `<b>Prix total de la commande : ${totalPrice} €</b><br><br>`
    for (let i = 0; i < orders.length; i++) {
        ordersCard += `
        <img src="${`http://${process.env.BASE_URL}:${process.env.PORT}` + orders[i].product.path}"><br>
        <b>Quantité : ${orders[i].quantities}</b><br>
        <b>Prix total : ${orders[i].price} €</b><br>
        <b>Nom : ${orders[i].product.name}</b><br>
        <b>Prix unitaire : ${orders[i].product.price} €</b><br>
        <br><br>`
    }
    const toMail = user.email;
    const subjectMail = `DragN'Receive - Commande n°${orders[0].number} réalisée !`;
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>Votre commande a bien été réalisé, veuillez trouver ci-joint votre facture : </b><br><br>
    ${ordersCard}
    `;

    const attachments = orderInvoicesPDF(user, orders);

    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        htmlMail: htmlMail,
        attachments: attachments
    }
    await mailSender(data);
}