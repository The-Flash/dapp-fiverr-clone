import Link from "next/link";
import { ICategory } from "../utils/types";

interface IProps {
    categories: ICategory[]
}

function CategoryNav({ categories }: IProps) {
    return (
        <nav className="text-gray-200">
            <ul className="flex justify-between">
                {categories.map((category) => (
                    <li key={category.slug}>
                        <Link href={`/${category.slug}`}>
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default CategoryNav;