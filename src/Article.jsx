import { useState } from "react";
import './Article.css';

function Article({article}) {
    const [hidden, setVisibility] = useState(false)

    const toggleVisibility = () => {
        setVisibility(hidden => !hidden)
        console.log(hidden); 
    }

    return (  
        <> 
            {!hidden ? 
                <div className={"article"}>
                    <h4>{article.titre}</h4>
                    <h6>{article.thème}</h6>
                    <h6>Publiée le {article.date} par {article.auteur} </h6>
                </div>  
            : null }

            <button className="toggle-button" onClick={toggleVisibility}>{hidden ? "Show" : "Hide"}</button>
        </> 
    );
}

export default Article;