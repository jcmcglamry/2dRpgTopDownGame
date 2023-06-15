export class updateInventoryDisplay {
    constructor(scene, shareData, initialX, initialY) {
        this.scene = scene;
        this.shareData = shareData;
        
        // Create the background for the inventory display at the specified coordinates
        this.inventoryBackground = this.scene.add.sprite(initialX, initialY, 'inventoryBackground');
        
        // Use a group to contain all item images and quantity text objects
        this.inventoryGroup = this.scene.add.group();
        
        
    }

    update() {
       
    
       
        this.inventoryBackground.setPosition(this.scene.player.x + 300, this.scene.player.y + 200);
       
    
      
        let x = this.scene.player.x + 300;  
        let y = this.scene.player.y + 200;  
    
       
        this.inventoryGroup.clear(true, true);
    
       
        this.shareData.inventory.forEach((itemData, itemName) => {
          
            let itemImage = this.scene.add.sprite(x, y, itemName);
            
            this.inventoryGroup.add(itemImage);
    
          
            let quantityText = this.scene.add.text(x - 30, y, `x${itemData.count}`, { fontSize: '12px', fill: '#FFFFFF' });
           
            this.inventoryGroup.add(quantityText);
    
            x += 70;  
        });
    }
}
