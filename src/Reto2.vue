<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { unwrap } from '../coords/unwrapper.js'
import { computed, ref } from 'vue'

const TEXTO_INICIAL = '{2035}'
const RESULTADO_INICIAL = '{2.0,3.5}'

const texto = ref(TEXTO_INICIAL)

const resultado = computed(() => {
  resetError()
  try {
    return unwrap(texto.value)
  } catch (ex) {
    handleError(ex.message)
  }
  return { valid: [], invalid: [] }
})

const resultadoSeleccionado = ref(RESULTADO_INICIAL)

const respuestaFailed = ref(false)
const respuesta = ref('')

const resetError = () => {
  resultadoSeleccionado.value = ''
  respuestaFailed.value = false
  respuesta.value = ''
}
const handleError = (message) => {
  console.log('error', message)
  respuestaFailed.value = true
  respuesta.value = message
}

const handleClick = async () => {
  try {
    const response = await fetch('https://donde-esta-supercoco.vercel.app/api/reto/2', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ solution: resultadoSeleccionado.value })
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

const handleReset = () => {
  console.log('click')
  texto.value = TEXTO_INICIAL
}

</script>

<template>

  <section id="Reto2">

    <h1>Reto 2: Coordenadas ermitañas</h1>

    <div class="formulario">
      <div>
        <label>Frase</label>
        <input v-model="texto" type="text" />
      </div>
    </div>
    <div class="buttons">
      <a @click="handleReset">reset</a>
    </div>
    <div class="resultado">

      <label>Resultado</label>
      <small>Selecciona el resultado que quieres enviar a la api y pulsa enviar!</small>
      <div class="contenido">
        <div>
          <ul>
            <li v-for="(r, index) in resultado.valid" :key="index">
              <input :id="`ir${index}`" type="radio" :value="r" v-model="resultadoSeleccionado" />
              <label :for="`ir${index}`">{{ r }}</label>
            </li>
          </ul>
          <ul>
            <li v-for="(r, index) in resultado.invalid" :key="index" style="color:red">
              <label :for="`ir${index}`">{{ r }}</label>
            </li>
          </ul>
        </div>
        <span>send: {{ resultadoSeleccionado }}</span>
      </div>
    </div>

    <div class="buttons">
      <button @click="handleClick">Envia el resultado!</button>
    </div>

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

  display: flex;
  flex-direction: column;

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

.resultado .contenido {
  display: flex;
  flex-direction: column;
  border: 3px solid white;
  padding: 10px;
  background-color: #2b2a33;
  min-height: 60px;
  box-shadow: 10px 10px 0 0 white;
  overflow-wrap: break-word;
}

.resultado .contenido div {
  display: flex;
  flex-direction: row;
}

.resultado .contenido span {
  border: 3px solid white;
  padding: 10px;
  margin: 4px;
  display: inline-block;
  align-self: flex-end;
  min-width: 150px;
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

ul {
  list-style: none;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
}

.buttons a {
  cursor: pointer;
}
</style>
