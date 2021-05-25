export function plotOptions(coordinates, canvas, color, highlight) {
    var _a;
    const gradient = (_a = canvas.getContext("2d")) === null || _a === void 0 ? void 0 : _a.createLinearGradient(0, 1000, 0, 0);
    // Add two color stops
    gradient === null || gradient === void 0 ? void 0 : gradient.addColorStop(0.75, "rgba(255,255,255,0)");
    gradient === null || gradient === void 0 ? void 0 : gradient.addColorStop(1, highlight);
    const ticks = {
        font: { color: "rgb(90,90,90)", family: "IBM Plex Sans", size: 14 },
        maxTicksLimit: 10,
        padding: 2,
        precision: 0.1,
        color: "rgb(90,90,90)",
    };
    const gridLines = {
        tickLength: 5,
        lineWidth: 1.3,
        display: true,
    };
    const title = (text) => {
        return {
            display: true,
            text,
            font: {
                size: 14,
                color: "rgb(50,50,50)",
            },
            padding: { top: 3, bottom: 3 },
        };
    };
    return {
        type: "line",
        data: {
            labels: ["x", "y"],
            datasets: [
                {
                    label: "Dataset",
                    data: coordinates,
                    spanGaps: true,
                    fill: {
                        target: "origin",
                        below: gradient,
                    },
                },
            ],
        },
        options: {
            parsing: false,
            normalized: true,
            responsive: true,
            animation: {
                duration: 0, // general animation time
            },
            plugins: {
                tooltip: {
                    enabled: false,
                },
                legend: {
                    display: false,
                },
            },
            elements: {
                line: {
                    tension: 0,
                    backgroundColor: gradient,
                    borderJoinStyle: "round",
                    borderColor: color,
                    borderWidth: 2,
                },
                point: {
                    radius: 0, //hide points
                },
            },
            aspectRatio: 1.5,
            maintainAspectRatio: false,
            devicePixelRatio: 2.3,
            layout: {
                padding: {
                    left: 5,
                },
            },
            scales: {
                y: {
                    title: title("Concentration"),
                    axis: "y",
                    weight: 2,
                    type: "linear",
                    gridLines,
                    ticks,
                },
                x: {
                    title: title("Time(hours)"),
                    position: "bottom",
                    axis: "x",
                    weight: 1,
                    type: "linear",
                    gridLines,
                    ticks,
                },
            },
        },
    };
}
/*
{
    type: 'line',
    data: {
      datasets: [
        {
          label: 'Dataset',
          data: coordinates,
          spanGaps: true,

          backgroundColor: gradient,
        },
      ],
    },
    options: {
      parsing: false,
      normalized: true,
      animation: {
        duration: 0, // general animation time
      },
      hover: {
        animationDuration: 0, // duration of animations when hovering an item
      },
      elements: {
        line: {
          tension: 0, // disables bezier curves
          backgroundColor: gradient,
          borderJoinStyle: 'round',
          borderColor: color,
          borderWidth: 2,
        },

        point: {
          radius: 0,
        },
      },
      aspectRatio: 1.5,
      maintainAspectRatio: false,
      devicePixelRatio: 2.3,
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      fill: false,
      options: {
        responsive: true,
        legend: {
          labels: {
            // This more specific font property overrides the global property
            defaultFontFamily: 'IBM Plex Sans',
          },
        },
      },
      layout: {
        padding: {
          left: 5,
        },
      },
      scales: {
        y: [
          {
            weight: 2,
            type: 'linear',
            scaleLabel: {
              display: true,
              labelString: 'Concentration',
              fontSize: 14,
              padding: 3,
              fontColor: 'rgb(50,50,50)',
            },
            gridLines: {
              tickMarkLength: 5,
              zeroLineColor: 'rgb(50,50,50)',
              zeroLineWidth: 1.3,
              display: true,
            },
            ticks: {
              fontColor: 'rgb(90,90,90)',
              fontFamily: 'Jetbrains Mono',
              maxTicksLimit: 10,
              fontSize: 14,
              padding: 2,
              precision: 0.1,
            },
          },
        ],
        x: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Time (hours)',
              fontSize: 14,
              padding: 3,
              fontColor: 'rgb(50,50,50)',
            },
            position: 'bottom',
            weight: 1,
            type: 'linear',
            gridLines: {
              tickMarkLength: 0,
              zeroLineColor: 'rgb(50,50,50)',
              zeroLineWidth: 1.3,
              display: true,
              drawOnChartArea: true,
            },
            ticks: {
              fontColor: 'rgb(90,90,90)',
              fontFamily: 'Jetbrains Mono',
              fontSize: 14,
              padding: 5,
              precision: 1,
            },
          },
        ],
      },
    },
  } as any;
*/
//# sourceMappingURL=plot-options.config.js.map