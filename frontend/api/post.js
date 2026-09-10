import client from "./client";

export const getPosts = async () => {
  const response = await client.get("/posts");
  return response.data.data;
};
export const createPosts = async () => {
  const response = await client.post("/posts");
  return response.data.data;
};

export const getPostById = async (id) => {
  const response = await client.get(`/posts/${id}`);
  return response.data.data;
};

export const updatePost = async (id, post) => {
  const response = await client.put(`/posts/${id}`, post);
  return response.data.data;
};

export const deletePost = async (id) => {
  const response = await client.delete(`/posts/${id}`);
  return response.data;
};
