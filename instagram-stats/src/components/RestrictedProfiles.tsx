interface ComponentProps{
    title?: string;
}

export const ComponentProps: React.FC<ComponentProps> = ({title}) => {
    return (
        <div>
            <p>{title ? title : null}</p>
        </div>
    )
}