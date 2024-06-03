import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImedoneFlowComponent } from './flow/imedone-flow/imedone-flow.component';
import { PmsFlowComponent } from './flow/pms/pms-flow/pms-flow.component';
import { PmsContentComponent } from './flow/pms/pms-content/pms-content.component';
import { AskmeComponent } from './askme/askme.component';
import { CareFlowComponent } from './flow/care/care-flow/care-flow.component';
import { CareContentComponent } from './flow/care/care-content/care-content.component';
import { LsmFlowComponent } from './flow/lsm/lsm-flow/lsm-flow.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { LsmContentComponent } from './flow/lsm/lsm-content/lsm-content.component';
import { DocopFlowComponent } from './flow/docop/docop-flow/docop-flow.component';
import { DocopContentComponent } from './flow/docop/docop-content/docop-content.component';
import { BillingFlowComponent } from './flow/billing/billing-flow/billing-flow.component';
import { BillingContentComponent } from './flow/billing/billing-content/billing-content.component';
import { GrmFlowComponent } from './flow/grm/grm-flow/grm-flow.component';
import { GrmContentComponent } from './flow/grm/grm-content/grm-content.component';
import { AmsFlowComponent } from './flow/ams/ams-flow/ams-flow.component';
import { AmsContentComponent } from './flow/ams/ams-content/ams-content.component';
import { TestFlowComponent } from './flow/test/test-flow/test-flow.component';
import { chatQuestionComponent } from './chatQuestion/chatQuestion.component';
import { Admin_dashboardComponent } from './admin_dashboard/admin_dashboard.component'
import { ClangComponent } from './clang/clang.component';
import { AdminSubjectComponent } from './admin-subject/admin-subject.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AdminModuleComponent } from './admin-module/admin-module.component';
import { CreateSlideComponent } from './create-slide/create-slide.component';
import { PmsContentService } from './flow/pms/pms-content/pms-content.service';
import { AdminSubSectionComponent } from './admin-sub-section/admin-sub-section.component';
import { AdminSubtopicComponent } from './admin-subtopic/admin-subtopic.component';
import { BytesPipe } from './admin-sub-section/bytes.pipe';
import { AdminPreviewComponent } from './admin-preview/admin-preview.component';
import { DataPreviewComponent } from './data-preview/data-preview.component';
import { DataService } from './data.service';
import { TileSubjectComponent } from './tile-subject/tile-subject.component';
import { SubjectformComponent } from './subjectform/subjectform.component';
import { FilterBySubjectPipe } from './filter-by-subject.pipe';
import { SubcontentComponent } from './subcontent/subcontent.component';
import { LsmContentService } from './flow/lsm/lsm-content/lsm-content.service';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmptileSubjectComponent } from './emptile-subject/emptile-subject.component';
import { DataStorageService } from './data-storage.service';
import { YoutubePlayerComponent } from './youtube-player/youtube-player.component';
import { SlidercontentComponent } from './slidercontent/slidercontent.component';
import { NewsliderComponent } from './newslider/newslider.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    DashboardComponent,
    ImedoneFlowComponent,
    PmsFlowComponent,
    PmsContentComponent,
    AskmeComponent,
    ChatbotComponent,
    CareFlowComponent,
    CareContentComponent,
    LsmFlowComponent,
    LsmContentComponent,
    DocopFlowComponent,
    DocopContentComponent,
    BillingFlowComponent,
    BillingContentComponent,
    GrmFlowComponent,
    GrmContentComponent,
    AmsFlowComponent,
    AmsContentComponent,
    Admin_dashboardComponent,
    chatQuestionComponent,
    ClangComponent,
    TestFlowComponent,
    AdminSubjectComponent,
    CarouselComponent,
    AdminModuleComponent,
    CreateSlideComponent,
    AdminSubSectionComponent,
    AdminSubtopicComponent,
   BytesPipe,
   AdminPreviewComponent,
   DataPreviewComponent,
   TileSubjectComponent,
   SubjectformComponent,
   FilterBySubjectPipe,
   SubcontentComponent,
   CreateAdminComponent,
   ForgotPasswordComponent,
   EmptileSubjectComponent,
   YoutubePlayerComponent,
   SlidercontentComponent,
   NewsliderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [PmsContentService,
    LsmContentService,
    DataStorageService,
    DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
