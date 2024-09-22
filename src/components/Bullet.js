// src/components/Bullet.js
class Bullet {
  constructor(x, y, direction, speed, color, radius) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.speed = speed;
    this.radius = radius;
    this.color = color;
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
    return this.x < -100 || this.x > 700 || this.y < -100 || this.y > 700;
  }
}

export default Bullet;
