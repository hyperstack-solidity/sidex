"use client";

import { motion } from "motion/react";

export function AmbientBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Top Center White Glow (Light Leak) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.12, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[150vw] h-[50vh] md:w-[80vw] md:h-[60vh] rounded-[100%] bg-white blur-[80px] md:blur-[140px] mix-blend-screen"
            />
        </div>
    );
}
