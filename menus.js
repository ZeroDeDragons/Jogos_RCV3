export class Menu_Teclado extends Phaser.Scene
{
    constructor()
    {
        super({key:"menu_Teclado"})
    }   

    preload()
    {
        // this.Width =  window.innerWidth;
        // this.Height = window.innerHeight;
        this.Width =  640;
        this.Height = 360;
        this.load.image("Menu",           "assets/menu.png");
        this.load.spritesheet("Tipo",     "assets/tipodejogo.png",{frameWidth:32,frameHeight:32});
    }

    create()
    {
        const ceu = this.add.image(this.Width/2, this.Height/2,"Menu").setOrigin(0.5,0.5);
        ceu.displayWidth =  this.Width;
        ceu.displayHeight = this.Height;

        this.Tipo_1 = this.add.sprite(this.Width/2,110,"Tipo",0).setScale(2).setOrigin(0.5,0.5).setInteractive();
        this.Tipo_1.on("pointerover",()=>{this.Tipo_1.setFrame(1)});
        this.Tipo_1.on("pointerout",()=> {this.Tipo_1.setFrame(0)});
        this.Tipo_1.on("pointerdown",()=>{this.Tipo_1.setFrame(1),setTimeout(()=> {this.registry.set('Controles',false),this.scene.start("nivel_1")},500)});

        this.Tipo_2 = this.add.sprite(this.Width/2,190,"Tipo",2).setScale(2).setOrigin(0.5,0.5).setInteractive();
        this.Tipo_2.on("pointerover",()=>{this.Tipo_2.setFrame(3)});
        this.Tipo_2.on("pointerout",()=> {this.Tipo_2.setFrame(2)});
        this.Tipo_2.on("pointerdown",()=>{this.Tipo_2.setFrame(3),setTimeout(()=> {this.registry.set('Controles',true),this.scene.start("nivel_1")},500)});
    }
}

export class Menu_Inicial extends Phaser.Scene
{
    constructor()
    {
        super({key:"menu_Inicial"})
    }   

    preload()
    {
        // this.Width =  window.innerWidth;
        // this.Height = window.innerHeight;
        this.Width =  640;
        this.Height = 360;
        this.load.image("Menu",           "assets/menu.png");
        this.load.spritesheet("Botao",     "assets/botao.png",{frameWidth:72,frameHeight:40});
    }

    create()
    {
        const ceu = this.add.image(this.Width/2, this.Height/2,"Menu").setOrigin(0.5,0.5);
        ceu.displayWidth =  this.Width;
        ceu.displayHeight = this.Height;

        var style = {
            font: '40px Arial',
            fill: '#ffffff', // Cor do texto
            align: 'center', // Alinhamento do texto
            stroke: '#000000', // Cor do contorno
            strokeThickness: 3 // Espessura do contorno
        };
        var pontuacao = this.add.text(this.Width/2, this.Height*0.15, 'Score: '+this.registry.get('Score')+'/4', style);
        pontuacao.setOrigin(0.5).setScrollFactor(0);
        var style = {
            font: '20px Arial',
            fill: '#ffffff', // Cor do texto
            align: 'center', // Alinhamento do texto
            stroke: '#000000', // Cor do contorno
            strokeThickness: 3 // Espessura do contorno
        };
        pontuacao = this.add.text(this.Width/2, this.Height*0.35, 'Jogo de Natal RC TGPSI-tecnimo de gestao de sistemas informaticos', style);
        pontuacao.setOrigin(0.5).setScrollFactor(0);
        this.Tipo_1 = this.add.sprite(this.Width/2,this.Height/2,"Botao",0).setScale(2).setOrigin(0.5,0.5).setInteractive();
        this.Tipo_1.on("pointerover",()=>{this.Tipo_1.setFrame(1)});
        this.Tipo_1.on("pointerout",()=> {this.Tipo_1.setFrame(0)});
        this.Tipo_1.on("pointerdown",()=>{this.Tipo_1.setFrame(1),setTimeout(()=> {this.scene.start("nivel_1")},500)});
    }
}
export class Menu_Morte extends Phaser.Scene
{
    constructor()
    {
        super({key:"menu_Morte"})
    }   

    preload()
    {
        // this.Width =  window.innerWidth;
        // this.Height = window.innerHeight;
        this.Width =  640;
        this.Height = 360;
        this.load.image("Menu",           "assets/menu.png");
        this.load.spritesheet("botao",     "assets/tumba.png",{frameWidth:48,frameHeight:42});
    }

    create()
    {
        const ceu = this.add.image(this.Width/2, this.Height/2,"Menu").setOrigin(0.5,0.5);
        ceu.displayWidth =  this.Width;
        ceu.displayHeight = this.Height;

        this.Tipo_1 = this.add.sprite(this.Width/2,this.Height/2,"botao",0).setScale(2).setOrigin(0.5,0.5).setInteractive();
        this.Tipo_1.on("pointerover",()=>{this.Tipo_1.setFrame(1)});
        this.Tipo_1.on("pointerout",()=> {this.Tipo_1.setFrame(0)});
        this.Tipo_1.on("pointerdown",()=>{this.Tipo_1.setFrame(1),setTimeout(()=> {this.scene.start("nivel_1")},500)});
    }
}
