## Idea Proposal:
Develop a unified platform that calculates carbon consumption across various resources such as processes, containers, Kubernetes clusters, and cloud services. The solution would feature a dashboard for visualizing carbon data and recommendations and a settings page for configuring different resource connections. Users could easily add any type of resource——and immediately view its carbon footprint.

Connections could include services like Carbon Optimizer and Azure Pipelines (via Azure DevOps API). For process-level tracking, we could provide a downloadable script in connection page. All resource connections would be managed from a dedicated connection page, and the dashboard would display aggregated data with filtering options.

Additionally, we can include an IFU (Instructions for Use) containing detailed information on how to connect each resource and the methodology used for calculating carbon intensity for that resource. This approach offers a unique value proposition by consolidating carbon data from diverse sources in one place. (NO other such solution exist)

For a proof of concept, we could start by integrating two resource types, such as Carbon Optimizer and Azure Pipelines or a Process.

# GreenopsClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
