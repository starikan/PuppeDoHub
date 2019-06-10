var express = require('express');
const ppd = require('PuppeDo');

function runWsServer() {
  const app = express();
  app.use(express.static(__dirname + '/'));
  app.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  app.listen(3002, () => console.log('listening on http://localhost:3002/'));
}

const wss = ppd.createSocketServer();
runWsServer();
