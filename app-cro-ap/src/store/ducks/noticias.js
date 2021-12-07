const INITIAL_STATE = {
  data: [],
  loadingMenor: false
};

export default function noticias(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "NOTICIAS_DATA":
      return { ...state, data: [...action.payload.data] };
    case "NOTICIAS_LOADING":
      return { ...state, loadingMenor: action.payload.loading };
    default:
      return state;
  }
}
