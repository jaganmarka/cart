const Joi = require('joi');
const cartValidations = {

    /**
     * Add Products To Cart details Validation
     */
    addProductsToCartValidation: (regObj) => {
        return new Promise(async (resolve, reject) => {
            var schema = Joi.object({
                userId: Joi.number().required(),
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
     userCartsValidation: (regObj) => {
        return new Promise(async (resolve, reject) => {
            var schema = Joi.object({
                userId: Joi.number().required()
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

module.exports = { cartValidations };