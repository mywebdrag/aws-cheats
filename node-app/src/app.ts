import express from 'express';
import bodyParser from 'body-parser';

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers) {
        this.app = express();

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }

    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
        this.app.use('/', express.static('dist'))
    }

    public listen() {
        const port = process.env.PORT || 3001;
        this.app.listen(port, () => {
            console.log('Server started ->', port);
        });
    }
}

export default App;