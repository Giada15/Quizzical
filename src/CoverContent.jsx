export default function CoverContent(props){
    return (
            <div className="container">
                <img className="img-top" src="./img/circle-top.png" alt="" />
                <h1 className="title">Quizzical</h1>
                <p className="game-description">Test your general knowledge</p>
                <button className="btn btn-primary" 
                onClick={props.start}
                >Start quiz</button>
                <img className="img-bottom" src="./img/circle-bottom.png" alt="" />
            </div>
    )
}