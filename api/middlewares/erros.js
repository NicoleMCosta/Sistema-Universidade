export const criarErro = (StatusCode, message) => {
    const error = new Error()
    error.message = message;
    error.statusCode = StatusCode;
    return error; 
};