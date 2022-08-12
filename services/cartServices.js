const cartsModel = require('../models').carts;
const cartProductsModel = require('../models').cart_products;

const cartServices = {
    addToCart: (obj) => {
        return new Promise((resolve, reject) => {
            try {
                cartsModel.create(obj)
                    .then(resp => {
                        resolve(resp)
                    }).catch(err => {
                        reject(err)
                    })
            } catch (e) {
                reject(e)
            }
        })
    },
    getCart: (methode, whereObj) => {
        return new Promise((resolve, reject) => {
            try {
                cartsModel[methode]({
                    where: whereObj,
                }).then(resp => {
                    resolve(resp)
                }).catch(err => {
                    reject(err)
                })
            } catch (e) {
                reject(e)
            }
        })
    },
    getUserCart: (whereObj, limit, offset) => {
        return new Promise((resolve, reject) => {
            try {
                cartsModel.findAll({
                    where: whereObj,
                    limit: limit,
                    offset: offset,
                    include: [{
                        attributes: { exclude: ["cartId"] },
                        model: cartProductsModel,
                    }]
                }).then(resp => {
                    resolve(resp)
                }).catch(err => {
                    reject(err)
                })
            } catch (e) {
                reject(e)
            }
        })
    }
};

const cartProductServices = {
    bulkCartProductsCreate: (bulkObj) => {
        return new Promise((resolve, reject) => {
            try {
                cartProductsModel.bulkCreate(bulkObj, { returning: true })
                    .then(resp => {
                        resolve(resp)
                    }).catch(err => {
                        reject(err)
                    })
            } catch (e) {
                reject(e)
            }
        })
    },

    deleteProducts: (whereObj) => {
        return new Promise((resolve, reject) => {
            try {
                cartProductsModel.destroy({ where: whereObj })
                    .then(resp => {
                        resolve(resp)
                    }).catch(err => {
                        reject(err)
                    })
            } catch (e) {
                reject(e)
            }
        })
    },
    updateCartProducts: (object, whereObj) => {
        return new Promise((resolve, reject) => {
            try {
                cartProductsModel.update(object, { where: whereObj, returning: true, plain: true })
                    .then(resp => {
                        resolve(resp)
                    }).catch(err => {
                        reject(err)
                    })
            } catch (e) {
                reject(e)
            }
        })
    },
}

module.exports = { cartServices, cartProductServices }