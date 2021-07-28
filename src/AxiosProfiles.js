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
    headers: {'Authorization': 'Bearer '}
});

WithAuth.interceptors.response.use(
    
    function (response) {
        return response;
    },

    function (error) {

        if (error.response.status === 401 || error.response.status === 403) {
           
            // let token = window.localStorage.getItem('foodiegram_refresh');

            //     // if (!token || )

        }

    }
)

export {NoAuth, WithAuth};

