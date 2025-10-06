import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin, map, BehaviorSubject, tap } from 'rxjs';
import { AzurePipelineResource, AzureCarbonOptimizerResource, ResourceType, GeographyOptions } from '../models/resources.model';

@Injectable({ providedIn: 'root' })
export class ResourceService {
	private azurePipelineUrl = '/api/azure-pipelines';
	private carbonOptimizerUrl = '/api/azure-carbon-optimizers';
	private allResources$ = new BehaviorSubject<(AzurePipelineResource | AzureCarbonOptimizerResource)[]>([]);

	constructor(private http: HttpClient) {}

	getAllResources(): Observable<(AzurePipelineResource | AzureCarbonOptimizerResource)[]> {
		return forkJoin([
			this.getAllAzurePipelines(),
			this.getAllCarbonOptimizers()
		]).pipe(
			map(([pipelines, optimizers]) => [...pipelines, ...optimizers]),
			tap(resources => this.allResources$.next(resources))
		);
	}	

	getAllAzurePipelines(): Observable<AzurePipelineResource[]> {
		const resources: AzurePipelineResource[] = [];
		for (let i = 1; i <= 2; i++) {
			resources.push({
				id: i.toString(),
				name: `Azure Pipeline ${i}`,
				resourceType: ResourceType.AzurePipeline,
				pipelineId: `pipeline-${i}`,
				organization: `org-${i}`,
				project: `project-${i}`,
				geography: `${GeographyOptions[0]}`
			});
		}
		return of(resources);
		//return this.http.get<AzurePipelineResource>(`${this.azurePipelineUrl}/${id}`);
	}

	getResourceById(id: string): AzurePipelineResource | AzureCarbonOptimizerResource | undefined {
		if(this.allResources$.value.length == 0){
			this.getAllResources().subscribe(
				() => {
					// Resource list is now populated
					return this.allResources$.value.find(r => r.id === id) as AzurePipelineResource | AzureCarbonOptimizerResource;
				}
			);
		}
		return this.allResources$.value.find(r => r.id === id) as AzurePipelineResource | AzureCarbonOptimizerResource;
	}

	createAzurePipeline(resource: AzurePipelineResource): Observable<AzurePipelineResource> {
		return this.http.post<AzurePipelineResource>(this.azurePipelineUrl, resource);
	}
	updateAzurePipeline(id: string, resource: AzurePipelineResource): Observable<AzurePipelineResource> {
		return this.http.put<AzurePipelineResource>(`${this.azurePipelineUrl}/${id}`, resource);
	}
	deleteAzurePipeline(id: string): void {
		this.allResources$.next(this.allResources$.value.filter(r => r.id !== id));
		//return this.http.delete<void>(`${this.azurePipelineUrl}/${id}`);
	}

	getAllCarbonOptimizers(): Observable<AzureCarbonOptimizerResource[]> {
		const resources: AzureCarbonOptimizerResource[] = [];
		for (let i = 3; i <= 4; i++) {
			resources.push({
				id: i.toString(),
				name: `Azure Carbon Optimizer ${i}`,
				resourceType: ResourceType.AzureCarbonOptimizer,
				subscriptionId: `optimizer-${i}`,
				tenantId: `org-${i}`,
				clientId: `client-${i}`
			});
		}
		return of(resources);
		//return this.http.get<AzureCarbonOptimizerResource>(`${this.carbonOptimizerUrl}/${id}`);
	}
	createCarbonOptimizer(resource: AzureCarbonOptimizerResource): Observable<AzureCarbonOptimizerResource> {
		return this.http.post<AzureCarbonOptimizerResource>(this.carbonOptimizerUrl, resource);
	}
	updateCarbonOptimizer(id: string, resource: AzureCarbonOptimizerResource): Observable<AzureCarbonOptimizerResource> {
		return this.http.put<AzureCarbonOptimizerResource>(`${this.carbonOptimizerUrl}/${id}`, resource);
	}
	deleteCarbonOptimizer(id: string): void {
		this.allResources$.next(this.allResources$.value.filter(r => r.id !== id));	
		//return this.http.delete<void>(`${this.carbonOptimizerUrl}/${id}`);
	}
}
