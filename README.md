# Reto 1: Localización tramposa


## Caesar cipher

Para decodificar podemos trabajar con el siguiente algoritmo:

```
const frase = ref('NVI EPVI YZ BVUOZGPBVOSZ')
const desplazamiento = ref(5)
const resultado = computed(() => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return frase.value.split('').map((l) => {
    if (l === ' ') return ' '
    const d = letters.indexOf(l) + desplazamiento.value
    return letters[d % letters.length]
  }).join('')
})
```

*En este caso el desplazamiento debe ser positivo.*

¿Pero y si queremos codificar con desplazamiento negativo?

🦄 BONUS: Un desplazamiento negativo nos permitirá decodificar!

% no soporta valores negativos :(, pero podemos implementar el `negative modulo`:

```
const mod = (n, m) => ((m % n) + n) % n
```

## Testing

> proximamente
