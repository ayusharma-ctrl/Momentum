import Icon from './Icon'
import Logo from '/logo.svg'

const Header = () => {
    return (
        <div className="z-50 px-4 py-2 w-full flex justify-start items-start gap-8 bg-[#363636] text-white">
            <Icon src={Logo} alt='logo' style='h-7 w-9'/>
            <div className='font-medium text-base leading-5'>
                Configure Flows
            </div>
        </div>
    )
}

export default Header