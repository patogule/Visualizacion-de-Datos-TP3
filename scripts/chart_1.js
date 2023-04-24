
const mapaFetch = d3.json('../data/barrios-caba.geojson');
const dataFetch = d3.dsv(';', '../data/147_15-21_junio.csv', d3.autoType);

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  /* Agrupamos reclamos x barrio y categoria */
  const reclamosPorBarrioYCateg = d3.rollup(data, 
    v => d3.rollup(v, 
      g => g.length, 
      d => d.categoria
    ), 
    d => d.domicilio_barrio
  );
  console.log(reclamosPorBarrioYCateg)
  /* Obtenemos las categorías únicas del conjunto de datos */
  categoriasUnicas = Array.from(new Set(data.map(d => d.categoria)));
  categoriasUnicas = categoriasUnicas.filter(categoria => categoria === 'LIMPIEZA Y RECOLECCIÓN' || categoria === 'TRÁNSITO' || categoria === 'CALLES Y VEREDAS' || categoria === 'BARRIOS EMERGENTES');
  console.log(categoriasUnicas)    
 
  /* Mapa Coroplético */
  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    color: {
      // Cantidad de denuncias por categoria
      type: 'categorical',
      domain: ['TRÁNSITO', 'LIMPIEZA Y RECOLECCIÓN', 'BARRIOS EMERGENTES', 'CALLES Y VEREDAS'],
      range: [ '#4CBF2E','#236EC8','#C4DEB4','#AECDE1'] ,
      label: 'Categoría con más denuncias',
      legend: true, 
    },
    marks: [
      Plot.geo(barrios, {
        fill: d => {
          let nombreBarrio = d.properties.BARRIO;
          let reclamosPorCategoria = reclamosPorBarrioYCateg.get(nombreBarrio);
          let reclamosPorCategoriaArray = Array.from(reclamosPorCategoria, ([categoria, valor]) => [categoria, valor]);
          let categoriaMaxDenuncias = d3.max(reclamosPorCategoriaArray, d => d[1]);
          let categoriaMaxDenunciasNombre = reclamosPorCategoriaArray.find(d => d[1] === categoriaMaxDenuncias)[0];
          console.log(categoriaMaxDenunciasNombre)
          return categoriaMaxDenunciasNombre;
        },
        stroke: '#ddd',
        title: (d) => `${d.properties.BARRIO}`,
      }),
      Plot.geo(barrios, {
        href: () => '#opening',
        stroke: '#38485c',
        strokeWidth: 2,
        fill: 'transparent',
        title: d => d.properties.BARRIO,
        filter: d => d.properties.BARRIO == 'PALERMO'
      }),
    ],
  });
  /* Agregamos al DOM la visualización chartMap */
  console.log('chartMap', chartMap);

  d3.select('#chartmapa').append(() => chartMap);
});
