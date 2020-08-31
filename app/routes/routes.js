module.exports = (server) => {
  server.get("/teste", (req, res, next) => {
    server.app.controllers.contas.contas(server, req, res);
  });

  server.get("/bkp", (req, res, next) => {
    server.app.controllers.contas.bkp(server, req, res);
  });

  // server.get("/*", (req, res, next) => {
  //   console.log(req.is("json"));
  //   res.send(req.path);
  // });

  server.get("/captcha", (req, res, next) => {
    res.render('home/captcha');
  });
};
