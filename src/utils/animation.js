export function createPlayerAnimations(anims) {
    anims.create({
        key: 'walk-down',
        frames: anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: 'walk-up',
        frames: anims.generateFrameNumbers('player', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: 'walk-left',
        frames: anims.generateFrameNumbers('player', { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: 'walk-right',
        frames: anims.generateFrameNumbers('player', { start: 12, end: 15 }),
        frameRate: 20,
        repeat: -1
    });
    anims.create({
        key:'attack-left',
        frames: anims.generateFrameNumbers('player',{start: 24, end: 27}),
        frameRate:10,
        repeat:-1
    })
    anims.create({
       key:'attack-right',
        frames: anims.generateFrameNumbers('player', {start:28, end:31}),
        frameRate: 10,
        repeat: -1
    })
    anims.create({
        key:'attack-up',
         frames: anims.generateFrameNumbers('player', {start:20, end:23}),
         frameRate: 10,
         repeat: -1
     })
     anims.create({
        key:'attack-down',
         frames: anims.generateFrameNumbers('player', {start:16, end:19}),
         frameRate: 10,
         repeat: -1
     })
     anims.create({
        key:'enemy-walk-right',
        frames: anims.generateFrameNumbers('enemy', {start:6, end:8}),
         frameRate: 10,
         repeat: -1
     })
     anims.create({
        key:'enemy-walk-left',
        frames: anims.generateFrameNumbers('enemy', {start:3, end:5}),
         frameRate: 10,
         repeat: -1
     })
     anims.create({
        key:'enemy-walk-up',
        frames: anims.generateFrameNumbers('enemy', {start:3, end:5}),
         frameRate: 10,
         repeat: -1
     })
     anims.create({
        key:'enemy-walk-down',
        frames: anims.generateFrameNumbers('enemy', {start:3, end:5}),
         frameRate: 10,
         repeat: -1
     })
     anims.create({
        key:'enemy2-walk-right',
        frames: anims.generateFrameNumbers('enemy2', {start:6, end:8}),
         frameRate: 10,
         repeat: -1
     })
     anims.create({
        key:'enem2y-walk-left',
        frames: anims.generateFrameNumbers('enemy2', {start:3, end:5}),
         frameRate: 10,
         repeat: -1
     })
     anims.create({
        key:'enem2-walk-up',
        frames: anims.generateFrameNumbers('enemy2', {start:3, end:5}),
         frameRate: 10,
         repeat: -1
     })
     anims.create({
        key:'enemy2-walk-down',
        frames: anims.generateFrameNumbers('enemy2', {start:3, end:5}),
         frameRate: 10,
         repeat: -1
     })
    
}
