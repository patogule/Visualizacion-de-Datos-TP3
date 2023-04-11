// config. números español
const locale = {
  decimal: ',',
  thousands: '.',
  grouping: [3],
}
d3.formatDefaultLocale(locale)



d3.dsv(';', 'sistema-unico-de-atencion-ciudadana-2021.zip', d3.autoType).then(data => {
  console.log(data.length)
  let chart = Plot.plot({
    y: {
      grid: true,
      label: "↑ Unemployment (%)"
    },
    color: {
      domain: [false, true],
      range: ["#ccc", "red"]
    },
    marks: [
      Plot.ruleY([0]),
      Plot.line(data, {
        x: "fecha_ingreso",
        y: () => 1,
        //z: "division",
        //sort: dosort && (d => /, MI /.test(d.division)),
        //stroke: d => /, MI /.test(d.division)
      })
    ]
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})
