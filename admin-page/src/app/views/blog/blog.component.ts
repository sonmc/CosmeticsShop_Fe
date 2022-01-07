import { CommonService } from "./../../containers/services/common.service";
import { ModalDirective } from "ngx-bootstrap/modal";
import { BlogService } from "../../containers/services/blog.service";
import { Router } from "@angular/router";
import { SUCCESS_STATUS, URL_IMAGE } from "./../../containers/constants/config";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { LocalStorageService } from "../../containers/services/localStorage/local-storage.service";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
})
export class BlogComponent implements OnInit {
  @ViewChild("modalCreate") modalCreate: ModalDirective;
  uploadStatus: string = "";
  currentUser: any = {};
  blogs: any;
  type: string;
  messageError: string;
  blog: Object = {
    content: "",
    title: "",
    status: true,
    createdDate: "",
    userId: 0,
    comments: [],
    image: "",
  };

  constructor(
    public blogService: BlogService,
    public router: Router,
    private toastr: ToastrService,
    private commonService: CommonService,
    private storageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.storageService.get("user");
    this.blogService.get().subscribe(
      (res) => {
        if (SUCCESS_STATUS == res["status"]) {
          this.blogs = res["data"];
        }
      },
      (err) => {
        window.alert("Connection Error !");
      }
    );
  }
  changeField = () => {
    this.messageError = "";
  };
  save = () => {
    if (this.blog["content"] && this.blog["title"]) {
      this.blog["userId"] = this.currentUser.id;
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
    } else {
      this.messageError = "Vui lòng nhập đầy đủ tiêu đề và nội dung";
    }
  };

  openModal = (blog, type) => {
    this.messageError = "";
    this.type = type;
    this.blog =
      type === "edit"
        ? { ...blog }
        : {
            content: "",
            status: true,
          };
    this.uploadStatus = "";
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

  uploadFile = (event: Event) => {
    const element = event.currentTarget as HTMLInputElement;
    let file = element.files![0];
    if (file) {
      this.commonService
        .upload(file)
        .then((res: any) => {
          this.uploadStatus = res.message;
          this.blog["image"] = URL_IMAGE + res.data;
        })
        .catch((e) => {
          window.alert("Connection Error !");
        });
    }
  };

  blogDetail = (blogId) => {
    this.router.navigate(["/blog-detail", blogId]);
  };
}
