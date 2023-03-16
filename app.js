const game ={
    xTurn:true,
    xstate:[],
    ostate:[],
    winningstate:[
        //row
        ['0','1','2'],
        ['3','4','5'],
        ['6','7','8'],
        //column
        ['0','3','6'],
        ['1','4','7'], 
        ['2','5','8'],
        //diagonal
        ['0','4','8'],
        ['2','4','6'],
    ]
}
document.addEventListener('click',event=>{
    const target=event.target
    const iscell=target.classList.contains('grid-cell')
    const isdisabled=target.classList.contains('disabled')
    if(iscell && !isdisabled){
        const cellvalue=target.dataset.value
        game.xTurn===true
         ?game.xstate.push(cellvalue)
         :game.ostate.push(cellvalue)

        target.classList.add('disabled')
        target.classList.add(game.xTurn ? 'x' : 'o')
        game.xTurn=!game.xTurn

        //if all cell is disabled then game is draw
        if(!document.querySelectorAll('.grid-cell:not(.disabled)').length){
            document.querySelector('.game-over').classList.add('visible')
            document.querySelector('.game-over-text').textContent='Oops Draw!'
        }
        game.winningstate.forEach(winningstate =>{
            const xwin = winningstate.every(state=>game.xstate.includes(state))
            const owin = winningstate.every(state=>game.ostate.includes(state))

            if(xwin || owin){
                document.querySelectorAll('.grid-cell').forEach(cell=>cell.classList.add('disabled'))
                document.querySelector('.game-over').classList.add('visible')
                document.querySelector('.game-over-text').textContent=xwin ? '❌ Wins!!!' : '⭕ Wins!!!'
            }
        })

    }
})
document.querySelector('.restart').addEventListener('click' ,()=>{
    document.querySelector('.game-over').classList.remove('visible')
    document.querySelectorAll('.grid-cell').forEach(cell=>{
        cell.classList.remove('disabled','x','o')
    })
    game.xTurn=true
    game.xstate=[]
    game.ostate=[]
})
let myAudio = document.querySelector('#audio')
myAudio.play()
