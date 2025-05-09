import './QuickLinks.scss';
import {INFO_SECTIONS} from '../../../Shared/Constants'

export default function PrivacyPolicy() {
  return (
    <div className="info-section-page">
      <h1>Privacy Policy</h1>
      {INFO_SECTIONS.PrivacyPolicy.map((para) => (
        <p key={para.id}>{para.text}</p>
      ))}
    </div>
  );
}
