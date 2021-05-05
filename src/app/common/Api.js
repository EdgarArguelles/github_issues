/**
 * Call an Api endpoint, process it and return a promise
 * @param {string} endpoint Api endpoint
 * @param {Object} options fetch options
 * @return {Object} resulted promise
 */
const fetchAPI = async (endpoint, options = {}) => {
    try {
        const response = await fetch(endpoint, options);
        return await response.json();
    } catch (error) {
        // handle error
        throw error;
    }
};

export default class Api {
    /**
     * Call an Api endpoint via GET that returns a Json
     * @param {string} endpoint Api endpoint
     * @param {Object} options fetch options
     * @return {Object} resulted promise
     */
    static getJSON(endpoint, options = {}) {
        return fetchAPI(endpoint, {
            ...options,
            method: 'GET',
            headers: {...options.headers, Accept: 'application/json'},
        });
    }

    /**
     * Call an Api endpoint via POST that returns a Json
     * @param {string} endpoint Api endpoint
     * @param {Object} body fetch body
     * @param {Object} options fetch options
     * @return {Object} resulted promise
     */
    static postJSON(endpoint, body, options = {}) {
        return fetchAPI(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                ...options.headers,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    }

    /**
     * Call an Api endpoint via PUT that returns a Json
     * @param {string} endpoint Api endpoint
     * @param {Object} body fetch body
     * @param {Object} options fetch options
     * @return {Object} resulted promise
     */
    static putJSON(endpoint, body, options = {}) {
        return fetchAPI(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                ...options.headers,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    }

    /**
     * Call an Api endpoint via DELETE that returns a Json
     * @param {string} endpoint Api endpoint
     * @param {Object} options fetch options
     * @return {Object} resulted promise
     */
    static deleteJSON(endpoint, options = {}) {
        return fetchAPI(endpoint, {
            ...options,
            method: 'DELETE',
            headers: {
                ...options.headers,
                Accept: 'application/json',
            },
        });
    }
}