const item = require('../models/Items');
const { mutipleMongooseToObject } = require('../../util/mongoose')
class adminController {

    show(req, res, next) {

        Promise.all([item.find({}), item.countDocumentsDeleted()])
            .then(([datas, deletedCount]) =>
                res.render('admin/storeditems', {
                    deletedCount,
                    datas: mutipleMongooseToObject(datas),
                    user: req.user,

                }),
            )
            .catch(next);
    }

    trash(req, res, next) {
        item.findDeleted({})
            .then(datas => {
                res.render('admin/trash', {
                    datas: mutipleMongooseToObject(datas),
                    user: req.user
                })
            })

        .catch(next)
    }

}

module.exports = new adminController;