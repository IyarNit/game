import React, { useRef, useState } from 'react';
import axios from "axios"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { currentUser, setCharacter } from "../../store/actions/actionsConfig"

const Form = (props) => {
    // console.log("form", props)

    ////////Hooks////////////
    const userNameInput = useRef({});
    const emailInput = useRef({});
    const passwordInput = useRef({});


    ////////Functions////////////
    const signIn = async () => {
        if (!emailInput.current?.value || !passwordInput.current?.value) {
            alert("You have not filled all neccesery fields")
            return
        }
        try {
            const url = `http://localhost:9876/Login`
            const result = await axios.post(url, { email: emailInput.current.value, password: passwordInput.current.value }, { headers: { "Content-Type": "application/json" } })
            if (result.data.message === "Login Succesful") {
                // console.log(result.data)
                props.dispatch(currentUser(result.data.user))
                props.dispatch(setCharacter(result.data.character))

                localStorage.setItem("valiantToken", result.data.token)
                props.closer()
                // props.history.push("/TempLanding")
                return
            }
        }
        catch (error) {
            console.error("catch", error);
        }
    }
    const register = async () => {
        if (!emailInput.current?.value && !passwordInput.current?.value && !userNameInput.current?.value) {
            alert("You have not filled all neccesery fields")
            return
        }
        try {
            const url = `http://localhost:9876/Register`
            const result = await axios.post(url, { userName: userNameInput.current.value, email: emailInput.current.value, password: passwordInput.current.value }, { headers: { "Content-Type": "application/json" } })
            if (result.data.message === "Register Success") {
                // console.log(result.data)
                alert(result.data.message)
                props.closer()
                props.history.push("/")
                return
            } else {
                alert(result.data.message)
                resetFields()
            }
        }
        catch (error) {
            console.error("catch", error);
        }
    }
    const resetFields = () => {
        emailInput.current.value = ""
        passwordInput.current.value = ""
        userNameInput.current.value = ""
    }
    /////////Jsx///////////
    return (
        <div>
            <form>
                <input className={props.toggle === "Register" ? "toggleYes" : "toggleNo"} type="text" placeholder="userName" ref={userNameInput} />
                <input type="text" placeholder="Email" ref={emailInput} />
                <input type="password" placeholder="Password" ref={passwordInput} />
                <button type="button" onClick={props.toggle === "Register" ? register : signIn}>{props.toggle}</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        character: state.character
    }
}
export default withRouter(connect(mapStateToProps)(Form))