import { Component, OnInit } from '@angular/core';
import components from '../../server/components.config';
import { ElementConfig } from './shared/shell.model';
import { ShellService } from './shared/shell.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private shellService: ShellService) {}

  ngOnInit() {
    const cmps: ElementConfig[] = components;
    const clients = {};
    for (const cmp of cmps) {
      clients[cmp.element] = this.newComponent(cmp);
    }

    this.shellService.init({
      initialRoute: '/dashboard',
      outletId: 'content',
      preload: true,
      clients
    });
  }

  private newComponent(cmp: ElementConfig): ElementConfig {
    const { element, route, fileName } = cmp;
    return {
      loaded: false,
      src: 'Http://localhost:3001/components/' + fileName,
      element,
      route,
      fileName
    };
  }
}
