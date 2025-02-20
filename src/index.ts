import '../style/reset.scss';
import '../style/style.scss';
import Header from '@/components/common/Header';
import Tabs from '@/components/Tabs';
import Contents from './components/Contents';

const app = document.getElementById('app') as HTMLElement;

const header = new Header();
const tabs = new Tabs(['Board', 'Calendar']);
const contents = new Contents();

app.appendChild(header.render());
app.appendChild(tabs.render());
app.appendChild(contents.render());
