import axios from "axios";

export const API = "http://localhost:58093";

export const ENDPOINTS = {
  participant: "participant",
  questions: "questions",
};

export const createEndpoint = (endpoint) => {
  let url = `${API}/api/${endpoint}/`;
  return {
    fetch: () => axios.get(url),
    fetchByID: (id) => axios.get(url + id),
    post: (newRecord) => axios.post(url, newRecord),
    put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
    delete: (id) => axios.delete(url + id),
  };
};
