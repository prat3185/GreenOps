import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { AzurePipelineResource, AzureCarbonOptimizerResource, ProjectPipelineCarbonResponse } from '../models/resources.model';

@Injectable({ providedIn: 'root' })
export class ResourceService {
  private resourcesUrl = '/api/resources';
  private carbonUrl = '/api/pipelines';
  private allResources$ = new BehaviorSubject<(AzurePipelineResource | AzureCarbonOptimizerResource)[]>([]);

  constructor(private http: HttpClient) {}

  getAllResources(): Observable<(AzurePipelineResource | AzureCarbonOptimizerResource)[]> {
    return this.http.get<(AzurePipelineResource | AzureCarbonOptimizerResource)[]>(this.resourcesUrl)
      .pipe(tap(resources => this.allResources$.next(resources)));
  }

  getResourceById(id: string): AzurePipelineResource | AzureCarbonOptimizerResource | undefined {
    if (this.allResources$.value.length === 0) {
      this.getAllResources().subscribe(() => {
        return this.allResources$.value.find(r => r.id === id) as AzurePipelineResource | AzureCarbonOptimizerResource;
      });
    }
    return this.allResources$.value.find(r => r.id === id) as AzurePipelineResource | AzureCarbonOptimizerResource;
  }

  getPipelineCarbonData(): Observable<ProjectPipelineCarbonResponse[]> {
    return this.http.get<ProjectPipelineCarbonResponse[]>(this.carbonUrl);
  }
}
