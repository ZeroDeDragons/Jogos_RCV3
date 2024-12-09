export class objPlataforma
{
    constructor(cena) 
    {
        this.cenario = cena;
    }

    preload()
    {
        this.Width =  640;
        this.Height = 360;
        //this.tm = Math.round(Math.min(this.screenWidth,this.screenHeight)/100);
        this.cenario.load.spritesheet("plataformaA",   "assets/plataformaA.png", { frameWidth: 32, frameHeight: 16});
        this.cenario.load.image("plataformaB",   "assets/plataformaB.png", { frameWidth: 33, frameHeight: 16 });
        this.cenario.load.spritesheet("plataformaC",   "assets/plataformaC.png", { frameWidth: 32, frameHeight: 16 });
    }

    group()
    {
        this.plataformas = this.cenario.physics.add.group();
    }

    create(Type, x, y, qt = 1, Width = this.Width, Height = this.Height)
    {
        var Pisos;
        switch(Type)
        {
            case 'C': Type = 'plataformaC';  break;
            case 'B': Type = 'plataformaB';  break;
            case 'A': Type = 'plataformaA';  break;
        }
        function G(piso)
        {
            piso.body.allowGravity = false
            piso.setImmovable(true)
            // piso.displayWidth = piso.width*tm;
            // piso.displayHeight = piso.height*tm;
            if(y == 0){piso.y = Math.abs(piso.height/2-Height);}
        }
            
        switch(qt)
        {
            case 0:
                case 1:
                Pisos = this.plataformas.create(x,y,Type,0).setOrigin(0.5,0.5);G(Pisos);
                Pisos = this.plataformas.create((Pisos.x + Pisos.height*2),y,Type,2).setOrigin(0.5,0.5);G(Pisos);
                return [(Pisos.x+Pisos.width),(Pisos.y)];
            break;
            default:
                Pisos = this.plataformas.create(x,y,Type,0).setOrigin(0.5,0.5);G(Pisos);
                for(var p = 1; p <= qt - 1; p++)
                {
                    Pisos = this.plataformas.create((Pisos.x + Pisos.height*2),y,Type,1).setOrigin(0.5,0.5);
                    G(Pisos);
                }
                Pisos = this.plataformas.create((Pisos.x + Pisos.height),y,Type,2).setOrigin(0.5,0.5);G(Pisos);
                return [(Pisos.x+Pisos.width),(Pisos.y)];
            break;
        }
    }
} 
export class objPresentes
{
    constructor(cena) 
    {
        this.cenario = cena;
    }

    preload()
    {
        this.cenario.load.spritesheet("presentes",   "assets/presentes.png", { frameWidth: 24, frameHeight: 30 });
    }

    group()
    {
        this.Presentes = this.cenario.physics.add.group();
    }

    create(x, y, Width = this.Width, Height = this.Height)
    {
        this.Presentes.create(x,y,"presentes",Phaser.Math.Between(1, 3)).setOrigin(0.5,0.5);
    }
}
export class objArvore
{
    constructor(cena) 
    {
        this.cenario = cena;
    }

    preload()
    {
        this.cenario.load.image("arvore",   "assets/arvore.png");
    }

    group()
    {
        this.Arvore = this.cenario.physics.add.group();
    }

    create(x, y, Width = this.Width, Height = this.Height)
    {
        this.Arvore = this.Arvore.create(x,y,"arvore").setOrigin(0.5,0.5);
    }
}