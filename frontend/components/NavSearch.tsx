import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

interface IProps {
    className: string
}

function NavSearch({ className }: IProps) {
    return (
        <div className={`${className} border border-gray-200 border-1 rounded-sm flex`}>
            <input
                className="bg-transparent p-2 w-full placeholder:text-gray-400 border-none outline-none text-gray-200"
                placeholder="What are you looking for today?"
            />
            <MagnifyingGlassIcon className="w-6 mr-4 text-gray-400"/>
        </div>
    )
}

export default NavSearch;