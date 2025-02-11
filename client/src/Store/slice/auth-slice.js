export const createAuthSlice = (set) => ({
    userInfo: undefined,
    setUserInfo: (userInfo) =>set({userInfo}),
    profileCreated: Boolean,
    setProfileCreated: (profileCreated) => set(profileCreated)
});
