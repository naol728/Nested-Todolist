import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { useDispatch } from "react-redux";

import { addCollection } from "../features/collectionSlice";

export default function CollectionForm({ onClose }) {
  const [collection, setCollection] = useState({
    name: "",
    icon: "",
    favorite: false,
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollection((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleFavorite = () => {
    setCollection((prev) => ({ ...prev, favorite: !prev.favorite }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(addCollection(collection));
    console.log(result);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white dark:bg-dark-card rounded-lg shadow-md space-y-4 w-full max-w-md"
    >
      <div>
        <label className="block text-sm font-medium text-light-foreground dark:text-dark-foreground">
          Collection Name
        </label>
        <input
          type="text"
          name="name"
          value={collection.name}
          onChange={handleChange}
          required
          placeholder="Enter collection name"
          className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded-md bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-light-foreground dark:text-dark-foreground">
          Collection Icon (Emoji)
        </label>
        <input
          type="text"
          name="icon"
          value={collection.icon}
          onChange={handleChange}
          placeholder="Enter emoji (🔥, 📚, 🎵)"
          className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-700 rounded-md bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground"
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-light-foreground dark:text-dark-foreground">
          Mark as Favorite
        </span>
        <Switch
          checked={collection.favorite}
          onChange={handleToggleFavorite}
          className={`${
            collection.favorite
              ? "bg-light-primary dark:bg-dark-primary"
              : "bg-gray-300 dark:bg-gray-700"
          } relative inline-flex h-6 w-11 items-center rounded-full transition`}
        >
          <span className="sr-only">Toggle favorite</span>
          <span
            className={`${
              collection.favorite ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-md hover:bg-blue-600 transition"
        >
          Add Collection
        </button>
      </div>
    </form>
  );
}
