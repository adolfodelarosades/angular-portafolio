import { Component, OnInit } from '@angular/core';
import { InfoPaginaService } from '../../services/info-pagina.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( public infoPagSer: InfoPaginaService,
               public router: Router ) { }

  ngOnInit() {
  }

  buscarProducto( cadenaBuscar: string ) {
    if (cadenaBuscar.length < 1 ) {
      return;
    }

    // Navega a search
    this.router.navigate(['/search', cadenaBuscar]);
  }

}
