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

Se ha creado un banco de pruebas:

- [`caesar.test.js`](cipher/caesar.test.js)

# Reto 2: Coordenadas ermitañas

Al recibir un string de números, por ejemplo `1234` el enunciado nos pide que formemos 2 números de al menos un decimal separados por coma. En este caso, `1234` sólo puede dar el resultado de `1.2,3.4`.

Si observamos un número de 5 caracteres `12345` éste nos puede dar un conjunto de 4 resultados: `1.23,4.5 , 12.3,4.5 , 1.2,3.45 , 1.2,34.5` 

Para 6 caracteres, 10 resultados.

En este punto podemos intentar inferir la fórmula a partir de combinatoria pero no de la cantidad de caracteres sinó de la cantidad de espacios entre caracteres, combinados entre 3 (uno por cada separador (`.` y '`,`'))

Es decir: 
4 caracteres:
- 3 espacios intracaracter combinados de 3 en 3:

```
( 3 3 ) = 3! / 3! ( 3 - 3 )! = 1
```

5 caracteres:
- 4 espacios combinados de 3 en 3:
  
```
( 4 3 ) = 4! / 3! ( 4 - 3 ) ! = 4
```

6 caracteres:
- 5 espacios combinados de 3 en 3:
  
```
( 5 3 ) = 5! / 3! ( 5 - 3 ) ! = 10
```

7 caracteres:
- 5 espacios combinados de 3 en 3:
  
```
( 7 3 ) = 7! / 3! ( 7 - 3 ) ! = 20
```

Este cálculo puede servirnos para crear un test específico que verifique si el algoritmo es óptimo.

## Testing

Se han hecho 3 bancos de pruebas:

- [`unwrapper.test.js`](coords/unwrapper.test.js)
- [`helper.test.js`](coords/helper.test.js)
- [`optimization.test.js`](coords/optimization.test.js)


| test                 | descripcion                                                                                                                                                                                                                                                                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| unwrapper.test.js    | Tests unitarios y de integración para el reto 2                                                                                                                                                                                                                                                                                                       |
| helper.test.js       | Test unitarios del método isValid                                                                                                                                                                                                                                                                                                                     |
| optimization.test.js | Al crear los resultados a partir de una entrada, se recorre el string con tres índices donde se insertará el '.' o la ','.  Teniendo en cuenta que se puede calcular el número de combinaciones posibles previamente a las iteraciones, podemos crear un test que verifique que se hacen tantas iteraciones como el número de combinaciones posibles. |

# Reto 3: Endiablado

Para descubrir la coordenada se puede crear un endpoint dinámico al que le iremos añadiendo caractéres según vayamos descubriendolos.

Se ha encapsulado la llamada a la api en un módulo: [`cell.js`](grid/cell.js) para posteriormente aplicar testing.

## Testing

Se han hecho 1 banco de prueba:

- [`cell.test.js`](grid/cell.test.js)

Para diseñar este banco de pruebas se ha utilizado [resolves](https://vitest.dev/api/#resolves) y [rejects](https://vitest.dev/api/#rejects) de Vitest para trabajar con Promesas.

### Bonus

Para mejorar la velocidad se podrían agrupar las Promesas y ejecutar un Promise.all, se puede ver una comparación entre [`cell.test.js:119:0`](grid/cell.test.js#L119) en [`cell.test.js:141:0`](grid/cell.test.js#L141)

# Extras:

## 🌈 RainbowSeparator 🌈

One `div` only:

```
<div></div>
```

Css magic:

```css
div {
    margin: 4em auto 4em;
}

div::after,
div::before {
    display: inline-block;
    content: " ";
    width: 100px;
    height: 100px;
}

div::before {
    border-top-left-radius: 150%;
    box-shadow:
        5px 5px 0 5px rgb(243, 19, 19) inset,
        10px 10px 0 10px rgb(255, 145, 0) inset,
        15px 15px 0 15px rgb(252, 223, 3) inset,
        20px 20px 0 20px rgb(5, 232, 5) inset,
        25px 25px 0 25px rgb(59, 135, 249) inset,
        30px 30px 0 30px rgb(196, 98, 226) inset,
        35px 35px 0 35px rgb(103, 28, 190) inset;

}

div::after {
    border-top-right-radius: 100%;
    box-shadow:
        -5px 5px 0 5px rgb(243, 19, 19) inset,
        -10px 10px 0 10px rgb(255, 145, 0) inset,
        -15px 15px 0 15px rgb(252, 223, 3) inset,
        -20px 20px 0 20px rgb(5, 232, 5) inset,
        -25px 25px 0 25px rgb(59, 135, 249) inset,
        -30px 30px 0 30px rgb(196, 98, 226) inset,
        -35px 35px 0 35px rgb(103, 28, 190) inset;
}
```

## iOS issue

iOS no hace la sombra bien al no ser un circulo:

![ios issue](https://user-images.githubusercontent.com/5684699/202801349-85246fb5-7ab4-44d5-8047-9b6e8f883ea9.jpeg)

Se cambia todo el enfoque a divs con borde :'(

# 🏹 scroll-snap 🏸

Vía [css](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type) se puede modificar el comportamiento del scroll provocando un snap en el scrolling

Si se pone en el `html` la regla de `scroll-snap-type: y proximity;` provocaremos que haya un snap por cada elemento contenido html.  Como no lo queremos para todos
se puede poner la regla `scroll-snap-align: start;`  para indicar que se haga en snap en el elemento que tenga dicha regla.

# 💚 scroll-behaviour 💚

Via [css](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior) podemos indicar que el scrolling se haga `smooth`


