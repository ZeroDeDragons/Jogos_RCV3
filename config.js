import { Menu_Teclado, Menu_Inicial, Menu_Morte} from "./menus.js";
import { nivel_1} from "./nivels.js";
//import { Menu_Inicial } from "./Menus.js";
const config = {
    type: Phaser.AUTO,
    physics:{
        default:"arcade",
        arcade:{gravity: {y:300}},
        debug: true
    },
    pixelArt:true,
    width:  window.innerWidth,
    height: window.innerHeight, 
    backgroundColor: '#000',
    scene: [Menu_Teclado, Menu_Inicial, Menu_Morte,nivel_1],
    scale: 
    {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    parent: 'game',
};
const game = new Phaser.Game(config);
