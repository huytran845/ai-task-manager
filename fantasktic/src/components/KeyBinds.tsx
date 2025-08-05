import React from "react";

// Types
type KeyBindsProps = {
  keyBindsList: string[];
};

// The KeyBinds component accepts an array of strings that list the keyboard combinations for a shortcut.
const KeyBinds: React.FC<KeyBindsProps> = ({ keyBindsList }) => {
  return (
    <div className="space-x-1">
      <span className="sr-only">The keyboard shortcut is, </span>
      {keyBindsList.map((item, index) => (
        <kbd
          key={index}
          className="inline-block px-1 py-0.5 bg-background/10 rounded-full"
        >
          {item}
        </kbd>
      ))}
    </div>
  );
};

export default KeyBinds;
