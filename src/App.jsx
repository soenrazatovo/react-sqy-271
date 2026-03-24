import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import "./App.css"

import Props from "./Props.jsx"
import Home from "./Home.jsx"
import Counter from "./Counter.jsx"
import Blog from "./Blog.jsx"
import Form from "./Form.jsx"
import Quiz from "./Quiz.jsx"
import Shop from "./Shop.jsx"
import GeoQuiz from "./GeoQuiz.jsx"
import Random from "./Random.jsx"
import Todo from "./Todo.jsx"

function App() {
  
  const user = {
    name: "Tsito",
    age: 18
  }

  const contents = [
    {
      id: 1,
      content: "Yes"
    },
    {
      id: 2,
      content: "No"
    },
    {
      id: 3,
      content: "Maybe"
    }
    

  ]

  return (
    <BrowserRouter>
      {/* <Header user={user} contents={contents}/> */}
      <nav>
        <Link to="/">Home</Link> | {" "}
        <Link to="/props">Props</Link> | {" "}
        <Link to="/count">Counter</Link> | {" "}
        <Link to="/blog">Blog</Link> | {" "}
        <Link to="/form">Form</Link> | {" "}
        <Link to="/quiz">Quiz</Link> | {" "}
        <Link to="/geoquiz">GeoQuiz</Link> | {" "}
        <Link to="/shop">Shop</Link> | {" "}
        <Link to="/random">Random Student</Link> | {" "}
        <Link to="/todo">Todo</Link>

      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/props" element={<Props user={user} contents={contents} />} />
        <Route path="/count" element={<Counter />}/>
        <Route path="/blog" element={<Blog />}/>
        <Route path="/form" element={<Form />}/>
        <Route path="/quiz" element={<Quiz />}/>
        <Route path="/geoquiz" element={<GeoQuiz />}/>
        <Route path="/shop" element={<Shop />}/>
        <Route path="/random" element={<Random />}/>
        <Route path="/todo" element={<Todo />}/>
      </Routes>
      
    </BrowserRouter>
  )

}

export default App