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
  
    // Definir una lista con las categorías que no se quieren sumar
    const categoriasExcluidas = ['TRÁNSITO', 'LIMPIEZA Y RECOLECCIÓN', 'CALLES Y VEREDAS', 'ARBOLADO Y ESPACIOS VERDES'];
  
    // Filtrar los datos para excluir las categorías definidas en categoriasExcluidas
    const data_palermo_suma = data_palermo_total.filter(d => !categoriasExcluidas.includes(d.categoria));
    console.log(data_palermo_suma)
  
    //sumar la cantidad de filas del dataset filtrado con otras
    contador = 0;
    for (fila in data_palermo_suma){
          contador += 1
    }
    console.log(contador)
  
    // Crear un nuevo objeto con la categoría 'OTRAS' y la cantidad de denuncias sumadas
    const otrasCategorias = { categoria: 'OTRAS', count: contador };
    console.log(otrasCategorias)
  
    // Agregar el objeto a la lista de categorías
    categorias.push(otrasCategorias.categoria);
    console.log(categorias)
  
    // Filtramos por las categorías que queremos mostrar
    data_palermo_final = data_palermo_total.filter(d => categorias.includes(d.categoria));
    console.log(data_palermo_final)
  
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
          data_palermo_final,
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
          data_palermo_final,
          Plot.groupY(
            { x: 'count', text: 'count' },
            {
              y: 'categoria',
              sort: { y: 'x', reverse: true },
              textAnchor: 'start',
              dx: 5,
            },
          ),
        ),
      
      ],
      marginLeft: 200,
      marginRight: 100,
    })
    // Agregamos chart al div#chart de index.html
    d3.select('#chartbarra').append(() => chart)
  })  
  