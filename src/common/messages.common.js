var date = new Date()

// Reset = "\x1b[0m"
// Bright = "\x1b[1m"
// Dim = "\x1b[2m"
// Underscore = "\x1b[4m"
// Blink = "\x1b[5m"
// Reverse = "\x1b[7m"
// Hidden = "\x1b[8m"

// FgBlack = "\x1b[30m"
// FgRed = "\x1b[31m"
// FgGreen = "\x1b[32m"
// FgYellow = "\x1b[33m"
// FgBlue = "\x1b[34m"
// FgMagenta = "\x1b[35m"
// FgCyan = "\x1b[36m"
// FgWhite = "\x1b[37m"

// BgBlack = "\x1b[40m"
// BgRed = "\x1b[41m"
// BgGreen = "\x1b[42m"
// BgYellow = "\x1b[43m"
// BgBlue = "\x1b[44m"
// BgMagenta = "\x1b[45m"
// BgCyan = "\x1b[46m"
// BgWhite = "\x1b[47m"

flags = {
    RED: '\x1b[31m%s\x1b[0m',
    YELLOW: '\x1b[33m%s\x1b[0m',
    GREEN: '\x1b[32m%s\x1b[0m',
    CYAN: '\x1b[36m%s\x1b[0m',
    WHITE: '\x1b[37m%s\x1b[0m'
 }
 

//messages for client
messages = {

    //common
    SPLIT: "-------------------------------------",
    CURRENT_ENV:"Current environment: ",
    SERVER_ERROR:'Oop! Something went wrong',

    //database
    DATABASE_SUCCESS_CONNECTION: "Database connection successful",
    DATABASE_ERROR_CONNECTION: "Something went wrong with the connection to the database",

    //server
    SERVER_SUCCESS_START: "Sever started",

    //jwt
    TOKEN_GENERATED: "Token generated",
    TOKEN_NOT_FOUND: "Token not found: Access denied",
    INVALID_TOKEN: "Invalid token: Access denied",
    EXPIRED_TOKEN: "Expired token",
    VALID_TOKEN: "Validated token",
    ERROR_TOKEN: "Oops! Something went wrong with the token",

    //bcrypt functions
    PASSWORD_CRYPT_ERROR: "Password crypt error",

    //api's
    GET_METHOD_SUCCESS: "Get method successful request: ",
    POST_METHOD_SUCCESS: "Post method successful request: ",
    PUT_METHOD_SUCCESS: "Put method successful request: ",
    DELETE_METHOD_SUCCESS: "Delete method successful request: ",
    ERROR_REQUEST: "Something went wrong with the request: ",
    BODY_NOT_FOUND: "Data not received",

    //users
    USER_NOT_FOUND: "User not found",
    EMAIL_ALREADY_EXISTS: "User already exists",
    USER_CREATED: "User created",
    EMAIL_NO_CHANGES: "The email hasn't changes",
    EMAIL_NOT_EXIST:"The email not exist",
    EMAIL_UPDATED: "Email was updated successfully",
    PASSWORDS_DO_NOT_MATCH: "Passwords do not match",
    DATA_MISSING:"Something is missing",
    USER_EMAIL_SENT:"A message was sent to confirm your e-mail",
    EMAIL_VERIFIED:'Email verified successfully',
    STATUS_USER_CH:'The status of the user has been modified',
    USER_LOCKED:'Account locked',

    //menu
    ITEM_INSERTED: "Item inserted",
    ITEM_UPDATED:"Menu item was updated successfully",

    //roles
    ROLE_INSERTED: "Role inserted",

 
    
    //login
    INVALID_EMAIL: "Invalid email",
    INVALID_PASSWORD: "Invalid password",
    ACCESS_ALLOWED: "Access allowed",
    INVALID_DATA: "Invalid data",
    SYSTEM_REQUEST:"System request: ",
    PROFILE_NOT_AUTHORIZED: "System not found",
    SHORT_SESSION_TIME: "Session allowed for one hour",
    LONG_SESSION_TIME: "Session allowed for one year",
    USER_NOT_VERIFIED: 'User not verified',

    //swagger

    SWAGGER_STARTED: "Swagger has begun on /api-doc",
    SWAGGER_ERROR: "Ooos, something went wrong with swagger",

    APP_VALIDATION: "Validating initial data, please wait...",
    APP_SUPER_USER_NOT_EXIST: "Super user not exists, Creating super user...",
    APP_SUPER_USER_CREATED: "Super user created, the access info is in env file...",
    APP_SUPER_USER_ROLE_NOT_EXIST: "Super user role not exists, Creating super user...",
    APP_SUPER_USER_ROLE_CREATED: "Super user role created, the access info is in env file...",
    APP_AUTH_NOT_EXIST: "App auth not exists, Creating super user...",
    APP_AUTH_CREATED: "App auth created, the access info is in env file...",
    INITIAL_DATA_OK: "Initial data ok...",

    //defaul
    SYSTEM_INSERTED: "The first systema has been created...",

    //recovery password
    EMAIL_SENT:"A message was sent to your email adress to you might recovery your password",
    EMAIL_NOT_SENT:"Oops! Something went wrong, mail not sent",
    PASSWORD_UPDATED:"Your password has been updated",
    PASSWORD_NOT_UPDATED:"Your password didn't been updated",

    //ssl configuration
    HTTP_MODE: "System started in HTTP mode",
    HTTPS_MODE: "System started in HTTPS mode",

    //initil data
    CORS_ORIGINS:"Origin allowed--> ",
    NO_ORIGIN_FOUND: "No origin found, a local origin will be created",
    SUPER_USER:"Super user found--> ",
    NO_SUPER_USER_FOUND: "No super user found, a super user will be created",
    ROLES_FOUND:"Role found--> ",
    NO_ROLES_FOUND: "No roles found, a roles list will be created",
    SYSTEMS_FOUND:"System found--> ",
    NO_SYSTEMS_FOUND: "No systems found, a system list will be created",

    //sockets
    SOCKETS_STARTED_SUCCESSFULY:"Sockets started successfuly",
    ERROR_MAIN_SOCKET:"Oops! Something went wrong, the sockets crashed",
    SOCKET_CONNECTION_ENABLED: "Socket connection enabled",
    SOCKET_CONNECTION_DISABLED: "Socket connection disabled",
    SOCKET_PERMISSION_DENIED: "Socket permission denied",
    SOCKET_COMMUNICATION_SUCCESS: "Socket communication success"
}
module.exports = {messages, flags}