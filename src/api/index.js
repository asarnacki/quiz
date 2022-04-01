import axios from "axios";

export const API = "http://localhost:59784"; 


export const ENDPOINTS = {
  participant: "participant",
  question: "question",
  getAnswers: "question/getanswers"
};


export function createEndpoint (endpoint) {
  let url = `${API}/api/${endpoint}/`;
  return {
    fetch: () => axios.get(url),
    fetchByID: (id) => axios.get(url + id),
    post: (newRecord) => axios.post(url, newRecord),
    put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
    delete: (id) => axios.delete(url + id),
  };
}
