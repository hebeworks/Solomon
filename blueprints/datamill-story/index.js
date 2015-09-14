/*jshint node:true*/

var fs = require('fs');
var path = require('path');

module.exports = {
  description: '',

  afterInstall: function (options) {
    var entity = options.entity;

    if (!options.dryRun && !options.project.isEmberCLIAddon() && !options.inRepoAddon) {
      addStoryToSASS(entity.name, {
        root: options.project.root,
        path: options.path
      });
    }
  },

  afterUninstall: function (options) {
    var entity = options.entity;

    if (!options.dryRun && !options.project.isEmberCLIAddon() && !options.inRepoAddon) {
      removeStoryFromSASS(entity.name, {
        root: options.project.root
      });
    }
  }
};

function getImportName(storyName) {
  return '@import "components/stories/' + storyName + '";';
};

function removeStoryFromSASS(name, options) {
  var routerPath = path.join(options.root, 'app', 'styles', 'app.scss');
  var source = fs.readFileSync(routerPath, 'utf-8');
  var importName = getImportName(name);

  if (source.indexOf(importName) > -1) {
    source = source.replace(importName + "\r\n", '');
  }

  fs.writeFileSync(routerPath, source);
};

function addStoryToSASS(name, options) {
  var routerPath = path.join(options.root, 'app', 'styles', 'app.scss');
  var source = fs.readFileSync(routerPath, 'utf-8');
  var importName = getImportName(name);
  if (source.indexOf(importName) === -1) {
    source = source.replace('/* START auto-generated stories */',
      '/* START auto-generated stories */' + "\r\n" + importName);
  }

  fs.writeFileSync(routerPath, source);
};
