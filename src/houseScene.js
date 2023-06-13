import Phaser from "phaser";
import { createPlayerAnimations } from "./utils/animation";
import { Player } from "./utils/player";
import { RunController } from "./utils/runController";
import { Status } from "./utils/status";

export class HouseScene extends Phaser.Scene {
    constructor(shareData) {
        super('HouseScene');
        this.shareData = shareData
    }

    preload() {
        this.load.image('houseMap', 'assets/houseSet.png');
        this.load.tilemapTiledJSON('housekey', 'assets/House.json');
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('textBox', 'assets/textBox.png');
        this.load.image('asleep', 'assets/asleep.png')
    }

    create() {
        const map = this.make.tilemap({ key: 'housekey' });
        const tileset = map.addTilesetImage('houseSet', 'houseMap');
        const mapWidthInPixels = map.width * map.tileWidth;
        const mapHeightInPixels = map.height * map.tileHeight;
        const xOffset = (this.sys.game.config.width - mapWidthInPixels) / 2;
        const yOffset = (this.sys.game.config.height - mapHeightInPixels) / 2;



        this.floorTiles = map.createLayer('floor', tileset, xOffset, yOffset);
        this.sideWallTiles = map.createLayer('SideWalls', tileset, xOffset, yOffset);
        this.backWallTiles = map.createLayer('BackWall', tileset, xOffset,yOffset);
        this.frontWallTiles = map.createLayer('FrontWall', tileset, xOffset,yOffset);
        this.frontDoorTiles = map.createLayer('FrontDoor', tileset, xOffset,yOffset);
        this.FurnitureTiles = map.createLayer('Furniture', tileset, xOffset,yOffset);
        this.bedTile = map.createLayer('bed', tileset, xOffset, yOffset);
        this.textBox = this.add.image(this.cameras.main.centerX, this.cameras.main.height - 250, 'textBox').setVisible(false);
        this.text = this.add.text(this.cameras.main.centerX, this.cameras.main.height - 250, '', { fontSize: '16px', fill: '#000' }).setOrigin(0.5).setVisible(false);
        this.bedImage = this.add.image(0 , 0,'asleep').setVisible(false)
        this.player = new Player(this, xOffset + 130, yOffset + 200, this.shareData);
       
        this.physics.add.collider(this.player, this.FurnitureTiles);
        this.FurnitureTiles.setCollisionByExclusion([-1])
        this.physics.add.collider(this.player, this.sideWallTiles);
        this.sideWallTiles.setCollisionByExclusion([-1])
        this.physics.add.collider(this.player, this.backWallTiles);
        this.backWallTiles.setCollisionByExclusion([-1])
        this.physics.add.collider(this.player, this.frontWallTiles);
        this.frontWallTiles.setCollisionByExclusion([-1])
        this.physics.add.collider(this.player, this.bedTile, this.sleep, null, this)
        this.bedTile.setCollisionByExclusion([-1])
       
      

        createPlayerAnimations(this.anims) 
        // this.inventoryText = this.add.text(10, 450, 'Inventory: ', { fontSize: '12px', fill: '#FFFFFF'});
        // this.updateInventoryDisplay()
        this.status = new Status(this, this.shareData)
        this.runController = new RunController(this, this.player, this.shareData);
       

        this.KeyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    
    }

    update() {
        const cursors = this.input.keyboard.createCursorKeys();
        this.player.update(cursors)
        this.runController.update();
        this.status.update();
        this.shareData.isRunning = false;
       
        const tile = this.frontDoorTiles.getTileAtWorldXY(this.player.x, this.player.y);
        if (tile) {
            this.leavingHouse(this.player, tile);
        }
    
    }

    leavingHouse(player, tile) {
        if (tile.layer.name === 'FrontDoor') {
            this.shareData.stamina = 100;
            this.scene.start('Default')
            
        }
    }
     sleep() {
        if(Phaser.Input.Keyboard.JustDown(this.KeyE)){
            this.text.text = "Sleeping...";
            this.text.setVisible(true);
            this.textBox.setVisible(true);
            this.player.setVisible(false)
            this.shareData.isSleeping = true;
            this.bedTile.setVisible(false)
            this.bedImage.setVisible(true)
            this.bedImage.setPosition(this.bedTile.x + 40, this.bedTile.y  + 64)
    
            // Set a delay to hide textBox and text after 3 seconds
            this.time.delayedCall(3000, () => {
                this.text.setVisible(false);
                this.textBox.setVisible(false);
                this.player.setVisible(true)
                this.shareData.isSleeping = false;
                this.bedImage.setVisible(false)
                this.bedTile.setVisible(true)
                this.shareData.health = 100;
            });
        }
    
   }
}