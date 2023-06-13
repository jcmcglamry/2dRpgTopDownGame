

export class InventoryManager {
    constructor(scene, player, shareData, updateInventoryDisplay) {
        this.scene = scene;
        this.player = player;
        this.shareData = shareData;
        this.updateInventoryDisplay = updateInventoryDisplay;
        this.itemsData = this.scene.cache.json.get('items');
    }
create(){
    let itemsData = this.scene.cache.json.get('items');

  

    let carrotData = this.itemsData.find(item => item.name === 'carrot');

    if (carrotData) {
        // Generate a sprite for the carrot
        let carrotSprite = this.scene.physics.add.sprite(450, 300, carrotData.name);
        carrotSprite.name = carrotData.name;
        carrotSprite.setInteractive();
        this.scene.physics.add.overlap(this.player, carrotSprite, this.pickUpItem, null, this);
    }

}

    pickUpItem(player, item) {
        if (this.shareData.inventory.has(item.name)) {
            this.shareData.inventory.set(item.name, this.shareData.inventory.get(item.name) + 1);
        } else {
            this.shareData.inventory.set(item.name, 1);
        }
        item.disableBody(true, true);
        this.updateInventoryDisplay.update();
    }
}
