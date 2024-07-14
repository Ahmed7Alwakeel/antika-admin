import { useMemo } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function FormSkeleton({ withoutDescription, featuredSections }: any) {
  const featuredSectionsElements = useMemo(() => {
    let elements = [];
    for (let i = 0; i < featuredSections; i++) {
      elements.push(<Skeleton className="skeleton_update_info featured" />)
    }
    return elements;
  }, [featuredSections])

  return (
    <div>
      <SkeletonTheme baseColor="#d4d4d4" highlightColor="#e9e9e9">
        <div className="skeleton_flex">
          <div className="skeleton skeleton_w-100">
            <div className="skeleton_flex">
              <div className="skeleton_w-100">
                <Skeleton className="skeleton_input-title" />
                <Skeleton className="skeleton_image skeleton_w-100" />
              </div>
              <div className="skeleton_w-100">
                <Skeleton className="skeleton_input-title" />
                <Skeleton className="skeleton_image skeleton_w-100" />
              </div>
            </div>
            <Skeleton className="skeleton_title" />
            <div className="skeleton_flex">
              <div className="skeleton_w-100">
                <Skeleton className="skeleton_input-title" />
                <Skeleton className="skeleton_input skeleton_w-100" />
              </div>
              <div className="skeleton_w-100">
                <Skeleton className="skeleton_input-title" />
                <Skeleton className="skeleton_input skeleton_w-100" />
              </div>
            </div>
            <Skeleton className="skeleton_title" />
            <div className="skeleton_flex">
              <div className="skeleton_w-100">
                <Skeleton className="skeleton_input-title" />
                <Skeleton className="skeleton_input skeleton_w-100" />
              </div>
              <div className="skeleton_w-100">
                <Skeleton className="skeleton_input-title" />
                <Skeleton className="skeleton_input skeleton_w-100" />
              </div>
            </div>
          </div>
        </div>
      </SkeletonTheme>
    </div>
  );
}
