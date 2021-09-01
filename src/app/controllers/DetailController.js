const item = require('../models/Items');
const { mongooseToObject } = require('../../util/mongoose')
const { mutipleMongooseToObject } = require('../../util/mongoose')

class detailController {


    show(req, res, next) {
        item.findOne({ slug: req.params.slug })
            .then(function(datas) {

                if (datas.type === "pet") {
                    item.find({ type: 'pet' })
                        .then((relatedpet) =>
                            res.render('items/detail', {
                                datas: mongooseToObject(datas),
                                relatedpet: mutipleMongooseToObject(relatedpet),
                                user: req.user
                            }),
                        )
                        .catch(next);
                } else if (datas.type === "item") {
                    item.find({ type: 'item' })
                        .then((relateditem) =>
                            res.render('items/detail', {
                                datas: mongooseToObject(datas),
                                relateditem: mutipleMongooseToObject(relateditem),
                                user: req.user
                            }),
                        )
                        .catch(next);
                } else if (datas.type === "food") {
                    item.find({ type: 'food' })
                        .then((relatedfood) =>
                            res.render('items/detail', {
                                datas: mongooseToObject(datas),
                                relatedfood: mutipleMongooseToObject(relatedfood),
                                user: req.user
                            }),
                        )
                        .catch(next);
                } else if (datas.type === "clothes") {
                    item.find({ type: 'clothes' })
                        .then((relatedclothes) =>
                            res.render('items/detail', {
                                datas: mongooseToObject(datas),
                                relatedclothes: mutipleMongooseToObject(relatedclothes),
                                user: req.user
                            }),
                        )
                        .catch(next);
                }

            })
            .catch(next);
    }



    create(req, res, next) {
        res.render('items/create', {
            user: req.user,
            title_page: 'create',

        })

    }

    store(req, res, next) {

        const data = new item(req.body);
        data
            .save()

        .then(() => res.redirect('/admin/storeditems'))
            .catch((error) => {});
    }

    edit(req, res, next) {
        item.findById(req.params.id)
            .then((datas) =>
                res.render('items/edit', {
                    datas: mongooseToObject(datas),
                    user: req.user
                }),
            )
            .catch(next);
    }

    update(req, res, next) {
        item.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/storeditems'))
            .catch(next)
    }

    deletesoft(req, res, next) {
        item.delete({ _id: req.params.id })
            .then(() => res.redirect('/admin/storeditems'))
            .catch(next)


    }

    restore(req, res, next) {
        item.restore({ _id: req.params.id })
            .then(() => res.redirect('/admin/trash'))
            .catch(next)

    }
    deleteforce(req, res, next) {
        item.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/admin/trash'))
            .catch(next)
    }




}

module.exports = new detailController;