import { useState } from "react";
import "./style.css";

const Menu = () => {
  // Show or hide the custom context menu
  const [isShown, setIsShown] = useState(false);

  // The position of the custom context menu
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Show the custom context menu
  const showContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    // Disable the default context menu
    event.preventDefault();

    setIsShown(false);
    const newPosition = {
      x: event.pageX,
      y: event.pageY,
    };

    setPosition(newPosition);
    setIsShown(true);
  };

  // Hide the custom context menu
  const hideContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsShown(false);
  };

  // Do what you want when an option in the context menu is selected
  const [selectedValue, setSelectedValue] = useState<String>();
  const doSomething = (selectedValue: String) => {
    setSelectedValue(selectedValue);
  };

  return (
    <div
      className="menu"
      onContextMenu={showContextMenu}
      onClick={hideContextMenu}
    >
      <h2>KindaCode.com</h2>
      {selectedValue && (
        <h1>
          "{selectedValue}" is selected
        </h1>
      )}

      {/* Define the custom context menu */}
      {isShown && (
        <div
          style={{ top: position.y, left: position.x }}
          className="custom-context-menu"
        >
          <div className="option" onClick={() => doSomething("Option 1")}>
            Option #1
          </div>
          <div className="option" onClick={() => doSomething("Option 2")}>
            Option #2
          </div>
          <div className="option" onClick={() => doSomething("Option 3")}>
            Option #3
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;