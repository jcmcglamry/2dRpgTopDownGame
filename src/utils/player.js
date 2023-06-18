import Phaser from 'phaser';


export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, shareData, lastDirection) {
        super(scene, x, y, 'player');
       
        this.scene = scene;
        this.inventory = []
        this.shareData = shareData
        this.lastDirection = lastDirection
       
   
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setBodySize(2,2)
        
    }

    update(cursors) {
        
        let speed = 50;
        
       if(this.shareData.isRunning === true){
         speed = 100;
         if(this.shareData.stamina <= 0){
            speed = 50
         }
        }
        this.setVelocity(0);
      if(this.shareData.isSleeping === false){
        if (cursors.down.isDown) {
            this.setVelocityY(speed);
            this.anims.play('walk-down', true);
            this.lastDirection = "down"
        } else if (cursors.up.isDown) {
            this.setVelocityY(-speed);
            this.anims.play('walk-up', true);
            this.lastDirection = "up"
        } 

        if (cursors.right.isDown) {
            this.setVelocityX(speed);
            this.anims.play('walk-right', true);
            this.lastDirection = "right"

        } else if (cursors.left.isDown) {
            this.setVelocityX(-speed);
            this.anims.play('walk-left', true);
            this.lastDirection = "left"
            
        } 
        
        if (!(cursors.up.isDown || cursors.down.isDown || cursors.left.isDown || cursors.right.isDown)) {
            this.anims.stop();
        }
        
    }
}
}
