const { db } = require("../db.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const moment = require('moment');

dotenv.config();

exports.getProduit = (req, res) => {
    const q = "SELECT * FROM produits WHERE est_supprime = 0";
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
};

exports.postEmploye = (req, res) => {
    const q = 'INSERT INTO produits(`nom_produit`,`couleur`,`matiere`,`pointure`,`categorie`,`img`) VALUES(?)';
    const values = [
        req.body.nom_produit,
        req.body.coleur,
        req.body.matiere,
        req.body.pointure,
        req.body.categorie,
        req.body.img
    ]

    db.query(q, [values], (error,data)=>{
      if (error) {
        console.log(error)
        res.status(500).json(error);
      } else {

        const productId = data.insertId;
        const shoeQ = 'INSERT INTO chaussures(produit_id, couleur, matiere, pointure, emplacement, prix)';
        const shoeValues = [
            productId,
            req.body.coleur,
            req.body.matiere,
            req.body.pointure,
            req.body.emplacement,
            req.body.prix
          ];

          db.query(shoeQ, shoeValues, (error, data) =>{ 
            if (error) {
                console.error('Erreur lors de l\'insertion des données de la chaussure :', error);
                res.status(500).json({ error: 'Erreur lors de l\'insertion des données de la chaussure' });
                return;
              }

          })
        return res.json({ message: 'Processus réussi'});
      }
    });
}
