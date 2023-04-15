d3.csv('147_15-21_junio.csv', row => {
  console.log(row.hora_ingreso);
  // Usa d3.timeParse para convertir la cadena de hora_ingreso en un objeto de fecha
  const parseTime = d3.timeParse('%H:%M:%S');
  return {
    ...row,
    hora_ingreso: parseTime(row.hora_ingreso),
  };
}, d3.autoType).then(data => {
  // Agrupa los datos por hora
  const groupByHour = d3.group(data, d => d3.timeHour(d.hora_ingreso));
  
  // Cuenta el número de entradas por hora
  const entriesByHour = Array.from(groupByHour, ([key, value]) => {
    return {
      hora_ingreso: key,
      entries: value.length,
    };
  });

  // Ordena los datos por hora_ingreso
  entriesByHour.sort((a, b) => a.hora_ingreso - b.hora_ingreso);

  // Formato de fecha para el eje x
  const xAxisFormat = d3.timeFormat('%H:%M');

  let chart = Plot.plot({
    marks: [
      Plot.line(entriesByHour, {
        x: d => d.hora_ingreso,
        y: 'entries',
      }),
    ],
    x: {
      tickFormat: xAxisFormat,
      domain: d3.extent(entriesByHour, d => d.hora_ingreso),
    },
    y: { zero: true },
    line: true,
  })
  d3.select('#chart').append(() => chart)
})
