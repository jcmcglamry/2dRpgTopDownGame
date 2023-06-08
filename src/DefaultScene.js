import Phaser from "phaser";
import { createPlayerAnimations } from "./utils/animation";

export class Default extends Phaser.Scene {
    constructor() {
        super("Default");
        this.startingPosition = { x: 120, y: 90 };
        this.playerInventory = []
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
        this.player = this.physics.add.sprite(xOffset + this.startingPosition.x,yOffset + this.startingPosition.y, 'player');
        this.player.setBodySize(2,2)
        this.physics.add.collider(this.player, this.treesTiles);
        this.treesTiles.setCollisionByExclusion([-1])
        this.physics.add.collider(this.player, this.landTiles);
        this.landTiles.setCollisionByExclusion([-1])
        this.physics.add.collider(this.player, this.waterTiles);
        this.waterTiles.setCollisionByExclusion([-1])
        this.physics.add.collider(this.player, this.objectsTiles);
        this.objectsTiles.setCollisionByExclusion([-1])
       
 
        this.items = this.physics.add.group();


        let item = this.physics.add.sprite(xOffset + 300, yOffset + 140, 'carrot');
        this.items.add(item);


        this.physics.add.overlap(this.player, this.items, this.pickUpItem, null, this);
        this.inventoryText = this.add.text(16, 16, 'Inventory: ', { fontSize: '32px', fill: '#000' });
        createPlayerAnimations(this.anims)
       
    }

    update() {
        const cursors = this.input.keyboard.createCursorKeys();
        const speed = 50;

        // Assume the player is not moving unless one of the movement keys is pressed
        this.player.setVelocity(0);

        if (cursors.down.isDown) {
            this.player.setVelocityY(speed);
            this.player.anims.play('walk-down', true);
        } else if (cursors.up.isDown) {
            this.player.setVelocityY(-speed);
            this.player.anims.play('walk-up', true);
        } 

        if (cursors.right.isDown) {
            this.player.setVelocityX(speed);
            this.player.anims.play('walk-right', true);
        } else if (cursors.left.isDown) {
            this.player.setVelocityX(-speed);
            this.player.anims.play('walk-left', true);
        } 

        if (!(cursors.up.isDown || cursors.down.isDown || cursors.left.isDown || cursors.right.isDown)) {
            this.player.anims.stop();
        }

        const tile = this.houseTiles.getTileAtWorldXY(this.player.x, this.player.y);
        if (tile) {
            this.enteredHouse(this.player, tile);
        }
        const boatTile = this.boatTiles.getTileAtWorldXY(this.player.x, this.player.y);
    if (boatTile) {
        this.enteredBoat(this.player, boatTile);
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
    pickUpItem(player, item) {
        this.playerInventory.push(item);
        item.disableBody(true, true);
        this.updateInventoryDisplay();
    }
    updateInventoryDisplay() {
        this.inventoryText.setText('Inventory: ' + this.playerInventory.join(', '));
    }
}