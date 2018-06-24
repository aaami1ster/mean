# Table of Contents
1. [Angular Tutorial](#angular-tutorial)
1. [Create New Angular app Using Angular CLI](#create-new-angular-app-using-angular-cli)
1. [Edit Employees](#edit-employees )
1. [Display employees list](#display-employees-list)
1. [Master/Detail Components](#masterdetail-components)
1. [Employee Services](#employee-services)
1. [Routing](#routing)
1. [HTTP](#http)

# Angular Tutorial
By the end of the tutorial you will be able to do the following:
1. Use built-in Angular directives to show and hide elements and display lists of  data.
1. Create Angular components to display employee details and show an array of employeees.
1. Use one-way data binding for read-only data.
1. Add editable fields to update a model with two-way data binding.
1. Bind component methods to user events, like keystrokes and clicks.
1. Enable users to select a employee from a master list and edit that employee in the details view. 
1. Format data with pipes.
1. Create a shared service to assemble the employeees.
1. Use routing to navigate among different views and their components.

# Create New Angular app Using Angular CLI

1. Install the Angular CLI globally

    ```zsh
    npm install -g @angular/cli
    ```

1. Create New Application
    ```zsh
    $ ng new my-app
    ```
1. Open the application in the browser
    ```zsh
    $ cd my-app 
    $ ng serve –open
    ```
1. Change the application title
    change title in _app.component.ts_
    ```typescript
    export class AppComponent {
        title = 'HR Management';
    }
    ```
1. Edit _app.component.html_
    ```html
    <div style="text-align:center">
       <h1>{{ title }}</h1>
	</div>
    ```
# Edit Employees 
1. Create employees component
	```shell
	ng generate component employees
	```
1. Declare EmployeesComponent (already done by cli)
1. Add a property to _employees.component.ts_
    ```typescript
    employee = 'abdalla';
    ```
1. Show employee property in _employees.component.html_ (Interpolation)
    ```html
    {{employee}}
    ```
1. create employee class _src/app/employee.ts_
    ```typescript
    export class Employee {
       id: number;
       name: string;
    }
    ```

1. in _employees.component.ts_ import Employee class, and initiate new employee class
    ```typescript
    import { Employee } from '../employee';
    ```
    ```typescript
    export class EmployeesComponent implements OnInit {
    employee: Employee = {
       id: 1000,
       name: 'omer'
    };
    ```
 1. Show the employee object: 
 
    replace _employees.component.html_ with following
    ```html
    <h2>{{ employee.name }} Details</h2>
    <div>
        <span>id: </span>{{employee.id}}
    </div>
    <div>
        <span>name: </span>{{employee.name}}
    </div>
    ```
    
1. Format employee.name with the UppercasePipe
    ```html
    <h2>{{ employee.name | uppercase}} Details</h2>
    ```

1. Edit the employee  (Two-way binding):
    
    Refactor the details area in the _EmployeesComponent.html_
    ```html
    <div>
        <label>name:
           <input [(ngModel)]="employee.name" placeholder="name">
        </label>
    </div>
    ```
    
1. Import The missing FormsModule:

    Open AppModule (_app.module.ts_) and import the FormsModule
    
    ```typescript
    import { FormsModule } from '@angular/forms';
    ```
    
    Then add FormsModule to the @NgModule metadata's imports array, which contains a list of external modules that the app needs.
    
    ```typescript
    imports: [
        ...
        FormsModule,
        ...
    ],
    ```
    
# Display employees list
1. Create mock
   
    Create a file called _mock-employees.ts_ in the _src/app_ folder. Define a EMPLOYEES constant as an array of ten employees and export it.
    
    ```typescript
    import { Employee } from './employee';
    
    export const EMPLOYEES: Employee[] =
    [
        { 'id': 1000, 'name': 'abdalla' },
        { 'id': 1001, 'name': 'omer' },
        { 'id': 1002, 'name': 'hassan' },
        { 'id': 1003, 'name': 'mohammed' },
        { 'id': 1004, 'name': 'ahmed' },
        { 'id': 1005, 'name': 'walleed' },
        { 'id': 1006, 'name': 'abbas' },
        { 'id': 1007, 'name': 'mohaned' },
        { 'id': 1008, 'name': 'osman' },
        { 'id': 1009, 'name': 'khalid' }
    ];
    ```
    
1. Displaying employees

    Open the employeesComponent class file (_employees/employees.component.ts_) and import the EMPLOYEES.
    ```typescript
    import { EMPLOYEES } from '../mock-employees';
    ```

    Add a employees property to the class that exposes these employees for binding.
    ```typescript
    employees = EMPLOYEES;
    ```
    
1. List users with *ngFor

    Open the EmployeesComponent template file and make the following changes:
    ```html
    <h2>My Employees</h2>
    <ul class="employees">
        <li *ngFor="let employee of employees">
           <span class="badge">{{employee.id}}</span> {{employee .name}}
        </li>
    </ul>
    ```
1. Style the employees list

1. Add a click event binding
    ```html
    <li *ngFor="let employee of employees" (click)="onSelect(employee)">
    ```

1. Add the click event handler 
    ```typescript
    selectedEmployee: Employee;
     
    ...
     
    onSelect(employee: Employee): void {
       this.selectedEmployee = employee;
    }
    
    ```

1. Update the details template
    ```html
    <h2>{{ selectedEmployee.name | uppercase }} Details</h2>
    <div>
    <span>id: </span>{{selectedEmployee .id}}</div>
    <div>
    <label>name:
    <input [(ngModel)]="selectedEmployee .name" placeholder="name">
    </label>
    </div>
    Hide empty details with *ngIf (fix default undefined issue)
    <div *ngIf="selectedEmployee">
     
    ....
     
    <div>
    ```
1. Style the selected employee (class binding)
    ```html
    <li *ngFor="let employee of employees" 
        [class.selected]=" employee === selectedEmployee"
        (click)="onSelect(employee)">
    ```
    
# Master/Detail Components
1. Create the EmployeeDetailComponent
    ```shell
    ng generate component employee-detail
    ```

1. write template
    ```html
    <div *ngIf="employee">
        <h2>{{ employee.name | uppercase}} Details</h2>
        <div>
            <span>id: </span>{{employee .id}}
        </div>
        <div>
            <label>name:
               <input [(ngModel)]="employee .name" placeholder="name">
            </label>
        </div>
    </div>
    ```

1. Add the __@Input()__ user property in _employee-detail.component.ts_

    The user property must be an Input property, annotated with the @Input() decorator, because the external EmployeesComponent will bind to it
    ```typescript
    import { Component, OnInit, Input } from '@angular/core';
    import { Employee } from '../employee';
    ```
    ```typescript
    @Input() employee: Employee;
    ```
1. Show the EmployeeDetailComponent

    Update the EmployeesComponent template

    ```html
    <app-employee-detail [employee]="selectedEmployee"></app-employee-detail>
    ```

    [employee]="selectedEmployee" is an Angular **property binding**.
    
    
# Employee Services
1. Create the EmployeeService
    ```shell
    ng generate service employee
    ```
    
1. Get employee data

    Import the Employee and EMPLOYEES.
    ```typescript
    import { Employee } from './employee';
    import { EMPLOYEES } from './mock-employees';
    ```

1. Add a getEmployees method to return the mock employees.
    ```typescript
    getEmployees(): Employee[] {
        return EMPLOYEES;
    }
    ```

1. Provide the EmployeeService. In app.module
    ```typescript
    import { EmployeeService } from './employee.service';
    ```
    ```typescript
    providers: [EmployeeService],
    ```
1. Update EmployeeComponent

    Import EmployeeService
    ```typescript
    import { EmployeeService } from '../employee.service';
    ```

1. Replace the definition of the employees property with a simple declaration.
    ```typescript
    employees: Employee[];
    ```
    
1. Inject  EmployeeService
    ```typescript
    constructor( private employeeService: EmployeeService) { }
    ```
1. Add getEmployees()
    ```typescript
    getEmployees(): void {
       this.employees = this.employeeService.getEmployees();
    }
    ```

1. Call it in ngOnInit
    ```typescript
    ngOnInit() {
        this.getEmployees();
    }
    ```

1. See it run
1. Observable data

    - This will not work in a real app.
    - EmployeeService.getEmployees() must have an asynchronous signature of some kind.
    - It can take a callback. It could return a Promise. It could return an Observable.
    - Observable EmployeeService
        ```typescript
        import { Observable } from 'rxjs/Observable';
        import { of } from 'rxjs/observable/of';
        ``` 
    - Subscribe in EmployeesComponent: Change the getEmployees to
        ```typescript
        getEmployees(): void {
          this.employeeService.getEmployees().subscribe(employees => this.employees = employees);
        }
        ```
# Routing

1. Add the AppRoutingModule

    An Angular best practice is to load and configure the router in a separate, top-level module that is dedicated to routing and imported by the root AppModule.

    ```shell 
    ng generate module app-routing --flat --module=app
    ```
    - --flat puts the file in src/app instead of its own folder.
    - --module=app tells the CLI to register it in the imports array of the AppModule.

    You generally don't declare components in a routing module so you can delete the @NgModule.declarations array and delete CommonModule references too.

    ```typescript
    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    
    @NgModule({
    export: [ RouterModule ],
    })
    export class AppRoutingModule { }
    ```
1. Add routes

    A typical Angular Route has two properties:
    1. path: a string that matches the URL in the browser address bar.
    1. component: the component that the router should create when navigating to this route.

    Import the EmployeesComponent so you can reference it in a Route. Then define an array of routes with a single route to that component.

    ```typescript
    import { EmployeesComponent } from './employees/employees.component';
    ```
    ```typescript
    const routes: Routes = [
    { path: 'employees', component: EmployeesComponent }
    ];
    ```

1. RouterModule.forRoot()

    Add RouterModule to the @NgModule.imports array and configure it with the routes in one step by callingRouterModule.forRoot() within the imports array, like this:
    ```typescript
    imports: [RouterModule.forRoot(routes) ],
    ```
    The method is called forRoot() because you configure the router at the application's root level. The forRoot() method supplies the service providers and directives needed for routing, and performs the initial navigation based on the current browser URL.

1. Add RouterOutlet

    Open the AppComponent template replace the <app-employees> element with a <router-outlet> element.
    ```html
    <div style="text-align:center">
    <h1>
    Welcome to {{ title }}!
    </h1>
    </div>
    <div>
    <router-outlet></router-outlet>
    </div>
    ```

1. Try it
    ```shell
    ng serve
    ```
1. Add a navigation link (routerLink)

    Open AppComponent
    ```html
    <div style="text-align:center">
    <h1>
    {{ title }}!
    </h1>
    </div>
    <nav>
    <a routerLink="/employees">Employees</a>
    </nav>
    <router-outlet></router-outlet>
    ```
1. Add a dashboard view
    ```shell
    ng generate component dashboard
    ```

1. replace dashboard.component.html
    ```html
    <h3>Top Employees</h3>
    <div class="grid grid-pad">
    <a *ngFor="let employee of employees" class="col-1-4">
    <div class="module employee">
    <h4>{{employee.name}}</h4>
    </div>
    </a>
    </div>
    ```

1. update dashboard.component.ts
    ```typescript
    import { Component, OnInit } from '@angular/core';
    import { Employee } from '../employee';
    import { EmployeeService } from '../employee.service';
    
    @Component({
        selector: 'app-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.css']
    })
    export class DashboardComponent implements OnInit {
    employees: Employee[];
        constructor(private employeeService: EmployeeService) { }
        
        ngOnInit() {
        this.getEmployees();
        }
        getEmployees(): void {
           this.employeeService.getEmployees().subscribe(employees => this.employees = employees.slice(1, 5));
        }
    }
    ```

1. add dashboard style 
1. Add the dashboard route
    ```typescript
    import { DashboardComponent } from './dashboard/dashboard.component';
    ```
    ```typescript
    { path: 'dashboard', component: DashboardComponent },
    
    ```

1. Add a default route
    ```typescript
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ```

1. Add dashboard link to the shell

    In AppComponent
    ```html
    <a routerLink="/dashboard">Dashboard</a>
   ```

1. Navigating to user details
    
    * The user should be able to get to these details in three ways.
        1. By clicking a employee  in the dashboard.
        2. By clicking a employee in the employees list.
        3. By pasting a "deep link" URL into the browser address bar that identifies the employee to display.
    * Delete employee details from EmployeesComponent
    * Open the employeesComponent template and delete the <app-employee-detail> element from the 	bottom.
    * Add  employee detail route
    * In app-routing.moudle
    ```typescript
    import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
    ```
    ```typescript
    { path: 'detail/:id', component: EmployeeDetailComponent },
    ```
        
    The colon (:) in the path indicates that :id is a placeholder for a specific employee id.
    
    * DashboardComponent employee links
        ```html
        <a *ngFor="let employee of employees" class="col-1-4" routerLink="/detail/{{employee.id}}">
        ```
        
        You're using Angular __interpolation__ binding within the *ngFor repeater to insert the current iteration's employee.id into each routerLink.
    
    * EmployeesComponent employee links
        ```html
        <a routerLink="/detail/{{employee.id}}"> 
              <span class="badge">{{employee.id}}</span> {{employee .name}}
        </a>
        ```

1. Remove dead code (optional)

    While the EmployeesComponent class still works, the onSelect() method 	and selectedEmployee property are no longer used.

1. Routable EmployeeDetailComponent

    - The EmployeeDetailComponent needs a new way to obtain the employee-to-display.
        - Get the route that created it, 
        - Extract the id from the route
        - Acquire the user with that id from the server via the EmployeeService
    
    - Add the following imports to _employee-detail.component.ts_
        ```typescript
        import { ActivatedRoute } from '@angular/router';
        import { Location } from '@angular/common';
        
        import { EmployeeService } from '../employee.service';
        ```

    - Inject the ActivatedRoute, EmployeeService, and Location services into the constructor, saving their values in private fields:
        ```typescript
        constructor(
        private route: ActivatedRoute,
        private employeeService: EmployeeService,
        private location: Location) { }
        ```

        - The __ActivatedRoute__ This component is interested in the route's bag of parameters extracted from the URL. The "id" parameter is the id of the employee to display.
        
        - The __location__ is an Angular service for interacting with the browser. You'll use it later to navigate back to the view that navigated here.

1. Extract the id route parameter
    In _user-detail.component.ts_

    ```typescript
    ngOnInit() {
        this.getEmployee();
    }
    getEmployee(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.employeeService.getEmployee(id).subscribe(user => this.employee = user);
    }
    ```
    - The __route.snapshot__ is a static image of the route information shortly after the component was created.
    - The __paramMap__ is a dictionary of route parameter values extracted from the URL. The "id" key returns the id of the employee to fetch.
    - Route parameters are always strings. The JavaScript (+) operator converts the string to a number, which is what a employee idshould be.

1. Add EmployeeService.getEmployee()
    ```typescript
    getEmployee(id: number): Observable<Employee> {
        return of(EMPLOYEES.find(user => user.id === id));
    }
    ```

1. Try it
    ```shell
    ng serve
    ```
1. Find the way back
    In user-detail.component.html
    ```html
    <button (click)="goBack()">go back</button>
    ```

    in user-detail.component.ts
    ```typescript
    goBack(): void {
        this.location.back();
    }
    ```

# HTTP

1. Enable HTTP services
    - __HttpClient__ is Angular's mechanism for communicating with a remote server over HTTP. 
    - To make HttpClient available everywhere in the app, open the root AppModule:
        - import the HttpClientModule symbol from @angular/common/http,
        - add it to the @NgModule.imports array.
        ```typescript
        import { HttpClientModule } from '@angular/common/http';
        ....
        
        imports: [
        ....
        HttpClientModule
        ],
        ```
    
1. Employees and HTTP employee.service

    Import some HTTP symbols that you'll need:
    ```typescript
    import { HttpClient, HttpHeaders } from '@angular/common/http';
   ```
    Inject HttpClient into the constructor in a private property called http.
    ```typescript
    constructor(private http: HttpClient) { }
    ```
    
1. add getemployees
    ```typescript
    getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>('http://localhost:3000/employees');
    }
    ```

1. fix CORS issue

    - Origin http://localhost:4200 is not allowed by Access-Control-Allow-Origin.
    - In app.js (server) add:
    ```javascript
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    ```


1. add getemployee
    ```typescript
    getEmployee(id: number) {
        return this.http.get<Employee>('http://localhost:3000/employees/' + id);
    }
    ```

