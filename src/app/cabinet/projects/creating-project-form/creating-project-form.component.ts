import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProjectService} from '../../../services/cabinet/projects/project.service';
import {UserService} from '../../../services/cabinet/user/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-creating-project-form',
  templateUrl: './creating-project-form.component.html',
  styleUrls: ['./styles/default-form.less']
})
export class CreatingProjectFormComponent implements OnInit {

  @Output() create: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();
  formVisibality = true;
  form: FormGroup;

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.createForm();
  }

  onSubmit() {
    this.formVisibality = false;
    const formEl = document.forms.namedItem('new-project-form');
    const data = new FormData(formEl);
    data.append('userId', this.userService.userId.toString());

    this.projectService.addProject(data).subscribe(
      id => {
        this.create.emit(id);
        this.formVisibality = false;
        },
      err => { console.log(err); }
    );
  }

  onClose() {
    this.close.emit(null);
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required]
    });
  }

}
