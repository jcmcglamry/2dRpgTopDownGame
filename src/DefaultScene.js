import Phaser from "phaser";
import { createPlayerAnimations } from "./utils/animation";
import { Player } from "./utils/player";


export class Default extends Phaser.Scene {
    constructor(shareData) {
        super("Default");
        this.startingPosition = { x: 120, y: 90 };
        this.playerInventory = []
        this.shareData = shareData
       
       
    }

    preload() {
        this.load.image('tiledImage', 'assets/MasterSimple.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/map.json');
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('carrot', 'assets/carrot.png')
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
        this.healthbarBackground = this.add.rectangle(10,10,200, 20, 0xFFFFFF).setOrigin(0,0);
        this.healthBar = this.add.rectangle(10,10,200,20, 0xFF0000).setOrigin(0,0);
        this.staminabarBackground = this.add.rectangle(10,40,200, 20, 0xFFFFFF).setOrigin(0,0);
        this.staminaBar = this.add.rectangle(10,40,200,20, 0x00FF00).setOrigin(0,0);
        this.physics.add.collider(this.player, this.treesTiles, this.reduceHealth);
        this.treesTiles.setCollisionByExclusion([-1])
        this.physics.add.collider(this.player, this.landTiles);
        this.landTiles.setCollisionByExclusion([-1])
        this.physics.add.collider(this.player, this.waterTiles ,this.handlePlayerDamage, null, this);
        this.waterTiles.setCollisionByExclusion([-1])
        this.physics.add.collider(this.player, this.objectsTiles);
        this.objectsTiles.setCollisionByExclusion([-1])
        this.items = this.physics.add.group();


        let item = this.physics.add.sprite(xOffset + 300, yOffset + 140, 'carrot');
        this.items.add(item);
      
        
        
        this.physics.add.overlap(this.player, this.items, this.pickUpItem, null, this);
        
       // this.inventoryText = this.add.text(300, 200, 'Inventory: ', { fontSize: '32px', fill: '#000' });
        createPlayerAnimations(this.anims)
       this.KeyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        this.player.stamina += 0.2

        if(this.KeyR.isDown && this.player.stamina > 0){
            this.shareData.isRunning = true;
        }
        if(this.KeyR.isUp){
            this.shareData.isRunning = false;
        }
        const cursors = this.input.keyboard.createCursorKeys();
        this.player.update(cursors)
        this.player.health =  Phaser.Math.Clamp(this.player.health, 0, 100);
        this.health = this.player.health;
       this. healthBar.width = this.health * 2
       this.player.stamina =  Phaser.Math.Clamp(this.player.stamina, 0, 100);
        this.stamina = this.player.stamina;
       this. staminaBar.width = this.stamina * 2
       
       

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
            this.scene.start('World')
           
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
    pickUpItem(playerInventory, item) {
        this.playerInventory.push(item);
        item.disableBody(true, true);
        this.updateInventoryDisplay();
       
        
    }
    updateInventoryDisplay() {
        this.inventoryText.setText('Inventory: ' + this.playerInventory.join(', '));
    }
    handlePlayerheal(player) {
        // Reduce player's health
        player.health += 30; // Reduce player's health by 10 or any value you want
        this.health = this.player.health; // Update the health property in your class
        
        // Now you can update the health bar
        this.healthBar.width = this.health * 2;
        
        // Here, you can decide what to do when the player's health reaches zero
        if (player.health <= 0) {
            // handle player death
        }
    }
    handlePlayerDamage(player) {
        // Reduce player's health
        player.health -= 2; // Reduce player's health by 10 or any value you want
        this.health = this.player.health; // Update the health property in your class
        
        // Now you can update the health bar
        this.healthBar.width = this.health * 2;
        
        // Here, you can decide what to do when the player's health reaches zero
        if (player.health <= 0) {
            // handle player death
        }
    }
}