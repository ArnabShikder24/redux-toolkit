import { useAppSelector } from "@/redux/hook";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({children}: {children: ReactNode}) {
    const { user: { email }, isLoading } = useAppSelector(state => state.user);
    const pathname = useLocation();

    if (isLoading) {
        return <p className='mt-10 text-center'>Loading...</p>
    }

    if (!email && !isLoading) {
        return <Navigate to='/login' state={pathname}/>
    }

    return children;
}
