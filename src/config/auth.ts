import * as dotenv from 'dotenv';

dotenv.config()

export default {

    /*
    |--------------------------------------------------------------------------
    | Static Token
    |--------------------------------------------------------------------------
    |
    | Static token provided to external non auth or non login method
    | Use static token match from Backend and Frondend to bypass data access
    |
    */

    static_token: process.env.STATIC_TOKEN || 'default_token_parse',


}