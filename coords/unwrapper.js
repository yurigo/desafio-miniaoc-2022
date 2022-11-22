import { isValid } from './helper'

// export const isValid = (latitud, longitud) => {
//   // La coordenada nunca empieza por 0 ni el Latitud ni en Longitud
//   if (latitud[0] === '0') return false
//   if (longitud[0] === '0') return false

//   const lat = parseFloat(latitud)
//   const lon = parseFloat(longitud)

//   // on coordenadas terrestres con lo que están limitadas a -90 a 90 en Latitud y -180 a 180 en Longitud
//   if (lat >= 90.0) return false
//   if (lon >= 180.0) return false

//   // La coordenada nunca es un 0 seguido de decimal ni el Latitud ni en Longitud
//   if (lat < 1.0) return false
//   if (lon < 1.0) return false

//   return true
// }

export const unwrap = (str) => {
  if (typeof str !== 'string') throw new Error('not string')
  if (!str.startsWith('{')) throw new Error('falta {')
  if (!str.endsWith('}')) throw new Error('falta }')

  const numeros = str.slice(1, -1)
  // if (isNaN(+numeros)) throw new Error('Los numeros no son numeros :(') // la e es un numero -> error!...
  if (!numeros.match(/^\d+$/)) throw new Error('Los numeros no son numeros :(')

  if (numeros.length < 4) throw new Error('no hay combinatoria')

  let count = 0

  const valid = []
  const invalid = []
  for (let i = 1; i < numeros.length - 2; i++) {
    for (let j = i + 1; j < numeros.length - 1; j++) {
      for (let k = j + 1; k < numeros.length; k++) {
        count++
        const numero = insert(insert(insert(numeros, '.', i), ',', j + 1), '.', k + 2)
        const [lat, lon] = numero.split(',')
        if (!isValid(lat, lon)) {
          invalid.push(...generate(lat, lon))
          continue
        }

        valid.push(...generateAll(lat, lon))
      }
    }
  }

  return { valid, invalid, it: count }
}

export const combinatoria = (sup, inf) => {
  const fsup = factorial(sup)
  const finf = factorial(inf)
  const fres = factorial(sup - inf)

  return fsup / (finf * fres)
}

const factorial = (num) => {
  if (num === 0 || num === 1) return 1
  for (let i = num - 1; i >= 1; i--) {
    num *= i
  }
  return num
}

const insert = (string, caracter, posicion) => {
  return [string.slice(0, posicion), caracter, string.slice(posicion)].join('')
}

export const generateAll = (lat, lon) => {
  return [`{${lat},${lon}}`,
  `{-${lat},${lon}}`,
  `{${lat},-${lon}}`,
  `{-${lat},-${lon}}`]
}

const generate = (lat, lon) => {
  return [`{${lat},${lon}}`]
}
