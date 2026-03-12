import { useState, useEffect, use } from 'react';

// https://restcountries.com/v3.1/all?fields=name,flags

function GeoQuiz() {
    const maxQuestion = 10

    const [questionType, setQuestionType] = useState("button")

    const [countries, setCountries] = useState([])
    const [currentCountry, setCurrentCountry] = useState()

    const [countQuestion,setCountQuestion] = useState(0)
    const [score, setScore] = useState(0)
    
    const [answer, setAnswer] = useState("")
    const [answerColor, setAnswerColor] = useState("")

    const [submited,setSubmited] = useState(false)

    const [options, setOptions] = useState()

    useEffect(()=>{
        fetch("https://restcountries.com/v3.1/all?fields=name,flags", {headers: {"Method":"GET","Accept": "application/json"}})
        .then(res => res.json())
        .then(data => {
            setCountries(data)

            let country = data[Math.round(Math.random()*data.length)]
            console.log(country)
            setCurrentCountry(country)

            fetchOptions(country, data)
        })
        .catch(err => console.log(err))

    },[])

    const newRandomCountry = () => {
        if (countQuestion < maxQuestion){
            let country = countries[Math.round(Math.random()*countries.length)]
            setCurrentCountry(country)
            fetchOptions(country, countries)
            setCountQuestion(countQuestion => countQuestion + 1)
            setSubmited(false)
            setAnswer("")
        } else {
            setCountQuestion(0)
            setScore(0)
        }
    }

    const submitAnswer = () => {
        if (answer.toLowerCase() == currentCountry.name.common.toLowerCase() || answer.toLowerCase() == currentCountry.name.official.toLowerCase()){
            setScore(score => score + 1)
            setAnswerColor("green")
        } else {
            setAnswerColor("red")
            setAnswer(answer => answer + " => Correct answer : " + currentCountry.name.common)
        }
        setSubmited(true)
    }

    function fetchOptions(country, data){
        let optionsArray = [country]

        for(let i = 0; i < 3; i++){
            let filtered = data.filter(elem => !optionsArray.includes(elem))
            let randomOption = filtered[Math.round(Math.random()*filtered.length)]
            optionsArray.push( randomOption )
        }

        setOptions(shuffle(optionsArray))
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          // Generate a random index j such that 0 ≤ j ≤ i
          const j = Math.floor(Math.random() * (i + 1));
          // Swap elements at indices i and j
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    return ( 
        <>
            {currentCountry &&
                <>
                {countQuestion < maxQuestion ?
                    <>
                        <h2>Question {countQuestion+1} / {maxQuestion} </h2>
                        <h3>Score : {score} / {maxQuestion} </h3>
                        
                        <img style={{width:"500px", objectFit:"contain"}}src={currentCountry.flags.svg} alt={currentCountry} />
                        
                        <button onClick={()=>{questionType == "text" ? setQuestionType("button") : setQuestionType("text")}}>Switch Answer Mode</button>
                        
                        {questionType == "text" ?
                            <input type="text" value={answer} onChange={(e)=>{setAnswer(e.target.value)}} disabled={submited} style={{"color": submited ? answerColor : ""}}/>
                        : questionType == "button" && options && currentCountry && 

                            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px"}}>

                                {options.map((option, index) => (
                                    <button key={index} style={{margin: "0px",width: "100%", height: "100%", border: (!submited && answer == option.name.common) ? "1px solid white" : "none", boxShadow: submited && (answer == option.name.common + " => Correct answer : " + currentCountry.name.common || currentCountry.name.common == option.name.common) ? currentCountry.name.common == option.name.common ? "0 0 20px #008000 " : "0 0 20px #F00000 " : "none"}} disabled={submited} onClick={()=>{setAnswer(option.name.common)}}>
                                        {option.name.common}
                                    </button>
                                ))}

                            </div>
                                                
                        }

                        <button onClick={submitAnswer} disabled={submited || answer == ""}>Submit</button>

                        <button onClick={newRandomCountry} disabled={!submited}>Next Question</button>

                    </>
                :
                    <>
                        <h1>Votre score est de {score} / {maxQuestion} </h1>
                        <button onClick={newRandomCountry}>Restart</button>
                    </>
                
                }
                </>
            }

        </>
     );
}

export default GeoQuiz;