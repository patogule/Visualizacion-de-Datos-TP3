d3.dsv(';','147_15-21_junio.csv', d3.autoType).then(data => {
  let chart = Plot.plot({
    marks: [
      Plot.line(data, {
        x: 'domicilio_comuna',
        y: 'categoria',
        //z: 'country',
        //stroke: 'fertility',
      }),
    ],
    x: {
      // https://github.com/observablehq/plot#formats
      //tickFormat: d3.timeFormat('%H:%M'),
    },
    y: { zero: true},
    line: true,
  })
  d3.select('#chart').append(() => chart)
})
