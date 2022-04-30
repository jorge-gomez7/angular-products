import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  addProduct(data:any){
    return this.http.post<any>('http://localhost:3000/products', data);
  }

  getProduct(){
    return this.http.get<any>('http://localhost:3000/products');
  }

  editProduct(data: any, id: number){
    return this.http.put<any>(`http://localhost:3000/products/${id}`, data);
  }

  deleteProduct(id: number){
    return this.http.delete<any>(`http://localhost:3000/products/${id}`);
  }

}
