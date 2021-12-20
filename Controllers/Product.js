import { v4 as uuidv4 } from 'uuid';

import { Product, Shop } from '../Models/Models.js';

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

    if (!req.body.name || !req.body.description || !req.body.price || !req.body.stock || !req.body.shopId) {
        res.status(400).json({
            error: `Requête non-valide.`
        });
        return;
    }

    //vérifier que l'image soit valide
    // Sauvegarder l'image dans la bonne route

    const path = ''; //Le nom de l'image format etc : "../Store/:idShop/Product/product.png"
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
            dir = 'Store/Companies/' + shopId + '/Products/' + product.id;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
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

    const id = req.params.id;

    Product.findByPk(id)
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

export const deleteProduct = (req, res) => {

    const id = req.params.id;
    const product = Product.findByPk(id);
    const shop = Shop.findByPk(product.shopId);

    Product.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                const dir = 'Store/Companies/' + shop.id + '/Products/' + id;
                if (fs.existsSync(dir)) {
                    fs.rmSync(dir, { recursive: true })
                }
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

    if (!req.body.name && !req.body.description && !req.body.price && !req.body.stock && !req.body.path) {
        res.status(400).json({
            error: "Requête non-valide."
        });
        return;
    }

    const id = req.params.id;
    const { name, description, price, stock, path } = req.body;
    const product = Product.findByPk(id);

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (path) { }; // Traitement soit de la suppression soit de l'ajout d'une nouvelle image produit

    Product.update(product, { where: { id: id } })
        .then(num => {
            if (num == 1) {
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
        })

}