import Phaser from "phaser";


export class Stats extends Phaser.GameObjects.GameObject {
    constructor(scene, Player,  shareData){
        super(scene, 'Stats');
        this.Player = Player;
        this.shareData = shareData;
       
       
    }
   
    updateStats(itemData) {
        if(itemData.data !== undefined) {
            if(itemData.data.damage !== undefined) {
                this.shareData.damage += itemData.data.damage;
                console.log(this.shareData.damage)
                
            }
            
            if(itemData.data.defense !== undefined) {
                this.shareData.defense += itemData.data.defense;
                console.log(this.shareData.defense)
            }
    
            if(itemData.data.health !== undefined) {
                this.shareData.health += itemData.data.health;
                console.log(this.shareData.health)
            }
    
           if(itemData.data.stamina !== undefined) {
                this.shareData.staminaMax += itemData.data.stamina;
                console.log(this.shareData.staminaMax)
                
            }
        } 
    }
    removeItemFromInventory(itemData) {
       let item = this.shareData.inventory.get(itemData.data.name)
       console.log(item)  
        if (item) {
            item.count -= 1;
            if (item.count === 0) {
                this.shareData.inventory.delete(item);
            }
        }
    }
}