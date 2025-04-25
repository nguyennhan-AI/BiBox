"use client";
import * as motion from "motion/react-client";
import { PaymentDialog } from "./PaymentDialog";

export default function PlusButton() {
  return (
    <motion.div
      initial={{ scale: 1, rotate: 0, borderRadius: "30%" }}
      animate={{ scale: 1, rotate: 0, borderRadius: "30%" }}
      whileHover={{
        scale: 1.5,
        rotate: 180,
        borderRadius: "50%",
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      }}
      style={box}
    >
      <PaymentDialog />
    </motion.div>
  );
}

/**
 * ==============   Styles   ================
 */
const box = {
  width: 30,
  height: 30,
  backgroundColor: "black",
  borderRadius: 3,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
