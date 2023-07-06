import { ITableSortDirection, ITableSortIcon } from "../../../../../interfaces"
import SortIconNumber from "../SortIconNumber/SortIconNumber"
import SortIconText from "../SortIconText/SortIconText"

interface IProps {
    iconType: ITableSortIcon
    sortDirection: ITableSortDirection
}

const SortIconPicker = ({ iconType, sortDirection }: IProps) => {
    
    switch (iconType) {
        case 'sortNumber':
            return <SortIconNumber sortDirection={sortDirection} />
        case 'sortText':
            return <SortIconText sortDirection={sortDirection}/>
    }

}

export default SortIconPicker