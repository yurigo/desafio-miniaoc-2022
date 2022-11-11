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

El desplazamiento debe ser positivo.


Si queremos decodificar deberíamos trabajar con un desplazamiento negativo pero % no lo soporta.  Podemos implementar el negative modulo:

```
const mod = (n, m) => ((m % n) + n) % n
```

Y de este modo implementar codificación (para desplazamientos positivos) y decodificación (para desplazamientos negativos)

## Testing

> proximamente
