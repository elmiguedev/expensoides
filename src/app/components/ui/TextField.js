export const TextField = (props) => {
    const {
        type = "text",
        ...otherProps
    } = props;

    return (
        <input type={type} className="form-control" {...otherProps}></input>
    )
} 