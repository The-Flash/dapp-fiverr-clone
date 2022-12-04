import { ICategory } from "../utils/types";
import CategoryNav from "./CategoryNav";
import HeaderNav from "./HeaderNav";
import Logo from "./Logo";
import NavSearch from "./NavSearch";

interface IProps {
    categories: ICategory[]
}

function Header({ categories }: IProps) {
    return (
        <div className="py-2 px-8 space-y-4">
            <div className="flex items-center">
                <Logo />
                <NavSearch className="mx-8 w-full" />
                <HeaderNav />
            </div>
            <CategoryNav categories={categories} />
        </div>
    )
}

export default Header;