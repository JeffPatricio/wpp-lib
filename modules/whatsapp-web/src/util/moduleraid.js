/* moduleRaid v5
 * https://github.com/@pedroslopez/moduleRaid
 *
 * Copyright pixeldesu, pedroslopez and other contributors
 * Licensed under the MIT License
 * https://github.com/pedroslopez/moduleRaid/blob/master/LICENSE
 */

const moduleRaid = function () {
  moduleRaid.mID = Math.random().toString(36).substring(7);
  moduleRaid.mObj = {};

  var fillModuleArray = function () {
    try {
      window.webpackChunkwhatsapp_web_client.push([
        [moduleRaid.mID],
        {},
        function (e) {
          Object.keys(e.m).forEach(function (mod) {
            moduleRaid.mObj[mod] = e(mod);
          });
        },
      ]);
    } catch (err) {}
  };

  fillModuleArray();

  var get = function get(id) {
    return moduleRaid.mObj[id];
  };

  var findModule = function findModule(query) {
    var results = [];
    var modules = Object.keys(moduleRaid.mObj);

    modules.forEach(function (mKey) {
      var mod = moduleRaid.mObj[mKey];

      if (typeof mod !== 'undefined') {
        if (typeof query === 'string') {
          if (typeof mod.default === 'object') {
            for (let key in mod.default) {
              if (key == query) results.push(mod);
            }
          }

          for (let key in mod) {
            if (key == query) results.push(mod);
          }
        } else if (typeof query === 'function') {
          if (query(mod)) {
            results.push(mod);
          }
        } else {
          throw new TypeError(
            'findModule can only find via string and function, ' +
              typeof query +
              ' was passed'
          );
        }
      }
    });

    return results;
  };

  return {
    modules: moduleRaid.mObj,
    constructors: moduleRaid.cArr,
    findModule: findModule,
    get: get,
  };
};

export default moduleRaid;
