import { v4 as uuidv4 } from 'uuid';

import { Order } from '../Models/Models.js';

import { } from '../Validations/Exists.js';
import { canViewOrder, canCreateOrder, canUpdateOrder } from '../Validations/Orders.js';
import { } from '../Validations/Formats.js';

const sadmin = "1";
const admin = "2";
const partner = "3";
const client = "4";

export const scopedOrders = (currentUser, orders) => { // Fetch inside findAllUsers controller
    // Return all pour sadmin et admin
    // Return pour les partenaires seulement les orders ayant le shopId
    // Return seulement ceux que les clients possèdent
}

export const setOrder = async (req, res, next) => { // For id's parameters routes to set the order values from DB
    // Mettre tous ceux avec le même numéro de commande dedans
    // Mettre le contenu de produit
}

export const authCreateOrder = (req, res, next) => {
    if (!canCreateOrder(req.currentUser, req.body)) return res.status(401).json({ error: `Vous n'êtes pas autorisé à créer une commande !` });
    next();
}

export const authGetOrder = (req, res, next) => {
    if (!canViewOrder(req.currentUser, req.order)) return res.status(401).json({ error: `Vous n'êtes pas autorisé à voir cette commande !` });
    next();
}

export const authUpdateOrder = (req, res, next) => {
    if (!canUpdateOrder(req.currentUser, req.order)) return res.status(401).json({ error: `Vous n'êtes pas autorisé à modifier cette commande !` });
    next();
}

export const validFormCreateOrder = async (req, res, next) => {
    // Check exists and validities

    // Check valids format values

    //Utiliser le for du controller
    next();
}

export const validFormUpdateOrder = async (req, res, next) => {
    //Format, exist and validities
    next();
}
