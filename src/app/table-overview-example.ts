import {Component, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
//import fs from 'file-system'

declare var settings: MockSettings;
declare var fs: any;

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'table-overview-example',
  styleUrls: ['table-overview-example.css'],
  templateUrl: 'table-overview-example.html',
})
export class TableOverviewExample {
  displayedColumns = ['name'];
  dataSource: MatTableDataSource<MockFile>;
  selectedFile: MockFile;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(settings.files);
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  selectFile(row: MockFile){
    let fullFilePath = settings.dir + row.name;
    let destinationPath = settings.selectedDir + 'worked.json';
    this.selectedFile = row;

    fs.createReadStream(fullFilePath).pipe(fs.createWriteStream(destinationPath));
    console.log(row.name, ' selected!');
  }
}

export interface MockSettings{
  dir: string, 
  selectedDir: string,
  files: MockFile[]
}

export interface MockFile{
  name: string
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */