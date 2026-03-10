import { useState } from "react";
import articles from "./data/articles.json"
import Article from "./Article";

function Blog() {
    const [hidden, isHidden] = useState(false)

    return (
        <>
            <div className="blog-bar">
                <button onClick={()=>{isHidden(false)}}>Show All</button>
                <button onClick={()=>{isHidden(true)}}>Hide All</button>
            </div>

            {!hidden ? 
            
                articles.map((article,index)=>(
                    <>
                        {console.log(article.titre)}
                        <Article key={index} article={article}/>
                    </>
                ))

            : <h2>Everything is hidden </h2>}
        </>
    );
}

export default Blog;