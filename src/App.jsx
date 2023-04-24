import React from 'react'
import './App.css'
import CoverContent from "./CoverContent"
import Question from './Question'
import { nanoid } from 'nanoid'
import Answer from "./Answer"


// Function to randomize the elements of an array
function randomize(arr) {
  let index = arr.length
  let randomIndex
  // While there remain elements to shuffle.
  while (index != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * index);
    index--;

    // And swap it with the current element.
    [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]];
  }
  return arr;
}

function App() {
  const [on, setOn] = React.useState(false)
  const [dataAPI, setDataAPI] = React.useState([])
  const [quiz, setQuiz] = React.useState([])
  const [check, setCheck] = React.useState (false)
  const [loading, setLoading]= React.useState (false)
  const [score, setScore] = React.useState(0)

  function start() {
    setOn(prevOn => !prevOn)
  }

  React.useEffect(() => {
    setLoading(true)
    if (on === true){
      fetch("https://opentdb.com/api.php?amount=5&encode=base64")
        .then(res => res.json())
        .then(data => {
          setLoading(false)
      
          const results = data.results
          setDataAPI(results.map(item => {
            //Decode the data Base64
            const decodedQuestion = atob(item.question)
            const decodedCorrectAnswer = atob(item.correct_answer)
            const decodedIncorrectAnswer = item.incorrect_answers.map(item => { return atob(item) })
            const decodedanswers = decodedIncorrectAnswer.concat(decodedCorrectAnswer)
            //Randomize the order of the elements in the array
            randomize(decodedanswers)

            const answers = decodedanswers.map(item=> {
              return { 
                id: nanoid(), 
                value: item, 
                isSelected: false,
              }
            })

            return {
              id: nanoid(),
              question: decodedQuestion,
              correctAnswer: decodedCorrectAnswer,
              incorrectAnswer: decodedIncorrectAnswer,
              allAnswers: answers,
            }
          }))
      })
    }
  },[on])

  
  React.useEffect(()=>{
    setQuiz(dataAPI.map(item => {
      const answersElement = item.allAnswers.map(answer => {
        return <Answer
          key={answer.id}
          id={answer.id}
          questionid = {item.id}
          answer={answer.value}
          correctAnswer ={item.correctAnswer}
          isSelected={answer.isSelected}
          gotSelected={() => gotSelected(item.id, answer.id)}
          checked = {check}
        />
      })
  
      return <Question
        key={item.id}
        id={item.id}
        question={item.question}
        correctAnswer={item.correctAnswer}
        incorrectAnswers={item.incorrectAnswer}
        allAnswers={answersElement}
      />
    }))

  }, [dataAPI, check])

   function gotSelected(questionID, answerID){
    setDataAPI(prevDataAPI =>{
      return prevDataAPI.map (item =>{
        if (questionID === item.id){
          return {
            ...item, 
            allAnswers: item.allAnswers.map(answer=>{
              if(answerID === answer.id){
                return {
                  ...answer,
                  isSelected: !answer.isSelected
                }
              }else{
                return answer
              }
            })}
        }else {
          return item
        }
      })
    })
  }

  // On CLick functions for button 

  function checkAnswers(){
    setCheck(prevCheck => !prevCheck)
    dataAPI.map(item =>{item.allAnswers.map(element=>{
        if (element.isSelected === true && element.value === item.correctAnswer){
          setScore(prevScore => prevScore + 1)
        }
      })
    })
  }

  function startAgain(){
    setOn(prevOn => !prevOn)
    setCheck(prevCheck => !prevCheck)
    setScore(0)
  }

  //Functions to handle content displayed

  function handleElementsDisplayed(){
    if (loading){
      return <div className='container-loading'><h2 className='loading'>Loading...</h2></div>
    }else {
      return <div className='quiz-btn-container'>{quiz} {handleButton()}</div>
    }
  }

  function handleButton(){
    if (check){
      return <div className='score'>
      <p>You scored {score}/5 correct answers </p>
      <button 
      className='btn btn-check btn-start' 
      onClick={startAgain}>Start again</button>
      </div>
    }else{
      return <button 
      className='btn btn-check' 
      onClick={checkAnswers}
      >Check answers</button>
    }
  }

  return (
        <div className="background">

          {on ?
            <div className="container-quizzes">
              <img className="img-top" src="./img/circle-top.png" alt="" />
              
              {handleElementsDisplayed()}
              
              <img className="img-bottom" src="./img/circle-bottom.png" alt="" />
            </div>
            : <CoverContent start={start} />}

        </div>
  )
}

export default App



