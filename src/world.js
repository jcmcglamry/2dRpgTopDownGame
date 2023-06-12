import Phaser from "phaser";

export class World extends Phaser.Scene{
    constructor(){
        super('World')
    }
    preload(){
        this.load.image('tiledImage2', 'assets/MasterSimple.png')
        this.load.tilemapTiledJSON('tilemap2', 'assets/world.json')

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


           
    
    
    
    }
}