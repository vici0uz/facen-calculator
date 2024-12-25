<template>
  <!-- <q-layout view="lHh Lpr lFf"> -->
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center bg-teal-3">
        <q-card v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '40%' }">
          <q-toolbar class="bg-teal text-center">
            <q-btn flat round dense icon="home" class="q-mr-sm" unelevated title="Inicio" to="/" />
            <q-toolbar-title>
              🐊 Calcular notas a partir de firma
            </q-toolbar-title>
            <q-btn flat round dense @click="openGithub">
              <q-tooltip class="bg-accent">vici0uz</q-tooltip>
              <q-icon name="fa-brands fa-github" />
            </q-btn>
          </q-toolbar>
          <q-card-section>
            <div class="row">
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row">

              <!-- <q-form @reset="onReset" class="q-gutter-md" ref="formRef"> -->
              <q-form class="q-gutter-md" ref="formRef">
                <!-- <q-card-section> -->
                <div class="row">
                  <q-input v-model.number="acumulado" type="number" label="Acumulado" :rules="[
                    // (val) => !!val || 'Requerido',
                    // (val) => checkTotal(val) || msg_max_peso_examen,
                    (val) => Number(val) <= 100 || msg_max_acumulado,
                    // (val) => checkVals(val) || msg_max_pesos
                  ]" suffix="%" clearable dense mask="#"></q-input>
                </div>
              </q-form>
              <q-space></q-space>
              <q-table :columns="columns" v-if="tieneFirma" :rows="rows" hide-pagination :title="titulo" dense
                v-bind:style="$q.screen.lt.sm ? { maxWidth: '50%' } : { maxWidth: '60%' }
                  ">
                <template v-slot:body-cell-puntaje="props">
                  <q-td :style="{
                    backgroundColor: props.row.puntaje > 100 ? 'red' : 'green'
                  }">
                    {{ props.row.puntaje }}
                  </q-td>
                </template>
                <template v-slot:body-cell-nota="props">
                  <q-td ali :style="{
                    backgroundColor: props.row.puntaje > 100 ? 'red' : 'white'
                  }">
                    {{ props.row.nota }}
                  </q-td>
                </template>
                ></q-table>
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { ac } from 'app/dist/spa/assets/index.1079d4b7';
import { openGithub, getColumns, rowMaker } from 'src/utils/common';
import { ref, watch } from 'vue';


const tieneFirma = ref(false);
const titulo = 'Puntajes en la final'
const columns = getColumns()
const acumulado = ref();
const rows = ref([]);
const msg_max_acumulado = 'No puede ser mayor a 100';

watch(
  () => [
    acumulado.value
  ],
  () => {
    if (acumulado.value > 50 && acumulado.value <= 100) {
      tieneFirma.value = true
      rowMaker(rows, acumulado)
    }
  }
)
</script>
