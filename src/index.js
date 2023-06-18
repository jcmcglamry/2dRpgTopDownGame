import Phaser from "phaser";
import { Default } from "./DefaultScene";
import { HouseScene } from "./houseScene";
import { LakeScene } from "./lake";
import { World } from "./world";
import { Cave } from "./cave";

const shareData = {
    isSleeping: false,
    isRunning: false,
    inHouse: true,
    inventory: new Map(),
    health: 100,
    stamina:100,
    defense:6,
    damage:6,
    staminaMax: 100,
    isAvailable: true,
    player: {x: 0,y: 0},
    init: false,
    sceneCount: 0,
    caveInit: false,
    enemyCount: 1,
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
    scene: [new HouseScene(shareData), new Cave(shareData), new Default(shareData),  new World(shareData), new LakeScene(shareData)]
};

const game = new Phaser.Game(config);
