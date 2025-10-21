import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { twMerge } from 'tailwind-merge';


const DropdownItem = ({ iconName, title, isActive, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  // Functionality: toggleSubMenu(button)
  const toggleSubMenu = (e) => {
    e.preventDefault();
    setIsOpen(prev => !prev);
  };
  
  // Logic to calculate height for the grid-template-rows animation (CSS original behavior)
  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.offsetHeight : 0);
    }
  }, [isOpen]);

  const buttonClasses = `dropdown-btn flex items-center w-full text-left bg-transparent border-none font-inherit cursor-pointer rounded-lg p-3.5 gap-4
    hover:bg-hover transition-colors duration-300 ${isOpen ? 'rotate' : ''}`;

  return (
    <li className="list-none">
      <button 
        onClick={toggleSubMenu}
        className={buttonClasses}
      >
        <IconMap name={iconName} />
        <span className="flex-grow">{title}</span>
        {/* Dropdown Arrow Icon */}
        <IconMap name="dropdown-arrow" className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} md:block hidden`} />
      </button>
      
      {/* Sub-Menu */}
      <ul 
        className="sub-menu list-none transition-all duration-300 ease-in-out md:overflow-hidden md:grid"
        style={{ 
          // Replicates the original CSS grid-template-rows: 0fr/1fr transition
          gridTemplateRows: isOpen ? '1fr' : '0fr',
        }}
      >
        <div ref={contentRef} className="overflow-hidden">
          {children}
        </div>
      </ul>
    </li>
  );
};

const SidebarItem = ({ iconName, title, href, isActive }) => {
  const linkClasses = `flex items-center rounded-lg p-3.5 gap-4 text-text transition-colors duration-300 hover:bg-hover list-none ${
    isActive ? 'text-accent [&>svg]:fill-accent' : '[&>svg]:fill-text'
  }`;

  return (
    <li className={isActive ? 'active list-none' : 'list-none'}>
      <a href={href} className={linkClasses}>
        <IconMap name={iconName} />
        <span>{title}</span>
      </a>
    </li>
  );
};


// --- Main Component ---

const Sidebar = () => {
  const [isClosed, setIsClosed] = useState(false);
  const dropdownRefs = useRef([]); // To hold refs for dropdown open states
  
  // A helper function to close all sub-menus and remove the 'rotate' class
  // This replicates the functionality of closeAllSubMenus()
  const closeAllSubMenus = useCallback(() => {
    // In React, state is managed per component, so we force all dropdowns to close
    dropdownRefs.current.forEach(setIsOpen => setIsOpen(false));
  }, []);
  
  // Functionality: toggleSidebar()
  const handleToggleSidebar = () => {
    setIsClosed(prev => !prev);
    // If opening a closed sidebar, close any open submenus (as per original JS)
    if (isClosed) {
      closeAllSubMenus();
    }
  };

  const sidebarClasses = `
    box-border h-screen bg-base border-r border-line 
    sticky top-0 self-start transition-[width,padding] duration-300 ease-in-out 
    overflow-hidden-- whitespace-nowrap z-10
    md:w-[250px] md:p-5 md:pt-1.5 
    
    // Mobile Styles (Always 'closed' width, but full width container)
    // The mobile layout is complex and mostly handled by media queries in custom CSS (see below)
    max-md:fixed max-md:bottom-0 max-md:top-auto max-md:h-[60px] max-md:w-full 
    max-md:border-r-0 max-md:border-t max-md:p-0
    
    ${isClosed ? 'md:w-[60px] md:p-1' : ''}
  `;
  
  const toggleBtnClasses = `
    ml-auto p-4 border-none rounded-lg bg-transparent cursor-pointer 
    transition-colors hover:bg-hover
    ${isClosed ? 'rotate-180' : ''}
    max-md:hidden // Hide toggle button on mobile
  `;
  
  // --- Data Structure for Navigation ---
  const navItems = [
    { type: 'link', title: 'Home', href: 'index.html', icon: 'home', isActive: true },
    { type: 'link', title: 'Dashboard', href: 'dashboard.html', icon: 'dashboard', isActive: false },
    {
      type: 'dropdown', title: 'Create', icon: 'create', isActive: false,
      subItems: [
        { title: 'Folder', href: '#' },
        { title: 'Document', href: '#' },
        { title: 'Project', href: '#' },
      ]
    },
    {
      type: 'dropdown', title: 'Todo-Lists', icon: 'todo', isActive: false,
      subItems: [
        { title: 'Work', href: '#' },
        { title: 'Private', href: '#' },
        { title: 'Coding', href: '#' },
        { title: 'Gardening', href: '#' },
        { title: 'School', href: '#' },
      ]
    },
    { type: 'link', title: 'Calendar', href: 'calendar.html', icon: 'calendar', isActive: false },
    { type: 'link', title: 'Profile', href: 'profile.html', icon: 'profile', isActive: false },
  ];
  
  // Reset dropdown refs on render (to ensure fresh state management)
  dropdownRefs.current = [];

  return (
    <nav 
      id="sidebar" 
      className={sidebarClasses}
    >
      <ul className="list-none p-0 md:p-0">
        {/* Logo/Toggle Header */}
        <li className="flex justify-end mb-4 list-none md:p-0 max-md:hidden">
          <span className="logo font-semibold p-3.5 gap-4">coding2go</span>
          <button onClick={handleToggleSidebar} className={toggleBtnClasses}>
            {/* The double arrow icon */}
            <IconMap name="toggle" className={`transition-transform duration-150 ${isClosed ? 'rotate-180' : ''}`} />
          </button>
        </li>
        
        {/* Navigation Items */}
        <div className="md:space-y-1">
          {navItems.map((item, index) => {
            if (item.type === 'link') {
              return (
                <SidebarItem
                  key={item.title}
                  iconName={item.icon}
                  title={item.title}
                  href={item.href}
                  isActive={item.isActive}
                />
              );
            } else if (item.type === 'dropdown') {
              return (
                <DropdownItem
                  key={item.title}
                  iconName={item.icon}
                  title={item.title}
                  isActive={item.isActive}
                >
                  {item.subItems.map(sub => (
                    <li key={sub.title}>
                      <a href={sub.href} className="flex p-3.5 pl-8 rounded-lg text-text hover:bg-hover transition-colors duration-300">
                        {sub.title}
                      </a>
                    </li>
                  ))}
                </DropdownItem>
              );
            }
            return null;
          })}
        </div>
      </ul>
    </nav>
  );
};

// Mapping from SVG path (or context) to Iconify MDI name
const iconMap = {
  // Toggle Button (Collapse/Expand)
  'toggle': 'material-symbols:keyboard-double-arrow-left-rounded',
  
  // Navigation Icons
  'home': 'material-symbols:home-rounded',
  'dashboard': 'material-symbols:grid-view-rounded',
  'create': 'material-symbols:folder-open-rounded',
  'todo': 'material-symbols:list-alt-rounded',
  'calendar': 'material-symbols:calendar-month-rounded',
  'profile': 'material-symbols:account-circle-rounded',
  
  // Dropdown Arrow (Chevron Down/Rotate)
  'dropdown-arrow': 'material-symbols:keyboard-arrow-down-rounded',
};

const IconMap = ({ name, className = '' }) => {
  const iconName = iconMap[name];

  if (!iconName) {
    console.error(`Icon not found for name: ${name}`);
    return null;
  }

  // Merging tailwind classes with default icon size/color classes.
  // The original CSS sets default fill color via CSS variables.
  const classes = twMerge('w-6 h-6 flex-shrink-0 fill-current', className);
  
  return <Icon icon={iconName} className={classes} />;
};





// ---------------------------------------------------------------
// ---------------------------------------------------------------



// Sidebar.jsx
const SidebarC = () => {
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
      className={`bg-[var(--base-clr)] border-r border-[var(--line-clr)] 
        transition-all duration-300 sticky top-0 h-screen overflow-hidden whitespace-nowrap
        ${isOpen ? "w-64 px-2" : "w-16 px-2"}`}
    >
      <ul className="list-none">
        {/* Logo + Toggle */}
        <li className="flex justify-end mb-4">
          <span className={`logo font-semibold ${!isOpen && "hidden"}`}>
            coding2go
          </span>
          <button
            onClick={toggleSidebar}
            className="ml-auto p-2 rounded hover:bg-[var(--hover-clr)]"
          >
            <Icon
              icon="mdi:chevron-double-left"
              className={`transition-transform ${
                !isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </li>

        {/* Home */}
        <SidebarItemC
          href="/"
          icon="mdi:home"
          label="Home"
          active
          isOpen={isOpen}
        />

        {/* Dashboard */}
        <SidebarItemC
          href="/dashboard"
          icon="mdi:view-dashboard"
          label="Dashboard"
          isOpen={isOpen}
        />

        {/* Create Dropdown */}
        <SidebarDropdownC
          label="Create"
          icon="mdi:folder-plus"
          isOpen={isOpen}
          open={openDropdown === "create"}
          onClick={() => toggleSubMenu("create")}
          items={["Folder", "Document", "Project"]}
        />

        {/* Todo Dropdown */}
        <SidebarDropdownC
          label="Todo-Lists"
          icon="mdi:check-all"
          isOpen={isOpen}
          open={openDropdown === "todo"}
          onClick={() => toggleSubMenu("todo")}
          items={["Work", "Private", "Coding", "Gardening", "School"]}
        />

        {/* Calendar */}
        <SidebarItemC
          href="/calendar"
          icon="mdi:calendar"
          label="Calendar"
          isOpen={isOpen}
        />

        {/* Profile */}
        <SidebarItemC
          href="/profile"
          icon="mdi:account"
          label="Profile"
          isOpen={isOpen}
        />
      </ul>
    </nav>
  );
};

// const SidebarItemC = SidebarItem;
const SidebarItemC = ({ href, icon, label, active, isOpen }) => (
  <li className={`${active ? "text-[var(--accent-clr)]" : ""}`}>
    <a
      href={href}
      className="flex bg-blue-400 items-center gap-3 p-3 rounded hover:bg-[var(--hover-clr)]"
    >
      <Icon
        icon={icon}
        className={`flex-shrink-0 ${
          active ? "text-[var(--accent-clr)]" : "text-[var(--text-clr)]"
        }`}
      />
      {/* {isOpen && <span>{label}</span>} */}
      {<span>{label}</span>}
    </a>
  </li>
);

const SidebarDropdownC = ({ label, icon, items, isOpen, open, onClick }) => (
  <li>
    <button
      onClick={onClick}
      className={`flex bg-red-400 items-center gap-3 p-3 rounded hover:bg-[var(--hover-clr)] w-ful-l ${isOpen ? "w-full-" : ""}`}
    >
      <Icon icon={icon} className="text-[var(--text-clr)]" />
      {/* {isOpen && <span className="flex-grow">{label}</span>} */}
      <span className="flex-grow">{label}</span>
      <Icon
        icon="mdi:chevron-down"
        className={`flex-end transition-transform ${open ? "rotate-180" : ""}`}
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
            <a
              href="#"
              className="block pl-8 p-2 hover:bg-[var(--hover-clr)]"
            >
              {item}
            </a>
          </li>
        ))}
      </div>
    </ul>
  </li>
);


// export default Sidebar;
export default SidebarC;