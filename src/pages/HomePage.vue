<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <!-- <div style="font-size: 30vh">
        404
      </div>
    -->
      <div class="text-h2" style="opacity: 0.4">Calculadora de notas</div>

      <!-- <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      /> -->
      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/presencial"
        label="Presencial"
        no-caps
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

// export default defineComponent({
//   name: 'ErrorNotFound'
// });
</script>
