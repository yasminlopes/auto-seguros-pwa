const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const webpush = require('web-push')
const { listarSeguros, salvarSeguro } = require('./seguro-service');
const { adicionaPushSubscriber } = require('./adiciona-push-subscriber');
const { enviarNotificacao } = require('./enviar-notificacao');

const vapidKeys = {
  publicKey: 'BGs-GrCwDhu1z_3yscq8yonxiZmGT2CBwRynJi9dFSpeynvPrrmeVVJ3YgzGBgTmgxb6qEg2p_3-nRWjGYdBm1k',
  privateKey: 'THMG1jOP0QsMVgo5xB3zrhZ1UQ-0ZbWcQwgnQGFoqLo'
}

webpush.setVapidDetails(
  'mailto:test@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

app.route('/api/seguros').post(salvarSeguro);

app.route('/api/seguros').get(listarSeguros);

app.route('/api/notificacao').post(adicionaPushSubscriber);

app.route('/api/notificacao/enviar').post(enviarNotificacao);

const PORT = 9000;
const HOST = 'localhost';

const httpServer = app.listen(PORT, HOST, () => {
  console.log('HTTP Server running at http://' + HOST + ':' + PORT);
});
