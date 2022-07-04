import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy
} from "@angular/core";
import { matxAnimations } from "app/shared/animations/matx-animations";
import { ThemeService } from "app/shared/services/theme.service";
import tinyColor from "tinycolor2";
import PerfectScrollbar from "perfect-scrollbar";
import { StoreService } from "app/shared/services/store.service";
import { User, UserApiModel } from "app/shared/models/user.model";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"],
  animations: matxAnimations
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  trafficVsSaleOptions: any;
  trafficVsSale: any;
  trafficData: any;
  saleData: any;
  customers:UserApiModel[] = [];
  products:any[] = [];
  customersActive:UserApiModel[] = [];
  percent:number = 0;
  sessionOptions: any;
  sessions: any;
  sessionsData: any;
  currentUser!:User;
  trafficGrowthChart: any;
  bounceRateGrowthChart: any;

  dailyTrafficChartBar: any;
  trafficSourcesChart: any;
  countryTrafficStats: any[];
  doughNutPieOptions: any;

  statCardList = [
    {
      icon: "people",
      title: "Clientes",
      amount: '...',
      color: "primary"
    },
    {
      icon: "attach_money",
      title: "Ventas de esta semana",
      amount: "$80,500",
      color: "primary"
    },
    {
      icon: "store",
      title: "Estado de inventario",
      amount: "8.5% Stock Surplus",
      color: "accent"
    },
    {
      icon: "shopping_cart",
      title: "Pedidos para entregar",
      amount: "305 Orders",
      color: "accent"
    }
  ];

  productList = [];

  onGoingProjectList = [
    {
      icon: "start_border",
      color: "warn",
      title: "project 1"
    },
    {
      icon: "date_range",
      color: "primary",
      title: "project 2"
    },
    {
      icon: "start_border",
      color: "warn",
      title: "project 3"
    },
    {
      icon: "date_range",
      color: "accent",
      title: "project 4"
    }
  ];

  displayedColumns: string[] = ["Type", "Quantity", "action"];

  constructor(private themeService: ThemeService,
    private storeService: StoreService,
    public jwtAuth: JwtAuthService) {}

  ngAfterViewInit() {
    
  }
  ngOnInit() {
    this.currentUser = this.jwtAuth.getUser();
    if(this.currentUser.role !== 'Admin'){
      this.displayedColumns = ["Type", "Quantity"];
    }
    this.getAllCustomers();
    this.getAllProducts();
    this.themeService.onThemeChange.subscribe(activeTheme => {
      this.initDoughNutPieOptions(activeTheme);
      this.initDailyTrafficChartBar(activeTheme);
    });
    this.initDailyTrafficChartBar(this.themeService.activatedTheme);
    this.initDoughNutPieOptions(this.themeService.activatedTheme);
  }

  getAllCustomers(){
    this.customers = [];
    this.storeService.getAllUsers().subscribe(users =>{
      if(users !== undefined){
        this.customers = users;
        this.statCardList[0].amount = `${this.customers.length}`;
        this.customersActive = [];
        this.customersActive = this.customers .filter(user => user.Active === true);
        this.percent = Math.round((this.customersActive.length*100)/this.customers.length);
      }
    })
  }

  getAllProducts(){
    this.storeService.getAllProducts().subscribe((prod:any) =>{
      if(prod !== undefined){
        this.productList = prod;
      }
    }) 
  }

  initDoughNutPieOptions(theme) {
    this.doughNutPieOptions = {
      backgroundColor: "transparent",
      color: [
        "#f44336",
        "#ff9e43",
        "rgba(116, 103, 239, 1)"
      ],
      legend: {
        show: true,
        itemGap: 20,
        icon: "circle",
        bottom: 0,
        textStyle: {
          fontSize: 13,
          fontFamily: "roboto"
        }
      },
      tooltip: {
        show: false,
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      xAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],

      series: [
        {
          name: "Traffic Rate",
          type: "pie",
          radius: ["45%", "72.55%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          hoverOffset: 5,
          stillShowZeroSum: false,

          label: {
            normal: {
              show: false,
              position: "center",
              textStyle: {
                fontSize: "13",
                fontWeight: "normal"
              },
              formatter: "{a}"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "15",
                fontWeight: "normal",
                color: "rgba(116, 103, 239, 1)"
              },
              formatter: "{b} \n{c} ({d}%)"
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: 65,
              name: "Google"
            },
            {
              value: 20,
              name: "Facebook"
            },
            { value: 15, name: "Others" }
          ],

          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
  }

  initDailyTrafficChartBar(theme) {
    this.dailyTrafficChartBar = {
      grid: {
        top: 16,
        left: 36,
        right: 16,
        bottom: 32
      },
      legend: {},
      tooltip: {
        show: true,
        trigger: "axis",

        axisPointer: {
          type: "cross",
          lineStyle: {
            opacity: 0
          }
        },
        crossStyle: {
          color: "#000"
        }
      },
      series: [
        {
          data: [34, 45, 31, 45, 31, 43, 26, 43, 31, 45, 33, 40],
          type: "line",
          areaStyle: {},
          smooth: true,
          lineStyle: {
            width: 2,
            color: "#fff"
          }
        }
      ],
      xAxis: {
        show: true,
        type: "category",
        showGrid: false,
        boundaryGap: false,
        data: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        axisLabel: {
          color: "#ccc",
          margin: 20
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        min: 10,
        max: 60,
        axisLabel: {
          color: "#ccc",
          margin: 20,
          fontSize: 13,
          fontFamily: "roboto"
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(255, 255, 255, .1)"
          }
        },

        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      color: [
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(255,255,255,0.3)" // color at 0% position
            },
            {
              offset: 1,
              color: "rgba(255,255,255,0)" // color at 100% position
            }
          ],
          global: false // false by default
        }
      ]
    };
  }
}
