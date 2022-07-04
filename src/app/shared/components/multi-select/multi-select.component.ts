import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ItemData } from './multi-select-item-data/multi-select-item-data';
import { MultiSelectService } from './services/multi-select.service';
import { map, startWith } from "rxjs/operators";

@Component({
  selector: 'multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {
  @Output() selectionChange = new EventEmitter<{ data: Array<string> }>();
  @Input() placeholder: string = "";
  @Input() allowClear: boolean = false;
  @Input() data: Array<string> = [];
  @Input() key: string = "";
  @Input() disabled = false;
  @Input() addValue: Array<string> = [];
  @Input() Width:number  = 0;

  _placeholder: string = "";
  _allowClear: boolean = false;
  keyboard_arrow: string = "keyboard_arrow_down";
  selectControl = new FormControl();
  rawData: Array<ItemData> = [];
  selectData: Array<ItemData> = [];
  showSelectedData: Array<ItemData> = [];
  selectedDataOverflow: Array<ItemData> = [];
  filteredData!: Observable<Array<ItemData>>;
  filterString: string = "";
  width: number = 0;
  clientWidth: number = 0;
  constructor(
    private multiSelectService: MultiSelectService,
    private cdr: ChangeDetectorRef) {
    this.initializeFilter();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
    if (this.addValue.length > 0 && this.addValue[0] !== '') {
      if (this.data !== undefined && this.data.length > 0) {
        var addValue: string[] = [];
        for (let i = 0; i < this.addValue.length; i++) {
          var index = this.data.findIndex(value => this.addValue[i] !== undefined && value === this.addValue[i].trim());
          if (index === -1 && this.addValue[i] !== undefined) {
            addValue.push(this.addValue[i].trim());
            this.data.push(this.addValue[i].trim());
          }
        }
        addValue.forEach((item: string) => {
          this.rawData.push({ item, selected: false, width: 0 });
        });
        this.addValue = [];
        this.getScreenSize();
      }
    }
  }

  ngOnInit(): void {
    this.initializeFilter();
    this._placeholder = this.placeholder;
    if (this.allowClear !== undefined) {
      this._allowClear = true;
    } else {
      this._allowClear = false;
    }
    this.data.forEach((item: string) => {
      this.rawData.push({ item, selected: false, width: 0 });
    });
  }

  @HostListener("window:resize", ["$event"])
  getScreenSize() {
    var multiSelect = document.getElementById("multiSelect");
    if(multiSelect!==null){
      this.width = multiSelect.clientWidth;
      this.clientWidth = multiSelect.clientWidth;
    }    
    this.calculateWidthBySelected(this.selectData);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.data = changes.data.currentValue;
    }
    this.selectControl = new FormControl({
      value: "",
      disabled: this.disabled,
    });
    if (this.data !== undefined) {
      this.data.forEach((item: string) => {
        this.rawData.push({ item, selected: false, width: 0 });
      });
      this.getScreenSize();
    }
  }

  initializeFilter() {
    this.filteredData = this.selectControl.valueChanges.pipe(
      startWith<string>(""),
      map((value) => (typeof value === "string" ? value : this.filterString)),
      map((filter) => this.filter(filter))
    );
  }

  checked(value: ItemData) {
    var index = this.selectData.findIndex(
      (data) => data?.item?.toLowerCase() === value?.item?.toLowerCase()
    );
    return index !== -1 ? true : false;
  }

  cleanSelected() {
    this.selectData = [];
    this.showSelectedData = [];
    this.selectedDataOverflow = [];
    this.selectControl.setValue([]);
    this.initializeFilter();
    this.emitAdjustedData();
    for (let j = 0; j < this.rawData.length; j++) {
      this.rawData[j].selected = false;
    }
  }

  isAllSelected() {
    return (
      this.selectData.length === this.data.length && this.data.length !== 0
    );
  }

  hasSelected() {
    const length = this.selectData.length;
    this._placeholder = length > 0 ? "" : this.placeholder;
    return length;
  }

  selectAll(isAll: boolean) {
    this.selectData = [];
    if (isAll) {
      for (let i = 0; i < this.data.length; i++) {
        var data: ItemData = {
          item: "",
          selected: true,
          width: 0,
        };
        data.item = this.data[i];
        this.selectData.push(data);
        this.selectControl.setValue(this.selectData);
      }
      this.calculateWidthBySelected(this.selectData);
      for (let j = 0; j < this.rawData.length; j++) {
        this.rawData[j].selected = true;
      }
      this._placeholder = "";
    } else {
      this.showSelectedData = [];
      this.selectedDataOverflow = [];
      for (let j = 0; j < this.rawData.length; j++) {
        this.rawData[j].selected = false;
      }
      this._placeholder = this.placeholder;
    }
    this.emitAdjustedData();
  }

  filter = (filter: string): Array<ItemData> => {
    this.getScreenSize();
    this.filterString = filter;
    if (filter.length > 0) {
      var resul = this.rawData.filter((data) =>
        data.item.toLowerCase().includes(filter)
      );
      var filterOverflow = this.measureText(filter, 13);
      if (filterOverflow > 50) {
        var _filterOverflow = filterOverflow - 50;
        this.width = this.width - _filterOverflow;
        this.calculateWidthBySelected(this.selectData);
        if (this.clientWidth - filterOverflow <= 200) {
          this.selectControl.setValue([]);
          this.initializeFilter();
        }
      }
      return this.rawData.filter((option) => {
        return option.item.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      });
    } else {
      return this.rawData.filter(function (elem, index, self) {
        return index === self.findIndex(value => value.item === elem.item);
      });
    }
  };

  displayFn = (): string => "";

  optionClicked = (event: Event, data: ItemData): void => {
    event.stopPropagation();
    this.toggleSelection(data);
  };

  clicked = (event: Event): void => {
    event.stopPropagation();
    if (!this.isAllSelected()) {
      this.selectAll(true);
    } else {
      this.selectAll(false);
    }
  };

  toggleSelection = (data: ItemData): void => {
    data.selected = !data.selected;
    const index = this.selectData.findIndex(
      (itemData) => itemData.item.toLowerCase() === data.item.toLowerCase()
    );
    if (data.selected === true) {
      if (index === -1) {
        this.selectData.push(data);
        this.calculateWidthBySelected(this.selectData);
      }
    } else {
      if (index !== -1) {
        this.selectData.splice(index, 1);
        this.calculateWidthBySelected(this.selectData);
      }
      const ind = this.rawData.findIndex(
        (raw) => raw.item.toLowerCase() === data.item.toLowerCase()
      );
      if (ind !== -1) {
        this.rawData[ind].selected = false;
      }
    }
    this.selectControl.setValue(this.selectData);
    this.emitAdjustedData();
    this.initializeFilter();
  };

  calculateWidthBySelected(value: ItemData[]) {
    var selectedItems: ItemData[] = [];
    this.showSelectedData = [];
    this.selectedDataOverflow = [];
    var width = 0;
    for (let index = 0; index < value.length; index++) {
      var selectedItem: ItemData = {
        item: "",
        width: 0,
        selected: true,
      };
      selectedItem.item = value[index].item;
      selectedItem.width = this.measureText(value[index].item, 13);
      selectedItems.push(selectedItem);
    }
    selectedItems = selectedItems.sort(this.multiSelectService.sortByWidthAsc);
    for (let i = 0; i < selectedItems.length; i++) {
      width += selectedItems[i].width + 58;
      if (width <= this.width - 200) {
        this.showSelectedData.push(selectedItems[i]);
      } else {
        this.selectedDataOverflow.push(selectedItems[i]);
      }
    }
  }

  measureText(str: string, fontSize: number) {
    const widths = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0.2796875, 0.2765625, 0.3546875, 0.5546875,
      0.5546875, 0.8890625, 0.665625, 0.190625, 0.3328125, 0.3328125, 0.3890625,
      0.5828125, 0.2765625, 0.3328125, 0.2765625, 0.3015625, 0.5546875,
      0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875,
      0.5546875, 0.5546875, 0.5546875, 0.2765625, 0.2765625, 0.584375,
      0.5828125, 0.584375, 0.5546875, 1.0140625, 0.665625, 0.665625, 0.721875,
      0.721875, 0.665625, 0.609375, 0.7765625, 0.721875, 0.2765625, 0.5,
      0.665625, 0.5546875, 0.8328125, 0.721875, 0.7765625, 0.665625, 0.7765625,
      0.721875, 0.665625, 0.609375, 0.721875, 0.665625, 0.94375, 0.665625,
      0.665625, 0.609375, 0.2765625, 0.3546875, 0.2765625, 0.4765625, 0.5546875,
      0.3328125, 0.5546875, 0.5546875, 0.5, 0.5546875, 0.5546875, 0.2765625,
      0.5546875, 0.5546875, 0.221875, 0.240625, 0.5, 0.221875, 0.8328125,
      0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.3328125, 0.5, 0.2765625,
      0.5546875, 0.5, 0.721875, 0.5, 0.5, 0.5, 0.3546875, 0.259375, 0.353125,
      0.5890625,
    ];
    const avg = 0.5279276315789471;
    return Math.round(
      str
        .split("")
        .map((c) =>
          c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg
        )
        .reduce((cur, acc) => acc + cur) * fontSize
    );
  }

  emitAdjustedData = (): void => {
    const results: Array<string> = [];
    this.selectData.forEach((data: ItemData) => {
      results.push(data.item);
    });
    this.selectionChange.emit({ data: results });
  };

  removeSelected = (data: ItemData): void => {
    this.toggleSelection(data);
  };

  opened() {
    this.initializeFilter();
    this.keyboard_arrow = "keyboard_arrow_up";
  }

  closed() {
    this.keyboard_arrow = "keyboard_arrow_down";
    this.selectControl.setValue([]);
  }
}
