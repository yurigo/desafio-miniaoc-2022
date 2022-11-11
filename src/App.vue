<script setup lang="ts">
import { computed, ref } from 'vue'

const frase = ref('Codifica lo que quieras con Cesar')
const desplazamiento = ref(1)

const resultado = computed(() => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return frase.value.toUpperCase().split('').map((l) => {
    if (l === ' ') return ' '
    const d = letters.indexOf(l) - desplazamiento.value
    return letters[mod(d, letters.length)]
  }).join('')
})

const mod = (n, m) => ((n % m) + m) % m

const procrastination = [
  { desplazamiento: -5, texto: 'NVI EPVI YZ BVUOZGPBVOSZ' },
  { desplazamiento: 5, texto: 'XFS OZFS IJ LFEYJQZLFYCJ' },
  { desplazamiento: -42, texto: 'CKX TEKX NO QKJDOVEQKDHO' },
  { desplazamiento: 13, texto: 'FHCREPNYVSENTVYVFGVPBRFCVNYVQBFB' },
  { desplazamiento: -8, texto: 'DGJWE AHKME VGDGJ KAL SEWL' },
  { desplazamiento: -13, texto: 'YBERZ VCFHZ QBYBE FVG NZRG' }
]

const handleListItemClick = (desplz, texto) => {
  frase.value = texto
  desplazamiento.value = desplz
}

const handleClick = async () => {
  await fetch('https://donde-esta-supercoco.vercel.app/api/reto/1', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ solution: resultado.value })
  })
}

</script>

<template>
  <header>

  </header>
  <main>
    <div class="container">

      <h1>Reto 1: Localización tramposa</h1>

      <div class="formulario">
        <div>
          <label>Frase</label>
          <input v-model="frase" type="text" />
        </div>

        <div>
          <label>Desplazamiento</label>
          <input v-model="desplazamiento" type="number" />
        </div>

      </div>

      <div class="resultado">

        <label>Resultado</label>
        <span>
          {{ resultado }}
        </span>
      </div>

      <button @click="handleClick" title="está deshabilitado porque la llamada a la api no se puede realizar por CORS">Envia el
        resultado!</button>

      <div class="procrastinacion">

        Otras pruebas:
        <ul>
          <li v-for="(p, index) in procrastination" :key="index"
            :class="{ selected: p.texto === frase }"
            @click="handleListItemClick(p.desplazamiento, p.texto)">
            {{ p.texto }}
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 3em;
}

.formulario>div {
  display: flex;
  flex-direction: column;
}

input {
  padding: 10px;
  border: 3px solid white;
}

.resultado {
  margin-top: 2em;
  display: flex;
  flex-direction: column;
}

.resultado span {
  border: 3px solid white;
  padding: 10px;
  background-color: #2b2a33;
  min-height: 60px;
  box-shadow: 10px 10px 0 0 white;
}

li {
  padding-top: 7px;
  text-decoration: underline;
  text-decoration-thickness: 3px;
  cursor: pointer;
}

li:hover {
  text-decoration-color: greenyellow;
}

li.selected {
  color: greenyellow;
}

button {
  background-color: black;
  align-self: end;
  width: 50%;
  margin-top: 1.5em;
  border: 3px solid white;
  padding: 0.6em 1.2em;
  font-size: 1em;
  box-shadow: 10px 10px 0 0 white;
  color: white;
  letter-spacing: -1px;
  cursor: pointer;
  transition: all 0.25s;
}

button:hover:enabled {
  color: black;
  border-color: black;
  box-shadow: 10px 10px 0 0 black;
  background-color: white;
}

button:disabled {
  opacity: 0.1;
  cursor: not-allowed;
}

.procrastinacion {
  font-size: smaller;
  margin-top: 3em;
}
</style>
