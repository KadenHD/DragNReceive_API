import { v4 as uuidv4 } from 'uuid';

import { Product } from '../Models/Models.js';
import { writeProduct } from '../FileSystems/Products.js';

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
    const img = req.files.image
    const path = img.name;
    const product = {
        id: uuidv4(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        path: path,
        deleted: false,
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
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la recherche du produit.`
            });
        });
}

export const deleteProduct = async (req, res) => {
    Product.update(req.product, { where: { id: req.params.id } })
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
    const product = await Product.findByPk(req.params.id);
    let img = {};
    if (req.files.image) {
        img = req.files.image;
        req.body.path = img.name;
    }
    Product.update(req.body, { where: { id: product.id } })
        .then(num => {
            if (req.files.image) {
                writeProduct(product.id, product.shopId, img);
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