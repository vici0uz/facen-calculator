<template>
  <div class="fullscreen bg-light-green-3 text-white text-center q-pa-md flex flex-center">
    <div>
      <!-- <q-img
        src="../assets/st_jaka.webp"
        style="max-height: 300px; max-width: 240px"
        class="text-center rounded-borders"
      >
        <div class="absolute-bottom text-subtitle1 text-center">
          Escucha mis plegarias🙏 🐊
        </div>
      </q-img> -->
      <div class="row">
        <div>
          <div class="text-h2" style="opacity: 0.7; color: black">
            Calculadora de Firmas FACEN 🐊 ❤️
          </div>
          <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/calcnotes/presencial"
            label="Presencial" no-caps />
          <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/calcnotes/semipres"
            label="Semipresencial" no-caps />
          <!-- <div class="q-pa-md"> -->
          <!-- <q-carousel
            v-model="slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            arrows
            navigation
            infinite
          >
            <q-carousel-slide :name="1">
              <q-img
                fit="contain"
                src="~/assets/firma1.jpeg"
                width="70%"
                height="100%"
              />
            </q-carousel-slide>
            <q-carousel-slide :name="2">
              <q-img fit="contain" src="~/assets/firma2.jpeg" />
            </q-carousel-slide>
            <q-carousel-slide :name="3">
              <q-img fit="contain" src="~/assets/firma3.jpeg" />
            </q-carousel-slide>
          </q-carousel> -->
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const slide = ref(1);
</script>

<style scoped lang="scss">
.q-btn {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
