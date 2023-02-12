import { Component } from "@angular/core"

@Component({
    selector: "app-count-down",
    templateUrl: "./count-down.component.html",
    styleUrls: ["./count-down.component.scss"],
})
export class CountDownComponent {
    now: Date
    secondsToNextHour: number
    circleDasharray: string

    COLOR_CODES = {
        info: {
            color: "green",
        },
        warning: {
            color: "orange",
            threshold: 1800,
        },
        alarm: {
            color: "red",
            threshold: 600,
        },
    }

    remainingPathColor = this.COLOR_CODES.info.color

    constructor() {
        // Calculate the time remaining until the start of the next hour
        this.now = new Date()
        this.circleDasharray = `282.74333882308138 282.74333882308138`

        this.secondsToNextHour =
            3600 - (this.now.getMinutes() * 60 + this.now.getSeconds())

        console.log(
            `Time to reset: \n\tminutes =>\t${
                59 - this.now.getMinutes()
            } \n\tseconds =>\t${60 - this.now.getSeconds()}\n`
        )
    }

    formatTimeLeft() {
        // The largest round integer less than or equal to the result of time divided being by 60.
        const minutes = (59 - this.now.getMinutes()).toString()

        // Seconds are the remainder of the time divided by 60 (modulus operator)
        let seconds = (59 - this.now.getSeconds()).toString()

        // If the value of seconds is less than 10, then display seconds with a leading zero
        if (Number(seconds) < 10) {
            seconds = `0${seconds}`
        }

        // The output in MM:SS format
        return `${minutes}:${seconds}`
    }

    // Set a timer to execute the code when the time remaining is 0
    timer = setInterval(() => {
        this.now = new Date()
        this.secondsToNextHour =
            3600 - (this.now.getMinutes() * 60 + this.now.getSeconds())

        this.circleDasharray = `${
            (this.secondsToNextHour / 3600) * 282.74333882308138
        } 282.74333882308138`

        if (
            this.secondsToNextHour < this.COLOR_CODES.warning.threshold &&
            this.secondsToNextHour > this.COLOR_CODES.alarm.threshold
        ) {
            this.remainingPathColor = this.COLOR_CODES.warning.color
        } else if (this.secondsToNextHour < this.COLOR_CODES.alarm.threshold) {
            this.remainingPathColor = this.COLOR_CODES.alarm.color
        } else {
            this.remainingPathColor = this.COLOR_CODES.info.color
        }

        if (this.secondsToNextHour % 30 === 0) {
            console.log(
                `Time to reset: \n\tminutes =>\t${
                    59 - this.now.getMinutes()
                } \n\tseconds =>\t${60 - this.now.getSeconds()}\n`
            )
        }

        if (this.secondsToNextHour < 2 && this.secondsToNextHour > 0) {
            window.location.reload()
        }
    }, 500)
}
