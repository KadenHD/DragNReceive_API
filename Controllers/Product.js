import { Product } from '../Models/Models.js';
import { scopedProducts } from '../Permissions/Products.js';
import { writeProduct } from '../Scripts/FileSystems.js';

export const findAllProducts = async (req, res) => {
    scopedProducts(req.currentUser, await Product.findAll())
        .then(result => {
            res.status(200).json(result);
        })
        .catch(() => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la recherche des produits.`
            });
        });
}

export const createProduct = async (req, res) => {
    Product.create(req.body)
        .then(() => {
            writeProduct(req.body.id, req.body.shopId, req.files.image);
            res.status(200).json({
                success: `Le produit a bien été créé.`
            });
        })
        .catch(() => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la création du produit.`
            });
        });
}

export const deleteProduct = async (req, res) => {
    Product.update(req.body, { where: { id: req.params.id } })
        .then(() => {
            res.status(200).json({
                success: `Le produit a bien été supprimé.`
            });
        })
        .catch(() => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la suppression du produit.`
            });
        });
}

export const findOneProduct = (req, res) => {
    try {
        res.status(200).json(req.product);
    } catch (err) {
        res.status(500).json({
            error: `Une erreur est survenue lors de la recherche du produit.`
        });
    }
}

export const updateProduct = async (req, res) => {
    Product.update(req.body, { where: { id: req.params.id } })
        .then(() => {
            if (req.files) { /* Save img */
                writeProduct(req.body.id, req.body.shopId, req.files.image);
            }
            res.status(200).json({
                success: `Le produit a bien été modifié`
            });
        })
        .catch(() => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la modification du produit.`
            });
        });
}