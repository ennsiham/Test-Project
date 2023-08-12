import { Component, OnInit, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import {DataService} from "../../services/data.service";
import {Candidate} from "../../../model/candidate";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  candidatesData!: Candidate[] ;
  positionsData: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getCandidat()

  }
  ngAfterViewInit(): void {
    this.dataService.getCandidates().subscribe(data => {
      this.candidatesData = data;
      this.calculatePositionsData();
      this.createStackedBarChart();
      this.createPieChart(this.calculateExperienceDistribution());
      this.createSkillsBarChart(this.calculateSkillsDistribution());
    });
  }
  getCandidat(){
    this.dataService.getCandidates().subscribe(data => {
      this.candidatesData = data;
      this.calculatePositionsData();
    });
  }
  calculatePositionsData(): void {
    this.positionsData = [];
    this.candidatesData.forEach((candidate) => {
      const positionIndex = this.positionsData.findIndex(item => item.position === candidate.position);
      if (positionIndex !== -1) {
        this.positionsData[positionIndex].count++;
      } else {
        this.positionsData.push({ position: candidate.position, count: 1 });
      }
    });
    this.createStackedBarChart();
  }
  calculateExperienceDistribution(): any[] {
    const experienceDistribution : { [key: string]: number } = {
      '0-2 ans': 0,
      '2-5 ans': 0,
      'plus de 5 ans': 0
    };

    this.candidatesData.forEach(candidate => {
      if (candidate.experienceYears >= 0 && candidate.experienceYears <= 2) {
        experienceDistribution['0-2 ans']++;
      } else if (candidate.experienceYears > 2 && candidate.experienceYears <= 5) {
        experienceDistribution['2-5 ans']++;
      } else {
        experienceDistribution['plus de 5 ans']++;
      }
    });

    return Object.keys(experienceDistribution).map(key => ({ label: key, value: experienceDistribution[key] }));
  }
  calculateSkillsDistribution(): any[] {
    const skillsDistribution: { [key: string]: number } = {};

    this.candidatesData.forEach(candidate => {
      candidate.skills.forEach(skill => {
        skillsDistribution[skill] = (skillsDistribution[skill] || 0) + 1;
      });
    });

    return Object.keys(skillsDistribution).map(key => ({ label: key, value: skillsDistribution[key] }));
  }

  createStackedBarChart(): void {
    const ctx = document.getElementById('stackedBarChart') as HTMLCanvasElement;

    const labels = this.positionsData.map(item => item.position);
    const data = this.positionsData.map(item => item.count);
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Nombre de Candidats',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  createPieChart(data: any[]): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;

    const labels = data.map(item => item.label);
    const values = data.map(item => item.value);
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(75, 192, 192, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }
        ]
      }
    });
  }

  createSkillsBarChart(data: any[]): void {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;

    const labels = data.map(item => item.label);
    const values = data.map(item => item.value);
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();

    }
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Skills',
              data: values,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            x: {
              beginAtZero: true
            }
          }
        }
      });
    }

}
