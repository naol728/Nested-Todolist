import React, { useState } from "react";
import { Switch } from "@headlessui/react";

export default function CollectionForm({ onSubmit, initialData, onClose }) {
  const [collection, setCollection] = useState(
    initialData || { name: "", icon: "", favorite: false }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollection((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleFavorite = () => {
    setCollection((prev) => ({ ...prev, favorite: !prev.favorite }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(collection); // Call parent function to save data
    onClose(); // Close modal after submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white dark:bg-dark-card rounded-lg shadow-md space-y-4 w-full max-w-md"
    >
      <h2 className="text-xl font-bold text-light-foreground dark:text-dark-foreground">
        {initialData ? "Edit Collection" : "Add New Collection"}
      </h2>

      {/* Name Input */}
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

      {/* Icon Input */}
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

      {/* Favorite Toggle */}
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

      {/* Submit & Cancel Buttons */}
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
          {initialData ? "Update Collection" : "Add Collection"}
        </button>
      </div>
    </form>
  );
}
