module.exports.save = (server, req, res) => {
    var post = req.body;
    post.valor = post.despesa.replace(".", "");
    post.despesa = post.despesa.replace(",", ".");

    var data = [
        post.descricao,
        post.despesa,
        post.vencimento,
        req.session.login.id
    ]

    server.app.models.casa.insert(data, server.config.dbConnection(), (erro, result) => {
        if (erro) {
            console.log(erro)
        } else {
            console.log(result)
        }
    });

    res.render("admin/form_casa", {
        message: "",
    });
}

module.exports.get = (server, req, res) => {

    server.app.models.casa.get(server.config.dbConnection(), (erro, result) => {
        if (erro) {
            console.log(erro)
        } else {
            console.log(result)
            res.render("admin/form_list_casa", {
                message: "",casa: result
            });
        }
    });

}

module.exports.getDespesas = (server, req, res) => {

    var data = req.params.id;
    (data) ? data = req.params.id : data = new Date().getFullYear()
    const year = data

    server.app.models.casa.getDespesasMes(data, server.config.dbConnection(), (erro, result) => {
        if (erro) {
            console.log(erro)
        } else {
            var mensal = []
            var contas = []
            var meses = []
            meses[1] = 'janeiro';
            meses[2] = 'fevereiro';
            meses[3] = 'março';
            meses[4] = 'abril';
            meses[5] = 'maio';
            meses[6] = 'junho';
            meses[7] = 'julho';
            meses[8] = 'agosto';
            meses[9] = 'setembro';
            meses[10] = 'outubro';
            meses[11] = 'novembro';
            meses[12] = 'dezembro';

            var mes = [];
            result.forEach(element => {
                var v = {
                    nome: element.descricao,
                    parcela: element.despesa
                }
                if (mensal[element.vencimento]) {
                    var m = mensal[element.vencimento]
                    mensal[element.vencimento] = (m + element.despesa)
                    contas[element.vencimento].push(element)
                    mes[element.vencimento] = element.vencimento
                } else {
                    mensal[element.vencimento] = element.despesa
                    contas[element.vencimento] = [element]
                    mes[element.vencimento] = element.vencimento
                }
            });

            var dataEl = [];
            mes.forEach(elements => {
                var idel = elements;
                dataEl.push(
                    {
                        mes: meses[elements],
                        valor: mensal[elements],
                        desc: contas[elements],
                        id: idel
                    })
            });
            var numeral = require('numeral')
            var data = {
                dados: dataEl
            }
            res.render('planilhas/casa_planilha', { dados: data.dados, ano: year, numeral: numeral })
        }
    });

}


