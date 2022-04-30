import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'products';

  displayedColumns: string[] = ['Producto', 'Categoría', 'Fecha', 'Frescura', 'Precio', 'Comentario', 'Acción'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private service: ApiService){

  }

  ngOnInit(): void{
    this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllProducts();
      }
    })
  }


  getAllProducts(){
    this.service.getProduct().subscribe({
      next: (res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err)=>{
        console.log('Error while fetch data', err);
      }
    })
  }

  editProduct(row: any){
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllProducts();
      }
    })
  }

  deleteProduct(id: number){
    this.service.deleteProduct(id).subscribe({
      next: (res)=>{
        console.log('Deleted!');
        this.getAllProducts();
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
