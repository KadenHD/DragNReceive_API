import { v4 as uuidv4 } from 'uuid';

import { Shop } from '../Models/Models.js';
import { mkShop, rmShop, writeShop } from '../FileSystems/Shops.js';

export const findAllShops = (req, res) => {
    Shop.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la recherche de boutiques.`
            });
        });
}

export const createShop = async (req, res) => {
    const shop = {
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email,
        deleted: false
    }
    Shop.create(shop)
        .then(data => {
            mkShop(shop.id);
            res.status(200).json({
                success: `La boutique a bien été créé.`
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la création de la boutique.`
            });
        });
}

export const findOneShop = (req, res) => {
    Shop.findByPk(req.params.id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la recherche de la boutique.`
            });
        });
}

export const deleteShop = (req, res) => {
    // deleted: true
    Shop.destroy({ where: { id: req.params.id } })
        .then(num => {
            rmShop(req.params.id);
            res.status(200).json({
                success: `La boutique a bien été supprimée.`
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: `Une erreur est survenue de lors de la suppression de la boutique.`
            });
        });
}

export const updateShop = async (req, res) => {
    let shop = req.body;
    let img = {};
    if (req.files.logo) {
        img = req.files.logo;
        shop.path = img.name;
    }
    Shop.update(shop, { where: { id: req.params.id } })
        .then(num => {
            if (req.files.logo) {
                writeShop(req.params.id, img);
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