const item = require('../models/Items');
class SiteController {

    show(req, res) {
        res.render('intro', {
            active: { intro: true },
            user: req.user
        })
    }

    contact(req, res) {

        res.render('contact', {
            active: { contact: true },
            user: req.user
        })
    }
}

module.exports = new SiteController;