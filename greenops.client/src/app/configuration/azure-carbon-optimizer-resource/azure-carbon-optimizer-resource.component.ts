import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AzureCarbonOptimizerResource, ResourceType } from '../../models/resources.model';

@Component({
  selector: 'app-azure-carbon-optimizer-resource',
  templateUrl: './azure-carbon-optimizer-resource.component.html',
  styleUrls: ['./azure-carbon-optimizer-resource.component.css']
})
export class AzureCarbonOptimizerResourceComponent {
  @Input() resource: AzureCarbonOptimizerResource = {
    id: '',
    name: '',
    resourceType: ResourceType.AzureCarbonOptimizer, // Fixed type assignment
    subscriptionId: '',
    tenantId: '',
    clientId: ''
  };
  @Input() isEditMode: boolean = false;
  @Output() save = new EventEmitter<AzureCarbonOptimizerResource>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit() {
    this.save.emit(this.resource);
  }

  onCancel() {
    this.cancel.emit();
  }
}
