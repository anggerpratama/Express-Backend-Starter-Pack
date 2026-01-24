import * as dotenv from 'dotenv';

dotenv.config()

export default {

    /*
    |--------------------------------------------------------------------------
    | JsonWebToken Key Secret
    |--------------------------------------------------------------------------
    |
    | Please Configure the JsonWebToken Key to active and use the JWT Auth
    | You can define in .env or ignore it as default
    |
    | npm install --save jsonwebtoken restify-jwt
    |
    */

    redis_url: process.env.REDIS_URL || 'localhost',

    /*
    |--------------------------------------------------------------------------
    | Session Secret Key
    |--------------------------------------------------------------------------
    |
    | This key is used to sign and secure session cookies.
    | Define SESSION_KEY in your .env file for production security.
    | If not set, a default value is used (not recommended for production).
    |
    */
    session_key: process.env.SESSION_KEY || 'government-secret-key',


}