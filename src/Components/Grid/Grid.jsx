import { useState } from "react";
import Card from '../Card/Card';
import './Grid.css';
import isWinner from '../../helpers/checkWinner';

function Grid({numberOfCard}) {
    const [board, setBoard] = useState(Array(numberOfCard).fill(''));
    const [turn, setTurn] = useState("O"); // Initialize turn with 'O'
    const [winner, setWinner] = useState(null);

    function play(index) {
        if (board[index] === '') { // Check if the card is empty
            board[index] = turn;
            const win = isWinner(board, turn);
            if (win) {
                setWinner(win);
            }
            setBoard([...board]);
            setTurn(turn === 'O' ? 'X' : 'O'); // Toggle between 'O' and 'X'
        }
    }
        function reset(){
            setTurn(winner);
            setWinner(null);
            setBoard(Array(numberOfCard).fill(''))
        }
    return (
        <div className="grid-wrapper">
            {winner && (
                <>
                    <h1 className="turn-highlight win-color">Winner is: {winner}</h1>
                    <button className="reset" onClick={reset}>Reset Game</button>
                </>
            )}
            <h1 className="turn-highlight">Current turn: {turn}</h1>
            <div className="grid">
                {board.map((el, idx) => <Card gameEnd={winner ? true : false} key={idx} onPlay={play} player={el} index={idx} />)}
                <h3 className="turn-highlight">Tic Tac Toe</h3>
            </div>
        </div>
    );
}

export default Grid;
