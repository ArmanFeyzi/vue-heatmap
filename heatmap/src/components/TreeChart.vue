<template>
  <div class="amchart" ref="chartdiv"></div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import * as ch_data from './l2_e2.json'

// am4core.useTheme(am4themes_animated);

export default {
  name: "TreeChart",
  mounted() {
    let chart = am4core.create(this.$refs.chartdiv, am4charts.TreeMap);

    let groupBy = function(xs, key) {
      return xs.reduce((r, { ex: name, ...object }) => {
        var temp = r.find(o => o.name === name);
        if (!temp) r.push(temp = { name, children: [] });
        temp.children.push(object);
        return r;
    }, []);
    };

    const color = ["#aa2121","#aa2121","#c84040","#c84040","#ed7171","#85be85","#518651","#215e2c"];
    let NEW_DATA  = [];
    ch_data.forEach(function (item, key) {
      if(item.value > 10000000000){
        // console.log(parseInt(item["percent"]));
        item["cc"] = color[parseInt(item["percent"])+5];
        NEW_DATA.push(item)
      }
    });

    // console.log(NEW_DATA);
    let groubedByExchange = groupBy(NEW_DATA, 'ex');

    chart.padding(0,0,0,0);
    chart.margin(0,0,0,0);

    chart.fontFamily = 'Vazir Code';
    chart.numberFormatter.numberFormat = "##.##";

    let data = groubedByExchange;

    chart.dataFields.value = "value";
    chart.dataFields.name = "name";
    chart.dataFields.children = "children";
    chart.dataFields.color = "cc";

    // only one level visible initially
    chart.maxLevels = 1;
    chart.zoomable = true;

    chart.navigationBar = new am4charts.NavigationBar();
    chart.homeText = "خانه";
    chart.zoomable = true;
    // chart.maxZoomFactor = 0;
    chart.layoutAlgorithm = chart.binaryTree;
    chart.chartContainer.wheelable = true;

    // LEVEL 1
    let level1 = chart.seriesTemplates.create("0");
    level1.strokeWidth = 11;

    level1.columns.stroke = am4core.color("red");
    level1.columns.fillOpacity = 1;
    level1.columns.fill = "#88ff22";
    level1.columns.strokeOpacity = 1;

    let level1_bullet = level1.bullets.push(new am4charts.LabelBullet());
    level1_bullet.locationY = 1;
    level1_bullet.locationX = 0.5;
    level1_bullet.label.text = "[bold font-size:3pc;]{name}";
    level1_bullet.label.fill = am4core.color("#f09");
    
    // LEVEL 2
    let level2 = chart.seriesTemplates.create("1");
    level2.columns.template.fillOpacity = 1;
    level2.columns.stroke = am4core.color("#fff");
    level2.columns.tooltipText = `[bold]{name}[/]\n
                                  قیمت سهم: [bold]{value}[/]\n
                                  حجم سهام معامله شده : [bold]{volume}[/]\n
                                  درصد: [bold]{percent}[/]`;
    
    let level2_bullet = level2.bullets.push(new am4charts.LabelBullet());
    level2_bullet.locationY = 0.5;
    level2_bullet.locationX = 0.5;
    level2_bullet.label.text = "[bold font-size: 1.4pc; #fff]{shortname}[/]\n[font-size: 0.9pc]% {percent.formatNumber(##.##)}[/]";
    level2_bullet.label.fill = am4core.color("#fff");
    
    chart.data = data;

    this.chart = chart;
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@import "../assets/style/style.scss";

.amchart {
  width: 100%;
  height: 100vh;
}

text{
  -webkit-text-size-adjust: none;
  text-shadow: 0.04em 0.03em 0 rgba(50,49,54,.56);
}
</style>
