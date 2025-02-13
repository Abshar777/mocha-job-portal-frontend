import { Spinner } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@heroui/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
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
  disabled?: boolean;
  link?: string;
  onClick?: () => void;
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
  disabled = false,
  onClick,
  link,
}: Props) => {
  return (
    <Button
      disabled={disabled}
      isLoading={isLoading}
      type={type}
      color={color}
      size={size}
      onPress={onClick}
      className={cn(
        "w-full font-semibold disabled:cursor-not-allowed disabled:opacity-50 hover:disabled:opacity-50 text-secondary rounded-2xl",
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
            {link ? <Link className="no-underline" href={link}>{text}</Link> : text}
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
