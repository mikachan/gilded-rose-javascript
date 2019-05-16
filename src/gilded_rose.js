// Check item type
const isAgedBrie = item => {
    return item.name === "Aged Brie";
};

const isSulfuras = item => {
    return item.name.includes("Sulfuras");
};

const isBackstagePasses = item => {
    return item.name.includes("Backstage passes");
};

const isConjured = item => {
    return item.name.includes("Conjured");
};

// Update quality and sell_in
const updateItemStatus = items => {
    for (var i = 0; i < items.length; i++) {
        if (!isAgedBrie(items[i]) && !isBackstagePasses(items[i])) {
            if (items[i].quality > 0) {
                if (!isSulfuras(items[i])) {
                    items[i].quality = items[i].quality - 1;
                }
            }
        } else {
            if (items[i].quality < 50) {
                items[i].quality = items[i].quality + 1;
                if (isBackstagePasses(items[i])) {
                    if (items[i].sell_in < 11) {
                        if (items[i].quality < 50) {
                            items[i].quality = items[i].quality + 1;
                        }
                    }
                    if (items[i].sell_in < 6) {
                        if (items[i].quality < 50) {
                            items[i].quality = items[i].quality + 1;
                        }
                    }
                }
            }
        }
        if (!isSulfuras(items[i])) {
            items[i].sell_in = items[i].sell_in - 1;
        }
        if (items[i].sell_in < 0) {
            if (!isAgedBrie(items[i])) {
                if (!isBackstagePasses(items[i])) {
                    if (items[i].quality > 0) {
                        if (!isSulfuras(items[i])) {
                            items[i].quality = items[i].quality - 1;
                        }
                    }
                } else {
                    items[i].quality = items[i].quality - items[i].quality;
                }
            } else {
                if (items[i].quality < 50) {
                    items[i].quality = items[i].quality + 1;
                }
            }
        }
    }
};
