
const ContributionCardSkeleton = () => (
    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 shadow-sm animate-pulse">
        <div className="flex items-center justify-between space-x-4">
            {/* Repo Info */}
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div> {/* Title */}
                <div className="flex gap-2 items-center">
                    <div className="w-4 h-4 bg-gray-200 rounded-full"></div> {/* Icon */}
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div> {/* Repo Name */}
                    <div className="h-4 bg-gray-200 rounded-full w-16"></div> {/* Status Badge */}
                </div>
            </div>
            {/* Action Button/Link */}
            <div className="h-8 w-16 bg-gray-200 rounded-lg shrink-0"></div>
        </div>
    </div>
);

const ProfileSkeleton = () => (
    <div className="min-h-screen bg-gray-50/50">
        <div className="container py-8 space-y-8 px-10 max-w-7xl mx-auto">
            {/* User Profile Card Skeleton */}
            <div className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    {/* Avatar */}
                    <div className="h-24 w-24 bg-gray-300 rounded-full shrink-0"></div>

                    <div className="flex-1 space-y-4">
                        {/* Name and Metadata Group */}
                        <div className="space-y-3">
                            {/* Card Title (Name) */}
                            <div className="h-9 w-64 bg-gray-300 rounded"></div>
                            
                            {/* Card Description (Metadata) */}
                            <div className="flex flex-wrap items-center gap-4 mt-2">
                                {/* Email */}
                                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                                {/* Github */}
                                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                {/* Joined Date */}
                                <div className="h-4 w-48 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-6 md:gap-8 shrink-0">
                        {/* Contributions Stat */}
                        <div className="text-center space-y-1">
                            <div className="h-6 w-10 bg-gray-300 rounded mx-auto"></div>
                            <div className="h-3 w-20 bg-gray-200 rounded"></div>
                        </div>
                        {/* Completed Stat */}
                        <div className="text-center space-y-1">
                            <div className="h-6 w-10 bg-green-200 rounded mx-auto"></div>
                            <div className="h-3 w-20 bg-gray-200 rounded"></div>
                        </div>
                        {/* Bookmarked Stat */}
                        <div className="text-center space-y-1">
                            <div className="h-6 w-10 bg-gray-300 rounded mx-auto"></div>
                            <div className="h-3 w-20 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs for Bookmarks and Contributions Skeleton */}
            <div className="space-y-6">
                {/* TabsList */}
                {/* Mimics the grid layout of the TabsList */}
                <div className="grid w-full max-w-md grid-cols-2 h-10 rounded-lg animate-pulse">
                    <div className="bg-white rounded-l-lg m-1"></div>
                    <div className="bg-white rounded-r-lg m-1"></div>
                </div>

                {/* TabsContent (Simulating Contributions Tab being visible) */}
                <div className="space-y-4">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        {/* Card Header */}
                        <div className="flex items-center space-y-1 mb-4 animate-pulse">
                            <div className="h-6 w-48 bg-gray-300 rounded"></div> {/* Card Title */}
                        </div>
                        
                        {/* Status Bubbles/Description */}
                        <div className="flex flex-wrap gap-4 text-xs mb-6 animate-pulse">
                            <div className="h-4 w-40 bg-gray-200 rounded"></div>
                            <div className="flex gap-3">
                                {/* Completed Status */}
                                <div className="h-4 w-20 bg-green-100 rounded-full"></div>
                                {/* In Progress Status */}
                                <div className="h-4 w-24 bg-yellow-100 rounded-full"></div>
                                {/* Pending Status */}
                                <div className="h-4 w-20 bg-blue-100 rounded-full"></div>
                            </div>
                        </div>

                        {/* Contribution Cards List */}
                        <div className="grid gap-4">
                            <ContributionCardSkeleton />
                            <ContributionCardSkeleton />
                            <ContributionCardSkeleton />
                            <ContributionCardSkeleton />
                            <ContributionCardSkeleton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default ProfileSkeleton;