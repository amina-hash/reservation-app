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

module.exports = {
    getAllServices
};