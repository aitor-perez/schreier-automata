var schreier = {};

schreier.axiom = function(group) {
  edges = []

  for (s in group) {
    edges.push({from: '', to: '', gen: s});
  }

  return {
    vertices: [''],
    edges: edges
  };
};

schreier.next = function(Gamma, group) {
  var n = 0;
  for (s in group) {
    n = Object.keys(group[s].proj).length;
    break;
  }

  var X = [];
  for (var j = 0; j < n; j++) {
    X.push(j);
  }

  nextGamma = {vertices: [], edges: []};

  for (v in Gamma.vertices) {
    for (x in X) {
      nextGamma.vertices.push(x + Gamma.vertices[v]);
    }
  }

  for (e in Gamma.edges) {
    rho = Gamma.edges[e].from;
    sigma = Gamma.edges[e].to;

    t = Gamma.edges[e].gen;

    for (var s in group) {
      for (var x in X) {
        if (group[s].proj[x] == t) {
          nextGamma.edges.push({
            from: x + rho,
            to: group[s].perm[x] + sigma,
            gen: s
          });
        }
      }
    }
  }

  return nextGamma;
};

schreier.filter = function(Gamma, gens) {
  var filteredGamma = {'vertices': Gamma.vertices, 'edges': []};

  for (e in Gamma.edges) {
    if (gens.includes(Gamma.edges[e].gen) && Gamma.edges[e].from != Gamma.edges[e].to) {
      filteredGamma.edges.push(Gamma.edges[e]);
    }
  }

  return filteredGamma;
}

