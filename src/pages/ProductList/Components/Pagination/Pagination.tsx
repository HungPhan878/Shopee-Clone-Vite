/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'

// scss
import style from './Pagination.module.scss'

const cx = classNames.bind(style)

interface Props {
  pageCurr: number
  setPageCurr: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}

const RANGE = 2

export default function Pagination({ pageCurr, setPageCurr, pageSize }: Props) {
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        const renderDotAfter = () => {
          if (!dotAfter) {
            dotAfter = true
            return (
              <button className={cx('pgt-btn')} key={index}>
                ...
              </button>
            )
          }
          return null
        }

        const renderDotBefore = () => {
          if (!dotBefore) {
            dotBefore = true
            return (
              <button className={cx('pgt-btn')} key={index}>
                ...
              </button>
            )
          }
          return null
        }

        if (
          pageCurr <= RANGE * 2 + 1 &&
          pageNumber > pageCurr + RANGE &&
          pageNumber < pageSize - RANGE + 1
        ) {
          return renderDotAfter()
        } else if (pageCurr > RANGE * 2 + 1 && pageCurr < pageSize - RANGE * 2) {
          if (pageNumber < pageCurr - RANGE && pageNumber > RANGE) {
            return renderDotBefore()
          } else if (pageNumber > pageCurr + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter()
          }
        } else if (
          pageCurr >= pageSize - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < pageCurr - RANGE
        ) {
          return renderDotBefore()
        }
        return (
          <button
            className={cx('pgt-btn', {
              'pgt-btn--active': pageCurr === pageNumber
            })}
            key={index}
            onClick={() => setPageCurr(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      })
  }

  return (
    <div className={cx('pgt-wrapper')}>
      <button className={cx('pgt-btn')}>prev</button>
      {renderPagination()}
      <button className={cx('pgt-btn')}>next</button>
    </div>
  )
}
