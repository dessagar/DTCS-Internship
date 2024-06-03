import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ImedoneFlowComponent } from './flow/imedone-flow/imedone-flow.component';
import { PmsFlowComponent } from './flow/pms/pms-flow/pms-flow.component';
import { PmsContentComponent } from './flow/pms/pms-content/pms-content.component';
import { CareFlowComponent } from './flow/care/care-flow/care-flow.component';
import { CareContentComponent } from './flow/care/care-content/care-content.component';
import { LsmFlowComponent } from './flow/lsm/lsm-flow/lsm-flow.component';
import { LsmContentComponent } from './flow/lsm/lsm-content/lsm-content.component';
import { BillingFlowComponent } from './flow/billing/billing-flow/billing-flow.component';
import { BillingContentComponent } from './flow/billing/billing-content/billing-content.component';
import { GrmFlowComponent } from './flow/grm/grm-flow/grm-flow.component';
import { GrmContentComponent } from './flow/grm/grm-content/grm-content.component';
import { DocopFlowComponent } from './flow/docop/docop-flow/docop-flow.component';
import { DocopContentComponent } from './flow/docop/docop-content/docop-content.component';
import { AskmeComponent } from './askme/askme.component';
import { TestFlowComponent } from './flow/test/test-flow/test-flow.component';
import { AmsFlowComponent } from './flow/ams/ams-flow/ams-flow.component';
import { AmsContentComponent } from './flow/ams/ams-content/ams-content.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { chatQuestionComponent } from './chatQuestion/chatQuestion.component';
import { Admin_dashboardComponent } from './admin_dashboard/admin_dashboard.component';
import { ClangComponent } from './clang/clang.component';
import {AdminSubjectComponent} from './admin-subject/admin-subject.component'
import { CarouselComponent } from './carousel/carousel.component';
import { AdminModuleComponent } from './admin-module/admin-module.component';
import { CreateSlideComponent } from './create-slide/create-slide.component';
import { AdminSubSectionComponent } from './admin-sub-section/admin-sub-section.component';
import { AdminPreviewComponent } from './admin-preview/admin-preview.component';
import { AdminSubtopicComponent } from './admin-subtopic/admin-subtopic.component';
import { DataPreviewComponent } from './data-preview/data-preview.component';
import { TileSubjectComponent } from './tile-subject/tile-subject.component';
import { SubjectformComponent } from './subjectform/subjectform.component';
import { SubcontentComponent } from './subcontent/subcontent.component';
import {CreateAdminComponent} from './create-admin/create-admin.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {EmptileSubjectComponent} from './emptile-subject/emptile-subject.component';
import { SlidercontentComponent } from './slidercontent/slidercontent.component';
import { NewsliderComponent } from './newslider/newslider.component';
 
const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  // { path: '#', redirectTo: '/signup' } ,
  {path:'MasterAdminlogin',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'home',component:HomeComponent},
  {path:'TrainingApp',component:DashboardComponent},
  {path:'imedOneFlow',component:ImedoneFlowComponent},
  {path:'pmsFlow',component:PmsFlowComponent},
  {path:'careFlow',component:CareFlowComponent},
  {path:'chatbot',component:ChatbotComponent},
  {path:'lsmFlow',component:LsmFlowComponent},
  {path:'billingFlow',component:BillingFlowComponent},
  {path:'grmFlow',component:GrmFlowComponent},
  {path:'docopFlowPage',component:DocopFlowComponent},
  {path:'pmsContent',component:PmsContentComponent},
  {path:'careContent',component:CareContentComponent},
  {path:'lsmContent',component:LsmContentComponent},
  {path:'billingContent',component:BillingContentComponent},
  {path:'grmContent',component:GrmContentComponent},
  {path:'docopContent',component:DocopContentComponent},
  {path:'askme',component:AskmeComponent},
  {path:'test',component:TestFlowComponent},
  {path:'amsFlowPage',component:AmsFlowComponent},
  {path:'chatQuestion',component:chatQuestionComponent},
  {path:'amsContent',component:AmsContentComponent},
  {path: 'clangpage', component:ClangComponent},
  {path:'Admin_dashboardComponent',component:Admin_dashboardComponent},
  {path: 'admin_subject',component:AdminSubjectComponent},
  {path:'carousel',component:CarouselComponent},
  {path:'adminmodule',component:AdminModuleComponent},
  {path:'createslide',component:CreateSlideComponent},
  { path: 'createslide/:_id', component: CreateSlideComponent },
  {path:'subsection',component:AdminSubSectionComponent},
  { path: 'admin_subtopic', component :AdminSubtopicComponent},
  {path: 'preview',component :AdminPreviewComponent},
  {path:'preview/:filename',component: AdminPreviewComponent},
  {path:'datapreview',component: DataPreviewComponent},
  {path:'tilesubject',component:TileSubjectComponent},
  {path:'subjectform',component:SubjectformComponent},
  { path:'tilesubject/:labelName', component: TileSubjectComponent },
  { path: 'admin_subtopic/:labelName', component: AdminSubtopicComponent },
  {path:'content',component:SubcontentComponent},
  { path: 'content/:labelName', component: SubcontentComponent },
  { path: 'subsection/:labelName', component: AdminSubSectionComponent },
  {path :'createAdmin', component: CreateAdminComponent},
  {path :'forgotPassword', component: ForgotPasswordComponent},
  {path : 'emptileSubject' ,component: EmptileSubjectComponent},
  {path : 'emptileSubject/:labelName' ,component: EmptileSubjectComponent},
  {path :'slidercontent',component:SlidercontentComponent},
  {path :'slidercontent/:labelName',component : SlidercontentComponent},
  {path :'newslider',component: NewsliderComponent},
  { path: 'newslider/:labelName', component: NewsliderComponent },
  { path: 'slidercontent/newslider/:labelName', component: NewsliderComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }