import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AzurePipelineResource, ResourceType } from '../../models/resources.model';

@Component({
  selector: 'app-azure-pipeline-resource',
  templateUrl: './azure-pipeline-resource.component.html',
  styleUrls: ['./azure-pipeline-resource.component.css']
})
export class AzurePipelineResourceComponent {
  @Input() resource: AzurePipelineResource = {
    id: '',
    name: '',
    resourceType: ResourceType.AzurePipeline, // Fixed type assignment
    pipelineId: '',
    organization: '',
    project: ''
  };
  @Input() isEditMode: boolean = false;
  @Output() save = new EventEmitter<AzurePipelineResource>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit() {
    this.save.emit(this.resource);
  }

  onCancel() {
    this.cancel.emit();
  }
}
