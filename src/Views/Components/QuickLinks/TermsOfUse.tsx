import './QuickLinks.scss';
import { INFO_SECTIONS } from '../../../Shared/Constants';

export default function TermsOfUse() {
  return (
    <div className="info-section-page">
      <h1>Terms of Use</h1>
      {INFO_SECTIONS.TermsOfUse.map((para) => (
        <p key={para.id}>{para.text}</p>
      ))}
    </div>
  );
}
