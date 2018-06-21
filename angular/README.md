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
    $ npm install -g @angular/cli
    $ ng new my-app
    $ cd my-app 
    $ ng serve –open
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
    change title in app.component.ts
    ```typescript
    export class AppComponent {
        title = 'HR Management';
    }
    ```
1. Edit app.component.html
    ```angular2html
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
1. Show employee property in _employees.component.html_
    ```angular2html
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
    ....
    import { Employee } from '../employee';
    .....
    export class EmployeesComponent implements OnInit {
    employee: Employee = {
       id: 1000,
       name: 'omer'
    };
    ......
    ```
 1. Show the hero object: replace _employees.component.html_
    ```angular2html
    <h2>{{ employee.name }} Details</h2>
    <div>
        <span>id: </span>{{employee.id}}
    </div>
    <div>
        <span>name: </span>{{employee.name}}
    </div>
    ```
    
1. Format employee.name with the UppercasePipe
    ```angular2html
    <h2>{{ employee.name | uppercase}} Details</h2>
    ```

1. Edit the employee  (Two-way binding):
    Refactor the details area in the _EmployeesComponent.html_
    ```angular2html
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