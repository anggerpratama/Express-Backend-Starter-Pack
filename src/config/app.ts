import * as dotenv from 'dotenv';

dotenv.config()

export default {

    /*
    |--------------------------------------------------------------------------
    | Application Name
    |--------------------------------------------------------------------------
    |
    | This value is the name of your application and can used when you
    | need to place the application's name in a email, view or
    | other location.
    |
    */

    app_name: process.env.APP_NAME || 'Express',

    /*
    |--------------------------------------------------------------------------
    | Application Port
    |--------------------------------------------------------------------------
    |
    | This value is the port of your application
    | Default Port is 3000
    |
    */

    app_port: process.env.APP_PORT || 3000,

    /*
    |--------------------------------------------------------------------------
    | Application Env
    |--------------------------------------------------------------------------
    |
    | This value is detect of this app work on some stage
    | Like default is Development stage, You can change it to production
    | if you are all ready to deploy it on real server
    |
    */

    app_env: process.env.NODE_ENV || 'development',

    /*
    |--------------------------------------------------------------------------
    | Application Version
    |--------------------------------------------------------------------------
    |
    | This value is detect used for sync version between platform
    | Main service version will affected to other platform
    |
    */

    app_version: process.env.APP_VERSION || '0.0.0',

    /*
    |--------------------------------------------------------------------------
    | Application CORS ALLOW ORIGIN
    |--------------------------------------------------------------------------
    |
    | This setting use for cors origin
    | 
    |
    */

    app_cors: process.env.CORS_ORIGIN?.split(',') || [],

    /*
    |--------------------------------------------------------------------------
    | Application Base URL
    |--------------------------------------------------------------------------
    |
    | This value is use for accessing base url of the site on
    |
    */

    app_base_url: process.env.BASE_URL || 'http://localhost:3000',

    /*
    |--------------------------------------------------------------------------
    | Application signature Table Print
    |--------------------------------------------------------------------------
    |
    | This value is use for spesific needed for printing table from redirect 
    | data table
    |
    */

    pre_html_sign: process.env.PRE_HTML_SIGN || '',

    /*
    |--------------------------------------------------------------------------
    | Application Timezone
    |--------------------------------------------------------------------------
    |
    | This value is use for set timezone of aplication location
    | Make sure this value is the same because we have task scheduler running
    |
    */

    timezone: process.env.TIME_ZONE || 'Asia/Jakarta',


}