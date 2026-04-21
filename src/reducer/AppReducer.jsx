export const initialState = {
  activities: [],
  loading: false,
  error: null,
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true, error: null };
    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SET_DATA":
      return { ...state, loading: false, activities: action.payload };
    default:
      return state;
  }
};