import Phaser from "phaser";
import { createPlayerAnimations } from "./utils/animation";
import { Player } from "./utils/player";
import { Status } from "./utils/status";
import { RunController } from "./utils/runController";
import { updateInventoryDisplay } from "./utils/inventoryUpdate";
import { InventoryManager } from "./utils/inventoryManger";


export class Default extends Phaser.Scene {
    constructor(shareData) {
        super("Default");
        this.startingPosition = { x: 200, y: 180 };
        this.shareData = shareData
       
       
    }

    preload() {
        this.load.image('tiledImage', 'assets/MasterSimple.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/map.json');
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

    create() {
        const map = this.make.tilemap({ key: 'tilemap' });
        const tileset = map.addTilesetImage('MasterSimple', 'tiledImage');
        const mapWidthInPixels = map.width * map.tileWidth;
        const mapHeightInPixels = map.height * map.tileHeight;
        const xOffset = (this.sys.game.config.width - mapWidthInPixels) / 2;
        const yOffset = (this.sys.game.config.height - mapHeightInPixels) / 2;



        this.landTiles = map.createLayer('land', tileset, xOffset, yOffset);
        this.grassTiles = map.createLayer('grass', tileset, xOffset, yOffset);
        this.waterTiles = map.createLayer('water', tileset, xOffset,yOffset);
        this.boatWaterTiles = map.createLayer('boat(water)', tileset, xOffset,yOffset);
        this.boatTiles = map.createLayer('boat', tileset, xOffset,yOffset);
        this.ledgeTiles = map.createLayer('ledge', tileset, xOffset, yOffset)
        this.cliffsTiles = map.createLayer('cliffs', tileset, xOffset,yOffset);
        this.cliffTextureTiles = map.createLayer('cliffTexture', tileset, xOffset,yOffset);
        this.dockTiles = map.createLayer('dock', tileset, xOffset, yOffset)
        this.roadsTiles = map.createLayer('roads', tileset, xOffset,yOffset);
        this.treesTiles = map.createLayer('trees', tileset, xOffset,yOffset);
        this.objectsTiles = map.createLayer('objects', tileset, xOffset,yOffset);
        this.houseTiles = map.createLayer('house',tileset, xOffset, yOffset)
        this.nextMapTile = map.createLayer('nextMap', tileset, xOffset, yOffset)
      
        
      
        this.player = new Player(this, xOffset + this.startingPosition.x, yOffset + this.startingPosition.y, this.shareData);
        this.health = this.player.health
        this.physics.add.collider(this.player, this.treesTiles);
        this.treesTiles.setCollisionByExclusion([-1])
        this.physics.add.collider(this.player, this.landTiles);
        this.landTiles.setCollisionByExclusion([-1])
        this.physics.add.collider(this.player, this.waterTiles);
        this.waterTiles.setCollisionByExclusion([-1])
        this.physics.add.collider(this.player, this.objectsTiles);
        this.objectsTiles.setCollisionByExclusion([-1])

       
        
       
        
       
        this.updateInventoryDisplay = new updateInventoryDisplay(this, this.shareData, 80, 510);
        this.inventoryManager = new InventoryManager(this, this.player, this.shareData, this.updateInventoryDisplay);
        this.inventoryManager.createItem('carrot', 450,300)


        if(this.shareData.isAvailable === true){
        this.inventoryManager.createItem('Sword', 430,300 )
        }

       this.status = new Status(this, this.shareData)
        createPlayerAnimations(this.anims)
        this.runController = new RunController(this, this.player, this.shareData);
        this.physics.add.overlap(this.player, this.items, this.inventoryManager.pickUpItem, null, this);
        if(this.shareData.init = false)
        {
        this.shareData.player.x = this.player.x - 200;
        this.shareData.player.y = this.player.y + 280;
        this.updateInventoryDisplay.update()
       
        }
        this.cameras.main.startFollow(this.player);
    }

    update() {
        this.shareData.player.x = this.player.x;
        this.shareData.player.y = this.player.y;
        const cursors = this.input.keyboard.createCursorKeys();
        this.player.update(cursors)
        this.runController.update();
        this.status.update();
        this.updateInventoryDisplay.update()
       
       

        const tile = this.houseTiles.getTileAtWorldXY(this.player.x, this.player.y);

        if (tile) {
            this.enteredHouse(this.player, tile);
        }
        const boatTile = this.boatTiles.getTileAtWorldXY(this.player.x, this.player.y);
    if (boatTile) {
        this.enteredBoat(this.player, boatTile);
    }
        const tile2 = this.nextMapTile.getTileAtWorldXY(this.player.x, this.player.y);
        if(tile2){
            this.changeMap(this.player, tile2)
        }

}   
    changeMap(player, tile){
        if(tile.layer.name === 'nextMap'){
            this.scene.start('Cave', this.shareData)
           this.startingPosition = {x: 25, y: 180}
        }
    }

    enteredHouse(player, tile) {
        if (tile.layer.name === 'house') {
            this.scene.start('HouseScene')
            this.startingPosition = {x: 120, y: 90 }
        }
    }
    enteredBoat(player, boatTile) {
        if (boatTile.layer.name === 'boat') {
            this.scene.start('LakeScene')
            this.startingPosition = { x: 360, y: 180 };

        }
    }
   
  
}