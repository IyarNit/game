import React, { useEffect, useState } from 'react';
import { SubEventButtonHandler } from "../../assets/componentImporter"

const SubEventHandler = (props) => {
    ////////Hooks////////////
    useEffect(() => {
        console.log("props in sub event handler", props)
    }, []);
    const [enemie, SetEnemie] = useState("")
    const [subs, SetSubs] = useState("")
    const [toggle, SetToggle] = useState(false)



    ////////Functions////////////

    const handler = async (e) => {
        const chosenEventObj = props.subEventArr.filter((x) => { return x.location === e })[0]
        // const y = props.subEventArr.filter((x) => { func(x) })
        console.log(chosenEventObj)
        SetSubs(chosenEventObj)
        setTimeout(function () {
           console.log(chosenEventObj)
            SetToggle(true)
        }, 1500);
    }
    //     const func = (s) => {
    // console.log(s)
    //     }

    const moveInSubEvents = props.subEventArr?.map((button) => { return <SubEventButtonHandler btn={button} onClick={(e) => { handler(e?.target?.innerText) }} /> })

    /////////Jsx///////////
    return (
        <div>
            {toggle ? null : moveInSubEvents}
            {!toggle ? null : <button type="button">{subs.option1}</button>}
            {!toggle ? null : <button type="button">{subs.option2}</button>}
            {!toggle ? null : <button type="button">{subs.option3}</button>}

        </div>
    )
}
export default SubEventHandler 