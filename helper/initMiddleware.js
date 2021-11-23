/* eslint-disable */
// https://github.com/vercel/next.js/blob/canary/examples/api-routes-cors/lib/init-middleware.js
export default function initMiddleware(middleware) {
    return (req, res) =>
        new Promise((resolve, reject) => {
            middleware(req, res, (result) => {
                if (result instanceof Error) {
                    return reject(result);
                }
                return resolve(result);
            });
        });
}
