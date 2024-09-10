
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { databases, dependencies, flows } from "@/lib/utils";
import Bullet from "./common/Bullet"
import CheckBox from "./common/CheckBox";


const RightSideBar = () => {

    // Note: we are rendering the dummy data - not making any api call here 

    const [dependencyStates, setDependencyStates] = useState(dependencies);

    const [databaseStates, setDatabaseStates] = useState(databases);

    const [flow, setFlow] = useState<string>("");

    const [isMockDatabase, setIsMockDatabase] = useState<boolean>(false);

    // update the dependencies state
    const toggleDependencies = (id: number) => {
        setDependencyStates(prev =>
            prev.map(state =>
                state.id === id ? { ...state, isChecked: !state.isChecked } : state
            )
        );
    };

    // update the database preference state
    const toggleDatabases = () => {
        setDatabaseStates(prev =>
            prev.map(state => ({ ...state, isChecked: !state.isChecked }))
        );
    };

    // check for user's database preference
    useEffect(() => {
        if (databaseStates && databaseStates?.length) {
            setIsMockDatabase(databaseStates[0]?.isChecked);
        }
    }, [databaseStates]);

    // update the flow state on initial app load
    useEffect(() => {
        const checkedSelectedFlow = async () => {
            if (flows && flows.length) {
                const enabledFlow = flows.filter((item) => item.isEnabled === true);
                if (enabledFlow) setFlow(enabledFlow[0].label);
            }
        }
        checkedSelectedFlow();
    }, [flows]);

    return (
        <div className="p-2 overflow-y-auto border-t flex flex-col gap-4 bg-[#363636] text-white pb-16">

            <p className="font-bold text-xl leading-6">cart_campaign</p>

            <div>
                <Bullet text="Last 2 commits scanned" />
                <Bullet text="5 entry points identified" />
            </div>

            {/* allow user to select the flow */}
            <div>
                <span>Selected flow</span>
                <Select value={flow} onValueChange={(value) => setFlow(value)}>
                    <SelectTrigger className="w-full border border-[#D9D9D9] rounded-sm my-2 px-2 py-1 text-start flex justify-between items-center">
                        <SelectValue placeholder="Select flow" />
                    </SelectTrigger>
                    <SelectContent className="border border-[#D9D9D9] rounded-sm cursor-pointer">
                        {
                            flows && flows.length && flows.map((flow, idx) =>
                                <SelectItem key={idx} value={flow.label} className="p-2">{flow.label}</SelectItem>)
                        }
                    </SelectContent>
                </Select>
            </div>
            
            {/* handle dependencies set by the user */}
            <div className="my-2 flex flex-col gap-2">
                <span className="font-medium text-base leading-5">Dependencies</span>
                <p className="text-sm leading-4 font-light">Select the ones you want to mock</p>
                {dependencyStates.map((item, index) =>
                    <CheckBox key={`${index}_${item.label}`} id={item.id} isChecked={item.isChecked} label={item.label} handleOnChange={toggleDependencies} isIcon={true} />
                )}
            </div>

            {/* handling database connection checkboxes */}
            <div className="my-2 flex flex-col gap-2">
                <span className="font-medium text-base leading-5">Databases</span>
                <p className="text-sm leading-4 font-light">Select if you want to mock databases</p>
                {databaseStates.map((item, index) =>
                    <CheckBox key={`${index}_${item.label}`} id={item.id} isChecked={item.isChecked} label={item.label} handleOnChange={toggleDatabases} />
                )}
            </div>

            {/* we can use a json array here to manage states and render input fields */}
            <span>Database Configurations</span>
            <Input disabled={isMockDatabase ? true : false} type="text" placeholder="Database User" className="py-2" />
            <Input disabled={isMockDatabase ? true : false} type="text" placeholder="Database Password" className="py-2" />
            <Input disabled={isMockDatabase ? true : false} type="text" placeholder="Database Hostname" className="py-2" />

            {/* write onClick method for error validation and call the post request */}
            <Button className="bg-[#009FF9] text-white rounded hover:bg-opacity-80 transition-colors duration-200">
                Save
            </Button>

        </div>
    )
}

export default RightSideBar