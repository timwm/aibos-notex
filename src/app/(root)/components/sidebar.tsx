import { useState } from "react";
import { Icon } from "@iconify/react";
// import { twMerge } from "tailwind-merge";

// // const DropdownItem = ({ iconName, title, _isActive, children }) => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [, setHeight] = useState(0);
// //   const contentRef = useRef(null);

// //   // Functionality: toggleSubMenu(button)
// //   const toggleSubMenu = (e) => {
// //     e.preventDefault();
// //     setIsOpen((prev) => !prev);
// //   };

// //   // Logic to calculate height for the grid-template-rows animation (CSS original behavior)
// //   useEffect(() => {
// //     if (contentRef.current) {
// //       setHeight(isOpen ? contentRef.current.offsetHeight : 0);
// //     }
// //   }, [isOpen]);

// //   const buttonClasses = `dropdown-btn flex items-center w-full text-left bg-transparent border-none font-inherit cursor-pointer rounded-lg p-3.5 gap-4
// //     hover:bg-hover transition-colors duration-300 ${isOpen ? "rotate" : ""}`;

// //   return (
// //     <li className="list-none">
// //       <button className={buttonClasses} onClick={toggleSubMenu}>
// //         <IconMap name={iconName} />
// //         <span className="grow">{title}</span>
// //         {/* Dropdown Arrow Icon */}
// //         <IconMap
// //           className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""} hidden md:block`}
// //           name="dropdown-arrow"
// //         />
// //       </button>

// //       {/* Sub-Menu */}
// //       <ul
// //         className="sub-menu list-none transition-all duration-300 ease-in-out md:grid md:overflow-hidden"
// //         style={{
// //           // Replicates the original CSS grid-template-rows: 0fr/1fr transition
// //           gridTemplateRows: isOpen ? "1fr" : "0fr",
// //         }}
// //       >
// //         <div ref={contentRef} className="overflow-hidden">
// //           {children}
// //         </div>
// //       </ul>
// //     </li>
// //   );
// // };

// // const SidebarItem = ({ iconName, title, href, isActive }) => {
// //   const linkClasses = `flex items-center rounded-lg p-3.5 gap-4 text-text transition-colors duration-300 hover:bg-hover list-none ${
// //     isActive ? "text-accent [&>svg]:fill-accent" : "[&>svg]:fill-text"
// //   }`;

// //   return (
// //     <li className={isActive ? "active list-none" : "list-none"}>
// //       <a className={linkClasses} href={href}>
// //         <IconMap name={iconName} />
// //         <span>{title}</span>
// //       </a>
// //     </li>
// //   );
// // };

// // Mapping from SVG path (or context) to Iconify MDI name
// const iconMap = {
//   // Toggle Button (Collapse/Expand)
//   toggle: "material-symbols:keyboard-double-arrow-left-rounded",

//   // Navigation Icons
//   home: "material-symbols:home-rounded",
//   dashboard: "material-symbols:grid-view-rounded",
//   create: "material-symbols:folder-open-rounded",
//   todo: "material-symbols:list-alt-rounded",
//   calendar: "material-symbols:calendar-month-rounded",
//   profile: "material-symbols:account-circle-rounded",

//   // Dropdown Arrow (Chevron Down/Rotate)
//   "dropdown-arrow": "material-symbols:keyboard-arrow-down-rounded",
// };

// const IconMap = ({
//   name,
//   className = "",
// }: {
//   name: keyof typeof iconMap;
//   className?: string;
// }) => {
//   const iconName = iconMap[name];

//   if (!iconName) {
//     // eslint-disable-next-line no-console
//     console.error(`Icon not found for name: ${name}`);

//     return null;
//   }

//   // Merging tailwind classes with default icon size/color classes.
//   // The original CSS sets default fill color via CSS variables.
//   const classes = twMerge("w-6 h-6 shrink-0 fill-current", className);

//   return <Icon className={classes} icon={iconName} />;
// };

// // ---------------------------------------------------------------
// // ---------------------------------------------------------------

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setOpenDropdown(null); // close all submenus
  };

  const toggleSubMenu = (menu) => {
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
