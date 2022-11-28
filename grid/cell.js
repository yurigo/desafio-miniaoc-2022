
export const revealCell = async (endpoint, row, col) => {
  try {
    return fetch(`https://donde-esta-supercoco.vercel.app/api/reto/3${endpoint}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ checkpoint: `{${col},${row}}` })
    })
  } catch (ex) {
    console.warn('error')
  }
}
