import { useState } from "react";
import questions from "./data/questions-culture-generale.json"

function Quiz() {

    const [countQuestion,setCountQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [submited,setSubmited] = useState(false)

    const [currentAnswer,setCurrentAnswer] = useState({})


    const nextQuestion = () => {
        if (countQuestion < 5){
            setSubmited(false)
            setCountQuestion(countQuestion => countQuestion + 1)
            setCurrentAnswer({})
        } else {
            setCountQuestion(0)
            setScore(0)
        }
    }

    const submitAnswer = () => {
        console.log(currentAnswer)
        
        if (!submited){
            setSubmited(true)
            if (currentAnswer.correcte) {
                setScore(score => score + 1)
            }
        }
    }

    function newAnswer(answer){
        if (!submited){
            setCurrentAnswer(answer)
        }
    }

    return (
        <>
            {countQuestion < 5 ?
                <>
                    <h2>Question {questions[countQuestion].id} / 5</h2>
                    <h3>Score : {score} / 5</h3>
                    <h1>{questions[countQuestion].intitule}</h1>

                    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px"}}>

                        {
                            questions[countQuestion].choix.map((reponse, index) => (
                                
                                <button key={index} style={{margin: "0px",width: "100%", height: "100%", border: currentAnswer == reponse ? "1px solid white" : "none" , boxShadow: submited && (currentAnswer == reponse || reponse.correcte) ? reponse.correcte ? "0 0 20px #008000 " : "0 0 20px #F00000 " : "none"}} onClick={()=>{newAnswer(reponse)}}>
                                    {reponse.texte}
                                </button>
                            
                            ))
                        }

                    </div>
                    
                    {(JSON.stringify(currentAnswer) == "{}" || submited == true) ?

                        <button disabled>Submit</button>
                    :

                        <button style={{cursor: "pointer"}} onClick={submitAnswer}>Submit</button>

                    }
                    
                    <button onClick={nextQuestion}>Next Question</button>
                </>
            :
                <>
                    <h2>Your score is {score} / 5</h2>
                    <button onClick={nextQuestion}>Restart</button>
                </>
            }
        </>
    );
}

export default Quiz;