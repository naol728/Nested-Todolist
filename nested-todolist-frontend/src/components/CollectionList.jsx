import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import { removeCollection } from "../features/collectionSlice";

export default function CollectionList({ collection }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async (collection) => {
    await dispatch(removeCollection(collection._id));
  };
  return (
    <>
      <div className="flex items-center justify-between p-4 bg-light-background dark:bg-dark-background rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div>
          <h3 className="text-xl text-light-foreground dark:text-dark-foreground font-semibold">
            {collection.icon} {collection.name}
          </h3>
          <p className="text-light-secondary dark:text-dark-muted text-sm">
            {collection.completedTasks}/{collection.totalTasks} done
          </p>
        </div>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
            aria-label="Update Collection"
          >
            <FaEdit />
          </button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="update the collection"
          >
            <div></div>
          </Modal>
          <button
            onClick={() => handleDelete(collection)}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
            aria-label="Delete Collection"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </>
  );
}
