import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AzurePipelineResource, AzureCarbonOptimizerResource } from '../models/resources.model';

@Injectable({ providedIn: 'root' })
export class ResourceService {
	private azurePipelineUrl = '/api/azure-pipelines';
	private carbonOptimizerUrl = '/api/azure-carbon-optimizers';

	constructor(private http: HttpClient) {}

	getAzurePipeline(id: string): Observable<AzurePipelineResource> {
		return this.http.get<AzurePipelineResource>(`${this.azurePipelineUrl}/${id}`);
	}
	createAzurePipeline(resource: AzurePipelineResource): Observable<AzurePipelineResource> {
		return this.http.post<AzurePipelineResource>(this.azurePipelineUrl, resource);
	}
	updateAzurePipeline(id: string, resource: AzurePipelineResource): Observable<AzurePipelineResource> {
		return this.http.put<AzurePipelineResource>(`${this.azurePipelineUrl}/${id}`, resource);
	}
	deleteAzurePipeline(id: string): Observable<void> {
		return this.http.delete<void>(`${this.azurePipelineUrl}/${id}`);
	}

	getCarbonOptimizer(id: string): Observable<AzureCarbonOptimizerResource> {
		return this.http.get<AzureCarbonOptimizerResource>(`${this.carbonOptimizerUrl}/${id}`);
	}
	createCarbonOptimizer(resource: AzureCarbonOptimizerResource): Observable<AzureCarbonOptimizerResource> {
		return this.http.post<AzureCarbonOptimizerResource>(this.carbonOptimizerUrl, resource);
	}
	updateCarbonOptimizer(id: string, resource: AzureCarbonOptimizerResource): Observable<AzureCarbonOptimizerResource> {
		return this.http.put<AzureCarbonOptimizerResource>(`${this.carbonOptimizerUrl}/${id}`, resource);
	}
	deleteCarbonOptimizer(id: string): Observable<void> {
		return this.http.delete<void>(`${this.carbonOptimizerUrl}/${id}`);
	}
}
