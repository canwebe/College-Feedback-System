import './skeleton.style.css'
export default function SkeletonElements({ type }) {
  return <div className={`skeleton ${type}`}></div>
}
