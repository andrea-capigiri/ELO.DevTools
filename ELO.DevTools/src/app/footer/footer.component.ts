import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
    public env: any = environment;
    public year: number = new Date().getFullYear();
}
