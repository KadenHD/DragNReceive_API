import { v4 as uuidv4 } from 'uuid';
import { Favoris, Shop, User } from '../Models/Models.js';
import { shopExist } from '../Validations/Exists.js';

export const addToFavoris = async (req, res) => {
    const favExist = await Favoris.findAll({ where: { userId: req.currentUser.id, shopId: req.body.shopId } });
    if (await shopExist(req.body.shopId) && req.currentUser.roleId === "4" && favExist.length === 0) {
        const data = {
            id: uuidv4(),
            userId: req.currentUser.id,
            shopId: req.body.shopId
        }
        Favoris.create(data)
            .then(() => {
                res.status(200).json({
                    success: `La boutique favoris a bien été ajoutée.`
                })
            })
            .catch(() => {
                res.status(500).json({
                    error: `Une erreur est survenue lors de l'ajout au favoris.`
                });
            })

    }
    else {
        res.status(403).json({
            error: `La boutique n'existe pas ou vous n'êtes pas autorisé.`
        });
    }
}

export const removeToFavoris = async (req, res) => {
    const favExist = await Favoris.findAll({ where: { userId: req.currentUser.id, shopId: req.params.id } });
    if (await shopExist(req.params.id) && req.currentUser.roleId === "4" && favExist) {
        Favoris.destroy({ where: { id: favExist[0].id } })
            .then(() => {
                res.status(200).json({
                    success: `La boutique favoris a bien été supprimée.`
                })
            })
            .catch(() => {
                res.status(500).json({
                    error: `Une erreur est survenue lors de la suppression du favoris.`
                });
            })

    }
    else {
        res.status(403).json({
            error: `La boutique n'existe pas ou vous n'êtes pas autorisé.`
        });
    }
}

export const seeClientFavoris = async (req, res) => {
    if (req.currentUser.roleId === "4") {
        const result = await Favoris.findAll({ where: { userId: req.currentUser.id } });
        let data = {
            result: result,
            shops: []
        }
        for (let i = 0; i < result.length; i++) {
            data.shops[i] = await Shop.findByPk(result[i].shopId);
        }
        res.status(200).json(data);
    }
    else {
        res.status(403).json({
            error: `Vous n'êtes pas autorisé.`
        });
    }
}