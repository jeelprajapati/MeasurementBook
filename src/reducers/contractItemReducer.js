export const INITIAL_STATE={
    id:"00000000-0000-0000-0000-000000000000",
    sorNo: "",
    item: "",
    poQty: "",
    stdUnitId: "",
    hsn: "",
    unit: "",
    rate: "",
}

export const inputReducer=(state, action)=>{
    switch (action.type) {
        case "CHANGE_INPUT":
            return{
                ...state,
                [action.payload.name]:action.payload.value
            }
        case "HANDLE_STATE":
            return{
                ...action.payload
            }
        case "INITIAL_STATE":
            return{
                ...INITIAL_STATE
            }
        default:
            return{
                ...state
            }
    }
}