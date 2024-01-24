export const INITIAL_STATE = {
  id: "00000000-0000-0000-0000-000000000000",
  description: "",
  no: "",
  l: {
    value: "",
    required: false,
  },
  b: {
    value: "",
    required: false,
  },
  h: {
    value: "",
    required: false,
  },
  subtotal: 0,
  remark: "string",
  contractItem: {
    value: "",
    unit: "",
    label: "",
    stdUnit: 0,
    exist: false,
  },
  tags: [],
  redirect: {
    type: 1,
    contractItemId: "",
    credential: false,
  },
};

const checkUnit = (state, stdUnitId) => {
  if (stdUnitId === 1) {
    state.l.required = true;
    state.b.required = false;
    state.h.required = false;
  } else if (stdUnitId === 2) {
    state.l.required = true;
    state.b.required = true;
    state.h.required = false;
  } else if (stdUnitId === 3) {
    state.l.required = true;
    state.b.required = true;
    state.h.required = true;
  } else if (stdUnitId === 4) {
    state.l.required = false;
    state.b.required = false;
    state.h.required = false;
  }
};
export const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "CHANGE_NUMBER":
      return {
        ...state,
        [action.payload.name]: parseFloat(action.payload.value),
      };
    case "CHANGE_CONTRCTITEM":
      checkUnit(state, action.payload.stdUnitId);
      return state;

    case "CHANGE_L_B_H":
      return {
        ...state,
        [action.payload.name]: {
          value: parseFloat(action.payload.value),
          required: true,
        },
      };
    case "ADD_TAG":
      if (!state.tags.find((tag) => tag === action.payload.tag)) {
        return {
          ...state,
          tags: [...state.tags, action.payload.tag],
        };
      } else {
        return state;
      }
    case "REMOVE_TAG":
      return {
        ...state,
        tags: state.tags.filter((tag) => tag !== action.payload.tag),
      };
    case "HANDLE_STATE":
      const { tags, l, stdUnitId, b, d_H, ...other } = action.payload;
      checkUnit(state, stdUnitId);
      return {
        ...state,
        ...other,
        tags: tags.split(","),
        l: {
          ...state.l,
          value: l,
        },
        b: {
          ...state.b,
          value: b,
        },
        h: {
          ...state.h,
          value: d_H,
        },
      };
    case "INITIAL_STATE":
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
