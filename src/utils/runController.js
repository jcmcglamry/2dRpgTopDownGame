

export class RunController {
    constructor(scene, player, shareData) {
        this.scene = scene;
        this.player = player;
        this.shareData = shareData;
        this.keyR = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        if(this.keyR.isDown && this.shareData.stamina !== 0){
            this.shareData.isRunning = true;
        }
        if(this.keyR.isUp){
            this.shareData.isRunning = false;
        }

        
    }
}
