import { Skeleton } from "@/components/ui/skeleton";
const Authloading = () => {
  return (
    <div className="flex h-lvh md:h-lvh items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-5 text-start">
          <Skeleton   className="h-8 bg-[#7c694321] w-[50%] rounded-full" />
          <Skeleton className="h-8 bg-[#7c694321] w-[30%] rounded-full" />
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Skeleton className="h-10 w-full bg-[#7c694321] rounded-full" />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">

              <Skeleton className="h-10 w-full bg-[#7c694321] rounded-full" />
            </div>
          </div>
          <Skeleton className="h-10 w-[50%] bg-[#7c694321] rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Authloading;
