import { expect, test } from 'vitest'

import { isValid } from './helper'

test('lat ,lon starting with 0', () => {
  expect(isValid('0010', '0010')).toBe(false)
  expect(isValid('40', '0010')).toBe(false)
  expect(isValid('0010', '40')).toBe(false)
})

test('isValid lat 0 lon 0', () => {
  expect(isValid('0', '0')).toBe(false)
  expect(isValid('0', '1')).toBe(false)
  expect(isValid('1', '0')).toBe(false)
})

test('isValid lat > 90 ', () => {
  expect(isValid('91.0', '10')).toBe(false)
})
test('isValid lon > 180 ', () => {
  expect(isValid('10', '181')).toBe(false)
})

test('isValid', () => {
  expect(isValid('0.1', '0.1')).toBe(false)
})

test('isValid', () => {
  expect(isValid('4.2301', '12.1232')).toBe(true)
  expect(isValid('34.231', '99.9000')).toBe(true)
  expect(isValid('14.21', '49.45626')).toBe(true)
})
