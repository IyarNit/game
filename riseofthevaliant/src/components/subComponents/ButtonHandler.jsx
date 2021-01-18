import React from 'react';


const ButtonHandler = (props) => {
    console.log(props, "buttonHandler")
    ////////Hooks////////////


    ////////Functions////////////


    /////////Jsx///////////
    return (
        <div>
            <button type="button" onClick={props.presser}>{props.btn}</button>

        </div>
    )
}
export default ButtonHandler 