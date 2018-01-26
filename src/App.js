import { Client } from 'boardgame.io/client';
import { Game } from 'boardgame.io/core';

import React from 'react';
import './App.css';

function IsVictory(cells) {
    const positions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let pos of positions) {
        const symbol = cells[pos[0]];
        let winner = symbol;
        for (let i of pos) {
            if (cells[i] !== symbol) {
                winner = null;
                break;
            }
        }
        if (winner !== null) return true;
    }

    return false;
}

const TicTacToe = Game({
    setup: () => ({ cells: Array(9).fill(null) }),

    moves: {
        clickCell(G, ctx, id) {
            const cells = [...G.cells];

            if (cells[id] === null) {
                cells[id] = ctx.currentPlayer;
            }

            return { ...G, cells };
        }
    },

    flow: {
        endGameIf: (G, ctx) => {
            if (IsVictory(G.cells)) {
                return ctx.currentPlayer;
            }
        }
    }
});


class TicTacToeBoard extends React.Component {
    onClick(id) {
        if (this.isActive(id)) {
            this.props.moves.clickCell(id);
            this.props.events.endTurn();
        }
    }

    isActive(id) {
        if (!this.props.isActive) return false;
        if (this.props.G.cells[id] !== null) return false;
        return true;
    }

    render() {
        let winner = '';
        if (this.props.ctx.gameover !== undefined) {
            winner = <div id='winner'>Winner: {this.props.ctx.gameover}</div>;
        }

        let tbody = [];
        for (let i = 0; i < 3; i++) {
            let cells = [];
            for (let j = 0; j < 3; j++) {
                const id = 3 * i + j;
                cells.push(
                    <td key={id}
                        className={this.isActive(id) ? 'active' : ''}
                        onClick={() => this.onClick(id)}>
                        {this.props.G.cells[id]}
                    </td>
                );
            }
            tbody.push(<tr key={i}>{cells}</tr>);
        }

        return (
            <div>
                <table id="board">
                    <tbody>{tbody}</tbody>
                </table>
                {winner}
            </div>
        );
    }
}

var App = Client({
    board: TicTacToeBoard,
    game: TicTacToe,
});

export default App;
