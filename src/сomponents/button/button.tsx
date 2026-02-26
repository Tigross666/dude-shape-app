import styles from "./button.module.css"

interface ButtonProps {
    name?: string
    size: 'small' | 'medium' | 'large' 
    presets: 'dark' | 'light'
    
}

export const Button = ({ name, size, presets }: ButtonProps) => {
    return (
        <button className={`${styles.root} ${styles[size]} ${presets ? styles[presets] : ''}`}>
            {name}
        </button>
    )
}