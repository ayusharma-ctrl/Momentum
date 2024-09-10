import infoIcon from '/info.svg'

interface IProps {
  text: string
}

const Bullet: React.FC<IProps> = ({ text }) => {
  return (
    <div className='flex justify-start items-center gap-2'>
      <img src={infoIcon} alt="info" />
      <span className='font-medium text-base leading-5'>{text}</span>
    </div>
  )
}

export default Bullet