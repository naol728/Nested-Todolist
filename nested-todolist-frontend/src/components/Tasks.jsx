import React, { useEffect, useState } from "react";
import Button from "./Button";
import { FiStar } from "react-icons/fi";
import { IoMdAdd, IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router";
import Modal from "./Modal";
import TaskList from "./TaskList";
import { LoaderPinwheel } from "lucide-react";
import TaskItem from "./TaskItem";
import {
  fetchCollection,
  toggleFavorite,
  toggleFavoriteOptimistic,
} from "../features/collectionSlice";
import { useDispatch, useSelector } from "react-redux";
import TaskForm from "./Taskform";
import { addTask, fetchTasks } from "../features/taskSlice";
import SubtaskList from "./SubtaskList";

// const collectionsData = [
//   {
//     id: 1,
//     name: "Work",
//     icon: "💼",
//     favorite: false,
//     totalTasks: 3,
//     completedTasks: 1,
//     tasks: [
//       {
//         id: 1001,
//         title: "Build API",
//         description: "Develop authentication API",
//         completed: false,
//         priority: "high",
//         subtasks: [
//           {
//             id: 2001,
//             title: "Design database schema",
//             description: "Develop authentication API",
//             completed: true,
//             subtasks: [
//               {
//                 id: 3001,
//                 title: "Create user table",
//                 description: "Develop authentication API",
//                 completed: true,
//                 subtasks: [
//                   {
//                     id: 4001,
//                     title: "Define user model in MongoDB",
//                     completed: false,
//                     subtasks: [],
//                   },
//                 ],
//               },
//             ],
//           },
//           {
//             id: 2002,
//             title: "Implement JWT authentication",
//             completed: false,
//             subtasks: [],
//           },
//         ],
//       },
//       {
//         id: 8884,
//         title: "Implement JWT authentication",
//         completed: false,
//         subtasks: [],
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Personal",
//     icon: "🧘",
//     favorite: true,
//     tasks: [
//       {
//         id: 1002,
//         title: "Morning Workout",
//         description: "Complete 30-minute exercise",
//         completed: false,
//         priority: "medium",
//         subtasks: [
//           {
//             id: 2003,
//             title: "Warm-up exercises",
//             completed: true,
//             subtasks: [
//               {
//                 id: 3002,
//                 title: "Stretching routine",
//                 completed: true,
//                 subtasks: [],
//               },
//             ],
//           },
//           {
//             id: 2004,
//             title: "Strength training",
//             completed: false,
//             subtasks: [
//               {
//                 id: 3003,
//                 title: "Upper body workout",
//                 completed: false,
//                 subtasks: [
//                   {
//                     id: 4002,
//                     title: "10 push-ups",
//                     completed: false,
//                     subtasks: [],
//                   },
//                   {
//                     id: 4003,
//                     title: "15 sit-ups",
//                     completed: false,
//                     subtasks: [
//                       {
//                         id: 4009,
//                         title: "step sis",
//                         completed: true,
//                         subtasks: [],
//                       },
//                     ],
//                   },
//                   {
//                     id: 40903,
//                     title: "15",
//                     completed: false,
//                     subtasks: [],
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];

export default function Tasks() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { collection, collections, loading } = useSelector(
    (state) => state.collections
  );
  const { tasks, loadingtask } = useSelector((state) => state.tasks);

  const handleFavoriteToggle = () => {
    dispatch(toggleFavoriteOptimistic({ collectionId: id })); // Optimistic update
    dispatch(
      toggleFavorite({
        collectionId: collection._id,
        favorite: collection.favorite,
      })
    );
  };
  const handleAddtask = async (data) => {
    try {
      const taskData = { ...data, parentId: id };
      const response = await dispatch(addTask({ id, taskData }));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // const recursive = (parentid) => {
  //   return (
  //     <div>
  //       {currentdata[0].tasks
  //         .filter((tasks) => tasks?.parentId == parentid)
  //         .map((task) => (
  //           <div key={task.id} className="mb-2 ml-4">
  //             <div className="w-full shadow-lg bg-light-card text-light-foreground dark:bg-dark-card dark:text-dark-foreground mb-2 px-4 py-1">
  //               <button
  //                 className={`mt-1 p-1 rounded-full ${
  //                   task.completed
  //                     ? "text-green-500"
  //                     : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
  //                 }`}
  //                 onClick={() => {}} // Placeholder for completion toggle
  //               >
  //                 {task.completed ? (
  //                   <CheckCircle size={20} className="fill-current" />
  //                 ) : (
  //                   <Circle size={20} />
  //                 )}
  //               </button>
  //               <div className="flex flex-col">
  //                 <span> {task.title}</span>
  //                 <span> {task.description}</span>
  //               </div>
  //               <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
  //                 <Calendar size={14} />
  //                 <span>
  //                   Due: {new Date(task.dueDate).toLocaleDateString()}
  //                 </span>
  //               </div>
  //             </div>

  //             {recursive(task.id)}
  //           </div>
  //         ))}
  //     </div>
  //   );
  // };

  useEffect(() => {
    async function fetchCollectionid() {
      await dispatch(fetchCollection(id));
      await dispatch(fetchTasks(id));
    }
    fetchCollectionid();
  }, [id, dispatch]);

  if (loading || loadingtask)
    return (
      <div className="flex justify-center items-center h-full">
        <LoaderPinwheel />
      </div>
    );
  return (
    <div className="flex flex-col h-full items-center">
      <div className="flex flex-col space-y-3  min-w-[50%] ">
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
            onSubmit={(data) => handleAddtask(data)}
          />
        </Modal>

        <div className="flex space-y-3 flex-col  ">
          <div className="text-sm font-semibold">
            {" "}
            {collections.find((el) => el._id == id)?.totalTasks} tasks |{" "}
            {collections.find((el) => el._id == id)?.completedTasks}{" "}
          </div>
          <div className="ml-2">
            <div className="p-6 space-y-4">
              <div className="p-6">
                {tasks.map((task) => (
                  <div key={task._id} className="mb-6">
                    <SubtaskList task={task} />
                    <div className="ml-4">
                      {task.subtasks.map((subtask) => (
                        <TaskItem key={subtask._id} task={subtask} />
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
