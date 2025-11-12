import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-landing-page',
    imports: [CommonModule],
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css'],
    standalone: true
})
export class LandingPageComponent implements OnInit {

  // Data for the Features Section
  features = [
    {
      icon: 'contact_support',
      title: 'Ask Experts',
      description: 'Post your questions and get reliable answers from verified experts in their fields.'
    },
    {
      icon: 'find_in_page',
      title: 'Find Solutions',
      description: 'Browse a vast library of existing questions and solutions to find what you need instantly.'
    },
    {
      icon: 'groups',
      title: 'Connect with Peers',
      description: 'Build your network by connecting with other users and experts in your areas of interest.'
    }
  ];

  // Data for the Testimonials Section
  testimonials = [
    {
      quote: "This platform is a game-changer. I received a detailed answer to my complex coding query within 30 minutes. Highly recommend it!",
      // Note: Use actual paths or Base64 data for production images
      avatar: "https://avatar.iran.liara.run/public/boy", 
      name: "Sarah L.",
      title: "Software Developer"
    },
    {
      quote: "As a student, getting quick help on difficult subjects is key. This community is knowledgeable and patient. It's my go-to resource for learning.",
      avatar: "https://avatar.iran.liara.run/public",
      name: "Michael P.",
      title: "University Student"
    },
    {
      quote: "I love browsing the different topics and learning new things everyday. It's not just for asking questions; it's a place for continuous learning.",
      avatar: "https://avatar.iran.liara.run/public/girl",
      name: "Emily C.",
      title: "Marketing Manager"
    }
  ];

  constructor() { }
  ngOnInit(): void { }
}