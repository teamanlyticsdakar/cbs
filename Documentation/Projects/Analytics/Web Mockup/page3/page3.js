const url_region = 'https://demo2385154.mockable.io/EpicurveByRegion';

let diseaseName;
let ytext = 'Daily epicurve';

fetch(url_region).then(data => data.json())
  .then(response => {
    diseaseName = response.healthRisk;
    $('#diseaseName').text(diseaseName);
    let regions = response.regions;
    for (let i = 0; i < regions.length; i++) {
      $('#regions').append("<div class='col-md-6 col-lg-4'><div id='" + regions[i].name + "' style='min-width: 310px; height: 400px; margin: 0 auto'></div><button class='btn btn-primary btn-show-districts' data-toggle='collapse' data-target='#" + regions[i].name + "Districts' aria-expanded='false'> Show all related districts</button><div class='collapse row' id='" + regions[i].name + "Districts' style='min-width: 310px; height: 400px; margin: 0 auto'></div></div>");
      const id = regions[i].name;
      const type = 'column';
      const title = regions[i].name;
      const categories = regions[i].categories;
      const data = regions[i].series[0].data;
      buildChart(id, type, title, categories, ytext, data);
    }
  });


const buildChart = (id, type, title, categories, ytext, data) => {
  Highcharts.chart(id, {
    chart: {
      type: type
    },
    title: {
      text: title
    },
    subtitle: {
      text: 'Source: CSB'
    },
    xAxis: {
      categories: categories,
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: ytext
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.1,
        borderWidth: 0
      }
    },

    options: {
      barPercentage: 1.0,
      categoryPercentage: 1.0
    },

    series: [{
      name: 'Number of cases in total',
      data: data

    }]
  });

}

$(document).ready(function () {
  let id, countClick = 0;
  $(document).on("click", ".btn-show-districts", function () {
    id = $(this).prev().attr('id');
    let collaped = $(this).attr('aria-expanded');
    console.log("Collapsed"+ collaped);
    if (collaped === 'false') {
      $(this).attr("aria-expanded", "false");
      $(document.getElementById(id + 'Districts')).collapse('toggle');
      //$(document.getElementById('regions').getElementsByClassName('col-lg-4')).removeClass('col-lg-4').addClass('container');
      //$(document.getElementById('regions').getElementsByClassName('col-md-6')).removeClass('col-md-6').addClass('col-lg-12');

      const url_district = url_region + "?" + id;
      fetch(url_district).then(data => data.json())
        .then(response => {
          setData(response);

        });

      const setData = (response) => {
        let id = $(this).prev().attr('id');
        $('#btn-show-districts-id').text('');
        $('#btn-show-districts-id').text(id);
        let districts = response.regions;
        for (let i = 0; i < districts.length; i++) {
          const id = $('#btn-show-districts-id').text();
          //console.log("ID District: " + id + 'Districts');

          $(document.getElementById(id + 'Districts')).append("<div class='col-md-6'><div id='" + id + districts[i].name + "' style='min-width: 310px; height: 400px; margin: 0 auto'></div><button class='btn btn-primary btn-show-villages' data-toggle='collapse' data-target='#" + id + districts[i].name + "Villages'> Show all related villages</button><div class='collapse' id='" + id + districts[i].name + "Villages' style='min-width: 310px; height: 400px; margin: 0 auto'></div></div>");
          const container = id + districts[i].name;
          const type = 'column';
          const title = districts[i].name;
          const categories = districts[i].categories;
          const data = districts[i].series[0].data;
          //console.log("ID Districts: " + container);
          buildChart(container, type, title, categories, ytext, data);
        }
      }
    } else {
      $(document.getElementById(id + 'Districts')).collapse('toggle');
      //$(document.getElementById('regions').getElementsByClassName('col-lg-12')).removeClass('col-lg-12').addClass('col-lg-');
    }
  });
});



