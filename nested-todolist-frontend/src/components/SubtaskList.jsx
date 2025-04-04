import {
  Calendar,
  CheckCircle,
  Circle,
  CirclePlus,
  Edit,
  MoreVertical,
  Trash2,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addSubtask, removeTask, toggleChecked } from "../features/taskSlice";
import Modal from "./Modal";
import TaskForm from "./Taskform";

export default function SubtaskList({ subtask, onSubtaskAdded }) {
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskid, setTaskid] = useState(null);
  const dispatch = useDispatch();
  const priorityColors = {
    high: "bg-red-500 text-white",
    medium: "bg-yellow-500 text-white",
    low: "bg-green-500 text-white",
  };

  const handleopen = (id) => {
    setIsModalOpen(true);
    setTaskid(id);
  };

  const handleAddtask = async (data) => {
    try {
      console.log(data);
      const taskData = { ...data, parentId: taskid };

      const response = await dispatch(addSubtask({ taskid, taskData }));

      if (response.meta.requestStatus === "fulfilled") {
        setIsModalOpen(false);
        onSubtaskAdded();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deletesubtask = async (id) => {
    try {
      await dispatch(removeTask(id));
      onSubtaskAdded();
    } catch (error) {
      console.log(error);
    }
  };
  const handleChecked = async (task) => {
    try {
      const response = await dispatch(toggleChecked(task));
      if (response.meta.requestStatus === "fulfilled") {
        onSubtaskAdded();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-2 mt-2">
      <div className="flex items-center justify-between px-4 py-3 rounded-lg shadow-md bg-light-card border border-light-border dark:bg-dark-card dark:border-dark-border min-w-96 transition hover:shadow-lg">
        <div
          className="flex items-center gap-3"
          onClick={() => handleChecked(subtask)}
        >
          {subtask.completed ? (
            <CheckCircle className="text-green-500 w-5 h-5" />
          ) : (
            <Circle className="text-gray-400 w-5 h-5" />
          )}

          <div className="flex flex-col">
            <span className="font-semibold text-light-foreground dark:text-dark-foreground">
              {subtask.title}
            </span>
            <span className="text-sm text-light-secondary dark:text-dark-muted">
              {subtask.description}
            </span>

            {subtask.dueDate && (
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                <Calendar className="w-4 h-4" />
                <span>{subtask.dueDate}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-2 py-1 text-xs font-bold rounded-full ${
              priorityColors[subtask.priority]
            }`}
          >
            {subtask.priority}
          </span>
          <div ref={dropdownRef} className="relative">
            <button
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-gray-300 dark:bg-gray-800 shadow-lg rounded-lg overflow-visible z-50">
                <button className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-700 w-full">
                  <Edit size={16} className="mr-2" /> Edit
                </button>
                <button
                  onClick={() => handleopen(subtask._id)}
                  className="flex items-center px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-gray-400 dark:hover:bg-gray-700 w-full"
                >
                  <CirclePlus size={20} className="mr-2" /> Add Subtask
                </button>
                <button
                  onClick={() => deletesubtask(subtask._id)}
                  className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-400 dark:hover:bg-gray-700 w-full"
                >
                  <Trash2 size={16} className="mr-2" /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {subtask.subtasks && subtask.subtasks.length > 0 && (
        <div className="ml-6 border-l-2 border-gray-300 dark:border-gray-600 pl-4">
          {subtask?.subtasks.map((childSubtask) => (
            <SubtaskList key={childSubtask._id} subtask={childSubtask} />
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskForm
          onClose={() => setIsModalOpen(false)}
          onSubmit={(data) => handleAddtask(data)}
        />
      </Modal>
    </div>
  );
}
