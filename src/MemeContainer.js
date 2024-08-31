import React from "react";
import newMemeImage from "./images/Get a new meme image 🖼.png";
import ImageCanvas from "./ImageCanvas";
// import memeImage from "./images/memeimg.png";
// import memeData from "./memesData";

export default function MemeContainer(){
    
    const [allmeme, setAllMeme] = React.useState([])
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/1bij.jpg"
    })

    function getRandomMeme(){
        // const memes = allmeme.data.memes;
        const memeIndexer = Math.floor(Math.random() * allmeme.length);
        const renderedImage = allmeme[memeIndexer];

        setMeme(prevState => {
            return {
                ...prevState,
                topText: "",
                bottomText: "",
                randomImage: renderedImage.url
            }
        });
    }

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMeme(data.data.memes))
    }, [])

    function handleChange(event){
        const {name, value} = event.target;
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        })
    }


    return (
        <div className="body-container">
            <div className="form-section">
                <div className="form-item">
                    {/* <p className="form-instructions">{meme.topText}</p> */}
                    <input 
                        type="text" 
                        name="topText" 
                        className="form-input" 
                        value={meme.topText} 
                        placeholder="Top text" 
                        id="first-input"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-item">
                    {/* <p className="form-instructions">{meme.bottomText}</p> */}
                    <input 
                        type="text" 
                        name="bottomText" 
                        value={meme.bottomText} 
                        className="form-input" 
                        placeholder="Bottom Text"
                        onChange={handleChange}
                    />
                </div>
            </div>
            <button className="new-meme-button" onClick={getRandomMeme}><img src={newMemeImage} alt=""/></button>
            <div className="meme">
                <img src={meme.randomImage} alt="meme-image" className="meme-image"/>  
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
                <ImageCanvas meme={meme} />
            </div>
            
        </div>
    )
}