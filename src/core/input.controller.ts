export class InputController {
    private keys: { [key: string]: boolean } = {};

    constructor() {
        this.listenToEvents();
        // alert('Hola desde InputController');
    }


    public isPressed(keyCode: string): boolean  {
        // console.log(this.keys[keyCode])
        return !!this.keys[keyCode];
    }

    private onKeyDown(event: KeyboardEvent): void {
        // console.log(event.code);
        this.keys[event.code] = true;
        // console.log(this.keys);
    }

    private onKeyUp(event: KeyboardEvent): void {
        // console.log(event.code);
        this.keys[event.code] = false;
    }

    private listenToEvents() : void {
        window.addEventListener('keydown', this.onKeyDown.bind(this)); // * bind(this) - porque el metodo se ejecuta dentro del OBJETO window y se lo prestamos
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }
}