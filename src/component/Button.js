import React from 'react';

function Button(props){
    let text = props.value;
    if(typeof text != "string"){
        console.error("Wrong property type passed to ButtonComponent")
    }
    return (
        <button className="btn btn-info"  onClick={props.onClick}>
      {text}
    </button>
    );
}

export default Button;