export enum api_error_code {
    unknown_error = -1,
    no_error,
    no_params,
    user_registered,
    sql_error,
    redis_error,
    http_error,
    auth_error,
    validation_error,
    image_error,

    // custom error code
    different_password
}
