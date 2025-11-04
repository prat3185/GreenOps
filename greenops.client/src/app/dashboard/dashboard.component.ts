import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ResourceService } from '../services/resource.service';
import { 
  AzurePipelineResource, 
  AzureCarbonOptimizerResource, 
  ResourceType,
  ProjectPipelineCarbonResponse 
} from '../models/resources.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart', { read: ElementRef, static: true })
  protected chart!: ElementRef;
  azureCarbonOptimizerResources: AzureCarbonOptimizerResource[] = [];
  azurePipelineResources: AzurePipelineResource[] = [];
  allResources: (AzurePipelineResource | AzureCarbonOptimizerResource)[] = [];
  pipelineCarbonData: ProjectPipelineCarbonResponse[] = [];
  
  constructor(private resourceService: ResourceService) {}

  ngOnInit(): void {
    this.loadResources();
    this.loadPipelineCarbonData();
  }
  getData(): any {
    // get piplename and carbondata from this.pipelineCarbonData
    const carbonData = this.pipelineCarbonData[0].pipelines.map(p => ({ name: p.pipelineName, value: p.totalCarbon }));
    return {
      labels: carbonData.map(d => d.name),
      datasets: [
        {
          data: carbonData.map(d => d.value.toFixed(2)),
        }
      ],
    };
  }

  private loadResources(): void {
    this.resourceService.getAllResources().subscribe({
      next: (resources) => {
        this.allResources = resources;
        this.azureCarbonOptimizerResources = resources.filter(
          r => r.type === ResourceType.AzureCarbonOptimizer
        ) as AzureCarbonOptimizerResource[];
        console.log(this.azureCarbonOptimizerResources)
        
        this.azurePipelineResources = resources.filter(
          r => r.type === ResourceType.AzurePipeline
        ) as AzurePipelineResource[];
        console.log(this.azurePipelineResources)
      },
      error: (error) => {
        console.error('Error loading resources:', error);
      }
    });
  }

  private loadPipelineCarbonData(): void {
    this.resourceService.getPipelineCarbonData().subscribe({
      next: (carbonData) => {
        this.pipelineCarbonData = carbonData;
        console.log('Azure Pipeline Carbon Data:', carbonData);
        this.chart.nativeElement.data = this.getData()
      },
      error: (error) => {
        console.error('Error loading pipeline carbon data:', error);
      }
    });
  }
}
