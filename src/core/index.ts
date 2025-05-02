import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, DirectionalLight } from 'three';
import { Spaceship } from './spaceship';
import { InputController } from './input.controller';
import { StartFile } from './startfile';
import { CameraController } from './camera.controller';
// const canvas = document.getElementById('canvas') as HTMLCanvasElement;

export class App {
    private declare static instance: App; // * instance: instancia de la clase App 

    private readonly canvas = document.getElementById('canvas') as HTMLCanvasElement;
    private readonly scene = new Scene();
    private readonly renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true }); // * antialias: suaviza los bordes de los objetos
    private readonly perspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // * fov: frustum es la distorsion de la camara | * aspect: ratio de la camara (Responsive) | * near: distancia minima de la camara | * far: distancia maxima de la camara
    private readonly inputController = new InputController();
    private readonly spaceShip = new Spaceship(this.scene, this.inputController, 0.2);
    private readonly cameraController = new CameraController(this.perspectiveCamera, this.spaceShip);
  
    private constructor() {
      // console.log('Hola desde Main.ts');
      this.animate();
      this.createLights();
      this.config();
      this.createInstence();
      window.addEventListener('resize', this.onRize.bind(this));
    }

    public static start(): void {
      if (App.instance) 
        return;
      console.log('Hola desde App Start')
      App.instance = new App();
    }


    private createInstence() : void {
        this.spaceShip.loadModel();
        new StartFile(this.scene)
    }
  
    private animate() : void {
        this.renderer.render(this.scene, this.perspectiveCamera);
        this.spaceShip.updated();
        this.cameraController.update();
        requestAnimationFrame(this.animate.bind(this)); // * bind: para que se mantenga el contexto de la clase App y no de la funcion animate
        // * Es decir, presatmos el metodo de la clase a requestAnimationFrame para que se mantenga el contexto de la clase y no de la funcion animate
        // console.log('Hola desde loop');
        // * requestAnimationFrame: Metodo que se ejecuta por fuera y ejecutamos el metodo dentro de la clase.
    }
  
    private createLights() : void {
        // ? ILUMINACION
        const ambienteLight = new AmbientLight(0x57473a, 2); // * color: color de la luz | * intensidad: intensidad de la luz
        this.scene.add(ambienteLight);
    
        const directionalLight = new DirectionalLight(0xffffff, 2); // * color: color de la luz | * intensidad: intensidad de la luz
        this.scene.add(directionalLight);
    }
  
    private config() : void {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // ? Ubicacion de la camara:
        this.perspectiveCamera.position.set(0, 8, -10);
        this.perspectiveCamera.lookAt(0, 0,  0); // * lookAt: punto hacia donde mira la camara
    }

    private onRize() : void {
        this.renderer.setSize(window.innerWidth, window.innerHeight); // * Para ajuete de pantallas de manera responsiva
        this.perspectiveCamera.updateProjectionMatrix();
    }
  }