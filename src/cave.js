import Phaser from "phaser";
import { Player } from "./utils/player";
import { createPlayerAnimations } from "./utils/animation";
import { Status } from "./utils/status";
import { RunController } from "./utils/runController";
import { InventoryManager } from "./utils/inventoryManger";
import { updateInventoryDisplay } from "./utils/inventoryUpdate";
import { EnemyManager } from "./utils/enemyManager";

export class Cave extends Phaser.Scene {
    constructor(shareData){
        super('Cave')
        this.shareData = shareData
    }
preload(){
        this.load.image('caveMap', 'assets/cave.png');
        this.load.tilemapTiledJSON('cavekey', 'assets/cave.json');
        this.load.spritesheet('player', 'assets/player.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('enemy', 'assets/enemy.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('enemy2', 'assets/enemy2.png', {frameWidth: 32, frameHeight: 32})
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
   
    const map = this.make.tilemap({ key: 'cavekey' });
    const tileset = map.addTilesetImage('cave', 'caveMap');
    const mapWidthInPixels = map.width * map.tileWidth;
    const mapHeightInPixels = map.height * map.tileHeight;
    const xOffset = (this.sys.game.config.width - mapWidthInPixels) / 2;
    const yOffset = (this.sys.game.config.height - mapHeightInPixels) / 2;
    




    this.baseLayerTiles = map.createLayer('baseLayer', tileset, xOffset, yOffset)
    this.lavaTiles = map.createLayer('lava',tileset, xOffset, yOffset)
    this.ledgeTiles = map.createLayer('ledge', tileset, xOffset, yOffset)
    this.isleTiles = map.createLayer('isle', tileset, xOffset, yOffset)
    this.waterTiles = map.createLayer('water', tileset, xOffset, yOffset)
    this.waterledgeTiles = map.createLayer('waterledge', tileset, xOffset, yOffset)
    this.wallTiles = map.createLayer('wall', tileset, xOffset, yOffset)
    this.entranceTiles = map.createLayer('entrance', tileset, xOffset, yOffset)
    this.entranceOverlapTiles = map.createLayer('entranceOverlap', tileset, xOffset, yOffset)
    this.exitTiles = map.createLayer('exit', tileset, xOffset, yOffset)
    this.exitOverlapTiles = map.createLayer('exitOverlap', tileset, xOffset, yOffset)
    this.bridgeLedgeTiles = map.createLayer('bridgeLedge', tileset, xOffset, yOffset)
    this.player = new Player(this, xOffset + 330, yOffset + 40, this.shareData);
    

    
    
    this.physics.add.collider(this.player, this.ledgeTiles);
    this.ledgeTiles.setCollisionByExclusion([-1])
    this.physics.add.collider(this.player, this.wallTiles);
    this.wallTiles.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.player, this.entranceOverlapTiles)
    this.entranceOverlapTiles.setCollisionByExclusion([-1])
   
    this.physics.add.overlap(this.player, this.enemy, this.battle, null, this)

    this.cameras.main.startFollow(this.player);
   
    createPlayerAnimations(this.anims)
    this.status = new Status(this, this.shareData)
    this.runController = new RunController(this, this.player, this.shareData)
    this.updateInventoryDisplay = new updateInventoryDisplay(this, this.player, this.shareData)
    this.inventoryManager = new InventoryManager(this, this.player, this.shareData, this.updateInventoryDisplay);
    this.enemyManager = new EnemyManager(this, this.shareData, this.player)
        if(this.shareData.init === false){
        this.shareData.player.x = this.player.x - 330 ;
        this.shareData.player.y = this.player.y + 490;
        }
      
        this.updateInventoryDisplay.update()    
       
     this.shareData.init = true;
     this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
    
}
update(){
    this.enemyManager.moveAllEnemies()
  
    this.itemsData = this.cache.json.get('items')
    let item = Phaser.Utils.Array.GetRandom(this.itemsData)
    let RandX = Phaser.Math.Between(90, 690)
    let RandY = Phaser.Math.Between(-10, 490)
    this.shareData.sceneCount += 1
    if(this.shareData.sceneCount === 600){
     
        this.enemyManager.createEnemy(100, RandY, "enemy")
        this.inventoryManager.createItem(item.name, RandX, RandY)
        this.shareData.sceneCount = 0
       
    }
    this.updateInventoryDisplay.update()
    this.shareData.player.x = this.player.x
    this.shareData.player.y = this.player.y
    const cursors = this.input.keyboard.createCursorKeys();
    this.player.update(cursors)
    this.runController.update();
    this.status.update();
    const tile = this.exitTiles.getTileAtWorldXY(this.player.x, this.player.y);
    const tile2 = this.entranceTiles.getTileAtWorldXY(this.player.x, this.player.y);
    if (this.keySpace.isDown) {
        this.player.anims.play('attack-' + this.player.lastDirection, true);
    }
        if (tile) {
            this.exitCave(this.player, tile);
        }
        if(tile2){
            this.enterWorld(this.player, tile2)
        }
}
    exitCave(player, tile){
        if(tile.layer.name === 'exit'){
            this.scene.start('Default', this.shareData)
           
        } 
    }
    enterWorld(player, tile2){
        if(tile2.layer.name === 'entrance'){
            this.scene.start('World', this.shareData)
        }
    }
    battle(){
       if(this.keySpace.isDown){
        this.enemy.disableBody(true,true)
       }
       else{
        this.shareData.health -= 1
       }
    }
}