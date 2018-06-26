# Table of Contents
1. [Installing MongoDB Locally](#installing-mongodb-locally)
1. [The Mongo Shell](#the-mongo-shell)
    1. [Start the mongo Shell](#start-the-mongo-shell)
    1. [Working with the mongo Shell](#working-with-the-mongo-shell)
        1. [Database](#database)
        1. [Collections](#collections)
        1. [CRUD Operations](#crud-operations)
    1. [Exit the Shell](#exit-the-shell)

# Installing MongoDB Locally 
- Follow step to download and install the latest stable release from [Install MongoDB Tutorial](https://docs.mongodb.com/manual/installation/#tutorial-installation)
- verify installation by
    ```shell
    mongod -version
    ```
    ```b version v3.4.10
     git version: 078f28920cb24de0dd479b5ea6c66c644f6326e9
     OpenSSL version: OpenSSL 1.0.2n  7 Dec 2017
     allocator: system
     modules: none
     build environment:
         distarch: x86_64
         target_arch: x86_64
     ```

    
# The Mongo Shell
- The mongo shell is an interactive JavaScript interface to MongoDB. 
- You can use the mongo shell to query and update data as well as perform administrative operations.

## Start the mongo Shell
- Open terminal and type
    ```shell
    mongo
    ```
    > Make Sure you have added the \<mongodb installation dir\>/bin to the PATH environment variable
- Press Enter. The terminal input character will change to > (this is the mongodb shell)

## Working with the mongo Shell
### Database
1. List dbs
    ```
    > show dbs
    ```
1. To display the database you are using, type db
    ```
    > db
    ```
1. Open existing/create new db
    > use \<db-name\>
    ```
    > use mydb
    ```
1. Drop current db
    ```
    > db.dropDatabase()
    ```
### Collections
1. Show current db collections
    ```
    > show collections
    ```
1. List collection records
    > db.\<collection-name\>.find()
    
    ```
    db.people.find()
    ```
    
1. Delete collection
    > db.\<collection-name\>.drop()
    ```
   db.people.drop()
   ```
### [CRUD Operations](https://docs.mongodb.com/manual/crud/)
1. Insert Documents
    > db.\<collection-name\>.insert(object)
  
    ```
    > db.people.insert({name: 'Abdalla Elsayed'})
   ```
   ```
    > db.people.insert([{name: 'Abdulrahman'},{name: 'MOhammed'}])
    ```
    - __db__ is the root object of the database, which you can use to manipulate data 
    - This command adds the object {name: 'Abdalla Elsayed'} to the people collection of the mydb database. Since the mydb database doesn’t technically exist yet, Mongo creates it now 
    - Multiple items can be added in one insert() call by passing in an array of objects 
   
1. Query Documents
    > db.\<collection-name\>.find(query, projection)
    ```
    > db.people.find() 
    ```
    ```
    > db.people.find({name: {$regex: '^Abd'}})  
    ```
    ```
    > db.people.findOne({name: {$regex: '^Abd'}}) 
    ```
    ```
    > db.people.find().limit(2); 
    ```
       
1. Update Documents
    > db.\<collection-name\>.update(query, update, options)
    ```
    > db.people.update({name: 'Abdalla Elsayed'}, {$set: {name: 'Abdullah Elsayed'}}) 
    ```
    ```
    > db.people.update({name: 'Abdalla Elsayed'}, {$set: {name: 'Abdullah Elsayed', terms: 2}}) 
    ```
1. Delete Documents
    > db.\<collection-name\>.remove(query, justOne)
    ```
   > db.people.remove({name: {$regex: 'Abd$'}}, {justOne: true})
   ```
## Exit the Shell
To exit the shell, type quit() or use the \<Ctrl-C\> shortcut.

   