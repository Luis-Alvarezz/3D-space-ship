import { PerspectiveCamera, Vector3 } from "three";
import { Spaceship } from "./spaceship";

export class CameraController {
    private readonly offset: Vector3 = new Vector3(0, 4, -10); // * Vector3: vector de 3 dimensiones | * offset: distancia de la camara al modelo

    constructor(private readonly perpectiveCamera: PerspectiveCamera, private readonly SpaceShip: Spaceship) {

    }

    public update(): void {
        if (!this.SpaceShip.model) return;
        const rotateOffset = this.offset.clone().applyQuaternion(this.SpaceShip.model.quaternion); // * clone: copia del vector | * applyQuaternion: rotacion del vector
        const desiredPosition = this.SpaceShip.model.position.clone().add(rotateOffset);

        this.perpectiveCamera.position.lerp(desiredPosition, .02); // * lerp: interpolar entre dos puntos | * 0.02: velocidad de la camara
        this.perpectiveCamera.lookAt(this.SpaceShip.model.position);
    }
}