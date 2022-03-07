export const DropdownList = (props) => {

    const {
        items,
        value,
        onChange
    } = props

    return (
        <select value={value} onChange={onChange} className="form-select">
            {items && items.map(item => (
                <option key={item.value} value={item.value}>{item.text}</option>
            ))}
        </select>
    )

}