export const endpoints = {
    animals: {
        create: '/animals',
        get: '/animals',
        filter: '/animals/filter',
        species: '/animals/species',
        getById: (id) => `/animals/${id}`,
        update: (id) => `/animals/${id}`,
        delete: (id) => `/animals/${id}`
    }
}

export default endpoints;