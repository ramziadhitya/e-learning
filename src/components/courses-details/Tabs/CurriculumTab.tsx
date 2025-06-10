// components/CourseDetails/Tabs/CurriculumTab.tsx
const API_URL = import.meta.env.VITE_API_URL;

type CurriculumTabProps = {
    videos: any[];
};

const CurriculumTab = ({ videos }: CurriculumTabProps) => {
    return (
        <div>
            <h3>Course Curriculum</h3>
            {Array.isArray(videos) && videos.length > 0 ? (
                videos.map((vid: any, idx: number) => (
                    <video
                        key={idx}
                        controls
                        className="w-100 rounded my-3"
                        src={`${API_URL}${vid.url}`}
                        preload="metadata"
                    />
                ))
            ) : (
                <p className="text-muted">No video available.</p>
            )}
        </div>
    );
};

export default CurriculumTab;
