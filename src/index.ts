import 'normalize.css';
import './css/style.css';

window.addEventListener('DOMContentLoaded', () => {
    import('./terminal').then(({ initiate_termial }) => {
        initiate_termial();
    });
});
