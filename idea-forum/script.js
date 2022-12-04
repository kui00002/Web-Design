//data import
const data = {
    currentUser: 'currentUser',
    ideas: [
      {
        username: 'amyrobson',
        content:
          'Non dolor veniam nostrud ad. Commodo ex officia reprehenderit eu laborum. Qui reprehenderit reprehenderit incididunt eiusmod voluptate cupidatat cupidatat dolor. Incididunt sint cupidatat dolore cupidatat ut do dolor nostrud ullamco aliqua aliqua excepteur. Fugiat nostrud esse voluptate magna nostrud nostrud sint et. Irure excepteur irure ullamco occaecat dolor deserunt. Cillum fugiat sunt ullamco ad enim ea eiusmod do et dolor adipisicing mollit aliqua mollit.\r\n',
        score: 3,
      },
      {
        username: 'maxblagun',
        content:
          'Cupidatat veniam quis aliquip ut pariatur excepteur ut. Cupidatat reprehenderit nulla laborum dolore nulla voluptate cupidatat in. Sint tempor non duis sit deserunt culpa sunt labore eu sit consectetur. Excepteur reprehenderit et officia incididunt consectetur laborum consequat laboris excepteur ea adipisicing qui.\r\n',
        score: 10,
      },
      {
        username: 'maxblagun',
        content:
          'Proident qui elit in deserunt velit eu veniam. Tempor velit cillum et dolore. Incididunt anim Lorem Lorem dolor voluptate deserunt cillum consequat ut. Ea fugiat culpa ex et pariatur dolor est officia ea dolore ullamco mollit. Cillum minim consequat ipsum deserunt velit mollit ad consectetur irure dolore proident qui.\r\n',
        score: 6,
      },
      {
        username: 'maxblagun',
        content:
          'Officia exercitation cupidatat enim sint ea quis reprehenderit ipsum. Commodo ullamco deserunt reprehenderit qui in anim aliqua officia do in reprehenderit Lorem. Ipsum non aute officia est nisi sunt non. Proident in eiusmod sint aliquip qui officia deserunt eiusmod sit. Mollit voluptate anim cillum cupidatat duis est ad excepteur consequat fugiat cillum velit esse. Quis dolore sit ullamco qui.\r\n',
        score: 8,
      },
      {
        username: 'currentUser',
        content:
          'Incididunt ut ut velit dolor irure Lorem ex nostrud et laborum commodo dolore laborum culpa. Adipisicing ullamco eu id sit velit ut laboris irure esse quis. Mollit minim laborum do exercitation sint magna ea ea eu eu laboris aliquip anim culpa. Consectetur eiusmod esse ipsum incididunt duis ea nisi qui duis pariatur.\r\n',
        score: 3,
      },
      {
        username: 'currentUser',
        content:
          'Id aute eu quis tempor laborum duis nostrud proident nostrud culpa est ad. Do dolor cillum ullamco excepteur eiusmod laboris dolore do Lorem. Exercitation eiusmod laborum enim culpa esse.\r\n',
        score: 1,
      },
      {
        username: 'amyrobson',
        content:
          'In magna cupidatat ipsum exercitation incididunt non eu amet occaecat et sint irure consequat. Sunt labore incididunt ut culpa aliquip excepteur est. Enim Lorem dolor adipisicing veniam proident quis ad laborum in commodo qui. Proident elit ullamco aliqua non excepteur in fugiat consequat adipisicing ut eu id sunt laboris.\r\n',
        score: 7,
      },
    ],
  }

  let container = document.getElementById('container')
  let inputValue = document.getElementById('newidea')
  const pop =  document.querySelector('.pop')

//use function to render the Html with data in the 'data' object,
//use for loop
  function addContent(){
      let items = []
      for(let index=0; index<data.ideas.length; index++){
        let containerItem = `
        <div class="card mt-3">
            <div class="card-header">
                ${data.ideas[index].username}
            </div>
            <div class="card-body">
                <p class="card-text" data-index="${index}">
                ${data.ideas[index].content}
                </p>
            </div>
            <div class="card-footer">
                <button class="btn btn-secondary  btn-sm plus" data-index="${index}">+</button>
                <small ><input value=${data.ideas[index].score} style="width:40px; text-align: center;" disabled class="score"></small>
                <button class="btn btn-secondary btn-sm minus" data-index="${index}">-</button>
            </div>
        </div>
        `
        items.push(containerItem)
        container.innerHTML = items.join('') 
      }
      
      const cardValue = document.querySelectorAll('.card-header')
        console.log(cardValue)
        for(let i = 0; i<cardValue.length; i++){
          //if the username = current user, you tag and edit/delete will be rendered in the html
          //this code may have alternative method
          if(cardValue[i].innerText === data.currentUser){
            cardValue[i].innerHTML = `<div class="row">
            <div class="col" style="margin-top:2%;">${data.ideas[i].username} <kbd class="btn-primary" style="padding-left: 4%; padding-right: 4%;">you</kbd></div>      
            <div class="col d-md-flex justify-content-md-end gap-2">
            <button class="btn btn-outline-primary btn-sm edit " data-index="${i}">Edit</button>
            <button class="btn btn-outline-primary btn-sm delete" data-index="${i}">Delete</button>
            </div>
            </div>`
          }
        }
      }
  addContent()

  const score = document.querySelectorAll('.score')

  container.addEventListener('click',function(e){
    console.log(e.target.innerText)

    if(e.target.classList.contains('plus')){
        const index = e.target.dataset.index
        const ideaIndex = data.ideas[index]
        ideaIndex.score ++
      //score plus function
        addContent()
      //score changed, render again
    }else if(e.target.classList.contains('minus')){
      const index = e.target.dataset.index
        const ideaIndex = data.ideas[index]
        if(ideaIndex.score>0){
          ideaIndex.score --
        } else {
          alert('score must be over 0')
        }//make sure score cannot be under 0
        addContent()

      }else if(e.target.classList.contains('edit')){
        pop.style.display = 'block'
        let modal = `
        <div id="pop" class="card">
            <div class="card-body">
                
                <h5 class="card-title">Edit card</h5>
        
                <div class="card-body">
                    <input type="text" class="form-control mb-4" id="newedit">
                    <button class="btn btn-secondary  btn-sm edit" id="editnew">Save</button>
                    <button class="btn btn-secondary  btn-sm cancel" id="cancel">Cancel</button>
                </div>
            </div>
        </div>
        `
        document.querySelector('.pop').innerHTML = modal
        const pops = document.getElementById('pop')
        const cancel = document.getElementById('cancel')
        const editnew = document.getElementById('editnew')
        const newedit = document.getElementById('newedit')
        const index = e.target.dataset.index
        newedit.value = data.ideas[index].content
        // inputValue.value = ideaIndex.content  
        //when click on the edit
        // addContent()
        
        editnew.addEventListener('click',(e)=>{
            data.ideas[index].content = newedit.value
            pop.style.display = 'none'
            console.log(data.ideas[index])
            addContent()
        })
        
        cancel.addEventListener('click',()=>{
          pop.style.display = 'none'
        })
      }else if(e.target.classList.contains('delete')){
        e.preventDefault()
        const index = e.target.dataset.index 
        data.ideas.splice(index,1)
        addContent()
      }
    })
  
    const $form = document.getElementById('form')
    
    $form.addEventListener('submit',function(e){
      e.preventDefault()
      
      console.log(inputValue.value)
      data.ideas.push({
        username:data.currentUser,
        content:inputValue.value,
        score:0
      })
      addContent()
      inputValue.value = ''
    })
  