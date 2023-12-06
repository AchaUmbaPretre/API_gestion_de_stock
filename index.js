const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const usersRoute = require('./routes/users');

const app = express();

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute);
app.use('/api/users', usersRoute);

app.post('/api/upload', (req, res) => {
  const { imageBase64 } = req.body;

  const base64Data = imageBase64.replace(/^data:image\/png;base64,/, '');
  const fileName = Date.now() + '.png';

  require('fs').writeFile(`../admin-drc/public/upload/${fileName}`, base64Data, 'base64', function (err) {
    if (err) {
      console.log(err);
      res.status(500).json({ success: false, message: 'Erreur lors de l\'enregistrement de l\'image' });
    } else {
      res.status(200).json({ success: true, message: 'Image enregistrée avec succès' });
    }
  });
});

app.listen(8080, () => {
  console.log('Serveur est connecté');
});