import React, { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import { FiStar } from "react-icons/fi";
import { IoMdAdd, IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router";
import Modal from "./Modal";
import TaskList from "./TaskList";
import { LoaderPinwheel } from "lucide-react";
import {
  fetchCollection,
  toggleFavorite,
  toggleFavoriteOptimistic,
} from "../features/collectionSlice";
import { useDispatch, useSelector } from "react-redux";
import TaskForm from "./Taskform";
import { addTask, fetchTask, fetchTasks } from "../features/taskSlice";
import SubtaskList from "./SubtaskList";

export default function Tasks() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { collection, collections, loading } = useSelector(
    (state) => state.collections
  );
  const { tasks, loadingtask, task } = useSelector((state) => state.tasks);

  const fetchData = useCallback(async () => {
    dispatch(fetchCollection(id));
    dispatch(fetchTasks(id));
  }, [id, dispatch]);
  const handleFavoriteToggle = () => {
    dispatch(toggleFavoriteOptimistic({ collectionId: id })); // Optimistic update
    dispatch(
      toggleFavorite({
        collectionId: collection._id,
        favorite: collection.favorite,
      })
    );
  };

  const handleFetchEditTask = async (task) => {
    await dispatch(fetchTask(task._id));
  };

  const handleAddTask = async (data) => {
    try {
      const taskData = { ...data, parentId: id };
      const response = await dispatch(addTask({ id, taskData }));
      if (response.meta.requestStatus === "fulfilled") {
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading || loadingtask)
    return (
      <div className="flex justify-center items-center h-full">
        <LoaderPinwheel />
      </div>
    );

  return (
    <div className="flex flex-col h-full items-center">
      <div className="flex flex-col space-y-3 min-w-[50%]">
        <div className="flex space-x-3 items-center -ml-3">
          <Link to="/home">
            <Button type="add">
              <IoIosArrowBack />
            </Button>
          </Link>

          <span className="font-bold text-lg">
            {collection?.icon} {collection?.name}
          </span>
          <FiStar
            onClick={handleFavoriteToggle}
            className={`h-7 w-7 cursor-pointer ${
              collection?.favorite
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-400"
            }`}
          />
        </div>

        <div className="font-semibold flex space-x-3 items-center">
          <Button type="add" onClick={() => setIsModalOpen(true)}>
            <IoMdAdd />
          </Button>
          <span className="text-md"> add task</span>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <TaskForm
            onClose={() => setIsModalOpen(false)}
            onSubmit={(data) => handleAddTask(data)}
          />
        </Modal>

        <div className="flex space-y-3 flex-col">
          <div className="text-sm font-semibold">
            {collections.find((el) => el._id == id)?.totalTasks} tasks |
            {collections.find((el) => el._id == id)?.completedTasks}
          </div>
          <div className="ml-2">
            <div className="p-6 space-y-4">
              <div className="p-6">
                {tasks.map((task) => (
                  <div key={task._id} className="mb-6">
                    <TaskList
                      task={task}
                      onSubtaskAdded={fetchData}
                      handleEditTask={handleFetchEditTask}
                    />
                    <div className="ml-4">
                      {task.subtasks.map((subtask) => (
                        <SubtaskList
                          key={subtask._id}
                          subtask={subtask}
                          onSubtaskAdded={fetchData}
                          handleEditTask={handleFetchEditTask}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
