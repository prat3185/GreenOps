import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Resource } from '../../models/resources.model';
import { ResourceService } from '../../services/resource.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-resource',
  templateUrl: './add-edit-view-resource.component.html',
  styleUrls: ['./add-edit-view-resource.component.css']
})
export class AddEditResourceComponent implements OnInit {
  @Output() save = new EventEmitter<any>(); // Emits the saved resource
  @Output() cancel = new EventEmitter<void>(); // Emits when the user cancels
  resource: Resource;
  isEditMode: boolean = false;
  isViewMode: boolean = false;

  constructor(private route: ActivatedRoute, private resourceService: ResourceService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.isViewMode = this.route.snapshot.url.some(segment => segment.path === 'view-resource');
    if (id) {
      this.resource = this.resourceService.getResourceById(id);
      if(!this.isViewMode){
        this.isEditMode = true;
      }
    }
  }

  onResourceTypeChange(type: any) {
    // Reset details when resource type changes
  }

  onSubmit() {
    this.save.emit(this.resource); // Emit the resource to the parent
  }

  onCancel() {
    this.cancel.emit(); // Emit cancel event to the parent
  }
}
