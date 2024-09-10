import Icon from "./Icon"
import hamburgerIcon from '/hamburger.svg'
import timeIcon from '/time.svg'
import stackIcon from '/stack.svg'
import forkIcon from '/fork.svg'
import userIcon from '/user.svg'

const LeftSideBar = () => {
    return (
        <div className="px-5 py-6 bg-[#363636] text-white">
            <div className="flex flex-col gap-6">
                <Icon src={hamburgerIcon} alt='hamburger' style='h-6 w-6' />
                <Icon src={timeIcon} alt='time' style='h-6 w-6' />
                <Icon src={stackIcon} alt='stack' style='h-6 w-6' />
                <Icon src={forkIcon} alt='fork' style='h-6 w-6' />
            </div>
            <div className="fixed bottom-2">
                <Icon src={userIcon} alt='logo' style='h-6 w-6' />
            </div>
        </div>
    )
}

export default LeftSideBar