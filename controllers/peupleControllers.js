const { db } = require("../db.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const moment = require('moment');

dotenv.config();

//Client

exports.getClient = (req, res) => {
    const q = "SELECT * FROM clients WHERE est_supprime = 0";
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.postClient = (req, res) => {
    const q = 'INSERT INTO clients(`nom`, `prenom`, `adresse`, `telephone`, `email`) VALUES(?)';
  
    const values = [
        req.body.nom,
        req.body.prenom,
        req.body.adresse,
        req.body.telephone,
        req.body.email
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

exports.deleteClient = (req, res) => {
    const clientId = req.params.id;
    const q = "UPDATE clients SET est_supprime = 1 WHERE id = ?";
  
    db.query(q, [clientId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });

}

exports.putClient = (req, res) => {
    const clientId = req.params.id;
  const q = "UPDATE clients SET `nom`= ?, `prenom`= ?, `adresse`= ?, `telephone`= ?, `email`= ? WHERE id = ?"
  const values = [
    req.body.nom,
    req.body.prenom,
    req.body.adresse,
    req.body.telephone,
    req.body.email
    ]

  db.query(q, [...values,clientId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
}


//Livreur
exports.getLivreur = (req, res) => {
    const q = "SELECT * FROM livreur WHERE est_supprime = 0";
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.postLivreur = (req, res) => {
    const q = 'INSERT INTO livreur(`nom`, `numero`, `adresse`) VALUES(?)';
  
    const values = [
        req.body.nom,
        req.body.numero,
        req.body.adresse
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

exports.deleteLivreur = (req, res) => {
    
}

exports.putLivreur = (req, res) => {
    
}