import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule], // Import CommonModule for *ngFor, *ngIf, etc.
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  // Mock data for the sidebar conversation list
  conversations = [
    {
      name: 'Jane Smith',
      avatar: 'https://i.pravatar.cc/150?img=1', // Placeholder avatar
      lastMessage: 'Sure, I can help with that...',
      timestamp: '', // JS Date object would be better, but keeping it simple
      unreadCount: 2,
      active: true
    },
    {
      name: 'Alex Ray',
      avatar: 'https://i.pravatar.cc/150?img=3',
      lastMessage: 'Here is the link you...',
      timestamp: '10:42 AM',
      unreadCount: 0,
      active: false
    },
    {
      name: 'Support Team',
      avatar: 'https://i.pravatar.cc/150?img=5',
      lastMessage: 'Thanks for reaching...',
      timestamp: 'Yesterday',
      unreadCount: 0,
      active: false
    },
    {
      name: 'Emily Carter',
      avatar: 'https://i.pravatar.cc/150?img=7',
      lastMessage: 'That\'s a great question!',
      timestamp: 'Mon',
      unreadCount: 0,
      active: false
    }
  ];

  // Mock data for the active chat window
  activeChat = {
    name: 'Jane Smith',
    status: 'Online',
    avatar: 'https://i.pravatar.cc/150?img=1',
    messages: [
      {
        id: 1,
        sender: 'Jane Smith',
        avatar: 'https://i.pravatar.cc/150?img=1',
        text: 'Hi John! I saw you had a question about the latest API updates. How can I help?',
        timestamp: '11:58 AM',
        isMe: false
      },
      {
        id: 2,
        sender: 'John',
        avatar: '', // No avatar for "me"
        text: 'Hey Jane! Yes, I was wondering about the new authentication endpoints. Is the documentation available yet?',
        timestamp: '11:59 AM',
        isMe: true,
        read: true
      },
      {
        id: 3,
        sender: 'Jane Smith',
        avatar: 'https://i.pravatar.cc/150?img=1',
        text: 'Sure. I can help with that. The docs are live now. I\'ll send you the link.',
        timestamp: '12:00 PM',
        isMe: false
      }
    ]
  };

  // You would add methods here to select a chat, send a message, etc.
  selectConversation(conversation: any) {
    // Logic to set the active chat
    // For now, just reset the active status
    this.conversations.forEach(c => c.active = false);
    conversation.active = true;
    
    // In a real app, you'd fetch this chat's message history
    // and assign it to `activeChat`
    console.log('Selected:', conversation.name);
  }
}