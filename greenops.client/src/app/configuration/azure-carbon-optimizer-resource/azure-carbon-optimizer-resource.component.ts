import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AzureCarbonOptimizerResource, ResourceType } from '../../models/resources.model';

@Component({
  selector: 'app-azure-carbon-optimizer-resource',
  templateUrl: './azure-carbon-optimizer-resource.component.html',
  styleUrls: ['./azure-carbon-optimizer-resource.component.css']
})
export class AzureCarbonOptimizerResourceComponent implements OnInit {
  @Input() resourceDetails: AzureCarbonOptimizerResource;
  @Input() isEditMode: boolean = false;
  @Input() isViewMode: boolean = false;

    ngOnInit() {
    if (!this.resourceDetails) {
      this.resourceDetails = {
        id: '',
        name: '',
        type: ResourceType.AzureCarbonOptimizer,
        subscriptionId: '',
        tenantId: '',
        clientId: ''
      };
    }
  }

}
