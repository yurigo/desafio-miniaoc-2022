import { expect, test } from 'vitest'
import { encrypt, decrypt, bruteForce } from './caesar.js'

test('caesar empty', () => {
  const input = ''
  const shift = 3
  const output = ''
  expect(encrypt(input, shift)).toBe(output)
  expect(decrypt(output, shift)).toBe(input)
})

test('caesar shift empty', () => {
  const input = 'A'
  const shift = ''
  const output = 'A'
  expect(encrypt(input, shift)).toBe(output)
  expect(decrypt(output, shift)).toBe(input)
})

test('caesar only spaces', () => {
  const input = '   '
  const shift = '42'
  const output = '   '
  expect(encrypt(input, shift)).toBe(output)
  expect(decrypt(output, shift)).toBe(input)
})

test('caesar cypher (0)', () => {
  const input = 'ABC'
  const shift = 0
  const expectedOutput = input
  expect(encrypt(input, shift)).toBe(expectedOutput)
})

test('caesar encrypt (1)', () => {
  const input = 'ABC'
  const shift = 1
  const expectedOutput = 'BCD'
  expect(encrypt(input, shift)).toBe(expectedOutput)
})

test('caesar decrypt(1)', () => {
  const input = 'BCD'
  const shift = 1
  const expectedOutput = 'ABC'
  expect(decrypt(input, shift)).toBe(expectedOutput)
})

test('caesar encrypt (-1)', () => {
  const input = 'BCD'
  const shift = -1
  const expectedOutput = 'ABC'
  expect(encrypt(input, shift)).toBe(expectedOutput)
})

test('caesar decrypt(-1)', () => {
  const input = 'ABC'
  const shift = -1
  const expectedOutput = 'BCD'
  expect(decrypt(input, shift)).toBe(expectedOutput)
})

test('caesar (16)', () => {
  const input = 'ABC'
  const shift = 16
  const output = 'QRS'
  expect(encrypt(input, shift)).toBe(output)
  expect(decrypt(output, shift)).toBe(input)
})

test('caesar (22) with spaces', () => {
  const input = 'A B C'
  const shift = 22
  const output = 'W X Y'
  expect(encrypt(input, shift)).toBe(output)
  expect(decrypt(output, shift)).toBe(input)
})

test('caesar (27) overflow', () => {
  const input = 'ABC'
  const shift = 27
  const output = 'BCD'
  expect(encrypt(input, shift)).toBe(output)
  expect(decrypt(output, shift)).toBe(input)
})

test('caesar (-1) underflow', () => {
  const input = 'ABC'
  const shift = -1
  const output = 'ZAB'
  expect(encrypt(input, shift)).toBe(output)
  expect(decrypt(output, shift)).toBe(input)
})

test('caesar (100) overflow', () => {
  const input = 'ABC'
  const shift = 100

  // cada 26 vuelve a la A:
  // 26: A -> A
  // 52: A -> A
  // 78: A -> A
  // 104: A -> A
  // 100 = 104 - 4
  // caesar('ABC', -4) --> 'WXY'

  const output = 'WXY'
  expect(encrypt(input, shift)).toBe(output)
  expect(decrypt(output, shift)).toBe(input)
})

test('caesar (-100) underflow', () => {
  const input = 'ABC'
  const shift = -100

  // cada -26 vuelve a la A:
  // -26: A -> A
  // -52: A -> A
  // -78: A -> A
  // -104: A -> A
  // -100 = - 104 + 4
  // caesar('ABC', 4) --> 'EFG'

  const output = 'EFG'
  expect(encrypt(input, shift)).toBe(output)
  expect(decrypt(output, shift)).toBe(input)
})

test('caesar bruteforce', () => {
  const input = 'ABC'

  const output = [
    'BCD',
    'CDE',
    'DEF',
    'EFG',
    'FGH',
    'GHI',
    'HIJ',
    'IJK',
    'JKL',
    'KLM',
    'LMN',
    'MNO',
    'NOP',
    'OPQ',
    'PQR',
    'QRS',
    'RST',
    'STU',
    'TUV',
    'UVW',
    'VWX',
    'WXY',
    'XYZ',
    'YZA',
    'ZAB'
  ]

  expect(bruteForce(input)).toStrictEqual(output)
})
