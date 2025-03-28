import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Edit, Trash2, PlusCircle } from "lucide-react";

const TaskItem = ({ task, onEdit, onDelete, onAddSubtask }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [addDropdownOpen, setAddDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const addDropdownRef = useRef(null);

  const isSubtask = task.parentId !== null;

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
      className={`p-4 rounded-lg shadow-md my-3 relative transition-colors duration-300 
        ${
          isSubtask
            ? "border-l-4 border-blue-500 bg-gray-200 dark:bg-gray-800"
            : "bg-gray-100 dark:bg-gray-900"
        }`}
    >
      <div className="flex items-center justify-between">
        <h3
          className={`font-semibold text-lg flex items-center transition-colors duration-300
            ${
              isSubtask
                ? "text-blue-700 dark:text-blue-300"
                : "text-black dark:text-white"
            }`}
        >
          {task.completed ? "✅" : "⬜"} {task.title}
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
                  onClick={() => onAddSubtask(task.id)}
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
                  onClick={() => onEdit(task)}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-700 w-full"
                >
                  <Edit size={16} className="mr-2" /> Edit
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-400 dark:hover:bg-gray-700 w-full"
                >
                  <Trash2 size={16} className="mr-2" /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-400 text-sm mt-1">
        {task.description}
      </p>

      {task.subtasks.length > 0 && (
        <div className="mt-3 pl-4 border-l border-gray-400 dark:border-gray-600">
          {task.subtasks.map((subtask) => (
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
