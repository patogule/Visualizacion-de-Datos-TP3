// config. números español
const locale = {
    decimal: ',',
    thousands: '.',
    grouping: [3],
  }
  d3.formatDefaultLocale(locale)
  
  d3.dsv(';', '../data/147_15-21_junio.csv', d3.autoType).then(data => {
    console.log(data)
  
    const data_palermo_total = data.filter(d => d.domicilio_barrio === 'PALERMO');
    console.log(data_palermo_total)
  
    const categorias = ['TRÁNSITO', 'LIMPIEZA Y RECOLECCIÓN', 'CALLES Y VEREDAS', 'ARBOLADO Y ESPACIOS VERDES'];
  
    data_palermo_filtrado = data_palermo_total.filter(d => categorias.includes(d.categoria));
    console.log(data_palermo_filtrado);
  
    // Guardamos el svg generado en la variable chart
    let chart = Plot.plot({
      height: 250,
      width: 780,
      
      x: {
        tickFormat: d3.format(',.0f'),
        label: 'Cantidad de denuncias',
        axis: null,
      },
      y: {
        label: '',
      },
  
      marks: [
        Plot.barX(
          data_palermo_filtrado,
          Plot.groupY(
            { x: 
              'count', 
            },
            {
              y: 'categoria', 
              fill: d => d.categoria === 'LIMPIEZA Y RECOLECCIÓN' ? "#236EC8" : "#38485c",
            },
          ),
              
        ),
   
        Plot.text(
          data_palermo_filtrado,
          Plot.groupY(
            { x: 'count', text: 'count'},
            {
              y: 'categoria',
              sort: { y: 'x', reverse: true },
              textAnchor: 'start',
              dx: 5,
              fill: d => d.categoria === 'LIMPIEZA Y RECOLECCIÓN' ? "#236EC8" : "#38485c",
              fontSize: d => d.y === 'LIMPIEZA Y RECOLECCIÓN' ? "20px" : "14px",
            },
          ),
        )
      
      ],
      marginLeft: 200,
      marginRight: 100,
    });

    // Agregamos chart al div#chart de index.html
    d3.select('#chartbarra').append(() => chart)
  })  
  