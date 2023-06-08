import Phaser from "phaser";
import { createPlayerAnimations } from "./utils/animation";

export class HouseScene extends Phaser.Scene {
    constructor() {
        super('HouseScene');
      
    }

    preload() {
        this.load.image('houseMap', 'assets/houseSet.png');
        this.load.tilemapTiledJSON('housekey', 'assets/House.json');
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 48, frameHeight: 48 });
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
        this.player = this.physics.add.sprite(xOffset  + 127 ,yOffset + 200 , 'player');
        this.player.setBodySize(2,2)
       
        this.physics.add.collider(this.player, this.FurnitureTiles);
        this.FurnitureTiles.setCollisionByExclusion([-1])
        this.physics.add.collider(this.player, this.sideWallTiles);
        this.sideWallTiles.setCollisionByExclusion([-1])
        this.physics.add.collider(this.player, this.backWallTiles);
        this.backWallTiles.setCollisionByExclusion([-1])
        this.physics.add.collider(this.player, this.frontWallTiles);
        this.frontWallTiles.setCollisionByExclusion([-1])
       
      

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
       
        const tile = this.frontDoorTiles.getTileAtWorldXY(this.player.x, this.player.y);
        if (tile) {
            this.leavingHouse(this.player, tile);
        }
    
    }

    leavingHouse(player, tile) {
        if (tile.layer.name === 'FrontDoor') {
            this.scene.start('Default')
        }
    }
   
}