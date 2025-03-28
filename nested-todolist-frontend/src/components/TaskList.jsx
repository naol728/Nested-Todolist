import {
  CheckCircle,
  Circle,
  Plus,
  Trash2,
  Edit2,
  ChevronDown,
  ChevronRight,
  X,
  Check,
  Calendar,
  Tag,
} from "lucide-react";

const TaskList = ({ collectionsData, id }) => {
  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      {collectionsData
        .filter((collection) => collection.id == id)
        .map((collection) => (
          <div key={collection.id} className="space-y-6">
            {/* Collection Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {collection.name}
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                <Plus size={16} />
                <span>Add Task</span>
              </button>
            </div>

            {/* Tasks List */}
            <div className="space-y-4">
              {collection.tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md"
                >
                  {/* Task Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <button
                        className={`mt-1 p-1 rounded-full ${
                          task.completed
                            ? "text-green-500"
                            : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        }`}
                        onClick={() => {}} // Placeholder for completion toggle
                      >
                        {task.completed ? (
                          <CheckCircle size={20} className="fill-current" />
                        ) : (
                          <Circle size={20} />
                        )}
                      </button>

                      <div>
                        <h3
                          className={`text-lg font-semibold ${
                            task.completed
                              ? "line-through text-gray-500"
                              : "text-gray-800 dark:text-white"
                          }`}
                        >
                          {task.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                          <Calendar size={14} />
                          <span>
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        className="p-2 text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => {}} // Placeholder for edit
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="p-2 text-gray-500 hover:text-red-500 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => {}} // Placeholder for delete
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => {}} // Placeholder for expand/collapse
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Task Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 pl-8">
                    {task.description}
                  </p>

                  {/* Tags */}
                  {task.tags && task.tags.length > 0 && (
                    <div className="flex gap-2 mb-4 pl-8 flex-wrap">
                      {task.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="flex items-center gap-1 px-2.5 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
                        >
                          <Tag size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Subtasks Section */}
                  {task.subtasks && task.subtasks.length > 0 && (
                    <div className="mt-4 pl-8">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Subtasks
                        </h4>
                        <button
                          className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                          onClick={() => {}} // Placeholder for add subtask
                        >
                          <Plus size={12} />
                          <span>Add Subtask</span>
                        </button>
                      </div>

                      <ul className="space-y-2">
                        {task.subtasks.map((subtask) => (
                          <li
                            key={subtask.id}
                            className="flex items-center justify-between group p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750"
                          >
                            <div className="flex items-center gap-3">
                              <button
                                className={`p-1 rounded-full ${
                                  subtask.completed
                                    ? "text-green-500"
                                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                }`}
                                onClick={() => {}} // Placeholder for completion toggle
                              >
                                {subtask.completed ? (
                                  <CheckCircle
                                    size={16}
                                    className="fill-current"
                                  />
                                ) : (
                                  <Circle size={16} />
                                )}
                              </button>
                              <span
                                className={`text-sm ${
                                  subtask.completed
                                    ? "line-through text-gray-500"
                                    : "text-gray-700 dark:text-gray-300"
                                }`}
                              >
                                {subtask.title}
                              </span>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                className="p-1 text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 rounded-full"
                                onClick={() => {}} // Placeholder for edit
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                className="p-1 text-gray-500 hover:text-red-500 dark:hover:text-red-400 rounded-full"
                                onClick={() => {}} // Placeholder for delete
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Add Subtask Input (Example of visible state) */}
                  <div className="mt-3 pl-8 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add a subtask..."
                      className="flex-1 text-sm px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="p-2 text-green-500 hover:text-green-600 dark:hover:text-green-400 rounded-full">
                      <Check size={18} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-full">
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default TaskList;
