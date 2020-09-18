// Self-dual 3x3 automata groups
group01 = {
  'a' : {'proj': {'0': 'a', '1': 'a', '2': 'a'}, 'perm': {'0': '0', '1': '1', '2': '2'}},
  'b' : {'proj': {'0': 'b', '1': 'b', '2': 'b'}, 'perm': {'0': '0', '1': '1', '2': '2'}},
  'c' : {'proj': {'0': 'c', '1': 'c', '2': 'c'}, 'perm': {'0': '0', '1': '1', '2': '2'}}
};

group02 = {
  'a' : {'proj': {'0': 'a', '1': 'a', '2': 'a'}, 'perm': {'0': '0', '1': '1', '2': '2'}},
  'b' : {'proj': {'0': 'b', '1': 'b', '2': 'c'}, 'perm': {'0': '0', '1': '1', '2': '2'}},
  'c' : {'proj': {'0': 'c', '1': 'c', '2': 'b'}, 'perm': {'0': '0', '1': '2', '2': '1'}}
};

group03 = {
  'a' : {'proj': {'0': 'a', '1': 'a', '2': 'a'}, 'perm': {'0': '0', '1': '1', '2': '2'}},
  'b' : {'proj': {'0': 'b', '1': 'c', '2': 'c'}, 'perm': {'0': '0', '1': '2', '2': '1'}},
  'c' : {'proj': {'0': 'c', '1': 'b', '2': 'b'}, 'perm': {'0': '0', '1': '2', '2': '1'}}
};

group04 = {
  'a' : {'proj': {'0': 'a', '1': 'a', '2': 'b'}, 'perm': {'0': '0', '1': '1', '2': '2'}},
  'b' : {'proj': {'0': 'b', '1': 'b', '2': 'a'}, 'perm': {'0': '0', '1': '1', '2': '2'}},
  'c' : {'proj': {'0': 'c', '1': 'c', '2': 'c'}, 'perm': {'0': '1', '1': '0', '2': '2'}}
};

group05 = {
  'a' : {'proj': {'0': 'a', '1': 'a', '2': 'b'}, 'perm': {'0': '0', '1': '1', '2': '2'}},
  'b' : {'proj': {'0': 'b', '1': 'b', '2': 'c'}, 'perm': {'0': '0', '1': '1', '2': '2'}},
  'c' : {'proj': {'0': 'c', '1': 'c', '2': 'a'}, 'perm': {'0': '1', '1': '2', '2': '0'}}
};

group08 = {
  'a' : {'proj': {'0': 'a', '1': 'a', '2': 'c'}, 'perm': {'0': '0', '1': '1', '2': '2'}},
  'b' : {'proj': {'0': 'b', '1': 'c', '2': 'a'}, 'perm': {'0': '0', '1': '2', '2': '1'}},
  'c' : {'proj': {'0': 'c', '1': 'c', '2': 'a'}, 'perm': {'0': '2', '1': '0', '2': '1'}}
};

group10 = {
  'a' : {'proj': {'0': 'a', '1': 'a', '2': 'a'}, 'perm': {'0': '0', '1': '2', '2': '1'}},
  'b' : {'proj': {'0': 'c', '1': 'b', '2': 'c'}, 'perm': {'0': '0', '1': '1', '2': '2'}},
  'c' : {'proj': {'0': 'b', '1': 'c', '2': 'b'}, 'perm': {'0': '0', '1': '2', '2': '1'}}
};

group12 = {
  'a' : {'proj': {'0': 'a', '1': 'a', '2': 'b'}, 'perm': {'0': '0', '1': '2', '2': '1'}},
  'b' : {'proj': {'0': 'c', '1': 'b', '2': 'a'}, 'perm': {'0': '0', '1': '1', '2': '2'}},
  'c' : {'proj': {'0': 'b', '1': 'c', '2': 'c'}, 'perm': {'0': '1', '1': '0', '2': '2'}}
};

group13 = {
  'a' : {'proj': {'0': 'a', '1': 'a', '2': 'b'}, 'perm': {'0': '0', '1': '2', '2': '1'}},
  'b' : {'proj': {'0': 'c', '1': 'b', '2': 'c'}, 'perm': {'0': '0', '1': '1', '2': '2'}},
  'c' : {'proj': {'0': 'b', '1': 'c', '2': 'a'}, 'perm': {'0': '1', '1': '2', '2': '0'}}
};

group17 = {
  'a' : {'proj': {'0': 'a', '1': 'a', '2': 'c'}, 'perm': {'0': '0', '1': '2', '2': '1'}},
  'b' : {'proj': {'0': 'c', '1': 'c', '2': 'a'}, 'perm': {'0': '0', '1': '2', '2': '1'}},
  'c' : {'proj': {'0': 'b', '1': 'b', '2': 'b'}, 'perm': {'0': '2', '1': '0', '2': '1'}}
};

group17subgroup = {
  'x' : {'proj': {'0': 'y', '1': 'y', '2': 'y'}, 'perm': {'0': '0', '1': '1', '2': '2'}},
  'y' : {'proj': {'0': 'x', '1': 'x', '2': 'z'}, 'perm': {'0': '1', '1': '0', '2': '2'}},
  'z' : {'proj': {'0': 'z', '1': 'z', '2': 'x'}, 'perm': {'0': '1', '1': '0', '2': '2'}}
}; // this is just (Z/2Z)^2

group19 = {
  'a' : {'proj': {'0': 'a', '1': 'b', '2': 'b'}, 'perm': {'0': '0', '1': '1', '2': '2'}},
  'b' : {'proj': {'0': 'b', '1': 'a', '2': 'c'}, 'perm': {'0': '1', '1': '0', '2': '2'}},
  'c' : {'proj': {'0': 'c', '1': 'c', '2': 'a'}, 'perm': {'0': '1', '1': '2', '2': '0'}}
};

group23 = {
  'a' : {'proj': {'0': 'a', '1': 'b', '2': 'c'}, 'perm': {'0': '0', '1': '1', '2': '2'}},
  'b' : {'proj': {'0': 'b', '1': 'c', '2': 'a'}, 'perm': {'0': '1', '1': '2', '2': '0'}},
  'c' : {'proj': {'0': 'c', '1': 'a', '2': 'b'}, 'perm': {'0': '2', '1': '0', '2': '1'}}
};

group24 = {
  'a' : {'proj': {'0': 'a', '1': 'b', '2': 'b'}, 'perm': {'0': '0', '1': '2', '2': '1'}},
  'b' : {'proj': {'0': 'c', '1': 'a', '2': 'c'}, 'perm': {'0': '1', '1': '0', '2': '2'}},
  'c' : {'proj': {'0': 'b', '1': 'c', '2': 'a'}, 'perm': {'0': '1', '1': '2', '2': '0'}}
};

group24subgroup = {
  'x' : {'proj': {'0': '1', '1': 'y', '2': '1'}, 'perm': {'0': '2', '1': '1', '2': '0'}},
  'y' : {'proj': {'0': 'y', '1': '1', '2': '1'}, 'perm': {'0': '0', '1': '2', '2': '1'}},
  'z' : {'proj': {'0': 'y', '1': '1', '2': 'y'}, 'perm': {'0': '2', '1': '0', '2': '1'}},
  '1' : {'proj': {'0': '1', '1': '1', '2': '1'}, 'perm': {'0': '0', '1': '1', '2': '2'}}
}; // this is just S3
