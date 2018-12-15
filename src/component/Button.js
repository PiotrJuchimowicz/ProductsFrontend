import React from 'react';

function Button(props){
    return (
        <button className="btn btn-info"  onClick={props.onClick}>
      {props.value}
    </button>
    );
}

export default Button;