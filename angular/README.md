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
    ```html
    <div style="text-align:center">
		<h1>{{ title }}</h1>
	</div>
    ```
## Employees 
1. Create employees component
	```shell
	ng generate component employees
	```
