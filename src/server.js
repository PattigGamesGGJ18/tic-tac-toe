import Server from 'boardgame.io/server';
import TicTacToe from './games/tic-tac-toe/game.jsx';

const PORT = process.env.PORT || 8000;
const DEV = process.env.NODE_ENV === 'development';
const PROD = !DEV;

const app = Server({ games: [TicTacToe] });

if (DEV) {
  const KoaWebpack = require('koa-webpack');
  const WebpackConfig = require('../webpack.js');

  app.use(
    KoaWebpack({
      config: WebpackConfig,
    })
  );
}

if (PROD) {
  const path = require('path');

  const KoaStatic = require('koa-static');
  const KoaHelmet = require('koa-helmet');

  app.use(KoaStatic(path.join(__dirname, 'public')));
  app.use(KoaHelmet());
}

app.listen(PORT, () => {
  console.log(`Serving at: http://localhost:${PORT}/`);
});
