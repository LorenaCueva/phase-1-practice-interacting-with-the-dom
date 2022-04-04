document.addEventListener('DOMContentLoaded', ()=>{
    
    console.log("loaded")
    const likesArr = []
    let counterId = setInterval(()=>displayCount(1),1000)

    addClick('pause',pause)
    addClick('plus',()=>displayCount(1))
    addClick('minus', ()=>displayCount(-1))
    addClick('heart', addLikes)
    addClick('comment-form',addComment,'submit')

    function addLikes(){

        const listNode = document.querySelector('.likes')
        listNode.innerHTML = ""
        const num = Number(document.querySelector('#counter').innerText)
        let found = 0
        likesArr.forEach(e=>{
            if(e.number === num){
                e.likes += 1
                found = 1
            }
        })
        if(found === 0){
            likesArr.push({number: num, likes: 1})
        }
        likesArr.forEach(e=>{
             const likeEl = document.createElement('li')
             likeEl.innerText = `${e.number} has been liked ${e.likes} times`
             listNode.append(likeEl)
        })
     }

    function addComment(e){
        e.preventDefault()
        const comment = document.createElement('li')
        comment.innerText = e.target.comment_input.value
        document.getElementById('comment-list').append(comment)
        e.target.comment_input.value = ''
    }

    function displayCount(n){
        const counterElement = document.querySelector('#counter')
        let counter = Number(counterElement.innerText)
        counter += n
        counterElement.innerText = counter
    }

    function addClick(element, callback, action='click'){
        document.getElementById(element).addEventListener(action, callback)
    }

    function pause(){
        const btn = document.getElementById('pause')
        if(document.getElementById('plus').disabled){
            btn.innerText = "pause"
            counterId = setInterval(()=>displayCount(1),1000)
            disableButtons(false)
            
        }
        else{
            btn.innerText = "resume"
            clearInterval(counterId)
            disableButtons(true)
        }    
    }

    function disableButtons(isDisabled){
        [...document.getElementsByClassName('counter-button')]
        .forEach(e=>e.disabled = isDisabled)
    }    
})
