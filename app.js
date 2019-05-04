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
    this.context.fillStyle = 'black';
    this.size = '';
    this.mode = 0;
    this.vertex = [];

    this.clear = this.clear.bind(this);
    document.getElementsByClassName('option-btn')[0].addEventListener('click', this.clear);
    document.getElementsByClassName('option-btn')[1].addEventListener('click', () => {
      this.mode = 1;
    });
    document.getElementsByClassName('option-btn')[2].addEventListener('click', () => {
      this.mode = 2;
    });
    this.action = false;
    this.pointerdownEvent = this.pointerdownEvent.bind(this);
    this.pointermoveEvent = this.pointermoveEvent.bind(this);
    this.pointerupEvent = this.pointerupEvent.bind(this);
    this.canvas.addEventListener('pointerdown', this.pointerdownEvent);
    this.canvas.addEventListener('pointermove', this.pointermoveEvent);
    this.canvas.addEventListener('pointerup', this.pointerupEvent);
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  pointerdownEvent(event) {
    this.action = true;
    this.orignX = Math.floor(event.offsetX);
    this.orignY = Math.floor(event.offsetY);
    this.pointerX = Math.floor(event.offsetX);
    this.pointerY = Math.floor(event.offsetY);
    if (this.mode === 2) {
      if (this.vertex.length < 2) {
        this.vertex.push({
          x: this.orignX,
          y: this.orignY
        });
      } else {
        this.context.beginPath();
        this.context.moveTo(this.vertex[0].x, this.vertex[0].y);
        this.vertex.shift();
        this.context.lineTo(this.vertex[0].x, this.vertex[0].y);
        this.vertex.shift();
        this.context.lineTo(this.orignX, this.orignY);
        this.context.fill();
      }
    }
  }

  pointermoveEvent() {
    if (!this.action) return;
    this.pointerX = Math.floor(event.offsetX);
    this.pointerY = Math.floor(event.offsetY);
    if (this.mode === 1) {
      this.context.clearRect(this.orignX, this.orignY, this.pointerX - this.orignX, this.pointerY - this.orignY);
      this.context.strokeRect(this.orignX, this.orignY, this.pointerX - this.orignX, this.pointerY - this.orignY);
    }
  }

  pointerupEvent() {
    this.pointerX = Math.floor(event.offsetX);
    this.pointerY = Math.floor(event.offsetY);
    if (this.mode === 1) {
      this.context.fillRect(this.orignX, this.orignY, this.pointerX - this.orignX, this.pointerY - this.orignY);
    }
    this.action = false;
  }
}

const canvas = document.getElementById('app');
const app = new Painter(canvas);
