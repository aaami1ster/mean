# Table of Contents
1. [Installing MongoDB Locally](#installing-mongodb-locally)
1. [The Mongo Shell](#the-mongo-shell)
    1. [Start the mongo Shell](#start-the-mongo-shell)
    1. [Working with the mongo Shell](#working-with-the-mongo-shell)
        1. [Database](#database)
        1. [Collections](#collections)
        1. [CRUD Operations](#crud-operations)
    1. [Exit the Shell](#exit-the-shell)
1. [MongoDB Package Components](#mongodb-package-components)
    1. [Core Processes](#core-processes)
    1. [Binary Import and Export Tools](#binary-import-and-export-tools)
    1. [Data Import and Export Tools](#data-import-and-export-tools)
    1. [Diagnostic Tools](#diagnostic-tools)


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
The most important shell methods are list bellow. Find the full list of methods in [The mongo Shell Methods](https://docs.mongodb.com/manual/reference/method/) page.
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

# MongoDB Package Components
## Core Processes
The core components in the MongoDB package are: 
1. __mongod__ the core database process. 
1. __mongos__ the controller and query router for sharded clusters. 
1. __mongo__ the interactive MongoDB Shell.
## Binary Import and Export Tools
1. [mongodump](https://docs.mongodb.com/manual/reference/program/mongodump/)
    - provides a method for creating BSON dump files from the mongod instances
1. [mongorestore](https://docs.mongodb.com/manual/reference/program/mongorestore/)
    - makes it possible to restore these dumps. 
1. [bsondump](https://docs.mongodb.com/manual/reference/program/bsondump/)
    - converts BSON dump files into JSON.
## Data Import and Export Tools
1. [mongoimport](https://docs.mongodb.com/manual/reference/program/mongoimport/#bin.mongoimport) 
    - provides a method for taking data in JSON, CSV, or TSV and importing it into a mongod instance.
    - Run mongoimport from the system command line, not the mongo shell.
    - Use
        - imports the JSON data from the contacts.json file into the collection contacts in the users database.
            ```shell
            mongoimport --db users --collection contacts --file contacts.json
            ```
        - imports the csv formatted data in the /opt/backups/contacts.csv file into the collection contacts in the users database on the MongoDB instance running on the localhost port numbered 27017.
            ```shell
            mongoimport --db users --collection contacts --type csv --headerline --file /opt/backups/contacts.csv
            ```
            - mongoimport uses the input file name, without the extension, as the collection name if -c or --collection is unspecified
1. [mongoexport](https://docs.mongodb.com/manual/reference/program/mongoexport/#bin.mongoexport) 
    - provides a method to export data from a mongod instance into JSON, CSV, or TSV.
    - Run mongoexport from the system command line, not the mongo shell.
    - Use
        - Export in CSV Format
            > When you export in CSV format, you must specify the fields in the documents to export. The operation specifies the name and address fields to export.
            ```shell
            mongoexport --db users --collection contacts --type=csv --fields name,address --out /opt/backups/contacts.csv
            ```
        - Export in JSON Format
            ```shell
            mongoexport --db sales --collection contacts --out contacts.json
            ```
## Diagnostic Tools
1. [mongostat](https://docs.mongodb.com/manual/reference/program/mongostat/#bin.mongostat)
    - provides a quick overview of the status of a currently running mongod or mongos instance
    - similar to the UNIX/Linux file system utility vmstat, but provides data regarding mongod and mongos instances
    - Run mongostat from the system command line, not the mongo shell.
    ```shell
    mongostat
    ```
    - For more information about monitoring MongoDB, see [Monitoring for MongoDB](https://docs.mongodb.com/manual/administration/monitoring/).
1. [mongotop](https://docs.mongodb.com/manual/reference/program/mongotop/#bin.mongotop) 
    - provides a method to track the amount of time a MongoDB instance spends reading and writing data
    - provides statistics on a per-collection level
    - To force mongotop to return less frequently specify a number, in seconds at the end of the command
    - Run mongotop from the system command line, not the mongo shell.
    ```shell
    mongotop 15
    ```
    
# Authentication
1. create admin user
    ```
    db.createUser({user: "admin", pwd: "Admin@2018", roles:["root"]})
    ```
1. find mongod.conf file and enable authentication
    ```
    security:
        authorization: enabled
    ```
1. add user name drugdb-user to drug-db
    ```bash
    echo 'db.createUser({user:"drugdb-user", pwd:"12345678", roles:["readWrite"]});' > ./file.js
    ```
    ```bash
    mongo --port 27017 -u "admin" -p "Admin@2018" --authenticationDatabase "admin" drug-db file.js
    ```
    ```bash
    tailf /var/log/mongodb/mongod.log
    ```
    
# Aggregation
## [Aggregation Pipeline](https://docs.mongodb.com/manual/core/aggregation-pipeline/)
- The aggregation pipeline is a framework for data aggregation modeled on the concept of data processing pipelines. 
- Documents enter a multi-stage pipeline that transforms the documents into aggregated results
- The aggregation pipeline provides an alternative to map-reduce and may be the preferred solution for aggregation tasks where the complexity of map-reduce may be unwarranted.
- Aggregation pipeline have some limitations on value types and result size. 
- MongoDB provides the `db.collection.aggregate()` method in the mongo shell and the `aggregate` command for aggregation pipeline
## [Map Reduce](https://docs.mongodb.com/manual/core/map-reduce/)
- Map-reduce is a data processing paradigm for condensing large volumes of data into useful aggregated results. 
- For map-reduce operations, MongoDB provides the `mapReduce` database command.
## references
- [How to Do MongoDB Map-Reduce Jobs Easily | Studio 3T](https://studio3t.com/knowledge-base/articles/run-mongodb-map-reduce-jobs/)
- [MongoDB Aggregate | Tutorial points](https://www.tutorialspoint.com/mongodb/mongodb_aggregation.htm)