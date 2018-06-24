# Table of Contents
1. [Installing MongoDB Locally](#installing-mongodb-locally)
1. [The MongoDB Shell](#the-mongodb-shell)
    1. [Connecting to MongoDB](#connecting-to-mongodb)
    1. [Database](#database)
    1. [Collections](#collections)
    1. [CRUD Operations](#crud-operations)

# Installing MongoDB Locally 
- Follow step to download and install the latest stable release from [mongo download page](https://www.mongodb.com/download-center?#community)
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

    
# The MongoDB Shell 

## Connecting to MongoDB 
```
mongo
```
## Database
1. List dbs
    ```
    show dbs
    ```
1. Show current db
    ```
    db
    ```
1. Open existing/create new db
    ```
    use <db-name>
    ```
1. Drop current db
    ```
    db.dropDatabase()
    ```
## Collections
1. Show current db collections
    ```
    show collections
    ```
1. List collection records
    ```
    db.<collection-name>.find()
    ```
1. List collection indexes
    ```
    db.<collection-name>.getIndexes()
    ```
1. Delete collection
    ```
    db.<collection-name>.drop()
    ```
    ```
   db.people.drop()
   ```
# CRUD Operations
1. Insert new data
    ```
    db.<collection-name>.insert(object)
    ```
1. Retrieving data
    ```
    db.<collection-name>.find(query, projection)
    ```
1. Updating data
    ```
    db.<collection-name>.update(query, update, options)
    ```
1. Deleting data
    ```
    db.<collection-name>.remove(query, justOne)
    ```

1. Inserting New Data 

   __db__ is the root object of the database, which you can use to manipulate data 
    ```
    > db.people.insert({name: 'Abdalla Elsayed'})
   ```
   ```
    > db.people.insert([{name: 'Abdulrahman'},{name: 'MOhammed'}])
    ```
   - This command adds the object {name: 'Abdalla Elsayed'} to the people collection of the mydb database. Since the mydb database doesn’t technically exist yet, Mongo creates it now 
   - Multiple items can be added in one insert() call by passing in an array of objects 
   
1. Retrieving Data 
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
   
1. Updating Data 
    ```
    > db.people.update({name: 'Abdalla Elsayed'}, {$set: {name: 'Abdullah Elsayed'}}) 
    ```
    ```
    > db.people.update({name: 'Abdalla Elsayed'}, {$set: {name: 'Abdullah Elsayed', terms: 2}}) 
    ```
1. Deleting Data 
   ```
   db.people.remove({name: {$regex: 'Abd$'}}, {justOne: true})
   ```