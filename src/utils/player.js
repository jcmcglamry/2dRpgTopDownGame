import Phaser from 'phaser';


export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, shareData) {
        super(scene, x, y, 'player');
        this.health = 100;
        this.stamina = 100;
        this.scene = scene;
        this.sharedData = shareData

        
   
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setBodySize(2,2)
        
    }
   
    update(cursors) {
        let speed = 50;
        this.health =  Phaser.Math.Clamp(this.health, 0, 100);
       if(this.sharedData.isRunning === true){
         speed = 100
         this.stamina -=1
         if(this.stamina<=0){
            speed = 50
         }
    }
        this.setVelocity(0);
      if(this.sharedData.isSleeping === false){
        if (cursors.down.isDown) {
            this.setVelocityY(speed);
            this.anims.play('walk-down', true);
        } else if (cursors.up.isDown) {
            this.setVelocityY(-speed);
            this.anims.play('walk-up', true);
        } 

        if (cursors.right.isDown) {
            this.setVelocityX(speed);
            this.anims.play('walk-right', true);
        } else if (cursors.left.isDown) {
            this.setVelocityX(-speed);
            this.anims.play('walk-left', true);
        } 

        if (!(cursors.up.isDown || cursors.down.isDown || cursors.left.isDown || cursors.right.isDown)) {
            this.anims.stop();
        }
    
    }
}
    handlePlayerHeal() {
        this.health += 30;
    }

    handlePlayerDamage() {
        this.health -= 2;
    }
}
