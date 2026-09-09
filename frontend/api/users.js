// ////////////////////////////////
import client from "./client";

export const getUsers = async () => {
  const response = await client.get("/users");
  return response.data.data;
};

export const getUserById = async (id) => {
  const response = await client.get(`/users/${id}`);
  return response.data.data;
};

export const createUser = async (user) => {
  const response = await client.post("/users", user);
  return response.data.data;
};

export const updateUser = async (id, user) => {
  const response = await client.put(`/users/${id}`, user);
  return response.data.data;
};

export const deleteUser = async (id) => {
  const response = await client.delete(`/users/${id}`);
  return response.data;
};
