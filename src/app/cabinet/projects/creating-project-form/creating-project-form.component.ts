import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProjectService, Repositoty} from '../../../services/cabinet/projects/project.service';
import {UserService} from '../../../services/cabinet/user/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-creating-project-form',
  templateUrl: './creating-project-form.component.html',
  styleUrls: ['./styles/default-form.less']
})
export class CreatingProjectFormComponent implements OnInit {

  @Output() create: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();
  selectedRepository: Repositoty;
  allRepositories: Repositoty[];
  allBranches: string[];
  selectedBranch: string;
  formVisibality = true;
  isValidBit = true;
  bitMode = false;
  form: FormGroup;

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = this.createForm();
  }

  onSubmit() {
    this.formVisibality = false;
    const formEl = document.forms.namedItem('new-project-form');
    const data = new FormData(formEl);
    data.append('userId', this.userService.userId.toString());
    if (this.selectedRepository !== undefined) {
      data.append('acountname', this.selectedRepository.accountname);
      data.append('slug', this.selectedRepository.slug);
      data.append('branch', this.selectedBranch);
    }
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

  onBit() {
    this.formVisibality = !this.formVisibality;
    this.projectService.getRepositories(this.userService.userId)
      .subscribe(
        reps => {
          this.allRepositories = reps;
          this.bitMode = !this.bitMode;
          this.isValidBit = !this.isValidBit;
          this.formVisibality = !this.formVisibality;
        },
        err => {
          console.log(err);
          this.router.navigateByUrl('/cabinet/user');
        }
      );
  }

  onSelect() {
    console.log(this.selectedRepository);
    this.formVisibality = !this.formVisibality;
    this.projectService.getBranches(this.userService.userId, this.selectedRepository)
      .subscribe(
        branches => {
          this.allBranches = branches;
          this.formVisibality = !this.formVisibality;
        },
        err => {
          console.log(err);
        }
      );
  }

  onSelectBranch() {
    this.isValidBit = !this.isValidBit;
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required]
    });
  }

}
