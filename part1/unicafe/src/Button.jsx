const Button = (props) =>{
    console.log(props.onClick)
    return(
        <button onClick={props.onClick}>{props.text}</button>
    )
}

export default Button