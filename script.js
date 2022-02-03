var config = {
    type:Phaser.AUTO,
    width:800,
    height:600,
    physics:{
        default:"arcade",
        arcade:{
            debug:false
        }
    },
    
    scene:{
        preload:preload,
        create:create,
        update:update
    }
}
var game = new Phaser.Game(config)
function preload(){
scene = this
scene.load.image('playership','playership.png')
scene.load.image('enemyship','enemyship.png')
scene.load.image('enemyship2','enemyship2.png')
scene.load.image('missile','missile.png')
scene.load.image('alienmissile','alienmissile.png')
scene.load.image('game over', 'game over.jpg')

}
function create(){
    point = 0
    text = scene.add.text(700,10,point,{
        font:'24px Arial Black',fill:'#fff'
    })
    text.depth = 11
    cursors = this.input.keyboard.createCursorKeys()
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    enemys = scene.physics.add.group()
    missiles=scene.physics.add.group()
    player = new Player()
    
    //enemy = new Enemy(0,0)
    enemies = []
    setInterval(function(){
        var side = Phaser.Math.Between(0,4)
        if (side == 0){
            enemies.push(new Enemy(Phaser.Math.Between(0,800),0))
 
        }
       else if (side == 1){
            enemies.push(new Enemy(0, Phaser.Math.Between(0,600)))
 
        }
        else if (side == 2){
            enemies.push(new Enemy(Phaser.Math.Between(0,800),600))
 
        }
        else{
            enemies.push(new Enemy(800, Phaser.Math.Between(0,600)))
        }        
    },3000)
    setInterval(function(){
        var side = Phaser.Math.Between(0,4)
        if (side == 0){
            enemies.push(new EnemyShooter(Phaser.Math.Between(0,800),0))
 
        }
       else if (side == 1){
            enemies.push(new EnemyShooter(0, Phaser.Math.Between(0,600)))
 
        }
        else if (side == 2){
            enemies.push(new EnemyShooter(Phaser.Math.Between(0,800),600))
 
        }
        else{
            enemies.push(new EnemyShooter(800, Phaser.Math.Between(0,600)))
        }        
    },10000)
  
}
function update(){
text.setText(point)


player.loop()
// enemy.loop()
for(let i = 0;i<enemies.length;i++){
    enemies[i ].loop()
    }


}
