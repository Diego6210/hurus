
if (document.getElementById('maptarget') != null) {
  var w = 720,
    h = 480,
    circleWidth = 5;
  var colors = d3.scale.category20();
  var tempnode;
  $.post(ajaxurl + '/proyects/get/map/',{id:$('#maptarget').data('id')}).then(function(res) {
    if (res.error) {
      swal('Error', res.message, 'error');
    } else {
       drawNeurone(res.data);
    }
  }).fail(function() {
    swal('Error', 'Error al conectarse con el servidor', 'error');
  });
}

function drawNeurone(nodes) {
  var links = [];
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].target !== undefined) {
      for (var x = 0; x < nodes[i].target.length; x++)
        links.push({
          source: nodes[i],
          target: nodes[nodes[i].target[x]]
        });
    };
  };

  var myChart = d3.select('#maptarget')
    .append("div")
    .classed("svg-container", true)
    .append('svg')
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 1000 800")
    .classed("svg-content-responsive", true);
  var defs = myChart.append("defs");
  for (var i = 0; i < nodes.length; i++) {
    defs.append('pattern')
      .attr('id', nodes[i].tag)
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('width', 200)
      .attr('height', 100)
      .attr('x', -100)
      .attr('y', 70)
      .append("image")
      .attr("xlink:href", nodes[i].url)
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 200)
      .attr('height', 60);
  }
  var force = d3.layout.force()
    .nodes(nodes)
    .links([])
    .gravity(0.1)
    .charge(-1000)
    .size([w, h]);
  var link = myChart.selectAll('line')
    .data(links).enter().append('line')
    .attr('stroke', "#E5E8E8")
    .attr('strokewidth', '1');
  var node = myChart.selectAll('circle')
    .data(nodes).enter()
    .append('g')
    .call(force.drag);
  node.append('circle')
    .attr('cx', function(d) {
      return d.x;
    })
    .attr('cy', function(d) {
      return d.y;
    })
    .attr('r', 30)
    .attr('fill', function(d) {
      return 'url(#' + d.tag + ')'
    });

  force.on('tick', function(e) {
    node.attr('transform', function(d, i) {
      return 'translate(' + d.x + ',' + d.y + ')'
    })
    link
      .attr('x1', function(d) {
        return d.source.x;
      })
      .attr('y1', function(d) {
        return d.source.y;
      })
      .attr('x2', function(d) {
        return d.target.x;
      })
      .attr('y2', function(d) {
        return d.target.y;
      })
  });

  node.append('text')
    .text(function(d) {
      return d.name;
    })
    .attr('font-family', 'Raleway', 'Helvetica Neue, Helvetica')
    .attr('fill', function(d, i) {
      if (true) {
        return "#ffffff";
      }
    })
    .attr('text-anchor', function(d, i) {
      return 'middle';
    })
    .attr('font-size', function(d, i) {
      return '1em';
    })
    .attr('y', 45);


  force.start();
}



// node.append('rect')
//   .attr('style','fill:red;font-family:Arial;font-size:20px;')
//   .attr('width',65)
//   .attr('height',15)
//   .attr('x', 40)
//   .attr('y', -12);

// node.append('text')
//   .text(function(d) {
//     return '#Hackers';
//   })
//   .attr('font-family', 'Raleway', 'Helvetica Neue, Helvetica')
//   .attr('fill', function(d, i) {
//     if (true) {
//       return "#ffffff";
//     }
//   })
//   .attr('text-anchor', function(d, i) {
//     return 'middle';
//   })
//   .attr('font-size', function(d, i) {
//     return '.80em';
//   })
//   .attr('x', 70);
