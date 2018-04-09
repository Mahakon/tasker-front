import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-button-menu-component',
    templateUrl: './button-menu.component.html',
    styleUrls: ['./button-menu.component.less']
})

export class ButtonMenuComponent implements OnInit {
    @Input() data: any;
    constructor(

      ) {}
      ngOnInit() {
    }
}
