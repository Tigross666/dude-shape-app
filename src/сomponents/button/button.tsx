
/**
 * Это называется интерфейс, он используется для описания типов. 
 * В данном случае описываем типы пропсов, которые принимает Button 
 * name? - вопросительный знак означает что пропс опциональный (неоязательный)
 */
interface ButtonProps {
    name?: string
    className?: string
}

export const Button = ({ name = 'Explore more', className }: ButtonProps) => {
    return (
        <button className={className}>
            {name}
        </button>
    )
}