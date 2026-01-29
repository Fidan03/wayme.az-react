import logo from '../../assets/logo.png'

const Login = () => {
  return (
    <div className='bg-background w-full pt-5'>
        <div className="max-w-7xl mx-auto h-100% flex justify-between items-center px-4">
            <div className='logo flex items-center justify-center'>
                <img src={logo} alt="logo" className='h-17 w-39.5'/>
            </div>
            <div className="inline-block p-[2px] rounded-[10px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                <button className="bg-background text-white font-semibold text-[20px] px-5 py-2.5 rounded-[8px] cursor-pointer">
                    Testi Dayandır
                </button>
            </div>
        </div>
    </div>
  )
}

export default Login