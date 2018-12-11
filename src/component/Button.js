import React from 'react';

function Button(props){
    return (
        <button className="btn btn-info btn-lg pull-right"  onClick={props.onClick}>
      {props.value}
    </button>
    );
}

export default Button;