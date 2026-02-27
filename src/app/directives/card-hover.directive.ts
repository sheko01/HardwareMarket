import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCardHover]'
})
export class CardHoverDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  @HostListener('mouseenter') onMouseEnter() {
    // Add shadow to the card
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 10px 20px rgba(0,0,0,0.2)');

    // scale the image
    const img = this.el.nativeElement.querySelector('.product-image');
    if (img) this.renderer.setStyle(img, 'transform', 'scale(1.2)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    // Remove shadow
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', 'none');

    // Reset image scale
    const img = this.el.nativeElement.querySelector('.product-image');
    if (img) this.renderer.setStyle(img, 'transform', 'scale(1)');
  }
}
