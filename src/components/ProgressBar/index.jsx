import { Progress, Flex } from 'antd';


const ProgressBar = () => {
  return (
    <div>

      <Flex vertical className="w-full">
        <Progress
          percent={20}
          showInfo={false}
          className="bg-background rounded h-[6px]"
          strokeColor="#ffffff"
        />
      </Flex>

    </div>
  )
}

export default ProgressBar