<script setup lang="ts">
import Reto1 from './Reto1.vue'
import Reto2 from './Reto2.vue'
import Reto3 from './Reto3.vue'
import Rainbow from './RainbowSeparator.vue'
</script>

<template>
  <header>
    <nav>
      <a href="#Reto1">.1</a>
      <a href="#Reto2">.2</a>
      <a href="#Reto3">.3</a>
    </nav>
  </header>
  <main>
    <div class="container">
      <Reto1></Reto1>
      <Rainbow></Rainbow>
      <Reto2></Reto2>
      <Rainbow></Rainbow>
      <Reto3></Reto3>
    </div>
  </main>
  <footer>

  </footer>
</template>

<style scoped>
header {
  scroll-snap-align: start;
  position: sticky;
  top: 0;
  z-index: 1;
}

footer {
  scroll-snap-align: start;
  min-height: 50vh;
  background-color: purple;
  margin-top: 20em;
}

nav {
  right: 10px;
  top: 10px;
  display: flex;
  flex-direction: row;
  gap: 1em;
  justify-content: end;
  padding: 10px;
  background: rgb(36, 36, 36);
  background: linear-gradient(180deg, rgba(36, 36, 36, .9) 0%, rgba(36, 36, 36, .7) 32%, rgba(0, 0, 0, 0) 100%);
}

.container {
  padding: 15px;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
}

@media screen and (min-width: 450px) {

  nav {
    position: fixed;
    right: 10px;
    top: 10px;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .container {
    padding: 50px;
  }
}

hr {
  margin-block: 4em;
}
</style>

<style>
html {
  scroll-snap-type: y proximity;
  scroll-behavior: smooth;
}
</style>
