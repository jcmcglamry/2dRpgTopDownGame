
export class EnemyManager {
    constructor(scene, shareData, player) {
       
        this.scene = scene;
        this.shareData = shareData
        this.player = player
        this.enemies = this.scene.physics.add.group(); // Use a Phaser group to manage multiple enemies
    }
    update(enemy){
        if (enemy.healthBar) {
            enemy.healthBar.setPosition(enemy.x, enemy.y - 20);
        }
    }
    createEnemy(x, y, enemySprite){
    let enemy = this.scene.physics.add.sprite(x, y, enemySprite);
    enemy.name = `enemy${this.shareData.enemyCount}`
    this.scene.physics.add.overlap(this.player, enemy, this.battle, null, this)
    enemy.health = 100
    this.enemies.add(enemy); // Add the enemy to the group
    this.shareData.enemyCount += 1
   
}
// moveEnemies(){
//     this.enemies.getChildren().forEach(enemy => {
//         if(enemy.x >= 600){
//             enemy.movingRight = false;
//         } 

//         if(enemy.x <= 100){
//             enemy.movingRight = true;
//         }

//         if(enemy.movingRight){
//             enemy.x += 1;
//         } else {
//             enemy.x -= 1;
//         }
//     });
// }
moveAllEnemies(){
    this.enemies.getChildren().forEach(enemy => {
        if (Phaser.Math.Between(0, 100) < 2) { // 2% chance every frame to randomly change direction
            enemy.movingRight = Phaser.Math.Between(0, 1) === 1;
            enemy.movingDown = Phaser.Math.Between(0, 1) === 1;
        }

        if(enemy.x >= 600 || enemy.x <= 100){
            enemy.movingRight = !enemy.movingRight;
        }
        
        if(enemy.y >= 500 || enemy.y <= 0){
            enemy.movingDown = !enemy.movingDown;
        }

        if(enemy.movingRight){
            enemy.x += 1;
            //enemy.anims.play('enemy-walk-right');
        } else {
            enemy.x -= 1;
            //enemy.anims.play('enemy-walk-left');
        }

        if(enemy.movingDown){
            enemy.y += 1;
        } else {
            enemy.y -= 1;
        }
    });
}



battle(player, enemy){
    this.spacebar = this.scene.input.keyboard.addKey('SPACE')

    // create health bar if not exists
    if (!enemy.healthBar) {
        enemy.healthBar = this.scene.add.rectangle(enemy.x, enemy.y - 20, enemy.health/10, 5, 0xFF0000).setOrigin(0, 0);
    }

    if(this.spacebar.isDown){
        enemy.health -= 5;
        // update enemy health bar
        enemy.healthBar.width = enemy.health/10;

        if(enemy.health <= 0){
            enemy.disableBody(true, true);
            enemy.healthBar.setVisible(false);  // hide health bar when enemy is defeated
        }
    } else {
        this.shareData.health -= 0.3;
    }

    // hide enemy's health bar after 1 second
    this.scene.time.delayedCall(1000, () => {
        if (enemy.healthBar) {
            enemy.healthBar.setVisible(false);
        }
    });
}

}
