import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-schema',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, JsonPipe],
  templateUrl: './schema.component.html',
  styleUrl: './schema.component.scss'
})
export class SchemaComponent implements AfterViewInit {

  getCourses(): Course[] {

    this.getItem = localStorage.getItem("newCourses") || "";
    this.newdata = JSON.parse(this.getItem);
    this.courseService.courses = this.newdata;
    return this.courseService.courses;
  }
  delete(kurs: Course) {
    for (let index = 0; index < this.courseService.courses.length; index++) { //Go through until match is found
      const element = this.courseService.courses[index];
      if (element.courseName === kurs.courseName) {
        this.courseService.courses.splice(index, 1); //Remove match and save to LocalStorage
        localStorage.setItem("newCourses", JSON.stringify(this.courseService.courses));
        break;
      }
    }
    this.getCourses();

  }
  sortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  displayedColumns: string[] = ['courseCode', 'subjectCode', 'level', 'progression', 'courseName', 'points', 'institutionCode', 'subject', 'syllabus', 'delete'];

  dataSource!: MatTableDataSource<Course>;
  newdata: Course[] = [];
  getItem: string = "";


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private courseService: CoursesService, private _liveAnnouncer: LiveAnnouncer) {
    this.dataSource = new MatTableDataSource();
    this.getCourses();
  }

  public ngAfterViewInit(): void {
    this.courseService.getCourses().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
