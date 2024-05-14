import { ButtonHTMLAttributes } from 'react'
import classNames from 'classnames/bind'

// scss
import style from './Button.module.scss'

const cx = classNames.bind(style)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export default function Button(props: ButtonProps) {
  const { disabled, children, className = cx('btn'), isLoading, ...rest } = props
  const newClassName = disabled ? cx(className, 'btn__disable') : className
  // Nhu vay la them class cho cx nha

  return (
    <div>
      <button className={newClassName} {...rest} disabled={disabled}>
        {isLoading && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 100 100'
            preserveAspectRatio='xMidYMid'
            width={22}
            height={22}
            style={{ shapeRendering: 'auto', display: 'block', background: 'transparent' }}
            xmlnsXlink='http://www.w3.org/1999/xlink'
          >
            <g>
              <circle
                strokeLinecap='round'
                fill='none'
                strokeDasharray='50.26548245743669 50.26548245743669'
                stroke='#ffffff'
                strokeWidth={7}
                r={32}
                cy={50}
                cx={50}
              >
                <animateTransform
                  values='0 50 50;360 50 50'
                  keyTimes='0;1'
                  dur='1s'
                  repeatCount='indefinite'
                  type='rotate'
                  attributeName='transform'
                />
              </circle>
              <g />
            </g>
            {/* [ldio] generated by https://loading.io */}
          </svg>
        )}
        <span>{children}</span>
      </button>
    </div>
  )
}
