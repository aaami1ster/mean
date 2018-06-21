# Angular Tutorial
By the end of the tutorial you will be able to do the following:
1. Use built-in Angular directives to show and hide elements and display lists of  data.
1. Create Angular components to display hero details and show an array of heroes.
1. Use one-way data binding for read-only data.
1. Add editable fields to update a model with two-way data binding.
1. Bind component methods to user events, like keystrokes and clicks.
1. Enable users to select a hero from a master list and edit that hero in the details view. 
1. Format data with pipes.
1. Create a shared service to assemble the heroes.
1. Use routing to navigate among different views and their components.

# Steps

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
## Edit Employees 
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
    
## Display employees list
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
1. Style the selected hero (class binding)
    ```html
    <li *ngFor="let employee of employees" 
        [class.selected]=" employee === selectedEmployee"
        (click)="onSelect(employee)">
    ```
    
## Master/Detail Components
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
    
    
## Employee Services
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

1. Provide the UserService. In app.module
    ```typescript
    import { EmployeeService } from './employee.service';
    ```
    ```typescript
    providers: [EmployeeService],
    ```
1. Update EmployeeComponent

    Import Userservice
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
