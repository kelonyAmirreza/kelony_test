import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { NgbModule } from "@ng-bootstrap/ng-bootstrap"

import { HttpClientModule } from "@angular/common/http"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { CountDownComponent } from "./count-down/count-down.component"
import { UploadComponent } from "./upload/upload.component"
import { GraphComponent } from "./graph/graph.component"

@NgModule({
    declarations: [
        AppComponent,
        CountDownComponent,
        UploadComponent,
        GraphComponent,
    ],
    imports: [
        BrowserModule,
        NgbModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
