import Phaser from "phaser";

export class LakeScene extends Phaser.Scene {
    constructor() {
        super("LakeScene");
     
    }

    preload() {
        this.load.image('tiledImage2', 'assets/MasterSimple.png');
        this.load.tilemapTiledJSON('tilemap2', 'assets/Lake.json');
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('boat', 'assets/Boats.png',{frameWidth: 32, frameHeight:32})
    }

    create() {
        const map = this.make.tilemap({ key: 'tilemap2' });
        const tileset = map.addTilesetImage('MasterSimple', 'tiledImage2');
        const mapWidthInPixels = map.width * map.tileWidth;
        const mapHeightInPixels = map.height * map.tileHeight;
        const xOffset = (this.sys.game.config.width - mapWidthInPixels) / 2;
        const yOffset = (this.sys.game.config.height - mapHeightInPixels) / 2;


        this.borderTiles = map.createLayer('border', tileset, xOffset, yOffset);
        this.exitTiles = map.createLayer('exit', tileset, xOffset, yOffset);
        this.landTiles = map.createLayer('land', tileset, xOffset, yOffset);
        this.grassTiles = map.createLayer('grass', tileset, xOffset, yOffset);
        this.waterTiles = map.createLayer('water', tileset, xOffset,yOffset);
        this.cliffsTiles = map.createLayer('cliffs', tileset, xOffset,yOffset);
        this.cliffTextureTiles = map.createLayer('cliffTexture', tileset, xOffset,yOffset);
        this.dockTiles = map.createLayer('dock', tileset, xOffset, yOffset)
        this.treesTiles = map.createLayer('trees', tileset, xOffset,yOffset);
        this.objectsTiles = map.createLayer('objects', tileset, xOffset,yOffset);
        this.boat = this.physics.add.sprite(xOffset + 120,yOffset + 140, 'boat');
        this.player = this.physics.add.sprite(xOffset + 120,yOffset + 137, 'player');
        this.player.setBodySize(2,2)
        this.boat.setBodySize(2,3)
        this.physics.add.collider(this.boat, this.treesTiles);
        this.physics.add.collider(this.player, this.treesTiles);
        this.treesTiles.setCollisionByExclusion([-1])
        this.physics.add.collider(this.boat, this.landTiles);
        this.physics.add.collider(this.player, this.landTiles);
        this.landTiles.setCollisionByExclusion([-1])
        this.physics.add.collider(this.boat, this.cliffsTiles);
        this.physics.add.collider(this.player, this.cliffsTiles);
        this.cliffsTiles.setCollisionByExclusion([-1])
        this.physics.add.collider(this.boat, this.objectsTiles);
        this.physics.add.collider(this.player, this.objectsTiles);
        this.objectsTiles.setCollisionByExclusion([-1])
        this.physics.add.collider(this.boat, this.borderTiles);
        this.physics.add.collider(this.player, this.borderTiles);
        this.borderTiles.setCollisionByExclusion([-1])
        
      
       this.anims.create({
        key: 'row-down',
        frames: this.anims.generateFrameNumbers('boat', { start: 5, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'row-up',
        frames: this.anims.generateFrameNumbers('boat', { start: 4, end: 4 }),
        frameRate: 11,
        repeat: -1
    });

    this.anims.create({
        key: 'row-left',
        frames: this.anims.generateFrameNumbers('boat', { start: 1, end: 1 }),
        frameRate: 1,
        repeat: -1
    });

    this.anims.create({
        key: 'row-right',
        frames: this.anims.generateFrameNumbers('boat', { start: 0, end: 0 }),
        frameRate: 1,
        repeat: -1
    });

    
    }

    update() {
        const cursors = this.input.keyboard.createCursorKeys();
        const speed = 40;

        // Assume the player is not moving unless one of the movement keys is pressed
        this.player.setVelocity(0);
        this.boat.setVelocity(0)

        if (cursors.down.isDown) {
            this.player.setVelocityY(speed);
            this.boat.setVelocityY(speed);
            this.boat.anims.play('row-down', true);
        } else if (cursors.up.isDown) {
            this.player.setVelocityY(-speed);
            this.boat.setVelocityY(-speed);
            this.boat.anims.play('row-up', true);
        } 

        if (cursors.right.isDown) {
            this.player.setVelocityX(speed);
            this.boat.setVelocityX(speed);
            this.boat.anims.play('row-right', true);
        } else if (cursors.left.isDown) {
            this.player.setVelocityX(-speed);
            this.boat.setVelocityX(-speed);
            this.boat.anims.play('row-left', true);
        } 

        if (!(cursors.up.isDown || cursors.down.isDown || cursors.left.isDown || cursors.right.isDown)) {
            this.boat.anims.stop();
        }

    //     const tile = this.houseTiles.getTileAtWorldXY(this.player.x, this.player.y);
    //     if (tile) {
    //         this.enteredHouse(this.player, tile);
    //     }
        const Tile = this.exitTiles.getTileAtWorldXY(this.player.x, this.player.y);
    if (Tile) {
        this.exitLake(this.player, Tile);
    }

}
    exitLake(player, tile) {
        if (tile.layer.name === 'exit') {
            this.scene.start('Default')
        }
    }
    // enteredBoat(player, boatTile) {
    //     if (boatTile.layer.name === 'boat') {
    //         this.scene.start('HouseScene')
    //     }
    // }
   
}