import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { FiMenu } from "react-icons/fi";

const collectionsData = [
  {
    id: 1,
    name: "Design",
    icon: "🎨",
    favorite: false,
    totalTasks: 2,
    completedTasks: 1,
    tasks: [
      {
        id: 1,
        title: "Create wireframe",
        description: "Design the main UI wireframe in Figma.",
        completed: false,
        createdAt: "2024-03-01T10:30:00Z",
        dueDate: "2024-03-05T23:59:00Z",
        priority: "high",
        tags: ["UI/UX", "Figma"],
      },
      {
        id: 2,
        title: "Update brand guidelines",
        description: "Ensure the brand colors and typography are updated.",
        completed: true,
        createdAt: "2024-02-20T12:15:00Z",
        dueDate: "2024-02-25T18:00:00Z",
        priority: "medium",
        tags: ["Branding", "Design System"],
      },
    ],
  },
  {
    id: 2,
    name: "Personal",
    icon: "🧘",
    favorite: true,
    totalTasks: 2,
    completedTasks: 1,
    tasks: [
      {
        id: 1,
        title: "Go to the gym",
        description: "Workout session at 7 AM.",
        completed: false,
        createdAt: "2024-03-02T07:00:00Z",
        dueDate: "2024-03-02T08:30:00Z",
        priority: "low",
        tags: ["Health", "Exercise"],
      },
      {
        id: 2,
        title: "Read a book",
        description: "Finish reading Atomic Habits.",
        completed: true,
        createdAt: "2024-02-28T09:00:00Z",
        dueDate: "2024-03-01T22:00:00Z",
        priority: "medium",
        tags: ["Learning", "Self-Improvement"],
      },
    ],
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState(collectionsData);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleCollectionClick = (id) => {
    setCollections(
      collections.map((coll) => ({ ...coll, active: coll.id === id }))
    );
    navigate(`/dashboard/${id}`);
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-light-background dark:bg-dark-background transition-all duration-300">
      <aside
        className={`  md:flex flex-col mt-8 w-64 bg-light-card dark:bg-dark-card shadow-sm p-4 border-r border-light-border dark:border-dark-border transition-all 
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } md:w-52    z-40`}
      >
        <h2 className="text-sm font-semibold  uppercase mb-3 text-light-secondary dark:text-dark-secondary">
          📂Collections
        </h2>
        <ul className="space-y-2">
          {collections.map((collection) => (
            <li key={collection.id}>
              <button
                onClick={() => handleCollectionClick(collection.id)}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center space-x-2 transition-all duration-200 
                  ${
                    collection.active
                      ? "bg-light-primary text-white dark:bg-dark-primary dark:text-white"
                      : "text-light-foreground dark:text-dark-foreground hover:bg-light-hover dark:hover:bg-dark-hover"
                  }`}
              >
                <span>{collection.icon}</span>
                <span>{collection.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="  flex items-center justify-between ">
          <button
            className="md:hidden p-2 text-light-foreground dark:text-dark-foreground z-50"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FiMenu className="h-6 w-6" />
          </button>
        </header>

        <main className="flex-1   overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
