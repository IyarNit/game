import MainMenu from "../components/MainMenu"
import Linker from "../components/subComponents/Link"
import Modal from "../components/subComponents/Modal"
import Form from "../components/subComponents/Form"
import BattleSystem from "../components/subComponents/BattleSystem"
import About from "../components/About"
import RoomHandler from "../components/RoomHandler"
import Logout from "../components/Logout"
import Vitals from "../components/subComponents/Vitals"
import ButtonHandler from "../components/subComponents/ButtonHandler"
import SubEventHandler from "../components/subComponents/SubEventHandler"
import SubEventButtonHandler from "../components/subComponents/SubEventButtonHandler"



import Game from "../components/Game"
export {
    MainMenu,
    Linker,
    Modal,
    Form,
    BattleSystem,
    About,
    Logout,
    Vitals,
    RoomHandler,
    Game,
    ButtonHandler,
    SubEventHandler,
    SubEventButtonHandler
}


// const weaponsArr = [{
//     weapon: "Sword",
//     dmg: 5,
//     type: "melee"
// },
// {
//     weapon: "Longbow",
//     dmg: 5,
//     type: "ranged"
// }
// ]

// const equipment = {
//     name: "userName",
//     maxHp: 50,
//     currentHp: 45,
//     gear: {
//         weapon: weaponsArr.filter((x) => { return x.weapon === "Longbow" })

//     }
// }
// console.log(equipment)

// const equipment2 = {
//     name: "userName",
//     maxHp: 50,
//     currentHp: 45,
//     gear: {
//         melee: "",
//         ranged: ""
//     }
// }

// const addNewWEapons = (newWeapon) => {
//     console.log(newWeapon)
//     if (newWeapon[0].type === "ranged") {
//         equipment2.gear.ranged = newWeapon[0]
//         console.log(equipment2)
//     }
//     else {
//         equipment2.gear.melee = newWeapon[0]
//     }

// }


// addNewWEapons(weaponsArr.filter((x) => { return x.weapon === "Sword" }))

// console.log(weaponsArr.filter((x) => { return x.weapon === "Longbow" }))