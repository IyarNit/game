export const CURRENT_USER = "CURRENT_USER"
export const IS_ADMIN = "IS_ADMIN"
export const NO_MORE_ADMIN = "NO_MORE_ADMIN"
export const CHARACTER = "CHARACTER"
export const NO_MORE_CHARACTER = "NO_MORE_CHARACTER"
export const SET_CURRENT_WEAPON = "SET_CURRENT_WEAPON"
export const SET_CURRENT_ENEMIE = "SET_CURRENT_ENEMIE"
export const SET_CURRENT_ENEMIE_HP = "SET_CURRENT_ENEMIE_HP"
export const SET_CHARACTER_HP = "SET_CHARACTER_HP"
export const SET_CHARACTER_LOCATION = "SET_CHARACTER_LOCATION"


export const currentUser = (payload) => {
    return {
        type: CURRENT_USER,
        payload: payload
    }
}


export const isAdmin = (payload) => {
    return {
        type: IS_ADMIN,
        payload: payload
    }
}

export const noLongerAdmin = (payload) => {
    return {
        type: NO_MORE_ADMIN,
        payload: payload
    }
}

export const setCharacter = (payload) => {
    return {
        type: CHARACTER,
        payload: payload
    }
}

export const noLongerCharacter = (payload) => {
    return {
        type: NO_MORE_CHARACTER,
        payload: payload
    }
}

export const setCurrentWeapon = (payload) => {
    return {
        type: SET_CURRENT_WEAPON,
        payload: payload
    }
}

export const setCurrentEnemie = (payload) => {
    return {
        type: SET_CURRENT_ENEMIE,
        payload: payload
    }
}

export const setCurrentEnemieHP = (payload) => {
    return {
        type: SET_CURRENT_ENEMIE_HP,
        payload: payload
    }
}

export const setCharacterHP = (payload) => {
    return {
        type: SET_CHARACTER_HP,
        payload: payload
    }
}

export const setCharacterLocation = (payload) => {
    return {
        type: SET_CHARACTER_LOCATION,
        payload: payload
    }
}