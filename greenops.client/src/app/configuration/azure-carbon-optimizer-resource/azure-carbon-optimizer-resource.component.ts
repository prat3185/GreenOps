import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-azure-carbon-optimizer-resource',
  templateUrl: './azure-carbon-optimizer-resource.component.html',
  styleUrls: ['./azure-carbon-optimizer-resource.component.css']
})
export class AzureCarbonOptimizerResourceComponent {
  @Input() resource: any;
  editMode = false;

  toggleEdit() {
    this.editMode = !this.editMode;
  }
}
