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

exports.getVenteOne = (req, res) => {
    const {id} = req.params;

    const q = `SELECT vente.*, clients.nom AS nom_client, produits.nom_produit, produits.img, livreur.prenom FROM vente 
    INNER JOIN clients ON vente.client_id = clients.id
    INNER JOIN produits ON vente.produit_id = produits.id
    INNER JOIN livreur ON vente.livreur_id = livreur.id
    WHERE vente.est_supprime = 0 AND vente.id = ?`;
     
    db.query(q, id,(error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
};

exports.getVenteTotalPrix = (req, res) => {
    const q = `
      SELECT
        SUM(vente.prix_unitaire) AS vente_total
      FROM
        vente
      WHERE
        vente.est_supprime = 0
    `;
  
    db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
    });
  };

exports.postVente = (req, res) => {
    const q = 'INSERT INTO vente(`date_vente`, `client_id`, `produit_id`, `livreur_id`, `quantite`, `prix_unitaire`) VALUES(?,?,?,?,?,?)';
    const selectQuery = 'SELECT quantite_stock FROM chaussures WHERE produit_id = ?';
    const updateQuery = 'UPDATE chaussures SET quantite_stock = ? WHERE produit_id = ?';
  
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
        console.log(error);
        res.status(500).json(error);
      } else {
        const venteId = data.insertId;
  
        db.query(selectQuery, [req.body.produit_id], (selectError, selectData) => {
          if (selectError) {
            console.log(selectError);
            res.status(500).json(selectError);
          } else {
            const currentQuantiteStock = selectData[0].quantite_stock;
            const updatedQuantiteStock = currentQuantiteStock - req.body.quantite;
  
            db.query(updateQuery, [updatedQuantiteStock, req.body.produit_id], (updateError, updateData) => {
              if (updateError) {
                console.log(updateError);
                res.status(500).json(updateError);
              } else {
                res.json('Processus réussi');
              }
            });
          }
        });
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
    const q = `SELECT retour.*, clients.nom, produits.nom_produit, produits.img FROM retour
        INNER JOIN clients ON retour.client_id = clients.id
        INNER JOIN produits ON retour.produit_id = produits.id
        WHERE retour.est_supprime = 0`;
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.getRetourOne = (req, res) => {
    const {id} = req.params;

    const q = `SELECT retour.*, clients.nom, produits.nom_produit FROM retour
        INNER JOIN clients ON retour.client_id = clients.id
        INNER JOIN produits ON retour.produit_id = produits.id
        WHERE retour.est_supprime = 0 AND retour.id = ?`;
     
    db.query(q, [id],(error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.postRetour = (req, res) => {
    const q = 'INSERT INTO retour(`date_retour`, `client_id`, `produit_id`, `quantite`, `motif`) VALUES(?,?,?,?,?)';
    const selectQuery = 'SELECT quantite_stock FROM chaussures WHERE produit_id = ?';
    const updateQuery = 'UPDATE chaussures SET quantite_stock = ? WHERE produit_id = ?';
  
    const values = [
      req.body.date_retour,
      req.body.client_id,
      req.body.produit_id,
      req.body.quantite,
      req.body.motif
    ]
  
    db.query(q, values, (error, data) => {
      if (error) {
        console.log(error);
        res.status(500).json(error);
      } else {
        const retourId = data.insertId;
  
        db.query(selectQuery, [req.body.produit_id], (selectError, selectData) => {
          if (selectError) {
            console.log(selectError);
            res.status(500).json(selectError);
          } else {
            const currentQuantiteStock = selectData[0].quantite_stock;
            const updatedQuantiteStock = currentQuantiteStock + req.body.quantite;
  
            db.query(updateQuery, [updatedQuantiteStock, req.body.produit_id], (updateError, updateData) => {
              if (updateError) {
                console.log(updateError);
                res.status(500).json(updateError);
              } else {
                res.json('Processus réussi');
              }
            });
          }
        });
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
    const q = `SELECT echange.*, clients.nom, produits1.nom_produit,produits1.img, produits2.nom_produit AS nom_produit_echange
    FROM echange
    INNER JOIN clients ON echange.client_id = clients.id
    INNER JOIN produits AS produits1 ON echange.produit_id = produits1.id
    INNER JOIN produits AS produits2 ON echange.produit_echange_id = produits2.id
    WHERE echange.est_supprime = 0;`
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.getEchangeOne = (req, res) => {
    const {id} = req.params;

    const q = `SELECT echange.*, clients.nom, produits1.nom_produit,produits1.img, produits2.nom_produit AS nom_produit_echange
    FROM echange
    INNER JOIN clients ON echange.client_id = clients.id
    INNER JOIN produits AS produits1 ON echange.produit_id = produits1.id
    INNER JOIN produits AS produits2 ON echange.produit_echange_id = produits2.id
    WHERE echange.est_supprime = 0 AND echange.id = ?`
     
    db.query(q, id,(error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.postEchange = (req, res) => {
    const q = 'INSERT INTO echange(`date_echange`, `client_id`, `produit_id`, `quantite`, `produit_echange_id`) VALUES(?,?,?,?,?)';
    const selectVenteQuery = 'SELECT quantite, produit_id FROM vente WHERE produit_id = ?';
    const updateVenteQuery = 'UPDATE vente SET quantite = ?, produit_id = ? WHERE produit_id = ?';
    const selectStockQuery = 'SELECT quantite_stock FROM chaussures WHERE produit_id = ?';
    const updateStockQuery = 'UPDATE chaussures SET quantite_stock = ? WHERE produit_id = ?';
  
    const values = [
      req.body.date_echange,
      req.body.client_id,
      req.body.produit_id,
      req.body.quantite,
      req.body.produit_echange_id
    ]
  
    db.query(q, values, (error, data) => {
      if (error) {
        console.log(error);
        res.status(500).json(error);
      } else {
        const echangeId = data.insertId;
  
        // Mise à jour de la vente d'origine
        db.query(selectVenteQuery, [req.body.produit_id], (selectVenteError, selectVenteData) => {
          if (selectVenteError) {
            console.log(selectVenteError);
            res.status(500).json(selectVenteError);
          } else {
            const currentQuantiteVente = selectVenteData[0].quantite;
            const updatedQuantiteVente = currentQuantiteVente - req.body.quantite;
            const updatedProduitId = req.body.produit_echange_id;
  
            db.query(updateVenteQuery, [updatedQuantiteVente, updatedProduitId, req.body.produit_id], (updateVenteError, updateVenteData) => {
              if (updateVenteError) {
                console.log(updateVenteError);
                res.status(500).json(updateVenteError);
              } else {
                // Mise à jour du stock
                db.query(selectStockQuery, [req.body.produit_id], (selectStockError, selectStockData) => {
                  if (selectStockError) {
                    console.log(selectStockError);
                    res.status(500).json(selectStockError);
                  } else {
                    const currentQuantiteStock = selectStockData[0].quantite_stock;
                    const updatedQuantiteStock = currentQuantiteStock + req.body.quantite;
  
                    db.query(updateStockQuery, [updatedQuantiteStock, req.body.produit_id], (updateStockError, updateStockData) => {
                      if (updateStockError) {
                        console.log(updateStockError);
                        res.status(500).json(updateStockError);
                      } else {
                        res.json('Processus réussi');
                      }
                    });
                  }
                });
              }
            });
          }
        });
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