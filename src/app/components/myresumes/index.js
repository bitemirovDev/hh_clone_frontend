import MyResumeCard from "./myResume";

export default function MyResumesArray({ resumes }) {
  const showResumes = resumes.map((item) => (
    <MyResumeCard key={item.position} item={item} />
  ));

  return <div>{showResumes}</div>;
}
