class Painter {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.width = document.body.clientWidth * 0.8;
    this.canvas.height = document.body.clientHeight * 0.8;
    this.context = this.canvas.getContext('2d');
    this.orignX = null;
    this.orignY = null;
    this.pointerX = null;
    this.pointerY = null;
    this.color = '#000000';
    this.context.fillStyle = this.color;
    this.context.lineWidth = 5;
    this.size = '';
    this.mode = 0;
    this.vertex = [];

    document.getElementsByClassName('option-btn')[0].addEventListener('click', () => {
      this.mode = 0;
      this.vertex = [];
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    });
    document.getElementsByClassName('option-btn')[1].addEventListener('click', () => {
      this.mode = 1;
      this.vertex = [];
    });
    document.getElementsByClassName('option-btn')[2].addEventListener('click', () => {
      this.mode = 2;
      this.vertex = [];
    });
    document.getElementsByClassName('option-btn')[3].addEventListener('click', () => {
      this.mode = 3;
      this.vertex = [];
    });
    this.action = false;
    this.pointerdownEvent = this.pointerdownEvent.bind(this);
    this.pointermoveEvent = this.pointermoveEvent.bind(this);
    this.pointerupEvent = this.pointerupEvent.bind(this);
    this.canvas.addEventListener('pointerdown', this.pointerdownEvent);
    this.canvas.addEventListener('pointermove', this.pointermoveEvent);
    this.canvas.addEventListener('pointerup', this.pointerupEvent);
  }

  pointerdownEvent(event) {
    this.action = true;
    this.orignX = Math.floor(event.offsetX);
    this.orignY = Math.floor(event.offsetY);
    this.pointerX = Math.floor(event.offsetX);
    this.pointerY = Math.floor(event.offsetY);
    this.drawDot();
    if (this.mode === 1) {
      if (this.vertex.length < 1) {
        this.vertex.push({
          x: this.orignX,
          y: this.orignY
        });
      } else {
        this.drawRect();
      }
    } else if (this.mode === 2) {
      if (this.vertex.length < 2) {
        this.vertex.push({
          x: this.orignX,
          y: this.orignY
        });
      } else {
        this.drawTri();
      }
    } else if (this.mode === 3) {
      if (this.vertex.length < 1) {
        this.vertex.push({
          x: this.orignX,
          y: this.orignY
        });
      } else {
        this.drawLine();
      }
    }
  }

  pointermoveEvent() {
    if (!this.action) return;
  }

  pointerupEvent() {
    this.pointerX = Math.floor(event.offsetX);
    this.pointerY = Math.floor(event.offsetY);
    this.action = false;
  }

  drawDot() {
    this.context.beginPath();
    this.context.arc(this.orignX, this.orignY, 5, 0, 2 * Math.PI, true);
    this.context.fill();
  }

  drawLine() {
    this.context.beginPath();
    this.context.moveTo(this.vertex[0].x, this.vertex[0].y);
    this.vertex.shift();
    this.context.lineTo(this.orignX, this.orignY);
    this.context.stroke();
  }

  drawTri() {
    this.context.beginPath();
    this.context.moveTo(this.vertex[0].x, this.vertex[0].y);
    this.vertex.shift();
    this.context.lineTo(this.vertex[0].x, this.vertex[0].y);
    this.vertex.shift();
    this.context.lineTo(this.orignX, this.orignY);
    this.context.fill();
  }

  drawRect() {
    this.context.fillRect(this.vertex[0].x, this.vertex[0].y, this.pointerX - this.vertex[0].x, this.pointerY - this.vertex[0].y);
    this.vertex.shift();
  }

  drawCircle() {

  }
}

const canvas = document.getElementById('app');
const app = new Painter(canvas);
