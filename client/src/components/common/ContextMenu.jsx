import React, { useEffect, useRef } from "react";

function ContextMenu({ options, cordinates, contextMenue, setContextMenue }) {
  const contextMenueRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (e) => {
   
      if (e.target.id !== "context-opener") {
        if (
          contextMenueRef.current &&
          !contextMenueRef.current.contains(e.target)
        ) {
          setContextMenue(false);
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleClick = (e, callback) => {
    e.stopPropagation();
    setContextMenue(false);
    callback();
  };
  return (
    <div
      className={`bg-dropdown-background shadow-xl fixed py-2 z-[100]`}
      ref={contextMenueRef}
      style={{ top: cordinates.y, left: cordinates.x }}
    >
      <ul>
        {options?.map(({ name, callback }) => (
          <li
            key={name}
            className="px-5 py-2 cursor-pointer hover:bg-background-default-hover "
            onClick={(e) => handleClick(e, callback)}
          >
            <span className="text-white ">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContextMenu;
