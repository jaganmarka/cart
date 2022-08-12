const { cartProductsValidators } = require('../validators/cartProductsValidators');
const { errorMsgs, successMsgs } = require('../constants/commonConsts');
const { cartServices, cartProductServices } = require('../services/cartServices');
const { cartHelper } = require('../helpers/cartHelper');


const cartProductsController = {
    /**
     * Add Products to the existing cart
     * @param {cartId : integer , products: array of(items {productId: integer,quantity:integer })} req as body params
     * @param { succesfully add products to existing cart } res 
     */
    addProductsToExistingCart: (req, res) => {
        try {
            cartProductsValidators.addProductsToExistingCartValidation(req.body)
                .then(vResp => {
                    cartServices.getCart("findOne", { id: req.body.cartId }).then(cResu => {
                        if (cResu) {
                            let bulkProducts = cartHelper.bulkProductsObj(req.body.products, cResu.id)
                            cartProductServices.bulkCartProductsCreate(bulkProducts).then(cpResu => {
                                res.status(200).send({ error: false, message: successMsgs.SU00002, result: { cart: cResu, cart_products: cpResu } });
                            }).catch(cpErr => {
                                res.status(400).send({ error: true, message: errorMsgs.ER00009, result: cpErr });
                            })
                        } else {
                            res.status(400).send({ error: true, message: errorMsgs.ER00006, result: null });
                        }
                    }).catch(cErr => {
                        res.status(500).send({ error: true, message: errorMsgs.ER00004, result: cErr });
                    })

                }).catch(obErr => {
                    res.status(500).send({ error: true, message: errorMsgs.ER00002, result: obErr });
                })
        } catch (e) {
            res.status(500).send({ error: true, message: errorMsgs.ER00001, result: e });
        }
    },

    /**
     * Delete products from the cart
     * @param {cartId, productId })} req params
     * @param { succesfully delete products from the cart } res 
     */

    deleteProductFromCart: (req, res) => {
        try {
            cartProductsValidators.deleteOrUpdateProductValidation(req.params)
                .then(vResp => {
                    cartProductServices.deleteProducts({ cartId: parseInt(req.params.cartId), productId: parseInt(req.params.productId) }).then(cpResu => {
                        res.status(200).send({ error: false, message: successMsgs.SU00003, result: cpResu });
                    }).catch(cpErr => {
                        res.status(400).send({ error: true, message: errorMsgs.ER00008, result: cpErr });
                    })

                }).catch(cErr => {
                    res.status(500).send({ error: true, message: errorMsgs.ER00002, result: cErr });
                })
        } catch (e) {
            res.status(500).send({ error: true, message: errorMsgs.ER00001, result: e });
        }


    },

    /**
     * Delete products from the cart
     * @param {cartId, productId })} req params
     * @param {quantity })} req body
     * @param { succesfully delete products from the cart } res 
     */

    updateProductQuantity: (req, res) => {
        try {
            cartProductsValidators.deleteOrUpdateProductValidation(req.params)
                .then(vResp => {
                    if (req.body.quantity) {
                        cartProductServices.updateCartProducts({ quantity: req.body.quantity }, { cartId: parseInt(req.params.cartId), productId: parseInt(req.params.productId) }).then(cpResu => {
                            res.status(200).send({ error: false, message: successMsgs.SU00004, result: cpResu });
                        }).catch(cpErr => {
                            res.status(400).send({ error: true, message: errorMsgs.ER00009, result: cpErr });
                        })
                    } else {
                        res.status(500).send({ error: true, message: errorMsgs.ER00005, result: null });
                    }

                }).catch(cErr => {
                    res.status(500).send({ error: true, message: errorMsgs.ER00002, result: cErr });
                })
        } catch (e) {
            res.status(500).send({ error: true, message: errorMsgs.ER00001, result: e });
        }


    },



}
module.exports = { cartProductsController }