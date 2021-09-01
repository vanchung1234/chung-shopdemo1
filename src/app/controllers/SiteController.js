const item = require('../models/Items');
const { mutipleMongooseToObject } = require('../../util/mongoose')
class SiteController {


    index(req, res, next) {

        Promise.all([item.find({ type: 'pet' }).limit(3), item.find({ type: 'item' }).limit(3), item.find({ type: 'clothes' }).limit(3), item.find({ type: 'food' }).limit(3)])
            .then(([pet, datas, clothes, food]) =>
                res.render('homepage', {
                    pet: mutipleMongooseToObject(pet),
                    datas: mutipleMongooseToObject(datas),
                    clothes: mutipleMongooseToObject(clothes),
                    food: mutipleMongooseToObject(food),
                    user: req.user,
                    title_page: 'home',
                    active: { Home: true }
                }),
            )
            .catch(next);
    }


}

module.exports = new SiteController;