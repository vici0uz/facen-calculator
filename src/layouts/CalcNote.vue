<template>
  <!-- <q-layout view="lHh Lpr lFf"> -->
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center bg-light-green-3">
        <q-card v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '40%' }">
          <q-toolbar class="bg-teal text-center">
            <q-btn flat round dense icon="home" class="q-mr-sm" unelevated title="Inicio" to="/" />
            <q-toolbar-title>
              🐊 Calculadora de notas
              {{
          calcMode == 'presencial' ? 'presencial' : 'semipresencial'
        }}</q-toolbar-title>
            <q-btn flat round dense @click="openGithub">
              <q-tooltip class="bg-accent">vici0uz</q-tooltip>
              <q-icon name="fa-brands fa-github" />
            </q-btn>
          </q-toolbar>
          <q-card-section>
            <div class="row">
              <div class="text-center column" v-bind:style="$q.screen.lt.sm ? { maxWidth: '10%' } : { maxWidth: '60%' }
          ">
                <div class="acumulado" :style="{ backgroundColor: tieneFirma ? 'green' : 'red' }" v-if="acumulado > 0">
                  <b>Acumulado:</b>
                  <h2>{{ acumulado }}</h2>
                </div>
                <div :class="sumatoria > 40 ? 'bg-red' : 'bg-teal'" v-if="sumatoria > 0">
                  <q-tooltip class="bg-teal">{{ tip_pesos }}</q-tooltip>
                  Total pesos:<b>{{ sumatoria }}</b>
                </div>
                <div class="firmas" v-if="firmas > 0">
                  {{ firmas }} <b>Firmas</b>
                </div>
              </div>
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
          <q-card-section>
            <q-form @reset="onReset" class="q-gutter-md" ref="formRef">
              <!-- <q-card-section> -->
              <div class="row">
                <q-input v-model.number="pesoExamenes" type="number" label="Peso examenes" :rules="[
          (val) => !!val || 'Requerido',
          (val) => checkTotal(val) || msg_max_peso_examen,
          (val) => Number(val) <= 100 || msg_max_acumulado,
          (val) => checkVals(val) || msg_max_pesos
        ]" suffix="%" clearable dense mask="#"></q-input>
              </div>
              <div class="row">
                <q-input v-model="primerParcial" type="number" label="Primer parcial" :rules="[
          (val) => !!val || 'Requerido',
          (val) => Number(val) <= 100 || msg_max_acumulado
        ]" suffix="%" clearable dense />
                <q-space></q-space>
                <q-input v-model="segundoParcial" type="number" label="Segundo parcial o recuperatorio" :rules="[
          (val) => !!val || 'Requerido',
          (val) => Number(val) <= 100 || msg_max_acumulado
        ]" suffix="%" clearable dense></q-input>
              </div>
              <q-toggle size="70px" color="green" v-model="tieneTP" val="true" :label="labl1" />

              <div class="row" v-if="tieneTP">
                <q-input type="number" v-model="pesoTP" :label="labelField11" suffix="%" clearable dense :rules="[
          (val) => (tieneTP && !!val) || 'Requerido',
          (val) => Number(val) <= 100 || msg_max_acumulado,
          (val) => checkVals(val) || msg_max_pesos
        ]" />
                <q-space />
                <q-input type="number" v-model="trabajoPractico" :label="labelField12" suffix="%" v-if="tieneTP"
                  clearable dense :rules="[
          (val) => (tieneTP && !!val) || 'Requerido',
          (val) => Number(val) <= 100 || msg_max_acumulado
        ]" />
              </div>
              <q-toggle size="70px" color="green" v-model="tieneParticipacion" val="true" :label="labl2" />
              <div class="row" v-if="tieneParticipacion">
                <q-input type="number" v-model="pesoParticipacion" :label="labelField21" suffix="%" clearable dense
                  :rules="[
          (val) => (tieneParticipacion && !!val) || 'Requerido',
          (val) => Number(val) <= 100 || msg_max_acumulado,
          (val) => checkVals(val) || msg_max_pesos
        ]" />
                <q-space />

                <q-input type="number" v-model="participacion" :label="labelField22" suffix="%" clearable dense :rules="[
          (val) => (tieneTP && !!val) || 'Requerido',
          (val) => Number(val) <= 100 || msg_max_acumulado
        ]" />
              </div>
              <div class="flex-center flex">
                <q-btn color="teal" icon="refresh" label="reset" @click="onReset"></q-btn>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';

const route = useRoute();
const $q = useQuasar();
const pesoExamenes = ref();
const pesoTP = ref();
const pesoParticipacion = ref();

const tieneFirma = ref(false);
const tieneTP = ref(false);
const tieneParticipacion = ref(false);

const primerParcial = ref();
const segundoParcial = ref();
const trabajoPractico = ref();
const participacion = ref();

const acumulado = ref();
const firmas = ref();
const formRef = ref();
const rows = ref([]);
const sumatoria = ref(0);

//LABELS
const titulo = 'PUNTAJES EN EL EXAMEN FINAL';
const msg_max_pesos = 'La suma de los pesos no debe ser mayor a 40';
const tip_pesos = 'La sumatoria de los pesos debe ser igual a 40';
const msg_max_acumulado = 'No puede ser mayor a 100';
const msg_max_peso_examen = 'El peso de los examenes nunca puede ser mayor a 40'

const calcMode = ref('presencial');
const labl1 = ref('Trabajo practico');
const labl2 = ref('Participación');
const labelField11 = ref('Peso trabajo practico');
const labelField12 = ref('Trabajo practico');

const labelField21 = ref('Peso participación');
const labelField22 = ref('Participación');

const columns = [
  { name: 'nota', field: 'nota', label: 'Nota', align: 'center' },
  { name: 'puntaje', field: 'puntaje', label: 'Puntaje', align: 'center' }
];

onMounted(() => {
  calcMode.value = route.params.mode;
  labl1.value = calcMode.value == 'presencial' ? 'Trabajo Practico' : 'AA';
  labl2.value = calcMode.value == 'presencial' ? 'Participación' : 'AI';
  labelField11.value =
    calcMode.value == 'presencial' ? 'Peso trabajo practico' : 'Peso AA';
  labelField12.value =
    calcMode.value == 'presencial' ? 'Trabajo practico' : 'AA';
  labelField21.value =
    calcMode.value == 'presencial' ? 'Peso participación' : 'Peso AI';
  labelField22.value =
    calcMode.value == 'presencial' ? 'Participación' : 'AI';
});
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

function checkTotal(vals: number) {
  console.log(vals)
  if (Number(vals) > 0) {
    if (!(Number(vals) <= 40)) {
      pesoExamenes.value = 40;
      $q.notify({
        message: msg_max_peso_examen,
        actions: [{ label: 'Ok' }]
      })
    } else {
      return true;
    }
  }

}

function checkVals(vals: number) {
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


watch(
  () => [
    primerParcial.value,
    segundoParcial.value,
    pesoExamenes.value,
    pesoParticipacion.value,
    participacion.value,
    tieneTP.value,
    tieneParticipacion.value,
    pesoTP.value,
    trabajoPractico.value
  ],
  () => {
    let puntaje = 0;
    if (pesoExamenes.value != 0 && pesoExamenes.value <= 40) {
      if (
        primerParcial.value != 0 &&
        primerParcial.value <= 100
        // segundoParcial.value <= 100
      ) {
        puntaje =
          (
            (Number(primerParcial.value) +
              Number((segundoParcial.value != 0 && segundoParcial.value <= 100) ? Number(segundoParcial.value) : 0)
            ) / 2) *
          (pesoExamenes.value / 40);
      }
      if (tieneParticipacion.value) {
        if (participacion.value && participacion.value <= 100) {
          puntaje +=
            (Number(participacion.value) * pesoParticipacion.value) / 40;
        }
      } else {
        participacion.value = pesoParticipacion.value = false;
      }
      if (tieneTP.value) {
        if (trabajoPractico.value && trabajoPractico.value <= 100) {
          puntaje += (Number(trabajoPractico.value) * pesoTP.value) / 40;
        }
      } else {
        trabajoPractico.value = pesoTP.value = false;
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

function onReset() {
  pesoExamenes.value = false;
  primerParcial.value = false;
  segundoParcial.value = false;
  pesoTP.value = false;
  tieneTP.value = false;
  tieneParticipacion.value = false;
  pesoParticipacion.value = false;
  participacion.value = false;
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
