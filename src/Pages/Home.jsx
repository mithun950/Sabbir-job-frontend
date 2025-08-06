import React from 'react';
import Division from '../Components/Division';

const divisions = ['Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Barishal', 'Sylhet', 'Mymensingh', 'Rangpur'];

const Home = () => {
  return (
    <div className="w-11/12 max-w-7xl mx-auto min-h-screen py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-green-700">
        Bangladesh Divisions
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {divisions.map((name) => (
          <Division key={name} name={name} />
        ))}
      </div>
    </div>
  );
};

export default Home;
