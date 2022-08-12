const { cartValidations } = require('../validators/cartValidators');
const { errorMsgs, successMsgs } = require('../constants/commonConsts');
const { cartServices, cartProductServices } = require('../services/cartServices');
const { cartHelper } = require('../helpers/cartHelper');


const cartController = {
    /**
     * Add Products to the cart
     * @param {userId : integer , products: array of(items {productId: integer,quantity:integer })} req as body params
     * @param { succesfully add products to cart } res 
     */
    addProductsToCart: (req, res) => {
        try {
            cartValidations.addProductsToCartValidation(req.body)
                .then(vResp => {
                    cartServices.addToCart({ userId: req.body.userId }).then(cResu => {
                        let bulkProducts = cartHelper.bulkProductsObj(req.body.products, cResu.id)
                        cartProductServices.bulkCartProductsCreate(bulkProducts).then(cpResu => {
                            res.status(200).send({ error: false, message: successMsgs.SU00001, result: { cart: cResu, cart_products: cpResu } });
                        }).catch(cpErr => {
                            res.status(400).send({ error: true, message: errorMsgs.ER00009, result: cpErr });
                        })

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

    getUserCarts: (req, res) => {
        try {
            cartValidations.userCartsValidation (req.params)
                .then(vResp => {
                    let limit = cartHelper.checkIsNumExisting(req.query.limit) ? parseInt(req.query.limit) : 50;
                    let offset = cartHelper.checkIsNumExisting(req.query.offset) ? parseInt(req.query.limit) : 0;
                    cartServices.getUserCart({userId: parseInt(req.params.userId)}, limit, offset).then(cpResu => {
                        res.status(200).send({ error: false, message: successMsgs.SU00005, result: cpResu });
                    }).catch(cpErr => {
                        res.status(400).send({ error: true, message: errorMsgs.ER00003, result: cpErr });
                    })
                }).catch(cErr => {
                    res.status(500).send({ error: true, message: errorMsgs.ER00002, result: cErr });
                })
        } catch (e) {
            res.status(500).send({ error: true, message: errorMsgs.ER00001, result: e });
        }


    },



}
module.exports = { cartController }