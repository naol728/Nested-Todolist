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
import Modal from "./Modal";
import TaskForm from "./Taskform";
import { useDispatch } from "react-redux";
import { addSubtask, removeTask } from "../features/taskSlice";

export default function TaskList({ task }) {
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskid, setTaskid] = useState(null);
  const priorityColors = {
    high: "bg-red-500 text-white",
    medium: "bg-yellow-500 text-white",
    low: "bg-green-500 text-white",
  };
  const dispatch = useDispatch();
  const handleAddtask = async (data) => {
    try {
      console.log(data);
      const taskData = { ...data, parentId: taskid };
      await dispatch(addSubtask({ taskid, taskData }));
    } catch (error) {
      console.log(error);
    }
  };
  const handleopen = (id) => {
    setIsModalOpen(true);
    setTaskid(id);
  };
  const deletetask = async (id) => {
    try {
      const response = await dispatch(removeTask(id));
      console.log(response);
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
    // async function fetchCollectionid() {
    //   await dispatch(fetchTasks(id));
    // }
    // fetchCollectionid();
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [taskid, dispatch]);
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-lg shadow-md bg-light-card border border-light-border dark:bg-dark-card dark:border-dark-border min-w-96 transition hover:shadow-lg">
      <div className="flex items-center gap-3">
        {task.completed ? (
          <CheckCircle className="text-green-500 w-5 h-5" />
        ) : (
          <Circle className="text-gray-400 w-5 h-5" />
        )}

        <div className="flex flex-col">
          <span className="font-semibold text-light-foreground dark:text-dark-foreground">
            {task.title}
          </span>
          <span className="text-sm text-light-secondary dark:text-dark-muted">
            {task.description}
          </span>

          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
              <Calendar className="w-4 h-4" />
              <span>{task.dueDate}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`px-2 py-1 text-xs font-bold rounded-full ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority}
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
              <button
                // onClick={() =>}
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-700 w-full"
              >
                <Edit size={16} className="mr-2" /> Edit
              </button>
              <button
                onClick={() => handleopen(task._id)}
                className="flex items-center  px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-gray-400 dark:hover:bg-gray-700 w-full"
              >
                <CirclePlus size={20} className="mr-2" /> add task
              </button>
              <button
                onClick={() => deletetask(task._id)}
                className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-400 dark:hover:bg-gray-700 w-full"
              >
                <Trash2 size={16} className="mr-2" /> Delete
              </button>
            </div>
          )}
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <TaskForm
            onClose={() => setIsModalOpen(false)}
            onSubmit={(data) => handleAddtask(data)}
          />
        </Modal>
      </div>
    </div>
  );
}
