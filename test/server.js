#!/usr/bin/env node
 
// Generated by CoffeeScript 1.6.3
(function() {
  var Router, argv, base_context, clean_up, e, e2, fs, http, router, scgi_child, server, site_router, spawn, _extend;

  process.chdir(__dirname);

  fs = require('fs');

  spawn = require('child_process').spawn;

  try {
    Router = require('../src/router');
  } catch (_error) {
    e = _error;
    try {
      Router = require('../lib/router');
    } catch (_error) {
      e2 = _error;
      console.log('node-simple-router must be installed for this to work');
      process.exit(-1);
    }
  }

  http = require('http');

  router = Router({
    list_dir: true
  });

  _extend = function(base, extender) {
    var key, new_obj, val;
    new_obj = {};
    for (key in base) {
      val = base[key];
      new_obj[key] = val;
    }
    for (key in extender) {
      val = extender[key];
      new_obj[key] = val;
    }
    return new_obj;
  };

  base_context = {
    home_active: '',
    getting_started_active: '',
    documentation_active: '',
    changelog_active: '',
    license_active: '',
    about_active: ''
  };

  site_router = function(context, response) {
    return fs.readFile("" + __dirname + "/templates/layout.html", {
      encoding: "utf8"
    }, function(err, layout_data) {
      return response.end(router.compile_template(layout_data, context));
    });
  };

  router.get("/", function(request, response) {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    return fs.readFile("" + __dirname + "/templates/home.html", {
      encoding: "utf8"
    }, function(err, data) {
      var context;
      context = _extend(base_context, {
        contents: data,
        home_active: 'active'
      });
      return site_router(context, response);
    });
  });

  router.get("/getting_started", function(request, response) {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    return fs.readFile("" + __dirname + "/templates/getting_started.html", {
      encoding: "utf8"
    }, function(err, data) {
      var context;
      context = _extend(base_context, {
        contents: data,
        getting_started_active: 'active'
      });
      return site_router(context, response);
    });
  });

  router.get("/documentation", function(request, response) {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    return fs.readFile("" + __dirname + "/templates/documentation.html", {
      encoding: "utf8"
    }, function(err, data) {
      var context;
      context = _extend(base_context, {
        contents: data,
        documentation_active: 'active'
      });
      return site_router(context, response);
    });
  });

  router.get("/changelog", function(request, response) {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    return fs.readFile("" + __dirname + "/templates/changelog.html", {
      encoding: "utf8"
    }, function(err, data) {
      var context;
      context = _extend(base_context, {
        contents: data,
        changelog_active: 'active'
      });
      return site_router(context, response);
    });
  });

  router.get("/license", function(request, response) {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    return fs.readFile("" + __dirname + "/templates/license.html", {
      encoding: "utf8"
    }, function(err, data) {
      var context;
      context = _extend(base_context, {
        contents: data,
        license_active: 'active'
      });
      return site_router(context, response);
    });
  });

  router.get("/about", function(request, response) {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    return fs.readFile("" + __dirname + "/templates/about.html", {
      encoding: "utf8"
    }, function(err, data) {
      var context;
      context = _extend(base_context, {
        contents: router.compile_template(data, {
          current_version: router.version
        }),
        about_active: 'active'
      });
      return site_router(context, response);
    });
  });

  router.get("/hello_world", function(request, response) {
    var context, data;
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    data = "<div style=\"margin-left: 2em;\">\n    <p style=\"color: rgb(" + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + ");\" title=\"English\">Hello, World!</p>\n    <p style=\"color: rgb(" + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + ");\" title=\"Spanish\">Hola, Mundo!</p>\n    <p style=\"color: rgb(" + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + ");\" title=\"Italian\">Ciao, Mondo!</p>\n    <p style=\"color: rgb(" + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + ");\" title=\"French\">Bonjour, tout le Monde!</p>\n    <p style=\"color: rgb(" + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + ");\" title=\"Portuguese\">Ol&aacute;, Mundo!</p>\n    <p style=\"color: rgb(" + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + ");\" title=\"German\">Hallo, Welt!</p>\n    <p style=\"color: rgb(" + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + ");\" title=\"Catalan\">Hola, M&oacute;n!</p>\n</div>\n<hr/>\n<p><strong>Current Time:</strong>&nbsp;<span id='date-span'>" + (new Date().toLocaleString().replace(/GMT.+/, '')) + "</span></p>\n<script type=\"text/javascript\">\n   setTimeout(function () {try {$('p[title]').tooltip({placement: 'left'});} catch (e) {}}, 0);\n   setInterval(function () {document.getElementById('date-span').innerHTML = new Date().toLocaleString().replace(/GMT.+/, '');}\n   , 1000);\n   setTimeout(function () {location.reload();}, 10000);\n  </script>";
    context = _extend(base_context, {
      contents: data
    });
    return site_router(context, response);
  });

  router.any("/agents/:number", function(request, response) {
    var context, data;
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    data = "<div>\n  <h1>\n    <span>Super Agent No:&nbsp;</span>\n    <span style=\"color: red;\">" + request.params.number + "</span>\n  </h1>\n</div>";
    context = _extend(base_context, {
      contents: data
    });
    return site_router(context, response);
  });

  router.get("/teams", function(request, response) {
    var context, data;
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    data = "<div>\n  <form method=\"post\">\n    <label>Preferred team:&nbsp;&nbsp;&nbsp;</label><input type=\"text\" placeholder=\"River Plate\" name=\"team_name\" required=\"required\" /><br/>\n    <label>Titles won:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label><input type=\"number\" value=\"0\" name=\"titles_won\" required=\"required\" /><br/>\n    <p></p>\n    <input class=\"btn btn-primary\" type=\"submit\" value=\"Send\" /> <input class=\"btn\" type=\"reset\" value=\"Reset\" />\n  </form>\n</div>";
    context = _extend(base_context, {
      contents: data
    });
    return site_router(context, response);
  });

  router.post("/teams", function(request, response) {
    var context, data;
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    data = "<h1>\n  Your team is <span style=\"color: #ff0000;\">{{ team_name }}</span>\n  &nbsp;and has won <span style=\"color: #008f00;\">{{ titles_won }}</span> title{{is_plural}}.\n</h1>\n<hr/>\n<p><a href=\"/teams\">Back to team choice</a></p>";
    context = _extend(base_context, {
      contents: router.compile_template(data, _extend(request.post, {
        is_plural: request.post.titles_won === "1" ? '' : 's'
      }))
    });
    return site_router(context, response);
  });

  router.get("/wimi", function(request, response) {
    return router.proxy_pass("http://sandy98-coffee-hello.herokuapp.com/wimi", response);
  });

  router.get("/cgitest", function(request, response) {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    return fs.readFile("" + __dirname + "/templates/cgitest.html", {
      encoding: "utf8"
    }, function(err, data) {
      var context;
      context = _extend(base_context, {
        contents: data
      });
      return site_router(context, response);
    });
  });

  router.get("/scgitest", function(request, response) {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    return fs.readFile("" + __dirname + "/templates/scgiform.html", {
      encoding: "utf8"
    }, function(err, data) {
      var context;
      context = _extend(base_context, {
        contents: data
      });
      return site_router(context, response);
    });
  });

  router.post("/scgi/:prog_id", function(request, response) {
    if (request.params.prog_id === 'hello_scgi_py') {
      return router.scgi_pass(26000, request, response);
    } else {
      return router._404(request, response, request.url);
    }
  });

  router.get("/uploads_form", function(request, response) {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    return fs.readFile("" + __dirname + "/templates/uploadsform.html", {
      encoding: "utf8"
    }, function(err, data) {
      var context;
      context = _extend(base_context, {
        contents: data
      });
      return site_router(context, response);
    });
  });

  router.post("/handle_upload", function(request, response) {
    var encoding, fullname;
    response.writeHead(200, {
      'Content-type': 'text/html'
    });
    if (request.fileName) {
      response.write("<h2>Uploaded File Data</h2>");
      response.write("File name = " + request.fileName + "<br/>");
      response.write("File length = " + request.fileLen + " bytes<br/>");
      response.write("File type = " + request.fileType + "<br/>");
      fullname = "" + __dirname + "/public/uploads/" + request.fileName;
      if (request.fileType.indexOf('text') >= 0) {
        encoding = 'utf8';
      } else {
        encoding = 'binary';
      }
      return fs.writeFile(fullname, request.fileData, {
        encoding: encoding
      }, function(err) {
        if (err) {
          response.write("<p style='color: red;'>Something went wrong, uploaded file could not be saved.</p>");
        } else {
          response.write('<div style="text-align:center; padding: 1em; border: 1px solid; border-radius: 5px;">');
          if (request.fileType.indexOf('image') >= 0) {
            response.write("<img src='/uploads/" + request.fileName + "' />");
          } else if (request.fileType.indexOf('video') >= 0) {
            response.write("<video src='/uploads/" + request.fileName + "'></video>");
          } else {
            response.write("<pre>" + request.fileData + "</pre>");
          }
          response.write("</div>");
        }
        response.write("<hr/>");
        return response.end("<div style=\"text-align: center;\"><button onclick=\"history.back();\">Back</button></div>");
      });
    } else {
      response.write("<p style='color: red;'>Something went wrong, looks like nothing was uploaded.</p>");
      return response.end("<div style=\"text-align: center;\"><button onclick=\"history.back();\">Back</button></div>");
    }
  });

  argv = process.argv.slice(2);

  server = http.createServer(router);

  try {
    scgi_child = spawn("" + __dirname + "/public/scgi/python/hello_scgi.py", [], {
      cwd: "" + __dirname + "/public/scgi/python"
    });
  } catch (_error) {
    e = _error;
    scgi_child = {
      kill: function(signal) {
        return console.log("'Killing' mock child with signal: " + signal);
      }
    };
    console.log("Couldn't spawn real child process because of: " + e.message + "\nUsing a mock one.");
  }

  server.on('listening', function() {
    var addr;
    addr = server.address() || {
      address: '0.0.0.0',
      port: argv[0] || 8000
    };
    return router.log("Serving web content at " + addr.address + ":" + addr.port + " - PID: " + process.pid + " from directory: " + process.cwd());
  });

  clean_up = function() {
    router.log(' ');
    router.log("Server shutting up...");
    router.log(' ');
    server.close();
    scgi_child.kill('SIGTERM');
    return process.exit(0);
  };

  process.on('SIGINT', clean_up);

  process.on('SIGHUP', clean_up);

  process.on('SIGQUIT', clean_up);

  process.on('SIGTERM', clean_up);

  server.listen((argv[0] != null) && !isNaN(parseInt(argv[0])) ? parseInt(argv[0]) : 8000);

}).call(this);
