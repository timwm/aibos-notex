import { useState } from "react";
import { Icon } from "@iconify/react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setOpenDropdown(null); // close all submenus
  };

  const toggleSubMenu = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
    if (!isOpen) setIsOpen(true);
  };

  return (
    <nav
      className={`sticky top-0 h-screen overflow-hidden border-r border-(--line-clr) bg-(--base-clr) whitespace-nowrap transition-all duration-300 ${isOpen ? "w-64 px-2" : "w-16 px-2"}`}
    >
      <ul className="list-none">
        {/* Logo + Toggle */}
        <li className="mb-4 flex justify-end">
          <span className={`logo font-semibold ${!isOpen && "hidden"}`}>
            coding2go
          </span>
          <button
            className="ml-auto rounded p-2 hover:bg-(--hover-clr)"
            onClick={toggleSidebar}
          >
            <Icon
              className={`transition-transform ${!isOpen ? "rotate-180" : ""}`}
              icon="mdi:chevron-double-left"
            />
          </button>
        </li>

        {/* Home */}
        <SidebarItem
          active
          href="/"
          icon="mdi:home"
          isOpen={isOpen}
          label="Home"
        />

        {/* Dashboard */}
        <SidebarItem
          href="/dashboard"
          icon="mdi:view-dashboard"
          isOpen={isOpen}
          label="Dashboard"
        />

        {/* Create Dropdown */}
        <SidebarDropdown
          icon="mdi:folder-plus"
          isOpen={isOpen}
          items={["Folder", "Document", "Project"]}
          label="Create"
          open={openDropdown === "create"}
          onClick={() => toggleSubMenu("create")}
        />

        {/* Todo Dropdown */}
        <SidebarDropdown
          icon="mdi:check-all"
          isOpen={isOpen}
          items={["Work", "Private", "Coding", "Gardening", "School"]}
          label="Todo-Lists"
          open={openDropdown === "todo"}
          onClick={() => toggleSubMenu("todo")}
        />

        {/* Calendar */}
        <SidebarItem
          href="/calendar"
          icon="mdi:calendar"
          isOpen={isOpen}
          label="Calendar"
        />

        {/* Profile */}
        <SidebarItem
          href="/profile"
          icon="mdi:account"
          isOpen={isOpen}
          label="Profile"
        />
      </ul>
    </nav>
  );
};

type SidebarItemProps = {
  href: string;
  icon: string;
  label: string;
  active?: boolean;
  isOpen: boolean;
};

const SidebarItem = ({
  href,
  icon,
  label,
  active,
  // isOpen,
}: SidebarItemProps) => (
  <li className={`${active ? "text-(--accent-clr)" : ""}`}>
    <a
      className="flex items-center gap-3 rounded bg-blue-400 p-3 hover:bg-(--hover-clr)"
      href={href}
    >
      <Icon
        className={`shrink-0 ${
          active ? "text-(--accent-clr)" : "text-(--text-clr)"
        }`}
        icon={icon}
      />
      {/* {isOpen && <span>{label}</span>} */}
      {<span>{label}</span>}
    </a>
  </li>
);

type SidebarDropdownProps = {
  label: string;
  icon: string;
  items: string[];
  isOpen: boolean;
  open: boolean;
  onClick: () => void;
};

const SidebarDropdown = ({
  label,
  icon,
  items,
  isOpen,
  open,
  onClick,
}: SidebarDropdownProps) => (
  <li>
    <button
      className={`w-ful-l flex items-center gap-3 rounded bg-red-400 p-3 hover:bg-(--hover-clr) ${isOpen ? "w-full-" : ""}`}
      onClick={onClick}
    >
      <Icon className="text-(--text-clr)" icon={icon} />
      {/* {isOpen && <span className="grow">{label}</span>} */}
      <span className="grow">{label}</span>
      <Icon
        className={`flex-end transition-transform ${open ? "rotate-180" : ""}`}
        icon="mdi:chevron-down"
      />
    </button>
    <ul
      className={`grid transition-all duration-300 ${
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">
        {items.map((item) => (
          <li key={item}>
            <a className="block p-2 pl-8 hover:bg-(--hover-clr)" href="#">
              {item}
            </a>
          </li>
        ))}
      </div>
    </ul>
  </li>
);

export default Sidebar;
