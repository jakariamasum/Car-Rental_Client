import { Link } from "react-router-dom";

interface SidebarProps {
  title: string;
  links: { name: string; path: string; onClick?: () => void }[];
}

const Sidebar: React.FC<SidebarProps> = ({ title, links }) => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <ul>
        {links.map((link, index) => (
          <li key={index} className="mb-4">
            {link.onClick ? (
              <div
                onClick={link.onClick}
                className="block py-2 px-4 rounded hover:bg-gray-700 cursor-pointer"
              >
                {link.name}
              </div>
            ) : (
              <Link
                to={link.path}
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                {link.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
