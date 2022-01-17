import { Product } from '../Models/Models.js';

import { writeProduct } from '../FileSystems/Products.js';

export const createProduct = async (req, res) => {
    Product.create(req.body)
        .then(data => {
            writeProduct(req.body.id, req.body.shopId, req.files.image);
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

export const deleteProduct = async (req, res) => {
    Product.update(req.body, { where: { id: req.params.id } })
        .then(num => {
            res.status(200).json({
                success: `Le produit a bien été supprimé.`
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: `Une erreur est survenue de lors de la suppression du produit.`
            });
        });
}

export const updateProduct = async (req, res) => {
    Product.update(req.body, { where: { id: req.params.id } })
        .then(num => {
            if (req.files.image) {
                writeProduct(req.body.id, req.body.shopId, req.files.image);
            }
            res.status(200).json({
                success: `Le produit a bien été modifié`
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la modification du produit.`
            });
        });
}