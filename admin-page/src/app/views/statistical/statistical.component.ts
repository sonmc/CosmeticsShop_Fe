import { Component, OnInit } from "@angular/core";
import { SUCCESS_STATUS } from "../../containers/constants/config";
import { CommonService } from "../../containers/services/common.service";

@Component({
  selector: "app-statistical",
  templateUrl: "./statistical.component.html",
})
export class StatisticalComponent {
  statisticals: any = [];

  dateTime: any = {
    dateFrom: "2022-02-02",
    dateTo: "2022-02-02",
  };

  totalCalculator: any = {
    totalInventory: 0,
    totalsoldQuantity: 0,
    totalRevenues: 0,
  };
  constructor(private commonService: CommonService) {
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let fromYear = year;
    let toYear = year;
    let fromMonth = "";
    let toMonth = "";
    let fromDay = "";
    if (month < 10 && month < 1) {
      fromMonth = "0" + (month > 1 ? month - 1 : 1);
      toMonth = "0" + month;
    }
    if (month == 1) {
      fromMonth = "12";
      toMonth = "01";
      fromYear = fromYear - 1;
    }

    if (day < 10) {
      fromDay = "0" + day;
    }

    var todayFrom = fromYear + "-" + fromMonth + "-" + fromDay;
    var todayTo = toYear + "-" + toMonth + "-" + fromDay;

    this.dateTime = {
      dateFrom: todayFrom,
      dateTo: todayTo,
    };
    this.caculatorStatistical({
      dateFrom: todayFrom,
      dateTo: todayTo,
    });
  }
  filter = () => {
    this.caculatorStatistical(this.dateTime);
  };
  
  caculatorStatistical = (dateTime) => {
    this.commonService.caculatorStatistical(dateTime).subscribe((res) => {
      if (res["status"] == SUCCESS_STATUS) {
        this.statisticals = res["data"];
        let inventories = 0;
        let solds = 0;
        let revenues = 0;

        this.statisticals.map((item) => {
          item.revenue = item.price * item.soldQuantity;
          return item;
        });

        this.statisticals.forEach((item) => {
          inventories += item.inventory;
          solds += item.soldQuantity;
          revenues += item.revenue;
        });

        this.totalCalculator = {
          totalInventory: inventories,
          totalsoldQuantity: solds,
          totalRevenues: revenues,
        };
      }
    });
  };
}
