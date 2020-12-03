import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom"
import axios from "axios"


export const withAuth = (WrappedComponent) => {
    return function (props) {
        // console.log("props in wrapper", props)
        const [status, setStatus] = useState("loading");

        useEffect(() => {
            const token = localStorage.getItem("valiantToken") || null
            // console.log("token in wrapper", token)
            const verify = async () => {
                const result = await axios.get("http://localhost:9876/tokenVerify", { headers: { "Content-Type": "application/json", "authorization": token } })
                // console.log("result in wrapper", result)
                const { status } = result.data;
                setStatus(status)
            }
            verify();
        }, [])
        if (!status) {

            localStorage.removeItem("valiantToken")
            return <Redirect to="/" />
        }
        return <WrappedComponent {...props} />
    }
}