'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState, ComponentType } from "react";
import Loading from "@/app/loading";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuthComponent = (props: P) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) return <Loading />;
    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
