import Phaser from "phaser";
import { Player } from "./utils/player";
import { createPlayerAnimations } from "./utils/animation";
import { InventoryManager } from "./utils/inventoryManger";
import { updateInventoryDisplay } from "./utils/inventoryUpdate";
import { RunController } from "./utils/runController";
import { Status } from "./utils/status";

export class World extends Phaser.Scene{
    constructor(shareData){
        super('World');
        this.shareData = shareData;
    }
    preload(){
        this.load.image('tiledImage2', 'assets/MasterSimple.png')
        this.load.tilemapTiledJSON('tilemap2', 'assets/world.json')
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 48, frameHeight: 48 });
        this.load.json('items', 'assets/items.json')
        this.load.once('filecomplete-json-items', () => {
            let itemsData = this.cache.json.get('items');
            this.load.image('inventoryBackground', 'assets/textBox2.png');

            itemsData.forEach(item => {
                this.load.image(item.name, item.imagePath);
            });
            
            this.load.start();
        });
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

        this.player = new Player(this, xOffset + 500, yOffset + 500, this.shareData);    
        createPlayerAnimations(this.anims)
        this.cameras.main.startFollow(this.player);
        
        this.updateInventoryDisplay = new updateInventoryDisplay(this, this.shareData);
        this.inventoryManager = new InventoryManager(this, this.player, this.shareData, this.updateInventoryDisplay);
        this.status = new Status(this, this.shareData) 
        this.runController = new RunController(this, this.player, this.shareData);

       // this.inventoryManager.createItem('carrot', 450,300)
       this.shareData.player.x = this.player.x + 3185;
        this.shareData.player.y = this.player.y + 3700;
       this.updateInventoryDisplay.update()
       console.log(this.updateInventoryDisplay.inventoryBackground.x, this.updateInventoryDisplay.inventoryBackground.y)
       console.log(this.shareData.player.x, this.shareData.player.y)

    }
    update(){
        this.updateInventoryDisplay.update()
        this.shareData.player.x = this.player.x
        this.shareData.player.x = this.player.y
        const cursors = this.input.keyboard.createCursorKeys();
        this.player.update(cursors)
        this.runController.update();
        this.status.update();
    }
}
