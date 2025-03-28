import React, { useState } from "react";
import Button from "./Button";
import { FiStar } from "react-icons/fi";
import { IoMdAdd, IoIosArrowBack } from "react-icons/io";
import { useParams } from "react-router";
import Modal from "./Modal";
import TaskList from "./TaskList";
import { Calendar, CheckCircle, Circle } from "lucide-react";
import TaskItem from "./TaskItem";

// const coll = [
//   {
//     id: 1,
//     name: "Design",
//     icon: "🎨",
//     favorite: false,
//     totalTasks: 3,
//     completedTasks: 1,
//     tasks: [
//       {
//         id: 101,
//         title: "task1",
//         description: "Design the main UI wireframe in Figma.",
//         completed: true,
//         createdAt: "2024-03-01T10:30:00Z",
//         dueDate: "2024-03-05T23:59:00Z",
//         priority: "high",
//         tags: ["UI/UX", "Figma"],
//         parentId: null,
//       },
//       {
//         id: 191,
//         title: "bbbbbbb",
//         description: "Design the main UI wireframe in Figma.",
//         completed: false,
//         createdAt: "2024-03-01T10:30:00Z",
//         dueDate: "2024-03-05T23:59:00Z",
//         priority: "high",
//         tags: ["UI/UX", "Figma"],
//         parentId: 101,
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Design",
//     icon: "🎨",
//     favorite: false,
//     totalTasks: 3,
//     completedTasks: 1,
//     tasks: [],
//   },
// ];

const collectionsData = [
  {
    id: 1,
    name: "Work",
    icon: "💼",
    favorite: false,
    totalTasks: 3,
    completedTasks: 1,
    tasks: [
      {
        id: 1001,
        title: "Build API",
        description: "Develop authentication API",
        completed: false,
        priority: "high",
        subtasks: [
          {
            id: 2001,
            title: "Design database schema",
            description: "Develop authentication API",
            completed: true,
            subtasks: [
              {
                id: 3001,
                title: "Create user table",
                description: "Develop authentication API",
                completed: true,
                subtasks: [
                  {
                    id: 4001,
                    title: "Define user model in MongoDB",
                    completed: false,
                    subtasks: [],
                  },
                ],
              },
            ],
          },
          {
            id: 2002,
            title: "Implement JWT authentication",
            completed: false,
            subtasks: [],
          },
        ],
      },
      {
        id: 8884,
        title: "Implement JWT authentication",
        completed: false,
        subtasks: [],
      },
    ],
  },
  {
    id: 2,
    name: "Personal",
    icon: "🧘",
    favorite: true,
    tasks: [
      {
        id: 1002,
        title: "Morning Workout",
        description: "Complete 30-minute exercise",
        completed: false,
        priority: "medium",
        subtasks: [
          {
            id: 2003,
            title: "Warm-up exercises",
            completed: true,
            subtasks: [
              {
                id: 3002,
                title: "Stretching routine",
                completed: true,
                subtasks: [],
              },
            ],
          },
          {
            id: 2004,
            title: "Strength training",
            completed: false,
            subtasks: [
              {
                id: 3003,
                title: "Upper body workout",
                completed: false,
                subtasks: [
                  {
                    id: 4002,
                    title: "10 push-ups",
                    completed: false,
                    subtasks: [],
                  },
                  {
                    id: 4003,
                    title: "15 sit-ups",
                    completed: false,
                    subtasks: [
                      {
                        id: 4009,
                        title: "step sis",
                        completed: true,
                        subtasks: [],
                      },
                    ],
                  },
                  {
                    id: 40903,
                    title: "15",
                    completed: false,
                    subtasks: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default function Taskform() {
  const { id } = useParams();
  const [isopen, setIsopen] = useState(false);
  const { name, icon, totalTasks, completedTasks } = collectionsData.find(
    (index) => index.id == id
  );
  const isfav = false;
  // const currentdata = coll.filter((collection) => collection.id == id);

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

  return (
    <div className="flex flex-col h-full items-center">
      <div className="flex flex-col space-y-3  min-w-[50%] ">
        <div className="flex space-x-3 items-center -ml-3">
          <Button type="add">
            <IoIosArrowBack />
          </Button>
          <span className="font-bold text-lg">
            {name}
            {icon}
          </span>
          <FiStar
            className={`h-7 w-7 ${
              isfav ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
            }`}
          />
        </div>

        <div className="font-semibold flex space-x-3 items-center">
          <Button type="add" onClick={() => setIsopen(!isopen)}>
            <IoMdAdd />
          </Button>
          <span className="text-md"> add task</span>
        </div>
        {isopen ? (
          <Modal isopen={isopen} setIsopen={setIsopen}>
            this is the modal
          </Modal>
        ) : (
          <></>
        )}

        <div className="flex space-y-3 flex-col  ">
          <div className="text-sm font-semibold">
            {" "}
            {totalTasks} tasks | {completedTasks}{" "}
          </div>
          <div className="ml-2">
            <div className="p-6 space-y-4">
              {/* <div className="p-6">
                {collectionsData.map((collection) => (
                  <div key={collection.id} className="mb-6">
                    <h2 className="text-xl font-bold flex items-center">
                      <span className="mr-2">{collection.icon}</span>{" "}
                      {collection.name}
                    </h2>
                    <div className="ml-4">
                      {collection.tasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>{" "} */}
              <div className="p-6">
                {collectionsData
                  .filter((task) => task.id == id)
                  .map((collection) => (
                    <div key={collection.id} className="mb-6">
                      {/* <h2 className="text-xl font-bold flex items-center">
                        <span className="mr-2">{collection.icon}</span>{" "}
                        {collection.name}
                      </h2> */}
                      <div className="ml-4">
                        {collection.tasks.map((task) => (
                          <TaskItem key={task.id} task={task} />
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
