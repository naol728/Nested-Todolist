import apiClient from "./apiClient";

const COLLECTION_ENDPOINT = "/collections";

export const getAllCollections = async () => {
  const response = await apiClient.get(COLLECTION_ENDPOINT);
  return response.data;
};

export const togglefavorite = async (collectionId, favorite) => {
  const response = await apiClient.put(`/collections/${collectionId}`, {
    favorite: !favorite,
  });
  return response.data;
};

export const createCollection = async (collectionData) => {
  const response = await apiClient.post(COLLECTION_ENDPOINT, collectionData);
  return response.data;
};

export const getCollection = async (collectionId) => {
  const response = await apiClient.get(
    `${COLLECTION_ENDPOINT}/${collectionId}`
  );
  return response.data;
};

export const updateCollection = async (collectionId, collectionData) => {
  const response = await apiClient.put(
    `${COLLECTION_ENDPOINT}/${collectionId}`,
    collectionData
  );
  return response.data;
};

export const deleteCollection = async (collectionId) => {
  const response = await apiClient.delete(
    `${COLLECTION_ENDPOINT}/${collectionId}`
  );
  return response.data;
};
