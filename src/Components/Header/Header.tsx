/* eslint-disable prettier/prettier */
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind'
import { useContext } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'

// scss
import style from './header.module.scss'
import Popover from '../Popover'
import { logout } from 'src/apis/auth.api'
import { AppContext } from 'src/contexts/app.context'
import path from 'src/constants/path'
import { useForm } from 'react-hook-form'
import { SchemaType, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { purchasesStatus } from 'src/constants/purchases'
import purchasesApi from 'src/apis/purchases.api'

type FormData = Pick<SchemaType, 'name'>

const searchSchema = schema.pick(['name'])
const cx = classNames.bind(style)

export default function Header() {
  const { isAuthenticated, setAuthenticated, setProfile, profile } = useContext(AppContext)
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(searchSchema)
  })

  // [POST] LOG OUT
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setAuthenticated(false)
      setProfile(null)
    }
  })

  // [GET] Purchases List
  const getPurchasesList = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchasesApi.getPurchasesList({ status: purchasesStatus.inCart })
    //  Khi chuyển từ productList sang productDetail thì có cần thêm staleTime để tối ưu hiệu suất
    // để không gọi lại api hay không ?
    //=>Không cần vì
    //+detail và list là hai route khác nhau nhưng cùng chung một component MainLayout
    //+react query sẽ tự hiểu và chỉ re-render lai Header trong MainLayout mà thôi.
    //+mà re-render thì không unmount  vì vậy staleTime sẽ không được kích hoạt và sẽ không gọi lại query này
    //+nên không cần cho staleTime vào getPurchases nha.
  })
  const purchasesList = getPurchasesList.data?.data.data
  console.log(purchasesList)

  // handler funtion
  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const handleSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }

    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })

  return (
    <header className={cx('header-wrapper')}>
      <div className={cx('container')}>
        {/* header top */}
        <div className={cx('header-top')}>
          <ul className={cx('header-list')}>
            <li className={cx('header-item')}>
              <Popover
                className={cx('header-item__wrap')}
                renderProps={
                  <div className={cx('ppv-lang__row')}>
                    <button className={cx('ppv-lang__btn')}>Tiếng Việt</button>
                    <button className={cx('ppv-lang__btn')}>English</button>
                  </div>
                }
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className={cx('header-item__icon')}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
                  />
                </svg>
                <span className={cx('header-item__label')}>Tiếng Việt</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className={cx('header-item__icon')}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m19.5 8.25-7.5 7.5-7.5-7.5'
                  />
                </svg>
              </Popover>
            </li>
            <li className={cx('header-item')}>
              {isAuthenticated && (
                <Popover
                  className={cx('header-item__wrap')}
                  renderProps={
                    <ul className={cx('ppv-info__list')}>
                      <li className={cx('ppv-info__item')}>
                        <Link to='/profile' className={cx('ppv-info__link')}>
                          tài khoản của tôi
                        </Link>
                      </li>
                      <li className={cx('ppv-info__item')}>
                        <Link to='#' className={cx('ppv-info__link')}>
                          đơn mua
                        </Link>
                      </li>
                      <li className={cx('ppv-info__item')}>
                        <button className={cx('ppv-info__link')} onClick={handleLogout}>
                          đăng xuất
                        </button>
                      </li>
                    </ul>
                  }
                >
                  <img
                    src='https://th.bing.com/th/id/OIP.msCrXt053LrpYCkTg4TMhQHaLQ?rs=1&pid=ImgDetMain'
                    alt='Cuc Tinh Y'
                    className={cx('header-item__avatar')}
                  />
                  <span className={cx('header-item__label')}>{profile?.name}</span>
                </Popover>
              )}

              {!isAuthenticated && (
                <div className={cx('header-item__btns-wrap')}>
                  <Link to={path.register} className={cx('header-item__btn')}>
                    đăng ký
                  </Link>
                  <span className={cx('header-item__separate')}></span>
                  <Link to={path.login} className={cx('header-item__btn')}>
                    đăng nhập
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>

        {/* header bottom */}
        <div className={cx('header-bottom')}>
          <div className={cx('row', 'header-bottom__row')}>
            <div className='col-2'>
              <Link to='/'>
                <svg viewBox='0 0 192 65' className={cx('header-logo')}>
                  <g fillRule='evenodd'>
                    <path d='M35.6717403 44.953764c-.3333497 2.7510509-2.0003116 4.9543414-4.5823845 6.0575984-1.4379707.6145919-3.36871.9463856-4.896954.8421628-2.3840266-.0911143-4.6237865-.6708937-6.6883352-1.7307424-.7375522-.3788551-1.8370513-1.1352759-2.6813095-1.8437757-.213839-.1790053-.239235-.2937577-.0977428-.4944671.0764015-.1151823.2172535-.3229831.5286218-.7791994.45158-.6616533.5079208-.7446018.5587128-.8221779.14448-.2217688.3792333-.2411091.6107855-.0588804.0243289.0189105.0243289.0189105.0426824.0333083.0379873.0294402.0379873.0294402.1276204.0990653.0907002.0706996.14448.1123887.166248.1287205 2.2265285 1.7438508 4.8196989 2.7495466 7.4376251 2.8501162 3.6423042-.0496401 6.2615109-1.6873341 6.7308041-4.2020035.5160305-2.7675977-1.6565047-5.1582742-5.9070334-6.4908212-1.329344-.4166762-4.6895175-1.7616869-5.3090528-2.1250697-2.9094471-1.7071043-4.2697358-3.9430584-4.0763845-6.7048539.296216-3.8283059 3.8501677-6.6835796 8.340785-6.702705 2.0082079-.004083 4.0121475.4132378 5.937338 1.2244562.6816382.2873109 1.8987274.9496089 2.3189359 1.2633517.2420093.1777159.2898136.384872.1510957.60836-.0774686.12958-.2055158.3350171-.4754821.7632974l-.0029878.0047276c-.3553311.5640922-.3664286.5817134-.447952.7136572-.140852.2144625-.3064598.2344475-.5604202.0732783-2.0600669-1.3839063-4.3437898-2.0801572-6.8554368-2.130442-3.126914.061889-5.4706057 1.9228561-5.6246892 4.4579402-.0409751 2.2896772 1.676352 3.9613243 5.3858811 5.2358503 7.529819 2.4196871 10.4113092 5.25648 9.869029 9.7292478M26.3725216 5.42669372c4.9022893 0 8.8982174 4.65220288 9.0851664 10.47578358H17.2875686c.186949-5.8235807 4.1828771-10.47578358 9.084953-10.47578358m25.370857 11.57065968c0-.6047069-.4870064-1.0948761-1.0875481-1.0948761h-11.77736c-.28896-7.68927544-5.7774923-13.82058185-12.5059489-13.82058185-6.7282432 0-12.2167755 6.13130641-12.5057355 13.82058185l-11.79421958.0002149c-.59136492.0107446-1.06748731.4968309-1.06748731 1.0946612 0 .0285807.00106706.0569465.00320118.0848825H.99995732l1.6812605 37.0613963c.00021341.1031483.00405483.2071562.01173767.3118087.00170729.0236381.003628.0470614.00554871.0704847l.00362801.0782207.00405483.004083c.25545428 2.5789222 2.12707837 4.6560709 4.67201764 4.7519129l.00576212.0055872h37.4122078c.0177132.0002149.0354264.0004298.0531396.0004298.0177132 0 .0354264-.0002149.0531396-.0004298h.0796027l.0017073-.0015043c2.589329-.0706995 4.6867431-2.1768587 4.9082648-4.787585l.0012805-.0012893.0017073-.0350275c.0021341-.0275062.0040548-.0547975.0057621-.0823037.0040548-.065757.0068292-.1312992.0078963-.1964115l1.8344904-37.207738h-.0012805c.001067-.0186956.0014939-.0376062.0014939-.0565167M176.465457 41.1518926c.720839-2.3512494 2.900423-3.9186779 5.443734-3.9186779 2.427686 0 4.739107 1.6486899 5.537598 3.9141989l.054826.1556978h-11.082664l.046506-.1512188zm13.50267 3.4063683c.014933.0006399.014933.0006399.036906.0008531.021973-.0002132.021973-.0002132.044372-.0008531.53055-.0243144.950595-.4766911.950595-1.0271786 0-.0266606-.000853-.0496953-.00256-.0865936.000427-.0068251.000427-.020262.000427-.0635588 0-5.1926268-4.070748-9.4007319-9.09145-9.4007319-5.020488 0-9.091235 4.2081051-9.091235 9.4007319 0 .3871116.022399.7731567.067838 1.1568557l.00256.0204753.01408.1013102c.250022 1.8683731 1.047233 3.5831812 2.306302 4.9708108-.00064-.0006399.00064.0006399.007253.0078915 1.396026 1.536289 3.291455 2.5833031 5.393601 2.9748936l.02752.0053321v-.0027727l.13653.0228215c.070186.0119439.144211.0236746.243409.039031 2.766879.332724 5.221231-.0661182 7.299484-1.1127057.511777-.2578611.971928-.5423827 1.37064-.8429007.128211-.0968312.243622-.1904632.34346-.2781231.051412-.0452164.092372-.083181.114131-.1051493.468898-.4830897.498124-.6543572.215249-1.0954297-.31146-.4956734-.586228-.9179769-.821744-1.2675504-.082345-.1224254-.154023-.2267215-.214396-.3133151-.033279-.0475624-.033279-.0475624-.054399-.0776356-.008319-.0117306-.008319-.0117306-.013866-.0191956l-.00256-.0038391c-.256208-.3188605-.431565-.3480805-.715933-.0970445-.030292.0268739-.131624.1051493-.14997.1245582-1.999321 1.775381-4.729508 2.3465571-7.455854 1.7760208-.507724-.1362888-.982595-.3094759-1.419919-.5184948-1.708127-.8565509-2.918343-2.3826022-3.267563-4.1490253l-.02752-.1394881h13.754612zM154.831964 41.1518926c.720831-2.3512494 2.900389-3.9186779 5.44367-3.9186779 2.427657 0 4.739052 1.6486899 5.537747 3.9141989l.054612.1556978h-11.082534l.046505-.1512188zm13.502512 3.4063683c.015146.0006399.015146.0006399.037118.0008531.02176-.0002132.02176-.0002132.044159-.0008531.530543-.0243144.950584-.4766911.950584-1.0271786 0-.0266606-.000854-.0496953-.00256-.0865936.000426-.0068251.000426-.020262.000426-.0635588 0-5.1926268-4.070699-9.4007319-9.091342-9.4007319-5.020217 0-9.091343 4.2081051-9.091343 9.4007319 0 .3871116.022826.7731567.068051 1.1568557l.00256.0204753.01408.1013102c.250019 1.8683731 1.04722 3.5831812 2.306274 4.9708108-.00064-.0006399.00064.0006399.007254.0078915 1.396009 1.536289 3.291417 2.5833031 5.393538 2.9748936l.027519.0053321v-.0027727l.136529.0228215c.070184.0119439.144209.0236746.243619.039031 2.766847.332724 5.22117-.0661182 7.299185-1.1127057.511771-.2578611.971917-.5423827 1.370624-.8429007.128209-.0968312.243619-.1904632.343456-.2781231.051412-.0452164.09237-.083181.11413-.1051493.468892-.4830897.498118-.6543572.215246-1.0954297-.311457-.4956734-.586221-.9179769-.821734-1.2675504-.082344-.1224254-.154022-.2267215-.21418-.3133151-.033492-.0475624-.033492-.0475624-.054612-.0776356-.008319-.0117306-.008319-.0117306-.013866-.0191956l-.002346-.0038391c-.256419-.3188605-.431774-.3480805-.716138-.0970445-.030292.0268739-.131623.1051493-.149969.1245582-1.999084 1.775381-4.729452 2.3465571-7.455767 1.7760208-.507717-.1362888-.982582-.3094759-1.419902-.5184948-1.708107-.8565509-2.918095-2.3826022-3.267311-4.1490253l-.027733-.1394881h13.754451zM138.32144123 49.7357905c-3.38129629 0-6.14681004-2.6808521-6.23169343-6.04042014v-.31621743c.08401943-3.35418649 2.85039714-6.03546919 6.23169343-6.03546919 3.44242097 0 6.23320537 2.7740599 6.23320537 6.1960534 0 3.42199346-2.7907844 6.19605336-6.23320537 6.19605336m.00172791-15.67913203c-2.21776751 0-4.33682838.7553485-6.03989586 2.140764l-.19352548.1573553V34.6208558c0-.4623792-.0993546-.56419733-.56740117-.56419733h-2.17651376c-.47409424 0-.56761716.09428403-.56761716.56419733v27.6400724c0 .4539841.10583425.5641973.56761716.5641973h2.17651376c.46351081 0 .56740117-.1078454.56740117-.5641973V50.734168l.19352548.1573553c1.70328347 1.3856307 3.82234434 2.1409792 6.03989586 2.1409792 5.27140956 0 9.54473746-4.2479474 9.54473746-9.48802964 0-5.239867-4.2733279-9.48781439-9.54473746-9.48781439M115.907646 49.5240292c-3.449458 0-6.245805-2.7496948-6.245805-6.1425854 0-3.3928907 2.79656-6.1427988 6.245805-6.1427988 3.448821 0 6.24538 2.7499081 6.24538 6.1427988 0 3.3926772-2.796346 6.1425854-6.24538 6.1425854m.001914-15.5438312c-5.28187 0-9.563025 4.2112903-9.563025 9.4059406 0 5.1944369 4.281155 9.4059406 9.563025 9.4059406 5.281657 0 9.562387-4.2115037 9.562387-9.4059406 0-5.1946503-4.280517-9.4059406-9.562387-9.4059406M94.5919049 34.1890939c-1.9281307 0-3.7938902.6198995-5.3417715 1.7656047l-.188189.1393105V23.2574169c0-.4254677-.1395825-.5643476-.5649971-.5643476h-2.2782698c-.4600414 0-.5652122.1100273-.5652122.5643476v29.2834155c0 .443339.1135587.5647782.5652122.5647782h2.2782698c.4226187 0 .5649971-.1457701.5649971-.5647782v-9.5648406c.023658-3.011002 2.4931278-5.4412923 5.5299605-5.4412923 3.0445753 0 5.516841 2.4421328 5.5297454 5.4630394v9.5430935c0 .4844647.0806524.5645628.5652122.5645628h2.2726775c.481764 0 .565212-.0824666.565212-.5645628v-9.5710848c-.018066-4.8280677-4.0440197-8.7806537-8.9328471-8.7806537M62.8459442 47.7938061l-.0053397.0081519c-.3248668.4921188-.4609221.6991347-.5369593.8179812-.2560916.3812097-.224267.551113.1668119.8816949.91266.7358184 2.0858968 1.508535 2.8774525 1.8955369 2.2023021 1.076912 4.5810275 1.646045 7.1017886 1.6975309 1.6283921.0821628 3.6734936-.3050536 5.1963734-.9842376 2.7569891-1.2298679 4.5131066-3.6269626 4.8208863-6.5794607.4985136-4.7841067-2.6143125-7.7747902-10.6321784-10.1849709l-.0021359-.0006435c-3.7356476-1.2047686-5.4904836-2.8064071-5.4911243-5.0426086.1099976-2.4715346 2.4015793-4.3179454 5.4932602-4.4331449 2.4904317.0062212 4.6923065.6675996 6.8557356 2.0598624.4562232.2767364.666607.2256796.9733188-.172263.035242-.0587797.1332787-.2012238.543367-.790093l.0012815-.0019308c.3829626-.5500403.5089793-.7336731.5403767-.7879478.258441-.4863266.2214903-.6738208-.244985-1.0046173-.459427-.3290803-1.7535544-1.0024722-2.4936356-1.2978721-2.0583439-.8211991-4.1863175-1.2199998-6.3042524-1.1788111-4.8198184.1046878-8.578747 3.2393171-8.8265087 7.3515337-.1572005 2.9703036 1.350301 5.3588174 4.5000778 7.124567.8829712.4661613 4.1115618 1.6865902 5.6184225 2.1278667 4.2847814 1.2547527 6.5186944 3.5630343 6.0571315 6.2864205-.4192725 2.4743234-3.0117991 4.1199394-6.6498372 4.2325647-2.6382344-.0549182-5.2963324-1.0217793-7.6043603-2.7562084-.0115337-.0083664-.0700567-.0519149-.1779185-.1323615-.1516472-.1130543-.1516472-.1130543-.1742875-.1300017-.4705335-.3247898-.7473431-.2977598-1.0346184.1302162-.0346012.0529875-.3919333.5963776-.5681431.8632459' />
                  </g>
                </svg>
              </Link>
            </div>
            {/* search bar */}
            <div className='col-9'>
              <form role='search' className={cx('header-search')} onSubmit={handleSubmitSearch}>
                <input
                  type='text'
                  placeholder='ADIAS SĂN VOUCHER 1.000.000Đ'
                  className={cx('header-search__input')}
                  {...register('name')}
                />
                <button className={cx('header-search__btn')} type='submit'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className={cx('header-search__icon')}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                    />
                  </svg>
                </button>
              </form>
            </div>
            <div className='col-1'>
              {/* cart */}
              <Popover
                className={cx('header-cart__inner')}
                offsetFloating={4}
                renderProps={
                  <section className={cx('ppv-cart__wrap')}>
                    <h3 className={cx('ppv-cart__label')}> sản phẩm mới thêm</h3>

                    <ul className={cx('ppv-cart__list')}>
                      <li className={'ppv-cart__item'}>
                        <Link to='#' className={cx('ppv-cart__link')}>
                          <img
                            src='https://th.bing.com/th/id/OIP.1stZchbFroBGsSJ3jrAHVgHaE7?w=237&h=180&c=7&r=0&o=5&pid=1.7'
                            alt='ducati'
                            className={cx('ppv-cart__img')}
                          />
                          <p className={cx('ppv-cart__name')}>Super Car vip pro beautiful</p>
                          <p className={cx('ppv-cart__price')}>đ 1.555.555</p>
                        </Link>
                      </li>

                      <li className={'ppv-cart__item'}>
                        <Link to='#' className={cx('ppv-cart__link')}>
                          <img
                            src='data:image/jpeg;base64,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'
                            alt='ducati'
                            className={cx('ppv-cart__img')}
                          />
                          <p className={cx('ppv-cart__name')}>Super Car vip pro beautiful</p>
                          <p className={cx('ppv-cart__price')}>đ 1.555.555</p>
                        </Link>
                      </li>

                      <li className={'ppv-cart__item'}>
                        <Link to='#' className={cx('ppv-cart__link')}>
                          <img
                            src='https://th.bing.com/th/id/OIP.AmfsCNi0NPKeKCUetE5UDgHaEo?w=254&h=180&c=7&r=0&o=5&pid=1.7'
                            alt='ducati'
                            className={cx('ppv-cart__img')}
                          />
                          <p className={cx('ppv-cart__name')}>Super Car vip pro beautiful</p>
                          <p className={cx('ppv-cart__price')}>đ 1.555.555</p>
                        </Link>
                      </li>
                    </ul>

                    <div className={cx('ppv-cart__button')}>
                      <button className={cx('ppv-cart__btn')}>Xem giỏ hàng</button>
                    </div>
                  </section>
                }
              >
                <Link to='#' className={cx('header-cart__link')}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className={cx('header-icon__cart')}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                    />
                  </svg>
                </Link>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
