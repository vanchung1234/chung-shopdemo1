const item = require('../models/Items');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose')

class AllController {

    index(req, res, next) {
        var page = parseInt(req.query.page) || 1;
        var perPage = 6;
        var start = (page - 1) * perPage;
        var end = page * perPage;
        item.find()
            .then((datas) => {
                res.render('allproduct/allproduct', {
                    datas: mutipleMongooseToObject(datas).slice(start, end),
                    user: req.user,
                    title_page: 'allproduct',
                    active: { allproduct: true }
                })
            })
            .catch(next)

    }

    search(req, res, next) {
        var query = req.query.name;
        item.find({ name: query })
            .then((search) => {
                res.render('allproduct/allproduct', {
                    search: mutipleMongooseToObject(search),
                    user: req.user,

                })
            })
            .catch(next)

    }

    category(req, res, next) {

        item.find({ use: req.params.use })
            .then((data) => {
                res.render('allproduct/category', {
                    data: mutipleMongooseToObject(data),
                    user: req.user
                })
            })
            .catch(next)
    }


}

module.exports = new AllController;