export const isValid = (latitud, longitud) => {
  // La coordenada nunca empieza por 0 ni el Latitud ni en Longitud
  if (latitud[0] === '0') return false
  if (longitud[0] === '0') return false

  const lat = parseFloat(latitud)
  const lon = parseFloat(longitud)

  // on coordenadas terrestres con lo que están limitadas a -90 a 90 en Latitud y -180 a 180 en Longitud
  if (lat >= 90.0) return false
  if (lon >= 180.0) return false

  // La coordenada nunca es un 0 seguido de decimal ni el Latitud ni en Longitud
  if (lat < 1.0) return false
  if (lon < 1.0) return false

  return true
}
