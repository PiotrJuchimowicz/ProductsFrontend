import React from 'react';
import ReactDOM from 'react-dom';
//komponent kontrolowany przez Board(square jest bezstanowy)
//Square otrzymuje wartosci od board i poprzez funkcje informuje Board o zmianach ktore musza zajsc w board
class SquareOld extends React.Component {
    //propertie sa immutable
    //state jest mutable
    //dobra praktyka: rodzic przekazuje elementy do dziecka, dziecko komunikuje sie z rodzicem poprzez funkcje od rodzica
    render() {
        return (
            <button className="squar"
                onClick={() => this.props.onClick()} >{/* do rzeczy od rodzica odwoluje sie poprzez this.props */}
                {this.props.value}
            </button>
        );
    }
}

//Jesli komponent nie posiada stanu i posiada jedynie metode render,mozna uczynic go komponentem funkcyjnym:
//oczywiscie funkcje nie maja zdefiniowanego this,wiec inaczej odwolujemy sie do properties

function Square(props){
    return (
        <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
    );
}

export default Square