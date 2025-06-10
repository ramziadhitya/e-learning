import { useEffect, useState } from "react";

type CourseTabProps = {
    description: any;
};

const CourseTab = ({ description }: CourseTabProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // delay render agar tidak langsung melonjak
        const timeout = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div style={{ minHeight: "300px", transition: "min-height 0.3s ease" }}>
            <h3>Description</h3>
            {!isLoaded ? (
                <div className="placeholder-glow">
                    <p className="placeholder col-12"></p>
                    <p className="placeholder col-10"></p>
                    <p className="placeholder col-6"></p>
                </div>
            ) : Array.isArray(description) ? (
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