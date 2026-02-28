import type { ReactNode } from "react"
import styles from "./button.module.css"


interface ButtonProps {
    children: ReactNode
    size?: 'small' | 'medium' | 'large' 
    presets?: 'dark' | 'light'
    
}

export const Button = ({ children, size='small', presets='light' }: ButtonProps) => {
    return (
        <button className={`${styles.root} ${styles[size]} ${styles[presets]}`}>
            {children}
        </button>
    )
}