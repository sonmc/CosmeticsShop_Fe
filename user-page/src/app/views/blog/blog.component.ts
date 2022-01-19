import { SUCCESS_STATUS } from './../../containers/constants/config';
import { BlogService } from './../../containers/services/blog.service';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/containers/services/localStorage/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blogs: any = [];
  content: string = ''; 
  searchObj: any = { key: '', value: '' };
  constructor(
    private blogService: BlogService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.searchObj = this.localStorageService.get('search') || {
      key: '',
      value: '',
    };
  }

  ngOnInit(): void {
    this.blogService.get(this.searchObj.value).subscribe((res: any) => {
      if (SUCCESS_STATUS == res['status']) {
        this.blogs = res['data'];
        this.blogs = this.blogs.map((blog: any) => {
          blog['date'] = blog.createdDate.split(' ')[0];
          blog.isShowComment = false;
          blog['time'] =
            blog.createdDate.split(' ')[1] +
            ' ' +
            blog.createdDate.split(' ')[2];
          return blog;
        });

        console.log(this.blogs);
      }
    });
  }

  closeComment = (blogId: number) => {
    this.blogs = this.blogs.map((blog: any) => {
      if (blogId == blog.id) {
        blog.isShowComment = false;
      }
      return blog;
    });
  };

  comment = (blogId: number) => {
    let currentUser = this.localStorageService.get('customer');
    if (currentUser) {
      let comment = {
        content: this.content,
        userId: currentUser.id,
        image: null,
        blogId: blogId,
      };
      this.blogService.addComment(comment).then((res: any) => {
        if (res['status'] == SUCCESS_STATUS) {
          this.blogs.forEach((element: any) => {
            if (element.id == comment.blogId) {
              element.comments.push(res['data']);
            }
          });
          this.content = '';
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  };
  getComment = (blogId: number) => {
    this.blogs = this.blogs.map((blog: any) => {
      if (blogId == blog.id) {
        blog.isShowComment = true;
      }
      return blog;
    });
  };
}
