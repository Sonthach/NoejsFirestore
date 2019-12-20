import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Book from '../model/Book';
import { ItemsService } from 'src/items.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  ngForm: FormGroup;
  book : Book
  books;
  checktao : boolean = true;
  checksua : boolean = false;
  theloai = ["Kinh dị","Lập trình","Viễn tưởng","Tình cảm"]
  trangthai = ["Dự kiến","Đã xuất bản"]
  
  constructor(private fb: FormBuilder, private services : ItemsService) {
    this.createForm()
  }

  ngOnInit() {
    this.book = new Book();
    this.services.getBooks().subscribe(data =>{
      this.books = Object.assign(data)
      this.initViewsTables(this.books);
    })
  }

  createForm() {
    this.ngForm = this.fb.group({
      tensach: ['', Validators.required],
      ngayphathanh: ['', Validators.required],
      theloai: ['', Validators.required],
      giatien: ['', Validators.required],
      tacgia: ['', Validators.required],
      mota: ['', Validators.required],
      trangthai: ['',Validators.required]
    });
  }

  getBooks(){
    this.services.getBooks().subscribe(data =>{
      this.books = Object.assign(data)
      this.updateForm(this.books);
    })
  }

  createBook(){
    let data = {
      tensach : this.book.tensach,
      ngayphathanh : this.book.ngayphathanh,
      mota : this.book.mota,
      theloai : this.book.theloai,
      giatien : this.book.giatien,
      tacgia : this.book.tacgia,
      trangthai : this.book.trangthai
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
    var currentEnviroment = this;
    let table = $('#datatables').DataTable({
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
        },

        {
          "render": function (data, type, row, meta) {
            if(row.trangthai == 'Dự kiến')
            {
              return '<button style="width:95px" type="submit" class="btn btn-warning pull-left">'+row.trangthai+'</button>'
            }
            else
              return '<button style="width:95px" type="submit" class="btn btn-info pull-left">'+row.trangthai+'</button>'
          }
        }
      ]
    })


    $('#datatables tbody').on('click' , 'tr', function() {
      var data = Object.assign(table.row(this).data())

      currentEnviroment.book = data;
      currentEnviroment.checksua = true;
      currentEnviroment.checktao = false;
    })
  }

  back(){
    this.checksua = false;
    this.checktao = true;
    this.book = new Book();
  }

  modifyBook(){
    let data = {
      id : this.book.id,
      tensach : this.book.tensach,
      ngayphathanh : this.book.ngayphathanh,
      mota : this.book.mota,
      theloai : this.book.theloai,
      giatien : this.book.giatien,
      tacgia : this.book.tacgia,
      trangthai : this.book.trangthai,
    }

    this.services.modifyBook(data).subscribe(data =>{
      let response = Object.assign(data)
      if(response.status == 200){
        window.alert("Sửa Sách thành công!!")
        this.getBooks();
      }else{
        window.alert("Sửa Sách thất bại!!")
      }
        })
  }

  tam = []
  filter(e, item) {
    if (e.target.checked) {
      this.tam.push(item);
      console.log(this.tam);
      let listafterfilter = []
      for (let i = 0; i < this.tam.length; i++) {
        for (let j = 0; j < this.books.length; j++) {
          if (this.tam[i] == this.books[j].trangthai) {

            listafterfilter.push(this.books[j])

          }
        }
        console.log(listafterfilter)
      }
      this.updateForm(listafterfilter)
    }
    else {
      let updateItem = this.tam.find(this.findIndexToUpdate, item);

      let index = this.tam.indexOf(updateItem);
      let listafterfilter = []
      this.tam.splice(index, 1);

      if (this.tam.length == 0) {
        this.updateForm(this.books)
      } else {

        for (let i = 0; i < this.tam.length; i++) {

          for (let j = 0; j < this.books.length; j++) {

            if (this.tam[i] == this.books[j].trangthai) {

              listafterfilter.push(this.books[j])

            }
          }
        }
        this.updateForm(listafterfilter)
      }
    }
  }
  findIndexToUpdate(type) {
    return type.id === this;
  }

  deleteBook(){
    this.services.deleteBook(this.book.id).subscribe(data =>{
      let response = Object.assign(data)
      if(response.status == 200){
        window.alert("Xóa Sách thành công!!")
        this.getBooks();
      }else{
        window.alert("Xóa Sách thất bại!!")
      }
    })
  }

  updateForm(data){
    $('#datatables').DataTable().clear().rows.add(data).draw();
  }
}
