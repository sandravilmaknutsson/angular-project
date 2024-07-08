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
  selector: 'app-table',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, JsonPipe, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})

export class TableComponent implements AfterViewInit {
  getCourses(): Course[] {

    console.log(localStorage.getItem("newCourses"))
    return this.courseService.courses;
  }
  add(coursename: Course) {
    this.courseService.courses.push(coursename);
    localStorage.setItem("newCourses", JSON.stringify(this.courseService.courses));
  }
  sortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  displayedColumns: string[] = ['courseCode', 'subjectCode', 'level', 'progression', 'courseName', 'points', 'institutionCode', 'subject', 'syllabus', 'add'];

  dataSource!: MatTableDataSource<Course>;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private courseService: CoursesService, private _liveAnnouncer: LiveAnnouncer) {
    this.dataSource = new MatTableDataSource();

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

    console.log(`filter ${filterValue}`)
  }
}
