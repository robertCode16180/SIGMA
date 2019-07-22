import { Component, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { SigmaServerService } from '../../services/sigma-server.service';
import { Separador } from '../../interfaces/equipos';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { actionDialog } from '../../types/types-dialog';
import { HttpEvent, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {

  private destroySubject$ = new Subject<boolean>();

  displayedColumns: string[] = ['id', 'nombre', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<Separador>();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private serviceSigma: SigmaServerService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getDataEquipos();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  customSort($event: any) {
    console.log($event);
  }

  public getDataEquipos = (): void => {
    this.serviceSigma.getSeparadores()
                     .pipe(takeUntil(this.destroySubject$))
                     .subscribe((response: Separador[]) => this.dataSource.data = response,
                                 this.handleErrorResponse());
                }

  openDialog(action: actionDialog, obj: Separador) {

    obj.action = action;

    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '350px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      switch (result.event) {
        case 'Agregar':
          this.enviarData(result);
          break;
        case 'Editar':
          this.editarData(result);
          break;
        case 'Eliminar':
          this.eliminarData(result);
          break;
        default:
          break;
      }
    });
  }

  private enviarData(item: { event: actionDialog, data: Separador}) {
    this.serviceSigma.agregarSeparador(item.data)
                     .pipe(takeUntil(this.destroySubject$))
                     .subscribe( this.handleResponse(item.event),
                                 this.handleErrorResponse());
  }

  private editarData(item: { event: actionDialog, data: Separador}) {
    this.serviceSigma.editarSeparador(item.data)
                     .pipe(takeUntil(this.destroySubject$))
                     .subscribe( this.handleResponse(item.event),
                                 this.handleErrorResponse());
  }

  private eliminarData(item: { event: actionDialog, data: Separador}) {
    this.serviceSigma.eliminarSeparador(item.data)
                     .pipe(takeUntil(this.destroySubject$))
                     .subscribe( this.handleResponse(item.event),
                                 this.handleErrorResponse());
  }

  private handleResponse(event: actionDialog): (value: HttpEvent<any>) => void {
    return (response: HttpEvent<any>) => {
      console.log(response);
      if (response instanceof HttpResponse) {
        if (response['status'] === 200) {
          console.log(response['status']);
          this.handleNotificy(event);
          this.getDataEquipos();
        } else {
          alert('No se pudo procesar su solicitud');
        }
      }
    };
  }

  private handleNotificy(event: actionDialog) {
      switch (event) {
        case 'Agregar':
          alert('Separador Agregado exitosamente');
          break;
        case 'Editar':
        case 'Eliminar':
          alert('Cambios guardados');
          break;
        default:
          break;
      }
  }

  private handleErrorResponse(): (error: any) => void {
    return error => {
      alert('No se puede procesar su solicitud');
      console.log(error);
    };
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(true);
    this.destroySubject$.complete();
  }

}
