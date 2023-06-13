import Phaser from "phaser";
import { Player } from "./utils/player";
import { createPlayerAnimations } from "./utils/animation";

export class World extends Phaser.Scene{
    constructor(shareData){
        super('World');
        this.shareData = shareData;
    }
    preload(){
        this.load.image('tiledImage2', 'assets/MasterSimple.png')
        this.load.tilemapTiledJSON('tilemap2', 'assets/world.json')
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 48, frameHeight: 48 });

    }
    create(){
        const map = this.make.tilemap({key:'tilemap2'});
        const tileset = map.addTilesetImage('MasterSimple', 'tiledImage2');
        const mapWidthInPixels = map.width * map.tileWidth;
        const mapHeightInPixels = map.height * map.tileHeight;
        const xOffset = (this.sys.game.config.width - mapWidthInPixels) / 2;
        const yOffset = (this.sys.game.config.height - mapHeightInPixels) / 2;

        this.baseLayerTile = map.createLayer('baseLayer', tileset, xOffset, yOffset);
        this.transitionTiles = map.createLayer('transition', tileset, xOffset, yOffset);

        this.player = new Player(this, xOffset, yOffset, this.shareData);    
        createPlayerAnimations(this.anims)
        this.cameras.main.startFollow(this.player);

    }
    update(){
        const cursors = this.input.keyboard.createCursorKeys();
        this.player.update(cursors)
    }
}
