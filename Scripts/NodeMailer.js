import nodemailer from 'nodemailer';

import dotenv from 'dotenv';
dotenv.config(); /* Add the variables from .env file to process.env */

let fromMail = '"Service DragN\'Receive" <service@dragnreceive.fr>';
let transport = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
    }
});

const mailSender = async (data) => {
    await transport.sendMail({
        from: data.fromMail,
        to: data.toMail,
        subject: data.subjectMail,
        text: data.textMail,
        html: data.htmlMail,
    });
}

const createdSadminData = (user, password) => {
    const toMail = user.email;
    const subjectMail = "Compte Super Administrateur DragN'Receive créé !";
    const textMail = `
    Bonjour ${user.lastname} ${user.firstname},
    Vous êtes désormais un Super Administrateur DragN'Receive !
    Voici votre mot de passe pour vous connecter, nous vous recommandons de le changer une fois connecté !
    Mot de passe : ${password}
    `;
    const htmlMail = `
    <b>Bonjour ${user.lastname} ${user.firstname},</b><br>
    <b>Vous êtes désormais un Super Administrateur DragN'Receive !</b><br>
    <b>Voici votre mot de passe pour vous connecter, nous vous recommandons de le changer une fois connecté !</b><br>
    <b>Mot de passe : ${password}</b>
    `;
    return {
        toMail: toMail,
        subjectMail: subjectMail,
        textMail: textMail,
        htmlMail: htmlMail
    }
}

const createdAdminData = (user, password) => {
    const toMail = user.email;
    const subjectMail = "Compte Administrateur DragN'Receive créé !";
    const textMail = `
    Bonjour ${user.lastname} ${user.firstname},
    Vous êtes désormais un Administrateur DragN'Receive !
    Voici votre mot de passe pour vous connecter, nous vous recommandons de le changer une fois connecté !
    Mot de passe : ${password}
    `;
    const htmlMail = `
    <b>Bonjour ${user.lastname} ${user.firstname},</b><br>
    <b>Vous êtes désormais un Administrateur DragN'Receive !</b><br>
    <b>Voici votre mot de passe pour vous connecter, nous vous recommandons de le changer une fois connecté !</b><br>
    <b>Mot de passe : ${password}</b>
    `;
    return {
        toMail: toMail,
        subjectMail: subjectMail,
        textMail: textMail,
        htmlMail: htmlMail
    }
}

const createdPartnerData = (user, password) => {
    const toMail = user.email;
    const subjectMail = "Compte Partenaire DragN'Receive créé !";
    const textMail = `
    Bonjour ${user.lastname} ${user.firstname},
    Vous êtes désormais un Partenaire DragN'Receive !
    Voici votre mot de passe pour vous connecter, nous vous recommandons de le changer une fois connecté !
    Mot de passe : ${password}
    `;
    const htmlMail = `
    <b>Bonjour ${user.lastname} ${user.firstname},</b><br>
    <b>Vous êtes désormais un Partenaire DragN'Receive !</b><br>
    <b>Voici votre mot de passe pour vous connecter, nous vous recommandons de le changer une fois connecté !</b><br>
    <b>Mot de passe : ${password}</b>
    `;
    return {
        toMail: toMail,
        subjectMail: subjectMail,
        textMail: textMail,
        htmlMail: htmlMail
    }
}

const createdClientData = (user, password) => {
    const toMail = user.email;
    const subjectMail = "Compte Client DragN'Receive créé !";
    const textMail = `
    Bonjour ${user.lastname} ${user.firstname},
    Vous êtes désormais un Client DragN'Receive !
    Voici votre mot de passe pour vous connecter, nous vous recommandons de le changer une fois connecté !
    Mot de passe : ${password}
    `;
    const htmlMail = `
    <b>Bonjour ${user.lastname} ${user.firstname},</b><br>
    <b>Vous êtes désormais un Client DragN'Receive !</b><br>
    <b>Voici votre mot de passe pour vous connecter, nous vous recommandons de le changer une fois connecté !</b><br>
    <b>Mot de passe : ${password}</b>
    `;
    return {
        toMail: toMail,
        subjectMail: subjectMail,
        textMail: textMail,
        htmlMail: htmlMail
    }
}

export const createdUser = async (user, password) => {
    let data = {};
    if (user.roleId === "1") { data = createdSadminData(user, password); }
    else if (user.roleId === "2") { data = createdAdminData(user, password); }
    else if (user.roleId === "3") { data = createdPartnerData(user, password); }
    else if (user.roleId === "4") { data = createdClientData(user, password); }
    await mailSender(data);
}