import React from 'react';
import { useNavigate } from 'react-router';

const Division = ({ name }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/division/${name.toLowerCase()}`)}
      className="bg-green-100 hover:bg-green-200 text-center cursor-pointer p-6 rounded-xl shadow-md"
    >
      <h2 className="text-xl font-bold text-green-800">{name}</h2>
    </div>
  );
};

export default Division;
