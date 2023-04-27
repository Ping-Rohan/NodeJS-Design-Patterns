// how require function works under the hood

function require(moduleName) {
  console.log(`Require invoked for module: ${moduleName}`);
  const id = require.resolve(moduleName); // (1)
  if (require.cache[id]) {
    return require.cache[id].exports;
  }
  // module metadata
  const module = {
    exports: {},
    id,
  };
  // Update the cache
  require.cache[id] = module;
  // load the module
  loadModule(id, module, require);
  // return exported variables
  return module.exports;
}
require.cache = {};
require.resolve = (moduleName) => {
  /* resolve a full module id from the moduleName */
};

/*
1. A module name is accepted as input, and the very first thing that we do
is resolve the full path of the module, which we call id. This task is delegated
to require.resolve(), which implements a specific resolving algorithm

2. If the module has already been loaded in the past, it should be available
in the cache. If this is the case, we just return it immediately.

3. If the module has never been loaded before, we set up the environment
for the first load. In particular, we create a module object that contains
an exports property initialized with an empty object literal. This object
will be populated by the code of the module to export its public API.

4. After the first load, the module object is cached.

5. The module source code is read from its file and the code is evaluated, as
we saw before. We provide the module with the module object that we just
created, and a reference to the require() function. The module exports its
public API by manipulating or replacing the module.exports object.

6. Finally, the content of module.exports, which represents the public API
of the module, is returned to the caller.

*/
