import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollections } from "../features/collectionSlice";
import { fetchTasks } from "../features/taskSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { collections } = useSelector((state) => state.collections);

  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCollectionClick = (id) => {
    navigate(`/dashboard/${id}`);
    setSidebarOpen(false);
  };

  useEffect(() => {
    dispatch(fetchCollections());
    dispatch(fetchTasks(id));
  }, [id, dispatch]);

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
            <li key={collection._id}>
              <button
                onClick={() => handleCollectionClick(collection._id)}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium flex items-center space-x-2 transition-all duration-200 
                  ${
                    collection._id == id
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
