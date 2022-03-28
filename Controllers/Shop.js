import { Shop, Product, User } from '../Models/Models.js';
import { scopedShops } from '../Permissions/Shops.js';
import { mkShop, writeShop, rmUser } from '../Scripts/FileSystems.js';
import { createdShop, deletedShop, deletedUser } from '../Scripts/NodeMailer.js';

export const findAllShops = async (req, res) => {
    scopedShops(req.currentUser, await Shop.findAll())
        .then(result => {
            res.status(200).json(result);
        })
        .catch(() => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la récupération des boutiques.`
            });
        });
}

export const createShop = (req, res) => {
    Shop.create(req.body)
        .then(() => {
            mkShop(req.body.id);
            createdShop(req.body);
            res.status(200).json({
                success: `La boutique a bien été créée.`
            });
        })
        .catch(() => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la création de la boutique.`
            });
        });
}

export const findOneShop = (req, res) => {
    try {
        res.status(200).json(req.shop);
    } catch (err) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la recherche de la boutique.`
        });
    }
}

export const deleteShop = (req, res) => {
    Shop.update(req.body, { where: { id: req.params.id } })
        .then(async () => {
            deletedShop(req.shop)
            for (let i = 0; i < req.shop.dataValues.products.length; i++) {
                if (req.shop.dataValues.products[i].deleted === false) {
                    Product.update({ deleted: true }, { where: { id: req.shop.dataValues.products[i].id } });
                }
            }
            for (let i = 0; i < req.shop.dataValues.users.length; i++) {
                User.destroy({ where: { id: req.shop.dataValues.users[i].id } });
                rmUser(req.shop.dataValues.users[i].id);
                deletedUser(req.shop.dataValues.users[i]);
            }
            res.status(200).json({
                success: `La boutique a bien été désactivée.`
            });
        })
        .catch(() => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la suppression de la boutique.`
            });
        });
}

export const updateShop = (req, res) => {
    Shop.update(req.body, { where: { id: req.params.id } })
        .then(() => {
            if (req.files) { /* save img */
                writeShop(req.params.id, req.files.logo);
            }
            res.status(200).json({
                success: `La boutique a bien été modifiée`
            });
        })
        .catch(() => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la modification de la boutique.`
            });
        });
}