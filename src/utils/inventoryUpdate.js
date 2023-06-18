import { Stats } from "./stats";

export class updateInventoryDisplay{
    constructor(scene, Player, shareData, initialX, initialY) {
     
        this.scene = scene;
        this.shareData = shareData;
        this.tooltips = [];  // Add this line to initialize an array to store tooltips
        this.Player = Player
        // Create the background for the inventory display at the specified coordinates
        this.inventoryBackground = this.scene.add.sprite(initialX, initialY, 'inventoryBackground');
        
        // Use a group to contain all item images and quantity text objects
        this.inventoryGroup = this.scene.add.group();
        this.stats = new Stats(this.scene, this.Player, this.shareData);
    }

    update() {

      
        this.inventoryBackground.setPosition(this.scene.player.x + 300, this.scene.player.y + 200);
        let x = this.scene.player.x + 300;  
        let y = this.scene.player.y + 200;  
        if(this.shareData.inHouse === true){
            this.inventoryBackground.setPosition(100, 100)
             x = 100
             y = 100
        }
        this.inventoryGroup.clear(true, true);
    
        let loopCount = 0;
       
        this.shareData.inventory.forEach((itemData, itemName) => {
            if(itemData.count === 0) return;
            let itemImage = this.scene.add.sprite(x - 60, y -60, itemName);
           

            this.inventoryGroup.add(itemImage);
           this.setupItemInteraction(itemImage, itemData);
            let quantityText = this.scene.add.text(x - 40, y -60, `x${itemData.count}`, { fontSize: '12px', fill: '#000000' });
            this.inventoryGroup.add(quantityText);
    
            x += 70; 
            if(loopCount === 1){
                x -=140;
                y += 20;
                loopCount = 0;
            } else{
                loopCount +=1;
            }
        });
        
    }
    
    setupItemInteraction(itemImage, itemData) {
        itemImage.setInteractive();
        
        itemImage.on('pointerover', () => {
            let tooltip = this.scene.add.text(itemImage.x, itemImage.y - itemImage.height, itemData.data.description, { fill: '#ffffff' });
            this.tooltips.push(tooltip);
        });
    
        itemImage.on('pointerout', () => {
            if (this.tooltips.length > 0) {
                this.tooltips[this.tooltips.length - 1].destroy();
                this.tooltips.pop();
            }
        });
        itemImage.on('pointerup', () => {
            this.stats.updateStats(itemData)
            this.stats.removeItemFromInventory(itemData)
            this.inventoryGroup.clear(true,true)
            this.update()
            this.tooltips[this.tooltips.length - 1].destroy();
            this.tooltips.pop();
        });
    }
    removeDisplay(){
        this.inventoryGroup.clear(true,true)
       this.inventoryBackground.destroy()
    }
    
}