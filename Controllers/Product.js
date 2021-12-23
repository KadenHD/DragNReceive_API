import { v4 as uuidv4 } from 'uuid';

import { Product } from '../Models/Models.js';
import { writeProduct, rmProduct } from '../Middlewares/FileSystem.js';

export const findAllProducts = (req, res) => {
    Product.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la recherche des produits.`
            });
        });
}

export const createProduct = async (req, res) => {
    if (!req.body.name || !req.body.description || !req.body.price || !req.body.stock || !req.body.shopId || !req.files) {
        res.status(400).json({
            error: `Requête non-valide.`
        });
        return;
    }
    const img = req.files.image
    const path = img.name;
    const product = {
        id: uuidv4(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        path: path,
        shopId: req.body.shopId
    }
    Product.create(product)
        .then(data => {
            writeProduct(product.id, product.shopId, img);
            res.status(200).json({
                success: `Le produit a bien été créé.`
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la création du produit.`
            });
        });
}

export const findOneProduct = (req, res) => {
    Product.findByPk(req.params.id)
        .then(data => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({
                    error: `Le produit n'existe pas.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la recherche du produit.`
            });
        });
}

export const deleteProduct = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
        res.status(404).json({
            error: `Le produit n'existe pas.`
        });
        return;
    }
    Product.destroy({ where: { id: product.id } })
        .then(num => {
            if (num == 1) {
                rmProduct(product.id, product.shopId);
                res.status(200).json({
                    success: `Le produit a bien été supprimé.`
                });
            } else {
                res.json({
                    error: `Impossible de supprimer le produit. Peut-être que le produit n'existe pas.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la suppression du produit.`
            });
        });
}

export const updateProduct = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
        res.status(404).json({
            error: `Le produit n'existe pas.`
        });
        return;
    }
    let img = {};
    if (req.files.image) {
        img = req.files.image;
        req.body.path = img.name;
    }
    Product.update(req.body, { where: { id: product.id } })
        .then(num => {
            if (num == 1) {
                if (req.files.image) {
                    writeProduct(product.id, product.shopId, img);
                }
                res.status(200).json({
                    success: `Le produit a bien été modifié`
                });
            } else {
                res.json({
                    error: `Impossible de modifier le produit. Peut-être que le produit n'existe pas.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la modification du produit.`
            });
        });
}