import { Component, Inject, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  listadoFrescura = ['Nuevo', 'Usado', 'Pobre'];
  productForm !: FormGroup;
  actionBtn: string='Guardar';
  constructor(
    private fb: FormBuilder, 
    private service: ApiService, 
    @Inject(MAT_DIALOG_DATA) public editProduct: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    ) { }

  
  ngOnInit(): void {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      fecha: ['', Validators.required],
      frescura: ['', Validators.required],
      precio: ['', Validators.required],
      comentario: ['', Validators.required],
    });
    if(this.editProduct){
      this.actionBtn='Actualizar';
      this.productForm.controls['nombre'].setValue(this.editProduct.nombre);
      this.productForm.controls['categoria'].setValue(this.editProduct.categoria);
      this.productForm.controls['fecha'].setValue(this.editProduct.fecha);
      this.productForm.controls['frescura'].setValue(this.editProduct.frescura);
      this.productForm.controls['precio'].setValue(this.editProduct.precio);
      this.productForm.controls['comentario'].setValue(this.editProduct.comentario);
    }
  }

  addProduct(){
    if(!this.editProduct){
      if(this.productForm.valid){
        this.service.addProduct(this.productForm.value).subscribe({
          next: (res)=>{
            console.log('Product added successfully');
            console.log(res);
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () =>{
            console.log('Error while adding the product')
          }
        })
      } 
    }else{
      this.updateProduct();
    }   
  }

  updateProduct(){
    this.service.editProduct(this.productForm.value, this.editProduct.id).subscribe({
      next: (res)=>{
        console.log('Product updated successfully');
        this.productForm.reset();
        this.dialogRef.close('update');        
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
  

}
