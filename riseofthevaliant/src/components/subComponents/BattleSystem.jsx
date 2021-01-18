import React, { useEffect, useState } from 'react';
import { withAuth } from "../TokenAuth"
import { connect } from "react-redux"
import { setCurrentWeapon, setCurrentEnemie, setCurrentEnemieHP, setCharacterHP } from "../../store/actions/actionsConfig"
import { Modal, Vitals, Linker, RoomHandler } from "../../assets/componentImporter"
import axios from "axios"
import { Redirect } from "react-router-dom"

const BattleSystem = (props) => {
    // console.log("battle", props)
    ////////Hooks////////////
    const [showModal, setShowModal] = useState(false)
    const [modalText, setModalText] = useState("")
    const [battleText, setBattleText] = useState("")
    const [battleStart, setBattleStart] = useState("")
    const [updateVitals, setUpdateVitals] = useState(false);
    const [processRunning, setProcessRunning] = useState(false);
    // console.log(updateVitals)

    useEffect(() => {
        // addWeapon()
        setModalText("Hello Nick")
        setShowModal(true)
        return
        battleStarter(props.monster)
        // setting current hp in database? to be determined upon save eature during battle decision handling memory decision    
    }, []);

    ////////Functions////////////
    const addWeapon = async () => {
        try {
            // console.log("request out")
            const url = `http://localhost:9876/weapons`
            const result = await axios.get(url, { headers: { "Content-Type": "application/json", "weapon": "Longsword", "user": props.currentUser.email } })
            if (result.data.message === "weapon added") {
                // console.log(result.data)
                // props.history.push("/TempLanding")
                return
            }
        }
        catch (error) {
            console.error("catch", error);
        }
    }

    // consider adding localised/database message bank

    const battleStarter = async (monster) => {
        // console.log(monster)
        // this function is to be run autumaticlly upon an enemy encounter
        // recieving enemy name should be modular!!!!
        // alert should include the enemie name!
        const enemie = monster
        try {
            const url = `http://localhost:9876/enemies`
            const result = await axios.get(url, { headers: { "Content-Type": "application/json", "enemie": enemie } })
            if (result.data.message === "enemie located") {
                props.dispatch(setCurrentEnemie(result.data.enemie))
                setBattleText(`You have encountered a ${enemie}!`)
                setBattleStart(true)
                // setBattleText("Battle Start")// maybe delete?
            }
        }
        catch (error) {
            console.error("catch", error);
        }
        // if (!props.character.currentWeapon) {
        // let chosenWeapon = prompt("Choose your weapon")
        // let chosenWeapon = "Longsword"
        // let newChosenWeapon = props.character.gear.filter((w) => { return w.weapon === chosenWeapon })[0]
        // await props.dispatch(setCurrentWeapon(newChosenWeapon))
        // }
    }

    const hideModal = () => {
        setShowModal(false)
    }

    const characterBattleInterface = (e) => {
        const switcher = e.target.innerText
        // console.log(switcher)
        switch (switcher) {
            case "Fight": {
                if (processRunning === true) {
                    return
                }
                setProcessRunning(true)
                dealDamageToEnemy()
                return
            }
            case "Dodge": {
                if (processRunning === true) {
                    return
                }
                setProcessRunning(true)
                dodge()
                return
            }
            case "Action": {
                //    to be developed
                return
            }
            case "Run": {
                if (processRunning === true) {
                    return
                }
                setProcessRunning(true)
                runFromEnemie()
                return
            }
            // null should be temporary
            default: return null;
        };
    }
    const runFromEnemie = () => {
        setBattleText(`You cower in fear and try to flee from your opponent`)
        setTimeout(function () {
            startRunning()
        }, 2000);
    }
    const startRunning = () => {
        const runnningChance = Math.floor(Math.random() * 6) + 1
        if (runnningChance >= 5) {
            // console.log(runnningChance)
            setBattleText(`You successfully fled your opponent!`)
            // need to develop return to previous location
            setProcessRunning(false)
            setTimeout(function () {
                props.dispatch(setCurrentEnemie({}))
                setBattleStart(false)
            }, 2000);
        } else {
            setBattleText(`you weren't fast enough and the enemie blocks your escape route!`)
            setTimeout(function () {
                enemieBattleInterface()
            }, 2000);
        }
    }
    const dodge = () => {
        setBattleText(`You try to dodge the enemie's next attack!`)
        setTimeout(function () {
            enemieBattleInterface("Dodge")
        }, 2000);
    }
    const dealDamageToEnemy = async () => {
        const charAtkDmg = props.character.currentWeapon.dmg
        const setAtkDmg = Math.floor(Math.random() * charAtkDmg + 1)
        await setBattleText(`You have dealt ${setAtkDmg} damage to the enemie!`)
        setTimeout(function () {
            calculateDmg(setAtkDmg)
        }, 2000);
    }

    const calculateDmg = async (setAtkDmg) => {
        const enemieHP = props.enemie.currentHP
        const monsterHp = enemieHP - setAtkDmg
        if (monsterHp <= 0) {
            setBattleText("You have defeated the enemie!")
            setTimeout(function () {
                props.dispatch(setCurrentEnemie({}))
                setProcessRunning(false)
                setBattleStart(false)
                props.event(props.room, true)
                return
            }, 800);
            return
        }
        props.dispatch(setCurrentEnemieHP(monsterHp))
        enemieBattleInterface()
        return
    }

    const enemieBattleInterface = async (string) => {
        if (!string) string = ""
        // await setUpdateVitals(false)
        setBattleText("Enemie's Turn")
        setTimeout(function () {
            enemieTurn1(string)
        }, 2000);
        return
    }
    const enemieTurn1 = async (string) => {
        if (string === "Dodge") {
            setBattleText(`The ${props.enemie.name} attacks you and misses you by a hairstring!`)
            setTimeout(function () {
                endRound()
            }, 2000);
            return
        }
        const setChosenActionNumber = Math.floor(Math.random() * props.enemie.attack.length)
        const setChosenAction = props.enemie.attack[setChosenActionNumber]
        console.log(setChosenAction)
        const enemieAtkMaxDmg = setChosenAction.dmg
        const enemieAtkDmg = Math.floor(Math.random() * enemieAtkMaxDmg + 1)
        // set attack names to work properly
        setBattleText(`The ${props.enemie.name} ${setChosenAction.name}'s you and deals ${enemieAtkDmg} damage!`)
        setTimeout(function () {
            enemiTurn2(enemieAtkDmg)
        }, 2000);
    }

    const enemiTurn2 = async (enemieAtkDmg) => {
        await setUpdateVitals(true)
        const charHP = props.character.currentHP
        const newCharCurrentHP = charHP - enemieAtkDmg
        props.dispatch(setCharacterHP(newCharCurrentHP))
        endRound()
    }

    const endRound = async () => {
        setProcessRunning(false)
        await setBattleText("Your Turn")
        await setUpdateVitals(false)
    }
    /////////Jsx///////////
    return (
        <div>
            <Vitals s={updateVitals} />
            <h1>Battle</h1>
            {/* bellow buttons arent needed in future */}
            {/* <button type="button" onClick={battleStarter}>Initiate Battle Simulation</button> */}
            {/* <button type="button"><Linker to="/" text="Main Menu" colour="black" /></button> */}
            { !battleStart ? null : <div className="battleInterface">
                <h3>{battleText}</h3>
                <p onClick={characterBattleInterface}>Fight</p>
                <br />
                <p onClick={characterBattleInterface}> Dodge</p>
                <br />
                <p onClick={() => { alert("in development") }}>Ability</p>
                <br />
                <p onClick={characterBattleInterface}>Run</p>
                <br />
            </div>}
            { !showModal ? null :
                <Modal show={showModal} hide={hideModal} btn={""} display={"none"}>
                    {modalText}
                    <button type="button" onClick={() => { setShowModal(false) }}>Cancel</button>
                </Modal >}
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        character: state.character,
        enemie: state.enemie
    }

}
export default withAuth(connect(mapStateToProps)(BattleSystem))