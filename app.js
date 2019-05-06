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
    this.context.strokeStyle = this.color;
    this.context.fillStyle = this.color;
    this.context.lineWidth = 1;
    this.size = '';
    this.mode = 0;
    this.vertex = [];
    this.history = [];
    this.updateHistory();

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

  updateHistory() {
    const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    this.history.push(imageData);
  }

  currHistory() {
    const reloadData = this.history[this.history.length - 1];
    this.context.putImageData(reloadData, 0, 0);
  }

  backHistory() {
    const reloadData = this.history.pop();
    this.context.putImageData(reloadData, 0, 0);
  }

  pointerdownEvent(event) {
    if (!this.mode) return;
    this.action = true;
    this.orignX = Math.floor(event.offsetX);
    this.orignY = Math.floor(event.offsetY);
    this.pointerX = Math.floor(event.offsetX);
    this.pointerY = Math.floor(event.offsetY);
    this.drawDot();
    if (this.mode === 2) {
      if (this.vertex.length < 2) {
        this.vertex.push({
          x: this.orignX,
          y: this.orignY
        });
      } else {
        this.drawTri();
        this.updateHistory();
      }
    }
  }

  pointermoveEvent() {
    if (!this.action) return;
    this.pointerX = Math.floor(event.offsetX);
    this.pointerY = Math.floor(event.offsetY);
    if (this.mode === 1) {
      this.currHistory();
      this.context.strokeRect(this.orignX, this.orignY, this.pointerX - this.orignX, this.pointerY - this.orignY);
    } else if (this.mode === 3) {
      this.currHistory();
      this.drawLine();
    }
  }

  pointerupEvent() {
    if (!this.action) return;
    this.pointerX = Math.floor(event.offsetX);
    this.pointerY = Math.floor(event.offsetY);
    if (this.mode === 1) {
      this.currHistory();
      this.drawRect();
      this.updateHistory();
    } else if (this.mode === 3) {
      this.currHistory();
      this.drawLine();
      this.updateHistory();
    }
    this.action = false;
  }

  drawDot() {
    this.context.beginPath();
    this.context.arc(this.orignX, this.orignY, 1, 0, 2 * Math.PI, true);
    this.context.fill();
  }

  drawLine() {
    this.context.beginPath();
    this.context.moveTo(this.orignX, this.orignY);
    this.vertex.shift();
    this.context.lineTo(this.pointerX, this.pointerY);
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
    this.context.fillRect(this.orignX, this.orignY, this.pointerX - this.orignX, this.pointerY - this.orignY);
    this.vertex.shift();
  }

  drawCircle() {

  }
}

const canvas = document.getElementById('app');
const app = new Painter(canvas);
