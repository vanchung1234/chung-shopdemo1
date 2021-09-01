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



    this.generateArr = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    }
};