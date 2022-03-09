import nodemailer from 'nodemailer';

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
        from: fromMail,
        to: data.toMail,
        subject: data.subjectMail,
        text: data.textMail,
        html: data.htmlMail,
    });
}

const createdSadminData = (user, password) => {
    const toMail = user.email;
    const subjectMail = "DragN'Receive - Compte Super Administrateur créé !";
    const textMail = `
    Bonjour ${user.firstname} ${user.lastname},
    Vous êtes désormais un Super Administrateur DragN'Receive !
    Voici votre mot de passe pour vous connecter, nous vous recommandons de le changer une fois connecté !
    Mot de passe : ${password}
    `;
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
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
    const subjectMail = "DragN'Receive - Administrateur créé !";
    const textMail = `
    Bonjour ${user.firstname} ${user.lastname},
    Vous êtes désormais un Administrateur DragN'Receive !
    Voici votre mot de passe pour vous connecter, nous vous recommandons de le changer une fois connecté !
    Mot de passe : ${password}
    `;
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
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
    const subjectMail = "DragN'Receive - Compte Partenaire créé !";
    const textMail = `
    Bonjour ${user.firstname} ${user.lastname},
    Vous êtes désormais un Partenaire DragN'Receive !
    Voici votre mot de passe pour vous connecter, nous vous recommandons de le changer une fois connecté !
    Mot de passe : ${password}
    `;
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
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
    const subjectMail = " DragN'Receive - Compte Client créé !";
    const textMail = `
    Bonjour ${user.firstname} ${user.lastname},
    Vous êtes désormais un Client DragN'Receive !
    Voici votre mot de passe pour vous connecter, nous vous recommandons de le changer une fois connecté !
    Mot de passe : ${password}
    `;
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
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

export const resetedUser = async (user, link) => {
    const toMail = user.email;
    const subjectMail = "DragN'Receive - Demande de réinitialisation de mot de passe !";
    const textMail = `
    Bonjour ${user.firstname} ${user.lastname},
    Vous avez demandé une réinitialisation de mot de passe :
    Lien : ${link}
    Ce n'est pas vous ? Veuillez changer de mot de passe par sécurité.
    `;
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>Vous avez demandé une réinitialisation de mot de passe :</b><br>
    <b>Lien : ${link}</b><br>
    <b>Ce n'est pas vous ? Veuillez changer de mot de passe par sécurité.</b>
    `;
    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        textMail: textMail,
        htmlMail: htmlMail
    }
    await mailSender(data);
}

export const createdShop = async (shop) => {
    const toMail = shop.email;
    const subjectMail = `DragN'Receive - Boutique ${shop.name} créée !`;
    const textMail = `
    Bonjour boutique ${shop.name},
    Nous vous confirmons la création de votre boutique, un de nos administrateurs va 
    s'occuper d'ajouter un Partenaire à votre boutique incessamment sous peu.
    `;
    const htmlMail = `
    <b>Bonjour boutique ${shop.name},</b><br>
    <b>Nous vous confirmons la création de votre boutique, un de nos administrateurs va 
    s'occuper d'ajouter un Partenaire à votre boutique incessamment sous peu.</b>
    `;
    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        textMail: textMail,
        htmlMail: htmlMail
    }
    await mailSender(data);
}

export const deletedShop = async (shop) => {
    const toMail = shop.email;
    const subjectMail = `DragN'Receive - Boutique ${shop.name} supprimée !`;
    const textMail = `
    Bonjour boutique ${shop.name},
    Nous vous confirmons la suppression de votre boutique. Merci d'avoir collaboré avec nous jusque là !
    `;
    const htmlMail = `
    <b>Bonjour boutique ${shop.name},</b><br>
    <b>Nous vous confirmons la suppression de votre boutique. Merci d'avoir collaboré avec nous jusque là !</b>
    `;
    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        textMail: textMail,
        htmlMail: htmlMail
    }
    await mailSender(data);
}

export const responsedTicket = async (ticket, user) => {
    const toMail = user.email;
    const subjectMail = `DragN'Receive - Réponse au ticket n°${ticket.id} !`;
    const textMail = `
    Bonjour ${user.firstname} ${user.lastname},
    Nous vous confirmons la réponse d'un de nos administrateur sur le ticket n°${ticket.id}.
    `;
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>Nous vous confirmons la réponse d'un de nos administrateur sur le ticket n°${ticket.id}.</b>
    `;
    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        textMail: textMail,
        htmlMail: htmlMail
    }
    await mailSender(data);
}

export const closedTicket = async (ticket, user) => {
    const toMail = user.email;
    const subjectMail = `DragN'Receive - Ticket n°${ticket.id} clos !`;
    const textMail = `
    Bonjour ${user.firstname} ${user.lastname},
    Nous vous confirmons que le ticket n°${ticket.id} a bien été clos.
    `;
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>Nous vous confirmons que le ticket n°${ticket.id} a bien été clos.</b>
    `;
    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        textMail: textMail,
        htmlMail: htmlMail
    }
    await mailSender(data);
}

export const deletedUser = async (user) => {
    const toMail = user.email;
    const subjectMail = `DragN'Receive - Compte clos !`;
    const textMail = `
    Bonjour ${user.firstname} ${user.lastname},
    C'est dans le regret que nous vous annonçons que votre compte a bien été clos.
    `;
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>C'est dans le regret que nous vous annonçons que votre compte a bien été clos.</b>
    `;
    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        textMail: textMail,
        htmlMail: htmlMail
    }
    await mailSender(data);
}

export const updatedOrderInProgress = async (user, orderNumber, shop) => {
    const toMail = user.email;
    const subjectMail = `DragN'Receive - Commande n°${orderNumber} en cours de préparation !`;
    const textMail = `
    Bonjour ${user.firstname} ${user.lastname},
    Votre commande est en cours de préparation dans le magasins suivant : 
    ${shop.name}
    `;
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>Votre commande est en cours de préparation dans le magasins suivant : </b><br>
    <b>${shop.name}</b>
    `;
    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        textMail: textMail,
        htmlMail: htmlMail
    }
    await mailSender(data);
}

export const updatedOrderAvailable = async (user, orderNumber, shop) => {
    const toMail = user.email;
    const subjectMail = `DragN'Receive - Commande n°${orderNumber} disponible !`;
    const textMail = `
    Bonjour ${user.firstname} ${user.lastname},
    Votre commande est en disponible dans le magasins suivant : 
    ${shop.name}
    `;
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>Votre commande est disponible dans le magasins suivant : </b><br>
    <b>${shop.name}</b>
    `;
    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        textMail: textMail,
        htmlMail: htmlMail
    }
    await mailSender(data);
}

export const updatedOrderCollected = async (user, orderNumber, shop) => {
    const toMail = user.email;
    const subjectMail = `DragN'Receive - Commande n°${orderNumber} récupéré !`;
    const textMail = `
    Bonjour ${user.firstname} ${user.lastname},
    Votre commande a bien été recupéré dans le magasins suivant : 
    ${shop.name}
    `;
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>Votre commande a bien été recupéré dans le magasins suivant : </b><br>
    <b>${shop.name}</b>
    `;
    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        textMail: textMail,
        htmlMail: htmlMail
    }
    await mailSender(data);
}

export const updatedOrderCanceled = async (user, orderNumber, shop) => {
    const toMail = user.email;
    const subjectMail = `DragN'Receive - Commande n°${orderNumber} annulé !`;
    const textMail = `
    Bonjour ${user.firstname} ${user.lastname},
    Votre commande a bien été annulé dans le magasins suivant : 
    ${shop.name}
    `;
    const htmlMail = `
    <b>Bonjour ${user.firstname} ${user.lastname},</b><br>
    <b>Votre commande a bien été annulé dans le magasins suivant : </b><br>
    <b>${shop.name}</b>
    `;
    const data = {
        toMail: toMail,
        subjectMail: subjectMail,
        textMail: textMail,
        htmlMail: htmlMail
    }
    await mailSender(data);
}