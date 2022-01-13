import { v4 as uuidv4 } from 'uuid';

import { Shop } from '../Models/Models.js';
import { mkShop, writeShop } from '../FileSystems/Shops.js';

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

export const createShop = (req, res) => {
    Shop.create(req.shop)
        .then(data => {
            mkShop(req.shop.id);
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
    req.shop.deleted = true;
    Shop.update(req.shop, { where: { id: req.params.id } })
        .then(num => {
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
    Shop.update(req.shop, { where: { id: req.params.id } })
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