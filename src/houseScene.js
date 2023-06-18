import Phaser from "phaser";
import { createPlayerAnimations } from "./utils/animation";
import { Player } from "./utils/player";
import { RunController } from "./utils/runController";
import { updateInventoryDisplay } from "./utils/inventoryUpdate";
import { InventoryManager } from "./utils/inventoryManger";
export class HouseScene extends Phaser.Scene {
    constructor(shareData) {
        super('HouseScene');
        this.shareData = shareData
        this.startingPostion = {x:60, y:60}
        this.start = false
    }

    preload() {
        this.load.image('houseMap', 'assets/houseSet.png');
        this.load.tilemapTiledJSON('housekey', 'assets/House.json');
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('textBox', 'assets/textBox.png');
        this.load.image('asleep', 'assets/asleep.png')
        this.load.image('textBox2', 'assets/textBox2.png')
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
        this.FurnitureTiles = map.createLayer('Furniture', tileset, xOffset,yOffset);
        this.bedTile = map.createLayer('bed', tileset, xOffset, yOffset);
        this.deskTile = map.createLayer('desk', tileset, xOffset, yOffset);
        this.textBox = this.add.image(this.cameras.main.centerX, this.cameras.main.height - 250, 'textBox').setVisible(false);
        this.text = this.add.text(this.cameras.main.centerX, this.cameras.main.height - 250, '', { fontSize: '16px', fill: '#000' }).setOrigin(0.5).setVisible(false);
        this.textBox2 = this.add.image(this.cameras.main.centerX, this.cameras.main.height, 'textBox2').setVisible(false)
        this.bedImage = this.add.image(0 , 0,'asleep').setVisible(false)
        this.player = new Player(this, xOffset + this.startingPostion.x, yOffset + this.startingPostion.y, this.shareData);
        this.frontDoorTiles = map.createLayer('FrontDoor', tileset, xOffset,yOffset);
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
        this.physics.add.collider(this.player, this.deskTile, this.study, null, this)
        this.deskTile.setCollisionByExclusion([-1])
        this.InventoryManager = new InventoryManager(this, this.player, this.shareData, this.updateInventoryDisplay)
      

        createPlayerAnimations(this.anims) 
        // this.inventoryText = this.add.text(10, 450, 'Inventory: ', { fontSize: '12px', fill: '#FFFFFF'});
        // this.updateInventoryDisplay()
       
        this.runController = new RunController(this, this.player, this.shareData);
       

        this.KeyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.KeyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.shareData.inHouse = true
        
        if(this.start !== true){        
            this.text.text = "Wake up..";
            this.text.setVisible(true);
            this.textBox.setVisible(true);
            this.player.setVisible(false)
            this.shareData.isSleeping = true;
            this.bedTile.setVisible(false)
            this.bedImage.setVisible(true)
            this.bedImage.setPosition(this.bedTile.x + 40, this.bedTile.y  + 64)
          
          
    
            // Set a delay to hide textBox and text after 3 seconds
            this.time.delayedCall(2000, () => {
                this.text.setVisible(false);
                this.textBox.setVisible(false);
                this.player.setVisible(true)
                this.shareData.isSleeping = false;
                this.bedImage.setVisible(false)
                this.bedTile.setVisible(true)
                this.shareData.health = 100;});
               
            }

    }

    update() {
        const cursors = this.input.keyboard.createCursorKeys();
        this.player.update(cursors)
        this.runController.update();
       
        this.shareData.isRunning = false;
       
        const tile = this.frontDoorTiles.getTileAtWorldXY(this.player.x, this.player.y);
        if (tile) {
            this.leavingHouse(this.player, tile);
        }
        if(Phaser.Input.Keyboard.JustDown(this.KeyW)){
            this.updateInventoryDisplay.removeDisplay()
           }
    }

    leavingHouse(player, tile) {
        if (tile.layer.name === 'FrontDoor') {
            this.shareData.stamina = this.shareData.staminaMax;
            this.scene.start('Default')
            this.shareData.inHouse = false;
            this.startingPostion = {x: 130, y: 200}
            this.start = true
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
   study(){
    if(Phaser.Input.Keyboard.JustDown(this.KeyE)){
       this.updateInventoryDisplay = new updateInventoryDisplay(this, this.player, this.shareData, 100,100)
        this.updateInventoryDisplay.update()        
       
    }
    }
   
}

   