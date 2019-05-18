// Static values
const minQuality = 0;
const maxQuality = 50;
const sulfurasQuality = 80;

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

// Decrease quality
const decreaseQuality = (item, amount) => {
    // If quality is not at it's minimum amount
    if (item.quality > minQuality) {
        // And if the sell_in value is less than 0
        if (item.sell_in < 0) {
            // Decrease quality by twice the amount
            return (item.quality = item.quality - amount * 2);
        }
        // Decrease quality by normal amount
        return (item.quality = item.quality - amount);
    }

    // Do nothing if quality is already at minimum value
    return false;
};

// Increase quality
const increaseQuality = (item, amount) => {
    // If quality is less than the maximum quality amount
    if (item.quality < maxQuality) {
        // Increase the quality
        return (item.quality = item.quality + amount);
    }

    // Do nothing if quality is already at maximum value
    return false;
};

// Update quality and sell_in values. Run daily.
const updateItemStatus = items => {
    // Check we have items in stock
    if (items.length > 0) {
        // Alter each item
        items.map(item => {
            // Update sell_in for everything but Sulfuras
            if (!isSulfuras(item)) {
                // Decrease sell_in by 1 each day
                item.sell_in = item.sell_in - 1;
            }

            // Update quality
            if (isSulfuras(item)) {
                // Always make sure Sulfuras quality is 80
                item.quality = sulfurasQuality;
            }

            if (isAgedBrie(item)) {
                increaseQuality(item, 1);
            }

            if (isBackstagePasses(item)) {
                if (item.sell_in >= 11) {
                    increaseQuality(item, 1);
                }

                if (item.sell_in <= 10 && item.sell_in >= 6) {
                    increaseQuality(item, 2);
                }

                if (item.sell_in <= 5 && item.sell_in >= 1) {
                    increaseQuality(item, 3);
                }

                if (item.sell_in <= 0) {
                    item.quality = 0;
                }
            }

            if (isConjured(item)) {
                decreaseQuality(item, 2);
            }

            // If it's a normal item, decrease quality by 1 each day
            if (
                !isAgedBrie(item) &&
                !isBackstagePasses(item) &&
                !isConjured(item) &&
                !isSulfuras(item)
            ) {
                decreaseQuality(item, 1);
            }
        });
    }
};
