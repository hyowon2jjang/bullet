// src/components/Bullet.js
class Bullet {
  constructor(x, y, direction, speed) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = speed;
    this.radius = 10;
    this.color = "red";
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }

  move() {
    this.y -= Math.sin(this.direction) * this.speed;
    this.x -= Math.cos(this.direction) * this.speed;
  }

  isInFrame() {
    return this.x < 0 || this.x > 500 || this.y < 0 || this.y > 500;
  }
}

export default Bullet;
