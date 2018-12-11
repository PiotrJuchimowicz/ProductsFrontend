import React from 'react';

function Header(props) {
    return (
        <div>
            <hr></hr>
            <h2>{props.value}</h2>
        </div>
    )
}

export default Header;