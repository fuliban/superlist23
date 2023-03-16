import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ConfigUIService } from './config-ui.service';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
	configUI:  ConfigUIService;

  constructor(
    configUI: ConfigUIService
  ) { 
    this.configUI=configUI;
  }

	translate(stTextCode: string):string {				
		switch (stTextCode) {
			case "ADDMOREFAV":
				switch (this.configUI.stLanguage) {
					case "ES":
						return "(añadir más productos favoritos a la sección)";											
					default:
						return "(add more favourite products to this section)";														
        }     

      case "ADDPROD":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "Producto añadido a la lista";											
          default:
            return "Added to the list";														
        }	
                
      case "ADDSEC":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "Sección creada";											
          default:
            return "Section added";														
        }

      case "ALL":
      switch (this.configUI.stLanguage) {
          case "ES":
              return "Todos";											
          default:
              return "All";														
      }

      case "adminsec":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "Administrar Secciones";											
          default:
            return "Admin Sections";														
        }		

      case "BUY":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "COMPRAR";											
          default:
            return "BUY";														
        }

      case "COMPLETED":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "COMPLETADOS";											
          default:
            return "COMPLETED";														
        }

      case "CREPROD":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "Producto creado";											
          default:
            return "Product added";														
        }    

      case "DESCRIPTION":
        switch (this.configUI.stLanguage) {
            case "ES":
                return "Descripción";											
            default:
                return "Description";														
        }

      case "EDITPROD":
        switch (this.configUI.stLanguage) {
            case "ES":
                return "Editar producto";											
            default:
                return "Edit Prod";														
        }

      case "EMPADDCL":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "(vacío) Pulse en un producto para añadirlo"
          default:
            return "(empty) add products by clicking"
        }
        
      case "FAVOURITE":
        switch (this.configUI.stLanguage) {
            case "ES":
                return "Favorito";											
            default:
                return "Favourite";														
        }

      case "FAVOURITES":
        switch (this.configUI.stLanguage) {
            case "ES":
                return "Favoritos";											
            default:
                return "Favourites";														
        }

          case "FINDPROD":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "Buscar un producto";											
          default:
            return "Search product";														
        }

      case "GOBACK":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "Volver";											
          default:
            return "Go Back";														
        }

      case "HOME":
        switch (this.configUI.stLanguage) {
            case "ES":
                return "Menú principal";											
            default:
                return "Home";														
      } 

      case "IMAGEURL":
          switch (this.configUI.stLanguage) {
              case "ES":
                  return "URL Imagen";											
              default:
                  return "Image URL";														
        }

      case "LOADINGPROD":
      switch (this.configUI.stLanguage) {
        case "ES":
          return "Cargando lista de productos";         
      
        default:
          return "Loading Products";
      }

      case "LOGINGOO":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "Iniciar sesión con Google";         
        
          default:
            return "Login with Google";
        }

      case "LANGUA":
        switch (this.configUI.stLanguage) {
            case "ES":
                return "Idioma";											
            default:
                return "Language";														
        }

      case "LOGINFOR":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "Inicie sesión para poder añadir productos";
          default:
            return "Login to add products";        
        }

      case "LOGOUT":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "Cerrar sesión";
          default:
            return "Logout";        
        }
        
      case "LIST":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "LISTA";											
          default:
            return "LIST";														
        }

      case "MARKFAV":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "Marcar como favorito";											
          default:
            return "Mark as favourite";														
        }								

        case "MARKNOFAV":
          switch (this.configUI.stLanguage) {
            case "ES":
              return "Marcar como no favorito";											
            default:
              return "Mark as not favourite";														
          }								
  
        case "MOREPRODUCTS":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "Más Productos";											
          default:
            return "More Products";														
        }								

      case "NEWPRODUCT":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "Crear Producto";											
          default:
            return "New Product";														
        }
          
      case "NEWSECTION":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "CREAR SECCIÓN";											
          default:
            return "NEW SECTION";														
        }		

      case "NOFAV":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "No hay favoritos";											
          default:
            return "No favourites";														
        }		

      case "NOMOREPROD":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "No hay más productos";											
          default:
            return "No more products";														
        }						
          
      case "ONLYFAV":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "Solo Favoritos";											
          default:
            return "Only Fav";														
        }						

      case "ORDERSEC":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "ORDENAR SECCIONES";											
          default:
            return "ORDER SECTIONS";														
        }	

      case "PROWOUTC":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "¡¡Producto sin código!!";											
          default:
            return "Product without code!!!";														
        }	

      case "RECENPURC":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "COMPRADOS RECIENTEMENTE";											
          default:
            return "RECENTLY COMPLETED";														
        }

      case "REMOVLIST":
        switch (this.configUI.stLanguage) {
          case "ES":
            return "Quitar de la lista";											
          default:
            return "Remove from list";														
        }

      case "SAVE":
				switch (this.configUI.stLanguage) {
					case "ES":
						return "Grabar";											
					default:
						return "Save";														
				}

      case "SECTION":
        switch (this.configUI.stLanguage) {
            case "ES":
                return "Sección";											
            default:
                return "Section";														
        }      
			
      case "SECNONAME":
        switch (this.configUI.stLanguage) {
            case "ES":
                return "¡Sección sin nombre!";											
            default:
                return "Section without name!!!";														
        }	

      case "SECEXISTS":
        switch (this.configUI.stLanguage) {
            case "ES":
                return "¡Ya existe esta sección!";											
            default:
                return "Section exists!!!";														
        }

      case "UNITS":
        switch (this.configUI.stLanguage) {
          case "ES":
              return "Uds.";											
          default:
              return "Units";														
      }

      case "UPDPROD":
        switch (this.configUI.stLanguage) {
            case "ES":
                return "Producto actualizado";											
            default:
                return "Product Updated";														
        }

      case "UPDSEC":
        switch (this.configUI.stLanguage) {
            case "ES":
                return "Sección actualizada";											
            default:
                return "Section Updated";														
        }				
                  
                                          
			default:
				return stTextCode;
		}		
	}

}
