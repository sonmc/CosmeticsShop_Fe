import { Component, OnInit } from '@angular/core';
import { SUCCESS_STATUS } from 'src/app/containers/constants/config';
import { CompositionService } from 'src/app/containers/services/composition.service';

@Component({
  selector: 'app-composition',
  templateUrl: './composition.component.html',
  styleUrls: ['./composition.component.css'],
})
export class CompositionComponent implements OnInit {
  name: string = '';
  composition: any = {
    name: '',
    level: '',
    part: '',
    uses: '',
  };
  constructor(private compositionService: CompositionService) {}

  ngOnInit(): void {}
  search = () => {
    this.compositionService.search(this.name).then((res: any) => {
      if (res.data && res.status === SUCCESS_STATUS) {
        this.composition = res['data'];
      }
    });
  };
}
