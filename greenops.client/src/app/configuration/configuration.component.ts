import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Resource, ResourceType } from '../models/resources.model';
import { ResourceService } from '../services/resource.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent {
  resources: Resource[] = [];

  constructor(private router: Router, private resourceService: ResourceService) {
    this.loadResources();
  }

  loadResources() {
    this.resourceService.getAllResources().subscribe(resources => {
      this.resources = resources;
    });
  }

  editResource(index: string) {
    this.router.navigate(['/config/edit-resource', index]);
  }

  addResource() {
    this.router.navigate(['/config/add-resource']);
  }

  deleteResource(id: string, type: ResourceType) {
    if (type === ResourceType.AzureCarbonOptimizer) {
      this.resourceService.deleteCarbonOptimizer(id);
    } else {
      this.resourceService.deleteAzurePipeline(id);
    }
    this.resources = this.resources.filter(resource => resource.id !== id);
  }

  viewResource(id: string) {
    this.router.navigate(['/config/view-resource', id]);
  }
}
