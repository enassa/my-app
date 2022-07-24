import { useContext } from "react";

const branches = ["Adjiringanor", "Osu", "Amrahia"];

export const deliveryData = {
  series: [45, 55],
  options: {
    chart: {
      type: "donut",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
            },
          },
        },
      },
    },
    legend: {
      position: "bottom",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            // position: "bottom",
          },
        },
      },
    ],
    // colors: ["#016450", "#FF8433"],
    legend: {
      formatter: function (val, opts) {
        return val + "-" + opts.w.globals.series[opts.seriesIndex];
      },
      show: false,
    },
    fill: {
      type: "gradient",
    },
    labels: ["undelivered", "Delivered"],
  },
};

// const { getOrders } = useContext(KitchenBodyContext);
// getOrders("2022-05-10", "2022-06-38").then((response) => {});
export const branchDistributionData = {
  options: {
    chart: {
      type: "area",
    },
    colors: ["#FF8433"],

    xaxis: {
      type: "category",
      categories: branches,
      title: {
        text: "BRANCHES",
        style: {
          fontSize: "14px",
          fontFamily: "Arial Rounded MT Bold, system-ui, sans-serif",
          fontWeight: "bold",
        },
      },
    },
    yaxis: {
      title: {
        text: "ORDERS",
        style: {
          fontSize: "16px",
          fontFamily: "Arial Rounded MT Bold, system-ui, sans-serif",
          fontWeight: "bold",
        },
      },
    },

    stroke: {
      width: 2,
      curve: "straight",
      //   lineCap: "round",
      //   dashArray: 100,
      //   colors: "orange",
    },
    grid: {
      borderColor: "#E8E9ED",
      clipMarkers: false,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      size: 3,
      colors: ["#FF8433"],
      strokeColor: "#FF8433",
      strokeWidth: 4,
    },

    plotOptions: {
      bar: {
        // horizontal: true,
        // distributed: true,
      },
    },
    fill: {
      colors: ["#FFB483"],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    // title: {
    //   text: "Branch Distribution",
    //   align: "left",
    //   margin: 20,
    //   offsetY: 20,
    //   style: {
    //     fontSize: "16px",
    //     fontWeight: "500",
    //     fontFamily: "DM Sans, sans-serif",
    //   },
    // },
  },
  series: [
    {
      name: "Orders",
      data: [44, 55, 23],
      //   data: [
      //     { x: "Adjiringanor", y: 44 },
      //     { x: "Osu", y: 55 },
      //     { x: "Amrahia", y: 23 },
      //   ],
    },
  ],
};
