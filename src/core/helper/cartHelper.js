
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