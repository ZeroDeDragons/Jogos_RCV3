import {bala} from "./funcoes_auxiliares.js";
export class Canhao
{
    constructor(scene) 
    {
        this.cenario = scene;
        this.ObjBala = new bala(scene); 
    }
    preload() 
    {
        this.ObjBala.preload();
        this.cenario.load.image("Canhao", "/assets2/canhao.png");
    }

    group()
    {
        this.ObjBala.group();
        this.Canhao = this.cenario.physics.add.group();
    }

    create(X,Y,R) 
    {
        var canhao = this.Canhao.create(X, Y, 'Canhao').setOrigin(0.5, 0.5);
        canhao.angle =R;
        //canhao.setImmovable(true)
        // canhao.width =  canhao.width* this.tm;
        // canhao.height = canhao.height*this.tm;
        canhao.setData('Shot', false);
        if(R==0) canhao.setData('Horizontal', true);
        if(R!=0) 
        {
            canhao.body.allowGravity = true;
            canhao.setData('Horizontal', false);
        }
    }

    update(X,Y) 
    {  
        this.Canhao.getChildren().forEach((canhao) =>
        {
            var atirarX = canhao.x - X;
            var atirarY = canhao.y - Y;
            if((atirarX < 100 && atirarX > 0) && (Y > canhao.y - canhao.height*2 && Y < canhao.y + canhao.height*2) && canhao.getData('Horizontal'))
            {
                if (canhao.getData('Shot') === false) 
                {
                    canhao.setData("Shot",true)
                    this.ObjBala.create("grandeboladeneve",canhao.x,canhao.y,-250);
                    setTimeout(()=>{canhao.setData("Shot",false)},1500)
                           
                }
            }
            else if((atirarY < 200 && atirarY > 0) && (X > canhao.x - canhao.width*2 && X < canhao.x + canhao.width*2) && !canhao.getData('Horizontal'))
            {
                if (canhao.getData('Shot') === false) 
                {
  
                    canhao.setData("Shot",true)
                    this.ObjBala.create("grandeboladeneve",canhao.x,canhao.y,0,-250);
                    setTimeout(()=>{canhao.setData("Shot",false)},1500)
                           
                }
            } 
        });
    }   
}
