import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Candidate} from "../../../model/candidate";
import {DataService} from "../../services/data.service";
import {MatSort} from "@angular/material/sort";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent {

  displayedColumns: string[] = ['other','name', 'email', 'position','experienceYears', 'skills'];
  dataSource = new MatTableDataSource<Candidate>();
  candidates: Candidate[] | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataService: DataService, private dialog: MatDialog, private snackBar: MatSnackBar) { }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.refreshTable();
  }
  refreshTable() {
    this.dataService.getCandidates().subscribe(candidate => {
      this.candidates = candidate;
      this.dataSource = new MatTableDataSource<Candidate>(candidate);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  confirmDelete(candidate: Candidate): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: 'Voulez-vous vraiment supprimer ce candidat ?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCandidate(candidate);
      }
    });
  }

  deleteCandidate(candidate: Candidate) {
    this.dataService.deleteCandidate(candidate.id).subscribe(
      () => {
        this.refreshTable();
        this.snackBar.open('Le candidat a été supprimé.', 'Fermer', {
          duration: 3000,
        });
      },
      error => {
        console.error('Erreur lors de la suppression du candidat:', error);
      }
    );
  }
  editCandidate(candidate: Candidate): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: candidate,
    });

    dialogRef.afterClosed().subscribe(updatedCandidate => {
      if (updatedCandidate) {
        this.updateCandidate(updatedCandidate);
      }
    });
  }
  updateCandidate(updatedCandidate: Candidate) {
    this.dataService.updateCandidate(updatedCandidate).subscribe(
      () => {
        this.refreshTable();
        this.snackBar.open('Candidat mis à jour avec succès.', 'Fermer', {
          duration: 3000,
        });
      },
      error => {
        console.error('Erreur lors de la mise à jour du candidat:', error);
        this.snackBar.open('Une erreur est survenue lors de la mise à jour du candidat.', 'Fermer', {
          duration: 3000,
        });
      }
    );

}}
