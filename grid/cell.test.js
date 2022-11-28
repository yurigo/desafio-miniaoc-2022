import { expect, test } from 'vitest'

import { revealCell } from './cell'

const revealCellAsyncThrowingError = async (endpoint, row, col) => {
  const response = await revealCell(endpoint, row, col)
  if (!response.ok) throw new Error('not ok')
  const data = await response.json()
  return data
}

const revealCellAsync = async (endpoint, row, col) => {
  return revealCell(endpoint, row, col).then(r => r.json())
}

/**
 * Porque la api lo permite tenemos dos formas de verificar si la coordenada es incorrecta.
 * Con !response.ok al hacer el fetch podemos verificar si response.ok es false (y actuar al respecto)
 * Con response.json() y verificar si tiene la propiedad error ya que esta api aunque recibamos un 404 tenemos body.
 */

test('enpoint reto/3 , {0,0}', async () => {
  await expect(revealCellAsync('', 0, 0)).resolves.toHaveProperty('error')
})

test('enpoint reto/3 , {3,3}', async () => {
  await expect(revealCellAsyncThrowingError('', 3, 3)).rejects.toThrow('not ok')
})

test('enpoint reto/3 , {0,6}', async () => {
  await expect(revealCellAsync('', 0, 6)).resolves.toHaveProperty('status', true)
})

test('enpoint reto/37 , {X,3}', async () => {
  await expect(revealCellAsync('7', 3, 0)).resolves.toHaveProperty('error')
  await expect(revealCellAsync('7', 3, 1)).resolves.toHaveProperty('status', true)
  await expect(revealCellAsync('7', 3, 2)).resolves.toHaveProperty('status', true)
  await expect(revealCellAsync('7', 3, 3)).resolves.toHaveProperty('status', true)
  await expect(revealCellAsync('7', 3, 4)).resolves.toHaveProperty('status', true)
  await expect(revealCellAsync('7', 3, 5)).resolves.toHaveProperty('status', true)
  await expect(revealCellAsync('7', 3, 6)).resolves.toHaveProperty('status', true)
  await expect(revealCellAsync('7', 3, 7)).resolves.toHaveProperty('error')
  await expect(revealCellAsync('7', 3, 900)).resolves.toHaveProperty('error')
})

test('enpoint reto/35 (not valid) , {X,3}', async () => {
  // const x = await revealCellAsync('5', 3, 0)
  // console.log(x)
  await expect(revealCellAsync('5', 3, 3)).resolves.toHaveProperty('error')
  await expect(revealCellAsyncThrowingError('5', 3, 3)).rejects.toThrow('not ok')
})

test('enpoint reto/37P, {X,3}', async () => {
  await expect(revealCellAsync('7P', 3, 0)).resolves.toHaveProperty('error')
  await expect(revealCellAsync('7P', 3, 1)).resolves.toHaveProperty('error')
  await expect(revealCellAsync('7P', 3, 2)).resolves.toHaveProperty('error')
  await expect(revealCellAsync('7P', 3, 3)).resolves.toHaveProperty('status', true)
  await expect(revealCellAsync('7P', 3, 4)).resolves.toHaveProperty('error')
  await expect(revealCellAsync('7P', 3, 5)).resolves.toHaveProperty('error')
  await expect(revealCellAsync('7P', 3, 6)).resolves.toHaveProperty('error')

  await expect(revealCellAsync('7P', 3, 7)).resolves.toHaveProperty('error')
  await expect(revealCellAsync('7P', 3, 900)).resolves.toHaveProperty('error')
})

test('enpoint reto/37P1C, {X,X}', async () => {
  await expect(revealCellAsync('7P1C', 3, 0)).resolves.toHaveProperty('status')
  await expect(revealCellAsync('7P1C', 1, 1)).resolves.toHaveProperty('status')
  await expect(revealCellAsync('7P1C', 3, 2)).resolves.toHaveProperty('status')
  await expect(revealCellAsync('7P1C', 5, 3)).resolves.toHaveProperty('status')
  await expect(revealCellAsync('7P1C', 5, 6)).resolves.toHaveProperty('status')
  await expect(revealCellAsync('7P1C', 1, 5)).resolves.toHaveProperty('status')
  await expect(revealCellAsync('7P1C', 0, 0)).resolves.toHaveProperty('status')

  // aqui es el paso antihackers, cualquier entrada va a devolver status y no error!
  await expect(revealCellAsync('7P1C', 3, 7)).resolves.toHaveProperty('status')
  await expect(revealCellAsync('7P1C', 3, 900)).resolves.toHaveProperty('status')
})

test('enpoint reto/37P1Cz1, {X,X}', async () => {
  await expect(revealCellAsync('7P1Cz1', 3, 0)).resolves.toHaveProperty('error')
  await expect(revealCellAsync('7P1Cz1', 1, 1)).resolves.toHaveProperty('status')
  await expect(revealCellAsync('7P1Cz1', 3, 2)).resolves.toHaveProperty('error')
  await expect(revealCellAsync('7P1Cz1', 5, 3)).resolves.toHaveProperty('error')
  await expect(revealCellAsync('7P1Cz1', 5, 6)).resolves.toHaveProperty('error')
  await expect(revealCellAsync('7P1Cz1', 1, 5)).resolves.toHaveProperty('error')
  await expect(revealCellAsync('7P1Cz1', 0, 0)).resolves.toHaveProperty('error')

  await expect(revealCellAsync('7P1Cz1', 3, 7)).resolves.toHaveProperty('error')
  await expect(revealCellAsync('7P1Cz1', 3, 900)).resolves.toHaveProperty('error')
})

test('enpoint reto/37P1Cz12, {X,X}', async () => {
  await expect(revealCellAsync('7P1Cz12', 3, 0)).resolves.toHaveProperty('error')
  await expect(revealCellAsync('7P1Cz12', 1, 1)).resolves.toHaveProperty('error')
  await expect(revealCellAsync('7P1Cz12', 3, 2)).resolves.toHaveProperty('status')
  await expect(revealCellAsync('7P1Cz12', 5, 3)).resolves.toHaveProperty('error')
  await expect(revealCellAsync('7P1Cz12', 5, 6)).resolves.toHaveProperty('status')
  await expect(revealCellAsync('7P1Cz12', 1, 5)).resolves.toHaveProperty('error')
  await expect(revealCellAsync('7P1Cz12', 0, 0)).resolves.toHaveProperty('status')

  await expect(revealCellAsync('7P1Cz12', 3, 7)).resolves.toHaveProperty('error')
  await expect(revealCellAsync('7P1Cz12', 3, 900)).resolves.toHaveProperty('error')
})

test('enpoint reto/37P1Cz12P, {X,X}', async () => {
  await expect(revealCellAsync('7P1Cz12P', 3, 0)).resolves.toHaveProperty('status')
  await expect(revealCellAsync('7P1Cz12P', 1, 1)).resolves.toHaveProperty('error')
  await expect(revealCellAsync('7P1Cz12P', 3, 2)).resolves.toHaveProperty('status')
  await expect(revealCellAsync('7P1Cz12P', 5, 3)).resolves.toHaveProperty('error')
  await expect(revealCellAsync('7P1Cz12P', 5, 6)).resolves.toHaveProperty('status')
  await expect(revealCellAsync('7P1Cz12P', 1, 5)).resolves.toHaveProperty('error')
  await expect(revealCellAsync('7P1Cz12P', 0, 0)).resolves.toHaveProperty('status')

  await expect(revealCellAsync('7P1Cz12P', 3, 7)).resolves.toHaveProperty('error')
  await expect(revealCellAsync('7P1Cz12P', 3, 900)).resolves.toHaveProperty('error')
})

test('enpoint reto/37P1Cz12P3, {X,X}', async () => {
  const t0 = performance.now()

  await expect(revealCellAsync('7P1Cz12P3', 3, 0)).resolves.toHaveProperty('success')
  await expect(revealCellAsync('7P1Cz12P3', 1, 1)).resolves.toHaveProperty('success')
  await expect(revealCellAsync('7P1Cz12P3', 3, 2)).resolves.toHaveProperty('success')
  await expect(revealCellAsync('7P1Cz12P3', 5, 3)).resolves.toHaveProperty('success')
  await expect(revealCellAsync('7P1Cz12P3', 5, 6)).resolves.toHaveProperty('success')
  await expect(revealCellAsync('7P1Cz12P3', 1, 5)).resolves.toHaveProperty('success')
  await expect(revealCellAsync('7P1Cz12P3', 0, 0)).resolves.toHaveProperty('success')

  await expect(revealCellAsync('7P1Cz12P3', 3, 7)).resolves.toHaveProperty('success')
  await expect(revealCellAsync('7P1Cz12P3', 3, 900)).resolves.toHaveProperty('success')

  const t1 = performance.now()
  console.log(`test await ${t1 - t0} milliseconds.`)
})

const doAsync = async (expects) => {
  await Promise.all(expects)
}

test('enpoint reto/37P1Cz12P3, {X,X}', async () => {
  const expects = []

  const t0 = performance.now()

  expects.push(expect(revealCellAsync('7P1Cz12P3', 3, 0)).resolves.toHaveProperty('success'))
  expects.push(expect(revealCellAsync('7P1Cz12P3', 1, 1)).resolves.toHaveProperty('success'))
  expects.push(expect(revealCellAsync('7P1Cz12P3', 3, 2)).resolves.toHaveProperty('success'))
  expects.push(expect(revealCellAsync('7P1Cz12P3', 5, 3)).resolves.toHaveProperty('success'))
  expects.push(expect(revealCellAsync('7P1Cz12P3', 5, 6)).resolves.toHaveProperty('success'))
  expects.push(expect(revealCellAsync('7P1Cz12P3', 1, 5)).resolves.toHaveProperty('success'))
  expects.push(expect(revealCellAsync('7P1Cz12P3', 0, 0)).resolves.toHaveProperty('success'))
  expects.push(expect(revealCellAsync('7P1Cz12P3', 3, 7)).resolves.toHaveProperty('success'))
  expects.push(expect(revealCellAsync('7P1Cz12P3', 3, 900)).resolves.toHaveProperty('success'))

  await doAsync(expects)

  const t1 = performance.now()
  console.log(`test doAsync ${t1 - t0} milliseconds.`)
})
