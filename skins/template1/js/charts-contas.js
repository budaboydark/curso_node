$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: "/contas-anual",
  }).done(function (data) {
    var anos = [];
    var valores = [];
    data.totais.forEach((element) => {
      anos.push(element.ano);
      var valor = element.total;
      valores.push(valor);
    });

    var ctx = document.getElementById("myAreaChart");
    var myLineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: anos,
        datasets: [
          {
            label: "Contas",
            lineTension: 0.3,
            backgroundColor: "rgba(78, 115, 223, 0.05)",
            borderColor: "rgba(78, 115, 223, 1)",
            pointRadius: 3,
            pointBackgroundColor: "rgba(78, 115, 223, 1)",
            pointBorderColor: "rgba(78, 115, 223, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: valores,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0,
          },
        },
        scales: {
          xAxes: [
            {
              time: {
                unit: "date",
              },
              gridLines: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                maxTicksLimit: 7,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                maxTicksLimit: 5,
                padding: 10,
                // Include a dollar sign in the ticks
                callback: function (value, index, values) {
                  return "R$" + number_format(value, 2, ",", ".");
                },
              },
              gridLines: {
                color: "rgb(234, 236, 244)",
                zeroLineColor: "rgb(234, 236, 244)",
                drawBorder: false,
                borderDash: [2],
                zeroLineBorderDash: [2],
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          titleMarginBottom: 10,
          titleFontColor: "#6e707e",
          titleFontSize: 14,
          borderColor: "#dddfeb",
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          intersect: false,
          mode: "index",
          caretPadding: 10,
          callbacks: {
            label: function (tooltipItem, chart) {
              var datasetLabel =
                chart.datasets[tooltipItem.datasetIndex].label || "";
              return (
                datasetLabel +
                ": R$" +
                number_format(tooltipItem.yLabel, 2, ",", ".")
              );
            },
          },
        },
      },
    });
  });

  /**
  * Saldo Mes anterior
  */
  const dataAtual = ((new Date()).getMonth() + 1);
  const dataYearNow = ((new Date()).getFullYear());

  $.ajax({
    method: "GET",
    url: "/monthly_statistics",
    data: {
      mes:dataAtual,
      ano: dataYearNow
    }
  }).done(function (data) {
    var saldo = data.saldo.toFixed(2).replace('.',',');
    document.getElementById("rest-value-1").innerText = "R$ "+saldo;
    document.getElementById("saldo-1").innerText = "Saldo Mês " + data.mes;

  });


  /**
   * PIE CHART INIT
   */

  var dataAtual2 = dataAtual
  var dataYearNow2 = dataYearNow

  if(dataAtual == '12'){
    dataAtual2 = '01'
    dataYearNow2 = parseInt(dataYearNow2) + 1
    dataYearNow2 = dataYearNow2.toString()
  }

  $.ajax({
    method: "GET",
    url: "/monthly_statistics",
    data: {
      mes:dataAtual2,
      ano: dataYearNow2
    }
  }).done(function (data) {
    
    // Set new default font family and font color to mimic Bootstrap's default styling
    Chart.defaults.global.defaultFontFamily = "Nunito",'-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = "#858796";
    // Pie Chart Example
    var ctx = document.getElementById("myPieChart");
    document.getElementById("pie-text").innerText = data.mes;
    
    var saldo = data.saldo.toFixed(2).replace('.',',');
    document.getElementById("rest-value-2").innerText = "R$ "+saldo;
    document.getElementById("saldo-2").innerText = "Saldo Mês " + data.mes;

    var myPieChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Salario", "Saldo", "Total a pagar"],
        datasets: [
          {
            data: [data.salario, data.saldo, data.total],
            backgroundColor: ["#4e73df", "#1cc88a", "#FFA07A"],
            hoverBackgroundColor: ["#2e59d9", "#17a673", "#FF7F50"],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: "#dddfeb",
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
        },
        legend: {
          display: false,
        },
        cutoutPercentage: 80,
      },
    });
  });

  /**
   * PIE CHART FINISH
   */
});
