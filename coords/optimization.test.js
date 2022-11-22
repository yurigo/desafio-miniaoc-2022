import { expect, test, vi } from 'vitest'

import * as helper from './helper'
import * as unwrapper from './unwrapper'

/*
Para utilizar el spyOn() necesito que la función a espiar esté en un módulo separado.
He probado a que el método isValid estuviera en unwrapper pero no funciona correctamente:

si se utiliza isValid el unwrapper.js y en optimization.test.js se hace el import. unwrappwer está
utilizando la función de su módulo mientras que optimization.test.js está utilizando la referencia y
al intentar espiar la referencia cuando unwrapper utiliza su funcion interna spyOn no la detecta.

al hacer el import en varios módulos (unwrapper.js y optimization.test.js) la función
isValid se convierte en la misma referencia para unwrapper y optimization.test y se puede espiar correctamente,
ya que al espiarla en optimization.test, cuando se utiliza en unwrapper (como és una referencia) spyOn puede
contabilizarla.
*/

test('unwrap {123456}}', () => {
  const input = '{123456}'
  const valid = unwrapper.combinatoria(5, 3)

  const isValidSpy = vi.spyOn(helper, 'isValid')
  unwrapper.unwrap(input)

  expect(isValidSpy).toHaveReturnedTimes(valid)
})

test('unwrap {1234567890}}', () => {
  const input = '{1234567890}'
  // const isValidSpy = vi.spyOn(unwrapper, 'isValid')
  const valid = unwrapper.combinatoria(9, 3)
  const isValidSpy = vi.spyOn(helper, 'isValid')

  unwrapper.unwrap(input)

  expect(isValidSpy).toHaveReturnedTimes(valid)
})

// verifica que isValid se llame tantas veces como la combinatoria
// de '.' y ','

test('unwrap {n}}', () => {
  const input = ['{12320}', '{432424}', '{48392849218592}']

  input.forEach(i => {
    const numeroDeEspacios = i.length - 3
    const valid = unwrapper.combinatoria(numeroDeEspacios, 3)
    const isValidSpy = vi.spyOn(helper, 'isValid')
    unwrapper.unwrap(i)
    expect(isValidSpy).toHaveReturnedTimes(valid)
  })
})
