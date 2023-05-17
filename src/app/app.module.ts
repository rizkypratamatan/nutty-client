import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
    HTTP_INTERCEPTORS,
    HttpClient,
    HttpClientModule,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {
    NgbAccordionModule,
    NgbModule,
    NgbNavModule,
    NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { FakeBackendInterceptor } from './core/helpers/fake-backend';
import { AppComponents } from './app-component.module';
import { GlobalConfiguration } from './configurations/global.configuration';
import { ConfigurationService } from './configurations/configuration.service';
import { AppServices } from './app-services.module';

export function createTranslateLoader(http: HttpClient): any {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

function initializer(
    configurationService: ConfigurationService
): () => Promise<void> {
    return () => {
        return configurationService.initialize();
    };
}

@NgModule({
    declarations: [AppComponent, AppComponents],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),
        LayoutsModule,
        AppRoutingModule,
        CarouselModule,
        NgbAccordionModule,
        NgbNavModule,
        NgbTooltipModule,
        NgbModule,
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: FakeBackendInterceptor,
            multi: true,
        },
        {
            provide: GlobalConfiguration,
            deps: [HttpClient],
            useExisting: ConfigurationService,
        },
        {
            provide: APP_INITIALIZER,
            multi: true,
            deps: [ConfigurationService],
            useFactory: initializer,
        },
        AppServices,
    ],
})
export class AppModule {}
