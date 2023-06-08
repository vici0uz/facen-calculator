<template>
  <!-- <q-layout view="lHh Lpr lFf"> -->
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center bg-grey-4">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '40%' }"
        >
          <q-toolbar class="bg-teal text-center">
            <q-toolbar-title>Calculadora de notas Presencial</q-toolbar-title>
            <q-btn flat round dense @click="openGithub">
              <q-tooltip class="bg-accent">vici0uz</q-tooltip>
              <q-icon name="fa-brands fa-github" />
            </q-btn>
          </q-toolbar>
          <q-card-section>
            <div class="row">
              <div
                class="text-center column"
                v-bind:style="
                  $q.screen.lt.sm ? { maxWidth: '10%' } : { maxWidth: '60%' }
                "
              >
                <div
                  class="acumulado"
                  :style="{ backgroundColor: tieneFirma ? 'green' : 'red' }"
                  v-if="acumulado != 0"
                >
                  <b>Acumulado:</b>
                  <h2>{{ acumulado }}</h2>
                </div>
                <div
                  :class="sumatoria > 40 ? 'bg-red' : 'bg-teal'"
                  v-if="sumatoria > 0"
                >
                  <q-tooltip class="bg-teal"
                    >La sumatoria de los pesos debe ser igual a 40</q-tooltip
                  >
                  Total pesos:<b>{{ sumatoria }}</b>
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
                :title="titulo"
                dense
                v-bind:style="
                  $q.screen.lt.sm ? { maxWidth: '50%' } : { maxWidth: '60%' }
                "
              >
                <template v-slot:body-cell-puntaje="props">
                  <q-td
                    :style="{
                      backgroundColor: props.row.puntaje > 100 ? 'red' : 'white'
                    }"
                  >
                    {{ props.row.puntaje }}
                  </q-td>
                </template>
                <template v-slot:body-cell-nota="props">
                  <q-td
                    ali
                    :style="{
                      backgroundColor: props.row.puntaje > 100 ? 'red' : 'white'
                    }"
                  >
                    {{ props.row.nota }}
                  </q-td>
                </template>
                ></q-table
              >
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
                      'La suma de los pesos no debe ser mayor a 40'
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
                      'La suma de los pesos no debe ser mayor a 40'
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
                  color="teal"
                  icon="refresh"
                  label="reset"
                  @click="onReset"
                ></q-btn>
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
import { useQuasar } from 'quasar';

const $q = useQuasar();
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
const sumatoria = ref(0);
const titulo = 'PUNTAJES EN EL EXAMEN FINAL';
const columns = [
  { name: 'nota', field: 'nota', label: 'Nota', align: 'center' },
  { name: 'puntaje', field: 'puntaje', label: 'Puntaje', align: 'center' }
];

const notas = [
  { nota: 2, divisor: 60 },
  { nota: 3, divisor: 70 },
  { nota: 4, divisor: 80 },
  { nota: 5, divisor: 90 }
];
const githubPro = 'https://github.com/vici0uz/facen-calculator/tree/master';

function openGithub() {
  window.open(githubPro, '_blank', 'noreferrer');
}

function rowMaker() {
  rows.value.length = 0;
  notas.forEach((el, index) => {
    const row = {
      nota: el.nota,
      puntaje: Math.round((el.divisor * 100) / 60 - (acumulado.value * 40) / 60)
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
    console.log(total);
    sumatoria.value = total;
    if (total > 40) {
      $q.notify({
        message: 'La suma de los pesos debe ser igual a 40',
        actions: [{ label: 'Ok' }]
      });
      return false;
    }
  } else if (Number(vals) == 0) {
    sumatoria.value = 0;
  }
  return true;
}

// fuction checkSumatoria(){

// }
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
    if (pesoExamenes.value != 0 && pesoExamenes.value <= 100) {
      if (
        primerParcial.value != 0 &&
        primerParcial.value <= 100 &&
        segundoParcial.value &&
        segundoParcial.value <= 100
      ) {
        puntaje =
          ((Number(primerParcial.value) + Number(segundoParcial.value)) / 2) *
          (pesoExamenes.value / 40);
      }
      if (tieneParticipacion.value) {
        if (participacion.value && participacion.value <= 100) {
          puntaje +=
            (Number(participacion.value) * pesoParticipacion.value) / 40;
        }
      }
      if (tieneTP.value) {
        if (trabajoPractico.value && trabajoPractico.value <= 100) {
          puntaje += (Number(trabajoPractico.value) * pesoTP.value) / 40;
        }
      }
    }
    if (puntaje <= 100) {
      acumulado.value = Math.round(puntaje * 100) / 100;
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

function bodyClass() {
  return $q.screen.lt.sm ? 'sm' : 'md';
}

function onReset() {
  pesoExamenes.value = 0;
  primerParcial.value = 0;
  segundoParcial.value = 0;
  pesoTP.value = 0;
  tieneTP.value = false;
  tieneParticipacion.value = false;
  participacion.value = 0;
  sumatoria.value = 0;
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

.row-red {
  background-color: red;
}
</style>
