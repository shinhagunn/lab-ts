interface ButtonProps {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function Button(props: React.PropsWithChildren<ButtonProps>) {
  return (
    <button className={`button ${props.className}`} type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button