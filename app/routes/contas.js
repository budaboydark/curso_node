const { exit } = require("shelljs");

module.exports = function (app) {
  app.get("/contas-anual", async function (req, res) {
    var contasModel = app.app.models.contas;
    var connection = app.config.dbConnection();
    await contasModel.getContaTotalAno(connection, (erro, response) => {
      res.send({ totais: response });
    });
  });

  app.post("/contas_pagar/atualizar/:id", function (req, res) {
    var contasModel = app.app.models.contas;
    var connection = app.config.dbConnection();
    var post = req.body;
    post.id = req.params.id;
    post.status = "S";
    post.valorpago = post.valorpago.replace(".", "");
    post.valorpago = post.valorpago.replace(",", ".");

    contasModel.updateContaPagar(post, connection, function (erro, result) {
      if (erro) {
        console.log(erro);
        res.render("admin/form_update_conta_pagar", {
          message: "Erro ao inserir dados",
          id: post.id,
        });
      } else {
        contasModel.getContasPagar(post.id, connection, function (
          erro,
          result
        ) {
          res.redirect("/contas/" + result[0].idcontas + "/pagar");
        });
      }
    });
  });

  app.post("/contas_pagar/atualizar/v/:id", function (req, res) {
    var contasModel = app.app.models.contas;
    var connection = app.config.dbConnection();
    var post = req.body;
    post.id = req.params.id;
    post.status = "N";

    if (post.valor) {
      post.valor = post.valor.replace(".", "");
      post.valor = post.valor.replace(",", ".");
    }

    contasModel.updateContaVencimento(post, connection, function (
      erro,
      result
    ) {
      if (erro) {
        console.log(erro);
        res.render("admin/form_update_vencimento_conta_pagar", {
          message: "Erro ao inserir dados",
          id: post.id,
        });
      } else {
        contasModel.getContasPagar(post.id, connection, function (
          erro,
          result
        ) {
          res.redirect("/contas/" + result[0].idcontas + "/pagar");
        });
      }
    });
  });

  app.post("/contas/gravar", function (req, res) {
    var contasModel = app.app.models.contas;
    var connection = app.config.dbConnection();
    var post = req.body;
    post.valor = post.valor.replace(".", "");
    post.valor = post.valor.replace(",", ".");

    post.usuario = req.session.login.id
    contasModel.insertConta(post, connection, function (erro, result) {
      if (req.body.tipo == "pagar") {
        var id = result.insertId;
        var parc = req.body.qtd_parcelas;
        dados = {
          nome: post.conta,
          valorparcela: post.valor,
          status: "N",
          idcontas: id,
          flag: req.body.flag,
        };
        for (var i = 1; i <= parc; i++) {
          dados.numeroparcela = i;
          contasModel.insertContasPagar(dados, connection, function (
            erro,
            result
          ) { });
        }
      }
      if (erro) {
        console.log(erro);
        res.render("admin/form_add_conta", {
          message: "Erro ao inserir dados",
        });
      } else {
        res.render("admin/form_add_conta", {
          message: "Dados inseridos com sucesso",
        });
      }
    });
  });

  app.get("/contas", function (req, res) {
    var contasModel = app.app.models.contas;
    var connection = app.config.dbConnection();
    contasModel.getContas(connection, function (erro, result) {
      res.render("contas/contas", { contas: result });
    });
  });

  app.get("/contas/:id/:tipo", function (req, res) {
    var params = req.params;
    var contasModel = app.app.models.contas;
    var connection = app.config.dbConnection();
    if (params.tipo == "pagar") {
      var format = require("date-format");
      var numeral = require("numeral");
      contasModel.getContaPagar(params.id, connection, function (erro, result) {
        res.render("contas/contas_pagar", {
          contas: result,
          format: format,
          numeral: numeral,
        });
      });
    } else if (params.tipo == "receber") {
      contasModel.getContaReceber(params.id, connection, function (
        erro,
        result
      ) {
        res.render("contas/contas_receber", { contas: result });
      });
    }
  });

  app.get("/payment-all-month/:m/:y", function (req, res) {
    var params = req.params;
    var contasModel = app.app.models.contas;
    var connection = app.config.dbConnection();

    contasModel.updateContasPagarPaymentAllMonth(params, connection, function (
      erro,
      result
    ) {
      if (erro) {
        console.log(erro);
        res.status(500).send(erro);
      } else {
        res.status(200).send("atualizado");
      }
    });
    return;
  });

  app.get("/payment-all-month-revert/:m/:y", function (req, res) {
    var params = req.params;
    var contasModel = app.app.models.contas;
    var connection = app.config.dbConnection();

    contasModel.updateContasPagarPaymentAllMonthRevert(
      params,
      connection,
      function (erro, result) {
        if (erro) {
          console.log(erro);
          res.status(500).send(erro);
        } else {
          res.status(200).send("atualizado");
        }
      }
    );
    return;
  });

  app.get("/monthly_statistics", function (req, res) {

    var params = req.query;
    var contasUtilsModel = app.app.models.contasUtil;
    var connection = app.config.dbConnection();

    var data = new Date();
    var mes = (data.getUTCMonth() + 2);
    var ano = data.getFullYear();

    if (params.mes) {
      mes = params.mes
    }

    if (params.ano) {
      ano = params.ano
    }

    contasUtilsModel.getTotalMes(mes, ano, connection, function (erro, result) {
      if (erro) {
        res.send(erro);
      } else {
        let dados = {
          total: result[0].total,
          saldo: result[0].saldo,
          ssaldo: result[0].ssaldo,
          mes: result[0].mes,
          salario: result[0].salario
        }
        res.send(dados);
      }
    });

  });

  app.route("/banco")
  .get( function (req, res) {
    var bancoModel = app.app.models.banco;
    var connection = app.config.dbConnection();
    bancoModel.getLimiteLast(connection, function (erro, result) {
      res.render("contas/banco_index", { limite: result });
    });
  })
  .post( function (req, res) {
    var post = req.body;
    post.total = post.total.replace(".", "");
    post.total = post.total.replace(",", ".");

    post.utilizado = post.utilizado.replace(".", "");
    post.utilizado = post.utilizado.replace(",", ".");

    var bancoModel = app.app.models.banco;
    var connection = app.config.dbConnection();
    // bancoModel.getLimiteLast(connection, function (erro, result) {
    //   res.render("contas/banco_index",{ limite : result});
    // });

    bancoModel.updateBanco(post, connection, function (erro, result) {
      if (erro) {
        console.log(erro);
      } else {
        bancoModel.getLimiteLast(connection, function (erro, result) {
          res.render("contas/banco_index", { limite: result });
        });
      }
    });
  });
  // app.get("/banco", function (req, res) {
  //   var bancoModel = app.app.models.banco;
  //   var connection = app.config.dbConnection();
  //   bancoModel.getLimiteLast(connection, function (erro, result) {
  //     res.render("contas/banco_index", { limite: result });
  //   });
  // });

  // app.post("/banco", function (req, res) {
  //   var post = req.body;
  //   post.total = post.total.replace(".", "");
  //   post.total = post.total.replace(",", ".");

  //   post.utilizado = post.utilizado.replace(".", "");
  //   post.utilizado = post.utilizado.replace(",", ".");

  //   var bancoModel = app.app.models.banco;
  //   var connection = app.config.dbConnection();
  //   // bancoModel.getLimiteLast(connection, function (erro, result) {
  //   //   res.render("contas/banco_index",{ limite : result});
  //   // });

  //   bancoModel.updateBanco(post, connection, function (erro, result) {
  //     if (erro) {
  //       console.log(erro);
  //     } else {
  //       bancoModel.getLimiteLast(connection, function (erro, result) {
  //         res.render("contas/banco_index", { limite: result });
  //       });
  //     }
  //   });
  // });


  app.get("/salario", function (req, res) {
    var salarioModel = app.app.models.salario;
    var connection = app.config.dbConnection();
    salarioModel.get(connection, function (erro, result) {
      res.render("contas/salario_index", { salario: result });
    });
  });

  app.get("/form/salario", function (req, res) {
    res.render("admin/form_add_salario");
  });

  app.post("/salario", function (req, res) {
    var post = req.body;
    post.valor = post.valor.replace(".", "");
    post.valor = post.valor.replace(",", ".");
    post.user_id = req.session.login.id;

    var salarioModel = app.app.models.salario;
    var connection = app.config.dbConnection();
    salarioModel.insert(post,connection,function(erro, result){
      res.redirect("salario");
    });    
  });

  app.get("/reorganiza/:id",function (req,res) {
    var params = req.params
    var contasModel = app.app.models.contas;
    var connection = app.config.dbConnection();
    
    var mesT = 12;
    var yearT = 12;
    var dates = '';
    var year = '';
    var day = '';
    var month = '';
    var dataFormat = '';

    contasModel.getContasReorganiza(params.id,connection, function (erro, result) {
      /*
      result.forEach(function (data){
        if (data.vencimento){
          dates = data.vencimento.split('-');
          year = dates[0];
          day = dates[2];
          month = dates[1];
          console.log(year,day,month)        
          console.log(data.id,data.vencimento)
        }else{
          if(month == 12){
            month = 1
            year++
          }else{
            month++
          }

          if(month > 0 && month < 10){
            dataFormat = ''+year+'-0'+month+'-'+day+''  
          }else{
            dataFormat = ''+year+'-'+month+'-'+day+''
          }
          console.log(data.id,dataFormat)
          contasModel.putContasReorganiza(data.id,dataFormat,connection,function (erro, result){
            console.log(result)
          })
          
        }
        exit
      });
      */
      
      res.send(result);
    });
    // res.send('teste')
  });

};
