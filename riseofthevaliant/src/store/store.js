import { createStore, applyMiddleware, compose } from 'redux';
import { CURRENT_USER, CHARACTER, NO_MORE_CHARACTER, SET_CURRENT_WEAPON, SET_CURRENT_ENEMIE, SET_CURRENT_ENEMIE_HP, SET_CHARACTER_HP, SET_CHARACTER_LOCATION } from "../store/actions/actionsConfig"

const initState = {
    currentUser: {},
    character: {},
    enemie: {}
};

function reducer(state = initState, action) {


    // console.log('state', state)


    switch (action.type) {


        case CURRENT_USER: {
            return {
                ...state, currentUser: action.payload
            };
        }
        case CHARACTER: {
            return {
                ...state, character: action.payload
            }
        }
        case NO_MORE_CHARACTER: {
            return {
                ...state, character: action.payload
            }
        }
        case SET_CURRENT_WEAPON: {
            const char = state.character;
            char.currentWeapon = action.payload
            return {
                ...state, character: char
            }
        }
        case SET_CURRENT_ENEMIE: {
            return {
                ...state, enemie: action.payload
            }
        }
        case SET_CURRENT_ENEMIE_HP: {
            const enemie = state.enemie;
            enemie.currentHP = action.payload
            return {
                ...state, enemie: enemie
            }
        }
        case SET_CHARACTER_HP: {
            const char = state.character;
            char.currentHP = action.payload
            return {
                ...state, character: char
            }
        }
        case SET_CHARACTER_LOCATION: {
            const char = state.character;
            char.location.current = action.payload
            return {
                ...state, character: char
            }
        }
        default: return state;


    };
};
const store = createStore(reducer);


export default store;