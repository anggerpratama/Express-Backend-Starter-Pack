import * as dotenv from 'dotenv';

dotenv.config()

export default {

    /*
    |--------------------------------------------------------------------------
    | Default Connection
    |--------------------------------------------------------------------------
    |
    | Connection defines the default connection settings to be used while
    | interacting with Mongo databases.
    |
    |
    */

    connection: process.env.DB_CONNECTION || 'mongodb',


    /*
    |--------------------------------------------------------------------------
    | Mongo DB
    |--------------------------------------------------------------------------
    |
    | Mongo DB is default database of restify, using no sql.
    | This app using mongoose driver for ORM
    |
    | npm i --save restify-mongoose
    |
    */

    mongodb: {
        connection_string: process.env.DB_CONNECTION_STRING,
        db_url: process.env.DB_HOST,
        db_port: process.env.DB_PORT,
        db_name: process.env.DB_NAME,
        db_authsource: process.env.DB_AUTHSOURCE,
        object:{
            id: process.env.DB_OBJECT_ID || 'false'
        }
    },

    /*
    |--------------------------------------------------------------------------
    | MySql DB
    |--------------------------------------------------------------------------
    |
    | MySql is RDBMS Database System for complex and 
    | Structured Data Sotre
    |
    | npm i --save mysql
    |
    */

    postgres: {
        db_host: process.env.DB_HOST || 'localhost',
        db_port: process.env.DB_PORT || '5432',
        db_user: process.env.DB_USER || 'postgres',
        db_password: process.env.DB_PASSWORD || '',
        db_name: process.env.DB_NAME || 'localhostdb'
    }
    
    
}