import Phaser from "phaser";
import { Default } from "./DefaultScene";
import { HouseScene } from "./houseScene";
import { LakeScene } from "./lake";
import { World } from "./world";

const shareData = {
    isSleeping: false,
    isRunning: false,
}

const config = {
    type: Phaser.AUTO,
    parent: "phaserGame",
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [new Default(shareData), new World(shareData), new HouseScene(shareData), new LakeScene(shareData)]
};

const game = new Phaser.Game(config);
