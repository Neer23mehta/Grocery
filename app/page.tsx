import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PageClient from './pageClient'; 

export default function Page() {
  const token = cookies().get('token')?.value;

  if (token) {
    redirect('/admin'); 
  }

  return <PageClient />;
}
