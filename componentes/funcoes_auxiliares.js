export class bala
{
    constructor(scene)
    {
        this.cenario = scene;  
    }

    preload()
    {
        this.cenario.load.image("grandeboladeneve", "assets/grandeboladeneve.png");
    }

    group()
    {
        this.bala = this.cenario.physics.add.group();
    }

    create(sprite, x,y,vx = null,vy = null)
    {
        const bala  = this.bala.create(x, y, sprite).setOrigin(0.5);
        bala.setVelocityX(vx); 
        bala.setVelocityY(vy); 
        bala.body.allowGravity = false
        bala.setImmovable(true)
        // bola.width =  bola.width* this.tm;
        // bola.height = bola.height*this.tm;
        this.cenario.time.delayedCall(5000, () => {bala.destroy();}, [], this);
    }
}
