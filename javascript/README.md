# Declarations
# var keyword
- Declares a variable, optionally initializing it to a value.
- var and variables in **ES5** has scopes in functions.
    ````javascript
    function myFun(){
      for(var i = 0; i<10; i++) {
        console.log(i)
      }
      console.log(i)
    }
    ````
    - The first one will print out values 0 to 9 then the last console log will print the value 10.
    - that mean i  is valid outside for loop scope also
## let keyword
- Declares a block scope local variable, optionally initializing it to a value.
- let and variables in **ES6** are scoped in the braces {}
    ```javascript
    for(let i = 0; i<10; i++) {
      console.log(i)
    }
    console.log(i)
    ```
    - It will print 0–9 then throw a reference error as i is not in scope outside the braces
- don’t use `var` in JavaScript **ES6+**

## const keyword
- Declares a read-only named constant.
