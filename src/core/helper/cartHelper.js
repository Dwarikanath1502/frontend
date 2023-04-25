
// saves item to cart and local storage and redirect to cart page that's why next
export const AddItemToCart = (item, next) => {
    let cart = []
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.push({
            ...item,
            // count so that it only add a element at a time
            count: 1
        })
        localStorage.setItem("cart", JSON.stringify(cart))
        next()
    }
}

export const loadCart = () => {
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}

export const removeItemFromCart = (productId) => {
    let cart = []
    if (typeof window !== undefined) {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((product, index) => {
            if (product._id === productId) {
                // at position index it will remove 1 item
                cart.splice(index, 1)
            }
        })
        // update cart
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    return cart;
}