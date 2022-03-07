export const Button = (props) => {
  const { children, ...otherProps } = props;
  return (
    <button className="btn btn-primary" {...otherProps}>{children}</button>
  )
}