import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageTasks, Task } from '../models/task.model';
import { Observable } from 'rxjs';

import taskList from '../../../public/taskLIst.json';
export type RequestTaskParams = {
  page: number;
  items: number;
}

const BASE_URL = 'http://localhost:8080/tasks/'
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${BASE_URL}`);
  }

  getPageTasks(params : RequestTaskParams): Observable<PageTasks> {
    return this.http.get<PageTasks>(`${BASE_URL}page`,{params: params});
  }
  
  getTasksTest(){
    return taskList;
  }

  createTask(task: Task): Observable<Task>{
    return this.http.post<Task>(`${BASE_URL}`, task);
  }
}
