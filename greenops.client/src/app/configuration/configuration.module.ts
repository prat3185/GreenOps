
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './configuration.component';
import { AzurePipelineResourceComponent } from './azure-pipeline-resource/azure-pipeline-resource.component';
import { AzureCarbonOptimizerResourceComponent } from './azure-carbon-optimizer-resource/azure-carbon-optimizer-resource.component';
import { ConfigurationRoutingModule } from './configuration-routing.module';

@NgModule({
  declarations: [
    ConfigurationComponent,
    AzureCarbonOptimizerResourceComponent,
    AzurePipelineResourceComponent
  ],
  imports: [
  CommonModule,
  ConfigurationRoutingModule
  ],
  exports: [ConfigurationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfigurationModule {}
