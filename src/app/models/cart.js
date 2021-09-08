module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};

    this.totalQty = oldCart.totalQty || 0;
    this.totalcost = oldCart.totalcost || 0;

    this.add = function(item, id) {
        let storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = { item: item, cost: item.cost, img: item.img, desc: item.desc, qty: 0, cost: 0 };
        }
        storedItem.qty++;
        storedItem.cost = storedItem.item.cost * storedItem.qty;
        this.totalQty++;
        this.totalcost += storedItem.item.cost;
    };

    this.reduce = function(id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;

        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };

    this.remove = function(id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };



    this.generateArr = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    }
};