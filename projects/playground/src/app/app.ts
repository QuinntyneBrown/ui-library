import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from 'components';

@Component({
  selector: 'q-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('playground');
}
