'use client';

import withoutAuth from '@/utils/withoutAuth';
import Forget from './Forget';

const ForgetWrapper = withoutAuth(() => {
  return <Forget />;
});

export default ForgetWrapper;
