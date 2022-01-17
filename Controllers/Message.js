import { Message } from '../Models/Models.js';

export const createMessage = (req, res) => {
    Message.create(req.body)
        .then(data => {
            res.status(200).json({
                success: `Le message a bien été créé.`
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Une erreur est survenue lors de la création du message.`
            });
        });
}