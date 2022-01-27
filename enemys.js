class Enemy{
    constructor(x,y){
        this.sprite=enemys.create(x,y,'enemyship')
        this.sprite.setScale(0.05)
    }
    move(){
        var angle = Phaser.Math.Angle.Between(this.sprite.x,this.sprite.y,player.sprite.x,player.sprite.y)
        this.sprite.setAngle(Phaser.Math.RAD_TO_DEG*angle)
        scene.physics.velocityFromRotation(this.sprite.rotation,70,this.sprite.body.velocity)
    }
    collide(){
        var gotHit = scene.physics.overlap(this.sprite,missiles)
        if (gotHit == true){
            this.sprite.disableBody(true,true)
            point +=10
        }
    }
    loop(){
        this.move()
        this.collide()
    }
}
class EnemyShooter{
    constructor(x,y){
        this.sprite=enemys.create(x,y,'enemyship2')
        this.sprite.setScale(0.05)
        this.sprite.setCollideWorldBounds(true)
        this.timer = 0
        this.alive = true

    }
    aim(){
        var angle = Phaser.Math.Angle.Between(this.sprite.x,this.sprite.y,player.sprite.x,player.sprite.y)
        this.sprite.setAngle(Phaser.Math.RAD_TO_DEG*angle)
        
    }
    shoot(){
        if(this.alive == true){
          this.timer++
          if(this.timer == 120){
            new EnemyMissile(this.sprite.x,this.sprite.y,this.sprite.rotation)
            this.timer = 0
          }
        }
    }
    collide(){
        var gotHit = scene.physics.overlap(this.sprite,missiles)
        if (gotHit == true){
            this.sprite.disableBody(true,true)
            this.alive = false
            point += 15
        }
        
    }

    loop(){
        this.aim()
        this.shoot()
        this.collide()
        
    }
}
class EnemyMissile{
    constructor(x,y,angle){
        this.sprite=enemys.create(x,y,'alienmissile')
        this.sprite.setScale(0.175)
        this.sprite.setAngle(Phaser.Math.RAD_TO_DEG*angle)
        scene.physics.velocityFromRotation(this.sprite.rotation,150,this.sprite.body.velocity)
        scene.physics.add.overlap(this.sprite,player.sprite, ()=>{
          this.sprite.destroy()
          player.loseHealth(5)
        })

    }
    
}