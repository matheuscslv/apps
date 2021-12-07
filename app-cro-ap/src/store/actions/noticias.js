export const noticiasData = data => ({
  type: "NOTICIAS_DATA",
  payload: { data }
});

export const noticiasLoadingMenor = loading => ({
  type: "NOTICIAS_LOADING",
  payload: { loading }
});
