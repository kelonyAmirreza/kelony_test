import { UploadService } from "../upload.service"
import { Component } from "@angular/core"

@Component({
    selector: "app-upload",
    templateUrl: "./upload.component.html",
    styleUrls: ["./upload.component.scss"],
})
export class UploadComponent {
    // Variable to store shortLink from api response
    shortLink: string = "https://www.file.io/cnTh/download/Mlyu72n9n5tz"
    loading: boolean = false // Flag variable
    file: File | undefined // Variable to store file

    // Inject service
    constructor(private uploadService: UploadService) {}

    ngOnInit(): void {}

    // On file Select
    onChange(event: any) {
        this.file = event.target.files[0]
        console.log(this.file?.name)
    }

    // OnClick of button Upload
    onUpload() {
        this.loading = !this.loading
        console.log(this.file)
        this.uploadService.upload(this.file!).subscribe((event: any) => {
            if (typeof event === "object") {
                // Short link via api response
                this.shortLink = event.link

                this.loading = false // Flag variable
            }
        })
    }
}
