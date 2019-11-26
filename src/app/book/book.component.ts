import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Book from '../model/Book';
import { ItemsService } from 'src/items.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  ngForm: FormGroup;
  book : Book
  books;
  theloai = ["Kinh dị","Lập trình","Viễn tưởng","Tình cảm"]
  
  constructor(private fb: FormBuilder, private services : ItemsService) {
    this.createForm()
  }

  ngOnInit() {
    this.book = new Book();
    this.getBooks();
  }

  createForm() {
    this.ngForm = this.fb.group({
      tensach: ['', Validators.required],
      ngayphathanh: ['', Validators.required],
      theloai: ['', Validators.required],
      giatien: ['', Validators.required],
      tacgia: ['', Validators.required],
      mota: ['', Validators.required]
    });
  }

  getBooks(){
    this.services.getBooks().subscribe(data =>{
      this.books = Object.assign(data)
      this.initViewsTables(this.books);
    })
  }

  createBook(){
    let data = {
      tensach : this.book.tensach,
      ngayphathanh : this.book.ngayphathanh,
      mota : this.book.mota,
      theloai : this.book.theloai,
      giatien : this.book.giatien,
      tacgia : this.book.tacgia
    }

    this.services.createBook(data).subscribe(data =>{
      let response = Object.assign(data)
      if(response.status == 200){
        window.alert("Thêm Sách thành công!!")
        this.getBooks();
      }else{
        window.alert("Thêm Sách thất bại!!")
      }
        })
  }

  initViewsTables(data){
    console.log(data)
    $('#datatables').DataTable({
      data: data,
      destroy: true,
      columns: [
        {
          "render": function (data, type, row, meta) {
            return row.tensach
          }
        },

        {
          "render": function (data, type, row, meta) {
            return row.ngayphathanh
          }
        },

        {
          "render": function (data, type, row, meta) {
            return row.theloai
          }
        },

        {
          "render": function (data, type, row, meta) {
            return row.giatien
          }
        },

        {
          "render": function (data, type, row, meta) {
            return row.tacgia
          }
        }
      ]
    })
  }
}
