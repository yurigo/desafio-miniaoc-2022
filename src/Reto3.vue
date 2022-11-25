<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const texto = ref('')

const cols = [0, 1, 2, 3, 4, 5, 6]
const rows = [0, 1, 2, 3, 4, 5, 6].reverse()

const responses = ref({
  6: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  5: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  4: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  3: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  2: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  1: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  0: [undefined, undefined, undefined, undefined, undefined, undefined, undefined]
})

const reset = () => {
  responses.value = {
    6: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    5: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    4: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    3: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    2: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    1: [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    0: [undefined, undefined, undefined, undefined, undefined, undefined, undefined]
  }
}

watch(texto, async (newQuestion, oldQuestion) => {
  reset()
})

const resultado = computed(() => {
  return `3${texto.value}`.replace('P', '.').replace('C', ',').replace('z', '')
})

const respuestaFailed = ref(false)
const respuesta = ref()

// 7P1Cz12P3

const handleClick = async () => {
  const promises = []
  for (const row in rows) {
    for (const col in cols) {
      promises.push(doFetch(row, col))
      doFetch(row, col)
    }
  }
  const responsesFromApi = await Promise.all(promises)
  console.log(responsesFromApi)
  const result = responsesFromApi.map((response) => response.ok)

  const promisesJSON = responsesFromApi.map((response) => response.json())
  const resultJSON = await Promise.all(promisesJSON)

  for (let i = 0; i < result.length; i++) {
    responses.value[Math.floor(i / 7)][i % 7] = result[i]
  }

  respuesta.value = resultJSON.reduce((previous, current) => previous + ' ' + current?.status, '')
  respuestaFailed.value = false
}

const doFetch = async (row, col) => {
  // console.log(`https://donde-esta-supercoco.vercel.app/api/reto/3${texto.value}`)
  // console.log({ checkpoint: `{${row},${col}}` })
  return fetch(`https://donde-esta-supercoco.vercel.app/api/reto/3${texto.value}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ checkpoint: `{${col},${row}}` })
  })
}

const handleCellClick = async (row, col) => {
  try {
    const response = await doFetch(row, col)

    if (!response.ok) {
      // console.error('Algo ha ido mal', response.status)
      // respuesta.value = 'Algo ha ido mal (' + response.status + ')'
      // respuestaFailed.value = true
      responses.value[row][col] = false
      return
    }

    responses.value[row][col] = true

    const data = await response.json()
    console.log(data)
    respuesta.value = data.status
    respuestaFailed.value = false
  } catch (ex) {
    console.error('Algo ha ido mal...')
    respuesta.value = 'Algo ha ido mal...'
    respuestaFailed.value = true
  }
}

</script>

<template>

  <section id="Reto3">

    <h1>Reto 3: Endiablado </h1>

    <div class="discovery">
      <h6>Haz click en una casilla para ver su valor!</h6>
      <!-- <table>
        <tr v-for="row in rows" :key="row">
          <td v-for="col in cols" :key="col"
            @click="handleCellClick(row, col)"
            :class="{
              checked: responses[row][col],
              unchecked: responses[row][col] === false,
              undefined: responses[row][col] === undefined
            }">
            {{ `{ ${col} , ${row} }` }}
          </td>
        </tr>
      </table> -->

      <div class="grid">
        <div class="row" v-for="row in rows" :key="row">
          <div class="col" v-for="col in cols" :key="col"
            @click="handleCellClick(row, col)"
            :class="{
              checked: responses[row][col],
              unchecked: responses[row][col] === false,
              undefined: responses[row][col] === undefined
            }">
            {{ `{ ${col} , ${row} }` }}
          </div>
        </div>
      </div>

      <button @click="handleClick">Me aburro, gira todos...</button>

      <!-- <ButtonVue @click="handleClick">
        I'm bored, resolve all pls...
      </ButtonVue> -->

    </div>

    <div class="formulario">
      <label>Endpoint</label>
      <span>Ves añadiendo las letras que vayas encontrando (recuerda números, P ó C ó z)</span>
      <div>
        <label>api/reto/3</label><input v-model="texto" type="text" pattern="[0-9]" />
      </div>
    </div>

    <div class="resultado">

      <label>Resultado</label>
      <span>
        {{ resultado }}
      </span>
    </div>

    <button @click="handleClick" disabled>Envia el resultado!</button>

    <div class="respuesta" v-if="respuesta" :class="{ failed: respuestaFailed }">
      {{ respuesta }}
    </div>
  </section>

</template>

<style scoped>
section {
  min-height: 100vh;
  min-height: 100vdh;

  scroll-snap-align: start;
  position: relative;

}

.discovery {
  display: flex;
  flex-direction: column;
}

.discovery h6{
  align-self: center;
  margin: 0;
  margin-top: 3em;
}

/* table {
  margin: 1em auto;
}

table tr{
  perspective: 300px;

}

table td {
  height: 75px;
  width: 75px;
  background-color: white;
  border: 0px solid white;
  overflow: hidden;
  font-size: small;
  text-align: center;
  letter-spacing: -4px;
  cursor: pointer;
  transition: all 2s ease-in-out;
  overflow: visible;
  transform: rotate(180deg);
}

table td.checked {
  background-color: #f0003c;
  transform: rotateY(0);
}

table td.unchecked {
  background-color: white;
  transform: rotateY(0);
}

table td.undefined {
  background-color: lime;
  transform: rotateY(180deg);
} */

.grid {
  perspective: 500px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  perspective: 500px;
  margin-block: 1em;
}

.row {
  perspective: 400px;
  display: flex;
  flex-direction: row;
  gap: 3px;
  justify-content: center;
}

.col {
  perspective: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotateY(180deg);
  height: 75px;
  width: 75px;
  background-color: white;
  border: 0px solid white;
  overflow: hidden;
  font-size: small;
  text-align: center;
  letter-spacing: -4px;
  transition: transform .4s linear , background-color .22s step-end , box-shadow .1s linear;
}

.col.checked {
  background-color: red;
  transform: rotate(0);
  z-index: 1;
}

.col.unchecked {
  background-color: white;
  transform: rotate(0);
}

.col.checked,
.col.unchecked {
  pointer-events: none;
}

.col.undefined {
  cursor: pointer;
  background-color: lightcyan;
}

.col.undefined:hover {
  box-shadow: 0 0 100px 100px inset greenyellow;
  border: 1px solid black;
}

.col.undefined:active {
  box-shadow: 0 0 100px 100px inset greenyellow;
  border: 3px solid black;
}

.formulario {
  margin-top: 3em;
  display: flex;
  flex-direction: column;
}

.formulario>span{
  font-size: x-small;
  margin-bottom: 1em;
  letter-spacing: -0.5px;
}

.formulario>div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  gap: 3px;
}

input {
  padding: 10px;
  border: 3px solid white;
  width: 100%;
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
  overflow-wrap: break-word;
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

.respuesta {

  --color: green;

  margin-top: 1em;
  border: 3px solid var(--color);
  padding: 10px;
  box-shadow: 10px 10px 0 0 var(--color);
}

.failed {
  --color: red;
}
</style>
