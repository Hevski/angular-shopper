import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-product-modal',
  templateUrl: './view-product-modal.component.html',
  styleUrls: ['./view-product-modal.component.css']
})
export class ViewProductModalComponent implements OnInit {
  @Input() title!: string
  @Input() product: any;

  constructor() { }

  ngOnInit(): void {
  }

}
