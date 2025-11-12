import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { settings } from 'src/assets/appsettings';

@Component({
  selector: 'app-careers',
  imports: [CommonModule],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.css',
  standalone: true
})
export class CareersComponent {
  repositoryUrl = settings.REPOSITORY_URL;
  
  readonly collaborationCards = [
    { 
      icon: 'groups', 
      title: 'Community Driven', 
      description: 'Our platform is a living project, shaped entirely by the insights and goals of our users.' 
    },
    { 
      icon: 'code', 
      title: 'Open Source Spirit', 
      description: 'We thrive on transparency and collective effort. Our entire work is public and open for contribution.' 
    },
    { 
      icon: 'trending_up', 
      title: 'Make an Impact', 
      description: 'Your ideas can become features that benefit thousands of users. Every contribution matters.' 
    }
  ];

  readonly buildSteps = [
    {
      stepNumber: 1,
      icon: 'check_circle',
      title: 'Explore Our Blueprint',
      description: "Get familiar with our project structure, goals, and contribution guidelines. Find our public repository and see what we're working on."
    },
    {
      stepNumber: 2,
      icon: 'check_circle',
      title: 'Identify a Challenge',
      description: "Search for an existing issue or task that sparks your interest, from bug fixes to new features. Don't see what you're looking for? Propose a new one!"
    },
    {
      stepNumber: 3,
      icon: 'fork_right',
      title: 'Submit Your Solution',
      description: 'Fork the repository, create your magic, and submit a pull request. Share your improvements with the community for review and become a part of our story.'
    }
  ];
}
