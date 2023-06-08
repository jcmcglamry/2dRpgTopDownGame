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
        frameRate: 10,
        repeat: -1
    });
}
