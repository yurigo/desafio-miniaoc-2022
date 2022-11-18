
export const unwrap = (str) => {
  if (!str.startsWith('{')) throw new Error('falta {')
  if (!str.endsWith('}')) throw new Error('falta }')

  const numeros = str.slice(1, -1)

  // if (isNaN(+numeros)) throw new Error('Los numeros no son numeros :(') // la e se la come...
  if (!numeros.match(/^\d+$/)) throw new Error('Los numeros no son numeros :(')

  if (numeros.length < 4) throw new Error('no hay combinatoria')

  const combi = combinatoria(numeros.length - 1, 3)
  console.log('🚀 ~ file: unwrapper.js ~ line 30 ~ unwrap ~ combi', combi)

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

  console.log('he contado', count)

  return { valid, invalid }
}

const combinatoria = (sup, inf) => {
  console.log({ sup, inf })
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

const isValid = (latitud, longitud) => {
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

const generateAll = (lat, lon) => {
  return [`{${lat},${lon}}`,
  `{-${lat},${lon}}`,
  `{${lat},-${lon}}`,
  `{-${lat},-${lon}}`]
}

const generate = (lat, lon) => {
  return [`{${lat},${lon}}`]
}

// 1234
// 1.2,3.4

// if (numeros.length === 4) {
//   const lat = `${numeros[0]}.${numeros[1]}`
//   const lon = `${numeros[2]}.${numeros[3]}`

//   // 1234
//   // 1.2,3.4
//   // 1 opcion

//   return [
//     `{${lat},${lon}}`,
//     `{-${lat},${lon}}`,
//     `{${lat},-${lon}}`,
//     `{-${lat},-${lon}}`
//   ]
// }

// if (numeros.length === 5) {
//   // 12345
//   // 1.23,4.5
//   // 12.3,4.5
//   // 1.2,3.45
//   // 1.2,34.5
//   // 4 opciones
// }

// if (numeros.length === 6) {
//   // 123456
//   // 1.234,5.6
//   // 12.34,5.6
//   // 123.4,5.6
//   // 1.23,4.56
//   // 1.23,45.6
//   // 12.3,4.56
//   // 12.3,45.6
//   // 1.2,3.456
//   // 1.2,34.56
//   // 1.2,345.6
//   // 10 opciones
// }

// if (numeros.length === 7) {
//   // 1234567
//   // 1.2345,6.7
//   // 12.345,6.7
//   // 123.45,6.7
//   // 1234.5,6.7
//   // --
//   // 1.234,5.67
//   // 1.234,56.7
//   // 12.34,5.67
//   // 12.34,56.7
//   // 123.4,5.67
//   // 123.4,56.7
//   // --
//   // 1.23,4.567
//   // 1.23,45.67
//   // 1.23,456.7
//   // 12.3,4.567
//   // 12.3,45.67
//   // 12.3,456.7
//   // --
//   // 1.2,3.4567
//   // 1.2,34.567
//   // 1.2,345.67
//   // 1.2,3456.7
//   // 20 opciones
// }
