// Components
import { Skeleton } from "@/components/ui/skeleton";

// The TaskCardSkeleton Component acts as a loading component for fetching task card.
const TaskCardSkeleton = () => {
  return (
    <div className="flex gap-4 items-center border-b pt-2 pb-4">
      <Skeleton className="w-5 h-5 rounded-full" />
      <Skeleton className="w-full h-3 me-10" />
    </div>
  );
};

export default TaskCardSkeleton;
