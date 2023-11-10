import {atom} from 'recoil'

const defaultState ={
    username : '',
    email : '',
    phone : '',
    time : '',
    location : '',
    date : '',
}

const userData = atom({
    key : 'userInfo',
    default : defaultState,
})

export default userData;