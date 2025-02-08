import { Spinner } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@heroui/react";
import { cn } from "@/lib/utils";
interface Props {
  isLoading: boolean;
  text: string;
  loadingText?: string;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
  size?: "sm" | "md" | "lg" | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  spinner?: React.JSX.Element;
}

const AnimatedButton = ({
  isLoading,
  text,
  loadingText = "Loading",
  color = "primary",
  size = "lg",
  className,
  type = "button",
  spinner = <Spinner size="sm" color="secondary" />,
}: Props) => {
  return (
    <Button

      isLoading={isLoading}
      type={type}
      color={color}
      size={size}

      className={cn(
        "w-full font-semibold text-secondary rounded-2xl",
        className
      )}
      spinner={null}
    >
      <AnimatePresence mode="wait">
        {!isLoading ? (
          <motion.p
            key="text"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {text}
          </motion.p>
        ) : (
          <motion.div
            key="loading"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center gap-2"
          >
            {loadingText}
            {spinner}
          </motion.div>

        )}
      </AnimatePresence>
    </Button>
  );
};

export default AnimatedButton;
