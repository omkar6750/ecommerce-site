
export const createCartSlice = (set) => ({
    cart: [], 
    addToCart: (product) => set((state) => ({
        cart: [...state.cart, product],
    })),
    removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter((product) => product.id !== productId),
    })),
    clearCart: () => set({ cart: [] }),
    updateCartItemQuantity: (productId, quantity) => set((state) => ({
        cart: state.cart.map((product) =>
            product.id === productId ? { ...product, quantity } : product
        ),
    })),
});


