const Icon = (props) => {
    const { size = 24, fill = "white", ...rest } = props

    return (
        <svg
            height={size}
            width={size}
            fill={fill}
            {...rest}
        >
            {props.children}
        </svg>
    )
}

export default Icon