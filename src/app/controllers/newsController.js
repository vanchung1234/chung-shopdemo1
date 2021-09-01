const item = require('../models/Items');
class SiteController {

    show(req, res) {
        res.render('intro', {
            active: { intro: true }
        })
    }

    contact(req, res) {

        res.render('contact', {
            active: { contact: true }
        })
    }
}

module.exports = new SiteController;