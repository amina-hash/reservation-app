const db = require("../config/db");

const getAllServices = (req, res) => {

    const sql = "SELECT * FROM services";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Erreur serveur",
                error: err.message
            });
        }

        res.status(200).json(result);

    });

};

const getServiceById = (req, res) => {

    const { id } = req.params;

    const sql = "SELECT * FROM services WHERE id = ?";

    db.query(sql, [id], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erreur serveur"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Service introuvable"
            });
        }

        res.status(200).json(results[0]);

    });

};
const createService = (req, res) => {

    const { nom, description, prix, duree } = req.body;

    const sql = `
        INSERT INTO services (nom, description, prix, duree)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [nom, description, prix, duree], (err, result) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Erreur lors de l'ajout du service"
            });
        }

        res.status(201).json({
            success: true,
            message: "Service ajouté avec succès",
            id: result.insertId
        });

    });

};
const updateService = (req, res) => {

    const { id } = req.params;
    const { nom, description, prix, duree } = req.body;

    const sql = `
        UPDATE services
        SET nom = ?, description = ?, prix = ?, duree = ?
        WHERE id = ?
    `;

    db.query(sql, [nom, description, prix, duree, id], (err, result) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Erreur lors de la modification"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Service introuvable"
            });
        }

        res.status(200).json({
            success: true,
            message: "Service modifié avec succès"
        });

    });

};
const deleteService = (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM services WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Erreur lors de la suppression"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Service introuvable"
            });
        }

        res.status(200).json({
            success: true,
            message: "Service supprimé avec succès"
        });

    });

};
module.exports = {
    getAllServices,
getServiceById,
    createService,
    updateService,
    deleteService
};