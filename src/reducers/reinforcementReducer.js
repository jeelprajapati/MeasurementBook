import {
  CHANGE_ALLSTATE,
  CHANGE_NUMBER,
  ADD_TAG,
  CHANGE_TEXT,
  REMOVE_TAG,
  SETINITIAL_STATE,
} from "../constants/actionTypes";

export const initialState = {
  id: "00000000-0000-0000-0000-000000000000",
  description: "",
  rfShapeId: "00000000-0000-0000-0000-000000000000",
  shapeImagePath: "",
  no: 0,
  diameterBar: 0,
  l1: null,
  l2: null,
  l3: null,
  l4: null,
  l5: null,
  l6: null,
  l7: null,
  l8: null,
  l9: null,
  l10: null,
  l11: null,
  l12: null,
  cuttingLength: 0,
  unitWeight: 0,
  subtotal: 0,
  tags: [],
};
/**
 * export const formData = (state = intialState, action) => {
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
    case ADD_TAG:
      return {
        ...state,
        tags: [...state.tags,action.payload.tag],
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
};
 */
export const formData = (state = initialState, action) => {
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
    default:
      return state;
  }
};
