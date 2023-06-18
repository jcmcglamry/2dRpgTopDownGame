import Phaser from "phaser";


export class Status extends Phaser.GameObjects.Container {
    constructor(scene, shareData) {
        super(scene);
        this.scene = scene;
        this.shareData = shareData;
        this.scene.add.existing(this);
        
        this.healthBarBackground = this.scene.add.rectangle(10, 10, this.shareData.health, 20, 0xFFFFFF).setOrigin(0, 0);
        this.healthBar = this.scene.add.rectangle(10, 10, this.shareData.health, 20, 0xFF0000).setOrigin(0, 0);
        
        this.staminabarBackground = this.scene.add.rectangle(10, 40, this.shareData.staminaMax, 20, 0xFFFFFF).setOrigin(0, 0);
        this.staminaBar = this.scene.add.rectangle(10, 40, this.shareData.stamina, 20, 0x00FF00).setOrigin(0, 0);

        this.add([this.healthBarBackground, this.healthBar, this.staminabarBackground, this.staminaBar]);
        
        
        
    }
   
    update() {
       
        this.setPosition(this.scene.player.x- 400, this.scene.player.y + 200)
        this.shareData.health = Phaser.Math.Clamp(this.shareData.health, 0, this.shareData.health);
        this.shareData.stamina = Phaser.Math.Clamp(this.shareData.stamina, 0, this.shareData.staminaMax);
        this.healthBarBackground = Phaser.Math.Clamp(this.shareData.health, 100, this. shareData.health)
        this.staminabarBackground = Phaser.Math.Clamp(this.shareData.staminaMax, 100, this.shareData.staminaMax)
       
        this.healthBar.width = this.shareData.health
        this.staminaBar.width = this.shareData.stamina
        
        if(this.shareData.isRunning === true){
            this.shareData.stamina -= 0.5;
        }
        if(this.shareData.isRunning === false){
            this.shareData.stamina += 0.1;
        }
      
    }
    
    handlePlayerHeal(amount) {
        // Increase player's health
        this.shareData.health += amount;
        this.shareData.health = Phaser.Math.Clamp(this.shareData.health, 0, 100);
        
        // Now you can update the health bar
        this.healthBar.width = this.shareData.health * 2;
        
        // Here, you can decide what to do when the player's health reaches zero
        if (this.shareData.health <= 0) {
            // handle player death
        }
    }

    handlePlayerDamage(amount) {
        // Reduce player's health
        this.shareData.health -= amount;
        this.shareData.health = Phaser.Math.Clamp(this.shareData.health, 0, this.shareData.health);

        // Now you can update the health bar
        this.healthBar.width = this.shareData.health * 2;
        
        // Here, you can decide what to do when the player's health reaches zero
        if (this.shareData.health <= 0) {
            // handle player death
        }
    }
   
}    
