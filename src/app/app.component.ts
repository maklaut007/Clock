import { Component } from '@angular/core';
import { timer, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  subscription: Subscription = new Subscription();
  isRunning: boolean = false;
  time: number = 0; // time in seconds
  timeDisplay: string = '0:00'; // dislayed time
  doubleClickCheck = false; // while true => second click will pause
  title = 'Clock';
  setTime(seconds: number) {
    this.time = seconds;
    let min: number = Math.floor(seconds / 60);
    let sec: number = seconds % 60;
    this.timeDisplay = min + ':' + (sec < 10 ? '0' + sec : sec);
  }

  waitTimer() {
    // wait onClick
    if (this.isRunning == true) {
      if (!this.doubleClickCheck) {
        this.doubleClickCheck = true;
        timer(500).subscribe(() => {
          if (this.doubleClickCheck) {
            this.doubleClickCheck = false;
          }
        });
      } else {
        this.isRunning = false;
        this.doubleClickCheck = false;
      }
    }
  }

  startTimer() {
    // start/pause onClick
    if (!this.isRunning) this.isRunning = true;
    else {
      this.setTime(0);
      this.isRunning = false;
    }
  }

  resetTimer() {
    // start/pause reset onClick
    if (this.isRunning) {
      this.setTime(0);
      this.isRunning = true;
    }
  }

  ngOnInit() {
    this.subscription = interval(1000).subscribe(() => {
      if (this.isRunning) {
        this.setTime(this.time + 1);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
