class Player {
  constructor() {
    this.sprite = scene.physics.add.sprite(400, 300, 'playership')
    this.sprite.setScale(0.05)
    this.shootTimer = 0
    this.sprite.setCollideWorldBounds(true)
    this.health = 100
    this.damageTimer = 0
    this.graphics = scene.add.graphics()
  }
  loseHealth(howMuchHealth) {
    this.health = this.health - howMuchHealth
    console.log(this.health)
    if (this.health < 1) {
      this.sprite.destroy()
      var background = scene.add.image(400, 300, 'game over').setScale(2)
      background.depth = 10
      text.x = 400
      text.y = 400
      scene.scene.pause()
      clearInterval()
    }
  }
  drawHealthBar() {
    this.graphics.clear()
    this.graphics.fillStyle(0x00ff00)
    this.graphics.fillRect(0, 0, this.health, 20)
  }
  move() {
    if (cursors.up.isDown == true) {
      scene.physics.velocityFromRotation(this.sprite.rotation, 150, this.sprite.body.velocity)
    }
    if (cursors.left.isDown == true) {
      this.sprite.setAngularVelocity(-300)
    }
    if (cursors.right.isDown == true) {
      this.sprite.setAngularVelocity(300)
    }
    if (cursors.right.isDown == false && cursors.left.isDown == false) {
      this.sprite.setAngularVelocity(0)
    }
    if (cursors.down.isDown == true) {
      scene.physics.velocityFromRotation(this.sprite.rotation, -150, this.sprite.body.velocity)
    }
    if (cursors.up.isDown == false && cursors.down.isDown == false) {
      scene.physics.velocityFromRotation(this.sprite.rotation, 0, this.sprite.body.velocity)
    }
  }
  shoot() {
    this.shootTimer = this.shootTimer + 1
    if (keySpace.isDown && this.shootTimer > 60) {
      new Missile(this.sprite.x, this.sprite.y, this.sprite.rotation)
      this.shootTimer = 0
    }
  }
  collide() {
    var gotHit = scene.physics.collide(this.sprite, enemys)

    this.damageTimer += 1
    if (gotHit == true && this.damageTimer > 60) {
      this.loseHealth(5)
      this.damageTimer = 0
    }

  }
  loop() {

    if (this.health > 0) {
      this.drawHealthBar()
      this.move()
      this.shoot()
      this.collide()
    }
  }

}
class Missile {
  constructor(x, y, r) {
    this.sprite = missiles.create(x, y, 'missile')
    this.sprite.rotation = r
    this.sprite.setScale(0.1)
    scene.physics.velocityFromRotation(this.sprite.rotation, 250, this.sprite.body.velocity)
  }
}