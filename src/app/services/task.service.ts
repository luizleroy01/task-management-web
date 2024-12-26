import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';

import taskList from '../../../public/taskLIst.json';

const BASE_URL = 'http://localhost:8080/tasks/'
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${BASE_URL}`);
  }
  
  getTasksTest(){
    return taskList;
  }
}
