const BASE_URL = "http://localhost:3333";

const searchItems = () => {
    return fetch(`${BASE_URL}/item`)
    .then((response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw "something went wrong";
        }
    }).then((resJson) => {
        return resJson;
    }).catch((err) => {
        console.log("Err", err);
        return Promise.reject(err);
    })

}

const getItem = (id) => {
    return fetch(`${BASE_URL}/item/${id}`)
    .then((response) => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 404) {
            throw "Item not found";
        } else {
            throw "Something went wrong";
        }
    }) .then((resJson) => resJson)
    .catch((err) => {
        console.log("Err", err)
        return Promise.reject(err)
    })
}

const login = (email, password) => {
    return fetch (`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({ email, password }),
    }).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 400) {
            return response.json().then((err) => {
                throw err.error || "Invalid credentials";
            });
        } else {
            throw "Something went wrong";
        }
    }).catch((err) => {
        console.log("Login error: ", err);
        return Promise.reject(err);
    })
}

export const coreService = {
    searchItems,
    getItem,
    login
}