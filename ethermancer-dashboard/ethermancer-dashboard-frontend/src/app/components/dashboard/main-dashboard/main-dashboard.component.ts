import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import {
  faLocation,
  faShop,
  faBoxes,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  faLocation = faLocation;
  faShop = faShop;
  faBoxes = faBoxes;
  faMoneyBill = faMoneyBill;

  chart = new Chart({
    chart: {
      type: 'line',
      height: null
    },
    title: {
      text: 'Month wise profit'
    },
    accessibility: {
      enabled: false
    },
    xAxis: {
      categories: [
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    },
    yAxis: {
      title: {
        text: 'Profit in $'
      }
    },
    series: [
      {
        name: "Bot 1 - Aggressive ",
        type: "line",
        color: '#044342',
        data: [252, 265, 233, 183, 139, 196]
      },
      {
        name: 'Bot 2 - Normal ',
        type: 'line',
        color: '#7e0505',
        data: [
          32, 53, 71, 82, 99, 159
        ]
      },
      {
        name: 'Bot 3 - Reserved ',
        type: 'line',
        color: '#ed9e20',
        data: [
          22, 43, 11, 32, 29, 59
        ]
      },
    ],
    credits: {
      enabled: false
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 750 // Wenn die Bildschirmbreite 750 Pixel oder weniger beträgt
          },
          chartOptions: {
            chart: {
              height: 300 // Passen Sie die Höhe des Diagramms für kleinere Bildschirme an
            }
          }
        }
      ]
    }
  });

  chart1 = new Chart({
    chart: {
      type: 'pie',
      height: 325
    },
    title: {
      text: 'Profit per bot in % '
    },
    accessibility: {
      enabled: false
    },
    xAxis: {
      categories: [
        'Bot 1',
        'Bot 2',
        'Bot 3',
      ]
    },
    yAxis: {
      title: {
        text: 'Revenue in %'
      }
    },
    series: [
     {
      type: 'pie',
      data: [
        {
          name: 'Bot 1',
          y: 41.0,
          color: '#044342',
        },
        {
          name: 'Bot 2',
          y: 33.6,
          color: '#7e0505',
        },
        {
          name: 'Bot 3',
          y: 25.4,
          color: '#ed9e20',
        }
      ]
     }
    ],
    credits: {
      enabled: false
    }
  })

  constructor() { }

  ngOnInit(): void {
  }

}