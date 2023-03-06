const BASE_URL = 'http://localhost:8080';

let JWTHeader = {
    Authorization: 'Bearer ' + $.cookie('jwt')
};
