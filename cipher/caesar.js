
const mod = (n, m) => ((n % m) + m) % m

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export const encrypt = (string, shift) => {
  return string.toUpperCase().split('').map((letter) => {
    if (letter === ' ') return ' '
    const shiftedLetterIndex = mod(letters.indexOf(letter) + shift, letters.length)
    return letters[shiftedLetterIndex]
  }).join('')
}

export const decrypt = (string, shift) => {
  return encrypt(string, -shift)
}

export const bruteForce = (string) => {
  const result = []
  for (let i = 1; i < letters.length; i++) {
    result.push(encrypt(string, i))
  }
  return result
}
