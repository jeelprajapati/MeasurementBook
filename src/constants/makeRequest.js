import makeRequesInstance from "../utils/makeRequest";

export const makeRequest=makeRequesInstance(localStorage.getItem('token'));