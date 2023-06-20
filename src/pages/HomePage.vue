<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <q-img
        src="../assets/st_jaka.webp"
        style="max-height: 300px; max-width: 240px"
        class="text-center rounded-borders"
      >
        <div class="absolute-bottom text-subtitle1 text-center">
          Escucha mis plegarias🙏 🐊
        </div>
      </q-img>
      <div class="row">
        <div>
          <div class="text-h2" style="opacity: 0.4">
            Calculadora de Firmas FACEN 🐊
          </div>
          <q-btn
            class="q-mt-xl"
            color="white"
            text-color="blue"
            unelevated
            to="/calcnotes/presencial"
            label="Presencial"
            no-caps
          />
          <q-btn
            class="q-mt-xl"
            color="white"
            text-color="blue"
            unelevated
            to="/calcnotes/semipres"
            label="Semipresencial"
            no-caps
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped lang="scss">
.q-btn {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
