import React from 'react';
import { Client } from 'boardgame.io/client';

import User from '../../user.jsx';

import Game from './game.jsx';
import Board from './board.jsx';

var App = Client({
    board: Board,
    game: Game,
    multiplayer: true,
});

const TicTacToe = () => (
    <div>
        <h1>Tic-Tac-Toe</h1>
        <div className="runner">
            <div className="run">
                <App gameID="tic-tac-toe" playerID={User.name} />
            </div>
        </div>
    </div>
);

export default TicTacToe;
