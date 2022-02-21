import { Shop } from '../Models/Models.js';

import { scopedShops } from '../Permissions/Shops.js';

import { mkShop, writeShop } from '../FileSystems/Shops.js';

export const findAllShops = async (req, res) => {
    let data = await Shop.findAll();
    scopedShops(req.currentUser, data)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la récupération des boutiques.`
            });
        });
}

export const createShop = (req, res) => {
    Shop.create(req.body)
        .then(data => {
            mkShop(req.body.id);
            res.status(200).json({
                success: `La boutique a bien été créée.`
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la création de la boutique.`
            });
        });
}

export const findOneShop = (req, res) => {
    try {
        res.status(200).json(req.shop)
    } catch (err) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la recherche de la boutique.`
        });
    }
}

export const deleteShop = (req, res) => {
    Shop.update(req.body, { where: { id: req.params.id } })
        .then(num => {
            /* update deleted true to all products and users (and store folder) */
            res.status(200).json({
                success: `La boutique a bien été supprimée.`
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la suppression de la boutique.`
            });
        });
}

export const updateShop = (req, res) => {
    Shop.update(req.body, { where: { id: req.params.id } })
        .then(num => {
            if (req.files) { /* save img */
                writeShop(req.params.id, req.files.logo);
            }
            res.status(200).json({
                success: `La boutique a bien été modifiée`
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la modification de la boutique.`
            });
        });
}