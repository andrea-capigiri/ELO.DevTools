import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  tools = [
    {
      title: 'Base64 Encoder/Decoder',
      description: 'Codifica e decodifica stringhe in Base64',
      icon: 'code',
      route: '/tools/base64'
    },
    {
      title: 'URL Encoder/Decoder',
      description: 'Codifica e decodifica URL parameters',
      icon: 'link',
      route: '/tools/url'
    },
    {
      title: 'GUID Generator',
      description: 'Genera GUID univoci',
      icon: 'fingerprint',
      route: '/tools/guid'
    },
    {
      title: 'JSON Formatter',
      description: 'Formatta e valida JSON',
      icon: 'data_object',
      route: '/tools/json'
    },
    {
      title: 'Hash Generator',
      description: 'Genera hash MD5, SHA1, SHA256',
      icon: 'security',
      route: '/tools/hash'
    },
    {
      title: 'Timestamp Converter',
      description: 'Converte timestamp in date e viceversa',
      icon: 'schedule',
      route: '/tools/timestamp'
    }
  ];
}