import React from "react"

export default function Question(props) {

        return (
            <div className="container-quiz">
                <p className="question">{props.question}</p>
                <div className="radio-input">
                    {props.allAnswers}
                </div>
            </div>
    )
}