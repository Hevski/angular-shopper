import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() apiCall: any;
  @Input() searchTerm = '';
  $searchTermSubject: Subject<string> = new Subject<string>();

  constructor() {
  }

  ngOnInit(): void {
    this.$searchTermSubject.pipe(debounceTime(600)).subscribe(search => {
      this.searchTerm = search;
      this.apiCall(this.searchTerm);
    });
  }

  /**
   * Sends the search term as string changes
   * @param search
   */
  onChange(search: string): void {
    this.$searchTermSubject.next(search);
  }

}