<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed, ref } from 'vue'

const texto = ref('')

const resultado = computed(() => {
  return texto.value.split('').reverse().join('')
})

const respuestaFailed = ref(false)
const respuesta = ref()

const handleClick = async () => {
  try {
    const response = await fetch('https://donde-esta-supercoco.vercel.app/api/reto/3', {
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

  <section id="Reto3">

    <h1>Reto 3: TBD</h1>

    <div class="formulario">
      <div>
        <label>Frase</label>
        <input v-model="texto" type="text" />
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
