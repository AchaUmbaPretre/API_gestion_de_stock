const { db } = require("../db.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const moment = require('moment');

dotenv.config();

exports.getVente = (req, res) => {
    const q = `SELECT vente.*, clients.nom AS nom_client, produits.nom_produit, produits.img, livreur.prenom FROM vente 
    INNER JOIN clients ON vente.client_id = clients.id
    INNER JOIN produits ON vente.produit_id = produits.id
    INNER JOIN livreur ON vente.livreur_id = livreur.id
    WHERE vente.est_supprime = 0`;
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
};

exports.postVente = (req, res) => {
    const q = 'INSERT INTO vente(`date_vente`, `client_id`, `produit_id`, `livreur_id`, `quantite`, `prix_unitaire`) VALUES(?,?,?,?,?,?)';
  
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

//Retour

exports.getRetour = (req, res) => {
    const q = `SELECT retour.*, clients.nom, produits.nom_produit FROM retour
        INNER JOIN clients ON retour.client_id = clients.id
        INNER JOIN produits ON retour.produit_id = produits.id
        WHERE retour.est_supprime = 0`;
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.postRetour = (req, res) => {
    const q = 'INSERT INTO retour(`date_retour`, `client_id`, `produit_id`, `quantite`, `motif`) VALUES(?,?,?,?,?)';
  
    const values = [
        req.body.date_retour,
        req.body.client_id,
        req.body.produit_id,
        req.body.quantite,
        req.body.motif
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

exports.deleteRetour = (req, res) => {
    const {id} = req.params;
    const q = "UPDATE retour SET est_supprime = 1 WHERE id = ?";
  
    db.query(q, [id], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  };

exports.putRetour = (req, res)=> {
    const {id} = req.params;
    const q = "UPDATE retour SET `date_retour`= ?, `client_id`= ?, `produit_id`= ?, `quantite`= ?, `motif`= ? WHERE id = ?"
    const values = [
        req.body.date_retour,
        req.body.client_id,
        req.body.produit_id,
        req.body.quantite,
        req.body.motif
    ]
  
    db.query(q, [...values,id], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
      });
}

//echange

exports.getEchange = (req, res) => {
    const q = `SELECT * FROM echange WHERE est_supprime = 0`;
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.postEchange = (req, res) => {
    const q = 'INSERT INTO echange(`date_echange`, `client_id`, `produit_id`, `quantite`, `produit_echange_id`) VALUES(?,?,?,?,?)';
  
    const values = [
        req.body.date_retour,
        req.body.client_id,
        req.body.produit_id,
        req.body.quantite,
        req.body.produit_echange_id
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

exports.deleteEchange = (req, res) => {
    const {id} = req.params;
    const q = "UPDATE echange SET est_supprime = 1 WHERE id = ?";
  
    db.query(q, [id], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  };

  exports.putEchange = (req, res)=> {
    const {id} = req.params;
    const q = "UPDATE retour SET `date_retour`= ?, `client_id`= ?, `produit_id`= ?, `quantite`= ?, `produit_echange_id`= ? WHERE id = ?"
    const values = [
        req.body.date_retour,
        req.body.client_id,
        req.body.produit_id,
        req.body.quantite,
        req.body.produit_echange_id
    ]
  
    db.query(q, [...values,id], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
      });
}