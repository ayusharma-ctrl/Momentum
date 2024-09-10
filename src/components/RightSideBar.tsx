
import Bullet from "./common/Bullet"
import { useEffect, useState } from "react";
import { databases, dependencies } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import CheckBox from "./common/CheckBox";
import { Input } from "./ui/input";


const RightSideBar = () => {
    const [dependencyStates, setDependencyStates] = useState(dependencies);

    const [databaseStates, setDatabaseStates] = useState(databases);

    const [isMockDatabase, setIsMockDatabase] = useState<boolean>(false);

    const toggleDependencies = (id: number) => {
        setDependencyStates(prev =>
            prev.map(state =>
                state.id === id ? { ...state, isChecked: !state.isChecked } : state
            )
        );
    };

    const toggleDatabases = (id: number) => {
        setDatabaseStates(prev =>
            prev.map(state =>
                state.id === id ? { ...state, isChecked: !state.isChecked } : state
            )
        );
    };

    useEffect(() => {
        const isMockDatabase = databaseStates.find((item) => item.id = 1);
        if (isMockDatabase) {
            setIsMockDatabase(isMockDatabase?.isChecked);
        }
    }, [databaseStates]);


    return (
        <div className="p-2 mb-16 overflow-y-auto border-t flex flex-col gap-4 bg-[#363636] text-white">

            <p className="font-bold text-xl leading-6">cart_campaign</p>

            <div>
                <Bullet text="Last 2 commits scanned" />
                <Bullet text="5 entry points identified" />
            </div>

            <div>
                <span>Selected flow</span>
                <Select defaultValue={'1'}>
                    <SelectTrigger className="w-full border border-[#D9D9D9] rounded-sm my-2 px-2 py-1 text-start flex justify-between items-center">
                        <SelectValue placeholder="Select flow" />
                    </SelectTrigger>
                    <SelectContent className="border border-[#D9D9D9] rounded-sm cursor-pointer">
                        <SelectItem value="1" className="p-2">{`POST /carts/{carts_id}`}</SelectItem>
                        <SelectItem value="2" className="p-2">{`POST /page/{page_id}`}</SelectItem>
                        <SelectItem value="3" className="p-2">{`POST /item/{item_id}`}</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="my-2 flex flex-col gap-2">
                <span className="font-medium text-base leading-5">Dependencies</span>
                <p className="text-sm leading-4 font-light">Select the ones you want to mock</p>

                {dependencyStates.map((item, index) =>
                    <CheckBox key={index} id={item.id} isChecked={item.isChecked} label={item.label} handleOnChange={toggleDependencies} isIcon={true} />
                )}
            </div>

            <div className="my-2 flex flex-col gap-2">
                <span className="font-medium text-base leading-5">Databases</span>
                <p className="text-sm leading-4 font-light">Select if you want to mock databases</p>
                {databaseStates.map((item, index) =>
                    <CheckBox key={index} id={item.id} isChecked={item.isChecked} label={item.label} handleOnChange={toggleDatabases} />
                )}
            </div>


            <span>Database Configurations</span>
            <Input disabled={isMockDatabase ? true : false} type="text" placeholder="Database User" />
            <Input disabled={isMockDatabase ? true : false} type="text" placeholder="Database Password" />
            <Input disabled={isMockDatabase ? true : false} type="text" placeholder="Database Hostname" />
        </div>
    )
}

export default RightSideBar