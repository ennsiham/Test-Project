import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Candidate} from "../../model/candidate";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private candidateUrl = 'http://localhost:3000/candidates';

  constructor(private http: HttpClient) { }

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[] >(this.candidateUrl);
  }

  deleteCandidate(id: number): Observable<any> {
    return this.http.delete<any>(`${this.candidateUrl}/${id}`);
  }
  updateCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`${this.candidateUrl}/${candidate.id}`, candidate);
  }


}



