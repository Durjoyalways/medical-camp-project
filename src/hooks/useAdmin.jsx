import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axiosSecure from "../api";

const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            // ব্যাকেন্ড থেকে { admin: true/false } আসবে
            return res.data?.admin; 
        }
    });
    return [isAdmin, isAdminLoading];
};

export default useAdmin;