import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'edit-inplace-text',
  templateUrl: './edit-inplace-text.component.html',
  styleUrls: ['./edit-inplace-text.component.css']
})
export class EditInplaceTextComponent implements OnInit {
  editing = false;

  @Input() text = '';
  @Output() save: EventEmitter<string> = new EventEmitter<string>();
  private originalText: string;

  constructor() { }

  ngOnInit() {
  }

  edit() {
    this.editing = true;
    this.originalText = this.text;
  }

  cancel() {
    this.editing = false;
    this.text = this.originalText;
  }

  doSave() {
    this.editing = false;
    this.save.emit(this.text);
  }
}
