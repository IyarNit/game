import React from 'react';


const SubEventButtonHandler = (props) => {
    ////////Hooks////////////
    console.log("props in sub event buttons handler", props)


    ////////Functions////////////


    /////////Jsx///////////
    return (
        <div>
            <button type="button" onClick={props.onClick}>{props.btn.location}</button>

        </div>
    )
}
export default SubEventButtonHandler 