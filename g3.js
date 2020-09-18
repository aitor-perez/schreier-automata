var g3 = {};

g3.ox = function () { return g3.padding + g3.w/2; };
g3.oy = function () { return g3.padding + g3.h/2; };

g3.clamp = function (min, max, x) {
  return Math.min(Math.max(min, x), max);
}

g3.path = function (x1, y1, x2, y2, angle) {
  if (g3.bend) {
    var mx = (x1 + x2)/2;
    var my = (y1 + y2)/2;

    var vx = (x2 - x1);
    var vy = (y2 - y1);
    var r = Math.sqrt(Math.pow(vx, 2), Math.pow(vy, 2));

    // Control point
    var cx = mx - vy * Math.tan(angle) / 2;
    var cy = my + vx * Math.tan(angle) / 2;

    // Arrow head
    var wx = cx - x2;
    var wy = cy - y2;

    var ax = x2 + 0.2 * (wx - wy/2);
    var ay = y2 + 0.2 * (wy + wx/2);

    var bx = x2 + 0.2 * (wx + wy/2);
    var by = y2 + 0.2 * (wy - wx/2);

    return "M " + x1 + " " + y1 + " Q " + cx + " " + cy + " " + x2 + " " + y2;
  } else {
    return "M " + x1 + " " + y1 + " " + x2 + " " + y2;
  }
}

// g3.read: Creates the nodes and links attributes in g3, which hold all the data
g3.read = function (graph) {
  var vertices = graph.vertices;
  var edges = graph.edges;

  var n = vertices.length;
  g3.n = n;

  g3.nodeRadius = 4 * Math.exp(-n/500);
  g3.nodeStrokeWidth = 1;//g3.nodeRadius/3;

  g3.linkDistance = 10 * Math.exp(-n/20);
  g3.chargeStrength = -3000 * Math.exp(-n/50);

  g3.genColors = {};
  g3.nodes = [];
  g3.links = [];

  var c = 0;
  var adjacencyMatrix = [];
  for (var i = 0; i < n; ++i) {
    var x = Math.random() * g3.w;
    var y = Math.random() * g3.h;

    g3.nodes.push({
      "label": vertices[i],
      "x": x,
      "y": y
    });

    var adjacences = new Array(n).fill(0);

    for (e in edges) {
      if (! g3.genColors.hasOwnProperty(edges[e].gen)) {
        g3.genColors[edges[e].gen] = g3.colors[c];
        c += 1;
      }

      if (edges[e].from == vertices[i] && edges[e].from != edges[e].to) {
        var source = vertices[i];
        var target = edges[e].to;

        adjacences[vertices.indexOf(target)] += 1;

        g3.links.push({
          "source": source,
          "target": target,
          "color": g3.genColors[edges[e].gen],
          "priority": adjacences[vertices.indexOf(target)]
        });
      }
    }

    adjacencyMatrix.push(adjacences.slice());
  }

  g3.nGen = Object.keys(g3.genColors).length;

  function computeAngle(from, to, priority) {
    var nEdges = adjacencyMatrix[vertices.indexOf(from)][vertices.indexOf(to)];

    return (Math.PI/6) * priority / (nEdges + 1);
  }
}

// g3.init: Creates the link, label and node attributes in g3, which are the actual svg objects on screen
g3.init = function () {
  $("svg").remove();

  g3.w = g3.init_w;
  g3.h = g3.init_h;
  g3.svg = d3.select("#placeholder").append("svg:svg").attr("width", 2*g3.padding + g3.w).attr("height", 2*g3.padding + g3.h);
  
  if (g3.arrows) {
    // Create color markers for the arrow heads
    var markers = [];
    for (g in g3.genColors) {
      markers.push({"id": g3.genColors[g] + "Arrow", "color": g3.genColors[g]});
    }

    g3.marker = g3.svg.append("defs").selectAll().data(markers).enter().append("marker");
    g3.marker.attr("id", function(d) { return d.id; })
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 20)
      .attr("refY", 0)
      .attr("markerWidth", 5)
      .attr("markerHeight", 5)
      .attr("orient", "auto")
      .style("fill", function(d) { return d.color+"CC"; });
    g3.marker.append("path")
          .attr("d", "M0,-5L10,0L0,5")
          .attr("class","arrowHead");
  }

  // Draw links
  g3.link = g3.svg.selectAll(".link").data(g3.links).enter().append("path");
  g3.link.attr("class", "link").style("stroke", function(d) { return d.color+"CC"; }).style("fill", "none");

  // Draw labels
  g3.label = g3.svg.selectAll(".label").data(g3.nodes).enter().append("text");
  g3.label.attr("class", "label")
        .attr("x", function (d) { return d.x; })
        .attr("y", function (d) { return d.y; })
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .style("fill", "#555")
        .style("font-family", "Arial")
        .style("font-size", 12)
        .text(function(d) {
          return d.label;
        });

  // Draw nodes
  g3.node = g3.svg.selectAll(".node").data(g3.nodes).enter().append("circle");
  g3.node.attr("class", "node")
      .attr("cx", function (d) { return d.x; })
      .attr("cy", function (d) { return d.y; })
      .attr("r", g3.nodeRadius)
      .style("fill", "#555")
      .style("stroke", "#FFF")
      .style("stroke-width", g3.nodeStrokeWidth);
}

g3.onTick = function () {
  var min_dist_to_border_x = g3.w;
  var min_dist_to_border_y = g3.h;
  
  var tol = g3.padding/10;

  // Check if we have nodes on the borders
  g3.node.attr("cx", function(d) {
    min_dist_to_border_x = Math.min(min_dist_to_border_x, d.x - g3.padding, g3.padding + g3.w - d.x);
    
    return d.x;
  }).attr("cy", function(d) {
    min_dist_to_border_y = Math.min(min_dist_to_border_y, d.y - g3.padding, g3.padding + g3.h - d.y);
    
    return d.y;
  });

  if (min_dist_to_border_x < tol) {
    g3.w += 2*tol;
  }

  if (min_dist_to_border_x > 5*tol) {
    g3.w -= 2*tol;
  }
  g3.svg.attr("width", 2*g3.padding + g3.w);
  g3.simulation.force("center").x(g3.ox());

  if (min_dist_to_border_y < tol) {
    g3.h += 2*tol;
  }

  if (min_dist_to_border_y > 5*tol) {
    g3.h -= 2*tol;
  }
  g3.svg.attr("height", 2*g3.padding + g3.h);
  g3.simulation.force("center").y(g3.oy());

  g3.link.attr("d", function(d) {
    var angle = 0; //computeAngle(d.source.label, d.target.label, d.priority);
    return g3.path(d.source.x, d.source.y, d.target.x, d.target.y, angle);
  }).attr("marker-end", function(d) { return "url(#" + d.color + "Arrow" + ")"; });

  g3.label.attr("x", function(d) {
    var vx = d.x - g3.ox();
    var vy = d.y - g3.oy();
    var r = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
    return d.x + 20*vx/r;
  })
  .attr("y", function(d) {
    var vx = d.x - g3.ox();
    var vy = d.y - g3.oy();
    var r = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
    return d.y + 20*vy/r;
  });
}

// g3.start: Starts the simulation. Creates the simulation attribute in g3.
g3.start = function () {
  g3.simulation = d3.forceSimulation(g3.nodes)
                     .force("link", d3.forceLink().id(function(d) { return d.label; }))
                     .force("charge", d3.forceManyBody())
                     .force("center", d3.forceCenter(g3.ox(), g3.oy()));

  g3.simulation.alphaTarget(0);
  
  g3.simulation.force("charge").strength(g3.chargeStrength);
  g3.simulation.force("link").links(g3.links).distance(g3.linkDistance).strength(function(d) {
    var n = 0;
    for (i in g3.links) {
      var l = g3.links[i];
      if (d.source.label == l.source.label && d.target.label == l.target.label ||
          d.source.label == l.target.label && d.target.label == l.source.label) {
        n++;
      }
    }

    // Setting force proportional to the number of edges joining both nodes
    return g3.linkForce/n;
  });
  

  g3.simulation.on("tick", g3.onTick);

  // Prevents initial stretching of the svg due to the random initial configuration 
  g3.simulation.tick(10);

  // Allow vertex dragging
  g3.node.call(d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended));

  function dragstarted(d) {
    if (!d3.event.active) g3.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) g3.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}

g3.draw = function (graph, colors) {
  // Configuration
  if (colors) {
    g3.colors = colors;
  } else {
    g3.colors = ['#CC0000', '#0000CC', '#00CC00', '#00CCCC', '#CCCC00', '#CC00CC', '#333333'];
  }
  
  g3.arrows = true;
  g3.bend = false;

  g3.init_w = 480;
  g3.init_h = 300;
  g3.w = g3.init_w;
  g3.h = g3.init_h;

  g3.padding = 30;

  g3.linkForce = 2;

  // Read graph
  g3.read(graph);

  // Draw objects before simulation
  g3.init();

  // Start the simulation
  g3.start();
}