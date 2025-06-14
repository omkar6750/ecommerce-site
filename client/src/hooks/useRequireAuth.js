// useRequireAuth.js
import { useEffect, useState } from "react";
import { useAppStore } from "@/Store";
import { useNavigate } from "react-router-dom";

const useRequireAuth = () => {
    const { fetchUser, userInfo } = useAppStore();
    const navigate = useNavigate();
    const [hasValidated, setHasValidated] = useState(false);

    useEffect(() => {
        if (!hasValidated) {
            const validateUser = async () => {
                const response = await fetchUser();
                setHasValidated(true);
                if (!response || response.status === 401 || !response.data.email) {
                    navigate("/auth");
                }
            };
            validateUser();
        }
    }, [hasValidated, fetchUser, navigate]);
};

export default useRequireAuth;
