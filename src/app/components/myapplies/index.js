import MyApplyCard from "./myApply/myApply";

export default function MyApplies({ applies }) {
  const showApplies = applies.map((item) => (
    <MyApplyCard key={item.id} item={item} />
  ));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {showApplies}
    </div>
  );
}
