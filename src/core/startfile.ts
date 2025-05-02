import { BufferGeometry, Float32BufferAttribute, Points, PointsMaterial, Scene } from "three";

export class StartFile {
    private declare startField: Points;

    constructor(private readonly scene: Scene, private readonly startOty: number = 20000, private readonly range: number = 1000) {
        this.createStartField();
    }

    private createStartField(): void {
        const positions = new Float32Array(this.startOty * 3); // * 3 -> x, y, z es decir,, las posiciones de cada particula del campo de estrellas

        for (let i = 0; i < this.startOty; i++) {
            positions[i * 3] = Math.random() * this.range - this.range / 2; // * x
            positions[i * 3 + 1] = Math.random() * this.range - this.range / 2; // * y
            positions[i * 3 + 2] = Math.random() * this.range - this.range / 2; // * z
        }
        const geometry = new BufferGeometry();
        geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));

        const material = new PointsMaterial({ 
            color: 0xCCCCCC,
            size: 1,
            transparent: true,
            opacity: .7,
            depthTest: true // * profundidad
        });

        this.startField = new Points(geometry, material);
        this.scene.add(this.startField);

    }
}