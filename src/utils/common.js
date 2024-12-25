const githubPro = 'https://github.com/vici0uz/facen-calculator/tree/master';

const columns = [
  { name: 'nota', field: 'nota', label: 'Nota', align: 'center' },
  { name: 'puntaje', field: 'puntaje', label: 'Puntaje', align: 'center' },
];

const notas = [
  { nota: 2, divisor: 60 },
  { nota: 3, divisor: 70 },
  { nota: 4, divisor: 80 },
  { nota: 5, divisor: 90 },
];
export function getColumns() {
  return columns;
}
export function openGithub() {
  window.open(githubPro, '_blank', 'noreferrer');
}

export function rowMaker(rows, acumulado) {
  rows.value.length = 0;
  notas.forEach((el, index) => {
    const row = {
      nota: el.nota,
      puntaje: Math.round(
        (el.divisor * 100) / 60 - (acumulado.value * 40) / 60
      ),
    };
    rows.value.push(row);
  });
}
