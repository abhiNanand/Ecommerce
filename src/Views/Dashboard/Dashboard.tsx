import Prompt from '../../Components/Atom/Blocker';
import { useDemoApiQuery } from '../../Services/Api/module/demoApi';

export default function Dashboard() {
  const { data, error } = useDemoApiQuery('');
  console.log(data, error);
  return (
    <div>
      Dashboard
      <Prompt when message="Are you sure you want to leave?" />
    </div>
  );
}
