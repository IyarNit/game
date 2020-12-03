import React from 'react';
import { Link } from "react-router-dom"


const Linker = (props) => {
    ////////Hooks////////////


    ////////Functions////////////


    /////////Jsx///////////
    return (
        <div>
            <Link style={{ cursor: "pointer", textDecoration: "none", color: props.colour || "white" }} to={props.to}>{props.text}</Link>
        </div>
    )
}
export default Linker 