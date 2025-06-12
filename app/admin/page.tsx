"use client"
import React from 'react'
import Admin from '@/components/Admin'
import withAuth from '@/utils/withAuth'

const Page = () => {
  return <Admin />;
};

export default withAuth(Page);

// export function generateMetadata() {
//   return {
//     title: "Grocery Admin"
//   };
// }
