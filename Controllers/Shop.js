import { v4 as uuidv4 } from 'uuid';

import { Shop } from '../Models/Models.js';
import { mkShop, rmShop, writeShop } from '../Middlewares/FileSystem.js';

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

    if (!req.body.name || !req.body.email) {
        res.status(400).json({
            error: `Requête non-valide.`
        });
        return;
    }

    const shopNameExist = await Shop.findOne({ where: { name: req.body.name } });
    if (shopNameExist) return res.status(400).json({
        error: `Le nom ${req.body.name} est déjà utilisée.`
    });

    const shopEmailExist = await Shop.findOne({ where: { email: req.body.email } });
    if (shopEmailExist) return res.status(400).json({
        error: `L'email ${req.body.email} est déjà utilisée.`
    });

    const shop = {
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email,
    }

    Shop.create(shop)
        .then(data => {
            mkShop(shop.id);
            res.status(200).json({
                success: `L'utilisateur a bien été créé.`
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la création de l'utilisateur.`
            });
        });

}

export const findOneShop = (req, res) => {
    Shop.findByPk(req.params.id)
        .then(data => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    error: `La boutique n'existe pas.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la recherche de la boutique.`
            });
        });
}

export const deleteShop = (req, res) => {
    Shop.destroy({ where: { id: req.params.id } })
        .then(num => {
            if (num == 1) {
                rmShop(req.params.id);
                res.status(200).json({
                    success: `La boutique a bien été supprimée.`
                });
            } else {
                res.json({
                    error: `Impossible de supprimer la boutique. Peut-être que la boutique n'existe pas.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la suppression de la boutique.`
            });
        });
}

export const updateShop = async (req, res) => {
    const shop = req.body;
    let img = {};
    if (req.files.logo) {
        img = req.files.logo;
        shop.path = img.name;
    }
    Shop.update(shop, { where: { id: req.params.id } })
        .then(num => {
            if (num == 1) {
                if (req.files.logo) {
                    writeShop(req.params.id, img);
                }
                res.status(200).json({
                    success: `La boutique a bien été modifiée`
                });
            } else {
                res.json({
                    error: `Impossible de modifier la boutique. Peut-être que la boutique n'existe pas.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la modification de la boutique.`
            });
        });
}