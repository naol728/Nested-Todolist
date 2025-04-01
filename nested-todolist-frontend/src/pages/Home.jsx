import React, { useEffect, useState } from "react";
import CollectionList from "../components/CollectionList";
import { FiStar } from "react-icons/fi";
import { Switch } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { getCapitalizedFirstName } from "../utils/formatString";
import {
  fetchCollections,
  toggleFavorite,
  toggleFavoriteOptimistic,
} from "./../features/collectionSlice";
import Modal from "../components/Modal";
import CollectionForm from "../components/CollectionForm";

export default function Home() {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { collections } = useSelector((state) => state.collections);
  const handleFavoriteToggle = (collection) => {
    dispatch(toggleFavoriteOptimistic({ collectionId: collection._id })); // Optimistic update
    dispatch(
      toggleFavorite({
        collectionId: collection._id,
        favorite: collection.favorite,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  const filteredCollections = showFavoritesOnly
    ? collections.filter((collection) => collection.favorite)
    : collections;

  return (
    <div className="px-2  sm:px-10 bg-light-background dark:bg-dark-background min-h-screen">
      {/* {user && ( */}
      <h2 className=" text-lg sm:text-2xl font-bold text-light-foreground dark:text-dark-foreground">
        👋 Hello {getCapitalizedFirstName(user?.name)}
      </h2>
      {/* )} */}
      <div className="flex justify-between items-center mt-3 mb-6">
        <h2 className=" text-lg sm:text-2xl font-bold text-light-foreground dark:text-dark-foreground">
          🗂️ Collections
        </h2>

        <div className="flex items-center space-x-2">
          <span>Favorites</span>
          <FiStar
            className={`h-5 w-5 ${
              showFavoritesOnly
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-400"
            }`}
          />
          <Switch
            checked={showFavoritesOnly}
            onChange={setShowFavoritesOnly}
            className={`${
              showFavoritesOnly
                ? "bg-light-primary dark:bg-dark-primary"
                : "bg-gray-300 dark:bg-gray-700"
            } relative inline-flex h-6 w-11 items-center rounded-full transition`}
          >
            <span className="sr-only">Show favorites only</span>
            <span
              className={`${
                showFavoritesOnly ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCollections.map((collection) => (
          <div
            key={collection._id}
            className="py-8 px-5 rounded-xl shadow-lg bg-light-card dark:bg-gray-900
                       text-light-foreground dark:text-dark-foreground 
                       hover:scale-105 transition-transform cursor-pointer relative"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteToggle(collection);
              }}
              className="absolute top-2 right-2"
            >
              <FiStar
                className={`h-5 w-5 ${
                  collection.favorite
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-400"
                }`}
              />
            </button>
            <CollectionList collection={collection} />
          </div>
        ))}

        <div
          className="px-5 py-8 rounded-xl shadow-lg bg-light-secondary dark:bg-dark-secondary 
                     flex justify-center items-center cursor-pointer
                     hover:scale-105 transition-transform"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="text-3xl text-light-foreground dark:text-dark-foreground">
            +
          </span>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add Collection"
        >
          <CollectionForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      </div>
    </div>
  );
}
