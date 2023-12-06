const { db } = require('../db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.register = (req, res) => {
    const q = 'SELECT * FROM users WHERE email = ? OR username = ?';
    db.query(q, [req.body.email, req.body.name], (error, data) => {
        if (error) return res.json(error);
        if (data.length)
            return res.status(409).send({
                message: "L'utilisateur existe déjà",
                success: false,
            });

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const insertQuery = 'INSERT INTO users(`username`,`email`,`password`) VALUES (?)';
        const values = [req.body.username, req.body.email, hash];

        db.query(insertQuery, [values], (error, data) => {
            if (error) return res.json(error);
            return res.status(200).send({
                message: "L'utilisateur a été créé",
                success: true,
            });
        });
    });
};

exports.login = (req, res) => {
    const q = 'SELECT * FROM users WHERE email = ?';
    db.query(q, [req.body.email], (error, data) => {
      if (error) return res.json(error);
      if (data.length === 0)
        return res.status(404).send({
          message: "Utilisateur n'existe pas",
          success: false,
        });
  
      if (!data[0].password)
        return res.status(400).send({
          message: "Le mot de passe est manquant",
          success: false,
        });
  
      const passwordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
  
      if (!passwordCorrect)
        return res.status(400).send({
          message: "Le mot de passe est incorrect",
          success: false,
        });
  
      const token = jwt.sign({ id: data[0].id }, process.env.JWT, { expiresIn: '24h' });
      const { password, ...other } = data[0];
  
      return res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
        .status(200)
        .json(other);
    });
  };

exports.logout = (req, res) => {
    res.clearCookie('access_token', {
        sameTime: 'none',
        secure: true,
    }).status(200).json('Utilisateur est déconnecté');
};