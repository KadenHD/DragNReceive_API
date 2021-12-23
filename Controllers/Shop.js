import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

import { Shop } from '../Models/Models.js';

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
            let dir = 'Store/Companies/' + shop.id + '/Products/';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            dir = 'Store/Companies/' + shop.id + '/Logo/';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
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

    const id = req.params.id;

    Shop.findByPk(id)
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

    const id = req.params.id;

    Shop.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                const dir = 'Store/Companies/' + id;
                if (fs.existsSync(dir)) {
                    fs.rmSync(dir, { recursive: true })
                }
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

    if (!req.body.name && !req.body.email && !req.body.phone && !req.body.city && !req.body.street && !req.body.postal && !req.files.logo) {
        res.status(400).json({
            error: "Requête non-valide."
        });
        return;
    }

    const { name, email, phone, city, street, postal } = req.body;
    const shop = await Shop.findByPk(req.params.id);

    if (name) shop.name = name;
    if (email) shop.email = email;
    if (phone) shop.phone = phone;
    if (city) shop.city = city;
    if (street) shop.street = street;
    if (postal) shop.postal = postal;

    let dir = '';
    let img = {};
    if (req.files.logo) {
        img = req.files.logo;
        shop.path = img.name;
    }

    Shop.update(shop, { where: { id: shop.id } })
        .then(num => {
            if (num == 1) {
                if (req.files.logo) {
                    dir = 'Store/Companies/' + shop.id + '/Logo/';
                    if (fs.existsSync(dir)) {
                        fs.rmSync(dir, { recursive: true })
                    }
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir, { recursive: true });
                    }
                    fs.writeFile(dir + shop.path, img.data, function (err) {
                        if (err) throw err;
                        console.log("Image : " + dir + shop.path + " saved !");
                    });
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
        })

}