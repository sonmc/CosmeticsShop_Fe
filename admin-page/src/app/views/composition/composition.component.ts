import { CompositionService } from "./../../containers/services/composition.service";

import { ModalDirective } from "ngx-bootstrap/modal";
import { Router } from "@angular/router";
import { SUCCESS_STATUS } from "./../../containers/constants/config";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-composition",
  templateUrl: "./composition.component.html",
})
export class CompositionComponent implements OnInit {
  @ViewChild("modalCreate") modalCreate: ModalDirective;
  compositions: any;
  type: string;
  composition: Object = {
    name: "",
    part: "",
    uses: "",
    levelOfIrritation: "",
  };

  constructor(
    public compositionService: CompositionService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.compositionService.get().subscribe(
      (res) => {
        this.toastr.success("Success", "");
        if (SUCCESS_STATUS == res["status"]) {
          this.compositions = res["data"];
        }
      },
      (err) => {
        window.alert("Connection Error !");
      }
    );
  }

  save = () => {
    this.compositionService
      .save(this.composition, this.type)
      .then((res) => {
        if (res["status"] == SUCCESS_STATUS) {
          this.toastr.success("Success", "");
          if (this.type === "add") {
            this.compositions.push(res["data"]);
          } else {
            for (let index = 0; index < this.compositions.length; index++) {
              if (this.compositions[index].id == res["data"].id) {
                this.compositions[index] = res["data"];
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

  remove = (id) => {
    this.compositionService.remove(id).then((res) => {
      if (res["status"] == SUCCESS_STATUS) {
        this.toastr.success("Success", "");
        for (let index = 0; index < this.compositions.length; index++) {
          if (this.compositions[index].id == id) {
            this.compositions.splice(index, 1);
          }
        }
      }
    });
  };

  openModal = (composition, type) => {
    this.type = type;
    this.composition =
      type === "edit"
        ? { ...composition }
        : {
            name: "",
            description: "",
          };
    this.modalCreate.show();
  };
}
