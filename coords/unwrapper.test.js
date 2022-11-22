import { expect, test } from 'vitest'
// import * as isValid from './isvalid'
import { unwrap } from './unwrapper'

const VARIACIONES = 4

// console.log(unwrapper)
// import { unwrap, combinatoria } from './unwrapper'

test('unwrap empty', () => {
  const input = ''
  expect(() => unwrap(input)).toThrowError(/{/)
})

test('unwrap not text', () => {
  const input = [{}, 123, []]
  input.forEach((i) => {
    expect(() => unwrap(i)).toThrowError(/not string/)
  })
})

test('unwrap not valid entries', () => {
  const input = ['lorem', 'sa{df', '']
  input.forEach((i) => {
    expect(() => unwrap(i)).toThrowError(/{/)
  })
})

test('unwrap missing }', () => {
  const input = ['{lorem', '{123']
  input.forEach((i) => {
    expect(() => unwrap(i)).toThrowError(/}/)
  })
})

test('unwrap not numbers inside {}', () => {
  const input = ['{}', '{lorem}', '{123a}']
  input.forEach((i) => {
    expect(() => unwrap(i)).toThrowError(/Los numeros no son numeros/)
  })
})

test('unwrap numbers inside {} are greater than 4', () => {
  const input = ['{1}', '{12}', '{123}']
  input.forEach((i) => {
    expect(() => unwrap(i)).toThrowError(/no hay combinatoria/)
  })
})

test('unwrap {1234}}', () => {
  const input = '{1234}'
  const resultadosValidos = 1
  expect(unwrap(input).valid).toHaveLength(resultadosValidos * VARIACIONES)
  expect(unwrap(input).invalid).toHaveLength(0)
})

test('unwrap {12345}}', () => {
  const input = '{12345}'

  // 1.23,4.5 🟢
  // 12.3,4.5 🟢
  // 1.2,3.45 🟢
  // 1.2,34.5 🟢

  const resultadosValidos = 4

  expect(unwrap(input).valid).toHaveLength(resultadosValidos * VARIACIONES)
  expect(unwrap(input).invalid).toHaveLength(0)
})

test('unwrap {123456}}', () => {
  const input = '{123456}'

  // 1.234,5.6 🟢
  // 12.34,5.6 🟢
  // 123.4,5.6 🔴
  // 1.23,4.56 🟢
  // 1.23,45.6 🟢
  // 12.3,4.56 🟢
  // 12.3,45.6 🟢
  // 1.2,3.456 🟢
  // 1.2,34.56 🟢
  // 1.2,345.6 🔴

  const resultadosValidos = 8
  const resultadosInvalidos = 2

  expect(unwrap(input).valid).toHaveLength(resultadosValidos * VARIACIONES)
  expect(unwrap(input).invalid).toHaveLength(resultadosInvalidos)
})

test('unwrap {1234567}}', () => {
  const input = '{1234567}'

  // 1.2345,6.7 🟢
  // 12.345,6.7 🟢
  // 123.45,6.7 🔴
  // 1234.5,6.7 🔴
  // --
  // 1.234,5.67 🟢
  // 1.234,56.7 🟢
  // 12.34,5.67 🟢
  // 12.34,56.7 🟢
  // 123.4,5.67 🔴
  // 123.4,56.7 🔴
  // --
  // 1.23,4.567 🟢
  // 1.23,45.67 🟢
  // 1.23,456.7 🔴
  // 12.3,4.567 🟢
  // 12.3,45.67 🟢
  // 12.3,456.7 🔴
  // --
  // 1.2,3.4567 🟢
  // 1.2,34.567 🟢
  // 1.2,345.67 🔴
  // 1.2,3456.7 🔴

  const resultadosValidos = 12
  const resultadosInvalidos = 8

  expect(unwrap(input).valid).toHaveLength(resultadosValidos * VARIACIONES)
  expect(unwrap(input).invalid).toHaveLength(resultadosInvalidos)
})

test('unwrap {02345}}', () => {
  const input = '{02345}'

  // 0.23,4.5 🔴
  // 02.3,4.5 🔴
  // 0.2,3.45 🔴
  // 0.2,34.5 🔴

  const resultadosValidos = 0
  const resultadosInvalidos = 4

  expect(unwrap(input).valid).toHaveLength(resultadosValidos * VARIACIONES)
  expect(unwrap(input).invalid).toHaveLength(resultadosInvalidos)
})

test('unwrap {10345}}', () => {
  const input = '{10345}'

  // 1.03,4.5 🟢
  // 10.3,4.5 🟢
  // 1.0,3.45 🟢
  // 1.0,34.5 🟢

  const resultadosValidos = 4
  const resultadosInvalidos = 0

  expect(unwrap(input).valid).toHaveLength(resultadosValidos * VARIACIONES)
  expect(unwrap(input).invalid).toHaveLength(resultadosInvalidos)
})

test('unwrap {12045}}', () => {
  const input = '{12045}'

  // 1.20,4.5 🟢
  // 12.0,4.5 🟢
  // 1.2,0.45 🔴
  // 1.2,04.5 🔴

  const resultadosValidos = 2
  const resultadosInvalidos = 2

  expect(unwrap(input).valid).toHaveLength(resultadosValidos * VARIACIONES)
  expect(unwrap(input).invalid).toHaveLength(resultadosInvalidos)
})

test('unwrap {12305}}', () => {
  const input = '{12305}'

  // 1.23,0.5 🔴
  // 12.3,0.5 🔴
  // 1.2,3.05 🟢
  // 1.2,30.5 🟢

  const resultadosValidos = 2
  const resultadosInvalidos = 2

  expect(unwrap(input).valid).toHaveLength(resultadosValidos * VARIACIONES)
  expect(unwrap(input).invalid).toHaveLength(resultadosInvalidos)
})

test('unwrap {12340}}', () => {
  const input = '{12340}'

  // 1.23,4.0 🟢
  // 12.3,4.0 🟢
  // 1.2,3.40 🟢
  // 1.2,34.0 🟢

  const resultadosValidos = 4
  const resultadosInvalidos = 0

  expect(unwrap(input).valid).toHaveLength(resultadosValidos * VARIACIONES)
  expect(unwrap(input).invalid).toHaveLength(resultadosInvalidos)
})
