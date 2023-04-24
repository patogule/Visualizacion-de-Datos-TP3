
d3.dsv(';', '../data/147_15-21_junio.csv', d3.autoType).then(data => {
    // Filtrar los datos para incluir solo las categorías "A" y "B"
    const filteredPalermo = data.filter (d => d.domicilio_barrio === "PALERMO")
    const filteredData = filteredPalermo.filter(d => d.categoria === "TRÁNSITO" || d.categoria === "LIMPIEZA Y RECOLECCIÓN");
  
  
  
    // Contar las denuncias por hora
    const counts = Array.from({length: 24}, () => 0);
    const countsCerrado = Array.from({length: 24}, () => 0);
  
    filteredData.forEach(d => {
      const hour = Number(d.hora_ingreso.slice(0, 2));
      if (!isNaN(hour)) {
        counts[hour]++;
      }
      if(d.estado_del_contacto === "Cerrado"){
        countsCerrado[hour]++;
      }
    });
  
    console.log(counts); // Conteo de denuncias por hora
    console.log(countsCerrado); // Conteo de denuncias cerradas por hora
  
    // Graficar los datos
    let chart = Plot.plot({
      width:700,
      color: {
        domain: ["Casos cerrados"],
        range: ["#236EC8"],
        legend: true
      },
      marks: [
        Plot.line(counts.map((count, hour) => ({x: hour, y: count})), {
          x: d => d.x,
          y: d => d.y,
          stroke: 'grey',
        }),
       
    
        Plot.line(countsCerrado.map((count, hour) => ({x: hour, y: count})), {
          x: d => d.x,
          y: d => d.y,
          stroke: 'grey',
        }),
        Plot.areaY(countsCerrado.map((count, hour) => ({x: hour, y: count})), {
          x: d => d.x,
          y2: d => d.y,
          color:{
            legend:true,
          },
          fill: '#236EC8', 
          fillOpacity: 0.5
        }),
      ],
      
      x: {
        ticks: 16,
        line: true,
        grid: true,
        label: 'Hora'
      },
      y: {
        label: "Cantidad de denuncias",
        ticks: 5,
        line: true,
        grid: true,
      },
      
  
    });
  
    d3.select('#chartlinea').append(() => chart);
  });
  