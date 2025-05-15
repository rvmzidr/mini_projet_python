import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, ChartModule, TableModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  studentsData: any;
  coursesData: any;
  departmentDistribution: any;
  courseEnrollments: any;
  recentActivity: any[] = [];

  constructor() {}

  ngOnInit() {
    // Chart configurations would typically come from a service
    this.studentsData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'New Student Registrations',
          data: [12, 19, 15, 27, 32, 24],
          fill: true,
          borderColor: '#4B5563',
          tension: 0.4,
          backgroundColor: 'rgba(75, 85, 99, 0.2)'
        }
      ]
    };

    this.coursesData = {
      labels: ['CS', 'Math', 'Business', 'Engineering', 'Arts'],
      datasets: [
        {
          label: 'Course Distribution',
          data: [24, 16, 18, 14, 10],
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
          ],
          hoverBackgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
          ]
        }
      ]
    };

    this.departmentDistribution = {
      labels: ['Computer Science', 'Mathematics', 'Business', 'Engineering', 'Arts'],
      datasets: [
        {
          data: [35, 15, 25, 15, 10],
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
          ],
          hoverBackgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
          ]
        }
      ]
    };

    this.courseEnrollments = {
      labels: ['Introduction to CS', 'Web Development', 'Business Analytics', 'Calculus', 'Art History'],
      datasets: [
        {
          label: 'Student Enrollments',
          data: [65, 59, 80, 81, 56],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 1
        }
      ]
    };

    // Mock data for recent activity
    this.recentActivity = [
      { id: 1, action: 'Student enrolled', details: 'John Doe enrolled in Web Development', time: '10 minutes ago' },
      { id: 2, action: 'Course updated', details: 'Introduction to CS syllabus updated', time: '1 hour ago' },
      { id: 3, action: 'Department added', details: 'New department: Data Science', time: '3 hours ago' },
      { id: 4, action: 'Student registered', details: 'New student: Jane Smith', time: '5 hours ago' },
      { id: 5, action: 'Course created', details: 'New course: Machine Learning Fundamentals', time: '1 day ago' }
    ];
  }
}