
import express, { Router } from 'express'
import path from 'path';

interface Options {
  port: number;
  routes: Router,
  public_path?: string;
}


export class Server {

  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {

    //* Middlewares
    this.app.use( express.json() ); // row
    this.app.use(express.urlencoded( {extended: true} ))// x-www-form-urlencoded

    //* Public folder
    this.app.use( express.static( this.publicPath ) );

    //* Routes
    this.app.use( this.routes )
    

    //* Cualquier ruta no definida pasara por aqui
    this.app.get('/{*splat}', (req, res) => {
        const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
        res.sendFile( indexPath );
    });

    //* Puerto en el cual se esta corriendo la app.
    this.app.listen( this.port , () => {
      console.log(`Server running on port ${this.port}`);
    });

  }

}