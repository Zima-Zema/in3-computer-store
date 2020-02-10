import { Component, OnInit } from '@angular/core';
import { StoreService } from './store.service';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ramDropDown: string[];
  inchesDropDown: string[];
  opSysDropDown: string[];
  cpuDropDown: string[];

  page = 1;
  limit = 10;

  cpus: string[] = [];
  rams: string[] = [];
  opsys: string[] = [];
  inches: string[] = [];
  searchKey: string = '';
  storeData: [];
  totalCount: number = 0;
  constructor(private _service: StoreService) { }

  ngOnInit(): void {
    this._service.findDropDowns().subscribe((response: any) => {
      this.ramDropDown = response.data.ramDropDown;
      this.cpuDropDown = response.data.cpuDropDown;
      this.inchesDropDown = response.data.inchesDropDown;
      this.opSysDropDown = response.data.opSysDropDown;
    })
    this.startSearch();
  }



  searching = false;
  searchFailed = false;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this._service.search(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

    startSearch(page?: number) {
      this.page = page || this.page;
      const query = {
        skip: (this.page - 1) * this.limit,
        limit: this.limit,
        'cpu[]': this.cpus,
        'ram[]': this.rams,
        'opSys[]': this.opsys,
        'inches[]': this.inches,
        search: this.searchKey,
      };

      this._service.startSearch(query).subscribe((response: any) => {
        this.storeData = response.data;
        this.totalCount = response.count;
      });
    }
}
