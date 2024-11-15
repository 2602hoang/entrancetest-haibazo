import React from "react";

interface LoadTextProps {
  title: string;
}

const LoadText: React.FC<LoadTextProps> = ({ title }) => {
  return (
    <div className="loader">
      <div className="layer">{title}</div>
      <div className="layer">{title}</div>
    </div>
  );
};

export default LoadText;
