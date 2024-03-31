const filterReducer = (state ='', action) => {
    console.log(action.type)
    switch(action.type){
        case 'SET_FILTER':
            return action.payload.searchText
        default:
            return state
    }
}

export const setFilter = (text) => {
    return {
        type:'SET_FILTER',
        payload: {
            searchText:text
        }
    }
}

export default filterReducer