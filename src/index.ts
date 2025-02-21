import '../style/reset.scss';
import '../style/style.scss';
import { App } from './App';

const appRoot = document.getElementById('app') as HTMLElement;
const app = new App();
appRoot.innerHTML = app.render();
