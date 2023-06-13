export class updateInventoryDisplay {
    constructor(scene, shareData) {
        this.scene = scene;
        this.shareData = shareData;
        this.inventoryText = this.scene.add.text(10, 450, 'Inventory: ', { fontSize: '12px', fill: '#FFFFFF'});
    }

    update() {
        let inventoryString = 'Inventory:\n';
        this.shareData.inventory.forEach((count, item) => {
            inventoryString += item + ': ' + count + '\n';
        });
        this.inventoryText.setText(inventoryString);
    }
}
