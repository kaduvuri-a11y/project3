// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'my-crud-app';
// }
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  
  minutes = 0;
  seconds = 0;
  intervalId: any;
  welcomeMessage = '';

  ngOnInit(): void {
    this.startTimer();
    this.setWelcomeMessage();
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.seconds++;
      if (this.seconds >= 60) {
        this.minutes++;
        this.seconds = 0;
      }
    }, 1000);
  }

  setWelcomeMessage() {
    const hour = new Date().getHours();
    if(hour < 12) this.welcomeMessage = 'Good Morning';
    else if(hour < 18) this.welcomeMessage = 'Good Afternoon';
    else this.welcomeMessage = 'Good Evening';
  }

  get formattedTime(): string {
    const mm = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    const ss = this.seconds < 10 ? '0' + this.seconds : this.seconds;
    return `${mm}:${ss}`;
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
