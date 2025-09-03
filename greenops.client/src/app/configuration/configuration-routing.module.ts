import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './configuration.component';
import { AddEditResourceComponent } from './add-edit-view-resource/add-edit-view-resource.component';

const routes: Routes = [
  { path: '', component: ConfigurationComponent },
  { path: 'add-resource', component: AddEditResourceComponent },
  { path: 'edit-resource/:id', component: AddEditResourceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule {}
