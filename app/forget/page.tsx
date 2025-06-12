import ForgetWrapper from '@/components/Forgotwrapper';
import React from 'react';

const Page = () => {
  return <ForgetWrapper />;
};

export default Page;

export function generateMetadata() {
  return {
    title: 'Forgot Password | Grocery App',
  };
}
