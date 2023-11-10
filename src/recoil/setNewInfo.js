import {atom} from 'recoil'

const defaultState ={
    location : 'Pipli Bus Stand',
    date : '',
    numberOfPerson : 0,
    time : ''
}

const newDataInfo = atom({
    key : 'newDataInfo',
    default : defaultState,
})

export default newDataInfo;