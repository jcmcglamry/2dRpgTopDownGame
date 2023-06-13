import Phaser from "phaser";

export class Status extends Phaser.GameObjects.Container {
    constructor(scene, shareData) {
        super(scene);
        this.scene = scene;
        this.shareData = shareData;
        this.scene.add.existing(this);

        this.healthBarBackground = this.scene.add.rectangle(10, 10, 200, 20, 0xFFFFFF).setOrigin(0, 0);
        this.healthBar = this.scene.add.rectangle(10, 10, this.shareData.health * 2, 20, 0xFF0000).setOrigin(0, 0);
        
        this.staminabarBackground = this.scene.add.rectangle(10, 40, 200, 20, 0xFFFFFF).setOrigin(0, 0);
        this.staminaBar = this.scene.add.rectangle(10, 40, this.shareData.stamina * 2, 20, 0x00FF00).setOrigin(0, 0);

        this.add([this.healthBarBackground, this.healthBar, this.staminabarBackground, this.staminaBar]);
    }

    update() {
        this.shareData.health = Phaser.Math.Clamp(this.shareData.health, 0, 100);
        this.shareData.stamina = Phaser.Math.Clamp(this.shareData.stamina, 0, 100);
        this.healthBar.width = this.shareData.health * 2;
        this.staminaBar.width = this.shareData.stamina * 2;

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
        this.shareData.health = Phaser.Math.Clamp(this.shareData.health, 0, 100);

        // Now you can update the health bar
        this.healthBar.width = this.shareData.health * 2;
        
        // Here, you can decide what to do when the player's health reaches zero
        if (this.shareData.health <= 0) {
            // handle player death
        }
    }
}

