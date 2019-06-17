// Crea un getter dinámico en Vuex utilizando HOF
const countObjectProperties = (obj) => {
  if (typeof obj === 'object') {
    // retornar el total de llaves que contienen estos elementos para hacer un conteo
    return Object.keys(obj).length;
  }
  return 0;
};
export default countObjectProperties;