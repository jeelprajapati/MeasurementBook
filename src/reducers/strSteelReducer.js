import { ADD_TAG, CHANGE_ALLSTATE, CHANGE_NUMBER, CHANGE_SHAPE, CHANGE_TEXT, REMOVE_TAG, SETINITIAL_STATE } from "../constants/actionTypes";

export const intialState = {
  id: "00000000-0000-0000-0000-000000000000",
  description: "",
  shape: "",
  structShapeId: "",
  no: 0,
  l1: null,
  l2: null,
  subtotal: 0,
  tags: [],
};

export const formData = (state=intialState, action) => {
  switch (action.type) {
    case CHANGE_TEXT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case CHANGE_NUMBER:
      return {
        ...state,
        [action.payload.name]: parseFloat(action.payload.value || 0),
      };
    case CHANGE_SHAPE:
      return {
        ...intialState,
        id:state.id,
        description:state.description,
        [action.payload.name]:action.payload.value
      }
    case ADD_TAG:
      return {
        ...state,
        tags: [...state.tags, action.payload.tag],
      };
    case REMOVE_TAG:
      return {
        ...state,
        tags: state.tags.filter((tag) => tag !== action.payload.tag),
      };
      case CHANGE_ALLSTATE:
        const { tags,...other } = action.payload;
        return {
          ...other,
          tags:tags.split(',')
        };
      case SETINITIAL_STATE:
          return {
              ...intialState
          }

      default: return state
  }
}
