import axios from 'axios';

export const getSecretData = async () => {
    const response = await axios.get('https://raw.githubusercontent.com/Muhammad-GH/starwars-frontend/main/data/secret.json')

    return parseSecretMessage(response.data.message);
};

export const getEntityDetails = async (id) => {
    const response = await axios.get('https://akabab.github.io/starwars-api/api/id/' + id +'.json')

    return response.data;
};

const parseSecretMessage = (message) => {
    return JSON.parse(atob(message));
};
