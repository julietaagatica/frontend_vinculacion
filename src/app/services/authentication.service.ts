import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Session} from 'src/app/models/session.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "src/app/models/user.model";

@Injectable({
  providedIn: "root"
})

export class AuthenticationService {

  host = "http://localhost:7031"

  constructor(
    private http: HttpClient,
  ) {}

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  getHost( query: string ){
    const url = this.host + `/${query}`;
    
    return this.http.get(url);
  }
  
  deleteHost(query: string) {
    const url = this.host + `/${query}`;

    return this.http.delete(url);
  }

  private basePath = '/api/authenticate/';

  loginNuevo(username: string, password: string): Observable<any> {
      const url_api = this.host+'/login';
      return this.http
        .post(
          url_api,
          { 
            "email": username, 
            "password": password 
          },
          { headers: this.headers }
        );
  }

  setUser(user: User): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
  }

  setToken(token): void {
    localStorage.setItem("accessToken", token);
  }

  getUserAfterLogin(usuarioNuevo: User,token: string): Session {
    let session = new Session();
    let userFromDatabase = new User();
    userFromDatabase.institucion_id = usuarioNuevo.institucion_id;
    userFromDatabase.email = usuarioNuevo.email;
    userFromDatabase.rol = usuarioNuevo.rol;
    userFromDatabase.nombre = usuarioNuevo.nombre;
    userFromDatabase.apellido = usuarioNuevo.apellido;
    userFromDatabase.id = token;
    session.user = userFromDatabase;
    session.token = token;
    return session;
  }


  logout(): Observable<Boolean>{
    let accessToken = localStorage.getItem("accessToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    return this.http.post<Boolean>(this.basePath + 'logout', {});
  }

  getUsuarios(){
    return this.getHost(`usuarios`);
  }

  getUsuario(id:string) {
    return this.getHost(`usuarios/${id}`);
  }

  postUsuario(user:any) {
    var url = this.host+"/registrar"
    return this.http.post<any>(url, user)
  }

  putUsuario(id:string,user:any){
    return this.http.
    put<any>(this.host+`/usuarios/${id}`, user)
  }

  deleteUsuario(id:string){
    return this.http.delete(this.host+`/usuarios/${id}`)
  }
}
