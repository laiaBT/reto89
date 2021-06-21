namespace SpriteKind {
    export const Cabeza = SpriteKind.create()
    export const Cuerpo = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    Dirección = 90
})
function Cuerpo2 () {
    ImagenCuerpo = img`
        . 7 7 7 7 7 7 . 
        7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 
        . 7 7 7 7 7 7 . 
        `
    CuerpoLista = sprites.allOfKind(SpriteKind.Cuerpo)
    for (let index = 0; index <= 10; index++) {
        CrearSpriteCuerpo(Cabeza.x, Cabeza.y + (index + 1) * 8)
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    Dirección = 180
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    Dirección = 0
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    Dirección = 270
})
sprites.onOverlap(SpriteKind.Cabeza, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    Comida.setPosition(8 * randint(1, 19), 4 + 8 * randint(0, 14))
    Último = CuerpoLista[CuerpoLista.length - 1]
    Penúltimo = CuerpoLista[CuerpoLista.length - 2]
    DifX = Penúltimo.x - Último.x
    DifY = Penúltimo.y - Último.y
    CrearSpriteCuerpo(Último.x + DifX, Último.y + DifY)
})
sprites.onOverlap(SpriteKind.Cabeza, SpriteKind.Cuerpo, function (sprite, otherSprite) {
    game.over(false)
})
function CrearSpriteCuerpo (X: number, Y: number) {
    CuerpoSprite = sprites.create(ImagenCuerpo, SpriteKind.Cuerpo)
    CuerpoSprite.setPosition(X, Y)
    CuerpoLista.push(CuerpoSprite)
}
let CabezaPreviaY = 0
let CabezaPreviaX = 0
let CuerpoSprite: Sprite = null
let DifY = 0
let DifX = 0
let Penúltimo: Sprite = null
let Último: Sprite = null
let CuerpoLista: Sprite[] = []
let ImagenCuerpo: Image = null
let Comida: Sprite = null
let Dirección = 0
let Cabeza: Sprite = null
let ImagenCabeza = img`
    . 7 7 7 7 7 7 . 
    7 7 2 2 2 2 7 7 
    7 2 7 7 7 7 2 7 
    7 2 7 2 2 7 2 7 
    7 2 7 2 2 7 2 7 
    7 2 7 7 7 7 2 7 
    7 7 2 2 2 2 7 7 
    . 7 7 7 7 7 7 . 
    `
Cabeza = sprites.create(ImagenCabeza, SpriteKind.Cabeza)
Cabeza.setStayInScreen(true)
Cuerpo2()
Dirección = 90
Comida = sprites.create(img`
    . . 5 5 5 5 . . 
    . 5 5 5 5 5 5 . 
    5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 5 
    . 5 5 5 5 5 5 . 
    . . 5 5 5 5 . . 
    `, SpriteKind.Food)
Comida.setPosition(8 * randint(1, 19), 4 + 8 * randint(0, 14))
forever(function () {
    pause(100)
    CabezaPreviaX = Cabeza.x
    CabezaPreviaY = Cabeza.y
    CuerpoLista.insertAt(0, CuerpoLista.pop())
    CuerpoLista[0].setPosition(Cabeza.x, Cabeza.y)
    if (Dirección == 0) {
        Cabeza.setPosition(CabezaPreviaX + 8, CabezaPreviaY)
    }
    if (Dirección == 180) {
        Cabeza.setPosition(CabezaPreviaX - 8, CabezaPreviaY)
    }
    if (Dirección == 90) {
        Cabeza.setPosition(CabezaPreviaX, CabezaPreviaY - 8)
    }
    if (Dirección == 270) {
        Cabeza.setPosition(CabezaPreviaX, CabezaPreviaY + 8)
    }
})
