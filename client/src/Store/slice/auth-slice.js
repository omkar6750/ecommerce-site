import apiClient from "@/lib/apiClient";
import { USER_ROUTE } from "@/Utils/constants";

export const createAuthSlice = (set) => ({
    userInfo: {
        email: "",
        mobile_number: "",
        profile_setup: false,
        first_name: "",
        last_name: "",
        gender: "",
        is_admin: false,
        address: "",
    },

    isLoading: true,
    error: null,


    fetchUser: async () => {
        try {
            const response = await apiClient.get(USER_ROUTE, { withCredentials: true });
            if (response.status === 200) {
                const userData = response.data

                set({
                    userInfo: {
                        email: userData.email || "",
                        mobile_number: userData.mobile_number || "",
                        profile_setup: userData.profile_setup || false,
                        first_name: userData.first_name || "",
                        last_name: userData.last_name || "",
                        gender: userData.gender || "",
                        is_admin: userData.is_admin,
                        address: userData.address || "",
                    },
                    isLoading: false,
                    error: null,
                });

            }
            return response

        } catch (error) {
            set({ isLoading: false, error: error.response });
            return error.response;
        }


    },

});
