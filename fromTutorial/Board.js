import React from 'react';
import ReactDOM from 'react-dom';
import Square from './Square'

class Board extends React.Component {
    constructor(props) {
        super(props)//pierwsza linijka konstruktora musi byc super(props)
        //stan jest JSONEM, definiujemy go w konstruktorze
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        }
    }
    //tworzy kopie tablicy,zmienia jej stan i ustawia oryginalna tablice na jej nowa wersje
    handleClick(i) {
        const squares = this.state.squares.slice();//kopiuje tablice 
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }
    renderSquare(i) {
        return <Square value={this.state.squares[i]}/* przekazywanie properties jako klucz : wartosc(funkcja,obiekt,cos innego) */
            onClick={() => this.handleClick(i)} />; {/* wysyla funkcje do square,w { } mozna umieszczac kod JS */ }
    }

    render() {
        const status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

export default Board