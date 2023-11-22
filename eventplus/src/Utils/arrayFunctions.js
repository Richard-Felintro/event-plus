export const arrayToAlphabeticalOrder = (data) => {
  data.sort((a, b) => {
    if (a.titulo < b.titulo) {
      return -1;
    }
  });
};
