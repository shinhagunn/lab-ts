import React, { useState } from 'react';
import '../assets/styles/components/select.less';

interface SelectProps {
  value: string
  className?: string
}

function Select(props: React.PropsWithChildren<SelectProps>) {
  const [show, setShow] = useState(false);
  const [effect, setEffect] = useState(false);

  const handleDropdownOver = (e: any) => {
    setShow(!show);
    setTimeout(() => {
      setEffect(!effect);
    }, 100);
  };

  return (
    <div className={`select ${props.className}`} onClick={(e) => handleDropdownOver(e)}>
      <div className="select-value">
        {props.value}
        {show ? (
          <div className={`option option-appear ${effect ? 'option-effect' : ''}`}>
            {props.children}
          </div>
        ) : ''}
      </div>
    </div>
  );
}

export default Select;
