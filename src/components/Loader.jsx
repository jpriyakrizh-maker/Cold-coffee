import { NAME } from '../data'

export default function Loader({ progress }) {
  return (
    <div className={'loader' + (progress >= 1 ? ' done' : '')} role="status">
      <b>{NAME}</b>
      <span>Grinding beans… {Math.round(progress * 100)}%</span>
    </div>
  )
}
