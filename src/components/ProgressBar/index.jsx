import { Progress, Flex } from 'antd';


const ProgressBar = ({percent}) => {
  return (
    <div>

      <Flex vertical className="w-full">
        <Progress
          percent={percent}
          showInfo={false}
          className="bg-background rounded h-[6px]"
          strokeColor="#ffffff"
        />
      </Flex>

    </div>
  )
}

export default ProgressBar