import React from 'react';

function Header(props) {
    let text = props.value;
    if(typeof text != "string"){
        console.error("Wrong property passed to Header component")
    }
    return (
        <div>
            <hr></hr>
            <h2>{props.value}</h2>
        </div>
    )
}

export default Header;