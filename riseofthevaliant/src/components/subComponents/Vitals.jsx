import React, { useState, useEffect } from 'react';
import { connect } from "react-redux"
import { withAuth } from "../TokenAuth"

const Vitals = (props) => {
    ////////Hooks////////////
    // console.log("update")
    // const [updateVitals, setUpdateVitals] = useState(false);
    useEffect(() => {
        // console.log(props)
    }, []);
    ////////Functions////////////

    /////////Jsx///////////
    return (
        <div>
            <h3>Your Vitals, {props.character?.userName}</h3>
            {/* <p>HP: {props.HP || props.character.currentHP}</p> */}
            <p>HP: {props.character?.currentHP}</p>
            <p>Weapon: {props.character?.currentWeapon?.weapon}</p>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        character: state.character,
    }

}
export default withAuth(connect(mapStateToProps)(Vitals))