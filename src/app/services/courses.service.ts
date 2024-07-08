import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  courses: Course[] = [];
  url: string = "https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json";
  constructor(private http: HttpClient) { }

  //Methods
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url)
  }
}
