import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-azure-pipeline-resource',
  templateUrl: './azure-pipeline-resource.component.html',
  styleUrls: ['./azure-pipeline-resource.component.css']
})
export class AzurePipelineResourceComponent {
  @Input() resource: any;
  editMode = false;

  toggleEdit() {
    this.editMode = !this.editMode;
  }
}
