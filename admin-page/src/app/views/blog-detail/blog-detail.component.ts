import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "./../../containers/services/auth/auth.service";
import { BlogService } from "./../../containers/services/blog.service";
import { SUCCESS_STATUS } from "./../../containers/constants/config";
import { CommentService } from "./../../containers/services/comment.service";

@Component({
  selector: "app-blog-detail",
  templateUrl: "./blog-detail.component.html",
  styleUrls: ["./blog-detail.component.css"],
})
export class BlogDetailComponent implements OnInit {
  blogId: number = 0;
  blogDetail: any = {};
  currentUser: any = {};
  comment: any = {
    content: "",
    customerId: 0,
    image: "",
    blogId: 0,
  };

  constructor(
    private commentService: CommentService,
    private blogService: BlogService,
    private actRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.blogId = parseInt(this.actRoute.snapshot.params.blogId);
  }

  ngOnInit(): void {
    this.blogService.getBlogDetail(this.blogId).then((res) => {
      if (res["status"] == SUCCESS_STATUS) {
        this.blogDetail = res["data"];
      }
    });
    this.currentUser = this.authService.getLocal();
  }

  saveComment = () => {
    let comment = {
      content: this.comment.content,
      customerId: 0,
      image: "",
      userId: this.currentUser.id,
      blogId: this.blogId,
    };
    if (comment.content) {
      this.commentService.save(comment).then((res) => {
        if (res["status"] == SUCCESS_STATUS) {
          this.blogDetail.comments.push(res["data"]);
          this.comment = {
            content: "",
            customerId: 0,
            image: "",
            blogId: 0,
          };
        }
      });
    }
  };
}
