<template>
  <div class="amchart" ref="chartdiv"></div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import * as ch_data from './l2_e2.json'

am4core.useTheme(am4themes_animated);

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

    // only one level visible initially
    chart.maxLevels = 2;
    chart.zoomable = true;
    chart.zoomToChartDataItem()

    chart.dataFields.value = "value";
    chart.dataFields.name = "name";
    chart.dataFields.children = "children";
    chart.dataFields.color = "cc";

    // chart.navigationBar = new am4charts.NavigationBar();
    // chart.homeText = "TOP";

    // chart.zoomAxes = 20000;
    // chart.zoomable = true;
    // chart.maxZoomFactor = 100;
    // chart.layoutAlgorithm = chart.binaryTree;

    // chart.chartContainer.wheelable = true;

    // LEVEL 1
    let level1 = chart.seriesTemplates.create("0");
    level1.strokeWidth = 9;

// by default only current level series bullets are visible, but as we need brand bullets to be visible all the time, we modify it's hidden state
level1.bulletsContainer.hiddenState.properties.opacity = 1;
level1.bulletsContainer.hiddenState.properties.visible = true;
// create hover state
var hoverState = level1.columns.template.states.create("hover");

// darken
hoverState.adapter.add("fill", (fill, target) => {
  return am4core.colors.brighten(fill, -0.2);
});


    let level1_column = level1.columns.template;
    level1_column.stroke = am4core.color("red");

    level1_column.fillOpacity = 1;
    level1_column.fill = "#88ff22";
    level1_column.strokeOpacity = 1;
    level1_column.strokeWidth = 15;

    let level1_bullet = level1.bullets.push(new am4charts.LabelBullet());
    level1_bullet.locationY = 0.5;
    level1_bullet.locationX = 0.5;
    level1_bullet.label.text = "[bold font-size:5pc;]{name}\n[font-size: 8pc;]{percent.formatNumber('#.00')}";
    level1_bullet.fontSize = "1.3pc";
    level1_bullet.fontFamily = "Vazir Code";
    level1_bullet.label.fill = am4core.color("#fff");
    

    // LEVEL 2
    let level2 = chart.seriesTemplates.create("1");
    let level2_column = level2.columns.template;
    level2_column.stroke = am4core.color("#fff");
    level2_column.fillOpacity = 1;
    level2_column.strokeWidth = 1;
    level2_column.strokeOpacity = 1;
    let level2_bullet = level2.bullets.push(new am4charts.LabelBullet());
    level2_bullet.locationY = 0.5;
    level2_bullet.locationX = 0.5;
    level2_bullet.label.text = "[bold font-size:1pc;]{shortname}\n[font-size: 1.8pc;]{percent.formatNumber('##.##')}";
    // chart.numberFormatter.numberFormat = "##.##";
    // level2_bullet.label.text = "[bold font-size: 1.4pc; #fff]{shortname}[/]\n[font-size: 0.9pc]% {percent}[/]";
    // level2_bullet.fontSize = "1pc";
    // level2_bullet.fontFamily = "Vazir Code";
    level2_bullet.label.fill = am4core.color("#fff");
    level2_column.tooltipText = "Value: [bold]{value}[/]";
    level2_column.tooltipText = `[bold]{name}[/]\n
                                  قیمت سهم: [bold]{value}[/]\n
                                  حجم سهام معامله شده : [bold]{volume}[/]\n
                                  درصد: [bold]{percent}[/]`;
    
    // level1_column.zoomable = true;
    // level2_column.zoomable = true;
    
    // level1_column.minZoomCount = 20000;
    // level2_column.minZoomCount = 20000;


    // // level2_column.margin(0,21,0,21);
    // level2_column.padding(51,21,51,21);
    // // level2_column

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
