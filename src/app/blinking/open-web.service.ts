import {Injectable} from '@angular/core';
import {BlinkingModule} from './blinking.module';
import * as faceapi from 'face-api.js';

@Injectable({
  providedIn: BlinkingModule
})
export class OpenWebService {

  constructor() {

  }

  public async loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri('assets/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('assets/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('assets/models');
  }
}


