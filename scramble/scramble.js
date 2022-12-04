/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/

 const data = ['dog','cat','turtle','fish','rabbit','bird','parrots','elephant','hawk','eagle']

 const Button = ({ text, variant, onButtonClick }) => {
   const className = `btn btn-${variant}`
 
   function clickHandler () {
     onButtonClick()
   }
 
   return (
     <div className="row">
       <div className="col d-flex justify-content-center">
         <button type="button" className={className} onClick={clickHandler}>{text}</button>
       </div>
     </div>
   )
 }
 
 const InputSection = ({ onGuess }) => {
   
   const [guess, setGuess] = React.useState('')
 
   function changeHandler (e) {
     setGuess(e.target.value)
   }
 
   function submitHandler (e) {
     e.preventDefault()
     onGuess(guess)
     setGuess('')
   }
 
     return(
         <div>
           <form className="form mb-3" onSubmit={submitHandler}>
             <input type="text" value={guess} onChange={changeHandler} className="form-control text-uppercase" />
           </form>
         </div>
     )
 }
 
 const Score = ({ score }) => {
   return (
     <div className="row">
       <div className="col">
         <h2 className="display-3 text-center">
           {score}
         </h2>
         <p className="text-center fw-bolder">POINTS</p>
       </div>
     </div>
   )
 }
 
 const Skip = ({ onSkip , pass}) => {
  
   function clickHandler () {
     onSkip()
   }
 
   return (
     <div className="row">
       <div className="col d-flex justify-content-center">
         <button type="button" className="btn btn-danger" onClick={clickHandler}>{<span>{pass} Passes Remaining</span>}</button>
       </div>
     </div>
   )
 }
 
 const App = () => {
 
   const datas = shuffle(data)
 
   const [scramble,setScramble] = React.useState(datas)
   const [score, setScore] = useLocalStorage('score', 0)
   const [message, setMessage] = useLocalStorage('message', '')
   const [active, setActive] = useLocalStorage('active', true)
   const [animal,setAnimal] = useLocalStorage('animal',scramble[0])
   const [strike,setStrike] = useLocalStorage('strike',0)
   const [status,setStatus] = React.useState(undefined)
   const [pass,setPass] = React.useState(3)
   
 
   React.useEffect(() => {
     setAnimal(scramble[0])
   }, [JSON.stringify(scramble)])
 
   React.useEffect(() => {
     localStorage.setItem('scramble', JSON.stringify({
       active,
       score,
       message,
       animal,
       strike
       
     }))
   })
 
   function onSkipHandler () {
     if (scramble.length > 1 && pass > 0) {
       setMessage('You passed. Next word.')
       setStatus(undefined)
       setScramble(scramble.slice(1))
       setPass(passes => passes - 1)
     } else if(pass===0){
       gameOver()
       
     }
   }
 
   function onGuessHandler (guess) {
     if (guess === animal) {
       setScore(prevScore => prevScore + 1)
       setStatus(true)
       
       if (scramble.length > 1) {
         setMessage('Correct. Next word.')
         setScramble(scramble.slice(1))
       } else {
         gameOver()
       }
     } else {
      if(strike < 3){
         setMessage('Wrong. Try again.')
         setStrike(strikes => strikes + 1)
         setStatus(false)
      }else {
       gameOver()
      }
     } 
   }
 
   function gameOver () {
    if(strike ==3  || pass==0){
      setMessage(`You lose. Your final point is ${score}.`)  
    }else{
      setMessage(`No more words. Your final point is ${score}.`)
    }
     
     setActive(false)
     localStorage.removeItem('scramble')
     setStrike(0)
     setPass(3)
     setStatus(undefined)
   }
 
   function onPlayHandler () {
     setMessage('')
     setActive(true)
     setScore(0)
     setScramble(datas)
     localStorage.removeItem('scramble')
     setStatus(undefined)
   }
 
   function useLocalStorage (key, defaultValue) {
       
       const ls = JSON.parse(localStorage.getItem('scramble'))
   
       return React.useState(ls ? ls[key] : defaultValue) 
      }
 
 
   return(
     <React.Fragment>
        <div className='container'>
          <h1 className="text-center display-1">Welcome to Scramble.</h1>
          <div className='row'>
            <div className='col'>
              {<Score score={score} />}
            </div>
            <div className="col">
              <p className="display-3 text-center">{strike}</p>
              <p className="text-center fw-bolder">STRIKES</p>
            </div>
          </div>
          <div className='row justify-content-md-center'>
            <div className='col-md-9'>
              <p className={status === undefined ? `alert text-center ${message!=""? "alert-primary":""}`:status?"alert text-center alert-success":"alert text-center alert-danger"}>{message}</p >              
              <p className="display-3 text-center text-uppercase">{shuffle(animal)}</p>
              {active && <InputSection onGuess={onGuessHandler} />}
              {active && <Skip onSkip={onSkipHandler} pass={pass} />}
              {!active && <Button text="Play Again?" variant="primary" onButtonClick={onPlayHandler} />}
            </div>
          </div>
        </div>
     </React.Fragment>
   )
 }
 
 const root = ReactDOM.createRoot (
   document.getElementById('root'))
   
 root.render(<App />)
