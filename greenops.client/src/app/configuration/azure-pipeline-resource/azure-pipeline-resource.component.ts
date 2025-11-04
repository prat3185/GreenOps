import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AzurePipelineResource, GeographyOptions, Resource, ResourceType } from '../../models/resources.model';

@Component({
  selector: 'app-azure-pipeline-resource',
  templateUrl: './azure-pipeline-resource.component.html',
  styleUrls: ['./azure-pipeline-resource.component.css']
})
export class AzurePipelineResourceComponent implements OnInit {
  @Input() resourceDetails: AzurePipelineResource;
  @Input() isEditMode: boolean = false;
  @Input() isViewMode: boolean = false;

  readonly geographyOptions: string[] = GeographyOptions;

  ngOnInit() {
    if (!this.resourceDetails) {
      this.resourceDetails = {
        id: '',
        name: '',
        type: ResourceType.AzurePipeline,
        pipelineId: '',
        organization: '',
        project: '',
        geography: ''
      };
    }
  }
}
