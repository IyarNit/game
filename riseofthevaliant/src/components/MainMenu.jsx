import React, { useState, useEffect, useRef } from 'react';
import { Linker, Modal, Form, Logout } from "../assets/componentImporter"
import { connect } from "react-redux"
import { currentUser } from "../store/actions/actionsConfig"

const MainMenu = (props) => {
    // console.log("main menu props", props)
    ////////Hooks////////////
    const [showModal, setShowModal] = useState(false)
    const [modalText, setModalText] = useState("")

    const token = localStorage.getItem("valiantToken") || null

    useEffect(() => {
    }, []);
    ////////Functions////////////

    const hideModal = () => {
        setShowModal(false)
    }

    const toggleRegister = () => {
        setModalText("Register")
        setShowModal(true)
    }
    const toggleLogin = () => {
        setModalText("Login")
        setShowModal(true)
    }

    /////////Jsx///////////
    return (
        <div className="mainMenuDiv">
            <h1>Rise of the Valiant</h1>
            <h3>{token && "Greetings, " + props.currentUser.userName}</h3>
            <ul style={{ listStyleType: "none" }}>
                {!token && <li style={{ cursor: "pointer", textDecoration: "none", color: "white" }} onClick={toggleRegister}>Register</li>}
                {!token && <li style={{ cursor: "pointer", textDecoration: "none", color: "white" }} onClick={toggleLogin}>Login</li>}
                {/* hide continue until a user is logged in */}
                {token && <Logout />}

                {/* re activate and configure continue once the feature is added */}
                {/* {token && <Linker to="/" text="Continue" />} */}
                {token && <Linker to="/Game" text="New Game" />}
                <Linker to="/Options" text="Options" />
                <Linker to="/About" text="About" />
                <Linker to="/Exit" text="Exit Game" />
            </ul>
            {!showModal ? null :
                <Modal show={showModal} hide={hideModal} btn={""} display={"none"}>
                    {modalText}
                    <br />
                    <Form toggle={modalText} closer={hideModal} />
                    <button type="button" onClick={() => { setShowModal(false) }}>Cancel</button>
                </Modal >}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
    }
}
export default connect(mapStateToProps)(MainMenu)