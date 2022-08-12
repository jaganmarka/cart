const cartHelper = {
    bulkProductsObj: (products, cartId) => {
        products.map(product=> {
            product.cartId =  cartId;
        })
        return products;
    },
    checkIsNumExisting: (val) => {
        return (val && !isNaN(val))
    }

}
module.exports = { cartHelper };