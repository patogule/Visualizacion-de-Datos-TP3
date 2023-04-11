// config. números español
const locale = {
  decimal: ',',
  thousands: '.',
  grouping: [3],
}
d3.formatDefaultLocale(locale)

//let xScale = d3.scaleOrdinal()
//  .domain(['ALUMBRADO','ARBOLADO Y ESPACIOS VERDES', 'BARRIOS EMERGENTES', 'CALLES Y VEREDAS','CONTROL EDILICIO, OBRAS Y CATASTRO','DESARROLLO URBANO','ALIZACIÓN ACTIVIDADES COMERCIALES','LIMPIEZA Y RECOLECCIÓN','MEDIOS DE TRANSPORTE','ORDENAMIENTO DEL ESPACIO PÚBLICO','PLUVIALES','RECICLADO Y PROTECCIÓN AMBIENTAL','SALUD Y SERVICIOS SOCIALES','SEGURIDAD','TERRENO BALDÍO','TRÁMITES Y SERVICIOS','TRÁNSITO'])
//  .range(['Alumbrado','Espacios Verdes', 'Barrios Emergentes', 'Calles','CONTROL EDILICIO, OBRAS Y CATASTRO','DESARROLLO URBANO','ALIZACIÓN ACTIVIDADES COMERCIALES','LIMPIEZA Y RECOLECCIÓN','MEDIOS DE TRANSPORTE','ORDENAMIENTO DEL ESPACIO PÚBLICO','PLUVIALES','RECICLADO Y PROTECCIÓN AMBIENTAL','SALUD Y SERVICIOS SOCIALES','SEGURIDAD','TERRENO BALDÍO','TRÁMITES Y SERVICIOS','TRÁNSITO']);


d3.dsv(';', '147_15-21_junio.csv', d3.autoType).then(data => {
  console.log(data.length)
  let chart = Plot.plot({
    height:500,
    width:1300,
    marks: [
      Plot.barY(data, {
        x: 'categoria',
        y: () => 1,
        fill: 'estado_del_contacto',
        sort: 'estado_del_contacto',
        //sort: { x: 'y', reverse: true },
      }),
    ],
    marginLeft: 50,
    x: {
      grid: true,
      //axis: Plot.Axis.Bottom(xScale),
   
    },
    y: {
      label: '',
    },
    color: {
      //domain: ['abierto', 'cerrado'],
      range:['green','dark green'],
      legend:true,
    }
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})
