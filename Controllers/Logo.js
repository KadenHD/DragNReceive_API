import { Logo } from '../Models/Models.js';

export const findAllLogos = (req, res) => {

    Logo.findAll()
        .then(data => {
            res.status(200).json(data); // Remplacer par l'envoie de l'image
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
                res.status(200).json(data); // Remplacer par l'envoie de l'image
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

    // Supprimer l'ancienne image et remplacer par la nouvelle
    //vérifier que l'image soit valide

    const id = req.params.id;
    const logo = Logo.findByPk(id);

    const path = ""; //Le nom de l'image format etc : "../Store/idShop/Logo/logo.png"
    logo.path = path;

    Logo.update(logo, { where: { id: logo.id } })
        .then(num => {
            if (num == 1) {
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
