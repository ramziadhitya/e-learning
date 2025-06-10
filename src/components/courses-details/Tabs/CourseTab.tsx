// components/CourseDetails/Tabs/CourseTab.tsx
type CourseTabProps = {
    description: any;
};

const CourseTab = ({ description }: CourseTabProps) => {
    return (
        <div>
            <h3>Description</h3>
            {Array.isArray(description) ? (
                description.map((block: any, i: number) => (
                    <p key={i}>{block.children?.[0]?.text || ""}</p>
                ))
            ) : (
                <p>{description}</p>
            )}
        </div>
    );
};

export default CourseTab;
