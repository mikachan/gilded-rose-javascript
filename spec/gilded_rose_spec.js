describe("Gilded Rose", () => {
    var items;

    beforeEach(() => {
        items = [];
    });

    it("should lower the sell_in and quality values by 1 for a default item", () => {
        items.push(new Item("+5 Dexterity Vest", 10, 20));

        update_quality(items);

        expect(items[0].sell_in).toBe(9);
        expect(items[0].quality).toBe(19);
    });
});
