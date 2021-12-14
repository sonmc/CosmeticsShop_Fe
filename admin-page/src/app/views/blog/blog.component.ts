import { ModalDirective } from "ngx-bootstrap/modal";
import { BlogService } from "../../containers/services/blog.service";
import { Router } from "@angular/router";
import { SUCCESS_STATUS } from "./../../containers/constants/config";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
})
export class BlogComponent implements OnInit {
  @ViewChild("modalCreate") modalCreate: ModalDirective;
  blogs: any;
  type: string;
  blog: Object = {
    content: "",
    status: true,
    createdDate: "",
    userId: 0,
    Comments: [],
  };

  constructor(
    public blogService: BlogService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.blogService.get().subscribe(
      (res) => {
        this.toastr.success("Success", "");
        if (SUCCESS_STATUS == res["status"]) {
          this.blogs = res["data"];
        }
      },
      (err) => {
        window.alert("Connection Error !");
      }
    );
  }

  save = () => {
    this.blogService
      .save(this.blog, this.type)
      .then((res) => {
        if (res["status"] == SUCCESS_STATUS) {
          this.toastr.success("Success", "");
          if (this.type === "add") {
            this.blogs.push(res["data"]);
          } else {
            for (let index = 0; index < this.blogs.length; index++) {
              if (this.blogs[index].id == res["data"].id) {
                this.blogs[index] = res["data"];
              }
            }
          }
        }
      })
      .catch((e) => {
        window.alert("Connection Error !");
      });
    this.modalCreate.hide();
  };

  openModal = (blog, type) => {
    this.type = type;
    this.blog =
      type === "edit"
        ? { ...blog }
        : {
            content: "",
            status: true,
          };
    this.modalCreate.show();
  };

  remove = (id) => {
    this.blogService
      .remove(id)
      .then((res) => {
        if (res["status"] == SUCCESS_STATUS) {
          this.toastr.success("Success", "");
          for (let index = 0; index < this.blogs.length; index++) {
            if (this.blogs[index].id == id) {
              this.blogs.splice(index, 1);
            }
          }
        }
      })
      .catch((e) => {
        window.alert("Connection Error !");
      });
  };
}
