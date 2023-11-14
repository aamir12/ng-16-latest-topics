import { Component, OnInit, inject } from '@angular/core';
import { ConfigService } from './core/modules/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'newTopics';
  configService = inject(ConfigService);

  ngOnInit() {
    console.log(this.configService.api);
  }
}
