const { db } = require("../db.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const moment = require('moment');

dotenv.config();

exports.getProduitCount = (req, res) => {
    const q = "SELECT COUNT(*) AS total FROM produits WHERE est_supprime = 0";
  
    db.query(q ,(error, data)=>{
      if(error) res.status(500).send(error)
  
      return res.status(200).json(data);
  })
}

exports.getProduit = (req, res) => {

    const q = 'SELECT * FROM produits INNER JOIN chaussures ON produits.id = chaussures.produit_id INNER JOIN categories ON produits.categorie = categories.id';
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
};

exports.getProduitView = (req,res) => {
    const {id} = req.params;
    const q = 'SELECT * FROM produits INNER JOIN chaussures ON produits.id = chaussures.produit_id INNER JOIN categories ON produits.categorie = categories.id WHERE produits.id = ?';

    db.query(q, id, (error, data) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.status(200).json(data);
        }
      });
}

exports.postProduit = (req, res) => {
    const q = 'INSERT INTO produits(`nom_produit`,`couleur`,`matiere`,`pointure`,`categorie`,`img`) VALUES(?)';
    const values = [
        req.body.nom_produit,
        req.body.couleur,
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
        const shoeQ = 'INSERT INTO chaussures(produit_id, quantite_stock, emplacement, prix) VALUES(?,?,?,?)';
        const shoeValues = [
            productId,
            req.body.quantite_stock,
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

exports.deleteProduit = (req, res) => {
    const employeeId = req.params.id;
    const q = "UPDATE produits SET est_supprime = 1 WHERE id = ?";
  
    db.query(q, [employeeId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  };

exports.putProduit = (req, res)=> {
    const {id} = req.params;
    const q = "UPDATE produits SET `nom_produit`= ?, `couleur`= ?, `matiere`= ?, `pointure`= ?, `categorie`= ?, `img`= ? WHERE id = ?"
    const values = [
        req.body.nom_produit,
        req.body.couleur,
        req.body.matiere,
        req.body.pointure,
        req.body.categorie,
        req.body.img
    ]
  
    db.query(q, [...values,id], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
      });
}


//Couleur
exports.getCouleur = (req, res) => {

    const q = "SELECT * FROM couleur";
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

//Categorie
exports.getCategorie = (req, res) => {

    const q = "SELECT * FROM categories WHERE est_supprime = 0";
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.postCategorie = (req, res) => {
    const q = 'INSERT INTO categories(`nom_categorie`) VALUES (?)';
  
    const { nom_categorie } = req.body;
  
    db.query(q, [nom_categorie], (error, data) => {
      if (error) {
        res.status(500).json(error);
        console.log(error);
      } else {
        res.json('Processus réussi');
      }
    });
  };

exports.deleteCategorie = (req, res) => {
    const {id} = req.params;
    const q = "DELETE FROM categories WHERE id = ?"
  
    db.query(q, [id], (err, data)=>{
        if (err) return res.send(err);
      return res.json(data);
    })
  };

  exports.putCategorie = (req, res) => {
    const {id} = req.params;
  const q = "UPDATE categories SET `nom_categorie`= ? WHERE id = ?"
  const { nom_categorie } = req.body;
 

  db.query(q, [nom_categorie,id], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
}


//Emplacement
exports.getEmplacement = (req, res) => {

    const q = "SELECT * FROM emplacement WHERE est_supprime = 0";
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.postEmplacement = (req, res) => {
    const q = 'INSERT INTO emplacement(`nom`, `capacite`) VALUES(?,?)';
  
    const values = [
        req.body.nom,
        req.body.capacite
    ]
    db.query(q, values, (error, data) => {
      if (error) {
        res.status(500).json(error);
        console.log(error);
      } else {
        res.json('Processus réussi');
      }
    });
  };

exports.deleteEmplacement = (req, res) => {
    const {id} = req.params;
    const q = "DELETE FROM emplacement WHERE id = ?"
  
    db.query(q, [id], (err, data)=>{
        if (err) return res.send(err);
      return res.json(data);
    })
  };

exports.putEmplacement = (req, res) => {
    const {id} = req.params;
  const q = "UPDATE emplacement SET `nom`= ?, `capacite= ? WHERE id = ?"
  const values = [
    req.body.nom,
    req.body.capacite
    ]

  db.query(q, [...values,id], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
}

//Matiere
exports.getMatiere = (req, res) => {

    const q = "SELECT * FROM matiere WHERE est_supprime = 0";
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.postMatiere = (req, res) => {
    const q = 'INSERT INTO matiere(`nom`) VALUES(?)';
  
    const values = [
        req.body.nom,
    ]
    db.query(q, values, (error, data) => {
      if (error) {
        res.status(500).json(error);
        console.log(error);
      } else {
        res.json('Processus réussi');
      }
    });
  };

  exports.deleteMatiere = (req, res) => {
    const { id } = req.params;
    const q = "DELETE FROM matiere WHERE id = ?";
  
    db.query(q, [id], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      return res.json(data);
    });
  };

  exports.putMatiere = (req, res) => {
    const { id } = req.params;
    const q = "UPDATE matiere SET `nom` = ? WHERE id = ?";
    const values = [
      req.body.nom,
      id
    ];
  
    db.query(q, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      return res.json(data);
    });
  };