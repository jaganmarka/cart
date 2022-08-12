const Joi = require('joi');
const cartProductsValidators = {

    /**
     * Add Products To Existing Cart details Validation
     */
    addProductsToExistingCartValidation: (regObj) => {
        return new Promise(async (resolve, reject) => {
            var schema = Joi.object({
                cartId: Joi.number().required(),
                products: Joi.array().items(
                    Joi.object().keys({
                        productId: Joi.number().required(),
                        quantity: Joi.number().required()
                    }).required()
                ).required(),
            })
            try {
                const value = await schema.validateAsync(regObj);
                resolve(value)
            }
            catch (err) {
                reject(err)
            }
        })
    },

    /**
     * delete or update product quantity of Cart Validation
     */
    deleteOrUpdateProductValidation: (regObj) => {
        return new Promise(async (resolve, reject) => {
            var schema = Joi.object({
                cartId: Joi.number().required(),
                productId: Joi.number().required()
            })
            try {
                const value = await schema.validateAsync(regObj);
                resolve(value)
            }
            catch (err) {
                reject(err)
            }
        })
    }

}

module.exports = { cartProductsValidators };