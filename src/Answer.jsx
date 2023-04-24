export default function Answer (props){

    function handleAnswer (){
        if(props.checked === true){
            if(props.isSelected){
                if(props.answer === props.correctAnswer){
                    return "correct"
                }else {
                    return "incorrect"
                }
            }else{
                if(props.answer === props.correctAnswer){
                    return "correct"
                }else {
                    return "not-selected"
                }
            }
        }else {
            if (props.isSelected === true){
                return "input-checked"
            }
        }
    }

    return (
        <div>
            <input
            className={`input ${handleAnswer()}`}
            type="radio"
            name = {props.questionid}
            id = {props.id}
            value = {props.answer}
            />
            <label 
            className= {`label ${handleAnswer()}`}
            onClick={props.gotSelected} 
            htmlFor={props.id}>{props.answer}</label>  
        </div>
            
    )
}
