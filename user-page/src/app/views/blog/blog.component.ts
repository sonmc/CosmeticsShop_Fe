import { SUCCESS_STATUS } from './../../containers/constants/config';
import { BlogService } from './../../containers/services/blog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit {
  blogs: any = [];
  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.get().subscribe(
      (res) => {
        if (SUCCESS_STATUS == res['status']) {
          this.blogs = res['data'];
        }
      },
      (err) => {
        window.alert('Connection Error !');
      }
    );
  }
}
