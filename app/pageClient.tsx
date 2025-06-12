// app/PageClient.tsx (or in a subfolder like ./components/PageClient.tsx)
'use client';

import React, { useState } from 'react';
import Login from '@/components/Login';
import Loginu from '@/usercomponents/Login';

const PageClient = () => {
  const [role, setRole] = useState<'admin' | 'user' | null>(null);

  if (role === 'admin') {
    return <Login />;
  }

  if (role === 'user') {
    return <Loginu />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Select Login Type</h1>
      <div className="flex space-x-6">
        <button
          onClick={() => setRole('admin')}
          className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Admin
        </button>
        <button
          onClick={() => setRole('user')}
          className="px-8 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          User
        </button>
      </div>
    </div>
  );
};

export default PageClient;
