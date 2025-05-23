import { INFO_SECTIONS } from '../../../Shared/Constants';
import './QuickLinks.scss';

export default function FAQs() {
  return (
    <div className="info-section-page">
      <h1>Frequently Asked Questions (FAQs)</h1>
      <ul>
        {INFO_SECTIONS.FAQs.map((item) => (
          <li key={item.id}>
            <strong>Q:</strong> {item.question}
            <br />
            <strong>A:</strong> {item.answer}
          </li>
        ))}
      </ul>
    </div>
  );
}
