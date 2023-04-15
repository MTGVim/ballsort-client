import { ReactComponent as SpinnerComponent } from 'assets/Spinner.svg';
import { useState } from 'react';

export default function useSpinner(initialShowState: boolean): {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  register: {
    style: React.SVGAttributes<SVGSVGElement>['style'];
  };
  Spinner: typeof SpinnerComponent;
} {
  const [show, setShow] = useState(initialShowState);

  return {
    show,
    setShow,
    Spinner: SpinnerComponent,
    register: {
      style: {
        width: '50px',
        height: '50px',
        display: show ? 'block' : 'none',
      },
    },
  };
}
