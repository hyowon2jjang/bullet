// src/components/Player.js
class Player {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.radius = 15; // Player's size
    this.color = "blue";
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }

  move(keys) {
    // Add diagonal movement
    if ((keys["ArrowUp"] && keys["ArrowLeft"]) || (keys["w"] && keys["a"])) {
      this.x -= this.speed / Math.sqrt(2);
      this.y -= this.speed / Math.sqrt(2);
    } else if (
      (keys["ArrowUp"] && keys["ArrowRight"]) ||
      (keys["w"] && keys["d"])
    ) {
      this.x += this.speed / Math.sqrt(2);
      this.y -= this.speed / Math.sqrt(2);
    } else if (
      (keys["ArrowDown"] && keys["ArrowLeft"]) ||
      (keys["s"] && keys["a"])
    ) {
      this.x -= this.speed / Math.sqrt(2);
      this.y += this.speed / Math.sqrt(2);
    } else if (
      (keys["ArrowDown"] && keys["ArrowRight"]) ||
      (keys["s"] && keys["d"])
    ) {
      this.x += this.speed / Math.sqrt(2);
      this.y += this.speed / Math.sqrt(2);
    } else if (keys["ArrowUp"] || keys["w"]) this.y -= this.speed;
    else if (keys["ArrowDown"] || keys["s"]) this.y += this.speed;
    else if (keys["ArrowLeft"] || keys["a"]) this.x -= this.speed;
    else if (keys["ArrowRight"] || keys["d"]) this.x += this.speed;
  }

  checkCollision(bullets) {
    for (let bullet of bullets) {
      const dist = Math.hypot(this.x - bullet.x, this.y - bullet.y);
      if (dist - this.radius - bullet.radius < 0) {
        return true;
      }
    }
    return false;
  }
}

export default Player;
