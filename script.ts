// játékosok 0, vagy 1, egyes dobás esetén cserélődik

let player: number = 0


let name0: string | null = 'TERMINÁTOR'
let name1: string | null = 'HULK'

// játékosok mentett pontszámai 0-ás vagy 1-es indexen
let point: number[] = [0,0]

//aktuális pont, egyes dobás esetén nullázódik
let playerActual: number = 0
//rekord
let rekord: number = 0

//kocka
let dice:number
//HTML valtozok
let kockaKep = document.querySelector('#img') as HTMLImageElement

// FUGGVENYEK
//aktualis jatekos
function playerstyle ():void {

    const nameStyle0: HTMLElement = document.getElementById('name0')!
    const nameStyle1: HTMLElement = document.getElementById('name1')!

    if (player === 0) {
        nameStyle0.style.color = 'blue'
        nameStyle0.style.fontWeight = 'bold'
    

        nameStyle1.style.fontWeight = 'normal'
        nameStyle1.style.color = 'black'
    }
    else {
        nameStyle1.style.color = 'green'
        nameStyle1.style.fontWeight = 'bold'

        nameStyle0.style.fontWeight = 'normal'
        nameStyle0.style.color = 'black'
    }
}

playerstyle()

// alaphelyzet

function alaphelyzet(): void {
    //kep alaphelyzet
    kockaKep.src = "img/" + 7 + ".png"

    //főpotszám alaphelyzet
    document.getElementById('point' + 0)!.textContent = '0'
    document.getElementById('point' + 1)!.textContent = '0'
    point = [0, 0]

    //aktuális pont alaphelyzet
    document.getElementById('actual_point' + 0)!.textContent = '0'
    document.getElementById('actual_point' + 1)!.textContent = '0'
    playerActual = 0

    //nevek alaphelyzet
    //document.getElementById('name0' )!.textContent = 'name0'
    //document.getElementById('name1' )!.textContent = 'name1'
}

//Név választás 

function nevvalasztas () : void {
    
    name0 = prompt('Add meg az első játékos nevét:', 'TERMINÁTOR')
    name1 = prompt('Add meg az második játékos nevét:', 'HULK')
    if (name0 || name1) {
        document.getElementById('name0')!.textContent = name0
        document.getElementById('name1')!.textContent = name1
    }
    else {
        name0 = 'TERMINÁTOR'
        name1 = 'HULK'
    }
}
//ESEMENYEK
//uj jatek gomb
let ujJatek = document.getElementById('btn_0') as HTMLButtonElement
ujJatek.addEventListener('click', function () {
    alaphelyzet()

    // nevek felvétele
    name0 = prompt('Add meg az első játékos nevét:', 'TERMINÁTOR')
    name1 = prompt('Add meg az második játékos nevét:', 'HULK')
    if (name0 || name1) {
        document.getElementById('name0')!.textContent = name0
        document.getElementById('name1')!.textContent = name1
    }
    else {
        name0 = 'TERMINÁTOR'
        name1 = 'HULK'
    }
    // aktualis jatekos jeloles 
    playerstyle()

})


// dobás gomb
let dobas = document.getElementById('btn_1') as HTMLButtonElement

dobas?.addEventListener('click', function () {
    //generálnuk egy véletlen számot 1-6ig
    dice = Math.ceil(Math.random() * 6)

    //a kép itt változik a random szám miatt

    kockaKep.src = "img/" + dice + ".png"

    // random szám hozzáadása az aktuális pontszámhoz
    if (dice !== 1) {
        playerActual += dice
        document.getElementById('actual_point' + player)!.textContent = playerActual.toString()
    }

    // ha egyest dobunk, akkor játékost cserélünk, és a pontok elvesznek
    if (dice === 1) {
        playerActual = 0
        document.getElementById('actual_point' + player)!.textContent = playerActual.toString()
        player === 0 ? player = 1 : player = 0;
        playerstyle()


    }
})

// pontok megtartása gomb
let pontMegtart = document.getElementById('btn_2') as HTMLButtonElement
pontMegtart?.addEventListener('click', function () {
    if (playerActual !== 0 || dice !== 1) {


        //rekord
        if (rekord < playerActual) {
            rekord = playerActual
            player === 0 ? document.getElementById('rekord')!.textContent = name0 + ' : ' + rekord :
                document.getElementById('rekord')!.textContent = name1 + ' : ' + rekord;

        }

        // pontok felirasa
        point[player] += playerActual
        document.getElementById('point' + player)!.textContent = (point[player]).toString()
        playerActual = 0
        document.getElementById('actual_point' + player)!.textContent = playerActual.toString()




        if (point[player] < 100) {
            //jatekos valtas
            player === 0 ? player = 1 : player = 0;
            playerstyle()


        }
        // HA megvan a nyertes
        else {
            // document.getElementById('name' + player ).textContent = 'NYERTES!'
            
             player === 0 ? alert('A NYERTES : ' + name0 + '!!!') : alert('A NYERTES : ' + name1 + '!!!')
            
            alaphelyzet()

        }
    }

})