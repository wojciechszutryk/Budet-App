export default function promiseMiddleware(){
    return function(next){
        return function(action){
            const {promise, type, ...others} = action;

            if (promise && typeof promise.then === 'function'){
                const MIDDLEWARE_REQUEST = `${type}_REQUEST`;
                const MIDDLEWARE_SUCCESS = `${type}_SUCCESS`;
                const MIDDLEWARE_FAILURE = `${type}_FAILURE`;

                next({type: MIDDLEWARE_REQUEST, ...others});

                return promise
                    .then(res => res.json())
                    .then(data => {
                        next({type: MIDDLEWARE_SUCCESS, payload: data, ...others});
                    })
                    .catch(err => {
                        next({type: MIDDLEWARE_FAILURE, err, ...others});
                    })
            }
            return next(action);
        }
    }
}