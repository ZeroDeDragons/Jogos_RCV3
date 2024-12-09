import {objPlayers} from "./componentes/objPlayers.js";
import {Canhao} from "./componentes/inimigos.js";
import {objPlataforma, objPresentes, objArvore} from "./componentes/objs.js";

export class nivel_1 extends Phaser.Scene
{
    constructor()
    {
        super({key:"nivel_1"})
        this.ObjPlayers = new objPlayers(this);
        this.ObjCanhao = new Canhao(this);
        this.ObjPlataforma = new objPlataforma(this);
        this.ObjPresentes = new objPresentes(this);
        this.ObjArvore = new objArvore(this);
    }   

    preload()
    {
        this.Width =  640;
        this.Height = 360;
        this.load.image("Arvores3",            "assets/Land_1.png");
        this.load.image("Arvores2",            "assets/Land_2.png");
        this.load.image("Arvores1",            "assets/Trees.png");
        this.load.image("sky",                 "assets/Sky.png");
        this.load.image("stars",               "assets/Stars.png");
        this.ObjCanhao.preload();
        this.ObjPlayers.preload();
        this.ObjPlataforma.preload();
        this.ObjPresentes.preload();
        this.ObjArvore.preload();
    }

    create()
    {
        var px = 0, py = 0,pw;
        for(var i = 1; i <= 3; i++)
        {
            const ceu = this.add.image((this.Width)*i, (this.Height/2), "sky").setOrigin(1,0.5)
            ceu.displayWidth = this.Width;
            ceu.displayHeight = this.Height;
        }
        this.registry.set('Vida', 3);
        this.registry.set('Energia', 100);
        this.registry.set('pular', -200);
        this.registry.set('velocidade', 100);
        this.registry.set('Score', 0);
        this.Width =  640;
        this.Height = 360;
        
        this.ObjCanhao.group();
        this.ObjPresentes.group();
        this.ObjArvore.group();
        this.ObjPlataforma.group();

        this.ObjCanhao.create(100,300,0);
        this.ObjCanhao.create(330,300,0);
        this.ObjCanhao.create(550,250,0);
        this.ObjPresentes.create(350,300,0);
        [px, py] = this.ObjPlataforma.create('C',px    ,py,6);
        [px, py] = this.ObjPlataforma.create('C',px+120,py,2);
        [px, py] = this.ObjPlataforma.create('A',px+120,py-20);pw=px;
        [px, py] = this.ObjPlataforma.create('A',px+120,py,6);
        this.ObjCanhao.create(px-100, py-20,0);
        [px, py] = this.ObjPlataforma.create('A',pw+100,py-80,5);
        this.ObjPresentes.create(px-50,py-20,0);
        [px, py] = this.ObjPlataforma.create('A',px+30,py+40);
        [px, py] = this.ObjPlataforma.create('A',px-30,py-80,5);
        [px, py] = this.ObjPlataforma.create('A',px-170,py-60 );
        [px, py] = this.ObjPlataforma.create('A',px-200,py);
        [px, py] = this.ObjPlataforma.create('A',px-200,py );
        this.ObjPresentes.create(px-50,py-20,0);
        [px, py] = this.ObjPlataforma.create('A',px+460,py+160,3);
        [px, py] = this.ObjPlataforma.create('C',px+100,py+40);
        this.ObjCanhao.create(px-15, py-20,0);
        [px, py] = this.ObjPlataforma.create('C',px+100,py-40);
        this.ObjPresentes.create(px-75,py-20,0);
        [px, py] = this.ObjPlataforma.create('A',px+100,py-50,4);
        this.ObjArvore.create(px-60,py-40);
        this.ObjPlayers.create(10,330);
        /////////////////////////////////////////////////////////////////////////
        //                         Camera - Mundo                              //
        /////////////////////////////////////////////////////////////////////////
        this.physics.world.setBounds(0,0,this.Width*3,this.Height);
        this.cameras.main.setBounds(0,0, this.Width*3,this.Height);
        this.cameras.main.startFollow(this.ObjPlayers.player, true, 0.1, 1, 0,121);

        const style = {
            font: '32px Arial',
            fill: '#ffffff', // Cor do texto
            align: 'center', // Alinhamento do texto
            stroke: '#000000', // Cor do contorno
            strokeThickness: 3 // Espessura do contorno
        };
  
        const pontuacao = this.add.text(this.Width, 0, 'Score: '+this.registry.get('Score'), style);
        pontuacao.setOrigin(1,0).setScrollFactor(0);
        
        this.physics.add.collider(this.ObjPlayers.player,this.ObjPlataforma.plataformas)
          this.physics.add.collider(this.ObjPlayers.player,this.ObjCanhao.Canhao)
        this.physics.add.collider(this.ObjPlayers.player,this.ObjPresentes.Presentes,(player,objs)=>{this.registry.set('Score',this.registry.get('Score')+1), pontuacao.setText('Score: '+this.registry.get('Score'),objs.destroy())})
        this.physics.add.collider(this.ObjPlayers.player,this.ObjArvore.Arvore,(player,objs)=>{ this.scene.pause(),setTimeout(()=>{this.scene.start("menu_Inicial")},1000)})
        this.physics.add.collider(this.ObjArvore.Arvore,this.ObjPlataforma.plataformas)
        this.physics.add.collider(this.ObjCanhao.Canhao,this.ObjPlataforma.plataformas)
        this.physics.add.collider(this.ObjPlayers.player,this.ObjCanhao.ObjBala.bala,(player,objs)=>{objs.destroy(), this.ObjPlayers.dano()})
        this.physics.add.collider(this.ObjCanhao.Canhao,this.ObjPlataforma.plataformas)
        this.physics.add.collider(this.ObjPresentes.Presentes,this.ObjPlataforma.plataformas)
    }

    update()
    {
        console.log(this.registry.get('Energia'));
        this.ObjPlayers.update();
        this.ObjCanhao.update(this.ObjPlayers.player.x,this.ObjPlayers.player.y);
        if(this.registry.get('Vida') <=0)
        {

            this.scene.pause()
            setTimeout(
            ()=>{this.scene.start("menu_Morte")},1000
            )
        }
    }
}
