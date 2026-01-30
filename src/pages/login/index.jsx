import Header from '../../layout/header'
import { Progress, Flex } from 'antd';

const Login = () => {
  return (
    <div className="bg-background">
      <div>
          <Header/>
      </div>
      <div className='w-[994px] h-[822px] flex justify-center items-center'>
        <div className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-full'>
          <div>
            <p className='text-white'>İş istiqamətinin müəyyən edilməsi</p>
            <p className='text-white'>Addım 1/5</p>
          </div>
          <div>
            <Flex gap="small" vertical>
              <Progress percent={30} />
            </Flex>
          </div>
        </div>

        <div>
          <div>
            <p>Şəxsi məlumatlar</p>
            <p>Zəhmət olmasa məlumatlarınızı düzgün daxil edin</p>
          </div>
          <div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login