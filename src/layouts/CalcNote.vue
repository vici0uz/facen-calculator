<template>
  <!-- <q-layout view="lHh Lpr lFf"> -->
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center bg-grey-4">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '40%' }"
        >
          <q-toolbar class="bg-green-9 text-center">
            <q-toolbar-title>Calculadora de notas Presencial</q-toolbar-title>
            <q-btn flat round dense @click="openGithub">
              <q-tooltip class="bg-accent">vici0uz</q-tooltip>
              <q-icon name="fa-brands fa-github" />
            </q-btn>
          </q-toolbar>
          <q-card-section>
            <div class="row">
              <div class="text-center">
                <div
                  class="acumulado"
                  :style="{ backgroundColor: tieneFirma ? 'green' : 'red' }"
                  v-if="acumulado != 0"
                >
                  <h2>{{ acumulado }}</h2>
                </div>
                <div class="firmas" v-if="firmas > 0">
                  {{ firmas }} <b>Firmas</b>
                </div>
              </div>
              <q-space></q-space>
              <q-table
                :columns="columns"
                v-if="tieneFirma"
                :rows="rows"
                hide-pagination
              ></q-table>
              <!-- <div class="badge" v-if="firmas > 0">
                <div class="text-center">
                  <h3>
                    <span>{{ firmas }}</span>
                  </h3>
                  <p>Firmas</p>
                </div>
              </div> -->
            </div>
          </q-card-section>
          <q-card-section>
            <q-form @reset="onReset" class="q-gutter-md" ref="formRef">
              <!-- <q-card-section> -->
              <div class="row">
                <q-input
                  v-model="pesoExamenes"
                  type="number"
                  label="Peso examenes"
                  :rules="[
                    (val) => !!val || 'Requerido',
                    (val) => Number(val) <= 100 || 'No puede ser mayor a 100',
                    (val) =>
                      checkVals(val) ||
                      'La suma de los pesos no debe ser mayor a 40'
                  ]"
                  prefix="%"
                  clearable
                  dense
                ></q-input>
              </div>
              <div class="row">
                <q-input
                  v-model="primerParcial"
                  type="number"
                  label="Primer parcial"
                  :rules="[
                    (val) => !!val || 'Requerido',
                    (val) => Number(val) <= 100 || 'No puede ser mayor a 100'
                  ]"
                  prefix="%"
                  clearable
                  dense
                />
                <q-space></q-space>
                <q-input
                  v-model="segundoParcial"
                  type="number"
                  label="Segundo parcial o recuperatorio"
                  :rules="[
                    (val) => !!val || 'Requerido',
                    (val) => Number(val) <= 100 || 'No puede ser mayor a 100'
                  ]"
                  prefix="%"
                  clearable
                  dense
                ></q-input>
              </div>
              <!-- </q-card-section> -->
              <!-- <q-card-section> -->
              <q-toggle
                size="70px"
                color="green"
                v-model="tieneTP"
                val="true"
                label="Trabajo Práctico"
              />

              <div class="row" v-if="tieneTP">
                <q-input
                  type="number"
                  v-model="pesoTP"
                  label="Peso trabajo práctico"
                  prefix="%"
                  clearable
                  dense
                  :rules="[
                    (val) => (tieneTP && !!val) || 'Requerido',
                    (val) => Number(val) <= 100 || 'No puede ser mayor a 100',
                    (val) =>
                      checkVals(val) ||
                      'La suma de los pesos no puede ser mayor a 100'
                    // (val) => Number(val) < 100 || 'No puede ser mayor a 100'
                  ]"
                />
                <q-space />
                <q-input
                  type="number"
                  v-model="trabajoPractico"
                  label="Trabajo práctico"
                  prefix="%"
                  v-if="tieneTP"
                  clearable
                  dense
                  :rules="[
                    (val) => (tieneTP && !!val) || 'Requerido',
                    (val) => Number(val) <= 100 || 'No puede ser mayor a 100'
                    // (val) => Number(val) < 100 || 'No puede ser mayor a 100'
                  ]"
                />
              </div>
              <q-toggle
                size="70px"
                color="green"
                v-model="tieneParticipacion"
                val="true"
                label="Participación"
              />
              <div class="row" v-if="tieneParticipacion">
                <q-input
                  type="number"
                  v-model="pesoParticipacion"
                  label="Peso Participación"
                  prefix="%"
                  clearable
                  dense
                  :rules="[
                    (val) => (tieneParticipacion && !!val) || 'Requerido',
                    (val) => Number(val) <= 100 || 'No puede ser mayor a 100',
                    (val) =>
                      checkVals(val) ||
                      'La suma de los pesos no puede ser mayor a 100'
                  ]"
                />
                <q-space />

                <q-input
                  type="number"
                  v-model="participacion"
                  label="Participación"
                  prefix="%"
                  clearable
                  dense
                  :rules="[
                    (val) => (tieneTP && !!val) || 'Requerido',
                    (val) => Number(val) <= 100 || 'No puede ser mayor a 100'
                    // (val) => Number(val) < 100 || 'No puede ser mayor a 100'
                  ]"
                />
              </div>
              <div class="flex-center flex">
                <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                  icon="mail"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';

const pesoExamenes = ref(0);
const pesoTP = ref(0);
const pesoParticipacion = ref(0);

const tieneFirma = ref(false);
const tieneTP = ref(false);
const tieneParticipacion = ref(false);

const primerParcial = ref(0);
const segundoParcial = ref(0);
const trabajoPractico = ref(0);
const participacion = ref(0);

const acumulado = ref(0);
const firmas = ref(0);
const formRef = ref();
const rows = ref([]);
const columns = [
  { name: 'nota', field: 'nota', label: 'Nota', align: 'center' },
  { name: 'puntaje', field: 'puntaje', label: 'Puntaje' }
];
const githubPro = 'https://github.com/vici0uz';

function openGithub() {
  window.open(githubPro, '_blank', 'noreferrer');
}

function rowMaker() {
  const notas = [
    { nota: 2, divisor: 60 },
    { nota: 3, divisor: 70 },
    { nota: 4, divisor: 80 },
    { nota: 5, divisor: 90 }
  ];
  rows.value.length = 0;
  notas.forEach((el, index) => {
    const row = {
      nota: el.nota,
      puntaje: Math.round(
        (el.divisor * 100) / el.divisor - (acumulado.value * 40) / el.divisor
      )
    };
    rows.value.push(row);
  });
}
function checkVals(vals) {
  if (Number(vals) > 0) {
    let total: number =
      Number(pesoExamenes.value ? pesoExamenes.value : 0) +
      Number(pesoParticipacion.value ? pesoParticipacion.value : 0) +
      Number(pesoTP.value ? pesoTP.value : 0);
    if (total > 100) {
      return false;
    }
  }
  return true;
}
watch(
  () => [
    primerParcial.value,
    segundoParcial.value,
    pesoExamenes.value,
    pesoParticipacion.value,
    participacion.value,
    pesoTP.value,
    trabajoPractico.value
  ],
  () => {
    let puntaje = 0;
    if (pesoExamenes.value != 0) {
      if (primerParcial.value != 0 && segundoParcial.value) {
        puntaje =
          ((Number(primerParcial.value) +
            Number(segundoParcial.value.valueOf())) /
            2) *
          (pesoExamenes.value / 40);
      }
      if (tieneParticipacion.value) {
        puntaje += (Number(participacion.value) * pesoParticipacion.value) / 40;
      }
      if (tieneTP.value) {
        puntaje += (Number(trabajoPractico.value) * pesoTP.value) / 40;
      }
    }
    acumulado.value = puntaje;
    if (acumulado.value >= 50) {
      tieneFirma.value = true;
      firmas.value = 1;
      if (acumulado.value >= 60) {
        firmas.value = 2;
      }
      rowMaker();
    } else {
      tieneFirma.value = false;
      firmas.value = 0;
    }
  }
);

// function getAcumulado() {
//   let score = 0;
//   if (peso_examenes.value != 0) {
//     let examenes = 0;
//     if (primer_parcial.value != 0) {
//       examenes + primer_parcial.value.valueOf();
//     }
//     if (segundo_parcial.value != 0) {
//       examenes + segundo_parcial.value.valueOf();
//     }
//     score = examenes / 2;
//   }
//   return score;
// }

function onReset() {
  pesoExamenes.value = 0;
  primerParcial.value = 0;
  segundoParcial.value = 0;
}
</script>
<style lang="scss">
.main {
  border: 1px solid black;
  // background-color: green;
}
.acumulado {
  text-align: center;
}
.badge {
  border-radius: 50%;
  background-color: yellow;
  width: 120px;
  height: 120px;
}
.firmas {
  background-color: yellow;
}
</style>
