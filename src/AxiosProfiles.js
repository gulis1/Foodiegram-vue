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

    function (error) {
        
        if (error.response.status === 401 || error.response.status === 403) {
            let refreshToken = window.localStorage.getItem('foodiegramRefresh');
                // If there's a stored refresh token, a new auth token is
                // requested and the request is retried.
                if (refreshToken) {
                    NoAuth.get('users/refresh', {params: {refreshToken: refreshToken}})
                    .then(res => {
                        // The new auth token is stored.
                        window.localStorage.setItem('foodiegramAuth', res.data.authToken);
                        
                        // The old request is send again with the new auth token.
                        error.config.headers = {'Authorization': 'Bearer ' + res.data.authToken};
                        
                        NoAuth.request(error.config)
                        .then(res => {return res})
                        .catch(() => {return Promise.reject(error)});
                    })
                    .catch(() => {
                        return Promise.reject(error);
                    })
                }

        }

        return Promise.reject(error);

    }
)


export {NoAuth, WithAuth};

