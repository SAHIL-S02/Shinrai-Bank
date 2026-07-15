import axios from "axios";
import config from "@/config/config";

// Create a dedicated Axios instance for all authenticated API calls.
// This instance includes a response interceptor that automatically
// refreshes the access token when a 401 is received, then retries
// the original request — so the user stays logged in seamlessly.

const api = axios.create({
    baseURL: config.BACKEND_PORT,
    withCredentials: true, // always send cookies (refresh token)
});

// ---- token state shared across all callers ----

let _accessToken = "";
let _setAccessTokenFn = null; // will be wired up by AccessTokenContext
let _setIsLogedInFn = null;   // will be wired up by AccessTokenContext

export function wireTokenSetter(setAccessToken, setIsLogedIn) {
    _setAccessTokenFn = setAccessToken;
    _setIsLogedInFn = setIsLogedIn;
}

export function setMemoryToken(token) {
    _accessToken = token;
}

export function getMemoryToken() {
    return _accessToken;
}

// ---- request interceptor: attach access token to every request ----

api.interceptors.request.use((reqConfig) => {
    if (_accessToken) {
        reqConfig.headers.Authorization = `Bearer ${_accessToken}`;
    }
    return reqConfig;
});

// ---- response interceptor: auto-refresh on 401 ----

let refreshPromise = null; // prevents multiple simultaneous refresh calls

api.interceptors.response.use(
    (response) => response, // success — pass through
    async (error) => {
        const originalRequest = error.config;

        // Only attempt refresh for 401s that haven't already been retried
        // and are NOT the refresh-token call itself (to avoid infinite loop)
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/refresh-token")
        ) {
            originalRequest._retry = true;

            try {
                // Deduplicate: if a refresh is already in flight, wait for it
                if (!refreshPromise) {
                    refreshPromise = axios.get(
                        `${config.BACKEND_PORT}/api/auth/refresh-token`,
                        { withCredentials: true }
                    );
                }

                const res = await refreshPromise;
                refreshPromise = null;

                const newToken = res.data.newAccessToken;

                // Update in-memory token
                _accessToken = newToken;

                // Sync React state if wired
                if (_setAccessTokenFn) _setAccessTokenFn(newToken);
                if (_setIsLogedInFn && res.data.success) _setIsLogedInFn(true);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                refreshPromise = null;

                // Refresh failed — user's session is truly expired
                _accessToken = "";
                if (_setAccessTokenFn) _setAccessTokenFn("");
                if (_setIsLogedInFn) _setIsLogedInFn(false);

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
