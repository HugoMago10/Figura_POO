//**************************Clase Parent Figura***********************************************************/
class Figura{
    constructor ( x, y, color ){
        this.punto = {
            x, y
        };
        this.color = color;
        this.canva = document.getElementById("myCanvas");
        this.ctx = this.canva.getContext("2d");
        this.ctx.clearRect( 0, 0, this.canva.width, this.canva.height );
    }

    getPosition (){
        return 'Eje x: '+this.punto.x+" Eje y: "+this.punto.y;
    }
    
    /*metodos que se comportan de manera diferente*/
    area (){} 
    perimetro(){}
    nombre(){}
    dibuja (){ }
}

//**************************Clase Rectangulo***********************************************************/
 class Rectangulo extends Figura{
    constructor ( x, y, ancho, altura, color ){
        super ( x, y, color );
        this.ancho = ancho;
        this.altura = altura;
    }

    set medidas ( lado ){
        const lados = lado.split(' ');
        this.ancho = lados[0];
        this.altura = lados[1];
    }

    getAncho (){ return this.ancho; }
    getAlto (){ return this.altura; }

    perimetro (){ return 2*this.ancho + 2*this.altura; }
    area (){ return this.ancho * this.altura; }
    nombre(){ return "Rectangulo"; }
    dibuja (){
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect( this.punto.x, this.punto.y, this.ancho, this.altura );
    }
}

//**************************Clase Cuadrado***********************************************************/
class Cuadrado extends Figura{
    constructor (x, y, lado, color){
        super (x, y, color );
        this.lado = lado;
    }

    setLado ( lado ){
        this.lado = lado;
    }

    getLado(){ return this.lado; }

    perimetro (){ return 4*this.lado; }
    area(){ return this.lado*this.lado; }
    nombre(){ return "Cuadrado"; }
    dibuja(){
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect( this.punto.x, this.punto.y, this.lado, this.lado );
    }
}

//**************************Clase Circulo***********************************************************/
class Circulo extends Figura{
    constructor ( x, y, radio, color ){
        super  (x, y, color );
        this.radio = radio;
    }

    setRadio (radio){ this.radio = radio; }
    getRadio(){ return this.radio; }

    perimetro (){ return 2*Math.PI*this.radio; }
    area (){ return Math.PI*( Math.pow(this.radio, 2) ); }
    nombre (){ return "Circulo"; }
    dibuja(){
        this.ctx.fillStyle = this.color;
        this.ctx.arc ( this.punto.x, this.punto.y, this.radio, 0, 2*Math.PI );
        this.ctx.fill();
    }
}

//**************************Clase Triangulo***********************************************************/
class Triangulo extends Figura{
    constructor (x, y, base, altura, color){
        super ( x, y, color );
        this.base = base;
        this.altura = altura;
    }

    setBase ( base ){ this.base = base; }
    getBase (){ return this.base; }
    setAltura ( altura ){ this.altura = altura; }
    getAltura (){ return this.altura; }

    perimetro (){ return 3*this.base; }
    area (){ return this.base*this.altura; }
    nombre (){ return "Triangulo"; }
    dibuja(){
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo ( this.punto.x, this.punto.y );
        this.ctx.lineTo (this.punto.x - (this.base/2), this.punto.y+ this.altura );
        this.ctx.lineTo (this.punto.x + (this.base/2), this.punto.y + this.altura );
        this.ctx.closePath();
        this.ctx.fill();
    }
}

//**************************Clase Rombo***********************************************************/
class Rombo extends Figura{
    constructor ( x, y, lado, diaMayor, diaMenor, color){
        super ( x, y, color );
        this.diaMayor = diaMayor;
        this.diaMenor = diaMenor;
        this.lado = lado;
    }

    setMayor (diaMayor){ this.diaMayor = diaMayor; }
    getMayor (){ return this.diaMayor; }
    setMenor (diaMenor){ this.diaMenor = diaMenor; }
    getMenor (){ return this.diaMenor; }
    setLado ( lado ){ this.lado; }
    getLado (){ return this.lado; }

    perimetro(){ return this.lado * 4; }
    area(){ return ( this.diaMayor * this.diaMenor )/2; }
    nombre (){ return "Rombo"; }
    dibuja (){
        this.ctx.fillStyle = this.color;
        this.ctx.moveTo( this.punto.x, this.punto.y );
        this.ctx.lineTo ( this.punto.x + this.diaMenor, this.punto.y+ this.diaMayor/2 );
        this.ctx.lineTo ( this.punto.x, this.punto.y + this.diaMayor );
        this.ctx.lineTo ( this.punto.x - this.diaMenor, this.punto.y + this.diaMayor/2 );
        this.ctx.closePath();
        this.ctx.fill();
    }
}

class PoligonoRegular extends Figura{
    constructor ( x, y, radio, numLados, lado, apotema, color ){
        super ( x, y, color );
        this.radio = radio;
        this.numLados = numLados;
        this.lado = lado;
        this.apotema = apotema;
    }

    perimetro(){ return this.lado * this.numLados; }
    area(){ return ( this.numLados * this.lado * this.apotema ) / 2; }
    nombre (){ 
        nombres = ["Triángulo","Cuadrilátero","Pentágono","Hexágono","Héptagono","Octagono","Enéagono",
                "Decágono","Endecágono","Dodecágono","Tridecágono","Pentadecágono","Hexadecágono"];
        return this.nombre[ this.numLados ];
     }

    dibuja(){
        this.ctx.fillStyle = this.color;
        var rad = ( 2*Math.PI / this.numLados );//Angulo de 60 grados
        
        this.ctx.beginPath();
		for( var i = 0; i < this.numLados; i++ ){
		    var x = this.punto.x + this.radio * Math.cos( rad*i );
            var y = this.punto.y + this.radio * Math.sin( rad*i );
            this.ctx.lineTo( x, y );
        }
        this.ctx.closePath();
        this.ctx.fill();
    }
    
}

/* 
class Pentagono extends PoligonoRegular{
    constructor ( x, y,radio, lado, apotema, color){
        super ( x, y, radio, 5 ,color );
        this.lado = lado;
        this.apotema = apotema;
    }

    setLado (lado){ this.lado = lado; }
    getLado (){ return this.lado; }
    setApotema (apotema){ this.apotema = apotema; }
    getApotema(){ return this.apotema; }

    perimetro(){ return 5*this.lado; }
    area(){ return ( 5*this.lado*this.apotema )/2; }
    nombre(){ return "Pentagono"; }

}


class Hexagono extends PoligonoRegular{
    constructor ( x, y, color, lado, apotema ){
        super ( x, y, color );
        this.lado = lado;
        this.apotema = apotema;
    }

    setLado (lado){ this.lado = lado; }
    getLado (){ return this.lado; }
    setApotema (apotema){ this.apotema = apotema; }
    getApotema(){ return this.apotema; }

    perimetro(){ return 6*this.lado; }
    area(){ return 3*this.lado*this.apotema; }
    nombre(){ return "Hexagono"; }
} */

figura = new Circulo ( 100, 100, 60, "#ff9999" );
figura.dibuja();
figura = new Cuadrado( 120, 40, 120, "#aaa333");
figura.dibuja();
figura = new Rectangulo ( 60, 30, 150, 100,"#108EFF"); 
figura.dibuja();
figura = new Triangulo (160, 20, 100, 140, "#c2c1f1");
figura.dibuja();
figura = new Rombo (150, 20, 20, 120, 50, "#ddd231");
figura.dibuja(); */
figura = new PoligonoRegular (100, 100, 90, 7, 30, 20,"#ff3daa");
figura.dibuja();
/* figura = new Hexagono(100, 100, 60, 30, "#ff3daa");
figura.dibuja();

 
    //Uso de Polimorfismo
const figuras = [ new Rectangulo ( 30, 40, 23,50,"#fff222"), new Circulo(20,30, 32, "#fff111"),
    new Cuadrado(30,40, 50, "#aaa333") ];
figuras.forEach( ( figura )=>
    figura.dibuja()
)