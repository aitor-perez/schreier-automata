

adding = {
  'gens': ['a'],
  'auto': {
    'a': {'proj': {'0': '1', '1': 'a'}, 'perm': {'0': '1', '1': '0'}},
    '1': {'proj': {'0': '1', '1': '1'}, 'perm': {'0': '0', '1': '1'}}
  }
};

grigorchuk = {
  'gens': ['a', 'b', 'c', 'd'],
  'auto': {
    'a' : {'proj': {'0': '1', '1': '1'}, 'perm': {'0': '1', '1': '0'}},
    'b' : {'proj': {'0': 'a', '1': 'c'}, 'perm': {'0': '0', '1': '1'}},
    'c' : {'proj': {'0': 'a', '1': 'd'}, 'perm': {'0': '0', '1': '1'}},
    'd' : {'proj': {'0': '1', '1': 'b'}, 'perm': {'0': '0', '1': '1'}},
    '1' : {'proj': {'0': '1', '1': '1'}, 'perm': {'0': '0', '1': '1'}},
  }
};

basilica = {
  'gens': ['a', 'b'],
  'auto': {
    'a': {'proj': {'0': 'b', '1': '1'}, 'perm': {'0': '0', '1': '1'}},
    'b': {'proj': {'0': 'a', '1': '1'}, 'perm': {'0': '1', '1': '0'}},
    '1': {'proj': {'0': '1', '1': '1'}, 'perm': {'0': '0', '1': '1'}}
  }
};

aleshin = {
  'gens': ['a', 'b', 'c'],
  'auto': {
    'a': {'proj': {'0': 'a', '1': 'b'}, 'perm': {'0': '1', '1': '0'}},
    'b': {'proj': {'0': 'c', '1': 'c'}, 'perm': {'0': '0', '1': '1'}},
    'c': {'proj': {'0': 'b', '1': 'a'}, 'perm': {'0': '1', '1': '0'}}
  }
};

fg = {
  'gens': ['a', 'b'],
  'auto': {
    'a' : {'proj': {'0': '1', '1': '1', '2': '1'}, 'perm': {'0': '1', '1': '2', '2': '0'}},
    'b' : {'proj': {'0': 'a', '1': '1', '2': 'b'}, 'perm': {'0': '0', '1': '1', '2': '2'}},
    '1' : {'proj': {'0': '1', '1': '1', '2': '1'}, 'perm': {'0': '0', '1': '1', '2': '2'}}
  }
};

guptasidki = {
  'gens': ['a', 'b'],
  'auto': {
    'a' : {'proj': {'0': '1', '1': '1', '2': '1'}, 'perm': {'0': '1', '1': '2', '2': '0'}},
    'a2' : {'proj': {'0': '1', '1': '1', '2': '1'}, 'perm': {'0': '2', '1': '0', '2': '1'}},
    'b' : {'proj': {'0': 'a', '1': 'a2', '2': 'b'}, 'perm': {'0': '0', '1': '1', '2': '2'}},
    '1' : {'proj': {'0': '1', '1': '1', '2': '1'}, 'perm': {'0': '0', '1': '1', '2': '2'}}
  }
};

cerny3 = {
  'gens': ['a', 'b', 'c'],
  'auto': {
    'a': {'proj': {'0': 'c', '1': 'c'}, 'perm': {'0': '1', '1': '0'}},
    'b': {'proj': {'0': 'a', '1': 'b'}, 'perm': {'0': '0', '1': '1'}},
    'c': {'proj': {'0': 'b', '1': 'c'}, 'perm': {'0': '0', '1': '1'}}
  }
};

var colors = ['#B22222', '#1E90FF', '#32CD32', '#FF8C00', '#FF1493', '#4B0082', '#FFFF00'];

var maxStates = 6;
var maxAlphSize = 6;

function adaptTables() {
  var q = $("#number-states option:checked").val();
  var s = $("#size-alphabet option:checked").val();

  for (i = 1; i <= maxStates; i++) {
    if (i <= q) {
      $(".q"+i).show();
    } else {
      $(".q"+i).hide();
    }
    
    for (j = 1; j <= maxAlphSize; j++) {
      if (j <= s) {
        $(".s"+j).show();
      } else {
        $(".s"+j).hide();
      }
    }
  }
}


function isValidProj(p, q) {
  var i = letters.indexOf(p);

  return i >= 0 && i < q;
}

function isValidPermImage(x, s) {
  for (var i = 0; i < s; i++) {
    if (x == i) {
      return true;
    }
  }

  return false;
}

function isValidPerm(perm) {
  var a = Object.keys(perm).sort();
  var b = Object.values(perm).sort();

  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

$('#example').change(function() {
  var example = $("#example option:checked").val();

  $('img').collapse('hide');

  if (example == -1) {
    $('.alert').hide();
    $('#custom-automata').collapse('show');
    adaptTables();
  } else {
    console.log('#automaton-' + example);
    $('#custom-automata').collapse('hide');
    $('#automaton-' + example).collapse('show');
  }
});

$('#number-states').change(adaptTables);
$('#size-alphabet').change(adaptTables);

$('img').collapse('hide');

$('.alert').hide();

var groups = [adding, grigorchuk, basilica, aleshin, fg, guptasidki];
var letters = ['a', 'b', 'c', 'd', 'e', 'f'];

$('#visualize').on('click', function() {
  var example = $("#example option:checked").val();

  var group = {};
  var valid = example != 0;

  if (example > 0) {
    group = groups[example - 1];
  }

  if (example == -1) {
    var q = $("#number-states option:checked").val();
    var s = $("#size-alphabet option:checked").val();

    var auto = {};
    for (i = 1; i <= q && valid; i++) {
      var proj = {};
      var perm = {};

      for (j = 0; j < s && valid; j++) {
        var proj_ij = $("#proj" + i + j).val();
        var perm_ij = $("#out" + i + j).val();

        if (isValidProj(proj_ij, q)) {
          proj[j] = proj_ij;
        } else {
          valid = false;
        }
        
        if (isValidPermImage(perm_ij, s)) {
          perm[j] = perm_ij;
        } else {
          valid = false;
        }
      }

      if (isValidPerm(perm)) {
        auto[letters[i-1]] = {'proj': proj, 'perm': perm};  
      } else {
        valid = false;
      }
    }

    if (valid) {
      group['gens'] = Object.keys(auto);
      group['auto'] = auto;
    }
  }

  if (valid) {
    $('.alert').hide();

    var level = $("#level option:checked").val();

    var Gamma = [schreier.axiom(group['auto'])];
    for (var n = 1; n < 8; ++n) {
      Gamma.push(schreier.next(Gamma[n-1], group['auto']));
    }
    var graph = schreier.filter(Gamma[level], group['gens']);

    g3.draw(graph, colors);
  } else {
    $('.alert').show();
  }
});

