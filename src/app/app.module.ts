import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpModule } from '@angular/http';
import {ProductService} from './product/product.service'
import { AppComponent } from './app.component';
import {ToolbarComponent} from "./shared/toolbar/toolbar.component";
import {HomeComponent} from "./home/home.component";
import {Ng2BootstrapModule} from "ng2-bootstrap";
import {AboutComponent} from "./about/about.component";
import {RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AuthService} from "./shared/services/auth.service";
import {AuthGuard} from "./shared/services/auth.guard";
import {UserService} from "./shared/services/user.service";
import {CollapseModule} from 'ng2-bootstrap/components/collapse';

import {SchemaFormModule, DefaultWidgetRegistry, WidgetRegistry} from "angular2-schema-form";
import {Ng2SFTinyMCEModule} from "ng2sf-tinymce"
import {WizardWidgetComponent} from "./shared/widgets/wizard/wizard.widget.component";
import {TabsWidgetComponent} from "./shared/widgets/tabs/tabs.widget.component";
import {OutmodelComponent } from './devtracking/outmodel/outmodel.component';
import {ProductComponent} from "./product/product.component";
import {MenuComponent} from "./shared/menu/menu.component";
import {ProductResolver} from "./product/product.resolver";
import { ModalComponent} from "./shared/modal/modal.component";
import {TabCollectionComponent} from "./shared/custom/tab/tab.collection.component";
import {TabElementComponent} from "./shared/custom/tab/tab.element.component";
import {InfomodalComponent} from "./shared/custom/infomodal/infomodal.component";
import {AccessDeniedComponent} from "./access-denied/access-denied.component";
import {ErrorMessagePipe} from "./shared/custom/pipe/error.message.pipe";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ToolbarComponent,
    LoginComponent,
    HomeComponent,
    AccessDeniedComponent,
    AboutComponent,
    ProductComponent,
    WizardWidgetComponent,
    TabsWidgetComponent,
    OutmodelComponent,
    InfomodalComponent,
    ModalComponent,
    TabCollectionComponent,
    TabElementComponent,
    ErrorMessagePipe
  ],
  entryComponents: [WizardWidgetComponent,TabsWidgetComponent],
  imports: [
    BrowserModule,
    HttpModule,
    Ng2BootstrapModule,
    CollapseModule,
    SchemaFormModule,
    Ng2SFTinyMCEModule,
    RouterModule.forRoot(
      [
        {path: '', component: AboutComponent },
        {path:'login', component:LoginComponent},
        {path:'home', component:HomeComponent},
        {path:'access-denied', component:AccessDeniedComponent},
        {path:'product', component:ProductComponent},
        {path:'product/new/:schemaType', component:ProductComponent},
        {path:'product/:id', component:ProductComponent,resolve: {product:ProductResolver}},
        { path: '**', redirectTo: '' }
      ]
    )
  ],
  providers: [
    ProductService,
    ProductResolver,
    UserService,
    AuthService,
    AuthGuard,
    {provide: WidgetRegistry, useClass: DefaultWidgetRegistry}
  ],
  bootstrap: [AppComponent]

})

export class AppModule {
  constructor(widgetRegistry: WidgetRegistry) {
    widgetRegistry.register("wizard-widget", WizardWidgetComponent);
    widgetRegistry.register("tabs-widget", TabsWidgetComponent);
  }


}
