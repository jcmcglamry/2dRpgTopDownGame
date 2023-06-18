export class InventoryManager {
    constructor(scene, player, shareData, updateInventoryDisplay) {
        this.scene = scene;
        this.player = player;
        this.shareData = shareData;
        this.updateInventoryDisplay = updateInventoryDisplay;
        this.itemsData = this.scene.cache.json.get('items');

        // Initialize a map to store the data of the picked-up items.
        if (!this.shareData.pickedItemsData) {
            this.shareData.pickedItemsData = new Map();
        }

        
    }

    

    pickUpItem(player, item) {
        // Find the data for the item that was picked up
        let itemData = this.itemsData.find(itemData => itemData.name === item.name);
    
        // If the item is already in the inventory, increment the count
        if (this.shareData.inventory.has(item.name)) {
            let itemInfo = this.shareData.inventory.get(item.name);
            itemInfo.count++;
            this.shareData.inventory.set(item.name, itemInfo);
        } 
        // Otherwise, add the item to the inventory with a count of 1
        else {
            this.shareData.inventory.set(item.name, { count: 1, data: itemData });
        }
    
        item.disableBody(true, true);
        this.updateInventoryDisplay.update();
       
        this.shareData.isAvailable = false;
    }
    
    createItem(itemName, x, y) {
        let itemData = this.itemsData.find(item => item.name === itemName);

        if (itemData) {
            let itemSprite = this.scene.physics.add.sprite(x, y, itemData.name);
            itemSprite.name = itemData.name;

            this.scene.physics.add.overlap(this.player, itemSprite, this.pickUpItem, null, this);
        }

}
   
}
