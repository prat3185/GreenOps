import { Component } from '@angular/core';
import { Resource, ResourceType } from '../models/resources.model';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent {
  resources: Resource[] = [
    { id: "1", name: 'AzurePipeline', resourceType: ResourceType.AzurePipeline },
    { id: "2", name: 'AzureCarbonOptimizer', resourceType: ResourceType.AzureCarbonOptimizer }
  ];

  editResource(index: number) {
    // Implement edit logic here (e.g., open a modal or inline edit)
    alert('Edit resource: ' + this.resources[index].name);
  }

  addResource() {
  }
}
