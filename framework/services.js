import supertest from "supertest";
import { url } from "../framework/config";

//контроллер api queue/pet?timeout=N
const api = {

    get: (queue_name) => {
        return supertest(url)
            .get(queue_name)
    },

    getTimeout: (queue_name, timeout) => {
        return supertest(url)
            .get(`${queue_name}/?timeout=${timeout}`)
    },

    put: (queue_name, data) => {
        return supertest(url)
            .put(queue_name)
            .set('Accept', 'application/json')
            .send(data)
    }

};

export default api