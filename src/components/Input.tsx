interface InputProps {
  type?: React.InputHTMLAttributes<HTMLInputElement>['type']
  value?: string
  placeholder?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  className?: string
  readOnly?: boolean
  id?:string
  title?: string
  autocomplete?: string
}

function Input(props: InputProps) {
  return (
    <input id={props.id} className={`input ${props.className}`} autoComplete={props.autocomplete} title={props.title} type={props.type} value={props.value} placeholder={props.placeholder} onChange={props.onChange} readOnly={props.readOnly || false} />
  );
}

export default Input;
