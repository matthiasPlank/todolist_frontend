import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { NgFor } from '@angular/common';



@Component({
  selector: 'app-all-todos',
  standalone: true,
  imports: [NgFor],
  templateUrl: './all-todos.component.html',
  styleUrl: './all-todos.component.scss'
})
export class AllTodosComponent implements OnInit {

  todos:any = []; 

  constructor( private http: HttpClient){}

  async ngOnInit(): Promise<void> {
    this.todos = await this.loadTodos(); 
    console.log(this.todos);

  }

  loadTodos(){
    const url = environment.apiUrl + '/todos/';
    return lastValueFrom(this.http.get(url));
  }

}
