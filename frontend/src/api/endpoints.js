import { get } from "../../src/api/axios";

export const endpoints = {
    animals: {
        create: '/animals',
        get: '/animals',
        filter: '/animals/filter',
        species: '/animals/species',
        getById: (id) => `/animals/${id}`,
        update: (id) => `/animals/${id}`,
        delete: (id) => `/animals/${id}`
    },

    adoptions: {
        create: '/adoptions',
        get: '/adoptions',
        getById: (id) => `/adoptions/${id}`,
        getByUserId: (userId) => `/adoptions/user/${userId}`,
        getByAnimalId: (animalId) => `/adoptions/animal/${animalId}`,
        updateStatus: (id) => `/adoptions/${id}/status`,
        delete: (id) => `/adoptions/${id}`
    },

    donations: {
        create: '/donations',
        get: '/donations',
        getById: (id) => `/donations/${id}`,
        getByUserId: (userId) => `/donations/user/${userId}`,
        update: (id) => `/donations/${id}`,
        delete: (id) => `/donations/${id}`
    },

    users: {
        get: '/users',
        getById: (id) => `/users/${id}`,
        getByUsername: (name) => `/users/username/${name}`,
        getByEmail: (email) => `/users/email/${email}`
    },

    auth: {
        register: '/auth/register',
        login: '/auth/login',
        logout: '/auth/logout',
        me: '/auth/me'
    },

    volunteers: {
        create: '/volunteers',
        get: '/volunteers',
        getById: (id) => `/volunteers/${id}`,
        getByUserId: (userId) => `/volunteers/user/${userId}`,
        getByAnimalId: (animalId) => `/volunteers/animal/${animalId}`,
        update: (id) => `/volunteers/${id}`,
        delete: (id) => `/volunteers/${id}`
    },

}

export default endpoints;