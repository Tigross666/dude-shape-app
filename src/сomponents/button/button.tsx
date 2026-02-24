
/**
 * Это называется интерфейс, он используется для описания типов. 
 * В данном случае описываем типы пропсов, которые принимает Button 
 * name? - вопросительный знак означает что пропс опциональный (неоязательный)
 */
interface ButtonProps {
    name?: string
}

export const Button = ({ name = 'Tigran' }: ButtonProps) => {
    return (
        <button>
            {name}
        </button>
    )
}