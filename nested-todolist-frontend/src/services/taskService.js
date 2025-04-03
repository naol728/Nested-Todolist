import apiClient from "./apiClient";

// task related stufs
const TASK_ENDPOINT = "/tasks";

export const getAllTasks = async (collectionId) => {
  const response = await apiClient.get(`${TASK_ENDPOINT}/${collectionId}`);
  return response.data;
};

export const getTask = async (taskId) => {
  const response = await apiClient.get(`${TASK_ENDPOINT}/single/${taskId}`);
  return response.data;
};

export const createTask = async (collectionId, taskData) => {
  console.log(collectionId, taskData);
  const response = await apiClient.post(
    `${TASK_ENDPOINT}/${collectionId}`,
    taskData
  );
  return response.data;
};

export const updateTask = async (taskId, taskData) => {
  const response = await apiClient.put(
    `${TASK_ENDPOINT}/single/${taskId}`,
    taskData
  );
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await apiClient.delete(`${TASK_ENDPOINT}/single/${taskId}`);
  return response.data;
};

export const addsubtask = async (taskid, taskData) => {
  const response = await apiClient.post(
    `${TASK_ENDPOINT}/single/${taskid}`,
    taskData
  );
  return response.data;
};
