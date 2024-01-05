export const INITIAL_STATE = {
  id: "00000000-0000-0000-0000-000000000000",
  description: "",
  shape: {
    value: "",
    credential: false,
  },
  structShapeId: {
    id: "",
    credential: false,
  },
  no: null,
  l: {
    value: null,
    required: false,
  },
  b: {
    value: null,
    required: false,
  },
  subtotal: 0,
  contractItem: {
    value: "",
    unit: "",
    label: "",
    stdUnit: 0,
    exist: false,
  },
  tags: [],
  redirect: {
    type: "",
    credential: false,
  },
};

const checkUnit = (no, state) => {
  if (no === 1) {
    state.l.required = true;
    state.b.required = false;
  } else if (no === 2) {
    state.l.required = true;
    state.b.required = true;
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
    case "CHANGE_SHAPE":
      return {
        ...state,
        structShapeId: {
          id: "",
          credential: false,
        },
        shape: {
          value: action.payload.value,
          credential: true,
        },
      };
    case "CHANGE_SIZE":
      checkUnit(action.payload?.no, state);
      return {
        ...state,
        structShapeId: {
          id: action.payload.id,
          credential: true,
        },
      };
    case "CHANGE_L_B":
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
      const { tags, l1, l2, shape, structShapeId, ...other } =
        action.payload;
      checkUnit(shape?.noOfParameter, state);
      return {
        ...state,
        ...other,
        tags: tags.split(","),
        shape: {
          value: shape?.subSection,
          credential: true,
        },
        structShapeId: {
          id: structShapeId,
          credential: true,
        },
        l: {
          ...state.l,
          value: l1,
        },
        b: {
          ...state.b,
          value: l2,
        }
      };
    case "INITIAL_STATE":
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
