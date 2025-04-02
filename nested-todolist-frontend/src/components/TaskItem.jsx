import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Edit, Trash2, PlusCircle } from "lucide-react";

const TaskItem = ({ subtask, onEdit, onDelete, onAddSubtask }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [addDropdownOpen, setAddDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const addDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        addDropdownRef.current &&
        !addDropdownRef.current.contains(event.target)
      ) {
        setAddDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`p-4 w-full rounded-lg shadow-md my-3 relative transition-colors duration-300 
      `}
    >
      <div className="flex items-center justify-between bg-light-card dark:bg-dark-card px-4 py-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md">
        <h3
          className={`font-semibold text-lg flex  transition-colors duration-300 flex-col
          `}
        >
          {subtask.completed ? "✅" : "⬜"} {subtask.title}
          <p className="text-gray-700 dark:text-gray-400 text-sm mt-1">
            {subtask.description}
          </p>
        </h3>

        <div className="relative flex items-center gap-2">
          <div ref={addDropdownRef} className="relative">
            <button
              onClick={() => setAddDropdownOpen(!addDropdownOpen)}
              className="text-green-600 dark:text-green-400 hover:text-green-500"
            >
              <PlusCircle size={20} />
            </button>

            {addDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-300 dark:bg-gray-800 shadow-lg rounded-lg overflow-visible z-50">
                <button
                  onClick={() => onAddSubtask(subtask._id)}
                  className="flex items-center px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-gray-400 dark:hover:bg-gray-700 w-full"
                >
                  <PlusCircle size={16} className="mr-2" /> Add Subtask
                </button>
              </div>
            )}
          </div>

          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
            >
              <MoreVertical size={20} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-gray-300 dark:bg-gray-800 shadow-lg rounded-lg overflow-visible z-50">
                <button
                  onClick={() => onEdit(subtask)}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-700 w-full"
                >
                  <Edit size={16} className="mr-2" /> Edit
                </button>
                <button
                  onClick={() => onDelete(subtask._id)}
                  className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-400 dark:hover:bg-gray-700 w-full"
                >
                  <Trash2 size={16} className="mr-2" /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {subtask.subtasks.length > 0 && (
        <div className="mt-3 pl-4   ">
          {subtask.subtasks.map((subtask) => (
            <TaskItem
              key={subtask.id}
              task={subtask}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddSubtask={onAddSubtask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskItem;
