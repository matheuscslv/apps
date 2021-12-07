export const agendaData = data => ({
    type: "AGENDA_DATA",
    payload: { data }
  });
  
  export const agendaLoadingMenor = loading => ({
    type: "AGENDA_LOADING",
    payload: { loading }
  });
  