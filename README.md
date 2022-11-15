# Reto 1: Localización tramposa


## Caesar cipher

Para decodificar podemos trabajar con el siguiente algoritmo:

```
export const encrypt = (string, shift) => {
  return string.toUpperCase().split('').map((letter) => {
    if (letter === ' ') return ' '
    const shiftedLetterIndex = (letters.indexOf(letter) + shift) % letters.length
    return letters[shiftedLetterIndex]
  }).join('')
}
```

*En este caso el desplazamiento debe ser positivo.*

¿Pero y si queremos codificar con desplazamiento negativo?

🦄 BONUS: Un desplazamiento negativo nos permitirá decodificar!

`%` no soporta valores negativos ☹, pero podemos implementar el `negative modulo`:

```
const mod = (n, m) => ((m % n) + n) % n
```

## Testing

Añadido `vitest` para el testing.


