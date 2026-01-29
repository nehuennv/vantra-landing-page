import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const variantStyles = {
    primary: "bg-vantra text-[color:var(--product-on-primary,#18181b)] font-bold hover:bg-white hover:text-black",
    secondary: "bg-dark-base/50 text-white border border-white/10 hover:bg-dark-base hover:border-vantra/50",
    ghost: "bg-transparent text-white/70 hover:text-vantra hover:bg-white/5",
    outline: "border border-vantra text-vantra hover:bg-vantra hover:text-dark-900",
};

const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
};

export default function Button({
    children,
    variant = "primary",
    size = "md",
    className,
    onClick,
    ...props
}) {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "rounded-2xl transition-all duration-300 flex items-center justify-center gap-2",
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
            onClick={onClick}
            {...props}
        >
            {children}
        </motion.button>
    );
}
