import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export default function Card({ children, className, hover = true, ...props }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={hover ? { y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)" } : {}}
            className={cn(
                "relative overflow-hidden rounded-3xl",
                // CAPA 2: CONTENCIÓN GLASS
                "bg-[#0A0A0B]/60", // Negro al 60%
                "backdrop-blur-xl", // Vidrio ahumado
                "border border-white/[0.08]", // Borde sutil
                className
            )}
            {...props}
        >
            {/* NOISE TEXTURE (Opacity 0.03) */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay"></div>

            {/* CONTENIDO */}
            <div className="relative z-10 h-full">
                {children}
            </div>

            {/* HOVER GLOW EFFECT (Subtle) */}
            {hover && (
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.03),transparent_70%)]" />
            )}
        </motion.div>
    );
}