import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MaterialModule } from 'src/app/core/modules/material.module';
import { UtilityService } from 'src/app/core/utility.service';
import { AutoFocDirective } from '../custom-directives/directives/autofoc.directive';
import { FormsModule } from '@angular/forms';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
  score:number
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  standalone:true,
  selector: 'app-edit-eable-mat-table',
  templateUrl: './edit-eable-mat-table.component.html',
  styleUrls: ['./edit-eable-mat-table.component.scss'],
  imports:[CommonModule,MaterialModule,FormsModule,CurrencyMaskModule,AutoFocDirective]
})
export class EditEableMatTableComponent{
  @ViewChild('table') table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['Actions','id', 'name', 'progress', 'fruit','score'];
  matTableList:any[] = [];
  dataSource!: MatTableDataSource<any>;
  utilityService = inject(UtilityService);
  isEditMode = false;
  showTable = true;
  columnsSchema = [
    {
      key: 'Actions',
      type: 'icons',
      label: 'Actions',
    },
    {
      key: 'id',
      type: 'number',
      label: 'ID',
      isEditAbleField:false
    },
    {
      key: 'name',
      type: 'text',
      label: 'Name',
      isEditAbleField:true
    },
    {
      key: 'progress',
      type: 'number',
      label: 'Progress',
      isEditAbleField:true
    },
    {
      key: 'fruit',
      type: 'text',
      label: 'Fruit',
      isEditAbleField:true
    },
    {
      key: 'score',
      type: 'number',
      label: 'Score',
      isEditAbleField:true
    },

  ]

  numberOfRow = '';
  constructor() {
    const users = Array.from({length: 15}, (_, k) => createNewUser(k + 1));
    setTimeout(() => {
      this.matTableList = users;
      this.updateTable();
    },1000)
  }

  

  updateTable() {
      this.dataSource = new MatTableDataSource(this.matTableList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  toggleMode() {
    this.isEditMode=!this.isEditMode;
    if(!this.isEditMode) {
      this.displayedColumns = this.displayedColumns.filter(col=> col !=='Actions');
    }else {
      const cols = [...new Set(['Actions',...this.displayedColumns])];
      this.displayedColumns = cols;
    }
  }

  addRow(numberOfAllocations:string) {
    const numberOfRow = +numberOfAllocations;
    if (numberOfRow <= 0) {
      return;
    }
    
    this.showTable = false;
    for (let j = 1; j <= numberOfRow; j++) {
      const record: any = this.getEmptyRecord();
      record.id = this.utilityService.generateUniqueId();
      this.matTableList = [record,...this.matTableList];
    }

    // this.dataSource.data = [...this.matTableList];
    this.updateTable();
    setTimeout(() => {
      this.showTable = true;
      this.paginator.firstPage();
    }, 500);
  }

  showTableData() {
    console.log(this.dataSource.data);
    console.log(this.matTableList);
  }

  getEmptyRecord() {
    return {
      id: '',
      name: '',
      progress: '',
      fruit: '',
      score:''
    }
  }

  onSave() {
    console.log(this.matTableList);
  }

  deleteRow(row:any) {
    if(row.id.startsWith('custom')) {

    }else {
      //delete from db
    }

  }

  removeAt(index: number,row:any) {
    // const deleteItem = confirm("Deseja excluir esse item?");
    // if (deleteItem) {
    //   this.matTableList = this.matTableList.filter(r => r.id !== row.id);
    //   const data = this.dataSource.data;
    //   data.splice(
    //     this.paginator.pageIndex * this.paginator.pageSize + index,
    //     1
    //   );
    //   this.dataSource.data = data;
    // }
    this.matTableList = this.matTableList.filter(r => r.id !== row.id);
    this.updateTable();
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
    score:Math.round(Math.random() * 100)
  };
}