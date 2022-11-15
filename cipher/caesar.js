
const mod = (n, m) => ((n % m) + m) % m

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export const encrypt = (frase, desplazamiento) => {
  return frase.toUpperCase().split('').map((letter) => {
    if (letter === ' ') return ' '
    const d = letters.indexOf(letter) - desplazamiento
    return letters[mod(d, letters.length)]
  }).join('')
}
