import fs from 'fs';

import { Logo, Shop } from '../Models/Models.js';

export const findAllLogos = (req, res) => {

    Logo.findAll()
        .then(data => {
            res.status(200).json(data); // Ajouter l'envoie de l'image
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la recherche des logos.`
            });
        });

}

export const findOneLogo = (req, res) => {

    const id = req.params.id;

    Logo.findByPk(id)
        .then(data => {
            if (data) {
                res.status(200).json(data); // Ajouter l'envoie de l'image
            } else {
                res.status(404).json({
                    error: `Le logo n'existe pas.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la recherche du logo.`
            });
        });

}

export const updateLogo = async (req, res) => {

    if (!req.files) {
        res.status(400).json({
            error: "Requête non-valide."
        });
        return;
    }

    const img = req.files.logo;

    //vérifier que l'image soit valide

    const id = req.params.id;
    const logo = Logo.findByPk(id);
    const shop = await Shop.findAll({ where: { logoId: id } });
    const dir = 'Store/Companies/' + shop[0].id + '/Logo/' + id + '/';

    logo.path = img.name;

    await Logo.update(logo, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                if (fs.existsSync(dir)) {
                    fs.rmSync(dir, { recursive: true })
                }
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                fs.writeFile(dir + logo.path, img.data, function (err) {
                    if (err) throw err;
                    console.log("Image : " + dir + logo.path + " saved !");
                });
                res.status(200).json({
                    success: `Le logo a bien été modifié`
                });
            } else {
                res.json({
                    error: `Impossible de modifier le logo. Peut-être que le logo n'existe pas.`
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue de lors de la modification du logo.`
            });
        })

}
