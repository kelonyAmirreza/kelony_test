import { Component } from "@angular/core"
import Chart from "chart.js/auto"
import { UploadService } from "../upload.service"

@Component({
    selector: "app-graph",
    templateUrl: "./graph.component.html",
    styleUrls: ["./graph.component.scss"],
})
export class GraphComponent {
    public chart: any
    ngOnInit(): void {
        this.createChart()
    }

    startTimestamp: number
    lastTimestamp: number
    binanceUrl: string
    constructor(private uploadService: UploadService) {
        this.lastTimestamp = Date.now()
        this.startTimestamp = this.lastTimestamp - 30000000 //6912000000
        this.binanceUrl = `https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1m&startTime=${this.startTimestamp}&endTime=${this.lastTimestamp}&limit=500`
        uploadService.getMethod(this.binanceUrl).subscribe((response: any) => {
            if (typeof response === "object") {
                for (let i = 0; i < response.length; i++) {
                    this.chart.data.datasets[0].data.push({
                        x: this.convertDate(response[i][0]),
                        y: response[i][4],
                    })
                    if (i > 19) {
                        this.chart.data.datasets[1].data.push({
                            x: this.convertDate(response[i][0] + 1200000),
                            y: this.calculateMA(
                                response
                                    .slice(i - 20, i)
                                    .map(function (value: any[], index: any) {
                                        return value[4]
                                    })
                            ),
                        })
                    }
                }
                this.chart.update()
            } else {
                console.log("error geting data")
            }
        })
    }

    createChart() {
        this.chart = new Chart("MyChart", {
            type: "line", //this denotes tha type of chart
            data: {
                // values on X-Axis
                // labels: this.chartTime,
                datasets: [
                    {
                        label: "Current price",
                        data: [],
                        backgroundColor: "#084de0",
                        borderColor: "#084de0",
                        borderWidth: 2,
                    },
                    {
                        label: "Prediction (shifted moving average 20)",
                        data: [],
                        backgroundColor: "green",
                        borderColor: "green",
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                aspectRatio: 1.9,
                responsive: true,
                elements: {
                    point: {
                        radius: 1.5,
                    },
                },
                plugins: {
                    title: {
                        display: true,
                        text: "Ethereum Price Chart (1min)",
                        color: "black",
                        font: {
                            size: 30,
                        },
                    },
                    legend: {
                        labels: {
                            color: "black",
                            font: {
                                size: 20,
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        // type: "time",
                        border: {
                            display: true,
                        },
                        grid: {
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: true,
                            color: "#606060",
                        },
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 28,
                            color: "black",
                            font: {
                                size: 20,
                            },
                            maxRotation: 90,
                            minRotation: 90,
                        },
                    },

                    y: {
                        border: {
                            display: true,
                        },
                        grid: {
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: true,
                            color: "#606060",
                        },
                        ticks: {
                            color: "black",
                            font: {
                                size: 20,
                            },
                        },
                    },
                },
            },
        })
    }

    timer = setInterval(() => {
        const startTimestamp = this.lastTimestamp
        this.lastTimestamp = Date.now()
        this.binanceUrl = `https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1m&startTime=${startTimestamp}&endTime=${this.lastTimestamp}&limit=500`
        this.uploadService
            .getMethod(this.binanceUrl)
            .subscribe((response: any) => {
                if (typeof response === "object") {
                    for (let i = 0; i < response.length; i++) {
                        this.chart.data.datasets[0].data.push({
                            x: this.convertDate(response[i][0]),
                            y: response[i][4],
                        })
                        if (i > 19) {
                            this.chart.data.datasets[1].data.push({
                                x: this.convertDate(response[i][0] + 1200000),
                                y: this.calculateMA(
                                    response
                                        .slice(i - 20, i)
                                        .map(function (
                                            value: any[],
                                            index: any
                                        ) {
                                            return value[4]
                                        })
                                ),
                            })
                        }
                    }
                    this.chart.update()
                } else {
                    console.log("error geting data")
                }
            })
    }, 2000)

    convertDate(timeStamp: number) {
        const date = new Date(timeStamp)

        return `${date.getFullYear()}-${
            date.getMonth() + 1
        }-${date.getDate()} ${
            date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`
        }:${
            date.getMinutes() >= 10
                ? date.getMinutes()
                : `0${date.getMinutes()}`
        }:${
            date.getSeconds() >= 10
                ? date.getSeconds()
                : `0${date.getSeconds()}`
        }`
    }

    calculateMA(array: string[]) {
        let arrayNum: number[] = []
        for (let i = 0; i < array.length; i++) {
            arrayNum.push(Number(array[i]))
        }
        return (arrayNum.reduce((a, b) => a + b, 0) / 20).toString()
    }
}
