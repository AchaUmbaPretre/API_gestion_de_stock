const { db } = require("../db.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const moment = require('moment');

dotenv.config();

exports.getVente = (req, res) => {
    const q = "SELECT * FROM vente WHERE est_supprime = 0";
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
};

exports.postVente = (req, res) => {
    const q = 'INSERT INTO vente(`date_vente`, `client_id`, `produit_id`, `livreur_id`, `quantite`, `prix_unitaire`) VALUES(?)';
  
    const values = [
        req.body.date_vente,
        req.body.client_id,
        req.body.produit_id,
        req.body.livreur_id,
        req.body.quantite,
        req.body.prix_unitaire
    ]
    db.query(q, values, (error, data) => {
      if (error) {
        res.status(500).json(error);
        console.log(error);
      } else {
        res.json('Processus réussi');
      }
    });
}

exports.deleteVente = (req, res) => {
    const {id} = req.params;
    const q = "UPDATE vente SET est_supprime = 1 WHERE id = ?";
  
    db.query(q, [id], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  };

  exports.putVente = (req, res)=> {
    const {id} = req.params;
    const q = "UPDATE vente SET `date_vente`= ?, `client_id`= ?, `produit_id`= ?, `livreur_id`= ?, `quantite`= ?, `prix_unitaire`= ? WHERE id = ?"
    const values = [
        req.body.date_vente,
        req.body.client_id,
        req.body.produit_id,
        req.body.livreur_id,
        req.body.quantite,
        req.body.prix_unitaire
    ]
  
    db.query(q, [...values,id], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
      });
}