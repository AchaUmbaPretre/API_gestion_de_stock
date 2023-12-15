const { db } = require("../db.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const moment = require('moment');

dotenv.config();

exports.getRapportVente = (req, res) => {

    const q = `SELECT vente.id, produits.nom_produit AS nom_produit,produits.img, categories.nom_categorie, marque.nom, vente.quantite AS quantite_vendue, vente.prix_unitaire AS prix_unitaire, (vente.quantite * vente.prix_unitaire) AS 
    montant_total, (chaussures.quantite_stock - SUM(vente.quantite)) AS quantite_restante FROM vente 
    INNER JOIN produits ON vente.produit_id = produits.id 
    INNER JOIN chaussures ON vente.produit_id = chaussures.produit_id 
    INNER JOIN categories ON produits.categorie = categories.id
    INNER JOIN marque ON produits.marque = marque.id
    WHERE vente.est_supprime = 0 
    GROUP BY vente.id;`
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.getRapportAchats = (req, res) => {

    const q = `SELECT p.id, p.nom_produit AS nom_produit, p.img, SUM(a.quantite) AS quantite_totale_achetee, 
                    SUM(a.quantite * a.prix_unitaire) AS montant_total_achat, 
                    c.quantite_stock AS quantite_en_stock
                FROM vente a
                JOIN produits p ON a.produit_id = p.id
                JOIN chaussures c ON a.produit_id = c.produit_id
                GROUP BY p.id, p.nom_produit, c.quantite_stock`;
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}



