import Phaser from "phaser";
import { Default } from "./DefaultScene";
import { HouseScene } from "./houseScene";
import { LakeScene } from "./lake";


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
    scene: [Default, HouseScene, LakeScene]
};

const game = new Phaser.Game(config);
