const INITIAL_STATE = {
  data: [],
  loadingMenor: false
};

export default function agenda(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "AGENDA_DATA":
      return { ...state, data: [...action.payload.data] };
    case "AGENDA_LOADING":
      return { ...state, loadingMenor: action.payload.loading };
    default:
      return state;
  }
}
