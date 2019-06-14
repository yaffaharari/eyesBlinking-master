import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {OpenWebService} from '../open-web.service';
import * as faceapi from 'face-api.js';
import {from, Observable} from 'rxjs';

@Component({
  selector: 'app-open-web-cam',
  templateUrl: './open-web-cam.component.html',
  styleUrls: ['./open-web-cam.component.scss']
})
export class OpenWebCamComponent implements OnInit {

  @ViewChild('canvas')
  canvas: ElementRef;

  video: HTMLVideoElement;
  blinkCounter = 0;
  blinkLeftEye = 0;
  crntDate = new Date();
  time = '00:00:00';
  blinksTimeArr = [this.crntDate];
  timeCounter = 0 ;
  message = 'time to work';

  constructor(private openWebService: OpenWebService) {
    this.openWebService.loadModels();
  }

  ngOnInit() {
    this.video = document.querySelector('video');
    this.startVideo(this.video);
    console.log(faceapi.nets);
    this.drawFace(this.video);
  }

  private startVideo(video: HTMLVideoElement) {
    const constraints = {video: true};
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream;
    });
  }

  private drawFace(video: HTMLVideoElement) {

    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');

    const displaySize = {width: video.width, height: video.height};
    const f = faceapi.matchDimensions(canvas, displaySize);
    console.log(f);

    setInterval(async () => {
      const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();
      const leftEye = detections.landmarks.getLeftEye();
      const rightEye = detections.landmarks.getRightEye();
      this.detectLeftEyeBlink(leftEye);
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    }, 100);
  }

  private detectLeftEyeBlink(leftEye: any[]) {
    const p1 = leftEye[0];
    const p2 = leftEye[1];
    const p3 = leftEye[2];
    const p4 = leftEye[3];
    const p5 = leftEye[4];
    const p6 = leftEye[5];
    let a = ((p2.x - p6.x) * (p2.x - p6.x)) + ((p2.y - p6.y) * (p2.y - p6.y));
    a = Math.sqrt(a);
    let b = ((p3.x - p5.x) * (p3.x - p5.x)) + ((p3.y - p5.y) * (p3.y - p5.y));
    b = Math.sqrt(b);
    let c = ((p1.x - p4.x) * (p1.x - p4.x)) + ((p1.y - p4.y) * (p1.y - p4.y));
    c = Math.sqrt(c);
    this.blinkLeftEye = (a + b) / (2 * c);
    if (this.blinkLeftEye < 0.3) {
      this.blinkCounter++;
      this.crntDate = new Date();
      this.time = this.crntDate.getHours() + ':' + this.crntDate.getMinutes() + ':' + this.crntDate.getSeconds();
      this.blinksTimeArr.push(this.crntDate);
      for (let i = 0; i <= this.blinksTimeArr.length - 1; i++) {
        const prevTime = this.blinksTimeArr[i];
        const currentTime = this.blinksTimeArr[i + 1];
        const diffTime = Math.abs(currentTime.getTime() - prevTime.getTime());
        console.log(diffTime);
        if (diffTime <= 20) {
          this.timeCounter++;
        }
        if (this.timeCounter >= 3 ) {
          this.message = 'please go to sleep';
        }

      }
    }
  }
}

