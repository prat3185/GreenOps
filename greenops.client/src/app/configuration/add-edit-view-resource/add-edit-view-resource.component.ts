import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-resource',
  templateUrl: './add-edit-view-resource.component.html',
  styleUrls: ['./add-edit-view-resource.component.css']
})
export class AddEditResourceComponent implements OnInit {
  resource: any;
  isEditMode: boolean = false;
  isViewMode: boolean = false;
  isAddMode: boolean = false;

  constructor(private route: ActivatedRoute, private resourceService: ResourceService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.isViewMode = this.route.snapshot.url.some(segment => segment.path === 'view-resource');
    if (id) {
      this.resource = this.resourceService.getResourceById(id);
      if(!this.isViewMode){
        this.isEditMode = true;
      }
    }
    else{
      this.isAddMode = true;
    }
  }

  onResourceTypeChange(event: any) {
    if(this.resource){
      this.resource.resourceType = event.target.value;
    }
    else{
      this.resource = { resourceType: event.target.value };
    }
  }

  onSubmit() {
  }

  onCancel() {
    this.router.navigate(['/config']);
  }
}
