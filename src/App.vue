<script setup lang="ts">
import { encrypt, bruteForce } from '../cipher/caesar.js'
import { computed, ref } from 'vue'

const frase = ref('Codifica lo que quieras con Cesar')
const desplazamiento = ref(1)

const resultado = computed(() => {
  return encrypt(frase.value, desplazamiento.value)
})

const respuestaFailed = ref(false)
const respuesta = ref()

const bruteforced = computed(() => {
  return bruteForce(frase.value)
})

const procrastination = [
  { desplazamiento: 5, texto: 'NVI EPVI YZ BVUOZGPBVOSZ' },
  { desplazamiento: -5, texto: 'XFS OZFS IJ LFEYJQZLFYCJ' },
  { desplazamiento: 42, texto: 'CKX TEKX NO QKJDOVEQKDHO' },
  { desplazamiento: -13, texto: 'FHCREPNYVSENTVYVFGVPBRFCVNYVQBFB' },
  { desplazamiento: 8, texto: 'DGJWE AHKME VGDGJ KAL SEWL' },
  { desplazamiento: 13, texto: 'YBERZ VCFHZ QBYBE FVG NZRG' }
]

const handleListItemClick = (desplz, texto) => {
  frase.value = texto
  desplazamiento.value = desplz
}

const handleClick = async () => {
  try {
    const response = await fetch('https://donde-esta-supercoco.vercel.app/api/reto/1', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ solution: resultado.value })
    })

    if (!response.ok) {
      console.error('Algo ha ido mal', response.status)
      respuesta.value = 'Algo ha ido mal (' + response.status + ')'
      respuestaFailed.value = true
      return
    }

    const data = await response.json()
    console.log(data)
    respuesta.value = data.status
    respuestaFailed.value = false
  } catch (ex) {
    console.error('Algo ha ido mal...')
    respuesta.value = 'Algo ha ido mal...'
    respuestaFailed.value = true
  }

  setTimeout(() => {
    respuesta.value = ''
    respuestaFailed.value = false
  }, 4000)
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

      <button @click="handleClick">Envia el resultado!</button>

      <div class="respuesta" v-if="respuesta" :class="{ failed: respuestaFailed }">
        {{ respuesta }}
      </div>

      <div class="extra">

        <div class="bruteforce">
          <h3>Fuerza bruta</h3>
          <table>
            <thead>
              <tr>
                <th class="header-shift">desplazamiento</th>
                <th class="header-result">resultado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(p, index) in bruteforced" :key="index"
                :class="{ selected: p === resultado && (index + 1) === desplazamiento || (-26 + index + 1) === desplazamiento }">
                <td class="cell-shift">
                  <a @click="desplazamiento = index + 1">
                    {{ index + 1 }}
                  </a>
                  ó
                  <a @click="desplazamiento = - 26 + index + 1">
                    {{ - 26 + index + 1 }}
                  </a>
                </td>
                <td class="cell-result">
                  <a @click="frase = p">
                    {{ p }}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="procrastinacion">

          <h3>Otras pruebas</h3>
          <small>Haciendo click se modifican la frase y desplazamiento con valores preconfigurados</small>
          <ul>
            <li v-for="(p, index) in procrastination" :key="index"
              :class="{ selected: p.texto === frase }"
              @click="handleListItemClick(p.desplazamiento, p.texto)">
              {{ p.texto }} // {{ p.desplazamiento }}
            </li>
          </ul>
        </div>

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
  overflow-wrap: break-word;
}

.procrastinacion ul {
  list-style-type: none;
}

.procrastinacion li {
  padding-top: 7px;
  text-decoration: underline;
  text-decoration-thickness: 3px;
  cursor: pointer;
}

.procrastinacion li:hover {
  text-decoration-color: greenyellow;
}

.procrastinacion li.selected {
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

.bruteforce,
.procrastinacion {
  font-size: smaller;
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

.bruteforce a {
  color: greenyellow;
  cursor: pointer;
}

.bruteforce a:hover {
  color: white;
}

table {
  text-align: left;
  width: 100%;
}

table td {
  padding: 0 1em;
}

.bruteforce table {
  padding-inline-start: 1em;
  margin-top: 1em;
  table-layout: fixed;
}

.bruteforce tr.selected {
  background-color: #2b2a33;
}

.bruteforce tr.selected a {
  color: green;
}

.header-shift {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bruteforce table thead tr {
  border: 3px solid red;
}

.bruteforce table th {
  padding: 5px;
  border-bottom: 3px solid white;
  margin-bottom: 3px;
}

.bruteforce table td {
  padding: 2px 5px;
  margin-top: 30px;
}

.bruteforce .cell-shift {
  text-align: center;
  overflow-wrap: break-word;
  width: 90px;
}

.bruteforce .cell-result {
  font-size: smaller;
  overflow-wrap: break-word;
  width: 100%;
  text-align: left;
}

.extra {
  display: flex;
  gap: 2em;
  margin-top: 3em;
}

.extra>div {
  flex: 1 1 100%;
}

.extra .procrastinacion {
  flex: 1 1 80%;
}

/* hack to add 2px margin between header and body */
.bruteforce table tbody::before {
  content: "";
  display: block;
  height: 2px;
  overflow: hidden;
}

@media(max-width: 1000px) {
  .extra {
    flex-direction: column;
  }
}
</style>
