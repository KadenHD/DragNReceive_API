import { v4 as uuidv4 } from 'uuid';

import { Product, Shop } from '../Models/Models.js';
import { canCreateProduct, canDeleteProduct, canViewProduct, canUpdateProduct } from '../Validations/Products.js';
import { isValidName, isValidDescription, isValidPrice, isValidStock, isValidImage } from '../Validations/Formats.js';

const sadmin = "1";
const admin = "2";
const partner = "3";
const client = "4";

export const scopedProducts = (currentUser, products) => { /* Fetch inside findAllUsers controller */
    if (currentUser.roleId === sadmin || currentUser.roleId === admin) return products; /* If Super Admin or admin return all products */
    else return products.filter(product => product.deleted === false); /* Else return only not deleted products */
}

export const setProduct = async (req, res, next) => { /* For id's parameters routes to set the ticket values from DB */
    if (req.currentUser.roleId === sadmin || req.currentUser.roleId === admin) { /* If sadmin / admin can see deleted ones */
        req.product = await Product.findOne({ where: { id: req.params.id } });
    } else { /* Else show only not deleted ones */
        req.product = await Product.findOne({ where: { id: req.params.id, deleted: false } });
    }
    if (!req.product) return res.status(404).json({ error: `Le produit n'existe pas !` });
    req.product.dataValues.shop = await Shop.findByPk(req.product.shopId);
    if (!req.product.dataValues.shop) return res.status(404).json({ error: `La boutique affiliée à ce produit n'existe pas !` });
    next();
}

export const authCreateProduct = async (req, res, next) => {
    req.body.shop = await Shop.findByPk(req.currentUser.shopId);
    if (!req.body.shop) return res.status(404).json({ error: `La boutique affiliée à ce produit n'existe pas !` });
    if (!canCreateProduct(req.currentUser, req.body, req.body.shop)) return res.status(403).json({ error: `Vous n'êtes pas autorisé à créer un produit !` });
    next();
}

export const authDeleteProduct = (req, res, next) => {
    if (!canDeleteProduct(req.currentUser, req.product, req.product.dataValues.shop)) return res.status(403).json({ error: `Vous n'êtes pas autorisé à supprimer ce produit !` });
    req.body = { deleted: true };
    next();
}

export const authGetProduct = (req, res, next) => {
    if (!canViewProduct(req.currentUser, req.product, req.product.dataValues.shop)) return res.status(403).json({ error: `Vous n'êtes pas autorisé à voir ce produit !` });
    next();
}

export const authUpdateProduct = (req, res, next) => {
    if (!canUpdateProduct(req.currentUser, req.product, req.product.dataValues.shop)) return res.status(403).json({ error: `Vous n'êtes pas autorisé à modifier ce produit !` });
    next();
}

export const validFormCreateProduct = async (req, res, next) => {
    if (!req.body.name || !req.body.description || !req.body.price || !req.body.stock || !req.files) return res.status(403).json({ error: `Le formulaire n'est pas bon !` });
    req.body.price = parseFloat(req.body.price);
    req.body.stock = parseInt(req.body.stock);
    if (!isValidName(req.body.name)) return res.status(403).json({ error: `Format de nom non-valide !` });
    if (!isValidDescription(req.body.description)) return res.status(403).json({ error: `Format de description non-valide !` });
    if (!isValidPrice(req.body.price)) return res.status(403).json({ error: `Format de prix non-valide !` });
    if (!isValidStock(req.body.stock)) return res.status(403).json({ error: `Format de stock non-valide !` });
    if (!isValidImage(req.files.image)) return res.status(403).json({ error: `Format de fichier non-valide !` });
    const id = uuidv4();
    req.body = {
        id: id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        path: '/Companies/' + req.currentUser.shopId + '/Products/' + id + '/' + req.files.image.name,
        deleted: false,
        shopId: req.currentUser.shopId
    }
    next();
}

export const validFormUpdateProduct = async (req, res, next) => {
    if (!req.body.name || !req.body.description || !req.body.price || !req.body.stock) return res.status(403).json({ error: `Le formulaire n'est pas bon !` });
    if ((req.body.name == req.product.name) && (req.body.description == req.product.description) && (req.body.price == req.product.price) && (req.body.stock == req.product.stock) && (!req.files)) return res.status(401).json({ error: `Vous n'avez pas modifié le produit !` });
    if (req.body.name != req.product.name) {
        if (!isValidName(req.body.name)) return res.status(403).json({ error: `Format de nom non-valide !` });
        req.product.name = req.body.name;
    }
    if (req.body.description != req.product.description) {
        if (!isValidDescription(req.body.description)) return res.status(403).json({ error: `Format de description non-valide !` });
        req.product.description = req.body.description;
    }
    if (req.body.price != req.product.price) {
        if (!isValidPrice(parseFloat(req.body.price))) return res.status(403).json({ error: `Format de prix non-valide !` });
        req.product.price = parseFloat(req.body.price);
    }
    if (req.body.stock != req.product.stock) {
        if (!isValidStock(parseInt(req.body.stock))) return res.status(403).json({ error: `Format de stock non-valide !` });
        req.product.stock = parseInt(req.body.stock);
    }
    if (req.files) { /* Voir comment vérifier les logos */
        if (!isValidImage(req.files.image)) return res.status(403).json({ error: `Format de fichier non-valide !` });
        req.product.path = '/Companies/' + req.currentUser.shopId + '/Products/' + req.params.id + '/' + req.files.image.name;
    }
    req.body = req.product.dataValues; /* Store the new values */
    next();
}
