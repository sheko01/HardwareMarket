import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.html',
  styleUrls: ['./slider.css'],
})
export class SliderComponent implements OnInit, OnDestroy {
  currentIndex: number = 0;

  slideInterval: any;

  hardwareImages = [
    {
      url: '/imgs/3.jpg',
      title: 'Custom Gaming Rigs',
      altText: 'High-performance gaming PC',
    },
    {
      url: '/imgs/2.jpg',
      title: 'Creator Laptops',
      altText: 'silver laptop',
    },
    {
      url: '/imgs/1.jpg',
      title: 'Next-Gen GPUs',
      altText: 'Modern graphics card',
    },
  ];

  //override ngOnInit to start the timer when the component initializes
  ngOnInit() {
    this.startAutoPlay();
  }

  //override ngOnDestroy to stop the timer when the component is destroyed
  ngOnDestroy() {
    this.stopAutoPlay();
  }

  //function to start the timer
  startAutoPlay() {
    this.slideInterval = setInterval(() => {
      this.next();
    }, 1000);
  }

  //function to stop the timer
  stopAutoPlay() {
    // clearInterval with timerID
    clearInterval(this.slideInterval);
  }
  //Next button function
  next() {
    if (this.currentIndex < this.hardwareImages.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }
  //Previous button function
  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.hardwareImages.length - 1;
    }
  }

  goToSlide(index: number) {
    //update the current index to the selected slide
    this.currentIndex = index;

    //reset the timer to give users time to view the selected slide
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}
