import axios from "../axios";

export const GetAllPersons = async () => await axios.get("/persons");

export const CreatePerson = async (data) => await axios.post("/persons", data);

export const DeletePerson = async (id) => await axios.delete(`/persons/${id}`);

export const UpdatePerson = async (data) => await axios.put("/persons", data);
