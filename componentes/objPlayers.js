export class objPlayers
{
    constructor(scene)
    {
        this.cenario = scene;  
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                        Funçoes auxiliares                                                                     //
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    dano()
    {
        if(!this.danor)
        {
            this.danor = true;
            this.cenario.registry.set('Vida',this.cenario.registry.get('Vida')-1)
            this.vida.setFrame(this.cenario.registry.get('Vida'));
            this.player.anims.play("dano", true);
            setTimeout(
                ()=>{this.danor = false}, 1500
            )  
        }
    }
    animacao()
    {
        this.cenario.anims.create({
            key: 'Correr',
            frames: this.cenario.anims.generateFrameNumbers("correndo", { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.cenario.anims.create({
            key: 'parado',
            frames: this.cenario.anims.generateFrameNumbers("parado", { start: 0, end: 5 }),
            frameRate: 15,
            repeat: -1
        });
    
        this.cenario.anims.create({
            key: 'pularcima',
            frames: this.cenario.anims.generateFrameNumbers("pulando", { start: 0, end: 1 }),
            frameRate: 10,
            repeat: 1
        });

        this.cenario.anims.create({
            key: 'dano',
            frames: this.cenario.anims.generateFrameNumbers("dano", { start: 0, end: 1 }),
            frameRate: 4,
            repeat: 0
        });
        this.player.anims.play("dano", false);
        this.player.anims.play("correndo", true);
    }

    shift_energia()
    {
        if(this.cenario.registry.get('Energia') >= 90)
        {
            this.energia.setFrame(0);
        } 
        else if(this.cenario.registry.get('Energia') >= 80)
        {
            this.energia.setFrame(1);
        }
        else if(this.cenario.registry.get('Energia') >= 70)
        {
            this.energia.setFrame(2);
        } 
        else if(this.cenario.registry.get('Energia') >= 60)
        {
            this.energia.setFrame(3);
        }
        else if(this.cenario.registry.get('Energia') >= 50)
        {
            this.energia.setFrame(4);
        } 
        else if(this.cenario.registry.get('Energia') >= 40)
        {
            this.energia.setFrame(5);
        }
        else if(this.cenario.registry.get('Energia') >= 30)
        {
            this.energia.setFrame(6);
        } 
        else if(this.cenario.registry.get('Energia') >= 20)
        {
            this.energia.setFrame(7);
        }
        else if(this.cenario.registry.get('Energia') >= 10)
        {
            this.energia.setFrame(8);
        } 
        else if(this.cenario.registry.get('Energia') > 0)
        {
            this.energia.setFrame(9);
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                       fin - Funçoes auxiliares                                                                //
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    preload()
    {
        this.danor = false
        this.Width =  640;
        this.Height = 360;
        this.cenario.load.spritesheet("vida","assets/vida.png", { frameWidth: 48, frameHeight: 16 })
        this.cenario.load.spritesheet("energia","assets/energia.png", { frameWidth: 48, frameHeight: 16 })
        this.cenario.load.spritesheet("parado",        "assets/parado.png", { frameWidth: 29, frameHeight: 32 });
        this.cenario.load.spritesheet("correndo",      "assets/correr.png", { frameWidth: 32, frameHeight: 32 });
        this.cenario.load.spritesheet("pulando",       "assets/pular.png", { frameWidth: 32, frameHeight: 32 });
        this.cenario.load.spritesheet("dano",       "assets/hit_sheet.png", { frameWidth: 32, frameHeight: 32 });
        this.cenario.load.spritesheet("Botao",       "assets/shift_botao.png", { frameWidth: 32, frameHeight: 32 });
        this.cenario.physics.world.setBoundsCollision(true, true, true, false);
        this.cenario.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
    }

    create(x,y)
    {
        this.player = this.cenario.physics.add.sprite(x,y, "parado").setOrigin(0.5,0.5);//.setScale(this.tm)
        this.shiftKey = this.cenario.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        if(this.cenario.registry.get('Controles'))
        {
            const JX = 100,JY = 250;

            let Radidao = false;

            this.Shift = this.cenario.add.sprite(this.Width-32,this.Height-32,"Botao",0).setScale(2).setOrigin(0.5,0.5).setInteractive().setScrollFactor(0);

            this.joyStick = this.cenario.plugins.get('rexvirtualjoystickplugin').add(this.cenario, 
            {
                x: JX,
                y: JY,
                radius: 100,
                enable: true
            });
            
            this.joyStick.on('move', function (pointer, x, y, dragX, dragY){});

            this.player.setData("Controles_atual",
            {
                mexer:()=>
                {
                    const { player} = this; // Desestruturando para evitar múltiplos `this`
                    var deltaX = this.joyStick.thumb.x - JX;
                    var deltaY = this.joyStick.thumb.y - JY;

                    const anim = player.anims.currentAnim && player.anims.currentAnim.key === 'dano' && player.anims.isPlaying;

                    this.Shift.on("pointerdown", () => {
                        this.Shift.setFrame(1); 
                        Radidao = true;
                    });
        
                    this.Shift.on("pointerup", () => {
                        this.Shift.setFrame(0);
                        Radidao = false;
                    });
        
                    this.Shift.on("pointerout", () => {
                        if (Radidao) {
                            this.Shift.setFrame(0);
                            Radidao = false;
                        }
                    });
        
                    this.Shift.on("pointerover", () => {
                        if (Radidao) {
                            this.Shift.setFrame(1);
                        }
                    });

                    if (Radidao && this.cenario.registry.get('Energia') >= 1) 
                        {  
                            this.cenario.registry.set('velocidade', 200)
                            this.cenario.registry.set('Energia', this.cenario.registry.get('Energia')-1);
                            this.shift_energia();
                        }
                        else
                        {  
                            this.cenario.registry.set('velocidade', 100)
                            if (!Radidao && this.cenario.registry.get('Energia') <= 100)
                            this.cenario.registry.set('Energia', this.cenario.registry.get('Energia')+0.1);
                            this.shift_energia();
                        }

                    if (deltaX < 0) 
                    {
                        player.body.setVelocityX(-this.cenario.registry.get('velocidade'));
                        player.flipX = true;
                        !anim && player.anims.play("Correr", true);
                    } 
                    else if (deltaX > 0) 
                    {
                        player.flipX = false;
                        player.body.setVelocityX(this.cenario.registry.get('velocidade'));
                        !anim && player.anims.play("Correr", true);
                    } 
                    else if (deltaX === 0) 
                    {
                        player.body.setVelocityX(0);
                        if (player.body.touching.down) {
                            !anim && player.anims.play("parado", true);
                        }
                    }
                    if (deltaY < -25 && player.body.touching.down) 
                    {
                        player.body.setVelocityY(this.cenario.registry.get('pular'));
                        !anim && player.anims.play("Pulando", true);
                    }
                }
            });
        }
        else
        {
            this.player.setData("Controles_atual",
            {
                mexer:()=>
                {
                    const { player, screenWidth, screenHeight } = this; // Desestruturando para evitar múltiplos `this`
                    const anim = player.anims.currentAnim && player.anims.currentAnim.key === 'dano' && player.anims.isPlaying;
                    this.cursors = this.cenario.input.keyboard.createCursorKeys();
                    if (this.cursors.left.isDown) 
                    {
                        player.body.setVelocityX(-this.cenario.registry.get('velocidade'));
                        player.flipX = true;
                        !anim && player.anims.play("Correr", true);
                    } 
                    else if (this.cursors.right.isDown) 
                    {
                        player.flipX = false;
                        player.body.setVelocityX(this.cenario.registry.get('velocidade'));
                        !anim && player.anims.play("Correr", true);
                    } 
                    else
                    {
                        player.body.setVelocityX(0);
                        if (player.body.touching.down) 
                        {
                            !anim && player.anims.play("parado", true);
                        }
                    }
                    if (this.shiftKey.isDown && this.cenario.registry.get('Energia') >= 1) 
                    {  
                        this.cenario.registry.set('velocidade', 200)
                        this.cenario.registry.set('Energia', this.cenario.registry.get('Energia')-1);
                        this.shift_energia();
                    }
                    else
                    {  
                        this.cenario.registry.set('velocidade', 100)
                        if (!this.shiftKey.isDown && this.cenario.registry.get('Energia') <= 100)
                            this.cenario.registry.set('Energia', this.cenario.registry.get('Energia')+0.1);
                        this.shift_energia();
                    }
                    if ((this.cursors.up.isDown || this.cursors.space.isDown) && player.body.touching.down) 
                    {
                        player.body.setVelocityY(this.cenario.registry.get('pular'));
                        !anim && player.anims.play("Pulando", true);
                    }
                }
            });
        }

        this.vida  = this.cenario.physics.add.staticSprite(0, 0, "vida",3).setScale(2).setOrigin(0.5).setScrollFactor(0);
        this.vida.x =(this.vida.width); this.vida.y =(this.vida.height);
        this.energia  = this.cenario.physics.add.staticSprite(0, 0, "energia",0).setScale(2).setOrigin(0.5).setScrollFactor(0);
        this.energia.x = this.energia.width; this.energia.y = this.vida.height*2+this.energia.height*2;
        this.animacao();
    }

    update()
    {
        const Criar = this.player.getData("Controles_atual").mexer.bind(this); Criar();   
        if(this.player.y > this.cenario.sys.game.config.height)
        {
            this.cenario.scene.start("menu_Morte")
        }
    }
}