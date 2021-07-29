import Axios from 'axios'

const NoAuth = Axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 1000,
});

NoAuth.interceptors.response.use(
    function (response) {
        return response;
    },

    function (error) {

        if (error.response.status === 404) 
            window.location.href = "/404";
              
        return Promise.reject(error);
    }
);

const WithAuth = Axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 1000,
});

WithAuth.interceptors.request.use(

    function (config) {
        let token = 'Bearer  ' + window.localStorage.getItem('foodiegramAuth');
        config.headers = {'Authorization': token};
        return config;
    }
)

WithAuth.interceptors.response.use(
    
    function (response) {
        return response;
    },

    async function (error) {
        
        if (error.response.status === 401 || error.response.status === 403) {

            let refreshToken = window.localStorage.getItem('foodiegramRefresh');

            // If there's a stored refresh token, a new auth token is
            // requested and the request is retried.
            if (refreshToken) {
                
                try {

                    let authToken = await (await NoAuth.get('users/refresh', {params: {refreshToken: refreshToken}})).data.authToken;
                    window.localStorage.setItem('foodiegramAuth', authToken);
                    error.config.headers = {'Authorization': 'Bearer ' + authToken};

                    return await NoAuth.request(error.config);
                }

                catch {
                    return Promise.reject(error);
                }
            }

        }

        else
            return Promise.reject(error);
    }
)


export {NoAuth, WithAuth};

