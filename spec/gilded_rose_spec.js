describe("Gilded Rose", () => {
    var items;

    beforeEach(() => {
        items = [];
    });

    it("should decrease the sell_in and quality values by 1 for a default item", () => {
        items.push(new Item("+5 Dexterity Vest", 10, 20));

        updateItemStatus(items);

        expect(items[0].sell_in).toBe(9);
        expect(items[0].quality).toBe(19);
    });

    it("should decrease quality twice as fast if sell_in is less than 0", () => {
        items.push(new Item("+5 Dexterity Vest", -1, 20));

        updateItemStatus(items);

        expect(items[0].sell_in).toBe(-2);
        expect(items[0].quality).toBe(18);
    });

    it("should never let the quality value be negative", () => {
        items.push(new Item("+5 Dexterity Vest", 10, 0));

        updateItemStatus(items);

        expect(items[0].sell_in).toBe(9);
        expect(items[0].quality).toBe(0);
    });

    it("should increase the quality of Aged Brie the older it gets", () => {
        items.push(new Item("Aged Brie", 1, 0));

        updateItemStatus(items);

        expect(items[0].sell_in).toBe(0);
        expect(items[0].quality).toBe(1);
    });

    it("should never let the quality of an item go above 50", () => {
        items.push(new Item("Aged Brie", -50, 50));

        updateItemStatus(items);

        expect(items[0].sell_in).toBe(-51);
        expect(items[0].quality).toBe(50);
    });

    it("should never decrease the sell_in or quality values of Sulfuras", () => {
        items.push(new Item("Sulfuras, Hand of Ragnaros", 80, 80)),
            items.push(new Item("Sulfuras, Hand of Ragnaros", 70, 90));

        updateItemStatus(items);

        expect(items[0].sell_in).toBe(80);
        expect(items[0].quality).toBe(80);
        expect(items[1].sell_in).toBe(70);
        expect(items[1].quality).toBe(80);
    });

    it("should increase the quality of Backstage Passes the older it gets", () => {
        items.push(
            new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)
        );

        updateItemStatus(items);

        expect(items[0].sell_in).toBe(14);
        expect(items[0].quality).toBe(21);
    });

    it("should increase the quality of Backstage Passes by 2 when there are 10 days or less", () => {
        items.push(
            new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
            new Item("Backstage passes to a TAFKAL80ETC concert", 7, 21)
        );

        updateItemStatus(items);

        expect(items[0].sell_in).toBe(9);
        expect(items[0].quality).toBe(22);
        expect(items[1].sell_in).toBe(6);
        expect(items[1].quality).toBe(23);
    });

    it("should increase the quality of Backstage Passes by 3 when there are 5 days or less", () => {
        items.push(
            new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
            new Item("Backstage passes to a TAFKAL80ETC concert", 2, 25)
        );

        updateItemStatus(items);

        expect(items[0].sell_in).toBe(4);
        expect(items[0].quality).toBe(23);
        expect(items[1].sell_in).toBe(1);
        expect(items[1].quality).toBe(28);
    });

    it("should decrease the quality of Backstage Passes to 0 after the concert", () => {
        items.push(
            new Item("Backstage passes to a TAFKAL80ETC concert", -1, 20)
        );

        updateItemStatus(items);

        expect(items[0].sell_in).toBe(-2);
        expect(items[0].quality).toBe(0);
    });

    it("should decrease the quality of Conjured items twice as fast", () => {
        items.push(new Item("Conjured Mana Cake", 3, 6));

        updateItemStatus(items);

        expect(items[0].sell_in).toBe(2);
        expect(items[0].quality).toBe(4);
    });
});
